const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvaswidth = canvas.width = 200;
const canvasheight = canvas.height = 200;
const imgwid=920/3;
const imghei=1158/3;
let imgr=0;
let imgc=2;
let gameframe=0;
const fps=7;


const stickman = new Image();
stickman.src = "s2.png";

stickman.onload = function() {
    window.addEventListener("keydown",mov);
    animate();

};



function animate() {
    ctx.clearRect(0, 0, canvaswidth, canvasheight);
    ctx.drawImage(stickman,(imgr*imgwid)-7,(imgc*imghei)+30,imgwid,imghei,0,0,canvaswidth,(canvasheight+20));
    if(gameframe % fps ==0){
    if(imgr<2) imgr++;
    else imgr=0;
    }
    gameframe++;
    requestAnimationFrame(animate);  
}
 function mov(e){
    if(e.key==="ArrowUp" || e.key===" "){
        canvas.style.transform="translateY(-200px) ";
        canvas.style.transition = "transform 0.5s ease";
        imgc=0;
    }
    else if(e.key==="ArrowDown"){
        imgc=1;
    }
    setTimeout(() => {
  if(imgc==1) imgc=2
}, 500);
 setTimeout(() => {
  if(imgc==0){
    imgc=2;
    canvas.style.transform="translateY(0px)";
  } 
}, 700);
}
