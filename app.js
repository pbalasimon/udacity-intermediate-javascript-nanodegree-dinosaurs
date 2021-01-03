let dinos = [];
let human = null;

// Animal class
class Animal {
    constructor(species, weight, height, diet) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
    }

    getImageURL() {
        return `./images/${this.species.toLowerCase()}.png`
    }
}

class Dino extends Animal {
    constructor(species, weight, height, diet, where, when) {
        super(species, weight, height, diet, where, when);
        this.fact = getRandomFact(this);
        this.where = where;
        this.when = when;
    }

    getGrid() {
        return `
            <div class='grid-item'>
                <h3>${this.species}</h3>
                <img src="${this.getImageURL()}" alt="Image of a ${this.species}">
                <h4>${this.fact}</h4>
            </div>
        `
    }
}

// Human class
class Human extends Animal {
    constructor(name, weight, height, diet) {
        super("human", weight, height, diet, null, null);
        this.name = name;
    }
    getGrid() {
        return `
            <div class='grid-item'>
                <h3>${this.name}</h3>
                <img src="${this.getImageURL()}" alt="Image of a ${this.species}">
            </div>
        `
    }
}
/**
 * @description Generate a random number between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number} a random number
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * @description Compares animal's weigth to human's weight
 * @param {string} animal
 * @param {object} param1
 * @returns The fact of the weight comparation
 */
function compareWeight(animal, { weight, name }) {
    return `The ${animal.species} is ${animal.weight - weight >= 0 ? 'heavier' : 'lighter'} than ${name}`;
}

/**
 * @description Compares animal's height to human's height
 * @param {string} animal
 * @param {object} param1
 * @returns The fact of the height comparation
 */
function compareHeight(animal, { height, name }) {
    return `The ${animal.species} is ${animal.height - height >= 0 ? 'taller' : 'shorter'} than ${name}`;
}

/**
 * @description Compares animal's diet to human's diet
 * @param {string} animal
 * @param {object} param1
 * @returns The fact of the diet comparation
 */
function compareDiet(animal, { diet, name }) {
    return `The ${animal.species} is a ${animal.diet} ${animal.diet === diet.toLowerCase() ? `just like ${name}` : `while ${name} is a ${diet}`}`;
}

/**
 * @description Get random fact for animal
 * @param {object} animal
 * @returns Random fact
 */
function getRandomFact(animal) {

    if (animal.species === 'Pigeon') {
        return "All birds are Dinosaurs.";
    }

    let fact = null;
    const random = getRandomNumber(1, 6);

    switch (random) {
        case 1:
            fact = `The ${animal.species} lived in ${animal.where}.`;
            break;
        case 2:
            fact = `The ${animal.species} lived in ${animal.when} period.`;
            break;
        case 3:
            fact = compareWeight(animal, human);
            break;
        case 4:
            fact = compareHeight(animal, human);
            break;
        case 5:
            fact = compareDiet(animal, human);
            break;
        default:
            fact = '';
    }

    return fact;
}

/**
 * Create Dino Objects
 */
const getDinos = async () => {
    try {
        const data = await fetch("dino.json");
        const json = await data.json();
        const dinos = [];
        json.dinos.map(dino => {
            const { species, weight, height, diet, where, when } = dino;
            dinos.push(new Dino(species, weight, height, diet, where, when));
        });
        return dinos;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Compare Button Handler
 */
const handleCompare = async () => {

    const name = document.querySelector("#name").value.trim();
    const feet = document.querySelector("#feet").value.trim();
    const inches = document.querySelector("#inches").value.trim();
    const weight = document.querySelector("#weight").value.trim();
    const diet = document.querySelector("#diet").value.trim();

    if (!name || !feet || !inches || !weight || !diet) {
        alert("Please complete all the fields of the form");
        return;
    }

    const height = (feet * 12) + inches;
    document.querySelector("#dino-compare").style.display = 'none';
    document.querySelector("#compare-again").style.display = 'block';

    human = new Human(name, weight, height, diet);
    dinos = await getDinos();

    const [firstDino, secondDino, thirdDino, fourthDino, ...restDinos] = dinos;
    const animals = [firstDino, secondDino, thirdDino, fourthDino, human, ...restDinos];
    console.log(animals);

    const grid = document.querySelector("#grid");
    let HTMLGrid = "";
    for (animal of animals) {
        HTMLGrid = HTMLGrid.concat(animal.getGrid());
    }
    grid.innerHTML = HTMLGrid;
}

/**
 * Compare Again Button Handler
 */
const handleCompareAgain = () => {
    document.querySelector("#grid").innerHTML = '';
    document.querySelector("#dino-compare").style.display = 'block';
    document.querySelector("#compare-again").style.display = 'none';
}

/**
 * Use IIFE to add the event listeners for the buttons
 */
(() => {
    document.querySelector("#compare").addEventListener('click', handleCompare);
    document.querySelector("#compare-again").addEventListener('click', handleCompareAgain);
})();
