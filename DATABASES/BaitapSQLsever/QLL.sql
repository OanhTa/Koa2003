create view y1 as
select MaNV,Hoten,Namsinh,Gioitinh,MaCV,Hesoluong
from tblNhanvien
where Gioitinh=N'Nữ' and (Donvi=N'CNTT' or Donvi=N'Kinh tế')

create view y2 as
select MaNV,Hoten,Namsinh,Gioitinh,cv.MaCV,Hesoluong,
      (Hesoluong+Hesophucap)*1490 as Sotien
from tblNhanvien nv inner join tblChucvu cv on nv.MaCV=cv.MaCV
where (Hesoluong+Hesophucap)*1490=(select max((Hesoluong+Hesophucap)*1490)
                                   from tblNhanvien nv inner join tblChucvu cv 
								                on nv.MaCV=cv.MaCV) 

create view y3 as
select MaNV,Hoten,Gioitinh,cv.MaCV,Hesoluong
from tblNhanvien nv inner join tblChucvu cv on nv.MaCV=cv.MaCV
where Chucvu = N'Trưởng phòng' or Chucvu=N'Trưởng khoa'

create view y4 as
select nv.MaNV,Hoten,Namsinh,Gioitinh,Hesoluong,
       (Hesothidua+HSLtangthem)*1000 as Sotien_tangthem
from tblNhanvien nv inner join tblThidua td on nv.MaNV=td.MaNV
                    inner join tblChucvu cv on cv.MaCV=nv.MaCV
where (Hesothidua+HSLtangthem)*1000=(select max((Hesothidua+HSLtangthem)*1000)
									 from tblNhanvien nv inner join tblThidua td on nv.MaNV=td.MaNV
                                                          inner join tblChucvu cv on cv.MaCV=nv.MaCV)
