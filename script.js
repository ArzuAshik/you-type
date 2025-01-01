const pressedKeys = [];
let startTime = 0;
let endTime = 0;
let isEnd = false;
let sentence = "";
let words = 0;
let speed = 0;
let wrong = 0;

const mainContent = document.getElementById("main-content");
const displaySpeed = document.getElementById("display-speed");

const text = "Lorem";

function removePunction(sentence = "") {
  const list = [".", ",", "?", "!"];
  const arr = sentence.split("");
  return arr.filter((a) => {
    return !list.includes(a);
  });
}

async function displayText() {
  const id = Math.floor(Math.random() * 100);
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
  const res = await data.json();
  mainContent.innerHTML = "";
  sentence = removePunction(res.body);
  words = res.body.split(" ").length;
  // sentence = removePunction("hello")
  sentence.forEach((c) => {
    const span = document.createElement("span");
    span.innerHTML = c;
    mainContent.appendChild(span);
  });
}

displayText();

function handleKeyPress(e) {
  const { key } = e;

  // adding starting time
  if (pressedKeys.length === 0) {
    startTime = Date.now();
  }

  // reload after ending the game
  if (pressedKeys.length === sentence.length) {
    if (key === " ") window.location.reload();
    return;
  }

  // adding pressed key
  pressedKeys.push(key);

  // calculating speed
  speed = calculateTypingSpeed(
    Math.round(pressedKeys.length / 6),
    (Date.now() - startTime) / 1000
  );
  displaySpeed.innerHTML = speed;

  // end game
  if (pressedKeys.length === sentence.length) {
    isEnd = true;
    endTime = Date.now();
    console.log(wrong, (endTime - startTime) / 1000);
  }

  const spans = document.querySelectorAll("span");

  // marking right or wrong
  console.log(key, sentence[pressedKeys.length-1])
  if (key === sentence[pressedKeys.length-1])
    spans[pressedKeys.length].className = "ok";
  else {
    spans[pressedKeys.length].className = "wrong";
    wrong++;
  }

  // show result
  if (pressedKeys.length === sentence.length) {
    isEnd = true;
    mainContent.innerHTML = `
      <div>
          <h2>Correct: ${sentence.length - wrong}</h2>
          <h2>Wrong: ${wrong}</h2>
          <h2>Accuracy: ${Math.round((wrong / sentence.length) * 100)} %</h2>
          <h2>Speed: ${speed}</h2>
          <p>Press space to restart</p>
        </div>
      `;
    return;
  }
}

function calculateTypingSpeed(wordCount, timeInSeconds) {
  // Calculate words per minute (WPM)
  const wpm = (wordCount / timeInSeconds) * 60;

  return Number.isNaN(wpm) ? 0 : Math.round(wpm);
}

document.body.addEventListener("keypress", handleKeyPress);
