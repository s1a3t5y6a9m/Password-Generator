let inputSlider=document.querySelector("[Slider]");
let lengthDisplay=document.querySelector("[passwordLength");
let passwordDisplay=document.querySelector("[passwordDisplay]");
let copyBtn=document.querySelector("[copybtn]");
let copyMsg=document.querySelector(".copyMsg");
let uppercaseCheck=document.querySelector('#uppercase');
let lowercaseCheck=document.querySelector('#lowercase');
let numbersCheck=document.querySelector('#numbers');
let symbolsCheck=document.querySelector('#symbols');
let indicator=document.querySelector("[indicator]");
let generateBtn=document.querySelector(".generateButton");
let allCheckBox=document.querySelectorAll("input[type=checkbox]")
let symbols='%&#@$';
let password="";
let passwordLength=8;
let checkCount=1;
uppercaseCheck.checked=true;
handleSlider();
// set  strength circle color to grey----->
setIndicator('#ccc');
// set PasswordLength------>
function handleSlider(){   // update ui based on passwordLength value;
inputSlider.value=passwordLength;
lengthDisplay.textContent=passwordLength;
let min=inputSlider.min;
let max=inputSlider.max;
inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "%";
}
// set Indicator----->
function setIndicator(color){
indicator.style.backgroundColor=color;
indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}
function getRandomInteger(min,max){
return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
return getRandomInteger(0,9).toString();
}
function generateLowerCase(){
return String.fromCharCode(getRandomInteger(97,123));
}
function generateUpperCase(){
return String.fromCharCode(getRandomInteger(65,91));
}
function generateSymbols(){
let randomIndex=getRandomInteger(0,symbols.length);
return symbols.charAt(randomIndex);
}
function calculateStrength(){
    let hasUpperCase=false;
    let hasLowerCase=false;
    let hasNumber=false;
    let hasSymbol=false;
    let tickCount=0;
    if(uppercaseCheck.checked){
    hasUpperCase=true;
    tickCount++;
    }
    if(lowercaseCheck.checked){
    hasLowerCase=true;
    tickCount++;
    }
    if(numbersCheck.checked){
    hasNumber=true;
    tickCount++;
    }
    if(symbolsCheck.checked){
    hasSymbol=true;
    tickCount++;
    } 
    if(tickCount==0) setIndicator('transparent');
    else if( tickCount>=3 && passwordLength>=8){
    setIndicator("#0f0");
    }
    else if(tickCount==2 &&passwordLength>=6){
    setIndicator("#ff0");
    }
    else{
    setIndicator("#f00");
    }
}
async function copyContent(){

    try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText='Copied';
    copyMsg.classList.add("active");
    setTimeout( () => {
    copyMsg.classList.remove("active");},2000);
    console.log("Hello Satyam prakash singh");
    }
    catch{
    copyMsg.innerText='Failed';
    }
    // to make copy message visible------>
}
function shufflePassword(array){
    // Fisher Yates Method
    for(let i=array.length-1;i>0;i--){
    // random J,find out using random function
    let j=Math.floor(Math.random()*(i+1));
    // swap number at i index and j index
    let temp=array[i];
    array[i]=array[j];
    array[j]=temp;
    }
    let str="";
    array.forEach(element=>str+=element);
    return str;
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkBox)=>{
    if(checkBox.checked){
    checkCount++; }});
    // special case---->
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach( (checkBox)=>{
    checkBox.addEventListener('change',handleCheckBoxChange);
}
)
inputSlider.addEventListener('input',(e) =>{
    passwordLength=e.target.value;
    handleSlider();
});
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value!="" && passwordDisplay.value!='Tick at least one checkBox'){
    copyContent();
    }
    }
)
generateBtn.addEventListener('click',()=>{
    // none of the checkbox are selected
    if(checkCount==0){
    passwordDisplay.value='Tick at least one checkBox';
    calculateStrength();
    }
    // let's start the journey to find new password;

    //remove old password;
    password="";
    
    let passwordArr=[];
    if(uppercaseCheck.checked)
    passwordArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
    passwordArr.push(generateLowerCase);

    if(numbersCheck.checked)
    passwordArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
    passwordArr.push(generateSymbols);
    
    for(let i=0;i<passwordArr.length;i++){
    password+=passwordArr[i]();

    }
    for(let i=0;i<passwordLength-passwordArr.length;i++){
    let randomIndex=getRandomInteger(0,passwordArr.length);
    password+=passwordArr[randomIndex]();
    }
    // shuffle the password;
    password=shufflePassword(Array.from(password));
    // show in UI
    passwordDisplay.value=password;
    calculateStrength();
    }
)
