//Hoisting đưa phần khai báo biến, hàm lên đầu phạm vi;

//Với biến
console(age)//underfine
//dc hois var age
console(fullname)//err
var age = 16;

//Với hàm
console.log(sum(6,9))//15
function sum(a,b){
    return a+b
}

//Hoisting với let, const
{
    console(fullname)//err
    let fullname = 'okim';
}
//Khi khai báo với let, const thì biến, hàm vẫn dc hoisting nhưng nó k tự khởi tạo giá trị( underfine) nên dc đưa vào vùng k truy cập dc

//Bonus
var Counter1 = makeCounter();
console.log(Counter1())//OUTPUT: 1

function makeCounter(){//HOIST
    let counter = 0;
    
    return increase;
    function increase(){//HOIST
        return counter++;
    }
}