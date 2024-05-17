const lengthSlider = document.querySelector(".pass-length input"),
    options = document.querySelectorAll(".option input"),
    copyIcon = document.querySelector(".input-box span"),
    passwordInput = document.querySelector(".input-box input"),
    passwordIndicator = document.querySelector(".pass-indicator"),
    generateBtn = document.querySelector(".generate-btn"),
    copyBtn = document.querySelector(".copyBtn");

const characters = {
    lowercase: "qwertyuiopasdfghjklzxcvbnm",
    uppercase: "QWERTYUIOPASDFGHJKLZXCVBNM",
    numbers: "0123456789",
    symbols: "!#$%^&*():><,.{}[]`~"
};
const copy=()=>{
    let copyText = passwordInput;
    copyText.select();
    navigator.clipboard.writeText (copyText.value);
    copyBtn.innerHTML="copied";
}

const generatePassword = () => {
    copyBtn.innerHTML = "copy";
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id != "duplicate" && option.id != "spaces") {
                if (option.id === "numbers") {
                    // Split numbers into individual characters and add them to staticPassword
                    staticPassword += characters[option.id].split('');
                } else {
                    staticPassword += characters[option.id];
                }
            } else if (option.id === "spaces") {
                staticPassword += " ";
            } else {
                excludeDuplicate = true;
            }
        }
    });

    console.log("staticPassword : ", staticPassword);

    for (let i = 0; i < passLength; i++) {
        let randomChar;
        if (Array.isArray(staticPassword)) {
            // If staticPassword is an array, randomly select a character from it
            randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        } else {
            // Otherwise, treat it as a string and select a random character
            randomChar = staticPassword.charAt(Math.floor(Math.random() * staticPassword.length));
        }

        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ?
                (randomPassword += randomChar) : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
};



const updatePasswordIndicator = () => {
    passwordIndicator.id =
        lengthSlider.value < 9 ? "weak" :
        lengthSlider.value < 18 ? "medium" :
        "strong";
};

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePasswordIndicator();
};

lengthSlider.addEventListener("input", updateSlider);
options.forEach(option => {
    option.addEventListener("change", generatePassword);
});

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click",copy);
// Initial setup
updateSlider();
// generatePassword();
