const dotenv = require('dotenv');
const fs = require('fs')
dotenv.config();
const { Client } = require('ifunnynode');

const client = new Client({
	basic: process.env.IFUNNY_BASIC_TOKEN,
	// user_agent: "iFunny/7.22(1129850) Android/12 (samsung; SM-G996U; samsung)"
});

client.on("login", logged_in => {
    if (!logged_in) return
    console.log(client.bearer)
})
  
client.login({
    email: process.env.IFUNNY_NODE_EMAIL,
    password: process.env.IFUNNY_NODE_PASSWORD
})