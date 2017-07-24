//Initialize Game Variables
var ReturnToMain = null;
var PlayAgain = null;
var DumbArr = [];

//Initialize Locks
var titlepagelock = false;
var terminateLock = false;
var chosenCount = null;

//Initialize Counters
var quiz_i=0;
var timeLeft=10;
var TimeClock = null;
var TimeSub = null;
var Oot = null; //Default out of time execution
var liftCounter = 0; //Count number of dumbbells (correct answers) earned

//Hide all other screens at the start, empty dumbbell rack.
$('#GUIRight').empty();
$('#gameGUI').hide();
$('#gameOverScreen').hide();
MainMenu();

	var QsBank = {
		Q1: "Which of the following exercises train the deltoids?",
		Q2: "What do DOMS mean in strength training?",
		Q3: "Where is the Latissimus dorsi located?",
		Q4: "The human body is capable of movement in which three planes of motion?",
		Q5: "What is the largest muscle in the human body?"
	};


	var AnsBank = {
		A1: ["Chest Press", "Squats", "Deadlifts", "Shoulder Press"],
		A2: ["Deadlifts Offer More Swole", "Document Object Model Suite", "Delayed Optimal Muscle Swoleness",
		"Delayed Onset Muscle Soreness" ],
		A3: ["In the back", "In the face", "In the arms", "In the butt"],
		A4: ["Top, Middle, Bottom", "Left, Center, Right", "Coronal, Transverse, Sagittal", "Polar, Radial, Azimuthal"],
		A5: ["Gluteus Maximus", "Pectoralis major", "Biceps brachii", "Rectus abdominis"]
	};

	var AnsKey = {
		AK1: 3,
		AK2: 3,
		AK3: 0,
		AK4: 2,
		AK5: 0
	}

function DumbbellCreate(){
	for(i=0;i<5;i++){
	var dumbbell = $("<img>").attr({src: "assets/dumbbell.png", id:("dumb"+i), class: "gameObjs"});	
	DumbArr.push(dumbbell);
	}
	console.log(DumbArr);
}

function Reinitializer(){
	//Reinitialize Locks
titlepagelock = false;
terminateLock = false;
chosenCount = null;

//Reinitialize Counters
quiz_i=0;
timeLeft=10;
TimeClock = null;
TimeSub = null;
Oot = null; //Default out of time execution
liftCounter = 0; //Number of dumbbells (correct answers) earned = liftCounter - 1
$('#GUIRight').empty();
}

function GameOver(){
	if(liftCounter < 3){
		$("#GameEnd").html("Disgraceful! Get your butt off your chair and start lifting!");
	}
	else if(liftCounter <= 4){
		$("#GameEnd").html("Gettin' swole! You're almost there!");
	}
	else{
		$("#GameEnd").html("Well Done! Your fitness knowledge reigns supreme!");
	}
	$("#GameEnd").append("<br>");
	$("#GameEnd").append("<br>");
	$("#GameEnd").append("<br>");
	$("#GameEnd").append("<span> You answered </span>");
	$("#GameEnd").append($("<span>" + liftCounter + "</span>").attr("class","spacer"));
	$("#GameEnd").append("<span> correctly.</span>");
	$("#GameEnd").append("<br>");
	$("#GameEnd").append("<br>");
	$("#GameEnd").append("<br>");
	ReturnToMain = $("<span>Main Menu</span>").click(function(){
		$('#gameOverScreen').slideUp(1500);
		$('#titlepage').delay(1500);
		$('#titlepage').slideDown(1500);
		Reinitializer();
		MainMenu();
	});
	PlayAgain = $("<span>Try Again</span>").click(function(){
		$('#gameOverScreen').slideUp(1500);
		Reinitializer();
		GameStart();
	});
	$(ReturnToMain).attr("class","selection");
	$(PlayAgain).attr("class","selection");
		$("#GameEnd").append(ReturnToMain);
		$("#GameEnd").append($("<span></span>").attr("class","spacer"));
		$("#GameEnd").append(PlayAgain);
		$('#gameGUI').slideUp(1500);
		$('#gameOverScreen').delay(1500);
		$('#gameOverScreen').slideDown(1500);
}


function TimeReset(){
		clearTimeout(TimeSub);
		clearTimeout(TimeClock);
		clearTimeout(Oot);
		timeLeft=10;
		terminateLock = false;
}

//Interim Page for solutions. Correct page.
function URCorrect(){
	//Print message for correct answer.
	$("#QsDiv").html("That's right!");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("The correct answer is:");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append(choices[chosenCount]);
	//Reinitialize next question after 5-second wait
	quiz_i++;
	liftCounter++;
	$("#GUIRight").append(DumbArr[liftCounter-1]);
	chosenCount = null;
	//Game continues until all questions are exhausted
		if(quiz_i<5){
			setTimeout(Quizzer,5000);
		}
		else{
			setTimeout(GameOver,3000);
		}
}

//Interim Page for solutions. Wrong page.
function URWrong(){
	//Print message for wrong answer.
	$("#QsDiv").html("Wrong!" + "&nbsp" + "&nbsp" + "Give me 10 Push-ups!");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("The correct answer is:");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append(choices[Object.values(AnsKey)[quiz_i]]);
	//Reinitialize next question after 5-second wait
	quiz_i++;
	chosenCount = null;
		if(quiz_i<5){
			setTimeout(Quizzer,5000);
		}
		else{
			setTimeout(GameOver,3000);
		}
}

//Interim Page for solutions. Time's Up page.
function UROutofTime(){
	//Print message for wrong answer.
	$("#QsDiv").html("Time's Up!" + "&nbsp" + "&nbsp" + "Give me a 3-mile run!");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("The correct answer is:");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("<br>");
	$("#QsDiv").append(choices[Object.values(AnsKey)[quiz_i]]);
	//Reinitialize next question after 5-second wait
	quiz_i++;
	chosenCount = null;
		if(quiz_i<5){
			setTimeout(Quizzer,5000);
		}
		else{
			setTimeout(GameOver,3000);
		}
}


// Termination Sequence for each round
function terminateRound(){
	TimeReset();
	switch(quiz_i){

		case 0:
		if(chosenCount === AnsKey.AK1){
			URCorrect();
		}
		else{
			URWrong();
		}
		break

		case 1:
		if(chosenCount === AnsKey.AK2){
			URCorrect();
		}
		else{
			URWrong();
		}
		break

		case 2:
		if(chosenCount === AnsKey.AK3){
			URCorrect();
		}
		else{
			URWrong();
		}
		break
		
		case 3:
		if(chosenCount === AnsKey.AK4){
			URCorrect();
		}
		else{
			URWrong();
		}
		break

		case 4:
		if(chosenCount === AnsKey.AK5){
			URCorrect();
		}
		else{
			URWrong();
		}
		break
	}
}




//Countdown for the timer
function time_Mach(){
	TimeSub = setInterval(function(){timeLeft--;},1000);
	//selected4 is the id for timer
	TimeClock = setInterval(function(){
		if(timeLeft<4){
		$("#selected4").css("color","red");
		$("#selected4").html( "Time Left:  " + timeLeft + "secs");
		}
		else{
			$("#selected4").css("color","black");
			$("#selected4").html( "Time Left:  " + timeLeft + "secs");
			}
		}
		,1000);
	
	
	//Terminate time machine under the following conditions

		// By click
		$("#selected0").click(function(){
		terminateLock=true;
		chosenCount=0;
		terminateRound();
		;});

		$("#selected1").click(function(){
		terminateLock=true;
		chosenCount=1;
		terminateRound();
		;});

		$("#selected2").click(function(){
		terminateLock=true;
		chosenCount=2;
		terminateRound();
		});

		$("#selected3").click(function(){
		terminateLock=true;
		chosenCount=3;
		terminateRound();
		;});

		//By Out of Time
		if(terminateLock === false){
		Oot = setTimeout(function(){
		TimeReset();
		UROutofTime();
		},10000);
		}

}


// Animation for the Quizzer function
function Quizzer_Style(){
	for(i=0;i<choices.length;i++){
	$(choices[i]).attr({class: "selection", id: ("selected"+i)});
	$("#QsDiv").append(choices[i]);
	$("#QsDiv").append("<br>");
	$(choices[i]).hide();
	$(choices[i]).delay(3000 + i*1500);
	$(choices[i]).fadeIn(1000);
	}
	//Wait for 9 seconds before starting display
	choices[choices.length-1].attr({class: "timeDevice", id: "selected4"});
	setTimeout(time_Mach, 9000);

}

function Quizzer(){
	$("#QsDiv").html(Object.values(QsBank)[quiz_i]);
	$("#QsDiv").append("<br>");
	$("#QsDiv").append("<br>");
	var choice1 = $("<div>" + Object.values(AnsBank)[quiz_i][0] + "</div>");
	var choice2 = $("<div>" + Object.values(AnsBank)[quiz_i][1] + "</div>");
	var choice3 = $("<div>" + Object.values(AnsBank)[quiz_i][2] + "</div>");
	var choice4 = $("<div>" + Object.values(AnsBank)[quiz_i][3] + "</div>");
	var timer = $("<div>" + "Time Left:  " + timeLeft + "secs" + "</div>");
	choices = [choice1, choice2, choice3, choice4, timer];
	Quizzer_Style();
}

function GameStart(){
		$('#gameGUI').delay(1500);
		$('#gameGUI').slideDown(1500);
		DumbbellCreate();
		Quizzer();
}

function MainMenu(){
	document.onkeyup = function(event){
		if (titlepagelock === false){
			titlepagelock = true;
			$('#titlepage').slideUp(1500);
			GameStart();
		}
	}

}


