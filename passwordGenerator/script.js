const inputSlider = document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[data-length]");
const copyBtn = document.querySelector("[data-copybtn]");
const copyMsg = document.querySelector("[data-copymsg]");
const strength = document.querySelector("[data-strength-indicator]");
const generateBtn = document.querySelector("[data-generate-button]");
const passwordDisplay = document.querySelector("[data-password]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const symbolCheck = document.querySelector("#symbol");
const numberCheck = document.querySelector("#number");
const allChecks = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLength = 10;
let checkCount = 1;
uppercaseCheck.checked=true;
let symbol = "+-*/!@#$%^&~[](){}_="
handleSlider();

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
} 

function setIndicator(color) {
    strength.style.backgroundColor = color;
    //shadow
}

function getRandomInteger(min,max){
    return Math.floor(Math.random() * (max-min))+min;
}
function getRandomNumber(min,max){
    return getRandomInteger(0,9);
}

function getRandomUppercase(min,max){
    return String.fromCharCode(getRandomInteger(65,91));
}
function getRandomLowercase(min,max){
    return String.fromCharCode(getRandomInteger(97,123));
}
function getRandomSymbol(min,max){
    return symbol.charAt(getRandomInteger(0,symbol.length));
}
function calStrength() {
    setIndicator("#10f0");
}
async function copyContent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }catch(e){
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");
    setTimeout( () => {
        copyMsg.classList.remove("active");
        location.reload();
    },2000);
}


inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
});
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
});
function handleCheckBox(){
    checkCount=0;
    allChecks.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider(); 
    }
}
allChecks.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBox);
})
generateBtn.addEventListener('click',()=>{
    if(checkCount<=0)
        return;
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider(); 
    }
    password="";

    let funcArr = [];
    if(uppercaseCheck.checked)
        funcArr.push(getRandomUppercase);
    if(symbolCheck.checked)
        funcArr.push(getRandomSymbol);
    if(lowercaseCheck.checked)
        funcArr.push(getRandomLowercase);
    if(numberCheck.checked)
        funcArr.push(getRandomNumber);

    while(password.length<passwordLength){
        password+=funcArr[getRandomInteger(0,funcArr.length)]();
    }
    passwordDisplay.value=password;
    calStrength();
});