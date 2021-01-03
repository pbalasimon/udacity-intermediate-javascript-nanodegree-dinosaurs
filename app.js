let dinos = [];
let human = null;

// Create Animal class
class Animal {
    constructor(species, weight, height, diet, where, when) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
    }

    getImageURL() {
        return `./images/${this.species.toLowerCase()}.png`
    }
}

class Dino extends Animal {
    constructor(species, weight, height, diet, where, when) {
        super(species, weight, height, diet, where, when);
        this.fact = getRandomFact(this);
    }
    getGrid() {
        return `
            <div class='grid-item'>
                ${this.species === 'human' ? `<h3>${this.name}</h3>` : `<h3>${this.species}</h3>`}
                <img src="${this.getImageURL()}" alt="Image of a ${this.species}">
                <h4>${this.fact}</h4>
            </div>
        `
    }
}

// Create Human class
class Human extends Animal {
    constructor(name, weight, height, diet) {
        super("human", weight, height, diet, null, null);
        this.name = name;
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function compareWeight(animal, { weight, name }) {
    return `The ${animal.species} is ${animal.weight - weight >= 0 ? 'heavier' : 'lighter'} than ${name}`;
}

function compareHeight(animal, { height, name }) {
    return `The ${animal.species} is ${animal.height - height >= 0 ? 'taller' : 'shorter'} than ${name}`;
}

function compareDiet(animal, { diet, name }) {
    return `The ${animal.species} is a ${animal.diet} ${animal.diet === diet.toLowerCase() ? `just like ${name}` : `while ${name} is a ${diet}`}`;
}

function getRandomFact(animal) {

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
            fact = 'default case';
    }

    return fact;
}

// Create Dino Objects
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

// Create Human Object
const handleCompare = async () => {

    // FIXME Validate form
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
    console.log(human);
    dinos = await getDinos();
    console.log(dinos);

    const grid = document.querySelector("#grid");
    let HTMLGrid = "";
    for (dino of dinos) {
        HTMLGrid = HTMLGrid.concat(dino.getGrid());
    }
    grid.innerHTML = HTMLGrid;
}

const handleCompareAgain = () => {
    document.querySelector("#grid").innerHTML = '';
    document.querySelector("#dino-compare").style.display = 'block';
    document.querySelector("#compare-again").style.display = 'none';
}

// Use IIFE to get human data from form


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen


// On button click, prepare and display infographic
(() => {
    document.querySelector("#compare").addEventListener('click', handleCompare);
    document.querySelector("#compare-again").addEventListener('click', handleCompareAgain);
})();
