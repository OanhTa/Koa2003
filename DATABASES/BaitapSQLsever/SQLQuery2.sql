create database QLD

USE QLD

CREATE TABLE Sinhvien(MaSV VARCHAR(3) NOT NULL, HoTen NVARCHAR(30) NOT NULL, GioiTinh NVARCHAR(5) NOT NULL, NgaySinh DATE NOT NULL, QueQuan NVARCHAR(50) NOT NULL, MaLop NVARCHAR(10) NOT NULL)

CREATE TABLE HocPhan(MaHP VARCHAR(10) NOT NULL, TenHP NVARCHAR(30) NOT NULL, SoTinChi INT NOT NULL)

CREATE TABLE Diem(MaSV VARCHAR(3) NOT NULL, MaHP NVARCHAR(30) NOT NULL, Diem INT NOT NULL, HocKi NVARCHAR(2) NOT NULL)

INSERT INTO SinhVien(MaSV, HoTen, GioiTinh, NgaySinh, QueQuan, MaLop)
VALUES ('IT1', N'Trần Quốc Khánh', 'Nam', '12/03/2002', 'ThaiBinh', 'CNTTK1')  

CREATE VIEW Chon(MaSV, HoTen, NgaySinh, GioiTinh, Quequan) AS SELECT MaSV,HoTen,NgaySinh,GioiTinh,QueQuan FROM Sinhvien
WHERE QueQuan = N'%Thanh Hoa' or QueQuan = N'%Cần Thơ'

CREATE VIEW Diem-chon(HoTen, NgaySinh, GioiTinh) AS SELECT HoTen,NgaySinh,GioiTinh FROM Sinhvien
WHERE QueQuan = N'%Thanh Hoa' or QueQuan = N'%Cần Thơ'

