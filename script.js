const pressedKeys = [];
let startTime = 0;
let endTime = 0;
let isEnd = false;

let wrong = 0;

const mainContent = document.getElementById("main-content");

const text =
  "Lorem";

function removePunction(sentence = "") {
  const list = [".", ",", "?", "!"];
  const arr = sentence.split("");
  return arr.filter((a) => {
    return !list.includes(a);
  });
}

const sentence = removePunction(text);

function displayText() {
  sentence.forEach((c) => {
    const span = document.createElement("span");
    span.innerHTML = c;
    mainContent.appendChild(span);
  });
}

displayText();

function handleKeyPress(e) {
    console.log(e);
    if(pressedKeys.length === 0){
        startTime = Date.now();
    }
    
  const { key } = e;
  pressedKeys.push(key);

  console.log(pressedKeys.length, sentence.length);
  
  if (pressedKeys.length === sentence.length) {
    isEnd = true;
    endTime = Date.now();
    console.log(wrong, (endTime - startTime)/1000);
    
  }

  const spans = document.querySelectorAll("span");

  if (key === sentence[pressedKeys.length - 1])
    spans[pressedKeys.length - 1].className = "ok";
  else {
    spans[pressedKeys.length - 1].className = "wrong";
    wrong++;
  }
}

document.body.addEventListener("keypress", handleKeyPress);
