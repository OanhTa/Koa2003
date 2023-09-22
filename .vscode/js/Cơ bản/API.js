var courseApi = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);
    //getCourses(function(courses){//couses là JSON Courses=>ham=>js types DOM
                // là mảng gồm những khoá học
    //    B2:  rederCourses(courses)}); SAU ĐÓ sẽ hiện kết quả ra mand hình

    handleCreateForm();//Xử lý tạo khoá học lên trình duyệt= Chọn thẻ HTML + hiện lên màn hình
}

start();

// Functions

//Lay dữ liệu từ API 
function getCourses(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
        //Kết quả trả về từ phương thức .json() => DOM sẽ được TRUYỀN VÀO hàm callback như một tham số 
        // VÀ tham số đó là course ở line 5
}
// callback - Tao view ra trinh duyet=>READ
function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');

    var htmls = courses.map(function (course) {
        return `
            <li class="course-item-${course.id}">
                <h4 class="name-${course.id}">${course.name}</h4>
                <p class="desc-${course.id}">${course.description}</p>

                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button onclick="updateCourse(${course.id})">Sửa</button>
            </li>
        `
    })

    listCoursesBlock.innerHTML = htmls.join(''); //trả về la mot JSON
}
//Tạo khoa hoc API=>CREAT: POST
function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    }// sau khi tao trên API ta lấy dữ liệu về từ API đã tạo
    fetch(courseApi, options)
        .then(function (response) {
            response.json();
        })
        .then(callback);//call back line 72
}
//Xử lý tạo khoá học lên trình duyệt= Chọn thẻ HTML + hiện lên màn hình
function handleCreateForm() {
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;//là giá trị nhập vào ô input
        var description = document.querySelector('input[name="description"]').value;

        var formData = {
            name: name,
            description: description
        }

        createCourse(formData, function () { //formData là dữ liệu mới tạo trên API và callback lấy dữ liẹu từ API moi và trả về màn hình
            getCourses(renderCourses);
            //Lay dữ liệu từ API và hiện ra trinh duyet với tham số courses là kq của line 54
        });
    }
}
//Xu ly xoa=>DELETE
function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(courseApi + '/' + id, options)//phải /id trên URL thì mới chọn dc vị trí xoá
        .then(function (response) {
            response.json();
        })
        .then(function () {
            //c1: getCourses(renderCourses); tự RESET lại trình duyệt
            var courseItem = document.querySelector(".course-item-" + id);

            if (courseItem) {
                courseItem.remove();
            }
        });
}
//Cập nhật khoá học=> UPDATE: PUT/PATCH
function handleUpdateCourse(id, data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(courseApi + '/' + id, options)//phải /id trên URL thì mới chọn dc vị trí cập nhật
        .then(function (response) {
            response.json();
        })
        .then(callback);
}

function updateCourse(id) {
    var name = document.querySelector(".name-" + id);
    var desc = document.querySelector(".desc-" + id);
    var btn = document.querySelector('#create');

    var nameInput = document.querySelector('input[name="name"]');
    var descInput = document.querySelector('input[name="description"]');

    if (name && desc) {
        nameInput.value = name.innerText;
        descInput.value = desc.innerText;
        btn.innerText = "Update";
    }

    btn.onclick = function() {
        var formData = {
            name: nameInput.value,
            description: descInput.value
        }
        
        handleUpdateCourse(id, formData, function () {
            getCourses(renderCourses);
        })

        btn.innerText = "Submit";
        nameInput.value = '';
        descInput.value = '';
    }
}

