--Hãy viết Stored Procedure thực hiện công việc: Đưa ra thông tin gồm: 
--mã khách hàng, họ tên, địa chỉ, tiền lãi, tiền gốc, ngày thanh toán của 
--những khách hàng đã thanh toán lãi trong tháng cho trước.
CREATE PROCEDURE ThongTinThanhToan (@Thang INT)
AS
BEGIN
    SELECT KH.Makh,Hoten,Diachi,Tienlai,Tiengoc,Ngaythanhtoan 

    FROM tbl_Hopdong hd inner join tbl_Thanhtoan tt on hd.Sohopdong=tt.Sohopdong
					inner join tbl_Khachhang kh on kh.Makh=hd.Makh
    WHERE Thang = @Thang;
END;

EXEC ThongTinThanhToan @Thang = 5;

--Hãy viết Stored Procedure thực hiện công việc: Đưa ra thông tin gồm mã
--khách hàng, họ tên, địa chỉ, số hợp đồng, số tiền vay, lãi suất, tài sản 
--có ngày làm hợp đồng cho trước.

CREATE PROCEDURE ThongTinHopDong (@NgayLamHD DATE)
AS
BEGIN
    SELECT KH.Makh,Hoten,Diachi,Sohopdong,Sotienvay,Laisuat,Taisanthechap
    FROM tbl_Hopdong hd inner join tbl_Khachhang kh on kh.Makh=hd.Makh
    WHERE NgaylamHD = @NgayLamHD
END;

EXEC ThongTinHopDong @NgayLamHD = '2022-05-01';



