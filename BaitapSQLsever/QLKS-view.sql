 --Đưa ra các thông tin gồm: Số chứng minh thư, họ tên, hộ khẩu thườngtrú của các khách thuê phòng loại 1
select k.SoCMT,Hoten,HokhauTT
from tbl_Khach k inner join tbl_ThueP tp on k.SoCMT= tp.SoCMT
				 inner join tbl_Phong p on tp.MaP=p.MaP
where LoaiP=N'Loại 1'
--Đưa ra thông tin gồm: mã phòng, vị trí, loại phòng, hạng phòng, số lần khách thuê phòng của mỗi phòng có số lần khách thuê lớn hơn 3.
select p.MaP,Vitri,LoaiP,HangP,count(p.MaP) as Solanthue
from tbl_ThueP tp inner join tbl_Phong p on tp.MaP=p.MaP
Group by p.MaP,Vitri,LoaiP,HangP
Having count(p.MaP)>3
--Đưa ra Mã phòng, vị trí, loại phòng, hạng phòng, giá của các phòng có giá nhỏ hơn 400.
select *
from tbl_Phong
where Gia<400
--Đưa ra Số chứng minh thư, họ tên, hộ khẩu thường trú, mã phòng, ngày bắt đầu, ngày trả phòng, số ngày thuê của những khách hàng có thời gian thuê phòng dài ngày nhất.
select k.SoCMT,Hoten,HokhauTT,MaP,NgayBD,NgayTP,datediff(DAY,'NgayBD','NgayTP') as Songaythue
from tbl_Khach k inner join tbl_ThueP tp on k.SoCMT=tp.SoCMT
where datediff(DAY,'NgayBD','NgayTP')= (select MAX(datediff(DAY,'NgayBD','NgayTP'))
										from tbl_ThueP)

