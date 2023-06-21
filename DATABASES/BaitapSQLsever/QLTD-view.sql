--Đưa ra các thông tin gồm: số hợp đồng, ngày làm hợp đồng, mã khách hàng, 
--địa chỉ , số tiền vay, tài sản thế chấp của các khách hàng đã vay với số
--tiền lớn hơn 300 có tài sản thế chấp là ‘Đat’
select Sohopdong,NgaylamHD,kh.Makh,Diachi,Sotienvay,Taisanthechap
from tbl_Khachhang kh 
inner join tbl_Hopdong hd on kh.Makh=hd.Makh
where Sotienvay>300 and Taisanthechap=N'Nhà'
-- Đưa ra các thông tin gồm: mã khách hàng, tên khách hàng, địa chỉ của 
--khách hàng đã vay tiền với số tiền vay lớn nhất.
select kh.Makh,Hoten,Diachi
from tbl_Khachhang kh inner join tbl_Hopdong hd on kh.Makh=hd.Makh
where Sotienvay=(select MAX(Sotienvay) from tbl_Hopdong)
--Đưa thông tin gồm số hợp đồng, ngày làm hợp đồng, mã khách hàng, địa chỉ , 
--số tiền vay, tài sản thế chấp của các khách hàng đã vay với số tiền 
--nhỏ hơn 100 và lãi xuất là 8,5.
select kh.Makh,Diachi,hd.Sohopdong,NgaylamHD,Sotienvay,Taisanthechap
from tbl_Hopdong hd inner join tbl_Thanhtoan tt on hd.Sohopdong=tt.Sohopdong
					inner join tbl_Khachhang kh on kh.Makh=hd.Makh
where Sotienvay<100 and Laisuat=8.5
--Đưa ra thông tin gồm số hợp đồng, mã khách hàng của những khách hàng đã vay 
--tiền nhưng chưa thanh toán lãi suất hàng tháng lần nào.
select hd.Sohopdong,hd.Makh
from tbl_Hopdong hd inner join tbl_Thanhtoan tt on hd.Sohopdong=tt.Sohopdong
					
where Laisuat IS NULL