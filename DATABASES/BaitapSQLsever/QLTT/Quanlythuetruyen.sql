create view Timtruyen as
select d.MaDG,Hoten,Tentruyen
from tblDocgia d inner join tblThuetruyen t on d.MaDG=t.MaDG
				 inner join tblTruyen tr on t.MaT=tr.MaT
where Theloai=N'Truyện ngắn' and Tacgia=N'Nguyễn Thị Thanh Nhàn'
--
create view Truyenchuathue as
select t.MaT,Tentruyen,Theloai
from tblDocgia d inner join tblThuetruyen tt on d.MaDG=tt.MaDG
				 inner join tblTruyen t on tt.MaT=t.MaT
where tt.MaT not in(select MaT from tblThuetruyen)

/*Đưa ra các thông tin gồm: Mã độc giả, họ tên, tên truyện, nhà xuất bản của các 
độc giả đã thuê các cuốn truyện của nhà xuất bản ‘Tuổi trẻ’ vào tháng 5.*/
select d.MaDG,Hoten,Tentruyen,NhaXB
from tblDocgia d inner join tblThuetruyen tt on d.MaDG=tt.MaDG
				 inner join tblTruyen t on tt.MaT=t.MaT
where NhaXB=N'KimĐồng' and Month(Ngaymuon)=3
/*Đưa ra các thông tin gồm: Mã truyện, tên truyện, số lần thuê của mỗi cuốn
truyện đã cho thuê có số lần thuê nhiều hơn 3. Danh sách đưa ra được sắp theo 
thứ tự tăng dần của trường số lần thuê.*/
select t.MaT,Tentruyen,count(tt.MaT) as Solanthue
from tblDocgia d inner join tblThuetruyen tt on d.MaDG=tt.MaDG
				 inner join tblTruyen t on tt.MaT=t.MaT
Group by t.MaT,Tentruyen
Having count(tt.MaT)>=2
order by ASC

