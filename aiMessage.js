const got = require('got');
const data = require('./data.json')
const dotenv = require('dotenv')
dotenv.config();

(async () => {
    const url = 'https://api.openai.com/v1/engines/davinci/completions';
    const params = {
        "prompt": ``,
        "max_tokens": 160,
        "temperature": 0.7,
        "frequency_penalty": 0.7
    };
    const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    };
    
    try {
        const response = await got.post(url, { json: params, headers: headers }).json();
        output = `${prompt}${response.choices[0].text}`;
       console.log(output);
    } catch (err) {
        console.log(err);
    }
})();