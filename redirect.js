const http = require('http');
const fs = require('fs');
const { buffer } = require('stream/consumers');
const path = require('path');
const server = http.createServer((req, res)=>{
   const url = req.url;
   const method = req.method;
   if(url === '/'){
      let pathfile = path.join(__dirname,'file.txt');
      fs.readFile(pathfile,{encoding:'utf-8'},(err,data)=>{
         if(err){
            console.log(err)
         }
         res.write('<html>');
         res.write('<head> <title> Enter message </title> </head>');
         res.write(`<body>${data}</body>`)
         res.write(' <body> <form action="/message" method="POST"> <input type="text" name="message"/><button type="submit">Send</button> </body>');
         res.write('</html>');
         return res.end();
      })
      
   }
  else if(url==='/message' && method ==='POST'){
      const body = [];
      req.on('data',(chunk)=>{
         body.push(chunk)
      });
     return req.on('end',()=>{
         const parsedBody = Buffer.concat(body).toString();
        let message= parsedBody.split('=')[1]
         console.log(parsedBody);
         fs.writeFile('file.txt', message, err =>{
            res.statusCode = 302;
            res.setHeader('location','/');
            return res.end();
         });
      })
   }else{
   res.write('<html>');
   res.write('<head> <title> Hello TutorialsPoint </title> </head>');
   res.write(' <body> Hello </body>');
   res.write('</html>');
   res.end();
   }
});
server.listen(3000);