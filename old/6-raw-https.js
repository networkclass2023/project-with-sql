const http = require("http");
// import http from "http";
const url =
  "http://api.weatherstack.com/current?access_key=3a75eddcfd77d2ace8e2d197c8d13e80&query=2.3387,48.8582&units=f";

const request = http.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });
  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});
request.on("error", (error) => {
  console.log("An error", error);
});
request.end();
