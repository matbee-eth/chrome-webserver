Chrome App Webserver
=======

#Server
Server.listen(port, hostname)
Server.on(path, callback);
Server.on('request', callback)
	callback(request, response);
#Request
Request.getHeader(header)
Request.isStreaming()
Request.getRange(callback)
 - If client is requesting byte range, aka, range=bytes=0-
 - callback(int, int)
#Response
Response.write()
Response.send()
Response.end()
Response.redirect(url)
Response.setHeader(header, value);
#Example