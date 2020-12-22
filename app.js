
    // Create Dino Constructor
    class Dino {
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


    // Create Dino Objects
    const createDinoObjects = async ()=> {
        try {
            const dinos = await fetch("dino.json");
            console.log(await dinos.json());
        } catch (error) {
            console.error(error);
        }
    }

    // Create Human Object

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
(()=>{
    console.log('DOM Loaded!');
    createDinoObjects();
    document.querySelector("#compare").addEventListener('click', ()=> {
        console.log('Comparing...');
    })
})();
