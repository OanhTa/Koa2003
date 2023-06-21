--Đưa ra các thông tin gồm: Mã nhân viên, họ và tên nhân viên, địa chỉ 
--của những nhân viên có họ ‘Hoàng’
select MaNV,Hoten,Diachi
from tblHoso
where Hoten like N'Hoàng%'
/*Đưa ra các thông tin gồm: Mã nhân viên, họ và tên nhân viên, địa chỉ,
hệ số lương, hệ số phụ cấp của những nhân viên 
có giới tính là nữ quê ‘Thanh Hóa’ vào ngành năm 1995.*/
select hs.MaNV,Hoten,Diachi,Hesoluong,Hesophucap
from tblHoso hs inner join tblLuong l on hs.MaNV=l.MaNV
where Gioitinh=N'Nữ' and Diachi=N'Thanh Hoá' and Year(Namsinh)=19

/*Đưa ra các thông tin gồm: Mã nhân viên, họ và tên nhân viên, tên phòng, 
số tiền được lĩnh của các nhân viên được lĩnh tiền nhiều nhất 
trong cơ quan. Biết rằng số tiền được lĩnh = (Hệ số lương + hệ số phụ cấp)* 1490.*/
select hs.MaNV,Hoten,Tenphong,(Hesoluong+Hesophucap)*1490 as maxtien
from tblHoso hs inner join tblLuong l on hs.MaNV=l.MaNV
			    inner join tblPhong p on l.MaP=p.MaP
where (Hesoluong+Hesophucap)*1490 = (select max((Hesoluong+Hesophucap)*1490) from tblLuong)