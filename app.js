
const fullText =
  "klavyenin hızıyla dans etmek becerilerinizi keşfetmenin ve sınırlarınızı zorlamanın harika bir yoludur her tuşa dokunduğunuzda kendinize olan güveniniz biraz daha artar ve klavyenin ritmiyle uyum sağladıkça parmaklarınız adeta bir müzik aleti gibi ustalıkla hareket eder her harf bir başka adımdır ilerlemeye doğru her kelime hedefinize biraz daha yaklaşmanın zaferidir her cümle azminizin ve kararlılığınızın bir yansımasıdır klavye hızı testi sadece becerilerinizi değil aynı zamanda sabrınızı odaklanma yeteneğinizi ve hızınızı geliştirmenin heyecan verici bir yoludur içinizdeki potansiyeli keşfedin tuşlara dokunun ve her an daha iyi bir versiyonunuzu yazmaya devam edin klavye üzerindeki ustalığınız sadece hızınızı değil aynı zamanda iletişim becerilerinizi de güçlendirir her vuruş düşüncelerinizi ifade etmenin bir yolu olarak algılanabilir her geçen saniye daha net ve daha özgün bir şekilde ifade etmeyi öğrenirsiniz unutmayın her hata bir öğrenme fırsatıdır yaptığınız her yanlış daha iyisini yapmak için bir adım daha atmanızı sağlar klavye hızı testi sadece bir ölçü değil aynı zamanda sürekli gelişim ve öğrenme sürecinizin bir parçasıdır kendinize olan güveniniz ve yetenekleriniz üzerindeki bu kontrolün keyfini çıkarın her vuruş sizin daha da güçlenmenize olan katkınızın bir göstergesidir devam edin klavyenin büyülü dünyasında ilerlemeye devam edin ve her gün biraz daha ileri gitmenin gururunu yaşayın";

const words = fullText.split(/\s+/);

const wordDisplay = document.getElementById("word");
const inputField = document.getElementById("input");
const wpmDisplay = document.getElementById("wpmScore");
const timeElement = document.getElementById("time");
const tryAgainButton = document.getElementById("tryAgain");
const music = document.getElementById("music");
const musicControl = document.getElementById("musicControl");
musicControl.checked = true;


let timer;
let time = 60;
let wordIndex = 0;
let correctWords = 0;
let typingStarted = false;

function startTimer() {
  timer = setInterval(updateTime, 1000);
  music.play();
  IsMusicActive();
}

function displayNextWord() {
  wordDisplay.innerText = words[wordIndex];
}

function calculateWPM() {
  const minutes = 1;
  const wordsPerMinute = Math.round(correctWords / minutes);
  wpmDisplay.textContent = wordsPerMinute;
}


const IsMusicActive = () => {
  if (musicControl.checked == true) {
    music.volume = 0.5;
  }
  else {
    music.volume = 0;
  }
}

function updateTime() {
  if (time > 0) {
    time--;
    timeElement.textContent = time;
    IsMusicActive();
  } else {
    clearInterval(timer);
    inputField.setAttribute("disabled", "true");
    tryAgainButton.style.display = "block";
    wordDisplay.textContent = "Süre Doldu";
    calculateWPM();
  }
}

function checkInput() {
  if (!typingStarted) {
    typingStarted = true;
    startTimer();
  }

  const typedWord = inputField.value.trim();
  const currentWord = words[wordIndex];

  if (typedWord === currentWord) {
    correctWords++;
    wordIndex++;
    if (wordIndex < words.length) {
      displayNextWord();
      inputField.value = "";
    } else {
      clearInterval(timer);
      inputField.setAttribute("disabled", "true");
      tryAgainButton.style.display = "block";
      calculateWPM();
    }
  }
}

inputField.addEventListener("input", checkInput);

tryAgainButton.addEventListener("click", function () {
  wordIndex = 0;
  correctWords = 0;
  time = 60;
  typingStarted = false;
  inputField.removeAttribute("disabled");
  timeElement.textContent = time;
  displayNextWord();
  inputField.value = "";
  clearInterval(timer);
  music.pause();
  music.currentTime = 0;
});

displayNextWord();
