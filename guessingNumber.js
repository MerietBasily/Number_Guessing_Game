/* The Project includes all required features the bonus features of: 
 1- gussing history so players can track their previous input.
2. Leting the players know if the same wrong number is checked again. No 
point should be detucted in this case  
*/
var msg1 = document.getElementById("message1");
var msg2 = document.getElementById("message2");
var ScoreBox = document.getElementById("Score");
var CheckButton = document.getElementById("my_btn");
var ResetButton = document.getElementById("resetbtn");
var InputBox = document.getElementById("guess");
var Image= document.getElementById("image");
var InnerBox= document.getElementsByClassName("babyBox");
var CorrectGuess = Math.floor(Math.random() * 100) + 1;
var GuessHistory = [];
var Score = 10;
var HighScore = 0;
var LastHigh=0;
var CurrentGuess;
ScoreBox.innerHTML = `Score: ${Score} <br> High score: ${HighScore}`;
CheckButton.addEventListener('click', Check);
ResetButton.addEventListener('click', Reset);


function Check() {
  CheckButton.disabled = true;
  CurrentGuess = InputBox.value;
  if (!(CurrentGuess == "" || (isNaN(CurrentGuess)))) {
      var found =false;
      for(i=0;i<GuessHistory.length&&!found;i++){
         if(GuessHistory[i]==CurrentGuess){
           found=true;
         }
         else{};
      }
      if(found)/*This part of the code keeps tarck if the input is repeated and doesn't deduct points if so */
      {
        msg1.innerHTML = 'You have already entered this guess';
      }
      else{
        if ((CurrentGuess < 1 || CurrentGuess > 100)) {
          msg1.innerHTML = 'You can only enter numbers between 1 and 100';
        } else if (CurrentGuess > CorrectGuess) {
          msg1.innerHTML = 'Your guess is too high';
          Score--;
          ScoreBox.innerHTML = `Score: ${Score} <br> High score: ${HighScore}`;
          GuessHistory.push(CurrentGuess)
          UpdateGuessHistory(CurrentGuess); /* Updates Guess history*/
          if(Score==0){
            ChangeState(0);
          }
          else{}
        }
        else if (CurrentGuess < CorrectGuess) {
          msg1.innerHTML = 'Your guess is too low';
          Score--;
          ScoreBox.innerHTML = `Score: ${Score} <br> High score: ${LastHigh}`;
          GuessHistory.push(CurrentGuess);
          UpdateGuessHistory(CurrentGuess); /* Updates Guess history*/
          if(Score==0){
            ChangeState(0);
          }
          else{}
        }
        else if (CorrectGuess == CurrentGuess) {
          ChangeState(1);
        }
      }
    }
   else {
    msg1.innerHTML = 'Invaild Input';
  }

  CheckButton.disabled = false;
}

function Reset() {
  ResetButton.disabled = true;
  GuessHistory = [];
  Score = 10;
  HighScore = 0;
  CorrectGuess = Math.floor(Math.random() * 100) + 1;
  msg1.innerHTML = 'Guess a Number';
  msg2.innerHTML = 'Guess History';
  InputBox.value = "";
  ResetButton.disabled = false;
  ScoreBox.innerHTML = `Score: ${Score} <br> High score: ${HighScore}`;

}

function UpdateGuessHistory(Guess) /* Updates Guess history*/ {
  msg2.innerHTML = msg2.innerHTML + `<br> ${Guess}`
}
function ChangeState(State){
  Image.style.paddingLeft="0";
  InputBox.classList.add("hide");
  InnerBox[0].style.textAlign="center";
  msg1.style.bottom="33%";
  CheckButton.style.bottom="0";
  CheckButton.style.top="25%";
  ResetButton.classList.add("hide");
  document.getElementsByClassName("scoreScreen")[0].classList.add("hide");
  CheckButton.removeEventListener('click', Check);
  CheckButton.addEventListener('click', Again);
if(State==1){
if(Score>LastHigh){
  LastHigh = Score;
}
else{};
  msg1.innerHTML=`<h3>Congratulation</h3> <p>Your guess correct ${CorrectGuess} is my secret number </p> <h4>Your Score:${Score} </h4> <h5>Best:${LastHigh}</h5>`
  CheckButton.innerText="Play Again";
  Image.src="images/youWin.png";
  InnerBox[0].style.backgroundColor="lightgreen";
}
else if (State==0){
  msg1.innerHTML=`<h4>Unfortunately You Lost the Game</h4><p>Don't give up and Try Again. You can win next time.</p><p> My number was: ${CorrectGuess}</p>`
  CheckButton.innerText="Try Again";
  Image.src="images/GameOver.png";
  InnerBox[0].style.backgroundColor="red";

}
else{};
}
function Again(){
  Image.src="images/Man Thinking.png";
  Image.style.paddingLeft="25%";
  InputBox.classList.remove("hide");
  InnerBox[0].style.backgroundColor="lightgrey";
  InnerBox[0].style.textAlign="inherit";
  msg1.style.bottom="52%";
  CheckButton.style.bottom="20%";
  CheckButton.style.top=null;
  CheckButton.innerText="Check";
  ResetButton.classList.remove("hide");
  document.getElementsByClassName("scoreScreen")[0].classList.remove("hide");
  CheckButton.removeEventListener('click', Again);
  CheckButton.addEventListener('click', Check);
  Reset();
  HighScore=LastHigh;
  ScoreBox.innerHTML = `Score: ${Score} <br> High score: ${HighScore}`;
}
