import { Request, Response } from "express"

const { f_command_exec_response, f_command_exec_request, f_command_exec_error, f_command } = require("../interfaces/commands");
const _command_list = require("../setup/commands").load();

const socket = require("../setup/socket");

async function exec_command(req: Request, res: Response) {
	try {

		const body = req.body;
		let error;

		for(const command of _command_list) {
			if(command.command_name == body.command_name)
				error = command.run({args: body.args, socket: socket, res: res});
		}

		res.status(200)

		if(!error) {
			res.status(200).send();
		} else {
			res.status(404).send("An unknown error occured");
		}
	} catch(e) {
		console.error(e);
		res.status(404).send("An unknown error occured");
	}

}

async function get_commands(req: Request, res: Response) {

	try {
		
		res.status(200).send(JSON.stringify({commands: _command_list}));

	} catch(e) {
		console.error(e);
		res.status(404).send("An unknown error occured");
	}

}

export { get_commands, exec_command }