var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";
http.createServer(function (request, response) {
   var urlObj = url.parse(request.url, true, false);
   if (urlObj.pathname.indexOf("getcity") != -1) {
      //console.log("In Getcity");
      fs.readFile("cities.dat.txt", function (err, data) {
         if (err) {
            throw err;
         }
         else {
            var cities = data.toString().split("\n");
            // for(var i = 0; i < cities.length; i++) {
            //    console.log(cities[i]);
            // }
            var myRe = new RegExp("^" + urlObj.query["q"], "i");
            // console.log(myRe);
            var jsonresult = [];
            for(var i = 0; i < cities.length; i++) {
               // console.log("city:   " + cities[i]);
               var result = cities[i].search(myRe);
               // console.log("result: " + result);
               // console.log(""); 
               if(result != -1) {
                  // console.log(cities[i]);
                  jsonresult.push({city:cities[i]});
               } 
            }   
            // console.log(jsonresult);

            // console.log(JSON.stringify(jsonresult));
            response.writeHead(200);
            response.end(JSON.stringify(jsonresult));
         }
      });
      
   }
   else {
      fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
         if (err) {
            response.writeHead(404);
            response.end(JSON.stringify(err));
            return;
         }
         response.writeHead(200);
         response.end(data);
      });
   }
}).listen(80);
