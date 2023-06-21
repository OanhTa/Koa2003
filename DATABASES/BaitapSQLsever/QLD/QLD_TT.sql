--Hãy viết thủ tục đưa ra các thông tin gồm: Mã sinh viên, họ và tên sinh 
--viên, ngày sinh, giới tính, tên môn, điểm thi của sinh viên 
--lớp ‘CNTT 14’ với học kì cho trước.
create procedure ThongtinSVtronghocki(@hocki nvarchar(10))
as
begin
select sv.MaSV,Hoten,Gioitinh,Tenhocphan,Diem
from tblSinhvien sv inner join tblDiem d on d.MaSV=sv.MaSV
inner join tblHocphan hp on hp.Mahocphan=d.Mahocphan
where Hocky=@hocki
end

exec ThongtinSVtronghocki @hocki=N'1'

--Xây dựng hàm để xét loại học lực cho mỗi sinh viên. Biết rằng nếu điểm
--trung bình (DTB) > 8.4 thì xếp loại giỏi, 7.0 < DTB < 8.4 thì xếp loại
--khá, 5.0 < DTB < 6.9 thì xếp loại trung bình, ngược lại xếp loại yếu.
--Biết DTB= (Điểm thi*Số tín chỉ)/ Số tín chỉ.
create function Xetloaihocluc (@masv nvarchar(10))
returns nvarchar(50)
as
begin

declare @dtb float
set @dtb=(Select (diem*Sotinchi)/Sotinchi 
		  from tblDiem d inner join tblHocphan hp on d.Mahocphan=hp.Mahocphan
		  where MaSV=@masv)
IF @dtb > 8.4 
        RETURN 'Giỏi';
IF @dtb > 7.0 AND @dtb <= 8.4 
        RETURN 'Khá';
IF @dtb > 5.0 AND @dtb <= 6.9 
        RETURN 'Trung bình';
 end
 
 PRINT dbo.Xetloaihocluc('SV003')



