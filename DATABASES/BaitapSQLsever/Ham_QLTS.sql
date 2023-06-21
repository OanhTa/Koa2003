--Xây dựng hàm trả về các thông tin gồm: Số báo danh, họ tên, tổng
--điểm ba môn của những thí sinh có tổng điểm cao nhất của mỗi ngành với mã ngành
--cho trước.
CREATE FUNCTION timthukhoa(@man nvarchar(20))
RETURNS @ThuKhoaN
TABLE
(
SBD nvarchar(10),
Hoten nvarchar(50),
MaN nvarchar(20),
tongdiem float
)
AS
BEGIN
declare @diemmax float --tìm max
set @diemmax =
(select Max(Diemtoan+Diemly+Diemhoa) from tblThisinh where MaN=@man)
insert into @ThuKhoaN --thêm vào
select SBD, Hoten,MaN,Diemtoan+Diemly+Diemhoa as tdiem
from tblThisinh
where Diemtoan+Diemly+Diemhoa=@diemmax and man=@man
RETURN
END
--test
select * from timthukhoa('N002')
select (Diemtoan+Diemly+Diemhoa) as TongDiem
from tblThisinh
where MaN='N002'
