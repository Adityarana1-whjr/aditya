var cannonImg, cannon; 
var backgroundImg;
var obstacle1,obstacle1Img,obstacle2,obstacle2Img;
var obstacle1Group, obstacle2Group;
var bullet, bulletImg, bulletGroup;
var heart1, heart1Img;
var heart2, heart2Img;

var gameOver, gameOverImg;
var restart, restartIMg
var life=3;
var myScore=0;
var bulletSound;
var PLAY=1;
var END=0;
var GAMESTATE=PLAY;

function preload() {
    cannonImg=loadImage("images/cannon.png")
    backgroundImg=loadImage("images/background.png")
    obstacle1Img=loadImage("images/ball_1.png")
    obstacle2Img=loadImage("images/ball_2.png")
    bulletImg=loadImage("images/bullet.png")
    bulletSound=loadSound("sound/bulletSound.mp3.crdownload")
    heart1Img=loadImage("images/heart.png")
    heart2Img=loadImage("images/heart.png")
    gameOverImg=loadImage("images/gameOver.png")
    restartImg=loadImage("images/restart.png")
}



function setup(){
    createCanvas(1000,800)
    cannon=createSprite(500,720,50,50)
    cannon.addImage("cannon",cannonImg)
    cannon.scale=0.3
    
    heart1=createSprite(50,100,20,20)
    heart1.addImage("heart",heart1Img)
    heart1.scale=0.2

    heart2=createSprite(120,100,20,20)
    heart2.addImage("heart",heart2Img)
    heart2.scale=0.2

    gameOver=createSprite(500,300,100,100)
    gameOver.addImage("gameOver",gameOverImg)
    gameOver.scale=0.6

    restart=createSprite(250,250,100,100)
    //restart.addImage("restart",restartImg)
    restart.scale=0.2
    restart.debug=true

    obstacle1Group=new Group()
    obstacle2Group=new Group()
    bulletGroup=new Group()
}

function draw() {

    background(backgroundImg)
    if(GAMESTATE===PLAY){
        obstacle1ball()
        obstacle2ball()
        
        restart.visible=false;
        gameOver.visible=false;

        if(keyDown("A") || keyDown(LEFT_ARROW)){
            cannon.x=cannon.x-5    
        }

        if(cannon.x<0){
            cannon.x=950  
        }

        if(keyDown("D") || keyDown(RIGHT_ARROW)){
            cannon.x=cannon.x+5  
        }
    
        if(cannon.x>1000){
            cannon.x=10 
        }
    
        if(keyDown("F")){
           myBullet()         
        }

        if(bulletGroup.isTouching(obstacle1Group)){
            myScore=myScore+1
            obstacle1Group.destroyEach()
            bulletGroup.destroyEach()
            bulletSound.play()            
        }
    
        if(bulletGroup.isTouching(obstacle2Group)){
            myScore=myScore+5
            obstacle2Group.destroyEach()
            bulletGroup.destroyEach()
            bulletSound.play()   
        }
    
        if(obstacle1Group.isTouching(cannon)){
            obstacle1Group.destroyEach()
            life=life-1
            if(life===2){
                heart2.visible=false
            }
             if(life===1){
              heart1.visible=false
              GAMESTATE=END
            }
        }
    
        if(obstacle2Group.isTouching(cannon)){
            obstacle2Group.destroyEach()
            life=life-1
            if(life===2){
                heart2.visible=false
            }
              
            if(life===1){
                heart1.visible=false
                GAMESTATE=END                             
            }            
        }
    }

            console.log(GAMESTATE)

    if(GAMESTATE===END){
        restart.visible=true;
        gameOver.visible=true;
          obstacle2Group.destroyEach()
          obstacle1Group.destroyEach()
        if(mousePressedOver(restart)){
           console.log("restart the game") 
       }

        
    }


    drawSprites()
    textSize(30)
  fill("black")
  text("score:"+myScore, 50,50)
  
}

function obstacle1ball(){
    if(frameCount%100===0){
        obstacle1=createSprite(50,50,50,50)
        obstacle1.addImage("obstacle1",obstacle1Img)
        obstacle1.scale=0.2
        obstacle1.velocityY=4
        obstacle1.x=Math.round(random(100,800))
        obstacle1Group.add(obstacle1)
        obstacle1.lifetime=200

    }
    
}

function obstacle2ball(){
    if(frameCount%350===0){
        obstacle2=createSprite(50,50,50,50)
        obstacle2.addImage("obstacle2",obstacle2Img)
        obstacle2.scale=0.4
        obstacle2.velocityY=5
        obstacle2.x=Math.round(random(100,800))
        obstacle2Group.add(obstacle2)
        obstacle2.lifetime=200

    }
    
}

function myBullet(){
    bullet=createSprite(100,100,100,100)
        bullet.addImage("bullet",bulletImg)
        bullet.x=cannon.x
        bullet.y=cannon.y-110
        bullet.scale=0.3
        bullet.velocityY=-5
        bulletGroup.add(bullet)
        bullet.lifetime=200

}
