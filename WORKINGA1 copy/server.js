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
var myParser = require("body-parser"); //load and cache body parser module

app.all('*', function (request, response, next) { //for all request methods...
    console.log(request.method + ' to ' + request.path); //write in the console the request method and its path
    next(); //move on
});

//fix later myParser, added express instead
app.use(express.urlencoded({ extended: true })); //get data in the body

/* app.post("/completed_purchase.html", function (request, response) {*/
    app.post("/Receipt", function (request, response, next) {
        let POST = request.body;
    
        // using Peter Cancannon's code
        //Validating the quantities and checking the availability of the tickets
        if (typeof POST['submit_purchase'] != 'undefined') {
            for (i = 0; i < products.length; i++) {
                if ((`quantity${i}`) != 'undefined') {
                    qty = POST[`quantity${i}`];
                    product_purchase_form[`quantity${i}`].value = qty; //To make the values sticky incase of an error
                    if (checkQtyTxt(qty)) {
                        if (checkInt(quantity, products[i].quantity_available, returnErrors) == true) {
                        response.status(404).send(`Invalid Quantity for tickets selected from Section: ${products[i].section_num}. Please return to HomePage and Check Values Entered`)
                        response.redirect("./products_display.html?");
                        } else {
                            var bodyInv = fs.readFileSync('./views/invoice.template', 'utf8');
                        response.send(eval('`' + bodyInv + '`')); //This renders the template string into a readable html format.    
                        }
                    }
    
                }
            }
        }
    
        //copied from Alyssa Mencel
        // if all quantities are valid, generate the invoice// 
        const stringified = queryString.stringify(POST);
        if (hasvalidquantities && hasquantities) {
      
            response.redirect("./invoice.html?"+stringified); // using the invoice.html and all the data that is input
        }  

       
        else { 
            response.redirect("./products_display.html?" + stringified) 
        }
    }
);

//repeats the isNonNegInt function from the products_display.html file 
function isNonNegativeInteger(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if the string is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is an integer
    return returnErrors ? errors : (errors.length == 0);
}

// taken from assignment 1 examples
app.use(express.static('./public')); // root in the 'public' directory so that express will serve up files from here
app.listen(8080, () => console.log(`listening on port 8080`)); //run the server on port 8080 and show it in the console

