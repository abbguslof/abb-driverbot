module.exports = {

	command_name: "drive",
	aliases: [],
	description: "A command to test specific commands",
	use: "drive [speed]",
	run: function({socket, args} : any) {

		let speed = Number(args[0]);
		let direction = Number(args[1])
		const buffer = Buffer.alloc(4);
		
		if(speed > 1023)
			speed = 1023;

		buffer[0] = speed & 0xff;
		buffer[1] = (speed >> 8) & 0xff;
		buffer[2] = direction;
		buffer[3] = 0;

		socket.send_packet(1, buffer);
	}

}