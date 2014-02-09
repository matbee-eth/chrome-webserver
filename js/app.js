var someText = document.getElementById('some-text');

var server = new Server();
server.listen(5556, '127.0.0.1');

server.on('request', function(req, res) {
	console.log(req, res);

	res.send(someText.value || "");
});