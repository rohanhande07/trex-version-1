var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup,cloudImg;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4, obstacle5,obstacle6;
var score;
var gameOver,gameoverImg;
var restart,restartImg;
var PLAY,END,gameState;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(300,100,10,10);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 0.6;
  gameOver.visible = false;
  
  restart = createSprite(300,150,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.6;
  restart.visible = false;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function draw() {
  background(255);
  if (gameState===PLAY){
  if(keyDown("space")&&trex.y>=159) {
    trex.velocityY = -12;
  
  }
      trex.velocityY = trex.velocityY + 0.8;
      ground.velocityX = -(6+Math.round(score*2/100));
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
  score = score+Math.round(getFrameRate()/60);
    spawnClouds();
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
       gameState = END;
       }
  
  }
  else if(gameState===END){
  ground.velocityX = 0;
  trex.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  gameOver.visible = true;
  restart.visible = true;
  }
  if(mousePressedOver(restart)){
  reset();
  }
  drawSprites();
  
  textFont("Georgia");
  textSize(18);
  fill("Black");
  text("Score: "+score,450,80);
  
  trex.collide(invisibleGround);

}
function reset(){
score = 0;
gameState = PLAY;
cloudsGroup.destroyEach();
obstaclesGroup.destroyEach();
gameOver.visible = false;
restart.visible = false;
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
   
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6+Math.round(score*2/100));
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
    case 1: obstacle.addImage(obstacle1);
    break;
    case 2: obstacle.addImage(obstacle2);
    break;
    case 3: obstacle.addImage(obstacle3);
    break;
    case 4: obstacle.addImage(obstacle4);
    break;
    case 5: obstacle.addImage(obstacle5);
    break;
    case 6: obstacle.addImage(obstacle6);
    break;
    default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
