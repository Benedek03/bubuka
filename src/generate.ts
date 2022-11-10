import fs from 'fs';

const adjectives = (fs.readFileSync('./adjectives.txt', 'utf-8')).split('\n');
const nouns = (fs.readFileSync('./nouns.txt', 'utf-8')).split('\n');

function randInt(max: number):number {
    return Math.floor(Math.random() * max);
}

export default function generate(): string {
    let generated = "";
    let numOfAdjectives = randInt(3) + 1;
    for (let i = 0; i < numOfAdjectives; i++) {
        let adjective = adjectives[randInt(adjectives.length)];
        if (i > 0) {
            adjective = adjective.toLowerCase();
        }
        generated += adjective + ", ";
    }
    generated = generated.substring(0, generated.length - 2) + " ";
    generated += nouns[randInt(nouns.length)].toLowerCase() + "!"
    return generated;
}
