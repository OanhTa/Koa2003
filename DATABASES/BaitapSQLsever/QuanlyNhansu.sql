create view ThongtinNV 
as
select MaNV,Hoten,Diachi
from tblHoso
where Diachi=N'Nam Định' and Year(Namsinh)=1970
--
create view DS_NVlenluong as
select *
from tblHoso hs inner join tblLuong l on hs.MaNV = l.MaNV
where Year(Ngaylenluong)=2023

--Đưa ra nhân viên có lương cao nhất trong từng phòng và sắp xếp tăng dần
select hs.MaNV,Hoten,Tenphong,(Hesoluong+Hesophucap)*83 as Thanhtien
from tblHoso hs inner join tblLuong l on hs.MaNV = l.MaNV
				inner join tblPhong p on p.MaP = l.MaP
where MAX(Thanhtien)
order by ASC
