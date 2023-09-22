//Value Types & Reference Types - Kiểu tham trị và kiểu tham chiếu

/*Value Types( Primitive datta Types) - Kiểu tham trị - Kiểu dự liệu nguyen thủy
            - String
            -Number
            -Boolean
            -BigInt
            -symbol
            -underfine
            -null
*/ 
/*Reference Types( Non-primitive datta Types) - kiểu tham chiếu- Kiểu dự liệu không nguyên thủy
            -Object
            -Array
            -Function
*/ 
/*Data types with functions
            -Value types
            -Reference Types
*/

//1 Value Types
let a=1//Tạo ra biến a, cấp 1 ô nhớ, lưu giá trị vào ô nhớ
let b=a//Tạo ra biến b, cấp 1 ô nhớ khác, sao chép giá trị của a cho b vào ô nhớ mới

a=2//sửa giá trị trong ô nhớ của a
console.log(b)//1

//2 Reference Types
let c = {
    name:'Merceder'
}//tạo ra biến a. cấp một ô nhớ lưu{name:'Merceder'}, trả về địa chỉ đã lưu và gán giá trị vào biến a
let d=c//tạo biến d, trỏ biến d tới cùng địa chỉ ô nhớ của biến a

c.name = 'BMW';
console.log(b)//BMW

//luôn luôn có một vùng nhớ mới được tạo ra khi có obj, arr, function mới
let e = {
    name: 'okim'
}
e={
    name:'ok'
}
//Trường hợp obj chứa một obj con thì obj con là 1 vùng nhớ và obj cha cũng là một vùng nhớ (lưu các địa chỉ vùng nhớ của obj con)
//#002:{profile:#001}

//3 Data types with functions
function sum(a, b){
    //let a = m => Value Types
    //let b = n
    a=0
    b=0
    console.log(a,b)//0 0 
}
const m = 1
const n = 2
sum(m,n);//3
console.log(c,d)//1 2


function func(obj){
    //let obj = i => Reference Types
    obj = {...obj}//tạo ra một ô nhớ mới 
    obj.name = 'Merceder',
    console.log(obj)//{name: 'Merceder'}
}
const car = {
    name: 'BMW'
}

func(car)
console.log(car)//{name: 'BMW'}