import Client from "ifunnynode";

// Get your credentials
const EMAIL = process.env.IFUNNY_NODE_EMAIL;
const PASSWORD = process.env.IFUNNY_NODE_PASSWORD;
const BASIC_TOKEN = process.env.IFUNNY_BASIC_TOKEN;

const client = new Client({
	basic: BASIC_TOKEN,
});

// Login event emits a boolean if it had to generate a new bearer token.
client.on("login", async (new_bearer) => {
	console.log(`new bearer ${new_bearer}`);
});

(async () => {
	try {
		// The wrapper doesn't store the basic token, which needs to be reused to login, so you'll wanna store this before attempting a login
		process.env.IFUNNY_BASIC_TOKEN = client.basic_token;

		// Since we don't have a bearer token stored, we need to pass an email and a password
		await client.login({
			email: EMAIL,
			password: PASSWORD,
		});
	} catch (err) {
		// check if error was CaptchaError
		if (err.captcha_url) {
			// Open this url in the browser and solve it, then make the request again, using the same basic token
			console.log(captcha_url);
		} else {
			// NOT a CaptchaError
			throw err;
		}
	}
})();