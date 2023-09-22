class Person{
    constructor(name,age){
        this.name=name;//Giá trị cho name <=> 'name': name
        this.age=age
    }
}//hàm tạo đối tươngj với tham số là value của đối tg

// function Person(name,age){
//     this.name=name;//Giá trị cho name 
//     this.age=age
// }


//Cùng kết quả
const person = new Person('Long', 22);
console.log(person);
// Person {name: 'Long', age: 22}
// age:  22
// name :  "Long"
// [[Prototype]]:  Object