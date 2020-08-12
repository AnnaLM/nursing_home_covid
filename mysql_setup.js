const express = require('express');
const mysql = require('mysql');


//connect to database
var con = mysql.createConnection({
    //update host, user, and password with your own mysql connection
    host: "localhost",
    user: "root",
    password: "",
    //create database first with sql given below, once that line is executed, un-comment line below:
    //database: "nursing_home_covid",
  });

con.connect(function(err) {
    if (err) {
         throw err;
    }
    console.log("Connected to database!");
    //sql statements to run in order to setup database
    //let sql = 'CREATE DATABASE nursing_home_covid';
    //let sql = "CREATE TABLE nl_data (facility VARCHAR(250), location VARCHAR(250), province VARCHAR(10), deaths VARCHAR(250), beds VARCHAR(250), percent VARCHAR(10))";
    //let sql = "CREATE TABLE odhf (ind INT, facilityName VARCHAR(250), sourceType VARCHAR(250), odhfType VARCHAR(250), provider VARCHAR(250), unit VARCHAR(250), streetNo VARCHAR(250), streetName VARCHAR(250), postalCode VARCHAR(7), city VARCHAR(250),  province VARCHAR(5))";
    //let sql = "CREATE TABLE odhf_ltc AS SELECT facilityName FROM odhf WHERE odhfType='Nursing and Residential Care Facilities'";
    //let sql = "CREATE TABLE all_facilities AS SELECT facilityName FROM odhf_ltc UNION SELECT facility from nl_data";
    //let sql = "CREATE TABLE odhf_nl AS SELECT all_facilities.facilityName, nl_data.deaths, nl_data.beds, nl_data.percent FROM all_facilities LEFT JOIN nl_data ON all_facilities.facilityName=nl_data.facility";
    //let sql = "LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/nl_dataset_v2.csv' INTO TABLE nl_data FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;"
    //let sql = "LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/odhf_full_dataset_v2.csv' INTO TABLE odhf FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS";

    /*con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });*/
  });

const app = express();


//query database for specific home - will return homes with no recorded deaths
app.get('/homedeaths', (req, res) => {
  let home = 'Christie Gardens';
  let sql = "SELECT * FROM odhf_nl WHERE facilityName=?";
  con.query(sql, home, (err, result) => {
    if (err) throw err;
    console.log('query complete');
    res.send(result);
  });
});
//query database for all deaths in a specific province - will only return homes with deaths
app.get('/byprovince', (req, res) => {
  let province = 'ON';
  let sql = "SELECT * from nl_data WHERE province=?";
  con.query(sql, province, (err, result) => {
    if (err) throw err;
    console.log('province queried');
    res.send(result);
  });
});
//query database for all deaths in a specific city - will only return homes with deaths
app.get('/bycity', (req, res) => {
  let city = 'Toronto';
  let sql = "SELECT * from nl_data WHERE location=?";
  con.query(sql, city, (err, result) => {
    if (err) throw err;
    console.log('city queried');
    res.send(result);
  });
});

app.listen('3001', () => {
    console.log('server started');
});




