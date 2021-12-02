// ---------- Processing Purchase and Invoice on the Server ---------- // 
// From my previous Assignment 1 server
app.post("/process_purchase", function (request, response) {
    let POST = request.body; // Data should be in the body

// Check if the quantities are NonNegInt
if (typeof POST['submitPurchase'] != 'undefined') {
        var hasvalidquantities = true; // Assumes that the variable is true (has valid quantities)
        var hasquantities = false
        for (i = 0; i < products.length; i++) {
            
qty=POST[`quantity${i}`];
    hasquantities = hasquantities || qty>0; // If value is > 0, then it is valid
    hasvalidquantities = hasvalidquantities && isNonNegInt(qty); // If quantity is both > 0 and valid
    } 
// NOTE: Following code will retain query string from products_display.html page 
// Borrowed from Tyler Johnson and Marcus Bui"
const stringified = qs.stringify(POST); // If all quantities are valid then go to login.html with query string containing the order quantities
    if (hasvalidquantities && hasquantities) {
        response.redirect("./login.html?" + stringified); 
        // Directs user from products_display.html to login.html with the query string that has the order quantities
    } else { 
        response.redirect("./products_display.html?" + stringified) 
        }
    }
});
// Reusing and repeating the isNonNegInt function from products_display.html
function isNonNegInt(q, return_errors = false) { // Checks to see if inputted values are positive, an integer, or a whole value
    errors = []; // Assume there are no errors AT FIRST
    if (q == '') q = 0; // Sets blank inputs to the quantity of 0 
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if the string is a number value
    else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if the string is non-negative
    else if (parseInt(q) != q) errors.push('<font color="red">Not a full value!</font>'); 
    // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
}