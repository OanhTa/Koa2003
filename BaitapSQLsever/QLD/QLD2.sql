create view y1 as
select *
from tblSinhvien
where Quequan=N'Nam Định' or Quequan=N'Thai Bình'

--những sinh viên đạt điểm cao nhất học phần có mã học phần là ‘HP003’.
create view y2 as
select Hoten,Namsinh,Gioitinh,Diem
from tblSinhvien sv inner join tblDiem d on sv.MaSV= d.MaSV
					inner join tblHocphan hp on d.Mahocphan = hp.Mahocphan
where hp.Mahocphan='HP003' 

/*Đưa ra các thông tin gồm: Mã sinh viên, họ và tên sinh viên, ngày sinh, giới tính, tên học phần, điểm thi
của các sinh viên thế hệ 9X.*/
create view y3 as
select sv.MaSV,Hoten,Gioitinh,Namsinh,Tenhocphan,Diem
from tblSinhvien sv inner join tblDiem d on sv.MaSV= d.MaSV
					inner join tblHocphan hp on d.Mahocphan = hp.Mahocphan
where Year(Namsinh)>=1900 and Year(Namsinh) <2000
 
 /*Đưa ra các thông tin gồm: Học kì, mã học phần, tên học phần, số tín chỉ, số sinh viên không đạt
 của những học phần mà có số sinh viên không đạt nhỏ hơn 10. 
 (sinh viên không đạt là những sinh viên có điểm thi dưới điểm 4)*/
create view y4 as
select Hocky,hp.Mahocphan,Tenhocphan,Sotinchi,count(d.MaSV) as SoSV_kdat
from tblSinhvien sv inner join tblDiem d on sv.MaSV= d.MaSV
					inner join tblHocphan hp on d.Mahocphan = hp.Mahocphan
where Diem<=4
Group by  Hocky,hp.Mahocphan,Tenhocphan,Sotinchi
Having count(d.MaSV)<10
