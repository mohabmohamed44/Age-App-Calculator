let inputs = document.querySelectorAll("input"); // Get all input elements on the page
const errorMessage = document.querySelectorAll('.error-message'); // Get all error message elements on the page

inputs[0].addEventListener('input', function (event) { // Add an input event listener to the first input element
    let value = event.target.value; // Get the value entered by the user
    if (value < 30) { // If the value is less than 30
        if (value == 0) { // If the value is 0, set it to 1
            value = 1
        }
        value = value; // Keep the same value
    } else if (value > 30) { // If the value is greater than 30
        value = 30 // Set the value to 30
    }
    event.target.value = value; // Set the input value to the corrected value
});

inputs[1].addEventListener('input', function (event) { // Add an input event listener to the second input element
    let value = event.target.value; // Get the value entered by the user
    if (value == 0) { // If the value is 0, set it to 1
        value = 1
    }
    if (value < 12) { // If the value is less than 12
        value = value; // Keep the same value
    } else if (value > 12) { // If the value is greater than 12
        value = 12 // Set the value to 12
    }
    event.target.value = value; // Set the input value to the corrected value
});

inputs[2].addEventListener('input', function (event) { // Add an input event listener to the third input element
    let value = event.target.value; // Get the value entered by the user
    if (value == 0) { // If the value is 0, set it to 1
        value = 1
    }
    if (value < 2022) { // If the value is less than 2022
        value = value; // Keep the same value
    } else if (value > year) { // If the value is greater than 2022
        value = year // Set the value to 2022
    }
    event.target.value = value; // Set the input value to the corrected value
});

// Get the current date
const now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1; // add 1 because getMonth() is 0-indexed
let day = now.getDate();
console.log(year)

function calculateAge(birthdate) { // Define a function to calculate the age based on a birthdate
    const now = new Date();
    const birth = new Date(birthdate);

    let age = {};

    let yearDiff = now.getFullYear() - birth.getFullYear();
    let monthDiff = now.getMonth() - birth.getMonth();
    let dayDiff = now.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        yearDiff--;
        monthDiff += 12;
    }

    let daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    if (dayDiff < 0) {
        dayDiff += daysInLastMonth;
        monthDiff--;
    }

    let totalDays = ((yearDiff * 365) + (monthDiff * daysInLastMonth) + dayDiff);
    age.years = Math.floor(totalDays / 365);
    totalDays = totalDays % 365;
    age.months = Math.floor(totalDays / daysInLastMonth);
    totalDays = totalDays % daysInLastMonth;
    age.days = totalDays;

    return age;
}

const years = document.querySelector("#years"); // Get the element with id "years"
const months = document.querySelector("#months"); // Get the element with id "months"
const days = document.querySelector("#days"); // Get the element with id "days"
const button = document.getElementById("button"); // Get the button element with id "button"

button.addEventListener('click', function () { 
    let isEmpty = false;
    inputs.forEach(function (input) { 
        if (input.value.trim() === '') {
            isEmpty = true;
            input.nextSibling.nextSibling.innerHTML = "please enter a number" 
            input.style.border = "1px solid red"; 
        }
    });
    if (!isEmpty) { // If no input element is empty, calculate and display the age
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].nextSibling.nextSibling.innerHTML = "" // Clear any error messages
            inputs[i].style.border = "1px solid #ececec"; // Set the input element border back to its default color
        }
        const birthdate = `${inputs[2].value}-${inputs[1].value}-${inputs[0].value}'`; // Get the birthdate from the input elements
        const age = calculateAge(birthdate); // Calculate the age based on the birthdate
        years.innerHTML = age.years; // Display the years
        months.innerHTML = age.months; // Display the months
        days.innerHTML = age.days; // Display the days
    }
});