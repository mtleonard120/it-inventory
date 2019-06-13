-- DELETE ALL FROM ALL TABLES
DELETE FROM [dbo].[AuthIDServer];
DELETE FROM [dbo].[HardwareHistory];
DELETE FROM [dbo].[ProgramHistory];
DELETE FROM [dbo].[Computer];
DELETE FROM [dbo].[Monitor];
DELETE FROM [dbo].[Peripheral];
DELETE FROM [dbo].[Server];
DELETE FROM [dbo].[Plugins];
DELETE FROM [dbo].[Program];
DELETE FROM [dbo].[Employee];
DELETE FROM [dbo].[Department];

-- Insert AuthIDServer values.
SET IDENTITY_INSERT [dbo].[AuthIDServer] ON
INSERT INTO [dbo].[AuthIDServer] ([AuthorizationSimpleID], [ActiveDirectoryID], [RefreshToken], [IsAdmin]) VALUES (1, N'1', N'bkjh4wbkjthb4kjhwbe4kjthbwek4jhtbkjwe4hbtkjh4webtkjwhbe4khj', 1)
INSERT INTO [dbo].[AuthIDServer] ([AuthorizationSimpleID], [ActiveDirectoryID], [RefreshToken], [IsAdmin]) VALUES (2, N'2', N'jqwkh4b5jwuke4hyg5gkj4whgbj5khwe4brtkj4heb', 0)
INSERT INTO [dbo].[AuthIDServer] ([AuthorizationSimpleID], [ActiveDirectoryID], [RefreshToken], [IsAdmin]) VALUES (3, N'3', N'fa4dsvse4v4sef', 0)
SET IDENTITY_INSERT [dbo].[AuthIDServer] OFF

-- Insert department values.
SET IDENTITY_INSERT [dbo].[Department] ON 
INSERT INTO [dbo].[Department] ([DepartmentID], [DefaultHardware], [DefaultPrograms], [DepartmentName], [IsDeleted]) VALUES (8, N'Mouse, Keyboard, Monitor', N'Office, Jira, Admintools', N'IT', 0)
INSERT INTO [dbo].[Department] ([DepartmentID], [DefaultHardware], [DefaultPrograms], [DepartmentName], [IsDeleted]) VALUES (13, N'Mouse, Keyboard, Monitor', N'Office, Jira, Confluence, Visual Studio', N'Developer', 0)
INSERT INTO [dbo].[Department] ([DepartmentID], [DefaultHardware], [DefaultPrograms], [DepartmentName], [IsDeleted]) VALUES (14, N'Mouse, Keyboard, Monitor', N'Office, Jira, Confluence, Sketch', N'Design', 0)
INSERT INTO [dbo].[Department] ([DepartmentID], [DefaultHardware], [DefaultPrograms], [DepartmentName], [IsDeleted]) VALUES (15, N'Mouse, Keyboard', N'Office, Jira, Confluence, Calendar', N'Project Manager', 0)
INSERT INTO [dbo].[Department] ([DepartmentID], [DefaultHardware], [DefaultPrograms], [DepartmentName], [IsDeleted]) VALUES (16, N'CQL', N'CQL', N'Utilities', 0)
INSERT INTO [dbo].[Department] ([DepartmentID], [DefaultHardware], [DefaultPrograms], [DepartmentName], [IsDeleted]) VALUES (17, N'Mouse, Keyboard, Monitor', N'Office, Confluence, Viper', N'Sales', 0)
INSERT INTO [dbo].[Department] ([DepartmentID], [DefaultHardware], [DefaultPrograms], [DepartmentName], [IsDeleted]) VALUES (20, N'Mouse, Keyboard, Monitor', N'Office, Jira, Calendar', N'DevOps', 0)
SET IDENTITY_INSERT [dbo].[Department] OFF

-- Indert Employee Values
SET IDENTITY_INSERT [dbo].[Employee] ON 
INSERT INTO [dbo].[Employee] ([EmployeeID], [HireDate], [DepartmentID], [IsDeleted], [UserSettings], [FirstName], [LastName], [Email], [Role], [ADGUID]) VALUES (1, CAST(N'2012-05-05' AS Date), 8, 0, N'Jira, Office, Confluence', N'Dan', N'TheMan', N'email.com', N'Admin', N'1')
INSERT INTO [dbo].[Employee] ([EmployeeID], [HireDate], [DepartmentID], [IsDeleted], [UserSettings], [FirstName], [LastName], [Email], [Role], [ADGUID]) VALUES (2, CAST(N'2013-05-05' AS Date), 13, 0, NULL, N'Mike', N'Leo', N'email.com', N'Developer', N'2')
INSERT INTO [dbo].[Employee] ([EmployeeID], [HireDate], [DepartmentID], [IsDeleted], [UserSettings], [FirstName], [LastName], [Email], [Role], [ADGUID]) VALUES (3, CAST(N'2010-02-02' AS Date), 13, 0, NULL, N'Steve', N'Jobs', N'email.com', N'Developer', N'3')
INSERT INTO [dbo].[Employee] ([EmployeeID], [HireDate], [DepartmentID], [IsDeleted], [UserSettings], [FirstName], [LastName], [Email], [Role], [ADGUID]) VALUES (4, CAST(N'2016-02-04' AS Date), 13, 0, NULL, N'John', N'Does', N'email.com', N'Developer', N'4')
INSERT INTO [dbo].[Employee] ([EmployeeID], [HireDate], [DepartmentID], [IsDeleted], [UserSettings], [FirstName], [LastName], [Email], [Role], [ADGUID]) VALUES (5, CAST(N'2018-01-01' AS Date), 14, 0, NULL, N'Jack', N'Black', N'email.com', N'Designer', N'5')
INSERT INTO [dbo].[Employee] ([EmployeeID], [HireDate], [DepartmentID], [IsDeleted], [UserSettings], [FirstName], [LastName], [Email], [Role], [ADGUID]) VALUES (6, CAST(N'2012-12-14' AS Date), 14, 0, NULL, N'Jill', N'Doe', N'email.com', N'Designer', N'6')
INSERT INTO [dbo].[Employee] ([EmployeeID], [HireDate], [DepartmentID], [IsDeleted], [UserSettings], [FirstName], [LastName], [Email], [Role], [ADGUID]) VALUES (8, CAST(N'2014-12-12' AS Date), 15, 0, NULL, N'Wayne', N'Rooney', N'email.com', N'Project Manager', N'7')
INSERT INTO [dbo].[Employee] ([EmployeeID], [HireDate], [DepartmentID], [IsDeleted], [UserSettings], [FirstName], [LastName], [Email], [Role], [ADGUID]) VALUES (9, CAST(N'2006-12-13' AS Date), 15, 0, NULL, N'Jemima', N'Puddleduck', N'email.com', N'Project Manager', N'8')
INSERT INTO [dbo].[Employee] ([EmployeeID], [HireDate], [DepartmentID], [IsDeleted], [UserSettings], [FirstName], [LastName], [Email], [Role], [ADGUID]) VALUES (10, CAST(N'2019-05-05' AS Date), 16, 0, NULL, N'CQL', N'CQL', N'CQL', N'CQL', N'CQL')
INSERT INTO [dbo].[Employee] ([EmployeeID], [HireDate], [DepartmentID], [IsDeleted], [UserSettings], [FirstName], [LastName], [Email], [Role], [ADGUID]) VALUES (11, CAST(N'2019-06-07' AS Date), 14, 0, NULL, N'Charlie', N'Kornhole', N'charlie.kornhole@cqlcorp.com', N'Designer', N'10')
SET IDENTITY_INSERT [dbo].[Employee] OFF

-- Insert Computer values.
SET IDENTITY_INSERT [dbo].[Computer] ON 
INSERT INTO [dbo].[Computer] ([ComputerID], [ComputerName], [CPU], [RAMGB], [SSDGB], [PurchaseDate], [RenewalDate], [FlatCost], [MonitorOutput], [EndOfLife], [EmployeeID], [IsAssigned], [TextField], [ScreenSize], [CostPerYear], [IsDeleted], [Resolution], [MFG]) VALUES (1, N'MacBook 2015', N'i74790', 16, 500, CAST(N'2012-02-02' AS Date), CAST(N'2012-02-02' AS Date), 450.0000, N'HDMI', CAST(N'2022-02-02' AS Date), 3, 1, NULL, CAST(13.00 AS Decimal(9, 2)), NULL, 0, 1, NULL)
INSERT INTO [dbo].[Computer] ([ComputerID], [ComputerName], [CPU], [RAMGB], [SSDGB], [PurchaseDate], [RenewalDate], [FlatCost], [MonitorOutput], [EndOfLife], [EmployeeID], [IsAssigned], [TextField], [ScreenSize], [CostPerYear], [IsDeleted], [Resolution], [MFG]) VALUES (2, N'Notebook 2019', N'i99999', 32, 1000, CAST(N'2019-02-02' AS Date), CAST(N'2022-02-02' AS Date), 950.0000, N'HDMI', CAST(N'2024-02-02' AS Date), 4, 1, NULL, CAST(15.00 AS Decimal(9, 2)), NULL, 0, 2, NULL)
INSERT INTO [dbo].[Computer] ([ComputerID], [ComputerName], [CPU], [RAMGB], [SSDGB], [PurchaseDate], [RenewalDate], [FlatCost], [MonitorOutput], [EndOfLife], [EmployeeID], [IsAssigned], [TextField], [ScreenSize], [CostPerYear], [IsDeleted], [Resolution], [MFG]) VALUES (3, N'CoolerMaster 20188', N'i99999', 16, 1200, CAST(N'2019-02-02' AS Date), CAST(N'2022-02-02' AS Date), 950.0000, N'HDMI, VGA', CAST(N'2025-02-02' AS Date), NULL, 0, NULL, NULL, NULL, 0, NULL, NULL)
INSERT INTO [dbo].[Computer] ([ComputerID], [ComputerName], [CPU], [RAMGB], [SSDGB], [PurchaseDate], [RenewalDate], [FlatCost], [MonitorOutput], [EndOfLife], [EmployeeID], [IsAssigned], [TextField], [ScreenSize], [CostPerYear], [IsDeleted], [Resolution], [MFG]) VALUES (4, N'Dell PC', N'i77777', 16, 2000, CAST(N'2014-02-02' AS Date), CAST(N'2015-02-02' AS Date), 800.0000, N'DVI', CAST(N'2020-02-02' AS Date), 5, 1, NULL, NULL, NULL, 0, NULL, NULL)
INSERT INTO [dbo].[Computer] ([ComputerID], [ComputerName], [CPU], [RAMGB], [SSDGB], [PurchaseDate], [RenewalDate], [FlatCost], [MonitorOutput], [EndOfLife], [EmployeeID], [IsAssigned], [TextField], [ScreenSize], [CostPerYear], [IsDeleted], [Resolution], [MFG]) VALUES (6, N'Dell PC', N'17777', 16, 1000, CAST(N'2019-06-02' AS Date), CAST(N'2019-10-10' AS Date), 850.0000, N'DVI, HDMI', CAST(N'2022-03-06' AS Date), 5, 1, NULL, NULL, NULL, 0, 2, NULL)
INSERT INTO [dbo].[Computer] ([ComputerID], [ComputerName], [CPU], [RAMGB], [SSDGB], [PurchaseDate], [RenewalDate], [FlatCost], [MonitorOutput], [EndOfLife], [EmployeeID], [IsAssigned], [TextField], [ScreenSize], [CostPerYear], [IsDeleted], [Resolution], [MFG]) VALUES (7, N'Notebook 2020', N'i99990', 32, 2000, CAST(N'2019-04-04' AS Date), CAST(N'2020-10-10' AS Date), 1000.0000, N'HMDI', CAST(N'2020-03-03' AS Date), 2, 1, NULL, CAST(15.00 AS Decimal(9, 2)), NULL, 0, 1, NULL)
INSERT INTO [dbo].[Computer] ([ComputerID], [ComputerName], [CPU], [RAMGB], [SSDGB], [PurchaseDate], [RenewalDate], [FlatCost], [MonitorOutput], [EndOfLife], [EmployeeID], [IsAssigned], [TextField], [ScreenSize], [CostPerYear], [IsDeleted], [Resolution], [MFG]) VALUES (9, N'Macbook 2020', N'i77770', 16, 1000, CAST(N'2019-06-06' AS Date), CAST(N'2025-10-10' AS Date), 1500.0000, N'Display Port', CAST(N'2020-03-03' AS Date), NULL, 0, NULL, CAST(13.00 AS Decimal(9, 2)), NULL, 1, 1, NULL)
SET IDENTITY_INSERT [dbo].[Computer] OFF

-- Insert Monitor Values
SET IDENTITY_INSERT [dbo].[Monitor] ON 
INSERT [dbo].[Monitor] ([MonitorID], [Make], [Model], [Resolution], [Outputs], [EmployeeID], [IsAssigned], [TextField], [PurchaseDate], [FlatCost], [CostPerYear], [IsDeleted], [ScreenSize], [MFG]) VALUES (1, N'Dell', N'2017', 1, N'HDMI, VGA', NULL, 0, NULL, CAST(N'2014-02-02' AS Date), 150.0000, NULL, 0, 17, NULL)
INSERT [dbo].[Monitor] ([MonitorID], [Make], [Model], [Resolution], [Outputs], [EmployeeID], [IsAssigned], [TextField], [PurchaseDate], [FlatCost], [CostPerYear], [IsDeleted], [ScreenSize], [MFG]) VALUES (2, N'Dell', N'2012', 1, N'HDMI', 4, 1, NULL, CAST(N'2015-02-02' AS Date), 200.0000, NULL, 0, 15, NULL)
INSERT [dbo].[Monitor] ([MonitorID], [Make], [Model], [Resolution], [Outputs], [EmployeeID], [IsAssigned], [TextField], [PurchaseDate], [FlatCost], [CostPerYear], [IsDeleted], [ScreenSize], [MFG]) VALUES (3, N'Dell', N'2019', 2, N'HDMI', 2, 1, NULL, CAST(N'2019-02-02' AS Date), 350.0000, NULL, 0, 24, NULL)
INSERT [dbo].[Monitor] ([MonitorID], [Make], [Model], [Resolution], [Outputs], [EmployeeID], [IsAssigned], [TextField], [PurchaseDate], [FlatCost], [CostPerYear], [IsDeleted], [ScreenSize], [MFG]) VALUES (4, N'Asus', N'2020', 2, N'Display Port, HMDI', 5, 1, NULL, CAST(N'2019-06-06' AS Date), 450.0000, NULL, 0, 26, NULL)
INSERT [dbo].[Monitor] ([MonitorID], [Make], [Model], [Resolution], [Outputs], [EmployeeID], [IsAssigned], [TextField], [PurchaseDate], [FlatCost], [CostPerYear], [IsDeleted], [ScreenSize], [MFG]) VALUES (5, N'Samsung', N'2016', 1, N'HDMI, VGA', NULL, 0, NULL, CAST(N'2016-02-02' AS Date), 150.0000, NULL, 0, 24, NULL)
INSERT [dbo].[Monitor] ([MonitorID], [Make], [Model], [Resolution], [Outputs], [EmployeeID], [IsAssigned], [TextField], [PurchaseDate], [FlatCost], [CostPerYear], [IsDeleted], [ScreenSize], [MFG]) VALUES (6, N'Samsung', N'2018', 1, N'Display Port, HMDI', 9, 1, NULL, CAST(N'2018-05-05' AS Date), 150.0000, NULL, 0, 22, NULL)
INSERT [dbo].[Monitor] ([MonitorID], [Make], [Model], [Resolution], [Outputs], [EmployeeID], [IsAssigned], [TextField], [PurchaseDate], [FlatCost], [CostPerYear], [IsDeleted], [ScreenSize], [MFG]) VALUES (7, N'Samsung', N'2017', 2, N'HDMI', 6, 1, NULL, CAST(N'2017-02-02' AS Date), 200.0000, NULL, 0, 22, NULL)
INSERT [dbo].[Monitor] ([MonitorID], [Make], [Model], [Resolution], [Outputs], [EmployeeID], [IsAssigned], [TextField], [PurchaseDate], [FlatCost], [CostPerYear], [IsDeleted], [ScreenSize], [MFG]) VALUES (9, N'Panasonic', N'2010', 1, N'DVI', 4, 1, NULL, CAST(N'2010-02-02' AS Date), 120.0000, NULL, 1, 16, NULL)
INSERT [dbo].[Monitor] ([MonitorID], [Make], [Model], [Resolution], [Outputs], [EmployeeID], [IsAssigned], [TextField], [PurchaseDate], [FlatCost], [CostPerYear], [IsDeleted], [ScreenSize], [MFG]) VALUES (10, N'Benq', N'2017', 1, N'Display Port, HDMI, VGA', 3, 1, NULL, CAST(N'2017-02-02' AS Date), 200.0000, NULL, 0, 24, NULL)
INSERT [dbo].[Monitor] ([MonitorID], [Make], [Model], [Resolution], [Outputs], [EmployeeID], [IsAssigned], [TextField], [PurchaseDate], [FlatCost], [CostPerYear], [IsDeleted], [ScreenSize], [MFG]) VALUES (11, N'Benq', N'2020', 2, N'Display Port', 5, 1, NULL, CAST(N'2020-02-02' AS Date), 180.0000, NULL, 1, 24, NULL)
SET IDENTITY_INSERT [dbo].[Monitor] OFF

-- Insert Peripheral Values
SET IDENTITY_INSERT [dbo].[Peripheral] ON 
INSERT [dbo].[Peripheral] ([PeripheralID], [PeripheralName], [PeripheralType], [TextField], [EmployeeID], [IsAssigned], [FlatCost], [PurchaseDate], [CostPerYear], [IsDeleted], [MFG]) VALUES (1, N'Mouse', N'Mouse', NULL, NULL, 0, 20.0000, CAST(N'2010-02-02' AS Date), NULL, 0, NULL)
INSERT [dbo].[Peripheral] ([PeripheralID], [PeripheralName], [PeripheralType], [TextField], [EmployeeID], [IsAssigned], [FlatCost], [PurchaseDate], [CostPerYear], [IsDeleted], [MFG]) VALUES (3, N'Logitech', N'Mouse', NULL, 2, 1, 25.0000, CAST(N'2017-02-02' AS Date), NULL, 0, NULL)
INSERT [dbo].[Peripheral] ([PeripheralID], [PeripheralName], [PeripheralType], [TextField], [EmployeeID], [IsAssigned], [FlatCost], [PurchaseDate], [CostPerYear], [IsDeleted], [MFG]) VALUES (4, N'DBPower', N'Keyboard', N'Cool lights', 4, 1, 22.5000, CAST(N'2019-05-24' AS Date), NULL, 0, NULL)
INSERT [dbo].[Peripheral] ([PeripheralID], [PeripheralName], [PeripheralType], [TextField], [EmployeeID], [IsAssigned], [FlatCost], [PurchaseDate], [CostPerYear], [IsDeleted], [MFG]) VALUES (6, N'Logitech', N'Keyboard', NULL, 5, 1, 40.0000, CAST(N'2018-05-05' AS Date), NULL, 0, NULL)
INSERT [dbo].[Peripheral] ([PeripheralID], [PeripheralName], [PeripheralType], [TextField], [EmployeeID], [IsAssigned], [FlatCost], [PurchaseDate], [CostPerYear], [IsDeleted], [MFG]) VALUES (7, N'Bose', N'Headphones', NULL, 1, 1, 200.0000, CAST(N'2019-06-03' AS Date), NULL, 0, NULL)
INSERT [dbo].[Peripheral] ([PeripheralID], [PeripheralName], [PeripheralType], [TextField], [EmployeeID], [IsAssigned], [FlatCost], [PurchaseDate], [CostPerYear], [IsDeleted], [MFG]) VALUES (8, N'Bose', N'Headphones', NULL, 4, 1, 350.0000, CAST(N'2019-02-02' AS Date), NULL, 0, NULL)
INSERT [dbo].[Peripheral] ([PeripheralID], [PeripheralName], [PeripheralType], [TextField], [EmployeeID], [IsAssigned], [FlatCost], [PurchaseDate], [CostPerYear], [IsDeleted], [MFG]) VALUES (9, N'Dell', N'Mouse', NULL, NULL, 0, 15.0000, CAST(N'2016-02-02' AS Date), NULL, 0, NULL)
INSERT [dbo].[Peripheral] ([PeripheralID], [PeripheralName], [PeripheralType], [TextField], [EmployeeID], [IsAssigned], [FlatCost], [PurchaseDate], [CostPerYear], [IsDeleted], [MFG]) VALUES (10, N'Dell', N'Mouse', NULL, 6, 1, 22.0000, CAST(N'2017-05-05' AS Date), NULL, 0, NULL)
INSERT [dbo].[Peripheral] ([PeripheralID], [PeripheralName], [PeripheralType], [TextField], [EmployeeID], [IsAssigned], [FlatCost], [PurchaseDate], [CostPerYear], [IsDeleted], [MFG]) VALUES (12, N'Dell', N'Headphones', NULL, 8, 1, 22.0000, CAST(N'2016-05-05' AS Date), NULL, 0, NULL)
INSERT [dbo].[Peripheral] ([PeripheralID], [PeripheralName], [PeripheralType], [TextField], [EmployeeID], [IsAssigned], [FlatCost], [PurchaseDate], [CostPerYear], [IsDeleted], [MFG]) VALUES (13, N'Hp', N'Printer', NULL, 1, 1, 100.0000, CAST(N'2018-05-05' AS Date), NULL, 0, NULL)
INSERT [dbo].[Peripheral] ([PeripheralID], [PeripheralName], [PeripheralType], [TextField], [EmployeeID], [IsAssigned], [FlatCost], [PurchaseDate], [CostPerYear], [IsDeleted], [MFG]) VALUES (14, N'HP', N'Mouse', NULL, NULL, 0, 25.0000, CAST(N'2016-05-05' AS Date), NULL, 0, NULL)
SET IDENTITY_INSERT [dbo].[Peripheral] OFF

-- Insert Program Values
SET IDENTITY_INSERT [dbo].[Program] ON 
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (2, N'Jira', 2.7500, NULL, NULL, 1, 1, NULL, N'amazon', 1, 0, 1, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (3, N'Jira', 2.7500, NULL, NULL, 1, 2, NULL, N'amazon', 1, 0, 1, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (4, N'Jira', 2.7500, NULL, NULL, 1, NULL, NULL, N'amazon', 1, 0, 1, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (9, N'BitBucket', 33.0000, NULL, NULL, 1, 1, NULL, N'amazon', 1, 0, 0, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (10, N'BitBucket', 33.0000, NULL, NULL, 1, 2, NULL, N'amazon', 1, 0, 0, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (11, N'BitBucket', 33.0000, NULL, NULL, 1, NULL, NULL, N'amazon', 1, 0, 0, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (13, N'Microsoft Visual Studio', NULL, 88.0000, N'0000-0000', 0, 1, NULL, NULL, 0, 0, 0, CAST(N'2019-06-06' AS Date))
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (14, N'Microsoft Visual Studio', NULL, 88.0000, N'0000-0001', 0, 4, NULL, NULL, 0, 0, 0, CAST(N'2016-02-02' AS Date))
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (15, N'Office', NULL, NULL, N'0000-0000', 0, 6, NULL, NULL, 0, 0, 0, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (18, N'Office', NULL, NULL, NULL, 0, 4, NULL, NULL, 0, 0, 0, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (19, N'BitBucket', 33.0000, NULL, NULL, 1, NULL, NULL, NULL, 1, 0, 0, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (20, N'Viper', 1000.0000, NULL, NULL, 0, 10, NULL, N'Viper.com', 1, 0, 1, CAST(N'2018-02-02' AS Date))
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (21, N'Confluence', 50.0000, NULL, NULL, 1, 5, NULL, NULL, 1, 1, 0, CAST(N'2018-02-02' AS Date))
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (22, N'Confluence', 50.0000, NULL, NULL, 1, 5, NULL, NULL, 1, 0, 0, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (23, N'Confluence', 50.0000, NULL, NULL, 1, 2, NULL, NULL, 1, 0, 0, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (24, N'Confluence', 50.0000, NULL, NULL, 1, 9, NULL, NULL, 1, 0, 0, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (25, N'Office', NULL, 25.0000, NULL, 0, 5, NULL, NULL, 0, 0, 0, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (26, N'Mircrosoft Silver', 1250.0000, NULL, NULL, 0, 10, NULL, NULL, 0, 0, 0, NULL)
INSERT [dbo].[Program] ([ProgramID], [ProgramName], [ProgramCostPerYear], [ProgramCostPerEmployee], [ProgramLicenseKey], [IsLicense], [EmployeeID], [Description], [ProgramPurchaseLink], [HasPlugIn], [IsDeleted], [IsCostPerYear], [DateBought]) VALUES (27, N'Office', NULL, NULL, NULL, 0, 3, NULL, NULL, 0, 0, 0, NULL)
SET IDENTITY_INSERT [dbo].[Program] OFF

-- Insert Server Values
SET IDENTITY_INSERT [dbo].[Server] ON 
INSERT [dbo].[Server] ([ServerID], [ServerName], [FQDN], [NumberOfCores], [OperatingSystem], [RAM], [Virtualize], [RenewalDate], [EmployeeID], [PurchaseDate], [FlatCost], [EndOfLife], [IsAssigned], [TextField], [CostPerYear], [IsDeleted], [MFG]) VALUES (1, N'Server', N'Idk', 12, N'Windows', 64, 0, CAST(N'2019-02-02' AS Date), 10, CAST(N'2017-02-20' AS Date), NULL, CAST(N'2022-02-02' AS Date), 1, NULL, 650.0000, 0, NULL)
INSERT [dbo].[Server] ([ServerID], [ServerName], [FQDN], [NumberOfCores], [OperatingSystem], [RAM], [Virtualize], [RenewalDate], [EmployeeID], [PurchaseDate], [FlatCost], [EndOfLife], [IsAssigned], [TextField], [CostPerYear], [IsDeleted], [MFG]) VALUES (2, N'Server', N'IDK', 24, N'Windows', 62, 0, CAST(N'2019-05-10' AS Date), 10, CAST(N'2017-02-20' AS Date), NULL, CAST(N'2022-02-02' AS Date), 1, NULL, 650.0000, 0, NULL)
SET IDENTITY_INSERT [dbo].[Server] OFF

-- Insert Plugin Values
SET IDENTITY_INSERT [dbo].[Plugins] ON 
INSERT [dbo].[Plugins] ([PluginName], [PluginID], [PluginFlatCost], [ProgramID], [TextField], [PluginCostPerYear], [IsDeleted]) VALUES (N'Timetracker - Time Tracking & Reporting Cost', 1, NULL, 2, NULL, 225.0000, 0)
INSERT [dbo].[Plugins] ([PluginName], [PluginID], [PluginFlatCost], [ProgramID], [TextField], [PluginCostPerYear], [IsDeleted]) VALUES (N'JIRA Service Desk (Server) Cost', 2, NULL, 2, NULL, 10.0000, 0)
INSERT [dbo].[Plugins] ([PluginName], [PluginID], [PluginFlatCost], [ProgramID], [TextField], [PluginCostPerYear], [IsDeleted]) VALUES (N'Adaptavist ScriptRunner Cost', 5, NULL, 2, NULL, 250.0000, 0)
INSERT [dbo].[Plugins] ([PluginName], [PluginID], [PluginFlatCost], [ProgramID], [TextField], [PluginCostPerYear], [IsDeleted]) VALUES (N'JIRA Suite Utilities Cost', 7, NULL, 2, NULL, 250.0000, 0)
INSERT [dbo].[Plugins] ([PluginName], [PluginID], [PluginFlatCost], [ProgramID], [TextField], [PluginCostPerYear], [IsDeleted]) VALUES (N'BitBucket Server Webhoook', 8, NULL, 9, NULL, 350.0000, 0)
INSERT [dbo].[Plugins] ([PluginName], [PluginID], [PluginFlatCost], [ProgramID], [TextField], [PluginCostPerYear], [IsDeleted]) VALUES (N'Viper Extension', 11, NULL, 2, NULL, NULL, 0)
INSERT [dbo].[Plugins] ([PluginName], [PluginID], [PluginFlatCost], [ProgramID], [TextField], [PluginCostPerYear], [IsDeleted]) VALUES (N'Viper Extension Addon', 13, NULL, 20, NULL, 120.0000, 0)
SET IDENTITY_INSERT [dbo].[Plugins] OFF

-- Insert HardwareHistory Values
SET IDENTITY_INSERT [dbo].[HardwareHistory] ON 
INSERT [dbo].[HardwareHistory] ([HardwareHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [HardwareType], [HardwareID], [EventName], [EventDescription]) VALUES (1, 3, CAST(N'2012-02-02' AS Date), NULL, N'Computer', 1, N'Assigning laptop', N'Gave Steve Jobs a laptop')
INSERT [dbo].[HardwareHistory] ([HardwareHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [HardwareType], [HardwareID], [EventName], [EventDescription]) VALUES (2, 4, CAST(N'2019-05-05' AS Date), 3, N'Computer', 2, N'Trading laptop', N'Gave John Does, Steve Job''s notebook')
INSERT [dbo].[HardwareHistory] ([HardwareHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [HardwareType], [HardwareID], [EventName], [EventDescription]) VALUES (3, 3, CAST(N'2019-04-04' AS Date), NULL, N'Computer', 2, N'Assigning laptop', N'Gave Steve Jobs a notebook')
INSERT [dbo].[HardwareHistory] ([HardwareHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [HardwareType], [HardwareID], [EventName], [EventDescription]) VALUES (4, 4, CAST(N'2019-02-02' AS Date), NULL, N'Monitor', 2, N'Assigning Monitor', N'Gave John Does a Dell monitor')
INSERT [dbo].[HardwareHistory] ([HardwareHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [HardwareType], [HardwareID], [EventName], [EventDescription]) VALUES (5, 2, CAST(N'2018-02-02' AS Date), NULL, N'Monitor', 3, N'Assigning Monitor', N'Gave Mike Leo a Dell 2019 monitor')
INSERT [dbo].[HardwareHistory] ([HardwareHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [HardwareType], [HardwareID], [EventName], [EventDescription]) VALUES (6, 2, CAST(N'2017-02-02' AS Date), NULL, N'Peripheral', 3, N'Assigning Mouse ', N'Gave Mike Leo a Logitech Mouse')
SET IDENTITY_INSERT [dbo].[HardwareHistory] OFF

-- Insert ProgramHistory Values
SET IDENTITY_INSERT [dbo].[ProgramHistory] ON 
INSERT [dbo].[ProgramHistory] ([ProgramHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [ProgramID], [EventName], [EventDescription]) VALUES (1, 1, CAST(N'2019-02-02' AS Date), NULL, 2, NULL, NULL)
INSERT [dbo].[ProgramHistory] ([ProgramHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [ProgramID], [EventName], [EventDescription]) VALUES (2, 3, CAST(N'2019-02-02' AS Date), NULL, 3, NULL, NULL)
INSERT [dbo].[ProgramHistory] ([ProgramHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [ProgramID], [EventName], [EventDescription]) VALUES (3, 4, CAST(N'2019-02-02' AS Date), NULL, 11, NULL, NULL)
INSERT [dbo].[ProgramHistory] ([ProgramHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [ProgramID], [EventName], [EventDescription]) VALUES (5, 4, CAST(N'2020-02-02' AS Date), NULL, 13, NULL, NULL)
INSERT [dbo].[ProgramHistory] ([ProgramHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [ProgramID], [EventName], [EventDescription]) VALUES (6, 5, CAST(N'2020-02-02' AS Date), NULL, 14, NULL, NULL)
INSERT [dbo].[ProgramHistory] ([ProgramHistoryID], [CurrentOwnerID], [CurrentOwnerStartDate], [PreviousOwnerID], [ProgramID], [EventName], [EventDescription]) VALUES (8, 8, CAST(N'2019-02-02' AS Date), NULL, 18, NULL, NULL)
SET IDENTITY_INSERT [dbo].[ProgramHistory] OFF