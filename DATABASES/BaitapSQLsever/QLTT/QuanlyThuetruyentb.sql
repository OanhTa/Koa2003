USE [QuanlyThuetruyen]
GO
/****** Object:  Table [dbo].[tblDocgia]    Script Date: 14/4/2023 10:03:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblDocgia](
	[MaDG] [nvarchar](10) NOT NULL,
	[Hoten] [nvarchar](50) NOT NULL,
	[Gioitinh] [nvarchar](10) NULL,
	[Diachi] [nvarchar](50) NOT NULL,
	[SDT] [int] NOT NULL,
 CONSTRAINT [PK_Docgia] PRIMARY KEY CLUSTERED 
(
	[MaDG] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblTruyen]    Script Date: 14/4/2023 10:03:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTruyen](
	[MaT] [nvarchar](10) NOT NULL,
	[Tentruyen] [nvarchar](50) NOT NULL,
	[Tacgia] [nvarchar](50) NOT NULL,
	[Theloai] [nvarchar](50) NULL,
	[NhaXB] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblTruyen] PRIMARY KEY CLUSTERED 
(
	[MaT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblThuetruyen]    Script Date: 14/4/2023 10:03:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblThuetruyen](
	[MaDG] [nvarchar](10) NOT NULL,
	[MaT] [nvarchar](10) NOT NULL,
	[Ngaymuon] [date] NULL,
	[Ngayhentra] [date] NULL,
	[Ngaytra] [date] NULL,
	[Dongia] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[Truyenchuathue]    Script Date: 14/4/2023 10:03:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[Truyenchuathue] as
select t.MaT,Tentruyen,Theloai
from tblDocgia d inner join tblThuetruyen tt on d.MaDG=tt.MaDG
				 inner join tblTruyen t on tt.MaT=t.MaT
where tt.MaT not in(select MaT from tblThuetruyen)
GO
/****** Object:  View [dbo].[Timtruyen]    Script Date: 14/4/2023 10:03:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[Timtruyen] as
select d.MaDG,Hoten,Tentruyen
from tblDocgia d inner join tblThuetruyen t on d.MaDG=t.MaDG
				 inner join tblTruyen tr on t.MaT=tr.MaT
where Theloai=N'Truyện ngắn' and Tacgia=N'Nguyễn Thị Thanh Nhàn'
GO
