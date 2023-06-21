--Đổi  địa chỉ ở HN thành TB và giới tính là nữ
update tblKhachhang
set Diachi=N'Thái Bình' , Gioitinh=N'Nữ'
where Diachi=N'Hà Nam'
--Xoá khách hàng có địa chỉ ở NB
delete from tblKhachhang
where Diachi=N'Ninh Bình'
--LIỆT KÊ KH có địa chỉ TB
select *
from tblKhachhang
where Diachi=N'Thái Bình'
--Liệt kê 2 kh có địa chỉ TB
select top(2)*
from tblKhachhang
where Diachi=N'Thái Bình'
--trigger 
--View
--Thủ tục
--Hàm

