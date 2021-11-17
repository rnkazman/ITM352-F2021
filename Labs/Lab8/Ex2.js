require("./products_data.js");

var num_products = 5;
for (var count = 1; count <= num_products; count++) {
    console.log(`${count}. ${eval('name' + count)}`);
}


var num_products = 5;
for (var count = 1; eval("typeof name" + count) != 'undefined'; count++) {
    console.log("that's enough!");
    Process.exit();
}