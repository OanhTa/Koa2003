var coursesAPI = 'http://localhost:3000/courses';
fetch(coursesAPI)
.then(function(response){
    return coursesAPI.json();
})
.then(function(courses){
    console.log(courses)
})