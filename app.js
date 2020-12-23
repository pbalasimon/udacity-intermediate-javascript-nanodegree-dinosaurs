let dinos = [];

// Create Animal class
class Animal {
    constructor(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }
}

// Create Human class
class Human extends Animal {
    constructor(name, feet, inches, weight, diet) {
        super("human", weight, null, diet, null, null, null);
        this.name = name;
        this.feet = feet;
        this.inches = inches;
    }
}


// Create Dino Objects
const getDinos = async () => {
    try {
        const data = await fetch("dino.json");
        const json = await data.json();
        const dinos = [];
        json.dinos.map(dino => {
            const { species, weight, height, diet, where, when, fact } = dino;
            dinos.push(new Animal(species, weight, height, diet, where, when, fact));
        });
        return dinos;
    } catch (error) {
        console.error(error);
    }
}

// Create Human Object
const handleCompare = async () => {

    // FIXME Validate form
    const name = document.querySelector("#name").value;
    const feet = document.querySelector("#feet").value;
    const inches = document.querySelector("#inches").value;
    const weight = document.querySelector("#weight").value;
    const diet = document.querySelector("#diet").value;
    const human = new Human(name, feet, inches, weight, diet);
    console.log(human);
    dinos = await getDinos();
    console.log(dinos);
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
})();
