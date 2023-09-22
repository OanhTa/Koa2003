//Tagged template literals

// function highlight(...rest){
//     console.log(rest);
//     //KQ là MẢNG với rất nhiêug tham số
//     //[0] là mảng chứa phần tử không nội suy=>ký tự ,text
//     // Còn lại là những phần tử nội suy=>biến
// }

//Output: là một chuối với kq như đầu vào và span các khoá học 
function highlight([first,...strings],...values){
    //first: Học lập trình, strings: [tại, !], values: [JavaScript, F8]
    return values.reduce(  // reduce đang lặp qua mảng values
        (acc, curr)=> [...acc, <span>${curr}</span>, strings.shift()],
        //lần 1: curr lấy ra JavaScript và strings.shift() TRẢ VỀ phần tử đầu tiên bị xoá TẠI
        //lần 2  curr lấy ra F8 và strings.shift() TRẢ VỀ phần tử đầu tiên bị xoá ! 

        [first]//giá trị khởi tạo cho acc
    ).join('');
    //Biến mảng thành chuỗi
}

var brand ='F8';
var course= 'JavaScript';

const html = highlight`Hoc lap trinh ${course} tại ${brand}`;//Tagged template literals

console.log(html)