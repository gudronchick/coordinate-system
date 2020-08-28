const canv = document.querySelector(".canvas");
const context = canv.getContext("2d");
canv.width = window.innerWidth;
canv.height = window.innerHeight;
let angleForDraw = 1;
let a = "";

const drawText = () => {
  context.font = "20px sans-serif";
  context.beginPath();
  context.fillText("Value x: ", 50, 50);
  context.fillText("Value y: ", 50, 80);
  context.fillText("Angle (deg): ", 50, 110);
  context.fillText("Angle (rad): ", 50, 140);
  context.fill();
};

const drawChart = () => {
  context.lineWidth = 5;
  context.strokeStyle = "white";
  context.fillStyle = "white";

  context.beginPath();
  context.arc(canv.width / 2, canv.height / 2, 200, 0, Math.PI * 2);
  context.stroke();
  context.closePath();

  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(canv.width / 2 - 300, canv.height / 2 - 1);
  context.lineTo(canv.width / 2 + 300, canv.height / 2 - 1);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.moveTo(canv.width / 2 - 1, canv.height / 2 - 300);
  context.lineTo(canv.width / 2 - 1, canv.height / 2 + 300);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.moveTo(canv.width / 2 + 300, canv.height / 2 - 1);
  context.lineTo(canv.width / 2 + 290, canv.height / 2 + 9);
  context.moveTo(canv.width / 2 + 300, canv.height / 2 - 1);
  context.lineTo(canv.width / 2 + 290, canv.height / 2 - 11);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.moveTo(canv.width / 2 - 1, canv.height / 2 - 300);
  context.lineTo(canv.width / 2 - 11, canv.height / 2 - 290);
  context.moveTo(canv.width / 2 - 1, canv.height / 2 - 300);
  context.lineTo(canv.width / 2 + 9, canv.height / 2 - 290);
  context.stroke();
  context.closePath();

  drawText();
};

drawChart();

let dx = undefined;
let dy = undefined;
let cx = undefined;
let cy = undefined;

const drawAngle = (angle, xValue, yValue) => {
  let cathetus1 = 200 * Math.sin((-angle * Math.PI) / 180);
  let cathetus2 = Math.sqrt(200 * 200 - cathetus1 * cathetus1);
  let coords = {
    x: cathetus2,
    y: cathetus1,
  };
  if (angle > 90 && angle < 270) {
    coords.x = -coords.x;
  }

  context.beginPath();
  context.moveTo(canv.width / 2, canv.height / 2);
  context.lineTo(canv.width / 2 + coords.x, canv.height / 2 + coords.y);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.moveTo(canv.width / 2 + coords.x, canv.height / 2 + coords.y);
  context.lineTo(canv.width / 2 + coords.x, canv.height / 2);
  context.stroke();
  context.closePath();

  if (a === null) {
    a = Math.round(angle);
    context.beginPath();
    if (xValue > 0 && yValue > 0) {
      dx = coords.x + canv.width / 2 + 20;
      dy = coords.y + canv.height / 2 + -20;
    } else if (xValue < 0 && yValue > 0) {
      dx = coords.x + canv.width / 2 + -50;
      dy = coords.y + canv.height / 2 + -20;
    } else if (xValue < 0 && yValue < 0) {
      dx = coords.x + canv.width / 2 + -50;
      dy = coords.y + canv.height / 2 + 20;
    } else if (xValue > 0 && yValue < 0) {
      dx = coords.x + canv.width / 2 + 20;
      dy = coords.y + canv.height / 2 + 20;
    }
    cx = coords.x;
    cy = coords.y;
  }
  context.fillStyle = "red";
  context.beginPath();
  context.arc(cx + canv.width / 2, cy + canv.height / 2, 5, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "white";
  context.beginPath();
  context.fillText(a ? a + "°" : "", dx, dy);
};

const changeChart = (e) => {
  context.clearRect(0, 0, canv.width, canv.height);
  drawChart();
  drawText();
  context.beginPath();
  let xValue = Math.round(e.pageX - canv.width / 2 + 1);
  let yValue = Math.round(canv.height / 2 - 1 - e.pageY);
  let angle = ((180 * Math.atan2(yValue, xValue)) / Math.PI).toFixed(4);

  if ((xValue < 0 && yValue < 0) || yValue < 0) {
    angle = (360 + +angle).toFixed(4);
  }

  context.fillText(xValue, 125, 50);
  context.fillText(yValue, 125, 80);
  context.fillText(angle, 160, 110);
  context.fillText(((angle * Math.PI) / 180).toFixed(4), 160, 140);
  context.closePath();

  // create angle
  drawAngle(angle, xValue, yValue);

  if (!angleForDraw) {
    drawAngle(a, xValue, yValue);
    context.fill();
  }
};

const clickDrawAngle = (e) => {
  angleForDraw = null;
  a = null;
  changeChart(e);
};

const rightClick = (e) => {
  e.preventDefault();
  angleForDraw = true;
  a = "";
  cx = cy = undefined;
  changeChart(e);
};

document.addEventListener("mousemove", changeChart);
document.addEventListener("click", clickDrawAngle);
document.addEventListener("contextmenu", rightClick);
