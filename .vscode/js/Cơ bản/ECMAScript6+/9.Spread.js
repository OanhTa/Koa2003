//Spread
var array1 = []
var array2 = []
var array3 = [...array1, ...array2]

//cung phân biệt rest và spread
var arr = ['js','PHP','Ruby'];

function logger(...rest){//rest định nghĩa ra tham số
    for(var i=0; i< rest.length; i++){
        console.log(rest[i]);
    }
}
logger(...arr)//spread truyền đối số