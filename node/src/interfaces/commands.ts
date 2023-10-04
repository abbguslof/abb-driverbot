const { filterObject } = require("../methods");

const _command_exec_req = { command_name: String, args: Array };
const _command_exec_res = { message: String, successfull: Boolean };
const _command_exec_err = { error: Error };
const _command = { command_name: String, aliases: Array, description: String, use: String };

export function f_command_exec_request(obj: any) {
	return filterObject(obj, _command_exec_req)
}

export function f_command_exec_response(obj: any) {
	return filterObject(obj, _command_exec_res);
}

export function f_command_exec_error(obj: any) {
	return filterObject(obj, _command_exec_err);
}

export function f_command(obj: any) {
	return filterObject(obj, _command); 
}