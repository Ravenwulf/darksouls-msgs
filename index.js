const data = require('./data.json')

const isConjunction = data.isConjunction; 

const TEMPLATES = data.TEMPLATES;

const CONJUNCTIONS = data.CONJUNCTIONS;

const CATEGORIES = data.CATEGORIES;

const getRandMessage = () => {
    const template = TEMPLATES[Math.floor(Math.random()*TEMPLATES.length)];
    // console.log(`template: ${template}`);
    const catKeys = Object.keys(CATEGORIES);
    const wordOneCat = CATEGORIES[catKeys[Math.floor(Math.random()*catKeys.length)]];
    // console.log(`wordOneCat: ${wordOneCat}`);
    const wordOne = wordOneCat[Math.floor(Math.random()*wordOneCat.length)];
    // console.log(`wordOne: ${wordOne}`);
    const message = template.replace('****', wordOne);
    return message;
}

const genMessage = () => {
    const lineOne = getRandMessage();
    if( isConjunction[Math.floor(Math.random()*isConjunction.length)] ) {
        const conj = `\n${CONJUNCTIONS[Math.floor(Math.random()*CONJUNCTIONS.length)]}\n`;
        const lineTwo = getRandMessage();
        const message = lineOne+conj+lineTwo;
        return message
    }
    return lineOne;
}

console.log(genMessage());