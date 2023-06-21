-- Đưa ra các thông tin: học kỳ, mã học phần học, tên học phần học, số sinh viên có 
--điểm lớn hơn 5 của từng học phần của từng kỳ.
create view y6 as
select Hocky,hp.Mahocphan,Tenhocphan,Sotinchi,count(MaSV) AS SoSV
from tblDiem d JOIN tblHocphan hp on d.Mahocphan = hp.Mahocphan
where Diem >= 5
Group by Hocky,hp.Mahocphan,Tenhocphan,Sotinchi
--Đưa ra các thông tin: mã lớp, mã học phần, tên học phần, số tín chỉ, số sinh viên thi 
--lại từng học phần của từng lớp mà có số sinh viên thi lớn hơn 2.
create view y7 as
select d.Mahocphan,Tenhocphan,Sotinchi,count(DISTINCT MaSV) AS SoSVthilai
from tblDiem d JOIN tblHocphan hp on d.Mahocphan = hp.Mahocphan
where Diem < 5
Group by Hocky,d.Mahocphan,Tenhocphan,Sotinchi
Having count(DISTINCT MaSV) > 2


