let player1 = document.getElementById("effect-char");
let player2 = document.getElementById("effect1-char");
let container = document.getElementById("container");
let win = document.getElementById("win")
let leftPosition = 250;
let rightPosition = 250;
let stopInterval;
let myHealth = 100;
let opHealth = 100;
player1.style.left = leftPosition + "px";
player2.style.right = rightPosition + "px";
function player1Handler(e) {
    console.log("keys", e.keyCode);
    if (e.keyCode == 38) {
      player1.src = "https://www.fightersgeneration.com/characters2/iron-fly.gif";
      player1.style.height = "550px";
      setTimeout(function () {
        player1.src =
          "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
        player1.style.height = "300px";
      }, 500);
    }
    if (e.keyCode == 40) {
      player1.src =
        "https://www.fightersgeneration.com/characters2/ironman-crouch.gif";
      player1.style.height = "180px";
      setTimeout(function () {
        player1.src =
          "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
        player1.style.height = "300px";
      }, 500);
    }
    if (e.keyCode == 37 && leftPosition > "0") {
      leftPosition -= 50;
      player1.style.left = leftPosition + "px";
    }
    if (e.keyCode == 39 && leftPosition < "1200") {
      leftPosition += 50;
      player1.style.left = leftPosition + "px";
    }
    if (e.keyCode == 67) {
      player1.src =
        "https://www.fightersgeneration.com/characters2/ironman-shield.gif";
  
      setTimeout(function () {
        player1.src =
          "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
      }, 500);
    }
    if (e.keyCode == 88) {
      player1.src =
        "https://www.fightersgeneration.com/characters2/iron-smart.gif";
      player1.style.height = "350px";
      setTimeout(function () {
        player1.src =
          "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
        player1.style.height = "300px";
      }, 1500);
    }
    if (e.keyCode == 90) {
      player1.src =
        "https://www.fightersgeneration.com/characters2/iron-unibeam.gif";
      player1.style.height = "500px";
      setTimeout(function () {
        player1.src =
          "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
        player1.style.height = "300px";
      }, 1700);
    }
}
function player2Handler(e) {
      console.log("keys", e.keyCode);
      if (e.keyCode == 87) {
          player2.src = "https://www.fightersgeneration.com/characters2/iron-fly.gif";
      player2.style.height = "550px";
      setTimeout(function () {
        player2.src =
          "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
        player2.style.height = "300px";
      }, 500);
    }
    if (e.keyCode == 83) {
      player2.src =
        "https://www.fightersgeneration.com/characters2/ironman-crouch.gif";
      player2.style.height = "180px";
      setTimeout(function () {
        player2.src =
          "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
        player2.style.height = "300px";
      }, 500);
    }
    if (e.keyCode == 68 && rightPosition > 0) {
      rightPosition -= 50;
      player2.style.right = rightPosition + "px";
    }
    if (e.keyCode == 65 && rightPosition < 1220) {
      rightPosition += 50;
      player2.style.right = rightPosition + "px";
    }
    if (e.keyCode == 75) {
      player2.src =
        "https://www.fightersgeneration.com/characters2/ironman-shield.gif";
  
      setTimeout(function () {
        player2.src =
          "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
      }, 500);
    }
    if (e.keyCode == 76) {
      player2.src =
        "https://www.fightersgeneration.com/characters2/iron-smart.gif";
      player2.style.height = "350px";
      setTimeout(function () {
        player2.src =
          "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
        player2.style.height = "300px";
      }, 1500);
    }
    if (e.keyCode == 74) {
      player2.src =
        "https://www.fightersgeneration.com/characters2/iron-unibeam.gif";
      player2.style.height = "500px";
      setTimeout(function () {
        player2.src =
          "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
        player2.style.height = "300px";
      }, 1700);
    }
  }
window.addEventListener("keydown", player2Handler);
window.addEventListener("keydown", player1Handler);
startTimer();
function startTimer() {
  let timer = document.getElementById("tik-tik");
  let time = "60";
  timer.innerText = time;

  stopInterval = setInterval(function () {
    if (time < 100) {
      time--;
      timer.innerText = time;
    }
    if (time < 10) {
      timer.innerText = "0" + time;
    }
    if (time == "00") {
      stopTimer();
      player1.style.left = '50px';
      player2.style.right = '50px';
      window.removeEventListener("keydown", player1Handler)
        window.removeEventListener("keydown", player2Handler)
        window.removeEventListener("keydown", bothHandler)
      container.style.backgroundImage =
        "linear-gradient(black, transparent 223%, transparent 100%, black),url(https://i0.wp.com/i.imgur.com/XIZ6y.gif)";
      if (myHealth < opHealth) {
        player1.src =
          "https://www.fightersgeneration.com/characters2/iron-smoke.gif";
          win.innerHTML = '<h1 class="win">You Lose</h1>'
      } else if (opHealth < myHealth) {
        player2.src =
          "https://www.fightersgeneration.com/characters2/iron-smoke.gif";
          win.innerHTML = '<h1 class="win">You Win</h1>'
      }else{
        win.innerHTML = '<h1 class="win">Tie</h1>'
      }
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(stopInterval);
}
function myDamage() {
  if (myHealth > 0) {
    myHealth -= 10;
    if (myHealth <= 0) {
      myHealth = 0;
      player1.style.left = '50px';
      player1.src =
        "https://www.fightersgeneration.com/characters2/iron-smoke.gif";
      container.style.background =
        "linear-gradient(black, transparent 223%, transparent 100%, black),url(https://i0.wp.com/i.imgur.com/XIZ6y.gif)";
        win.innerHTML = '<h1 class="win">You Lose</h1>'
        window.removeEventListener("keydown", player1Handler)
        window.removeEventListener("keydown", player2Handler)
        window.removeEventListener("keydown", bothHandler)
    }

    document.getElementById("health-my-bar").style.transform = `scaleX(${
      myHealth / 100
    })`;
  }
}
function opDamage() {
  if (opHealth > 0) {
    opHealth -= 10;
    if (opHealth <= 0) {
      opHealth = 0;
      player2.style.right = '50px';
      player2.src =
        "https://www.fightersgeneration.com/characters2/iron-smoke.gif";
      container.style.background =
        "linear-gradient(black, transparent 223%, transparent 100%, black),url(https://i0.wp.com/i.imgur.com/XIZ6y.gif)";
        win.innerHTML = '<h1 class="win">You Win</h1>'
        window.removeEventListener("keydown", player1Handler)
        window.removeEventListener("keydown", player2Handler)
        window.removeEventListener("keydown", bothHandler)
    }

    document.getElementById("health-op-bar").style.width = opHealth + "%";
  }
}
function checkOp() {
    let p1X = parseInt(player1.style.left);
    let p1Width = player1.offsetWidth;
    
    let p2X = window.innerWidth - parseInt(player2.style.right) - player2.offsetWidth;
    let p2Width = player2.offsetWidth;

    let distance = Math.abs((p1X + p1Width / 2) - (p2X + p2Width / 2));

    if (distance <= 120) {
        player2.src = "https://www.fightersgeneration.com/characters2/iron-diz.gif";
        
        opDamage();

        setTimeout(() => {
            player2.src = "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
        }, 1300);
    }
}

function checkMy() {
    let p1X = parseInt(player1.style.left);
    let p1Width = player1.offsetWidth;

    let p2X = window.innerWidth - parseInt(player2.style.right) - player2.offsetWidth;
    let p2Width = player2.offsetWidth;

    let distance = Math.abs((p1X + p1Width / 2) - (p2X + p2Width / 2));

    if (distance <= 120) {
        player1.src = "https://www.fightersgeneration.com/characters2/iron-diz.gif";

        myDamage();

        setTimeout(() => {
            player1.src = "https://www.fightersgeneration.com/characters2/iron-man-stance.gif";
        }, 1300);
    } 
}
function bothHandler(e) {
    if (e.keyCode == 90 || e.keyCode == 88) {
      setTimeout(() => {
        checkOp();
        console.log("he");
      }, 200); // Small delay to ensure hit detection happens after attack animation starts
    }
    if (e.keyCode == 74 || e.keyCode == 76) {
      setTimeout(() => {
        checkMy();
        console.log("be");
      }, 200);
    }
  }
window.addEventListener("keydown", bothHandler);
