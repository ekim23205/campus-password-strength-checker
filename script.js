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

passwordInput.addEventListener("input", checkPassword);

function checkPassword() {

    const password = passwordInput.value;

    let score = 0;

    const goodLength = password.length >= 12;
    // Check whether the password contains an uppercase letter
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    updateRequirement(lengthCheck, goodLength);
    updateRequirement(uppercaseCheck, hasUppercase);
    updateRequirement(lowercaseCheck, hasLowercase);
    updateRequirement(numberCheck, hasNumber);
    updateRequirement(specialCheck, hasSpecial);

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

    scoreText.textContent = `Score: ${score} / 5`;

    const percentage = (score / 5) * 100;

progressBar.style.width = percentage + "%";

    if (password.length === 0) {

        strengthText.textContent = "Strength: Not Tested";

    } else if (score <= 2) {

        strengthText.textContent = "Strength: Weak";

    } else if (score <= 4) {

        strengthText.textContent = "Strength: Medium";

    } else {

        strengthText.textContent = "Strength: Strong";

    }
    const commonPasswords = [
    "password",
    "123456",
    "qwerty",
    "admin",
    "letmein"
];

const isCommonPassword = commonPasswords.includes(password.toLowerCase());

    const hasRepeatedCharacters = /(.)\1\1/.test(password);
    if (isCommonPassword) {
    score = 0;
}
}

function updateRequirement(element, passed) {

    if (passed) {

        element.textContent = "✓ " + element.textContent.replace("✓ ", "").replace("✗ ", "");

    } else {

        element.textContent = "✗ " + element.textContent.replace("✓ ", "").replace("✗ ", "");

    }
}

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "Hide Password";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "Show Password";

    }
});