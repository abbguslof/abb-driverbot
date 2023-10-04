import { run_command } from './apihandler'
import {  } from "./console"

function find_command(list, command_string) {
    for(const command of list) {
        // const temp = command.command_name
        if(command.command_name === command_string) {
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

export async function command_new(message) {
    const command_list = store.command_list;
    if(command_list === undefined || command_list.length === 0) {
        return console.log("[Error] Command list has not been loaded");
    }
    const args = message.slice(1)
        .split(' ').filter((argument) => argument != '');
    const command_name = args?.shift()?.toLowerCase();
    if(command_name === undefined) {
        return console.log("[Error] Command not specified");
    }
    const command = find_command(command_list, command_name);
    if(!command) {
        return console.log("[Error] Command not found");
    }
    const res = await fetch_post_command_exec({command_name: command.command_name, args: args});
}