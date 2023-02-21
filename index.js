var express = require('express');
var request = require('request');
var path = require('path');
var app = express();
const port = process.env.PORT || 3000;
const url = "https://omdbapi.com/?apikey=eb2ba88f&s=";
app.set("view engine", "ejs");
app.get("/", function (req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.get("/results", function (req, res){
    var Moviename  = req.query.Moviename;
    console.log(Moviename);
    request(url + Moviename, function(error, response, body){
        if(!error && response.statusCode==200) {
            var parsedData = JSON.parse(body);

            res.render("results",{data: parsedData});
        }
        else {
            console.log("Bogus, not working!");
        }

    });
});

app.listen(port,()=>{console.log("serving on port 3000")});
