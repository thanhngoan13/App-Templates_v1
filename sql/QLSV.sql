CREATE DATABASE QLSV
--
GO
USE QLSV
--
GO 
CREATE TABLE Students 
(
    Id int primary key Identity,
    Name nvarchar(100) NOT NULL,
    Email varchar(100) NOT NULL UNIQUE,
    Phone varchar(20) NOT NULL UNIQUE
)
GO
INSERT INTO Student(Name, Email, Phone) VALUES
(N'Nguyễn Đức Duy','duy@gmail.com','09846315'),
(N'Lê Hoàng Văn','vanlh@gmail.com','0396302953')
