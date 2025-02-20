// ====== DOM Elements ======
const player1 = document.getElementById("effect-char");
const player2 = document.getElementById("effect1-char");
const container = document.getElementById("container");
const winDisplay = document.getElementById("win");
const timerDisplay = document.getElementById("tik-tik");
const healthMyBar = document.getElementById("health-my-bar");
const healthOpBar = document.getElementById("health-op-bar");

// ====== Initial Game State ======
let leftPosition = 250;
let rightPosition = 250;
let myHealth = 100;
let opHealth = 100;
let timerInterval;

player1.style.left = `${leftPosition}px`;
player2.style.right = `${rightPosition}px`;

// ====== Animation Configurations ======
const ANIMATIONS = {
  ironMan: {
    stance: { 
      src: "https://www.fightersgeneration.com/characters2/iron-man-stance.gif", 
      height: "300px" 
    },
    fly: { 
      src: "https://www.fightersgeneration.com/characters2/iron-fly.gif", 
      height: "550px", 
      duration: 500 
    },
    crouch: { 
      src: "https://www.fightersgeneration.com/characters2/ironman-crouch.gif", 
      height: "180px", 
      duration: 500 
    },
    shield: { 
      src: "https://www.fightersgeneration.com/characters2/ironman-shield.gif", 
      duration: 500 
    },
    smart: { 
      src: "https://www.fightersgeneration.com/characters2/iron-smart.gif", 
      height: "350px", 
      duration: 1500 
    },
    unibeam: { 
      src: "https://www.fightersgeneration.com/characters2/iron-unibeam.gif", 
      height: "500px", 
      duration: 1700 
    },
    dizzy: { 
      src: "https://www.fightersgeneration.com/characters2/iron-diz.gif" 
    },
    smoke: { 
      src: "https://www.fightersgeneration.com/characters2/iron-smoke.gif" 
    }
  },
  spiderMan: {
    stance: { 
      src: "https://www.fightersgeneration.com/characters3/m-spiderman.gif", 
      height: "300px" 
    },
    fly: { 
      src: "https://www.fightersgeneration.com/characters3/spi-hk.gif", 
      height: "550px", 
      duration: 500 
    },
    crouch: { 
      src: "https://www.fightersgeneration.com/characters3/spidey-crouch.gif", 
      height: "180px", 
      duration: 500 
    },
    shield: { 
      src: "https://www.fightersgeneration.com/characters3/spidey-block.gif", 
      duration: 500 
    },
    smart: { 
      src: "https://www.fightersgeneration.com/characters3/spidey-standingattax.gif", 
      height: "350px", 
      duration: 1500 
    },
    unibeam: { 
      src: "https://www.fightersgeneration.com/characters3/spidey-flipkick-fk.gif", 
      height: "500px", 
      duration: 1700 
    },
    dizzy: { 
      src: "https://www.fightersgeneration.com/characters3/spidey-dizzied.gif" 
    },
    smoke: { 
      src: "https://www.fightersgeneration.com/characters3/spidey-dizzy.gif" 
    }
  }
};

// ====== Helper Functions ======

// Animate a player with a given character's animation move, then revert to stance after the duration (if provided)
function animatePlayer(player, character, animationKey) {
  const animation = ANIMATIONS[character]?.[animationKey];
  if (!animation) return;
  
  player.src = animation.src;
  if (animation.height) {
    player.style.height = animation.height;
  }
  
  if (animation.duration) {
    setTimeout(() => {
      player.src = ANIMATIONS[character].stance.src;
      player.style.height = ANIMATIONS[character].stance.height;
    }, animation.duration);
  }
}

// Update health bar display
function updateHealthBar(healthBarElement, healthValue) {
  if (healthBarElement === healthMyBar) {
    healthBarElement.style.transform = `scaleX(${healthValue / 100})`;
  } else {
    healthBarElement.style.width = `${healthValue}%`;
  }
}

// Collision detection based on player positions
function isCollision() {
  const p1X = parseInt(player1.style.left);
  const p1Width = player1.offsetWidth;
  
  const p2X = window.innerWidth - parseInt(player2.style.right) - player2.offsetWidth;
  const p2Width = player2.offsetWidth;
  
  const p1Center = p1X + p1Width / 2;
  const p2Center = p2X + p2Width / 2;
  const distance = Math.abs(p1Center - p2Center);
  
  return distance <= 120;
}

// ====== Player Damage & Health Management ======
function applyDamage(health) {
  return Math.max(health - 10, 0);
}

function myDamage() {
  if (myHealth > 0) {
    myHealth = applyDamage(myHealth);
    updateHealthBar(healthMyBar, myHealth);
    if (myHealth === 0) {
      player1.style.left = '50px';
      player1.src = ANIMATIONS.ironMan.smoke.src;
      endGame("lose");
    }
  }
}

function opDamage() {
  if (opHealth > 0) {
    opHealth = applyDamage(opHealth);
    updateHealthBar(healthOpBar, opHealth);
    if (opHealth === 0) {
      player2.style.right = '50px';
      player2.src = ANIMATIONS.spiderMan.smoke.src;
      endGame("win");
    }
  }
}

// Handle attack collision based on attacker
function handleAttack(attacker) {
  if (isCollision()) {
    if (attacker === "player1") {
      player2.src = ANIMATIONS.spiderMan.dizzy.src;
      opDamage();
      setTimeout(() => {
        player2.src = ANIMATIONS.spiderMan.stance.src;
      }, 1300);
    } else if (attacker === "player2") {
      player1.src = ANIMATIONS.ironMan.dizzy.src;
      myDamage();
      setTimeout(() => {
        player1.src = ANIMATIONS.ironMan.stance.src;
      }, 1300);
    }
  }
}

// ====== Event Handlers ======

// Player 1 (ironMan) key events (Arrow keys and attack keys)
function player1Handler(e) {
  switch (e.keyCode) {
    case 38: // Up Arrow → Fly
      animatePlayer(player1, "ironMan", "fly");
      break;
    case 40: // Down Arrow → Crouch
      animatePlayer(player1, "ironMan", "crouch");
      break;
    case 37: // Left Arrow → Move left
      if (leftPosition > 0) {
        leftPosition -= 50;
        player1.style.left = `${leftPosition}px`;
      }
      break;
    case 39: // Right Arrow → Move right
      if (leftPosition < 1200) {
        leftPosition += 50;
        player1.style.left = `${leftPosition}px`;
      }
      break;
    case 67: // 'C' key → Shield
      animatePlayer(player1, "ironMan", "shield");
      break;
    case 88: // 'X' key → Smart attack
      animatePlayer(player1, "ironMan", "smart");
      break;
    case 90: // 'Z' key → Unibeam
      animatePlayer(player1, "ironMan", "unibeam");
      break;
  }
}

// Player 2 (spiderMan) key events (WASD and attack keys)
function player2Handler(e) {
  switch (e.keyCode) {
    case 87: // 'W' key → Fly
      animatePlayer(player2, "spiderMan", "fly");
      break;
    case 83: // 'S' key → Crouch
      animatePlayer(player2, "spiderMan", "crouch");
      break;
    case 68: // 'D' key → Move left (reduce right offset)
      if (rightPosition > 0) {
        rightPosition -= 50;
        player2.style.right = `${rightPosition}px`;
      }
      break;
    case 65: // 'A' key → Move right (increase right offset)
      if (rightPosition < 1220) {
        rightPosition += 50;
        player2.style.right = `${rightPosition}px`;
      }
      break;
    case 75: // 'K' key → Shield
      animatePlayer(player2, "spiderMan", "shield");
      break;
    case 76: // 'L' key → Smart attack
      animatePlayer(player2, "spiderMan", "smart");
      break;
    case 74: // 'J' key → Unibeam
      animatePlayer(player2, "spiderMan", "unibeam");
      break;
  }
}

// Global handler to detect attack keys and trigger collision checks
function bothHandler(e) {
  // Player1 attack keys: 'Z' (90) or 'X' (88)
  if (e.keyCode === 90 || e.keyCode === 88) {
    setTimeout(() => {
      handleAttack("player1");
    }, 200);
  }
  // Player2 attack keys: 'J' (74) or 'L' (76)
  if (e.keyCode === 74 || e.keyCode === 76) {
    setTimeout(() => {
      handleAttack("player2");
    }, 200);
  }
}

// ====== Timer & Game End ======
function startTimer() {
  let time = 60;
  timerDisplay.innerText = time < 10 ? "0" + time : time;
  
  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      timerDisplay.innerText = time < 10 ? "0" + time : time;
    }
    if (time === 0) {
      stopTimer();
      endGame(); // Determine win/tie based on remaining health
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// End game and remove key event listeners
function endGame(result) {
  player1.style.left = '50px';
  player2.style.right = '50px';
  
  window.removeEventListener("keydown", player1Handler);
  window.removeEventListener("keydown", player2Handler);
  window.removeEventListener("keydown", bothHandler);
  
  container.style.backgroundImage =
    "linear-gradient(black, transparent 223%, transparent 100%, black),url(https://i0.wp.com/i.imgur.com/XIZ6y.gif)";
  
  if (result === "lose") {
    winDisplay.innerHTML = '<h1 class="win">You Lose</h1>';
  } else if (result === "win") {
    winDisplay.innerHTML = '<h1 class="win">You Win</h1>';
  } else {
    if (myHealth < opHealth) {
      player1.src = ANIMATIONS.ironMan.smoke.src;
      winDisplay.innerHTML = '<h1 class="win">You Lose</h1>';
    } else if (opHealth < myHealth) {
      player2.src = ANIMATIONS.spiderMan.smoke.src;
      winDisplay.innerHTML = '<h1 class="win">You Win</h1>';
    } else {
      winDisplay.innerHTML = '<h1 class="win">Tie</h1>';
    }
  }
}

// ====== Event Listeners & Game Start ======
window.addEventListener("keydown", player1Handler);
window.addEventListener("keydown", player2Handler);
window.addEventListener("keydown", bothHandler);
startTimer();



// let player1 = document.getElementById("effect-char");
// let player2 = document.getElementById("effect1-char");
// let container = document.getElementById("container");
// let win = document.getElementById("win")
// let leftPosition = 250;
// let rightPosition = 250;
// let stopInterval;
// let myHealth = 100;
// let opHealth = 100;
// player1.style.left = leftPosition + "px";
// player2.style.right = rightPosition + "px";
// function player1Handler(e) {
//     console.log("keys", e.keyCode);
//     if (e.keyCode == 38) {
//       player1.src = "https://www.fightersgeneration.com/characters2/iron-fly.gif";
//       player1.style.height = "550px";
//       setTimeout(function () {
//         player1.src =
//           "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//         player1.style.height = "300px";
//       }, 500);
//     }
//     if (e.keyCode == 40) {
//       player1.src =
//         "https://www.fightersgeneration.com/characters2/ironman-crouch.gif";
//       player1.style.height = "180px";
//       setTimeout(function () {
//         player1.src =
//           "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//         player1.style.height = "300px";
//       }, 500);
//     }
//     if (e.keyCode == 37 && leftPosition > "0") {
//       leftPosition -= 50;
//       player1.style.left = leftPosition + "px";
//     }
//     if (e.keyCode == 39 && leftPosition < "1200") {
//       leftPosition += 50;
//       player1.style.left = leftPosition + "px";
//     }
//     if (e.keyCode == 67) {
//       player1.src =
//         "https://www.fightersgeneration.com/characters2/ironman-shield.gif";
  
//       setTimeout(function () {
//         player1.src =
//           "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//       }, 500);
//     }
//     if (e.keyCode == 88) {
//       player1.src =
//         "https://www.fightersgeneration.com/characters2/iron-smart.gif";
//       player1.style.height = "350px";
//       setTimeout(function () {
//         player1.src =
//           "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//         player1.style.height = "300px";
//       }, 1500);
//     }
//     if (e.keyCode == 90) {
//       player1.src =
//         "https://www.fightersgeneration.com/characters2/iron-unibeam.gif";
//       player1.style.height = "500px";
//       setTimeout(function () {
//         player1.src =
//           "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//         player1.style.height = "300px";
//       }, 1700);
//     }
// }
// function player2Handler(e) {
//       console.log("keys", e.keyCode);
//       if (e.keyCode == 87) {
//           player2.src = "https://www.fightersgeneration.com/characters2/iron-fly.gif";
//       player2.style.height = "550px";
//       setTimeout(function () {
//         player2.src =
//           "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//         player2.style.height = "300px";
//       }, 500);
//     }
//     if (e.keyCode == 83) {
//       player2.src =
//         "https://www.fightersgeneration.com/characters2/ironman-crouch.gif";
//       player2.style.height = "180px";
//       setTimeout(function () {
//         player2.src =
//           "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//         player2.style.height = "300px";
//       }, 500);
//     }
//     if (e.keyCode == 68 && rightPosition > 0) {
//       rightPosition -= 50;
//       player2.style.right = rightPosition + "px";
//     }
//     if (e.keyCode == 65 && rightPosition < 1220) {
//       rightPosition += 50;
//       player2.style.right = rightPosition + "px";
//     }
//     if (e.keyCode == 75) {
//       player2.src =
//         "https://www.fightersgeneration.com/characters2/ironman-shield.gif";
  
//       setTimeout(function () {
//         player2.src =
//           "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//       }, 500);
//     }
//     if (e.keyCode == 76) {
//       player2.src =
//         "https://www.fightersgeneration.com/characters2/iron-smart.gif";
//       player2.style.height = "350px";
//       setTimeout(function () {
//         player2.src =
//           "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//         player2.style.height = "300px";
//       }, 1500);
//     }
//     if (e.keyCode == 74) {
//       player2.src =
//         "https://www.fightersgeneration.com/characters2/iron-unibeam.gif";
//       player2.style.height = "500px";
//       setTimeout(function () {
//         player2.src =
//           "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//         player2.style.height = "300px";
//       }, 1700);
//     }
//   }
// window.addEventListener("keydown", player2Handler);
// window.addEventListener("keydown", player1Handler);
// startTimer();
// function startTimer() {
//   let timer = document.getElementById("tik-tik");
//   let time = "60";
//   timer.innerText = time;

//   stopInterval = setInterval(function () {
//     if (time < 100) {
//       time--;
//       timer.innerText = time;
//     }
//     if (time < 10) {
//       timer.innerText = "0" + time;
//     }
//     if (time == "00") {
//       stopTimer();
//       player1.style.left = '50px';
//       player2.style.right = '50px';
//       window.removeEventListener("keydown", player1Handler)
//         window.removeEventListener("keydown", player2Handler)
//         window.removeEventListener("keydown", bothHandler)
//       container.style.backgroundImage =
//         "linear-gradient(black, transparent 223%, transparent 100%, black),url(https://i0.wp.com/i.imgur.com/XIZ6y.gif)";
//       if (myHealth < opHealth) {
//         player1.src =
//           "https://www.fightersgeneration.com/characters2/iron-smoke.gif";
//           win.innerHTML = '<h1 class="win">You Lose</h1>'
//       } else if (opHealth < myHealth) {
//         player2.src =
//           "https://www.fightersgeneration.com/characters2/iron-smoke.gif";
//           win.innerHTML = '<h1 class="win">You Win</h1>'
//       }else{
//         win.innerHTML = '<h1 class="win">Tie</h1>'
//       }
//     }
//   }, 1000);
// }
// function stopTimer() {
//   clearInterval(stopInterval);
// }
// function myDamage() {
//   if (myHealth > 0) {
//     myHealth -= 10;
//     if (myHealth <= 0) {
//       myHealth = 0;
//       player1.style.left = '50px';
//       player1.src =
//         "https://www.fightersgeneration.com/characters2/iron-smoke.gif";
//       container.style.background =
//         "linear-gradient(black, transparent 223%, transparent 100%, black),url(https://i0.wp.com/i.imgur.com/XIZ6y.gif)";
//         win.innerHTML = '<h1 class="win">You Lose</h1>'
//         window.removeEventListener("keydown", player1Handler)
//         window.removeEventListener("keydown", player2Handler)
//         window.removeEventListener("keydown", bothHandler)
//     }

//     document.getElementById("health-my-bar").style.transform = `scaleX(${
//       myHealth / 100
//     })`;
//   }
// }
// function opDamage() {
//   if (opHealth > 0) {
//     opHealth -= 10;
//     if (opHealth <= 0) {
//       opHealth = 0;
//       player2.style.right = '50px';
//       player2.src =
//         "https://www.fightersgeneration.com/characters2/iron-smoke.gif";
//       container.style.background =
//         "linear-gradient(black, transparent 223%, transparent 100%, black),url(https://i0.wp.com/i.imgur.com/XIZ6y.gif)";
//         win.innerHTML = '<h1 class="win">You Win</h1>'
//         window.removeEventListener("keydown", player1Handler)
//         window.removeEventListener("keydown", player2Handler)
//         window.removeEventListener("keydown", bothHandler)
//     }

//     document.getElementById("health-op-bar").style.width = opHealth + "%";
//   }
// }
// function checkOp() {
//     let p1X = parseInt(player1.style.left);
//     let p1Width = player1.offsetWidth;
    
//     let p2X = window.innerWidth - parseInt(player2.style.right) - player2.offsetWidth;
//     let p2Width = player2.offsetWidth;

//     let distance = Math.abs((p1X + p1Width / 2) - (p2X + p2Width / 2));

//     if (distance <= 120) {
//         player2.src = "https://www.fightersgeneration.com/characters2/iron-diz.gif";
        
//         opDamage();

//         setTimeout(() => {
//             player2.src = "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//         }, 1300);
//     }
// }

// function checkMy() {
//     let p1X = parseInt(player1.style.left);
//     let p1Width = player1.offsetWidth;

//     let p2X = window.innerWidth - parseInt(player2.style.right) - player2.offsetWidth;
//     let p2Width = player2.offsetWidth;

//     let distance = Math.abs((p1X + p1Width / 2) - (p2X + p2Width / 2));

//     if (distance <= 120) {
//         player1.src = "https://www.fightersgeneration.com/characters2/iron-diz.gif";

//         myDamage();

//         setTimeout(() => {
//             player1.src = "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
//         }, 1300);
//     } 
// }
// function bothHandler(e) {
//     if (e.keyCode == 90 || e.keyCode == 88) {
//       setTimeout(() => {
//         checkOp();
//         console.log("he");
//       }, 200); // Small delay to ensure hit detection happens after attack animation starts
//     }
//     if (e.keyCode == 74 || e.keyCode == 76) {
//       setTimeout(() => {
//         checkMy();
//         console.log("be");
//       }, 200);
//     }
//   }
// window.addEventListener("keydown", bothHandler);
