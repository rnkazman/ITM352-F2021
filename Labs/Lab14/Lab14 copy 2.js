var express = require('express');
var app = express();
var myParser = require("body-parser");

var fs = require('fs');
const { exit } = require('process');

var filename = "./user_data.json";

if (fs.existsSync(filename)) {
    data = fs.readFileSync(filename, 'utf-8');

    user_data = JSON.parse(data);
    console.log("User_data=", user_data);

    fileStats = fs.statSync(filename);
    console.log("File " + filename + " has " + fileStats.size + " characters");
} else {
    console.log("Enter the correct filename bozo!");
    exit("Exiting program");
}

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log("Got post to login")

});

app.listen(8080, () => console.log(`listening on port 8080`));
