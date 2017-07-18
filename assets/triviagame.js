//Hide all other screens at the start
$('#gameGUI').hide();
$('#gameOverScreen').hide();

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

function Quizzer(){
	$("#QsDiv").html(QsBank.Q1);
	$("#QsDiv").append(AnsBank.A1[0].delay(3000));
	$("#QsDiv").append(AnsBank.A1[0].fadeIn(500));
	$("#QsDiv").append(AnsBank.A1[1].fadeIn(500));
	$("#QsDiv").append(AnsBank.A1[2].fadeIn(500));
	$("#QsDiv").append(AnsBank.A1[3].fadeIn(500));

}



document.onkeyup = function(event){
		titlepagelock = true;
		$('#titlepage').slideUp(1500);
		$('#gameGUI').delay(1500);
		$('#gameGUI').slideDown(1500);
		Quizzer();
	}


