let localRound = 0;
let currentRound = 1;
document.getElementById("gameScreenText").innerHTML = "Welcome to the game! Press roll below to see who will go first!";
// document.getElementById("gameScreen").innerHTML = "Computer Score: " + computerScore + " <br /> User Score: " + userScore + " <br /> ";
document.getElementById("rollButton").onclick = function(){ startGame(); }

function startGame(){

	let userInput;
	let test;
	let firstRoll;

	test = initialRoll();

	if(test == true){

		document.getElementById("gameScreenText").innerHTML = "The computer won the roll and will begin the first round." 
		+ "<br /> Press begin to start the game.";
		
		firstRoll = 1;
	}

	else{

		document.getElementById("gameScreenText").innerHTML = "You won the roll and will begin the first round."
		+ "<br /> Press begin to start the game.";
		
		firstRoll = 2;
	}

	document.getElementById("beginButton").onclick = function(){ storeValue(1, firstRoll, 0, 0); }
	document.getElementById("rollButton").onclick = function(){};
} 

function beginRound(storeValue, whoStart){

	let computerAnswer = [];
	let yourAnswer = [];
	let isCorrectComputer;
	let isCorrectUser;

	if(localRound == 0){
		
		 localRound++;

		do{
			if(whoStart % 2 != 0){

				for(let i = 0; i < storeValue.numDice; i++ ){
					
					computerAnswer[i] = rollDice(storeValue.numSides);

				}
				isCorrectComputer = compareDice(storeValue,computerAnswer, whoStart);

			}
			else{
				for(let i = 0; i < storeValue.numDice; i++ ){
					
					yourAnswer[i] = rollDice(storeValue.numSides);

				}
				isCorrectUser = compareDice(storeValue,yourAnswer, whoStart);

			}
			whoStart++;
		} while(isCorrectUser != true && isCorrectComputer != true);
	}
	whoStart -= 1;
}

function compareDice(storeValue, potential, whoStart){

	let check = 0;
	let isCorrect;
	let doubleDown;
	let userInput;

	potential.sort(function(a,b){return a-b});

	if(whoStart % 2 != 0){
	
		for(let i = 0; i < storeValue.correct.length; i++){

			if(potential[i] == storeValue.correct[i]){

				check++;

			}
			else{return false;}
		}

		if(storeValue.ddNum == currentRound){

			currentRound++;

			if(check == storeValue.numDice){

				doubleDown = rollDice(3);

				if(storeValue.userScore > storeValue.computerScore && storeValue.numRound == 6){
					//if the computer is losing in round six and wins the roll, it will always choose to double down
					doubleDown = 1;
				}
				if(doubleDown == 1){

					document.getElementById("gameScreenText").innerHTML = "The computer won the round with " + potential 
					+ " and decided to try his luck on a double down!";
					storeValue.buttonNum++;
					beginRound(storeValue,whoStart);
				}
				else{

					document.getElementById("gameScreenText").innerHTML = "The computer won the round with " + potential 
					+ " and decided to keep his points and begin the next round. Press begin to start.";
					scoreKeeper(storeValue.score, 1, storeValue);
					storeValue.buttonNum++;
					localRound++;
					buttons(storeValue, whoStart);
					
					return true;
				}
				
			}
		}
		else{

			document.getElementById("gameScreenText2").innerHTML = "The computer has won the double down round!" 
			+ "<br /> Press begin to start the next round";
			scoreKeeper(storeValue.doubleScore,1, storeValue);
			document.getElementById("rollButton").onclick = function(){};
			storeValue.buttonNum++;
			buttons(storeValue, whoStart);

			return true;
		}
	}
	else{

		for(let i = 0; i < storeValue.correct.length; i++){

			if(potential[i] == storeValue.correct[i]){

				check++;

			}
			else{return false;}
		}

		if(storeValue.ddNum == currentRound){
			currentRound++;
			if(check == storeValue.numDice){
				document.getElementById("gameScreenText").innerHTML = "You won the round with " + potential + "! Would you like to try the double down round? " 
				+ "<br /> Press roll to play or begin to start the next round.";

				buttons(storeValue, whoStart);
				return true;
			}
		}
		else{
			
			document.getElementById("gameScreenText2").innerHTML = "You won the double down round!" 
			+ "<br /> Press begin to start the next round";
			scoreKeeper(storeValue.doubleScore, 2, storeValue);
			document.getElementById("rollButton").onclick = function(){};
			buttons(storeValue, whoStart);

			return true;
		}
	}
}

function storeValue(roundNum, whoStart, userScore, computerScore){

	switch(roundNum){

		case 1:

			document.getElementById("whichRound").innerHTML = "ROUND 1";
			document.getElementById("roundRules").innerHTML = "The goal of round 1 is to get a straight of 1,2,3,4. You will be playing with four 4-sided dice.";

			let round1 = {
				numSides: 4,
				numDice: 4,
				correct: [1,2,3,4],
				userScore: userScore,
				computerScore: computerScore,
				roundNum: 2,
				ddNum: 1,
				score: 100,
				doubleScore: 200,
				buttonNum: 1,

			}
			beginRound(round1, whoStart);
			break;

		case 2:

			document.getElementById("whichRound").innerHTML = "ROUND 2";
			document.getElementById("roundRules").innerHTML = "The goal of round 2 is to get a full house threes over twos (2,2,3,3,3). You will be playing with five 6-sided dice.";

			let round2 = {
				numSides: 6,
				numDice: 5,
				correct: [2,2,3,3,3],
				userScore: userScore,
				computerScore: computerScore,
				roundNum: 3,
				ddNum: 2,
				score: 200,
				doubleScore: 400,
				buttonNum: 2,

			}
			beginRound(round2, whoStart);
			break;

		case 3:
			document.getElementById("whichRound").innerHTML = "ROUND 3";
			document.getElementById("roundRules").innerHTML = "The goal of round 3 is to get three-of-a-kind of ones and eights (1,1,1,8,8,8). You will be playing with six 8-sided dice.";

			let round3 = {
				numSides: 8,
				numDice: 6,
				correct: [1,1,1,8,8,8],
				userScore: userScore,
				computerScore: computerScore,
				roundNum: 4,
				ddNum: 3,
				score: 300,
				doubleScore: 600,
				buttonNum: 3,

			}
			beginRound(round3, whoStart);
			break;

		case 4:
			document.getElementById("whichRound").innerHTML = "ROUND 4";
			document.getElementById("roundRules").innerHTML = "The goal of round 4 is to get a straight of 2 through 7 and a single 10. You will be playing with seven 10-sided dice.";

			let round4 = {
				numSides: 10,
				numDice: 7,
				correct: [2,3,4,5,6,7,10],
				userScore: userScore,
				computerScore: computerScore,
				roundNum: 5,
				ddNum: 4,
				score: 400,
				doubleScore: 800,
				buttonNum: 4,
			}
			beginRound(round4, whoStart);
			break;

		case 5:
			document.getElementById("whichRound").innerHTML = "ROUND 5";
			document.getElementById("roundRules").innerHTML = "The goal of round 5 is to get four of a kind of 12s. You will be playing with four 12-sided dice.";

			let round5 = {
				numSides: 12,
				numDice: 4,
				correct: [12,12,12,12],
				userScore: userScore,
				computerScore: computerScore,
				roundNum: 6,
				ddNum: 5,
				scor: 500,
				doubleScore: 1000,
				buttonNum: 5,

			}
			beginRound(round5, whoStart);
			break;

		case 6:
			document.getElementById("whichRound").innerHTML = "ROUND 6";
			document.getElementById("roundRules").innerHTML = "The goal of round 6 is to get a single 20. You will be playing with one 20-sided dice.";

			let round6 = {
				numSides: 20,
				numDice: 1,
				correct: [20],
				userScore: userScore,
				computerScore: computerScore,
				roundNum: 6,
				ddNum: 6,
				scor: 600,
				doubleScore: 1200,
				buttonNum: 6,

			}
			beginRound(round6, whoStart);
			break;

		default:

			break;


	}

}

function rollDice(numberOfSides){

		let yourRoll = Math.ceil(Math.random() * numberOfSides);
		return yourRoll;		 
}

function scoreKeeper(scoreUpdate, whichScore, storeValue){

	if(whichScore == 1){

		storeValue.computerScore += scoreUpdate
		document.getElementById("gameScreen").innerHTML = "Computer Score: " + storeValue.computerScore + " <br /> User Score: " + storeValue.userScore + "<br /> ";

		// return computerScore;
	}
	else if(whichScore == 2){

		storeValue.userScore +=scoreUpdate;
		document.getElementById("gameScreen").innerHTML = "Computer Score: " + storeValue.computerScore + " <br /> User Score: " + storeValue.userScore + "<br /> ";
		// return userScore;
	}	
}

function initialRoll(){


		let initialUserThrow = rollDice(6);
		let initialPCThrow = rollDice(6);

		if(initialPCThrow > initialUserThrow){
			return true;
		}
		else{
			return false;
		}
}

function buttons(storeValueNums, whoStart){

	switch (storeValueNums.ddNum){

		case 1:
			if(storeValueNums.buttonNum < storeValueNums.roundNum){
				document.getElementById("rollButton").onclick = function(){storeValueNums.buttonNum++; localRound = 0; beginRound(storeValueNums, whoStart);}
				document.getElementById("beginButton").onclick = function(){ scoreKeeper(storeValueNums.score, 2, storeValueNums); storeValue(storeValueNums.roundNum, whoStart, storeValueNums.userScore, storeValueNums.computerScore);}
			}
			else{
				document.getElementById("beginButton").onclick = function(){localRound = 0; storeValue(storeValueNums.roundNum, whoStart,storeValueNums.userScore, storeValueNums.computerScore);}
				document.getElementById("rollButton").onclick = function(){};
			}

			break;

		case 2:
			if(storeValueNums.buttonNum < storeValueNums.roundNum){
				document.getElementById("rollButton").onclick = function(){storeValueNums.buttonNum++; localRound = 0; beginRound(storeValueNums, whoStart);}
				document.getElementById("beginButton").onclick = function(){ scoreKeeper(storeValueNums.score, 2, storeValueNums); storeValue(storeValueNums.roundNum, whoStart, storeValueNums.userScore, storeValueNums.computerScore);}
			}
			else{
				document.getElementById("beginButton").onclick = function(){localRound = 0; storeValue(storeValueNums.roundNum, whoStart,storeValueNums.userScore, storeValueNums.computerScore);}
				document.getElementById("rollButton").onclick = function(){};
			}
			break;

		case 3:
			if(storeValueNums.buttonNum < storeValueNums.roundNum){
				document.getElementById("rollButton").onclick = function(){storeValueNums.buttonNum++; localRound = 0; beginRound(storeValueNums, whoStart);}
				document.getElementById("beginButton").onclick = function(){ scoreKeeper(storeValueNums.score, 2, storeValueNums); storeValue(storeValueNums.roundNum, whoStart, storeValueNums.userScore, storeValueNums.computerScore);}
			}
			else{
				document.getElementById("beginButton").onclick = function(){localRound = 0; storeValue(storeValueNums.roundNum, whoStart,storeValueNums.userScore, storeValueNums.computerScore);}
				document.getElementById("rollButton").onclick = function(){};
			}
			break;

		case 4:
			if(storeValueNums.buttonNum < storeValueNums.roundNum){
				document.getElementById("rollButton").onclick = function(){storeValueNums.buttonNum++; localRound = 0; beginRound(storeValueNums, whoStart);}
				document.getElementById("beginButton").onclick = function(){ scoreKeeper(storeValueNums.score, 2, storeValueNums); storeValue(storeValueNums.roundNum, whoStart, storeValueNums.userScore, storeValueNums.computerScore);}
			}
			else{
				document.getElementById("beginButton").onclick = function(){localRound = 0; storeValue(storeValueNums.roundNum, whoStart,storeValueNums.userScore, storeValueNums.computerScore);}
				document.getElementById("rollButton").onclick = function(){};
			}
			break;

		case 5:
			if(storeValueNums.buttonNum < storeValueNums.roundNum){
				document.getElementById("rollButton").onclick = function(){storeValueNums.buttonNum++; localRound = 0; beginRound(storeValueNums, whoStart);}
				document.getElementById("beginButton").onclick = function(){ scoreKeeper(storeValueNums.score, 2, storeValueNums); storeValue(storeValueNums.roundNum, whoStart, storeValueNums.userScore, storeValueNums.computerScore);}
			}
			else{
				document.getElementById("beginButton").onclick = function(){localRound = 0; storeValue(storeValueNums.roundNum, whoStart,storeValueNums.userScore, storeValueNums.computerScore);}
				document.getElementById("rollButton").onclick = function(){};
			}
			break;

		case 6:
			if(storeValueNums.buttonNum < storeValueNums.roundNum){
				document.getElementById("rollButton").onclick = function(){storeValueNums.buttonNum++; localRound = 0; beginRound(storeValueNums, whoStart);}
				document.getElementById("beginButton").onclick = function(){ scoreKeeper(storeValueNums.score, 2, storeValueNums); storeValue(storeValueNums.roundNum, whoStart, storeValueNums.userScore, storeValueNums.computerScore);}
			}
			else{
				document.getElementById("beginButton").onclick = function(){localRound = 0; storeValue(storeValueNums.roundNum, whoStart,storeValueNums.userScore, storeValueNums.computerScore);}
				document.getElementById("rollButton").onclick = function(){};
			}
			break;


	}
}
