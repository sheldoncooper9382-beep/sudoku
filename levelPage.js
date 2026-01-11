var myLevel;

function SetLevel(level){

    if (level=="easyLevel"){
      myLevel="board1"
    }else if(level=="mediumLevel"){
      myLevel="board2"
    }else{
      myLevel="board3"
    }
    openGamePage();

}

function openGamePage(){
   window.open("game.html?Level="+myLevel);
}