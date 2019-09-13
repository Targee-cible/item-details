-- create database target
DROP DATABASE targetItem;
CREATE DATABASE targetItem;
USE targetItem;

CREATE TABLE sizing (
  type varchar(255),
  size varchar(255),
  neck varchar(255),
  chest varchar(255),
  sleeve varchar(255)
);

CREATE TABLE questions (
  id int primary key auto_increment,
  itemId int,
  question varchar(255),
  asker varchar(255),
  dateAsked varchar(255),
  answer varchar(255) NULL,
  nameOfResponder varchar(255) NULL,
  dateAnswered varchar(255) NULL,
  helpfulCount int NULL,
  unHelpfulCount int NULL,
  targetTeamMember TINYINT NULL
);

CREATE TABLE detail (
  id int primary key auto_increment,
  itemId int,
  fitAndSTylePointOne varchar(255),
  fitAndSTylePointTwo varchar(255),
  fitAndSTylePointThree varchar(255),
  fitAndSTylePointFour varchar(255),
  fitAndSTylePointFive varchar(255),
  fitAndSTyleBlurb varchar(1000),
  sizing varchar(255),
  material varchar(255),
  fit varchar(255),
  length varchar(255),
  features varchar(255),
  neckline varchar(255),
  itemStyle varchar(255),
  garmentCuffCutType varchar(255),
  garmentSleeveStyle varchar(255),
  careAndCleaning varchar(255),
  TCIN int,
  UPC int,
  DPCI int,
  origin varchar(255),
  recycledPolyester TINYINT,
  fastShipping TINYINT,
  estimatedShipDimensions varchar(255),
  estimatedShipWeight varchar(255),
  type varchar(255)
)


/* create server and schema by running mysql -u root < db/mySQL-DB/schema.sql */