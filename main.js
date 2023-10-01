/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
//   "Hello",
//   "Programming",
//   "Code",
//   "Javascript",
//   "Town",
//   "Country",
//   "Testing",
//   "Youtube",
//   "Linkedin",
//   "Twitter",
//   "Github",
//   "Leetcode",
//   "Internet",
//   "Python",
//   "Scala",
//   "Destructuring",
//   "Paradigm",
//   "Styling",
//   "Cascade",
//   "Documentation",
//   "Coding",
//   "Funny",
//   "Working",
//   "Dependencies",
  "Task",
//   "Runner",
  "Roles",
  "Test",
  "Rust",
//   "Playing"
];

// setting levels
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};
// default level
let defaultLevelName = "Normal"; //change level from here
let defaultLevelSeconds = lvls[defaultLevelName];

// catch selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// setting level name + seconds + score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// disable paste event
input.onpaste = function () {
    return false;
}

// start game
startButton.onclick = function () {
    this.remove();
    input.focus();
    // create word function
    genWords();
}
function genWords() {
    //  get random word from array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    //  get word index
    let wordIndex = words.indexOf(randomWord);
    // console.log(wordIndex);
    // remove word from array
    words.splice(wordIndex, 1);
    // show the random word
    theWord.innerHTML = randomWord;
    // empty upcoming words
    upcomingWords.innerHTML = "";
    // generate words
    for (let i = 0; i < words.length; i++) {
        // create div element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    //  call start play function
    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            clearInterval(start);
            // compare words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // console.log("dddddd")
                input.value = "";
                // empty input field
                scoreGot.innerHTML++;
                if (words.length > 0) {
                    // call generate word function
                    genWords();
                } else {
                    let span = document.createElement("span");
                    span.className = "good";
                    let spanText = document.createTextNode("congratz");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    // remove upcoming words box
                    upcomingWords.remove();
                }
            } else {
                let span = document.createElement("span");
                span.className = "bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }
        }
    }, 1000);
}
