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
    app.post("/invoice.html", function (request, response) {
    let POST = request.body; // data would be packaged in the body

    //taken from Alyssa Mencel
    //check if quantities are nonnegative integers 
    if (typeof POST['submitPurchase'] != 'undefined') {
        var hasvalidquantities=true; // creating a varibale assuming that it'll be true
        var hasquantities=false
        for (i = 0; i < products.length; i++) {
            
                        qty=POST[`quantity${i}`];
                        hasquantities=hasquantities || qty>0; // If it has a value bigger than 0 then it is good
                        hasvalidquantities=hasvalidquantities && isNonNegativeInteger(qty);    // if it is both a quantity over 0 and is valid    
        } 

        //copied from Alyssa Mencel
        for (i = 0; i < products.length; i++) {
            let quantityremaining = products_array[i].quantity_available - products_array[i].total_sold;
            qty=POST[`quantity${i}`];
            hasquantities=hasquantities || qty>0; // If it has a value bigger than 0 then it is good
            hasvalidquantities=hasvalidquantities && isNonNegativeInteger(qty);    // if it is both a quantity over 0 and is valid    
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
});

//repeats the isNonNegInt function from the products_display.html file 

/*function isNonNegativeInteger(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if the string is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is an integer
    return returnErrors ? errors : (errors.length == 0);
}
*/

app.post('/purchase', function (request, response, next) { //Adapted from lab 13 Exercise 5
    let quantity_string = "invoice.html?"; //Created so we can then add on the individual "quantity${}" from the textboxes with the for loop
    let redirected = false; //Used to check if the user has already been redirected by one of the prior if statements so the server doesn't try the next if statements (essentially prevents an error in temrinal).

    //VALIDATING QUANTITY: First checking if all values are valid.
    quantities_array = []; //Creating an empty array for all desired quantities.
    var sum_of_quantities_array = 0; //Setting sum of quantities to 0 by default
    var should_sell = true; //Setting should sell to true by default.

    for (i in products_array) {
        var quantity_desired_by_user = request.body[`quantity${i}`]; //Gets textbox value and places it variable 'quantity_desired_by_user'

        if (quantity_desired_by_user == "") { //When a textbox is left blank... 
            quantity_desired_by_user = "0"; //The quantity for said product will be submitted as a 0 to the invoice.
        };

        if (!isNonNegInt(Number(quantity_desired_by_user))) { //If the quantity is not a valid number...
            should_sell = false; //Tell server that we should not sell
            redirected = true; //We are telling the server that we are going to be redirected, do not try to set the next header.
            response.redirect("products_display.html?error=true&item=" + products_array[i].name.replace(/ /g, "_")); //Redirect to products_page but now have an alert that says to enter a valid number for the specific product. Replace() is used to get rid of the spaces in the name since they are not allowed in urls.
        };

        if (Number(quantity_desired_by_user) > products_array[i].quantity_available) { //If the quantity is greater than the amount we have available...
            should_sell = false; //Tell the server that we should not sell
            redirected = true; //We are telling the server that we are going to be redirected, do not try to set the next header. 
            response.redirect("products_display.html?error=true_not_enough_in_inventory&item=" + products_array[i].name.replace(/ /g, "_")); //Redirect to products_page but now have an alert that says to we don't have enough in stock to fulfill their desired quantity for the specific product. Replace() is used to get rid of the spaces in the name since they are not allowed in urls.

        };
    
        quantities_array.push(Number(quantity_desired_by_user)); //At the end of each cycle in the loop, push the value into the quantities_array.

    };
})
// taken from assignment 1 examples
app.use(express.static('./public')); // root in the 'public' directory so that express will serve up files from here
app.listen(8080, () => console.log(`listening on port 8080`)); //run the server on port 8080 and show it in the console

