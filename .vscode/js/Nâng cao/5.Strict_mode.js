//Strict mode - Nghiêm ngặt
//Báo lỗi hoặc ngăn chặn khi sử dụng những đoạn mã k an toàn

//Thêm "use strict" cho toàn file js
"use strict"

//testFunc()
/*
- Báo lỗi khi gán giá trị cho thuộc tính private: false
- Báo lỗi khi hàm có tham số trùng tên
- Khai báo hàm trong code block thì hàm sẽ thuộc phạm vi code block
- Không đặt tên biến, tên hàm bằng một số từ khóa nhạy cảm của ngôn ngữ
*/
{
    function sum(a,b){
        return a+b;
    }
}
console.log(sum(3,4))//err

//Công dụng
//Tránh quên các từ khóa khai báo biến
//Tránh trùng tên biến dẫn tới lỗi logic
//Sử dụng bộ nhớ hiệu quả hơn vì tránh tạo biến global