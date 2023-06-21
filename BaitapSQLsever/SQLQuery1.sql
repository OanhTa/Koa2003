--Đưa ra thông tin...số sinh viên có điểm lớn hơn 5
create view y6 
as
select h.Hocky,h.MaHP,h.TenHP,h.SoTC,count(HP.MaHP) AS SoSVdiem_lh5
from tblDiem d INNER JOIN tblHP h on d.MaHP = h.MaHP
where d.Diem >= 5
Group by h.Hocky,h.MaHP,h.TenHP,h.SoTC

--đưa ra thông tin... đưa ra học phần có số sinh thi lại lơn hơn 2
create view y7 
as
select sv.MaSV,h.MaHP,h.TenHP,h.SoTC,count(d.MaHP) AS SoSVthilai
from tblDiem d INNER JOIN tblHP h on d.MaHP = h.MaHP
               INNER JOIN tblSV sv o n d.MaSV = sv.MaSV
where d.Diem < 5 
Group by Hocky,MaHP,TenHP,SoTC
Having count( d.MaHP) > 2  --Đếm số học phần

--Đưa ra thông tin...số sinh viên k phải thi lại
create view y8 as
select h.Hocky,h.MaHP,h.TenHP,h.SoTC,count(h.MaHP) AS SoSV
from tblDiem d INNER JOIN tblHP h on d.MaHP = h.MaHP
where Diem >= 5
Group by h.Hocky,h.MaHP,h.TenHP,h.SoTC 
