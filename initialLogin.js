const Client = require("ifunnynode").default;
const dotenv = require('dotenv');
dotenv.config();

// Get your credentials
const EMAIL = process.env.IFUNNY_NODE_EMAIL;
const PASSWORD = process.env.IFUNNY_NODE_PASSWORD;
const BASIC_TOKEN = new Client().basic_token; // Generates a new basic token.
console.log(BASIC_TOKEN);

// It's a good idea to use the same basic token for captcha requests, but you aren't required to pass in a basic token.
const client = new Client({
	basic: BASIC_TOKEN,
});

// Login event emits a boolean if it had to generate a new bearer token.
client.on("login", async (new_bearer) => {
	console.log(`new bearer ${new_bearer}`);
});

(async () => {
	try {
		// Since we don't have a bearer token stored, we need to pass an email and a password
		await client.login({
			email: EMAIL,
			password: PASSWORD,
		});
	} catch (err) {
		// check if error was CaptchaError
		if (err.captcha_url) {
			// Open this url in the browser and solve it, then make the request again, using the same basic token
			console.log(err.captcha_url);
		} else {
			// NOT a CaptchaError
			throw err;
		}
	}
})();