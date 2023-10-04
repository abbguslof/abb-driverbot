import { reactive } from "vue";
import { fetch_get_command_list } from "./api";

export const store = reactive({
    command_list: [] 
})

export async function get_command_list() {
    const res = await fetch_get_command_list();
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