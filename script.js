// Variables
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');

let isError = false;

// End of ariables

// Transforming string into numbers:

function cleanInputString(str) {
    /* const strArray = str.split('');
       let cleanStrArray = [];
   
       for (let i = 0; i < strArray.length; i++) {
           if (!["+", "-", " "].includes(strArray[i])) {
               cleanStrArray.push(strArray[i]);
           }
       } */
    const regex = /[+-\s]/g;
    return str.replace(regex, "");
}

// End of transforming string into numbers:

// Searching invalid inpunts

function isInvalidInput(str) {
    /* const regex = /[0-9]+e[0-9]+/i; */
    const regex = /\d+e\d+/i;
    return str.match(regex);
}

// End of searching invalid inpunts