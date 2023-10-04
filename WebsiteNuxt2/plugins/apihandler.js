const host_url = "http://localhost:5000";

export async function fetchAPICommands() {
    return await fetch(`${host_url}/api/commands/get`, {
        method: "GET"
    });
}

export async function run_command(data) {
    return new Promise(resolve => {
        fetch(`${host_url}/api/commands/execute`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            resolve(res);
        }).catch((error) => {
            console.log(error);
        });
    })
}