/* script to see what percentage of money gamble is most efficient */
/* ill give each bot the ability to earn money, and gamble
when they gamble they each do a different %.*/

// Default values
var xxChance = 40;
var xxxChance = 15;
var freq = 10;
var payCheck = 10;
var isRunning = false;
var inter;

var bots = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 10, 0],
  [0, 20, 0],
  [0, 30, 0],
  [0, 40, 0],
  [0, 50, 0],
  [0, 60, 0],
  [0, 70, 0],
  [0, 80, 0],
  [0, 90, 0],
  [0, 100, 0]
];

// JavaScript code here
document.getElementById("toggleButton").addEventListener("click", function () {
  var sideMenu = document.getElementById("sideMenu");
  var mainContent = document.getElementById("mainContent");
  if (sideMenu.style.width === "250px") {
    sideMenu.style.width = "0";
    mainContent.style.marginLeft = "0";
  } else {
    sideMenu.style.width = "250px";
    mainContent.style.marginLeft = "250px";
  }
});


function newBot() {
  addBot(Number(document.getElementById("percentInput").value));
}

function addBot(p) {
  bots.push([0, p, 0]);
}

function gamble(money) {
  let rnd = Math.random() * 100;
  if(rnd >= xxChance && rnd < xxxChance) {
    return 2;
  }
  if (rnd >= xxxChance) {
    return 3;
  }
  return 0;
}

function botGamble(who) {
  let money = bots[who][0];
  let percent = bots[who][1];

  let moneyCalc = Math.floor(percent / 100) * money);
  
  bots[who][0] -= moneyCalc;
  let turn = gamble(moneyCalc);
  bots[who][0] += turn*moneyCalc;
}

function earnMoney(who) {
  bots[who][0]+= payCheck;
}
var day = 0;

function runSimulation() {
  day = 0;
  for(var i =0;i<bots.length;i++) {
    bots[i][0] = 0;
  }

  xxChance = 100 - xxChance;
  xxxChance = 100 - xxxChance;

  inter = setInterval(() => {
  day++;
  for(var i =0;i<bots.length;i++) {
    earnMoney(i);
    bots[i][2]++;
    if(bots[i][2] >= freq) {
      botGamble(i);
      bots[i][2]=0;
    }
  }
  var formattedBots = bots.map(function (bot, index) {
    return `BOT${index}: $${bot[0]}; ${bot[1]}%`;
  });
    document.getElementById("game").innerHTML = '<ul>' + formattedBots.map(bot => `<li>${bot}</li>`).join('') + '</ul>';
}, 1);

}

function clearGame() {
  let bestBot = 0;
  for(var i = 0;i<bots.length;i++) {
    if(bots[i][0] > bots[bestBot][0]) {
      bestBot = i;
    }
  }
  document.querySelector("#result").innerHTML = `BOT${bestBot} won with ${bots[bestBot][0]}! Percent: ${bots[bestBot][1]}\n Day: ${day}; Gamble: ${Math.floor(day/freq)}`;

  clearInterval(inter);

  day = 0;
}

// Start or stop simulation
function startStopSimulation() {
  if (isRunning) {
    clearGame();
    document.getElementById("startStopButton").innerText = "Start";
    isRunning = false;
  } else {
    xxChance = parseInt(document.getElementById("xxChanceInput").value);
    xxxChance = parseInt(document.getElementById("xxxChanceInput").value);
    freq = parseInt(document.getElementById("freqInput").value);
    payCheck = parseInt(document.getElementById("payCheckInput").value);
    runSimulation();
    document.getElementById("startStopButton").innerText = "Stop";
    isRunning = true;
  }
}
