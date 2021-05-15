var bg,bgImage;

var astronaut, astronautImg; 
var asteroid,asteroidImg, asteroidGrp;
var alien, alienGrp;

var wall1,wall2;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY

var restart, restartImg;


function preload (){
    bgImg = loadImage("spacebg.jpg");

    alien1 = loadImage("alien.png");
    alien2 = loadImage("alien2.png");
    alien3 = loadImage("alien3.png");
  
    astronautImg = loadImage("astronaut.png");
    asteroidImg = loadImage("asteroid.png");

    restartImg = loadImage("restart.png");
}

function setup (){
  createCanvas (900,400);
  
  bg = createSprite(900,200,900,40)
  bg.addImage(bgImg)
  bg.scale = 5
  bg.x = bg.width;
  bg.velocityX = -10;
  bg.depth = bg.depth-100
  
  astronaut = createSprite(100,200,10,10)
  astronaut.addImage(astronautImg);
  astronaut.scale = 0.2
  astronaut.setCollider("rectangle",0,0,60,100);

  wall1 = createSprite(10,10,200,10);
  wall2 = createSprite(10,390,200,10);

  alienGrp = new Group()
  asteroidGrp = new Group();

  restart = createSprite(450,200,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  
}
function draw (){
  background ("lightblue")

  wall1.visible = false;
  wall2.visible = false;
  restart.visible = false;
  
  if (gameState === PLAY){

   score = score + Math.round(getFrameRate()/60);
  
   bg.velocityX = -10
  if (bg.x < 0){
    bg.x = bg.width/2;
  }   
  
  if(keyDown(UP_ARROW)){
    astronaut.y = astronaut.y-10; 
  }

  if(keyDown(DOWN_ARROW)){
    astronaut.y = astronaut.y+10; 
  }

  if(astronaut.isTouching(wall1)){
    astronaut.collide(wall1);
  }
  if(astronaut.isTouching(wall2)){
    astronaut.collide(wall2);
  }
  
  spawnAsteroid ();
  spawnAlien();
  
    
   if (asteroidGrp.isTouching(astronaut)){
     gameState = END;   
   } 

   if (alienGrp.isTouching(astronaut)){
    gameState = END;   
  } 


  }else if (gameState === END){
    restart.visible = true;
    
    bg.velocityX = 0;
    astronaut.velocityY = 0;

    asteroidGrp.setLifetimeEach(-1);
    alienGrp.setLifetimeEach(-1);
    
    asteroidGrp.setVelocityXEach(0);
    alienGrp.setVelocityXEach(0);
    
    if(mousePressedOver(restart)) {
      reset();
    }
       
  } 
  
  drawSprites();

   textSize (20)
   fill ("white");
   text ("Score: " + score,50,50)
}

function spawnAsteroid(){
    
    if(frameCount % 100 === 0){
      asteroid = createSprite(displayWidth,10,20,20)
      asteroid.addImage(asteroidImg);
      asteroid.scale = 0.1
      asteroid.y = Math.round(random(50,350))
      asteroid.velocityX = -10;
      asteroid.lifetime = 1000;

      asteroidGrp.add(asteroid);
    }

  }

  
    function spawnAlien() {
      if(frameCount % 250 === 0) {
        var alien = createSprite(displayWidth,10,10,40);
        alien.y = Math.round(random(50,350))
        alien.velocityX = -10
        
        var rand = Math.round(random(1,3));
        switch(rand) {
          case 1: alien.addImage(alien1);
                  break;
          case 2: alien.addImage(alien2);
                  break;
          case 3: alien.addImage(alien3);
                  break;
        }
                  
        alien.scale = 0.2;
        alien.lifetime = 300;
        alienGrp.add(alien);
      }
    }


function reset(){
  
  gameState = PLAY;
  
  restart.visible = false;
  
  alienGrp.destroyEach();
  asteroidGrp.destroyEach();
  
  score = 0;

}