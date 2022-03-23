const dotenv = require('dotenv');
const fs = require('fs')
dotenv.config();
const { Client, User } = require('ifunnynode');

// Construct the client
const client = new Client({
	token: process.env.IFUNNY_BEARER_TOKEN,
	basic: process.env.IFUNNY_BASIC_TOKEN,
});

// Since we already have a bearer, we don't need to pass any arguments
client.login();

// On Client.login, execute a callback so that we know the client is valid
client.on("login", async () => {
	// Log info to the console (optional)
	console.log(`Client logged in as ${await client.nick} (${client.id_sync})`);

	// Connect to chats
	client.chats.connect();
});

/**
 * Gets the stats of the user and returns them as a string
 * @param {User} user
 */
async function stats(user) {
	let str = "";
	str += `Total Posts: ${await user.post_count}\n`;
	str += `Features: ${await user.feature_count}\n`;
	str += `Total Smiles: ${await user.smile_count}\n`;
	str += `Total Subscribers: ${await user.subscriber_count}\n`;
	str += `Total Subscriptions: ${await user.subscription_count}`;
	return str;
}

client.chats.on(
	"message",
	/** @param {Context} ctx */
	async (ctx) => {
		// Ignore self
		if (ctx.message.author.is_me) return; // Bot will not respond to itself

		//if (!ctx.message.author.is_me) return; // Bot will ONLY respond to itself

		// This isn't how you *should* handle it, but how you *can* handle it.
		// Command with name "mystats" that sends the users profile stats
		if (ctx.message.content === "!mystats") {
			await ctx.channel.send(await stats(ctx.message.author)); // Send the user their stats
		}
	}
);