--1	khách hàng mua hàng trong tháng 10
create view KH_muathang10
as
select kh.Makh,kh.Tenkh,kh.Sodienthoai
 ,bh.Soluong,bh.Dongia
from tblKhachhang kh inner join tblBanhang bh on bh.Makh=kh.Makh	
				   inner join tblMathang mh on mh.Mamh = bh.Mamh
where (month(bh.Ngayban)= 8)  and (kh.Diachi=N'Nam Dinh')
--2 Đưa ra thông tin mặt hàng chưa bán dc trong th8
create view MH_chuabanthang8
as
select *
from tblMathang
where Mamh not in(select Mamh from tblBanhang where month(Ngayban)=8)
--3
select *
from tblKhachhang kh inner join tblBanhang bh on bh.Makh=kh.Makh	
				     inner join tblMathang mh on mh.Mamh = bh.Mamh
where bh.Mamh='MH001'

--4 Đưa ra thông tin