const fs = require("fs");

fs.writeFileSync("./testfile", "This is a file");
var file_content = fs.readFileSync("./testfile", "utf8").toString();


console.log(file_content);

fs.appendFileSync("./testfile", " Updated Data");
file_content = fs.readFileSync("./testfile", "utf8").toString();
console.log(file_content);


fs.unlinkSync("./testfile");
