'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./app/models/index.js');
var http = require('http');
 var fs = require("fs");
var request = require('request');
const app = db.init(express());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started from the bottom now we're here on port ${(process.env.PORT || 3000)}`);
});

function sunriseapi () {
       var options = {
        host: 'www.sunrisediamonds.com.hk',
        port: 80,
        path: '/inventory/Wgc.json'
    };
    var file = 'phraseFreqs.json';
    var urls = "http://www.sunrisediamonds.com.hk/inventory/Wgc.json";
    request(urls, function (error, response, body) {
        if (!error && response.statusCode == 200) {
             console.log("*******************************************");
        console.log("*******************************************");
        console.log("*******************************************");
        console.log("*******************************************");
            fs.writeFile(file, body);
        }
    });
}

app.get('/callurl', function (req, res) {

   sunriseapi();
});
