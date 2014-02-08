var CRLF = '\r\n';
var STATUS_CODES = {
	100 : 'Continue',
	101 : 'Switching Protocols',
	102 : 'Processing',		              // RFC 2518, obsoleted by RFC 4918
	200 : 'OK',
	201 : 'Created',
	202 : 'Accepted',
	203 : 'Non-Authoritative Information',
	204 : 'No Content',
	205 : 'Reset Content',
	206 : 'Partial Content',
	207 : 'Multi-Status',               // RFC 4918
	300 : 'Multiple Choices',
	301 : 'Moved Permanently',
	302 : 'Moved Temporarily',
	303 : 'See Other',
	304 : 'Not Modified',
	305 : 'Use Proxy',
	307 : 'Temporary Redirect',
	400 : 'Bad Request',
	401 : 'Unauthorized',
	402 : 'Payment Required',
	403 : 'Forbidden',
	404 : 'Not Found',
	405 : 'Method Not Allowed',
	406 : 'Not Acceptable',
	407 : 'Proxy Authentication Required',
	408 : 'Request Time-out',
	409 : 'Conflict',
	410 : 'Gone',
	411 : 'Length Required',
	412 : 'Precondition Failed',
	413 : 'Request Entity Too Large',
	414 : 'Request-URI Too Large',
	415 : 'Unsupported Media Type',
	416 : 'Requested Range Not Satisfiable',
	417 : 'Expectation Failed',
	418 : 'I\'m a teapot',              // RFC 2324
	422 : 'Unprocessable Entity',       // RFC 4918
	423 : 'Locked',                     // RFC 4918
	424 : 'Failed Dependency',          // RFC 4918
	425 : 'Unordered Collection',       // RFC 4918
	426 : 'Upgrade Required',           // RFC 2817
	428 : 'Precondition Required',      // RFC 6585
	429 : 'Too Many Requests',          // RFC 6585
	431 : 'Request Header Fields Too Large',// RFC 6585
	500 : 'Internal Server Error',
	501 : 'Not Implemented',
	502 : 'Bad Gateway',
	503 : 'Service Unavailable',
	504 : 'Gateway Time-out',
	505 : 'HTTP Version not supported',
	506 : 'Variant Also Negotiates',    // RFC 2295
	507 : 'Insufficient Storage',       // RFC 4918
	509 : 'Bandwidth Limit Exceeded',
	510 : 'Not Extended',               // RFC 2774
	511 : 'Network Authentication Required' // RFC 6585
};
var socket = chrome.socket;
var stringToUint8Array = function(string) {
	var buffer = new ArrayBuffer(string.length);
	var view = new Uint8Array(buffer);
	for(var i = 0; i < string.length; i++) {
			view[i] = string.charCodeAt(i);
	}
	return view;
};

var arrayBufferToString = function(buffer) {
	var str = '';
	var uArrayVal = new Uint8Array(buffer);
	for(var s = 0; s < uArrayVal.length; s++) {
		str += String.fromCharCode(uArrayVal[s]);
	}
	return str;
};

var Server = function () {
	this._host = "127.0.0.1";
}
Server.prototype.createServer = function(cb) {
	this._cb = cb;
};
Server.prototype.listen = function(port, host) {
	var self = this;
	this._host = host || this._host;
	socket.create("tcp", {}, function(_socketInfo) {
		socketInfo = _socketInfo;
		socket.listen(socketInfo.socketId, self._host || host, port, 50, function(result) {
			console.log("LISTENING:", result);
			socket.accept(socketInfo.socketId, function (acceptInfo) {
				self._readSocket(socketInfo.socketId, function (string) {
					chrome.socket.getInfo(socketInfo.socketId, function (result) {
						var req = new Request(socketInfo.socketId);
						req.info = result;

						var res = new Response(socketInfo.socketId);
					})
				});
			});
		});
	});
};
Server.prototype._readSocket = function(socketId, cb) {
	socket.read(socketId, function(data) {
		data = arrayBufferToString(readInfo.data);
		cb && cb(data);
		console.log(data);
	});
};
Server.prototype._enableKeepAlive = function (socketId, cb) {
	chrome.socket.setKeepAlive(socketId, true, 0, cb)
};

var Request = function (socketId) {
	this._socketId = socketId;
	this._method = null;
	this._ip = null;
	this._path = null;
	this._headers = new Headers();
	this._cookies = new Cookies();
	this._body = null;
}

var Response = function (socketId) {
	this._headersSent = false;
	this._headers = new Headers();
	this._cookies = new Cookies();
}

Response.prototype.write = function(data, cb) {
	// Set Transfer-Encoding: chunked if headers have not been sent.
};

Response.prototype.send = function(data) {
	// 
};

Response.prototype.end = function(data) {
	// 
};

Response.prototype.redirect = function(url) {
	// 
};

var Headers = function () {
	this._headers = {};
	this._headers
}
Headers.prototype.setHeader = function(key, value) {
	this._headers[key] = value;
};
Headers.prototype.removeHeader = function (key) {
	delete this._headers;
};
Headers.prototype.toString = function() {
	return "";
};

var Cookies = function () {

};
Cookies.prototype.addCookie = function(key, value) {
	
};
Cookies.prototype.removeCookie = function (key) {

};
Cookies.prototype.toString = function () {
	return "";
};