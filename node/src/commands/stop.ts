module.exports = {

	command_name: "stop",
	aliases: [],
	description: "A command to stop the engine",
	use: "stop",
	run: function({socket} : any) {

		const buffer = Buffer.alloc(2);
		buffer[0] = 1;
		buffer[1] = 3;

		socket.write_buffer(buffer);

	}

}