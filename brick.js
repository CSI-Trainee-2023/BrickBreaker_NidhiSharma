function randomInt(...args) {
  if (args.length === 1) {
    const [n] = args;
    return Math.ceil(Math.random() * n);
  }

  if (args.length === 2) {
    const [start, end] = args;

    if (start > end) throw Error("start value greater than end value");

    return Math.ceil(Math.random() * (end - start)) + start;
  }
}

function random(...args) {
  if (args.length === 1) {
    const [n] = args;
    return Math.random() * n;
  }

  if (args.length === 2) {
    const [start, end] = args;

    if (start > end) throw Error("start value greater than end value");

    return Math.random() * (end - start) + start;
  }
}

const range = function (n, m) {
  if (arguments.length === 1)
    return Array.from({ length: n }).map((_, i) => i);

  if (arguments.length === 2) {
    if (n === m) return [n];
    else if (n < m) {
      return Array.from({ length: m - n + 1 }).map((_, i) => i + n);
    } else {
      return Array.from({ length: n - m + 1 }).map(
        (_, i) => m - i + (n - m)
      );
    }
  }
};

function normalize(n) {
  return n < 0 ? -1 : n > 0 ? 1 : 0;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function between(v, min, max) {
  return min <= v && v <= max;
}

const delay = (n) => new Promise((r) => setTimeout(r, n));

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  mult(n) {
    this.x *= n;
    this.y *= n;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y + this.y);
  }

  get() {
    return new Vector(this.x, this.y);
  }

  normalize() {
    this.x = normalize(this.x);
    this.y = normalize(this.y);
  }

  copy() {
    return new Vector(this.x, this.y);
  }
}

Vector.mult = (v, n) => new Vector(v.x * n, v.y * n);

Vector.div = (v, n) => new Vector(v.x / n, v.y / n);


  //Canvas Library
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = 710;
const height = 607;
const uiOffsetY = 40;

canvas.width = width;
canvas.height = height;


function line(x1, y1, x2, y2, color = "#000") {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function dashLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();
  }

  function fillRect(x, y, w, h, color = "#171717") {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  function circle(x, y, r, color = "#000") {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  function clear() {
    ctx.clearRect(0, 0, width, height);
  }

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

