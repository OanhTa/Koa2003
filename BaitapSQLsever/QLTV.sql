/*Xây dựng hàm để tính tiền mượn sách. Biết rằng nếu giá tiền mượn mỗi 
quyển sách trong hạn là 2000 đồng/ ngày; nếu ngày mượn trùng với ngày 
trả thì tính là một ngày mượn; nếu mỗi ngày mượn quá hạn thì tính thêm 
1000 đồng/ngày*/
--Gợi ý:Số ngay muon: print datediff(d,'2023-4-25','2023-4-28')=3+1ngày
--Quá hạn 3 ngày
create function TinhtienMS(@quahan int)
return @quahan
set @quahan=date(d,select Ngayhentra from tblThuetruyen,se
