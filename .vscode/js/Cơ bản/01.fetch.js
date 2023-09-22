var postApi = 'https://jsonplaceholder.typicode.com/posts';
fetch(postApi)
    .then(function(response) {
        return response.json();
        //chuyen json thành js types(json.parse)
    })
    .then(function(posts) {
        var htmls = posts.map(function(post) {
            //từ kq trên trả về mảng mới
            return `<li>
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            </li>`;
        });
        var html = htmls.join('');//chuyen arr thành chuỗi
        document.getElementById('post-block').innerHTML = html;
        //thêm li ms vào id
    })
    .catch(function(err) {
        alert("MESSAGE: ERROR!");
    });