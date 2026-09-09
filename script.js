const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strength");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progressBar");

const lengthCheck = document.getElementById("lengthCheck");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const specialCheck = document.getElementById("specialCheck");

const togglePassword = document.getElementById("togglePassword");


// Run checkPassword every time the user types
passwordInput.addEventListener("input", checkPassword);


function checkPassword() {

    const password = passwordInput.value;

    let score = 0;


    // Check basic password requirements
    const goodLength = password.length >= 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);


    // List of common passwords
    const commonPasswords = [
        "password",
        "123456",
        "qwerty",
        "admin",
        "letmein"
    ];


    // Check whether password is common
    const isCommonPassword = commonPasswords.includes(
        password.toLowerCase()
    );


    // Check for 3 repeated characters in a row
    const hasRepeatedCharacters = /(.)\1\1/.test(password);


    // Update checklist
    updateRequirement(lengthCheck, goodLength);
    updateRequirement(uppercaseCheck, hasUppercase);
    updateRequirement(lowercaseCheck, hasLowercase);
    updateRequirement(numberCheck, hasNumber);
    updateRequirement(specialCheck, hasSpecial);


    // Calculate score
    if (goodLength) {
        score++;
    }

    if (hasUppercase) {
        score++;
    }

    if (hasLowercase) {
        score++;
    }

    if (hasNumber) {
        score++;
    }

    if (hasSpecial) {
        score++;
    }


    // Penalize repeated characters
    if (hasRepeatedCharacters && score > 0) {
        score--;
    }


    // Common passwords get 0
    if (isCommonPassword) {
        score = 0;
    }


    // Update score
    scoreText.textContent = `Score: ${score} / 5`;


    // Update progress bar
    const percentage = (score / 5) * 100;

    progressBar.style.width = percentage + "%";


    // Update strength message
    if (password.length === 0) {

        strengthText.textContent = "Strength: Not Tested";

    } else if (isCommonPassword) {

        strengthText.textContent = "Strength: Very Common Password";

    } else if (score <= 2) {

        strengthText.textContent = "Strength: Weak";

    } else if (score <= 4) {

        strengthText.textContent = "Strength: Medium";

    } else {

        strengthText.textContent = "Strength: Strong";

    }
}


// This function changes the checklist to ✓ or ✗
function updateRequirement(element, passed) {

    const text = element.textContent
        .replace("✓ ", "")
        .replace("✗ ", "");

    if (passed) {

        element.textContent = "✓ " + text;

    } else {

        element.textContent = "✗ " + text;

    }
}


// Show / hide password button
togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "Hide Password";

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "Show Password";

    }

});