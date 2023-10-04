const fs = require('fs');
const { Router } = require('express')

export function routes(app: any) { 
	fs.readdirSync('./src/routes/').forEach((file: File) => {
		const route = require(`../routes/${file}`)(Router);
		app.use(`/api/${route.name}`, route.route);
		console.log(`\t[-] Loaded route ${file} as '/api/${route.name}'`);
	});
}