const fs = require("fs");
const { command_t } = require("../interfaces/commands");

export function load() {
	let command_list = [];
	try {
		const files = fs.readdirSync("./src/commands").filter((file : String) => file.endsWith(".ts"));
		for (let file of files) {
			command_list.push(require(`../commands/${file}`));
		}
	} catch(e) {
		console.error("An error occured loading commands: ");
		console.log(e);
	}

	return command_list;
}