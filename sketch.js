var ghost;
var ghostImg;
var house;
var lapida;
var portal;

var END = 0;
var PLAY =1;
var gameState = PLAY;
var gameOver,restart;
var distance;


function preload(){
house = loadImage("assets/house.jpg");
ghostImg = loadImage("assets/ghost.png");
gameOver = loadImage("assets/gameOver.png");
lapida = loadImage("assets/lapida.png");
portal = loadImage("assets/portal.png");
}

function setup() {
 createCanvas(1200,300);

 ghost = createSprite(30,170,40,40);
 ghost.addImage("ghost",ghostImg);
 ghost.scale = 0.2;

  ghost.setCollider("rectangle",0,0,40,40);

  gameOver = createSprite(650,150,200,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false; 

  if(keyDown("space")&& ghost.y>270) {
    ghost.velocityY = -16;
}
}
 


function draw() {
    
  background(house);
  house.velocityX = -2;

    textSize(20);
    fill(255);
    text("Distancia: "+ distance,900,30);

    if(gameState===PLAY){
    distance = distance + Math.round(getFrameRate()/50);
    ghost.velocityX = -(6 + 2*distance/150);

    if(house.x < 0 ){
        house.x = width/2;
}
var select_oppPlayer = Math.round(random(1,2));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      lapida();
    } else if (select_oppPlayer == 2) {
      portal();
    } 
}

if(lapida.isTouching(ghost)){
    gameState = END;
    ghost.velocityY = 0;
    
   }
   
   if(portal.isTouching(ghost)){
     gameState = END;
     ghost.velocityY = 0;
    
   }

}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Presiona la flecha hacia arriba para reiniciar el juego", 500,200);
  
    ghost.velocityX = 0;
    ghost.velocityY = 0;
      
    
    
     if(keyDown("UP_ARROW")) {
      reset();
     }

     
}
  drawSprites();
}


function lapida(){
    lapida=createSprite(1100,Math.round(random(50, 250)));
    lapida.scale =0.06;
    lapida.velocityX = -2
    lapida.addAnimation("lapida",lapida);
    lapida.setLifetime=170;
  }


  function portal(){
    portal=createSprite(1100,Math.round(random(50, 250)));
    portal.scale =0.5;
    portal.velocityX = -2
    portal.addAnimation("portal",portal);
    portal.setLifetime=170;
  }
  


function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    ghost.addAnimation("ghost",ghost);

    portal.destroyEach();
    lapida.destroyEach();
    
    distance = 0;
  }


  