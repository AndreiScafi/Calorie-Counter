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

// Add Entry

function addEntry() {
    /* const targetId = "#" + entryDropdown.value;
    const targetInputContainer = document.querySelector(targetId + ' .input-container'); */

    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);

    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

    const HTMLString = `
        <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
        <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
        <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
        <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories"/>`;

    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

addEntryButton.addEventListener('click', addEntry);
// End of Add Entry