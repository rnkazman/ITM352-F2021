require("./products_data.js");

var num_products = 5;
var count = 0;

while(count < num_products) {
    count++;
    if(count > (num_products/4) && count < (num_products * 0.75)) {
        console.log(`${eval('name' + count)} is sold out.` );
    }
console.log(`${count}. ${eval('name' + count)}` );
    count++; 
}

console.log("That's all we have!");

/*

var num_products = 5;
for (var count = 1; eval("typeof name" + count) != 'undefined'; count++) {console.log(`${count}, ${eval('name' + count)}`);
if (count > num_products/2) {
    console.log("That's enough!");
    process.exit();
}
console.log(`${count}. ${eval('name' + count)}`)
}

*/

/*

## Bryson Code from class
var num_products = 5;
for (var count = 1; eval("typeof name"+count) != 'undefined'; count++) {
    if (count > num_products/2) {
        console.log("That's enough!");
        process.exit();
    }
    console.log(`${count}. ${eval('name' + count)}`);
}

*/

/*

## Professor Code from class

var num_products = 5;
for (var count = 1; count <= num_products; count++) 
    console.log(`${count}. ${eval('name' + count)}`);
}

*/