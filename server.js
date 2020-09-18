//Import the http module
const http = require('http');
//Import the url module
const url = require('url');
//import the fs module
const fs = require('fs');

//Create the server
http.createServer((request, response)=>{
let addr = request.url;
let q = url.parse(addr, true);
let filePath = '';

let pathname = q.pathname;
//Check if the path includes documentation
if (pathname.includes('documentation')){
  filePath = (__dirname + '/documentation.html');
}else{
filePath = (__dirname + '/index.html');
}
//Log the data to log.txt file
fs.appendFile('log.txt', 'URL : ' + addr + '\nTime Stamp: ' + new Date + '\n\n', (err)=>{
  if (err){
    throw err;
  }
  else{
    console.log("Added to Log");
  }
})

fs.readFile(filePath, (err, data)=>{
if(err){
  throw err;
}

response.writeHead(200, {'content-type': 'text/html'});
response.end(data);
})


}).listen(8080);
console.log("Port 8080 running");
