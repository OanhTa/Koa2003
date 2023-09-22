//Scope - Phạm vi

/*Các loai phạm vi
    -Global - Toàn cầu
    -Code block - Khối mã:let, const
    - Local scope - Hàm var, function
*/
//Global
var mess = 'Scope'
function logger(){
    console.log(mess);//vẫn truy cập dc
}
function loggers(){
    logger();//vẫn truy cập dc
}

//Code block as if else, for, while, switch
{
    //code
    const age = 18
    console.log(age)
}
console.log(age)//err

//Local scope
function logger(){
    var namen = 'Kiw'
    console.log(namen)
}
logger();
console.log(namen)//err

/*Một function có thể là một code block, nhưng không phải code block nào cũng là một function.
-Biến var trong code block không có block scope, nghĩa là có thể được truy cập từ bên ngoài block đó. 
-Biến var trong hàm chỉ có function scope, nghĩa là chỉ có thể được truy cập bên trong hàm đó.*/

//------------------------------------------------
//Khi GỌI mỗi HÀM luôn có môt phạm vi mới được tạo

logger('Nam','Nguyen')//phạm vi 1
logger('Na','Lê')//phạm vi 2
logger('Nay','Bao')//phạm vi 3

//Các HÀM có thể truy cập dc các BIẾN được khai báo trong phạm vi của nó và bên ngoài nó
const fullName = 'Long Nguyen'
function getName(firt,last){
    console.log(firt, last)
    const age = 20
    console.log(age,fullName)
    //truy cập dc các biến trong và ngoài phạm vi
}
logger('Nam','Nguyen')//Nam nguyen 20 Long Nguyen

//Cách thức một biến dc truy cập

/*Khi nào một biến xóa khỏi bộ nhớ
-Biến toàn cầu: thoát web, thoát tab
-Biến trong codeblock, trong hàm: thoát khỏi khối {}
-Biến trong hàm được tham chieus bởi một hàm: vân giữ đc giá trị tham chiếu*/