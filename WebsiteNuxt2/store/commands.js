export const state = () => ({
    command_list: []
});

export const mutations = {
    update_command_list(state, new_command) {
        state.command_list = new_command;
    }
}