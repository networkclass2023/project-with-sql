// import { json } from "stream/consumers";
// import fs from 'fs';
const fs = require("fs");

// const book = {
//   title: "this is for test",
//   author: "David",
// };
// const bookJSON = JSON.stringify(book);
// console.log(bookJSON);
// fs.writeFileSync('1-json.json',bookJSON)
//
// const parsedData=JSON.parse(bookJSON)
// console.log(parsedData)
const dataBuffer = fs.readFileSync("1-json.json");
const dataJSON = dataBuffer.toString();
const user = JSON.parse(dataJSON);
user.name = "John";
user.planet = "Mars";
user.age = 50;

const userJSON = JSON.stringify(user);
fs.writeFileSync("1-json.json", userJSON);
