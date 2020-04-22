//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

var leaderborad = {}
var standing = []
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    
    res.render('index' , {board: standing})

});


app.post("/", function(req, res) {
    
    var first = req.body.first;
    var second = req.body.second;
    var third = req.body.third;
    if(first.length!=0){
        if(first in leaderborad ) leaderborad[first]+=3;
        else leaderborad[first]=3;
    }
    if(second.length!=0){
        if(second in leaderborad ) leaderborad[second]+=2;
        else leaderborad[second]=2;
    }
    if(third.length!=0){
        if(third in leaderborad ) leaderborad[third]+=1;
        else leaderborad[third]=1;
    }


    // Create items array
    standing = Object.keys(leaderborad).map(function(key) {
        return [key, leaderborad[key]];
    });
    
    // Sort the array based on the second element
    standing.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    // Create a new array with only the first 5 items
    console.log(standing);
    
    res.render('index' , {board: standing})
});



app.listen(process.env.PORT || 8080, function() {
    console.log("Server started on port 8080");
});