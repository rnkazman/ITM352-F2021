/* 
Copied from Assignment 1 example video and info_server_Ex4.js from Lab13
Mau Assignment 1 Server
*/

var data = require('./public/products.js'); //load products.js file and set to variable 'data'
//Check below code (line 8)
var products_array = data.products; //set variable 'products_array' to the products array in the products.js file
const queryString = require('querystring'); //read variable 'queryString' as the loaded query-string module
var express = require('express'); //load and cache express module
var app = express(); //set module to variable 'app'

// remove later// 

app.use(express.urlencoded({ extended: true })); //get data in the body

//repeats the isNonNegInt function from the products_display.html file 
function isNonNegativeInteger(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (Number(q) != q) {
    errors.push('Not a number!');
    } //check if the string is a number
    else {
    if(q < 0) errors.push('Negative value!'); //check if value is a positive
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is an integer
    }
    return returnErrors ? errors : (errors.length == 0);
}


app.all('*', function (request, response, next) { //for all request methods...
    console.log(request.method + ' to ' + request.path); //write in the console the request method and its path
    next(); //move on
});


/* app.post("/completed_purchase.html", function (request, response) {*/
    //Remove .html after invoice
    app.post("/invoice", function (request, response, next) {
   var errors = {};
   for (i in products)

if (Object.keys(errors).length == 0) {
    response.redirect('./invoice.html?' + qs.stringify(request.body));
} else {
    response.redirect('./products_display.html?' + qs.stringify(request.body));
}
    });



app.use(express.static('./public')); // root in the 'public' directory so that express will serve up files from here
app.listen(8080, () => console.log(`listening on port 8080`)); 
// run the server on port 8080 and show it in the console
