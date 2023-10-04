const _HOST_URL = "http://localhost:5000";

export async function fetch_get_command_list() : Promise<Response> {
    return await fetch(`${_HOST_URL}/api/commands/get`, {
        method: "GET",
    });
}

export async function fetch_post_command_exec(data: any) : Promise<Response> {
    return await fetch(`${_HOST_URL}/api/commands/execute`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
}