//Destructuring

var array = ['js','PHP','Ruby'];
var [a,,c] = array;//chỉ lấy a và c
//var a = array[0]
//var b = array[1]
//var c = array[2]
console.log(a,b,c)

//Rest parameters ; lấy pt còn lại

//vd1 vơi mảng
var array1 = ['js','PHP','Ruby'];
var [a, ...rest] = array1;//với rest là tên biến
//var a = array[0]
//var b = array[1]
//var c = array[2]
console.log(a)
console.log(rest);//['PHP','Ruby']

//vd2 với đốí tượng
var obj1 = {
    name1: 'js',
    price: 1200,
    image: 'img-add',
    children: {
        name1: 'ReactJS'
    }
};
var {name1: parentName, children: {name1: childrenName}} = obj1;
//với rest là đối tượng chứa 2 pt còn lại
//var{ desc = 'default description'} giá trị mặc định trả về khi không có desc
console.log(childrenName);//đổi tên 

//vd3 với hàm
function logger([a,b,...rest]){
    console.log(rest);
}
logger([1,2,3,4,5])//[3,4,5]