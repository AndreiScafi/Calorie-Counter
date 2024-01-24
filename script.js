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

// End of Add Entry

// Getting calories from inputs

function getCaloriesFromInputs(list) {
    let calories = 0;

    for (let i = 0; i < list.length; i++) {
        const currVal = cleanInputString(list[i].value);
        const invalidInputMatch = isInvalidInput(currVal);
        if (invalidInputMatch) {
            alert(`Invalid Input: ${invalidInputMatch[0]}`);
            isError = true;
            return null;
        }
        calories += Number(currVal);
    }
    return calories;
}
// End of getting calories from inputs

// Calculating Calories

function calculateCalories(e) {
    e.preventDefault();
    isError = false;
    const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type=number]");
    const lunchNumberInputs = document.querySelectorAll("#lunch input[type=number]");
    const dinnerNumberInputs = document.querySelectorAll("#dinner input[type=number]");
    const snacksNumberInputs = document.querySelectorAll("#snacks input[type=number]");
    const exerciseNumberInputs = document.querySelectorAll("#exercise input[type=number]");

    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);

    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    if (isError) {
        return
    }

    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;

    const surplusOrDeficit = remainingCalories >= 0 ? "Surplus" : "Deficit";

    output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>`;

    output.classList.remove("hide");
}
// End of calculating Calories

addEntryButton.addEventListener('click', addEntry);
calorieCounter.addEventListener('submit', calculateCalories);