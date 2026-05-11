const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.style.margin = 0;
document.body.appendChild(canvas);

let W = innerWidth,
  H = innerHeight;
canvas.width = W;
canvas.height = H;

window.onresize = () => {
  W = innerWidth;
  H = innerHeight;
  canvas.width = W;
  canvas.height = H;
};

//  GAME DATA
const CHOICES = ["Rock", "Paper", "Scissors"];
const RULES = {
  Rock: "Scissors",
  Paper: "Rock",
  Scissors: "Paper",
};

let state = "menu";
let player = null,
  ai = null,
  result = "";
let score = { p: 0, ai: 0 };

//  INPUT
canvas.onclick = (e) => {
  if (state === "menu") state = "play";
  else if (state === "play") {
    const x = e.clientX;
    player = x < W / 3 ? "Rock" : x < (2 * W) / 3 ? "Paper" : "Scissors";
    ai = CHOICES[Math.floor(Math.random() * 3)];

    if (player === ai) result = "DRAW";
    else if (RULES[player] === ai) {
      result = "WIN";
      score.p++;
    } else {
      result = "LOSE";
      score.ai++;
    }

    state = "result";
  } else if (state === "result") {
    state = "play";
  }
};

//  DRAW
function drawText(t, x, y, s = 30) {
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${s}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(t, x, y);
}

//  LOOP
function loop() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, W, H);

  if (state === "menu") {
    drawText("ROCK PAPER SCISSORS", W / 2, H / 2 - 40, 40);
    drawText("CLICK TO START", W / 2, H / 2 + 40, 20);
  }

  if (state === "play") {
    drawText("ROCK", W / 6, H / 2);
    drawText("PAPER", W / 2, H / 2);
    drawText("SCISSORS", (5 * W) / 6, H / 2);
  }

  if (state === "result") {
    drawText(`YOU: ${player}`, W / 2, H / 2 - 40);
    drawText(`AI: ${ai}`, W / 2, H / 2);
    drawText(result, W / 2, H / 2 + 60, 40);
    drawText("CLICK TO CONTINUE", W / 2, H - 80, 20);
  }

  drawText(`PLAYER: ${score.p}`, 80, 40, 20);
  drawText(`AI: ${score.ai}`, W - 80, 40, 20);

  requestAnimationFrame(loop);
}

loop();
