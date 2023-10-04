module.exports = {

	command_name: "steer",
	aliases: [],
	description: "A command to test specific commands",
	use: "steer [direction]",
	run: function({socket, args} : any) {

		let direction = Number(args[0]);
		const buffer = Buffer.alloc(2);
	
		buffer[0] = Math.abs(direction) & 0xff;
		buffer[1] = Number(direction < 0);

		socket.send_packet(2, buffer);
	}

}