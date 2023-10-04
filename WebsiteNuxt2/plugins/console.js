import { fetchAPICommands } from "./apihandler";

export async function get_command_list(store) {
    const res = await fetchAPICommands();
    
    if(res.status === 200) {
        const data = await res.json();
        store.command_list = data.commands;
        return store.command_list;
    } else if (res.status === 404) {
        console.error("[Error] API is possibly offline: ");
        console.log(res);
    }
    return store.command_list;
}