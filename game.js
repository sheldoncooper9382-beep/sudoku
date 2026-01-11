var RowAndColumnNumber=9;
let mat =  [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0]
];
/*StartBoard();
if(StartBoard()){
  console.log(mat)
};*/
let solution = [
    [3,8,7,4,9,1,6,2,5],
    [2,4,1,5,6,8,3,7,9],
    [5,6,9,3,2,7,4,1,8],
    [7,5,8,6,1,9,2,3,4],
    [1,2,3,7,8,4,5,9,6],
    [4,9,6,2,5,3,1,8,7],
    [9,3,4,1,7,6,8,5,2],
    [6,7,5,8,3,2,9,4,1],
    [8,1,2,9,4,5,7,6,3]
 ]
const solution1=[
  [3,8,7,4,9,1,6,2,5],
  [2,4,1,5,6,8,3,7,9],
  [5,6,9,3,2,7,4,1,8],
  [7,5,8,6,1,9,2,3,4],
  [1,2,3,7,8,4,5,9,6],
  [4,9,6,2,5,3,1,8,7],
  [9,3,4,1,7,6,8,5,2],
  [6,7,5,8,3,2,9,4,1],
  [8,1,2,9,4,5,7,6,3]
];
let board1 = solution1;
let board2 = solution1;
let board3 = solution1;
var timer;
var timeRemaining;
var selectedNum;
var para = new URLSearchParams(window.location.search);//חילוץ השלב הנבחר משורת הURL
var level = para.get("Level");
var boardLevel ;
var counterFailed =3;

if(level=="board1"){
  boardLevel = board1;
}else if(level=="board2"){
  boardLevel = board2;
}else{
  boardLevel = board3;
}

 window.onload = function() {
  cleanBoardByLevel();
  setGame();   
}
function setGame(){
 startTimer();
 for(let i=0; i<9 ;i++){
     for(let j=0; j<9; j++){
       let newInput = document.createElement("input")
       newInput.id=i.toString()+"-"+j.toString() //"0-0" 
       newInput.classList.add("cube");
       if(boardLevel[i][j]==0){//כNUMBER להגדיר רק את הקוביות המלאות 
        newInput.type="number";
        newInput.maxLength="1"
        newInput.max="9"
        newInput.min="1"
       }
      // newInput.onkeypress="check()";
       newInput.onkeydown="check()";
       document.getElementById("digits").appendChild(newInput)

       if(boardLevel[i][j]!=0){
        newInput.value= boardLevel[i][j]
        newInput.classList.add("cube_start");
        newInput.disabled="false";
       }else{
        newInput.value=null
       }
       if(i==2||i==5){
        newInput.classList.add("horizontal-line");
       }
       if(j==2||j==5){
        newInput.classList.add("vertical-line");
       }

     }
 }

}

function cleanBoardByLevel(){//ניקוי הלוח בהתאם לשלב
  let counter=0;
  
  if(level=="board1"){
    counter=20;
  }else if(level=="board2"){
    counter=40;
  }else{
    counter=60;
  }

  while(counter!=0){
    let rowRandom = Math.floor(Math.random() * (10-1))  ;//הגרלת מספרים בין 0 ל 8
    let colRandom = Math.floor(Math.random() * (10-1))  ;
    
    if(boardLevel[rowRandom][colRandom]!=""){
      boardLevel[rowRandom][colRandom]=""
      counter--;
    }

  }
}
function finishBoard(){
  let index;
  let mistakeCounter= 0 ; 
  console.log(solution)
  for(let i=0; i<9; i++){
    for(let j=0; j<9; j++){
      if(boardLevel[i][j]==0){
        index=i.toString()+"-"+j.toString()
        if(document.getElementById(index).value!=""){
          if(parseInt(document.getElementById(index).value)!=solution[i][j]){
            mistakeCounter++
          }
        }else{
          alert("Complete Board!")
          return 0;
        }
      }
    }
  }
  if(mistakeCounter>0){
    document.getElementById("msg").textContent+="You failed "
    document.getElementById("counterWrong").textContent+=`Num of mistakes is: ${mistakeCounter} You have only ${--counterFailed} attempts `
    counterFailed
    if(counterFailed<=0){
      GameOver();
    }
  }
  else{
    alert(`Great!`)
  if(alert){
    window.open("levelPage.html")
  }
  }

}
function GameOver(){
  alert(`GameOver : Fails three times in a row`)
  if(alert){
    window.open("levelPage.html")
  }
}
function restartBoard(){

  for(let i=0; i<9 ;i++){
    for(let j=0; j<9; j++){

     let index = i.toString()+"-"+j.toString() ;//"index cube "
     if(board1[i][j]==0){
      document.getElementById(index).value=" "
     }else{
      document.getElementById(index).value=board1[i][j]
     }
    
    }
  }

}
function StartBoard(){

  if(validMat(0,0)){
    return true;
  }
  else return false;
  /*for(let i=0; i<RowAndColumnNumber; i++){
    arrNumbers =[1,2,3,4,5,6,7,8,9]
    for(let j=0; j<RowAndColumnNumber; j++){
      validnum(i,j);
     
    }
  }*/
}
function validMat(row,col){
  let bool=true;
 
  if (row < RowAndColumnNumber && col < RowAndColumnNumber){
    for (let i = 0; i < RowAndColumnNumber; ++i){

     //while(bool==true){//ללולאת הרצה עד שמוצאת מספר תקין ומכניסה ללוח
       let rand = Math.floor(Math.random() * (10-1))+1;//הגרלת מספר בין 1 ל9

       if(findInRow(rand,row) && findInCol(rand,col) && findInCube(rand,row,col)){//שליחה לפונקציה שבודקת האם המספר לא קיים בשורה בעמודה ובקוביה
         mat[row][col]=rand
        // bool=false;
         if ((col + 1) < 9){
            //רקורסיה
           if (validMat(row, col+1)) return true;
           else mat[row, col] = 0;
          }
         else if ((row + 1) <9)
          {
            //רקורסיה
           if (validMat(row + 1, 0)) return true;
           else mat[row, col] = 0;
          }
         else return true;
        //console.log(arrNumbers);
        } 
        return false;
     // }
    }
  }
  else return true
};
function findInRow(rand,row){
  for(let col=0; col<9; col++){
      if(mat[row][col]==rand){
        return false;
      }
  }
  return true;
}
function findInCol(rand,col){
  for(let row=0; row<9; row++){
      if(mat[row][col]==rand){
        return false;
      }
  }
  return true;
}
function findInCube(rand,row,col){

 let indexRow =Math.floor(row/3)*3
 let indexCol =Math.floor(col/3)*3

 for(let i=indexRow; i<=indexRow+2; i++){
   for(let j=indexCol; j<=indexCol+2; j++){
     if(mat[i][j]==rand){
      return false;
     }
   }
 }
 return true;
}
function startTimer(){
 
  //set time 
  if(level=="board1"){
    timeRemaining = 180;
  } else if (level=="board2"){
    timeRemaining = 300;
  } else {timeRemaining = 600};

  document.getElementById("timer").textContent = timeConversion(timeRemaining);
  //
  timer= setInterval(function(){
      timeRemaining--;
      //
      if(timeRemaining === 0){
        document.getElementById("timer").textContent = timeConversion(timeRemaining);
        myStopFunction();
      }
      document.getElementById("timer").textContent = timeConversion(timeRemaining);
  }, 1000)
}
function timeConversion(time){
  let minutes = Math.floor(time /60);
  if(minutes <10) minutes = "0" + minutes;
  let seconds = time % 60;
  if(seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;

}
function myStopFunction() {
  clearInterval(timer);
  alert(`GameOver : time's over`)
  if(alert){
    window.open("levelPage.html")
  }
}