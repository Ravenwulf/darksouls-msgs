const dotenv = require('dotenv');
const fs = require('fs')
dotenv.config();
const { Client } = require('ifunnynode');

const client = new Client({
	basic: process.env.IFUNNY_BASIC_TOKEN,
	// user_agent: "iFunny/7.22(1129850) Android/12 (samsung; SM-G996U; samsung)"
});

console.log(client.user_agent);

(async ()=> {
	try {
		await client.login({
			email: process.env.IFUNNY_NODE_EMAIL,
			password: process.env.IFUNNY_NODE_PASSWORD
		})
	} catch (err) {
		if (err?.captcha_url) {
			console.log(err.captcha_url) // This is the URL you need to open in your browser.
			// fs.writeFile('./test.txt', err.captcha_url, err => {
			// 	if (err) {
			// 		console.error(err)
			// 		return
			// 	}
			// 	//file written successfully
			// })
		} else {
			console.log(err.config.headers) // NOT A CAPTCHA ERROR
		}
	}
})();
