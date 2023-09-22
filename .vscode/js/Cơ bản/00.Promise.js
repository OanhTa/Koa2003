
var users = [
    {
        id: 1,
        name: 'cc',
    },
    {
        id: 2,
        name: "aa"
    },
    {
        id: 3,
        name: 'dd',
    }
]

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Hello, i am cc',
    },
    {
        id: 2,
        user_id: 2,
        content: "i am aa",
    },
    {
        id: 3,
        user_id: 1,
        content: 'Nice to meet you',
    }
]
//lấy ra comment
function getComments() {
    return new Promise(function(resolve) {
        resolve(comments);
    });
}
// lấy ra id của user từ user_id của comment
function getUserByIds(userIds) {
    return new Promise(function(resolve) {
        var result = users.filter(function(user) {
            //phương thức trả về mảng mơi tm dk=>với biến user được sử dụng để lưu trữ từng đối tượng người dùng trong quá trình lọc
           return userIds.includes(user.id)
        });
        resolve(result)
    });
}
// Phương thức then khi hàm getcomment đúng
getComments()
.then(function(comments) {
    var userIds = comments.map(function(comment) {
        //phuong thuc map  tạo mảng mới với kết quả=>với biến comment được sử dụng để lưu trữ từng đối tượng người dùng 
        return comment.user_id;
    })//kq: [1,2]
    return getUserByIds(userIds)
    .then(function(users) {
        return{users: users, comments: comments}
    })//kq {users: [{},{}], comments: [{},{}]} trả đối tượng gồm 2 mảng =>Data
})
.then(function(data) {
    var commentBlock = document.querySelector('#commentBlock');
    var html= ''; 
    //ở đây đối tượng data như trên chỉ gồm những user đã comment
    data.comments.forEach(function(comment) {
        //phương thức forEach duỵet qua pt mảng=>với biến comment được sử dụng để lưu trữ một đối tượng người dùng
        var user = data.users.find(function(user) {
            //phương thức find trả về giá trị tm hàm=>với biến user được sử dụng để lưu trữ một đối tượng người dùng
            return user.id === comment.user_id
        })//kq: hiển thị id của đối tượng bình luận và đối tượng người dùng tương ứng.
        html += `<li>${user.name}: ${comment.content}</li>`
    })
    commentBlock.innerHTML = html;
})