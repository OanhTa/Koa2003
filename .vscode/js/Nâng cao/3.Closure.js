// Closure - tính bao đóng của hàm

/*Là một hàm có thể ghi nhớ nơi nó được tạo và truy cập được biến
bên ngoài phạm vi của nó */

function createCounter(){
    let counter = 0;

    function increase(){
        return ++counter;//tham chiếu
        //truy cập được biến counter bên ngoài phạm vi của nó 
    }

    return increase
}
const counter1 = createCounter();//= increase()
//Là một hàm có thể ghi nhớ nơi nó được tạo 
//chỉ tạo một PHẠM VI gồm biến và hàm và chưa trả về giá tri increase()

console.log(counter1())//1//trả về giá tri increase() cho lần truy cập 1
console.log(counter1())//2
//trả về giá tri increase() cho lần truy cập 2 với truy cập được biến counter bên ngoài phạm vi lúc này đã bằng 1
console.log(counter1())//3


const counter2 = createCounter();//tạo ra một phạm vi mới

console.log(counter2())//1
console.log(counter2())//2
console.log(counter2())//3

//Phân biệt
/*
    a(1) -> trả về 1 hàm với phạm vi độc lập
    a(1)() -> hàm đc gọi với phạm vi vừa tạo, mỗi lần gọi là 1 phạm vi mới
    x = a(1); x()-> tạo ra 1 phạm vi hàm duy nhất và đc tham chiếu tới biến x
*/
function a(x) {
    x++;
    return function () {
        console.log(++x);
    };
}

a(1)//f()
//gọi dến hàm return
a(1)();//3
a(1)();//3
a(1)();//3

let x = a(1);
x();//3
x();//4
x();//5
// Output: ?

//==================Ưng dụng============================

//VD1
function createLogger(namespace){
    function Logger(message){
        console.log(`[${namespace}] ${message}`)
    }
    return Logger;
}

const infoLogger = createLogger('Info')//=Logger()
infoLogger('Bắt đầu gửi mail')//[Info] Bắt đầu gửi mail
infoLogger('Gửi mail lỗi lần 1, thử gửi lại.......')
infoLogger('Gửi mail thành công cho user XXX')

const errLogger = createLogger('Err')//=Logger()
infoLogger('Email không tồn tại trong DB')//[Err] Email không tồn tại trong DB

//VD2
function createStorage(key){
    const store = JSON.parse(localStorage.getItem(key)) ?? {}
    //json=>js từ key
    const save = ()=>{
        localStorage.setItem(key, JSON.stringify(store))
    }
    const storage = {
        //Hàm lấy dữ liệu đã có trong localStorage
        get(key){
            return store[key];
        },
        //Hàm thêm dữ liệu
        set(key,value){
            store[key] = value
            save()
        },
        remove(key){
            delete store[key]
            save()
        }

    }
    return storage;
}

const profileSetting = createStorage('profile-setting');

console.log(profileSetting.get('fullname'))// profile-setting | {'fullname':'Okim'}
profileSetting.set('fullname','Okim')
profileSetting.set('age',20)
profileSetting.set('address','Ha Nam')

const profileSetting2 = createStorage('profile-setting2');

console.log(profileSetting.get('fullname'))//'fullname','Okim'
profileSetting.set('fullname','Okim')
profileSetting.set('age',20)
profileSetting.set('address','Ha Nam')
