const { exec_command, get_commands } = require("../controller/commands")

module.exports = function(Router: any) {
	const _Router = Router();

	_Router.post("/execute", exec_command);
	_Router.get("/get", get_commands);

	return {name: "commands", route: _Router};
}