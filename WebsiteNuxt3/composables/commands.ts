import { fetch_post_command_exec } from './api'

function find_command(list: Array<any>, command_string : string){
    for(const command of list) {
        let temp = command.command_name
        if(temp === command_string) {
            return command;
        }
        for(const alias of command.aliases) {
            if(alias == command_string) {
                return command;
            }
        }
    }
    return undefined;
}

export async function command_new(message: string) : Promise<void> {
    const command_list = useState<Array<any>>("command_list").value;
    if(command_list === undefined || command_list.length === 0) {
        return console.log("[Error] Command list has not been loaded");
    }
    const args = message.slice(1)
        .split(' ').filter((argument: string) => argument != '');
    const command_name = args.shift().toLowerCase();
    if(command_name === undefined) {
        return console.log("[Error] Command not specified");
    }
    const command = find_command(command_list, command_name);
    if(!command) {
        return console.log("[Error] Command not found");
    }
    const res = await fetch_post_command_exec({command_name: command.command_name, args: args})
}