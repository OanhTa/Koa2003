// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const heading = $("header h2");
const cd = $(".cd");
const cdThumb = $(".cd-thumb");

const playBtn = $(".btn-toggle-play");//Dừng hay tiêp tuc
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const progress = $("#progress");
const audio = $("#audio");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,//Vị trí bài hát hiện tại
  isPlaying: false,//Mặc địnhh nút play DỪNG
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  //với phương thức getItem với tham số là key cần lấy giá trị. Giá trị lấy được từ localStorage sẽ ở dạng chuỗi JSON,
  songs: [
    {
      name: "Click Pow Get Down",
      singer: "Raftaar x Fortnite",
      path: "https://mp3.vlcmusic.com/download.php?track_id=34737&format=320",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Tu Phir Se Aana",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "https://mp3.vlcmusic.com/download.php?track_id=34213&format=320",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path:
        "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
      name: "Mantoiyat",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
      name: "Aage Chal",
      singer: "Raftaar",
      path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
      name: "Damn",
      singer: "Raftaar x kr$na",
      path:
        "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
    },
    {
      name: "Feeling You",
      singer: "Raftaar x Harjas",
      path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    }
  ],
  //Tạo cấu hình để lưu trữ các thông số và giá trị cài đặt của một ứng dụng nghe nhạc
  setConfig: function (key, value) {
    this.config[key] = value;//thêm key và value vào obj config
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  //Tạo chuỗi HTML playlist và hiẻn thị nó ra màn hình
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : "" //sẽ có màu nền dỏ
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");//Nối từng phần tử song với chuỗi rỗng(khoảng cách)
  },
  //Định nghĩa thuộc tính
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];//songs[0]
      }//defineProperty dùng để thêm thuộc tính currentSong trong this-app
    });//currentSong lấy ra đối tượng song hiện tại 
  },

  //Xử lý sự kiện
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;//offsetWidth là thuộc tính của mảng lấy wight hiện tại sau khi thực hiện vc j đó

    // Xử lý CD quay / dừng
    // Phương thức animate nhận đối số là một  mảng và obj
    const cdThumbAnimate = cdThumb.animate([
      { transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity//lặp vô hạn
    });
    cdThumbAnimate.pause();//mặc định cd dừng

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
        //Xử lý thanh cuộc
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
        //Xử lý CD
      const newCdWidth = cdWidth - scrollTop;
        
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play=> Dưng hay tiếp tục
    // sau khi đã tải thông tin bài hát hiện tại vào UI khi chạy app ở line 268
    playBtn.onclick = function () {
      if (_this.isPlaying) {//this là  app => F
        audio.pause();
      } else {//True
        audio.play();//bắt đầu phát âm thanh hiện tại
      }
    };
    // Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();//cd quay khi được play
    };//thêm lớp playing sẽ là BẬT(icon 2 sọc)
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    //Sự kiện khi có sự thay đổi về thời gian
    audio.ontimeupdate = function () {
      if (audio.duration) {
        //kiểm tra xem thuộc tính duration(trả về độ dài dải âm thanh) của Audio có giá trị hay không (là giây)
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100// (giây/giây tổng)*100= value %
        );// Tiến độ: tính ra phần trăm rồi làm tròn dưới
        progress.value = progressPercent;
      }//mặc định input HTML value="0" step="1" min="0" max="100"
    };

    // Xử lý khi tua song
    // Sự kiện khi có sự thay đổi diễn ra
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      //target trả về phần tử (progress) mà sự kiện được kích hoạt và lấy giá trị
      // (giây tổng/100)*(value %) = giây -> thời gian tìm kiếm
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {//F
        _this.playRandomSong();//hàm phát bài hát ngãu nhiên
      } else {//T
        _this.nextSong();//nextSong line 286
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();//prevSong line 295
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;//kích chuột lần 1: T, Kích chuột lần 2: F
      _this.setConfig("isRandom", _this.isRandom);//KEY,VALUE=>"isRandom": T(/F)
      randomBtn.classList.toggle("active", _this.isRandom);
    };//khi có class active thì nút radom màu đỏ 

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);///Thêm KEY,VALUE=>"isRepeat": T(/F)
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Sự kiện khi hết bài hát
    audio.onended = function () {
      if (_this.isRepeat) {//T
        audio.play();
      } else {
        nextBtn.click();//method click lm cú nhấp chuột giả để next
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");//trừ bài hát lúc đang chạy(hđ)
      //trả về chính nó hoặc phần tử cha gần nhất của e.target với e là playlist.onclick và target là phần tử được nhấp vào(k có sự nổi bọt)
      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          //dataset.index= getAttribute('data-index')//CHUỖI số =>index
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option(dấu 3 chấm)
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  //Cuộn khi thay đổi bài hát (tuỳ thuộc vào vị trí bài hát)
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",//hành vi: mượt mà
        block: "nearest"//căn theo chiều dọc: gần nhất phạm vi view
      });
    }, 300);
  },

  //Tải thông tin bài hát hiện tại vào UI khi chạy app
  loadCurrentSong: function () {
    //Sửa tên hiện tại
    heading.textContent = this.currentSong.name;
    //Sửa ảnh hiện tại
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    //Sửa audio hiện tại
    audio.src = this.currentSong.path;
  },
  //khởi tạo(lấy) VALUE cho các thuộc tính cấu hình trên 
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    //Các giá trị Value boolean mà đã thêm ở next và repeat
    this.isRepeat = this.config.isRepeat;
  },
  //next khi sự kiện  click trên
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      //khi đến cuối songs thì quay lại bài đầu tiên
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  //LÙI LẠI khi sự kiện  click trên
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
      //khi đến đầu songs thì quay lại bài cuối cùng
    }
    this.loadCurrentSong();
  },
  //Dùng để phát một bài hát ngẫu nhiên khi click bật
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);//ngãu nhiên từ 0-0.1 * 6 rồi làm tròn dưới
    } while (newIndex === this.currentIndex);//lặp đến khi bài trùng bài mới

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist=>Hiển thị ra màn hình danh sách bài hát
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
