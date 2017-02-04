// var http = require('http');

// var server = http.createServer( function (req, res) {
// 	res.writeHead(200, { 'Content-Type':'text/plain'});
// 	console.log('访问');
// 	res.write('你好好');
// 	res.end('sss')
// });

// server.listen(3000, '127.0.0.1', function(){
// 	console.log('正在监听。。。');
// })

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

var http=require("http");
 var server=http.createServer(function(req,res){
     if(req.url!=="/favicon.ico"){
         //res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"});
         res.writeHead(200,{"Content-Type":"text/plain"});
         res.write("callback({'msg':'你好啊!'})");
     }
     res.end();
 });
 server.listen(1337,"localhost",function(){
     console.log("开始监听...");
 });