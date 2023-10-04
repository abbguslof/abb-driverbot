module.exports = {

	command_name: "run",
	aliases: ["start"],
	description: "A command to turn on the engine",
	use: "run",
	run: function({socket} : any) {
		
		console.log()

		const buffer = Buffer.alloc(2);
		buffer[0] = 1;
		buffer[1] = 2;

		socket.write_buffer(buffer);

	}

}