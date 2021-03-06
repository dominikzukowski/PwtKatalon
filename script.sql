USE [pwtkatalon]
GO
/****** Object:  Table [dbo].[Activations]    Script Date: 2018-10-10 15:18:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Activations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ActivationTime] [datetime] NOT NULL,
	[SendUserID] [int] NULL,
	[Comment] [nvarchar](500) NOT NULL,
	[TestSuite] [nvarchar](200) NOT NULL,
	[ReportName] [nvarchar](250) NOT NULL,
	[ConsoleLog] [nvarchar](max) NULL,
	[ErrorLog] [nvarchar](max) NULL,
	[GitLog] [nvarchar](max) NULL,
	[Status] [varchar](50) NOT NULL,
	[RunArguments] [nvarchar](1500) NOT NULL,
	[EnvironmentId] [varchar](50) NOT NULL,
	[Version] [varchar](50) NOT NULL,
	[ZippedResults] [varbinary](max) NULL,
	[JunitResult] [nvarchar](max) NULL,
	[JsonResult] [nvarchar](max) NULL,
	[CounterTotal] [tinyint] NULL,
	[CounterPassed] [tinyint] NULL,
	[CounterFailed] [tinyint] NULL,
	[CounterErrors] [tinyint] NULL,
	[CounterSeconds] [int] NULL,
 CONSTRAINT [PK_Activations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Agencies]    Script Date: 2018-10-10 15:18:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Agencies](
	[OrganizationId] [varchar](50) NOT NULL,
	[AgencyNumber] [varchar](50) NOT NULL,
	[AgencyName] [varchar](150) NOT NULL,
 CONSTRAINT [PK_Agencies] PRIMARY KEY CLUSTERED 
(
	[OrganizationId] ASC,
	[AgencyNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customer_new]    Script Date: 2018-10-10 15:18:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customer_new](
	[Role] [varchar](50) NOT NULL,
	[Last_name] [varchar](50) NOT NULL,
	[First_name] [varchar](50) NOT NULL,
	[Second_last_name] [varchar](50) NOT NULL,
	[Gender] [varchar](50) NOT NULL,
	[Assigned_customer_category] [varchar](50) NOT NULL,
	[Postal_code] [varchar](50) NOT NULL,
	[Prv] [varchar](50) NOT NULL,
	[Country_of_res] [varchar](50) NOT NULL,
	[City_res] [varchar](50) NOT NULL,
	[Identity_document] [varchar](50) NOT NULL,
	[Number] [varchar](50) NOT NULL,
	[Address] [varchar](50) NOT NULL,
	[Address_] [varchar](50) NOT NULL,
	[Issue_country] [varchar](50) NOT NULL,
	[Authority] [varchar](50) NOT NULL,
	[Phone_number] [varchar](50) NOT NULL,
	[Birth_date] [varchar](50) NOT NULL,
	[Issue_city] [varchar](50) NOT NULL,
	[Soc_Sec] [varchar](50) NOT NULL,
	[Country_birth] [varchar](50) NOT NULL,
	[Nation_birth] [varchar](50) NOT NULL,
	[Issue_date] [varchar](50) NOT NULL,
	[Id_valid_until] [varchar](50) NOT NULL,
	[Nationality] [varchar](50) NOT NULL,
	[Place_of_birth] [varchar](50) NOT NULL,
	[Occupation] [varchar](50) NOT NULL,
	[e_Mail] [varchar](50) NOT NULL,
	[Work_phone] [varchar](50) NOT NULL,
	[Company_ID] [varchar](50) NOT NULL,
	[Source_of_funds] [varchar](50) NOT NULL,
	[Purpose_of_trans] [varchar](50) NOT NULL,
	[Relation] [varchar](50) NOT NULL,
	[txOccupation] [varchar](50) NOT NULL,
	[EnvironmentId] [varchar](50) NOT NULL,
	[OrganizationId] [varchar](50) NOT NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_customer_new] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Environment]    Script Date: 2018-10-10 15:18:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Environment](
	[EnvironmentId] [varchar](50) NOT NULL,
	[Version] [varchar](50) NOT NULL,
	[PrimaryUrl] [nvarchar](250) NOT NULL,
	[AlternativeUrl] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_Environment] PRIMARY KEY CLUSTERED 
(
	[EnvironmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Organization]    Script Date: 2018-10-10 15:18:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organization](
	[EnvironmentId] [varchar](50) NOT NULL,
	[OrganizationId] [varchar](50) NOT NULL,
	[OrganizationName] [nvarchar](200) NOT NULL,
	[IsPrimary] [int] NOT NULL,
	[CountryLabel] [varchar](50) NOT NULL,
	[Tags] [varchar](8000) NOT NULL,
 CONSTRAINT [PK_Organisation] PRIMARY KEY CLUSTERED 
(
	[EnvironmentId] ASC,
	[OrganizationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReferenceNumber]    Script Date: 2018-10-10 15:18:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReferenceNumber](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Environment] [varchar](50) NOT NULL,
	[OrganizationId] [varchar](50) NOT NULL,
	[ReferenceNo] [varchar](50) NOT NULL,
	[TransactionType] [varchar](50) NOT NULL,
	[TransactionStatus] [varchar](50) NOT NULL,
	[TransactionDate] [varchar](50) NOT NULL,
	[SenderFirstName] [nvarchar](50) NOT NULL,
	[SenderLastName] [nvarchar](50) NOT NULL,
	[ReceiverFirstName] [nvarchar](50) NOT NULL,
	[ReceiverLastName] [nvarchar](50) NOT NULL,
	[ReceiverCountry] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_ReferenceNumber_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 2018-10-10 15:18:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[EnvironmentId] [varchar](50) NOT NULL,
	[OrganizationId] [varchar](50) NOT NULL,
	[Login] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](200) NOT NULL,
	[Labels] [nvarchar](250) NOT NULL,
	[SetupDate] [datetime] NOT NULL,
	[AgencySend] [varchar](50) NULL,
	[AgencyReceive] [varchar](50) NULL,
	[SchedullerReady] [smallint] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Activations] ADD  CONSTRAINT [DF_Activations_ActivationTime]  DEFAULT (getdate()) FOR [ActivationTime]
GO
ALTER TABLE [dbo].[Activations] ADD  CONSTRAINT [DF_Activations_Comment]  DEFAULT ('') FOR [Comment]
GO
ALTER TABLE [dbo].[Activations] ADD  CONSTRAINT [DF_Activations_TestSuite]  DEFAULT ('') FOR [TestSuite]
GO
ALTER TABLE [dbo].[Activations] ADD  CONSTRAINT [DF_Activations_ReportName]  DEFAULT ('') FOR [ReportName]
GO
ALTER TABLE [dbo].[Activations] ADD  CONSTRAINT [DF_Activations_Status]  DEFAULT ('') FOR [Status]
GO
ALTER TABLE [dbo].[Activations] ADD  CONSTRAINT [DF_Activations_RunArguments]  DEFAULT ('') FOR [RunArguments]
GO
ALTER TABLE [dbo].[Activations] ADD  CONSTRAINT [DF_Activations_EnvironmentId]  DEFAULT ('') FOR [EnvironmentId]
GO
ALTER TABLE [dbo].[Activations] ADD  CONSTRAINT [DF_Activations_Version]  DEFAULT ('') FOR [Version]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Role]  DEFAULT ('') FOR [Role]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Last_name]  DEFAULT ('') FOR [Last_name]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_First_name]  DEFAULT ('') FOR [First_name]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Second_last_name]  DEFAULT ('') FOR [Second_last_name]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Gender]  DEFAULT ('') FOR [Gender]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Assigned_customer_category]  DEFAULT ('') FOR [Assigned_customer_category]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Postal_code]  DEFAULT ('') FOR [Postal_code]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Prv]  DEFAULT ('') FOR [Prv]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Country_of_res]  DEFAULT ('') FOR [Country_of_res]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_City_res]  DEFAULT ('') FOR [City_res]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Identity_document]  DEFAULT ('') FOR [Identity_document]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Number]  DEFAULT ('') FOR [Number]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Address]  DEFAULT ('') FOR [Address]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Address_]  DEFAULT ('') FOR [Address_]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Issue_country]  DEFAULT ('') FOR [Issue_country]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Authority]  DEFAULT ('') FOR [Authority]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Phone_number]  DEFAULT ('') FOR [Phone_number]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Birth_date]  DEFAULT ('') FOR [Birth_date]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Issue_city]  DEFAULT ('') FOR [Issue_city]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Soc_Sec]  DEFAULT ('') FOR [Soc_Sec]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Country_birth]  DEFAULT ('') FOR [Country_birth]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Nation_birth]  DEFAULT ('') FOR [Nation_birth]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Issue_date]  DEFAULT ('') FOR [Issue_date]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Id_valid_until]  DEFAULT ('') FOR [Id_valid_until]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Nationality]  DEFAULT ('') FOR [Nationality]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Place_of_birth]  DEFAULT ('') FOR [Place_of_birth]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Occupation]  DEFAULT ('') FOR [Occupation]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_e_Mail]  DEFAULT ('') FOR [e_Mail]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Work_phone]  DEFAULT ('') FOR [Work_phone]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Company_ID]  DEFAULT ('') FOR [Company_ID]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Source_of_funds]  DEFAULT ('') FOR [Source_of_funds]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Purpose_of_trans]  DEFAULT ('') FOR [Purpose_of_trans]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_Relation]  DEFAULT ('') FOR [Relation]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_txOccupation]  DEFAULT ('') FOR [txOccupation]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_EnvironmentId]  DEFAULT ('') FOR [EnvironmentId]
GO
ALTER TABLE [dbo].[customer_new] ADD  CONSTRAINT [DF_customer_new_OrganizationId]  DEFAULT ('') FOR [OrganizationId]
GO
ALTER TABLE [dbo].[Organization] ADD  CONSTRAINT [DF_Organisation_IsPrimary]  DEFAULT ((1)) FOR [IsPrimary]
GO
ALTER TABLE [dbo].[Organization] ADD  CONSTRAINT [DF_Organization_CountryLabel]  DEFAULT ('') FOR [CountryLabel]
GO
ALTER TABLE [dbo].[Organization] ADD  CONSTRAINT [DF_Organization_Tags]  DEFAULT ('') FOR [Tags]
GO
ALTER TABLE [dbo].[ReferenceNumber] ADD  CONSTRAINT [DF_ReferenceNumber_Environment]  DEFAULT ('') FOR [Environment]
GO
ALTER TABLE [dbo].[ReferenceNumber] ADD  CONSTRAINT [DF_ReferenceNumber_OrganizationId]  DEFAULT ('') FOR [OrganizationId]
GO
ALTER TABLE [dbo].[ReferenceNumber] ADD  CONSTRAINT [DF_ReferenceNumber_ReferenceNo]  DEFAULT ('') FOR [ReferenceNo]
GO
ALTER TABLE [dbo].[ReferenceNumber] ADD  CONSTRAINT [DF_ReferenceNumber_TransactionType]  DEFAULT ('') FOR [TransactionType]
GO
ALTER TABLE [dbo].[ReferenceNumber] ADD  CONSTRAINT [DF_ReferenceNumber_TransactionStatus]  DEFAULT ('') FOR [TransactionStatus]
GO
ALTER TABLE [dbo].[ReferenceNumber] ADD  CONSTRAINT [DF_ReferenceNumber_TransactionDate]  DEFAULT (getdate()) FOR [TransactionDate]
GO
ALTER TABLE [dbo].[ReferenceNumber] ADD  CONSTRAINT [DF_ReferenceNumber_SenderFirstName]  DEFAULT ('') FOR [SenderFirstName]
GO
ALTER TABLE [dbo].[ReferenceNumber] ADD  CONSTRAINT [DF_ReferenceNumber_SenderLastName]  DEFAULT ('') FOR [SenderLastName]
GO
ALTER TABLE [dbo].[ReferenceNumber] ADD  CONSTRAINT [DF_ReferenceNumber_ReceiverFirstName]  DEFAULT ('') FOR [ReceiverFirstName]
GO
ALTER TABLE [dbo].[ReferenceNumber] ADD  CONSTRAINT [DF_ReferenceNumber_ReceiverLastName]  DEFAULT ('') FOR [ReceiverLastName]
GO
ALTER TABLE [dbo].[ReferenceNumber] ADD  CONSTRAINT [DF_ReferenceNumber_ReceiverCountry]  DEFAULT ('') FOR [ReceiverCountry]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_Role]  DEFAULT ('TELLER') FOR [Labels]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_SetupDate]  DEFAULT (getdate()) FOR [SetupDate]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_SchedullerReady]  DEFAULT ((0)) FOR [SchedullerReady]
GO
ALTER TABLE [dbo].[Activations]  WITH CHECK ADD  CONSTRAINT [FK_Activations_User] FOREIGN KEY([SendUserID])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Activations] CHECK CONSTRAINT [FK_Activations_User]
GO
ALTER TABLE [dbo].[Organization]  WITH CHECK ADD  CONSTRAINT [FK_Organization_Environment] FOREIGN KEY([EnvironmentId])
REFERENCES [dbo].[Environment] ([EnvironmentId])
GO
ALTER TABLE [dbo].[Organization] CHECK CONSTRAINT [FK_Organization_Environment]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_AgencyReceive] FOREIGN KEY([OrganizationId], [AgencyReceive])
REFERENCES [dbo].[Agencies] ([OrganizationId], [AgencyNumber])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_AgencyReceive]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_AgencySend] FOREIGN KEY([OrganizationId], [AgencySend])
REFERENCES [dbo].[Agencies] ([OrganizationId], [AgencyNumber])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_AgencySend]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Environment] FOREIGN KEY([EnvironmentId])
REFERENCES [dbo].[Environment] ([EnvironmentId])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Environment]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Organization] FOREIGN KEY([EnvironmentId], [OrganizationId])
REFERENCES [dbo].[Organization] ([EnvironmentId], [OrganizationId])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Organization]
GO
