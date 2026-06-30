const passwordInput = document.querySelector("#password");
const copyBtn = document.querySelector("#copyBtn");
const uppercase = document.querySelector("#uppercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const generateBtn = document.querySelector("#generateBtn");
const lengthInput = document.querySelector("#length");
const lengthDisplay = document.querySelector("#lengthValue");

function createPassword(){
  let chars = "abcdefghijklmnopqrstuvwxyz";
  if (uppercase.checked){
    chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  }
  if (numbers.checked){
    chars+="0123456789"
  }
  if (symbols.checked){
    chars+="!@#$%"
  }

  let password=""
  const length = getValidLength();
  for (let i=0; i<length; i++){
    password+=chars[Math.floor(Math.random() * chars.length)]
  }
  passwordInput.value = password;
};

function copyPassword() {
  passwordInput.select();
  navigator.clipboard.writeText(passwordInput.value)
    .then(() => {
      console.log("Пароль скопирован!");
    })
}

generateBtn.addEventListener("click", createPassword);

copyBtn.addEventListener("click", copyPassword);

lengthInput.addEventListener("input", getValidLength);

function getValidLength() {
  let val = parseInt(lengthInput.value, 10);
  if (isNaN(val) || val < 4) val = 4;
  if (val > 32) val = 32;
  lengthDisplay.textContent = val;
  return val;
}

lengthDisplay.textContent = getValidLength();

getValidLength();
createPassword();