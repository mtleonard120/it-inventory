/****** Object:  Table [dbo].[AuthIDServer]    Script Date: 6/7/2019 12:32:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuthIDServer](
	[AuthorizationSimpleID] [int] IDENTITY(1,1) NOT NULL,
	[ActiveDirectoryID] [nvarchar](max) NOT NULL,
	[RefreshToken] [nvarchar](max) NULL,
	[IsAdmin] [bit] NOT NULL,
 CONSTRAINT [PK_AuthIDServer] PRIMARY KEY CLUSTERED 
(
	[AuthorizationSimpleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Computer]    Script Date: 6/7/2019 12:32:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Computer](
	[ComputerID] [int] IDENTITY(1,1) NOT NULL,
	[ComputerName] [nvarchar](100) NULL,
	[CPU] [nvarchar](50) NULL,
	[RAMGB] [int] NULL,
	[SSDGB] [int] NULL,
	[PurchaseDate] [date] NULL,
	[RenewalDate] [date] NULL,
	[FlatCost] [money] NULL,
	[MonitorOutput] [nvarchar](50) NULL,
	[EndOfLife] [date] NULL,
	[EmployeeID] [int] NULL,
	[IsAssigned] [bit] NOT NULL,
	[TextField] [nvarchar](max) NULL,
	[ScreenSize] [decimal](9, 2) NULL,
	[CostPerYear] [money] NULL,
	[IsDeleted] [bit] NOT NULL,
	[Resolution] [int] NULL,
	[MFG] [nvarchar](50) NULL,
 CONSTRAINT [PK_Computer] PRIMARY KEY CLUSTERED 
(
	[ComputerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 6/7/2019 12:32:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[DepartmentID] [int] IDENTITY(1,1) NOT NULL,
	[DefaultHardware] [nvarchar](max) NOT NULL,
	[DefaultPrograms] [nvarchar](max) NOT NULL,
	[DepartmentName] [nvarchar](100) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 6/7/2019 12:32:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[EmployeeID] [int] IDENTITY(1,1) NOT NULL,
	[HireDate] [date] NOT NULL,
	[DepartmentID] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[UserSettings] [nvarchar](max) NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Role] [nvarchar](50) NOT NULL,
	[ADGUID] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HardwareHistory]    Script Date: 6/7/2019 12:32:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HardwareHistory](
	[HardwareHistoryID] [int] IDENTITY(1,1) NOT NULL,
	[CurrentOwnerID] [int] NULL,
	[CurrentOwnerStartDate] [date] NULL,
	[PreviousOwnerID] [int] NULL,
	[HardwareType] [nvarchar](50) NOT NULL,
	[HardwareID] [int] NOT NULL,
	[EventName] [nvarchar](max) NULL,
	[EventDescription] [nvarchar](max) NULL,
 CONSTRAINT [PK_HardwareHistory] PRIMARY KEY CLUSTERED 
(
	[HardwareHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Monitor]    Script Date: 6/7/2019 12:32:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Monitor](
	[MonitorID] [int] IDENTITY(1,1) NOT NULL,
	[Make] [nvarchar](100) NULL,
	[Model] [nvarchar](100) NULL,
	[Resolution] [int] NULL,
	[Outputs] [nvarchar](200) NULL,
	[EmployeeID] [int] NULL,
	[IsAssigned] [bit] NOT NULL,
	[TextField] [nvarchar](max) NULL,
	[PurchaseDate] [date] NULL,
	[FlatCost] [money] NULL,
	[CostPerYear] [money] NULL,
	[IsDeleted] [bit] NOT NULL,
	[ScreenSize] [float] NULL,
	[MFG] [nvarchar](50) NULL,
 CONSTRAINT [PK_Monitor] PRIMARY KEY CLUSTERED 
(
	[MonitorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Peripheral]    Script Date: 6/7/2019 12:32:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Peripheral](
	[PeripheralID] [int] IDENTITY(1,1) NOT NULL,
	[PeripheralName] [nvarchar](100) NULL,
	[PeripheralType] [nvarchar](50) NULL,
	[TextField] [nvarchar](max) NULL,
	[EmployeeID] [int] NULL,
	[IsAssigned] [bit] NOT NULL,
	[FlatCost] [money] NULL,
	[PurchaseDate] [date] NULL,
	[CostPerYear] [money] NULL,
	[IsDeleted] [bit] NOT NULL,
	[MFG] [nvarchar](50) NULL,
 CONSTRAINT [PK_Peripheral] PRIMARY KEY CLUSTERED 
(
	[PeripheralID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Plugins]    Script Date: 6/7/2019 12:32:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Plugins](
	[PluginName] [nvarchar](100) NOT NULL,
	[PluginID] [int] IDENTITY(1,1) NOT NULL,
	[PluginFlatCost] [money] NULL,
	[ProgramID] [int] NULL,
	[TextField] [nvarchar](max) NULL,
	[PluginCostPerYear] [money] NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Plugins] PRIMARY KEY CLUSTERED 
(
	[PluginID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Program]    Script Date: 6/7/2019 12:32:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Program](
	[ProgramID] [int] IDENTITY(1,1) NOT NULL,
	[ProgramName] [nvarchar](100) NOT NULL,
	[ProgramCostPerYear] [money] NULL,
	[ProgramCostPerEmployee] [money] NULL,
	[ProgramLicenseKey] [nvarchar](100) NULL,
	[IsLicense] [bit] NOT NULL,
	[EmployeeID] [int] NULL,
	[Description] [nvarchar](max) NULL,
	[ProgramPurchaseLink] [nvarchar](max) NULL,
	[HasPlugIn] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[IsCostPerYear] [bit] NOT NULL,
 CONSTRAINT [PK_Program] PRIMARY KEY CLUSTERED 
(
	[ProgramID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProgramHistory]    Script Date: 6/7/2019 12:32:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProgramHistory](
	[ProgramHistoryID] [int] IDENTITY(1,1) NOT NULL,
	[CurrentOwnerID] [int] NULL,
	[CurrentOwnerStartDate] [date] NULL,
	[PreviousOwnerID] [int] NULL,
	[ProgramID] [int] NOT NULL,
	[EventName] [nvarchar](max) NULL,
	[EventDescription] [nvarchar](max) NULL,
 CONSTRAINT [PK_ProgramHistory] PRIMARY KEY CLUSTERED 
(
	[ProgramHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Server]    Script Date: 6/7/2019 12:32:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Server](
	[ServerID] [int] IDENTITY(1,1) NOT NULL,
	[ServerName] [nvarchar](100) NULL,
	[FQDN] [nvarchar](max) NULL,
	[NumberOfCores] [int] NULL,
	[OperatingSystem] [nvarchar](100) NULL,
	[RAM] [int] NULL,
	[Virtualize] [bit] NULL,
	[RenewalDate] [date] NULL,
	[EmployeeID] [int] NULL,
	[PurchaseDate] [date] NULL,
	[FlatCost] [money] NULL,
	[EndOfLife] [date] NULL,
	[IsAssigned] [bit] NOT NULL,
	[TextField] [nvarchar](max) NULL,
	[CostPerYear] [money] NULL,
	[IsDeleted] [bit] NOT NULL,
	[MFG] [nvarchar](50) NULL,
 CONSTRAINT [PK_Server] PRIMARY KEY CLUSTERED 
(
	[ServerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Computer]  WITH CHECK ADD  CONSTRAINT [FK_Computer_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[Computer] CHECK CONSTRAINT [FK_Computer_Employee]
GO
ALTER TABLE [dbo].[Department]  WITH CHECK ADD  CONSTRAINT [FK_Department_Department] FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Department] ([DepartmentID])
GO
ALTER TABLE [dbo].[Department] CHECK CONSTRAINT [FK_Department_Department]
GO
ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_Department] FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Department] ([DepartmentID])
GO
ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_Department]
GO
ALTER TABLE [dbo].[HardwareHistory]  WITH CHECK ADD  CONSTRAINT [FK_HardwareHistory_Employee] FOREIGN KEY([CurrentOwnerID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[HardwareHistory] CHECK CONSTRAINT [FK_HardwareHistory_Employee]
GO
ALTER TABLE [dbo].[HardwareHistory]  WITH CHECK ADD  CONSTRAINT [FK_HardwareHistory_Employee1] FOREIGN KEY([PreviousOwnerID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[HardwareHistory] CHECK CONSTRAINT [FK_HardwareHistory_Employee1]
GO
ALTER TABLE [dbo].[Monitor]  WITH CHECK ADD  CONSTRAINT [FK_Monitor_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[Monitor] CHECK CONSTRAINT [FK_Monitor_Employee]
GO
ALTER TABLE [dbo].[Peripheral]  WITH CHECK ADD  CONSTRAINT [FK_Peripheral_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[Peripheral] CHECK CONSTRAINT [FK_Peripheral_Employee]
GO
ALTER TABLE [dbo].[Plugins]  WITH CHECK ADD  CONSTRAINT [FK_Plugins_Program] FOREIGN KEY([ProgramID])
REFERENCES [dbo].[Program] ([ProgramID])
GO
ALTER TABLE [dbo].[Plugins] CHECK CONSTRAINT [FK_Plugins_Program]
GO
ALTER TABLE [dbo].[Program]  WITH CHECK ADD  CONSTRAINT [FK_Program_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[Program] CHECK CONSTRAINT [FK_Program_Employee]
GO
ALTER TABLE [dbo].[ProgramHistory]  WITH CHECK ADD  CONSTRAINT [FK_ProgramHistory_Employee] FOREIGN KEY([CurrentOwnerID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[ProgramHistory] CHECK CONSTRAINT [FK_ProgramHistory_Employee]
GO
ALTER TABLE [dbo].[ProgramHistory]  WITH CHECK ADD  CONSTRAINT [FK_ProgramHistory_Employee1] FOREIGN KEY([PreviousOwnerID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[ProgramHistory] CHECK CONSTRAINT [FK_ProgramHistory_Employee1]
GO
ALTER TABLE [dbo].[ProgramHistory]  WITH CHECK ADD  CONSTRAINT [FK_ProgramHistory_Program] FOREIGN KEY([ProgramID])
REFERENCES [dbo].[Program] ([ProgramID])
GO
ALTER TABLE [dbo].[ProgramHistory] CHECK CONSTRAINT [FK_ProgramHistory_Program]
GO
ALTER TABLE [dbo].[Server]  WITH CHECK ADD  CONSTRAINT [FK_Server_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[Server] CHECK CONSTRAINT [FK_Server_Employee]
GO

