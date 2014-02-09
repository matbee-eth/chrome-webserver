Chrome App Webserver
=======

#Server
Server.listen(port, hostname)
Server.on(path, callback);
Server.on('request', callback)
	callback(request, response);

* * *

#Request
Request.getHeader(header)
Request.isStreaming()
Request.getRange(callback)
 - If client is requesting byte range, aka, range=bytes=0-
 - callback(int, int)

* * *

#Response
Response.write()
Response.send()
Response.end()
Response.redirect(url)
Response.setHeader(header, value);
Response.setStatusCode(code)
	- Status code. ex. 404 = 404-Not Found

* * *

#Example
var server = new Server();
server.listen(5556, '127.0.0.1');

server.on('request', function (req, res) {
	// This is a global callback for all requests.
});

server.on('/', function (req, res) {
	// This is a callback for all requests at path '/'
	if (req.getHeaders("X-men") == "Wolverine") {
		res.setStatusCode(404);
		res.send("Get drunk.");
	}
});