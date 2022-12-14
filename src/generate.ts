import fs from 'fs';

const adjectives = (fs.readFileSync('./dirty_adjectives.txt', 'utf-8')).split('\n');
const nouns = (fs.readFileSync('./dirty_nouns.txt', 'utf-8')).split('\n');

const randInt = (max: number): number => {
    return Math.floor(Math.random() * max);
}

const generate = (): string => {
    let generated = "Te ";
    let numOfAdjectives = randInt(3) + 1;
    for (let i = 0; i < numOfAdjectives; i++) {
        generated += adjectives[randInt(adjectives.length)].toLowerCase() + ", ";
    }
    generated = generated.substring(0, generated.length - 2) + " ";
    generated += nouns[randInt(nouns.length)].toLowerCase() + "!"
    return generated;
}
export default generate;