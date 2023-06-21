/*Xây dựng các hàm để xét những khách hàng được mời thamdự bốc thăm 
trúng thưởng. Hàm trả về giá trị là “Chúc mừng quý khách 
đã trúng thưởng “ nếu khách hàng có số lần mua hàng lớn hơn 3 
và tổng số tiền lớn hơn 5000, ngược lại trả về xâu rỗng “Chúc quý khách may mắn”
*/
USE QuanlyBanhang
create function checkGiaithuong(@makh nvarchar(10))
returns nvarchar(150)
as
Begin
declare @solanmua int
declare @tongtien float
declare @kiemtra nvarchar(10)
declare @thongbao nvarchar(150)=''
set @solanmua =		(select count(distinct Ngayban)
					 from tblBanhang
					 where Makh=@makh)
set @tongtien =		(select sum(Soluong*Dongia)
					 from tblBanhang
					 Where Makh=@makh)

if ((@solanmua>=3) and (@tongtien >=5000000))
	set @thongbao = 'Chuc mung quy khach.'
	else
		set @thongbao = 'Chuc may man lan sau.'
return @thongbao
End
--check
print dbo.checkGiaithuong('KH003')

/*Xây dựng hàm để tính số tiền giảm giá cho khách hàng trong mỗi lần mua hàng.
Biết rằng nếu số tiền mua hàng lớn hơn 300 thì giảm 5%, nếu số tiền mua hàng
lớn hơn 100 thì giảm 2%.*/

