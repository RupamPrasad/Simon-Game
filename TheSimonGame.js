var c=["red","green","blue","yellow"];
var game_pattern=[];
var userClickedPattern=[];
var level=0;
var start=false;

function playSound(soundColor)
{
    var audio= new Audio("simonSounds/"+soundColor+".mp3");
    audio.play();
}


function pattern()
{
    var randomColor= Math.floor(Math.random()*4);
    $("."+c[randomColor]).fadeOut(100).fadeIn(100);
    playSound(c[randomColor]);
    game_pattern.push(c[randomColor]);
}

function animation(currentColor)
{
    $("."+currentColor).addClass("activeKey");

    setTimeout(function(){
        $("."+currentColor).removeClass("activeKey");    
    },100);
}


function check(Clevel)
{
  
    if(userClickedPattern[Clevel]==game_pattern[Clevel])
    {
        if(userClickedPattern.length==game_pattern.length)
        {
            
            console.log(game_pattern.length+1);
            $("h2").text("LEVEL "+(game_pattern.length+1));
            userClickedPattern=[];
            setTimeout(function(){pattern()},500);
            
        }

    }
    else
    {
        $("h2").text("GAME OVER!!!");

        playSound("wrong");
        
        $("body").addClass("gameover");
        
        setTimeout(function(){
            $("body").removeClass("gameover");    
        },200);
        
        setTimeout(function(){
            $("h2").text("Enter Any Key to Restart");
        },1500);
         game_pattern= [];
         userClickedPattern=[];
         level=0;
         start=false;
    }

   
}


$(document).on('keypress',function(){
    if(!start)
    {
        $("h2").text("LEVEL "+(level+1));
        console.log(level+1);    
        pattern();
        start=true;
    }
});


$("button").on("click",function(){
    console.log(this.classList[0]); 
    userClickedPattern.push(this.classList[0]);
    console.log(game_pattern);
    console.log(userClickedPattern);
    animation(this.classList[0]);
    playSound(this.classList[0]);
    console.log("checking ");
    check(userClickedPattern.length -1);
});