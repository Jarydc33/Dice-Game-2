
document.getElementById("gameScreenText").innerHTML = "Welcome to the game! Press roll below to see who will go first!";
document.getElementById("gameScreen").innerHTML = "Computer Score: " + computerScore + " <br /> User Score: " + userScore + " <br /> ";
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
	let userInput;

	tempScore *= 2;
	if(numRound == 0){
		
		tempScore = 100; numRound++;

		if(buttonNum != 0){
			tempScore = 200;
		}

		do{
			if(whoStart % 2 != 0){

				for(let i = 0; i < numberDice; i++ ){
					
					computerAnswer[i] = rollDice(storeValue.numSides);

				}
				isCorrectComputer = compareDice(storeValue.correct,computerAnswer, whoStart, storeValue.numDice);

			}
			else{
				for(let i = 0; i < numberDice; i++ ){
					
					yourAnswer[i] = rollDice(diceSides);

				}
				isCorrectUser = compareDice(storeValue.correct,yourAnswer, whoStart, storeValue.numDice);

			}
			whoStart++;
		} while(isCorrectUser != true && isCorrectComputer != true);
	}
	whoStart -= 1;

	else{//button click still work in storeValue?
		document.getElementById("beginButton").onclick = function(){if(buttonNum > 1) { buttonNum = 1;} storeValue(storeValue.roundNum, whoStart,storeValue.userScore, storeValue.computerScore);}
		document.getElementById("rollButton").onclick = function(){};
	}

}

function storeValue(roundNum, whoStart, userScore, computerScore){

	switch(roundNum){

		case 1:

			document.getElementById("whichRound").innerHTML = "ROUND 1";
			document.getElementById("roundRules").innerHTML = "The goal of round 1 is to get a straight of 1,2,3,4. You will be playing with four 4-sided dice.";
			document.getElementById("rollButton").onclick = function(){beginRound(round1, whoStart);}
			document.getElementById("beginButton").onclick = function(){ scoreKeeper(tempScore, 2);storeValue(2, whoStart, userScore, computerScore);}

			let round1 = {
				numSides: 4,
				numDice: 4,
				correct: [1,2,3,4],
				userScore: 0,
				computerScore: 0,
				roundNum: 2,

			}
			beginRound(round1, whoStart);

			break;

		case 2:

			document.getElementById("whichRound").innerHTML = "ROUND 2";
			document.getElementById("roundRules").innerHTML = "The goal of round 2 is to get a full house threes over twos (2,2,3,3,3). You will be playing with five 6-sided dice.";
			document.getElementById("rollButton").onclick = function(){beginRound(round2, whoStart);}
			document.getElementById("beginButton").onclick = function(){ scoreKeeper(tempScore, 2);storeValue(3, whoStart, userScore, computerScore);}

			let round2 = {
				numSides: 6,
				numDice: 5,
				correct: [2,2,3,3,3],
				userScore: userScore,
				computerScore: computerScore,
				roundNum: 3,

			}
			beginRound(round2, whoStart);
			break;

		case 3:
			document.getElementById("whichRound").innerHTML = "ROUND 3";
			document.getElementById("roundRules").innerHTML = "The goal of round 3 is to get three-of-a-kind of ones and eights (1,1,1,8,8,8). You will be playing with six 8-sided dice.";
			document.getElementById("rollButton").onclick = function(){beginRound(round3, whoStart);}
			document.getElementById("beginButton").onclick = function(){ scoreKeeper(tempScore, 2);storeValue(4, whoStart, userScore, computerScore);}

			let round3 = {
				numSides: 8,
				numDice: 6,
				correct: [1,1,1,8,8,8],
				userScore: userScore,
				computerScore: computerScore,
				roundNum: 4,

			}
			beginRound(round3, whoStart);
			break;

		case 4:
			document.getElementById("whichRound").innerHTML = "ROUND 4";
			document.getElementById("roundRules").innerHTML = "The goal of round 4 is to get a straight of 2 through 7 and a single 10. You will be playing with seven 10-sided dice.";
			document.getElementById("rollButton").onclick = function(){beginRound(round4, whoStart);}
			document.getElementById("beginButton").onclick = function(){ scoreKeeper(tempScore, 2);storeValue(5, whoStart, userScore, computerScore);}

			let round4 = {
				numSides: 10,
				numDice: 7,
				correct: [2,3,4,5,6,7,10],
				userScore: userScore,
				computerScore: computerScore,
				roundNum: 5,

			}
			beginRound(round4, whoStart);
			break;

		case 5:
			document.getElementById("whichRound").innerHTML = "ROUND 5";
			document.getElementById("roundRules").innerHTML = "The goal of round 5 is to get four of a kind of 12s. You will be playing with four 12-sided dice.";
			document.getElementById("rollButton").onclick = function(){beginRound(round5, whoStart);}
			document.getElementById("beginButton").onclick = function(){ scoreKeeper(tempScore, 2);storeValue(6, whoStart, userScore, computerScore);}

			let round5 = {
				numSides: 12,
				numDice: 4,
				correct: [12,12,12,12],
				userScore: userScore,
				computerScore: computerScore,
				roundNum: 5,

			}
			beginRound(round5, whoStart);
			break;

		case 6:
			document.getElementById("whichRound").innerHTML = "ROUND 6";
			document.getElementById("roundRules").innerHTML = "The goal of round 6 is to get a single 20. You will be playing with one 20-sided dice.";
			document.getElementById("rollButton").onclick = function(){beginRound(round6, whoStart);}
			document.getElementById("beginButton").onclick = function(){ scoreKeeper(tempScore, 2);storeValue(2, whoStart, userScore, computerScore);}

			let round6 = {
				numSides: 20,
				numDice: 1,
				correct: [20],
				userScore: userScore,
				computerScore: computerScore,
				roundNum: 6,

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

function scoreKeeper(scoreUpdate, whichScore){

	if(whichScore == 1){

		computerScore += scoreUpdate
		document.getElementById("gameScreen").innerHTML = "Computer Score: " + computerScore + " <br /> User Score: " + userScore + "<br /> ";

		// return computerScore;
	}
	else if(whichScore == 2){

		userScore +=scoreUpdate;
		document.getElementById("gameScreen").innerHTML = "Computer Score: " + computerScore + " <br /> User Score: " + userScore + "<br /> ";
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