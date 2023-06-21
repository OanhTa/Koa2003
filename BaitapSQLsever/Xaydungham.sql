--Ví dụ 1: Xây dựng hàm trả về thứ của một ngày trong cơ sở dữ liệu 
create function timThu(@bngay date)
returns varchar(10)
as
BEGIN
declare @st nvarchar(10)
select @st=case datepart(dw,@bngay)
when 1 then 'chu nhat'
when 2 then 'thu hai'
when 3 then 'thu ba'
when 4 then 'thu tu'
when 5 then 'thu nam'
when 6 then 'thu sau'
else 'thu bay'
end
return (@st)
END

