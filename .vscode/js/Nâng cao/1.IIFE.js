// IIFE - Immediately Invoked Function Expression
// Một biểu thức tạo ra một hàm và hàm đó được gọi ngay lập tức

//------------------
//Function Expression
let name = 'Jen'

;(function(mess){
    console.log('hello',mess)
})('Chào bạn')

//---------------------------
//Nên sd dấy ; trước IFE trong TH k đánh dấu ; cuối dòng
//IFE là hàm "private": không truy cập dc phạm vi bên ngoài và có thể truy cập bên trong TH đệ quy 
let i=0

;(function myFunc(){
    i++;
    console.log(i)

    if(i<10)  myFunc()
})()

//Sử dụng IFE khi nào? chạy ngay VÀ muốn biến , hàm k ảnh hưởng các biến, hàm khác khi trùng tên
//---------------------------
//Ung dung: khi muốn tạo thư viện,đảm bảo tính toàn vẹn của dư liệu

//Với cách thông thường rất dễ gây ra lỗi khi là ta có gán, sử dụng dc biến ở mọi nơi
// const app= {
//     cars: [],
//     add(car){
//         this.cars.push(car)
//     },
//     edit(index, car){
//         this.cars[index] = car
//     },
//     delete(index){
//         this.cars.splice(index,1)
//     }
// }
//app.add('BMW');app.add('Mazada')//trả về luôn cars ['BMW','Mazada']
//app.cars = null //gán dc giá trị

const app = (function(){
    //private: toàn vẹn dữ liệu khi k sửa đổi dc bên ngoài
    const cars = [];
    
    //public: công khai có thể tương tác
    return {
        get(index){
            return cars[index]
        },
        add(car){
            cars.push(car)
        },
        edit(index, car){
            cars[index] = car
        },
        delete(index){
            cars.splice(index,1)
        }
    }
})()
app.cars//err vì app chỉ có những j dc return

app.add('BMW');app.add('Mazada')//underfined (k trả về cars)
//chỉ truy cập dc giá trị qua get qua return 
app.get(0)//BMW