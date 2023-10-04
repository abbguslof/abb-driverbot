const net = require("net");

let client = new net.Socket();
let handshake = false;
let is_connected = false;

const handshake_password = "GL";

export function connect() {
	try {
		client.connect(8888, "10.22.5.164");
		// client.connect(8888, "10.22.5.164");
		// client.connect(8888, "192.168.50.33");
		//client.connect(8888, "192.168.50.34");
		//client.connect(8888, "10.22.5.164");
		//client.connect(8888, "10.0.1.46");
	} catch(e) {
		console.log("[Error] There was a problem connecting...");
	}
}	

export function send_packet(type: number, payload: Buffer) {

	if(!is_connected) {
		console.log("[Error] Is not connected! Trying to connect...");
		connect();
		return false;
	}

	let header = Buffer.alloc(5);

	header[0] = 1;
	header[1] = payload.length & 0xff;	
	header[2] = (payload.length >> 8) & 0xff;
	header[3] = type & 0xff;
	header[4] = 0; // padding	

	const packet = Buffer.concat([header, payload]);

	client.write(packet);
	console.log(packet);

	return true;	
}

export function destroy() {
	client.destroy();
}

client.on("connect", function() {
	handshake = true;
});

client.on("data", function(data: Buffer) {
	try {
		if(handshake && data.toString() === handshake_password) {
			client.write(data.toString());
			is_connected = true, handshake = false;
			console.log("Connected!");
		}
	} catch(e) {
		console.log("Error performing handshake");
	}
});

client.on("end", function() {
	is_connected = false, handshake = false;
	console.log("Disconnected");
});

client.on("error", function(error: any) {
	console.log("[Error] An error occured with net:");
	console.log(error);
})