const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

const logo = document.getElementById("logo"); // svg image
const circles = logo.querySelectorAll("circle");

const logoWidth = parseInt(logo.getAttribute("width"));
const logoHeight = parseInt(logo.getAttribute("height"));

canvas.width =  logoWidth + 200;
canvas.height = logoHeight + 200;
const offsetX = canvas.offsetLeft;
const offsetY = canvas.offsetTop;

const particles = [];

for(let i = 0; i < circles.length; i++){
  const initX = parseInt(circles[i].getAttribute("cx"));
  const initY = parseInt(circles[i].getAttribute("cy"));
  const initR = parseInt(circles[i].getAttribute("r"));

  const particle = {
    x : initX + 100,
    y : initY,
    x0: initX + 100,
    y0: initY ,
    r: initR,
    o: 1,
    xDelta: 0,
    yDelta: 0,
  };
  particles.push(particle);
}

function drawScene() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  for(let i = 0; i < particles.length; i ++) {
    let particle = particles[i];
    ctx.save();
    if(Math.sqrt(Math.pow(particle.x-particle.x0,2)+Math.pow(particle.y-particle.y0, 2)) > 1){
      particle.x += particle.xDelta / 50;
      particle.y += particle.yDelta / 50;
    }else{
      particle.x = particle.x0;
      particle.y = particle.y0;
    }
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    // ctx.globalAlpha = particle.o;
    ctx.fill();
  }
}

drawScene();

setInterval(drawScene, 1);

function move(e){
  const mouseX = parseInt(e.clientX - offsetX);
  const mouseY = parseInt(e.clientY - offsetY);

  for(let i=0; i < particles.length; i++){
    const xDistance = particles[i].x - mouseX;
    const yDistance = particles[i].y - mouseY;
    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    if (distance < 40) {
      const angle = Math.atan2(yDistance,xDistance);
      particles[i].x += Math.cos(angle) * distance;
      particles[i].y += Math.sin(angle) * distance;

      particles[i].yDelta = particles[i].y0 - particles[i].y;
      particles[i].xDelta = particles[i].x0 - particles[i].x;
    }
  }
}

canvas.addEventListener('mousemove', move, false);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function anima(){
  particles[getRandomInt(0, particles.length)].r = getRandomInt(8, 13);
  // particles[getRandomInt(0, particles.length)].o = getRandomArbitrary(0.6, 1);
  requestAnimationFrame(anima);
}

requestAnimationFrame(anima);



