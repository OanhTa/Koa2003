--Hãy viết Stored Procedure thực hiện công việc: Đưa ra thông tin gồm:
--Số chứng minh thư, Họ tên khách hàng, hộ khẩu thường trú, loại phòng 
--của những khách hàng đã thuê phòng trong khoảng thời gian cho trước.
CREATE PROCEDURE NhâpthongtinKHtheophamvingay
    @StartDate DATETIME,
    @EndDate DATETIME
AS
BEGIN
    SELECT k.SoCMT,Hoten,HokhauTT,LoaiP
    FROM tbl_Khach k
    INNER JOIN tbl_ThueP tp ON k.SoCMT=tp.SoCMT
    INNER JOIN tbl_Phong p ON p.MaP=tp.MaP
    WHERE NgayBD >= @StartDate AND NgayTP <= @EndDate
END

--Hãy viết Stored Procedure thực hiện công việc: Đưa ra thông tin gồm có
--Số chứng minh thư, họ tên, hộ khẩu thường trú, mã phòng, ngày bắt đầu, 
--ngày trả phòng của những khách hàng đã thuê loại phòng cho trước trong 
--tháng 4.

CREATE PROCEDURE NhapthongtinKHtheophamviloaiP
    @RoomType NVARCHAR(50)
    
AS
BEGIN
    SELECT k.SoCMT,Hoten,HokhauTT,p.MaP,NgayBD,NgayTP
    FROM tbl_Khach k
    INNER JOIN tbl_ThueP tp ON k.SoCMT=tp.SoCMT
    INNER JOIN tbl_Phong p ON p.MaP=tp.MaP
    WHERE p.LoaiP = @RoomType AND MONTH(tp.NgayTP) = 4
END

EXEC NhapthongtinKHtheophamviloaiP N'Loại 1'
