// Function to check if a word is a CVC word
function isCVC(word) {
  const vowels = "aeiou";
  return word.length === 3 && !vowels.includes(word[0]) && vowels.includes(word[1]) && !vowels.includes(word[2]);
}

// Function to filter a list of words to only include CVC words
function filterCVCWords(words) {
  return words.filter(isCVC);
}

const wordList = ["bad", "bed", "big", "bin", "cab", "cad", "cap", "cat", "cod", "cog", "cop", "cot", "cub", "cud", "cup", "cut", "dab", "dad", "dag", "dam", "den", "did", "dig", "dim", "din", "dog", "don", "dub", "dug", "dun", "fad", "fan", "fat", "fed", "fin", "fit", "fix", "fog", "fop", "fot", "fox", "fun", "gab", "gad", "gag", "gam", "gap", "gas", "get", "gig", "gin", "god", "got", "gum", "gun", "had", "hag", "ham", "hap", "hat", "hay", "hem", "hen", "hid", "hip", "hit", "hog", "hop", "hot", "hub", "hug", "hum", "hut", "jab", "jag", "jam", "jar", "jet", "jib", "jig", "job", "jog", "jot", "jug", "jun", "kab", "kad", "kag", "kam", "kap", "kat", "ked", "ken", "ket", "kid", "kin", "kit", "lab", "lad", "lag", "lam", "lap", "lat", "lav", "law", "lax", "lay", "led", "leg", "let", "lid", "lie", "lip", "lit", "lob", "log", "lot", "lug", "mad", "mag", "man", "map", "mat", "max", "may", "men", "met", "mid", "min", "mix", "mob", "mod", "mog", "mom", "mop", "mot", "mug", "mum", "mun", "nab", "nag", "nap", "nat", "ned", "neg", "net", "nib", "nod", "nog", "nom", "not", "nub", "nun", "nut", "pad", "pag", "pan", "pat", "paw", "pay", "pen", "pep", "pet", "pig", "pin", "pip", "pod", "pop", "pot", "pub", "pug", "pun", "put", "quag", "rag", "ran", "rat", "raw", "ray", "red", "ref", "rep", "rib", "rid", "rig", "rim", "rin", "rip", "rob", "rod", "rog", "rot", "rub", "rug", "run", "sad", "sag", "sam", "sap", "sat", "saw", "say", "sec", "sed", "seg", "sel", "set", "sew", "sex", "she", "shy", "sib", "sic", "sid", "sig", "sin", "sip", "sit", "six", "sob", "sod", "son", "sop", "sot", "sow", "soy", "sub", "sud", "sun", "sup", "tab", "tad", "tag", "tan", "tap", "tar", "tax", "tea", "ted", "ten", "the", "tin", "tip", "toe", "tog", "tom", "ton", "top", "tub", "tug", "tun", "van", "vat", "vet", "vic", "vid", "vie", "vig", "vin", "vip", "vis", "von", "wad", "wag", "wan", "wap", "war", "was", "wax", "way", "web", "wed", "wen", "wet", "wig", "win", "wit", "wob", "won", "woo", "yap", "yaw", "yen", "yep", "yes", "yet", "yod", "yon", "you", "zag", "zap", "zen", "zip", "zog", "zon", "zoo"];

let currentWordIndex = 0;
let filteredWords = []; // Store the filtered words
const currentWordSpan = document.getElementById("currentWord");
const wordListElement = document.getElementById("wordList");
const cvcWordList = filterCVCWords(wordList);

function nextWord() {
  currentWordIndex = (currentWordIndex + 1) % filteredWords.length; 
  currentWordSpan.textContent = filteredWords[currentWordIndex]; // Use filteredWords here
  updateWordList();
}

function updateWordList(wordsToDisplay = filteredWords) { // Use filteredWords as default
  wordListElement.innerHTML = '';
  for (let i = 0; i < wordsToDisplay.length; i++) {
    let listItem = document.createElement("li");
    listItem.textContent = wordsToDisplay[i];
    wordListElement.appendChild(listItem);
  }
}

function playWord() {
  if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(currentWordSpan.textContent);
    speechSynthesis.speak(utterance);
  } else {
    alert('Speech synthesis not supported in this browser.');
  }
}

function toggleWordList() {
  const wordList = document.getElementById("wordList");
  wordList.style.display = wordList.style.display === "none" ? "block" : "none";
}

function createLetterButtons() {
  const letterButtonsContainer = document.querySelector('.letter-buttons');
  const letters = "abcdefghijklmnopqrstuvwxyz"; 

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const button = document.createElement("button");
    button.textContent = letter.toUpperCase();
    button.addEventListener("click", () => {
      displayWordsByLetter(letter);
    });
    letterButtonsContainer.appendChild(button);
  }
}

function displayWordsByLetter(letter) {
  filteredWords = cvcWordList.filter(word => word.startsWith(letter)); 
  updateWordList(filteredWords); 
  currentWordIndex = 0;  
  currentWordSpan.textContent = filteredWords[currentWordIndex]; 
}

nextWord();
updateWordList();
createLetterButtons();
