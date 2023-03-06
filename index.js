const passwordDisplay = document.querySelector("[data_passwordDisplay]");
const copyBtn= document.querySelector("[data_copyBtn]");
const copyMsg= document.querySelector("[data_copyMsg]");
const passwordLen = document.querySelector("[data_passwordLength]");
const sliderLength = document.querySelector("[data_sliderLength]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const colorIndicator = document.querySelector("[data_colorIndicator]");
const passwordBtn = document.querySelector(".passwordGenerateBtn");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setColorIndictor("#ccc");
// slider Handle function
function handleSlider(){
    sliderLength.value = passwordLength;
    passwordLen.innerText = passwordLength;
    const min = sliderLength.min;
    const max = sliderLength.max;
    sliderLength.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"

}
sliderLength.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
});

// random number generator
function getRandNumber(min, max){
    return Math.floor(Math.random()*(max-min)) + min;
}

function generateUpperCase(){
    return String.fromCharCode(getRandNumber(65,91));
}
function generateLowerCase(){
    return String.fromCharCode(getRandNumber(97,123));
}
function generateNumber(){
    return getRandNumber(0,9);
}
function generateSymbol(){
    let symb = getRandNumber(0,symbols.length);
    return symbols.charAt(symb);
}

function setColorIndictor(color){
    colorIndicator.style.backgroundColor = color;
    colorIndicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// calculating the strength of password
function calcStrength(){
    console.log("marking uncheck all the checkbox initially")
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymb = false;

    console.log("cheking the checkbox");
    
    if(uppercaseCheck.Checked){
        hasUpper = true;
        console.log("uppercase letter checked");
    }
    if(lowercaseCheck.Checked){ 
        hasLower = true;
        console.log("lowercase letter checked");
    }
    if(numberCheck.Checked){
        hasNum = true;
        console.log("number checked");
    }
    if(symbolsCheck.Checked){
        hasSymb = true;
        console.log("symbol checked");
    }

    console.log("Strengthcolor")
    if(hasUpper && hasLower && (hasNum || hasSymb) && passwordLength >= 8){
        setColorIndictor("#0f0");
        console.log("green color")
    }
    else if((hasUpper || hasLower) && (hasNum || hasSymb) && passwordLength >= 6){
        setColorIndictor("#ff0");
        console.log("yellow color")
    }
    else{
        setColorIndictor("#0f0");
       console.log("red color")
    }
};

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

passwordBtn.addEventListener('click', () => {
    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numberCheck.checked)
        funcArr.push(generateNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRandNumber(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
    console.log("Password Generated");
});
// console.log("start copying the password");
async function copyContent(){
    console.log("copying the password on the clicpboard");
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
        console.log("password copied");
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
    console.log("adding the active class in tooltip");
    
    copyMsg.classList.add("active");
    // removing the tooltip after an interval
    console.log("removing the active class in tooltip");
    setTimeout( () => {
        copyMsg.classList.remove("active");
    }, 2000);
}
// adding enventLitener on the copyBtn
// console.log("adding eventLitener on tootip");
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value){
        copyContent();
    }
    console.log("sab sahi chal raha h");

});
