
// Enhanced Object Literals giúp chúng ta: 
// 	- định nghĩa key:value cho object.
// 	- định nghĩa method cho object.
// 	- định nghĩa key cho object đưới dạng biến


var nameC = 'Javascript'; 
var price = 1000; 

//y1  
var course = { 
    nameC, //namec: nameC, 
    price, 
    getName: function(){
        return nameC
    } };

//y2
var course = { 
    nameC,  
    price, 
    getName(){  //method
        return nameC
    } };

//ý3
var fieldName = 'name' ; var fieldPrice = 'price'; 
var course = { 
    [fieldName]: '‘PHP’', //key=[biến]
    [fieldPrice]: '‘1000’' , 
    getName(){
        return fieldName
    } 
}; 

