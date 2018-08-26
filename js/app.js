	//Whole JS code in 'Strict Mode' syntax.
	'use strict';
	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {
	    let currentIndex = array.length, temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }

	    return array;
	}


	window.onload = function () {
		let openedCards = [];
		let	matchedCards = [];
		let	currentCard = [];
		let	previouseCard = 0;
		let	moveCount = 0;
		let	restart = document.getElementsByClassName ('restart');
		let	modal = document.getElementById('myModal');
		let	span = document.getElementsByClassName('close')[0];
		let	removeStars = 0;

			// console.log (restart); CHECK
			restart[0].addEventListener ('click', function (){
				location.reload();

			})
		// console.log("It's loaded!") CHECK
		const cards = ['fa-diamond','fa-diamond', 'fa-paper-plane-o','fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle',
		 'fa-bomb','fa-bomb' ]; 
		let shuffleCards = shuffle (cards);
		// console.log (shuffleCards); CHECK
		let cardElements = document.getElementsByClassName('symbols');
		// console.log (cardElements); CHECK
		for (let i=0; i < cardElements.length; i++ ) {
			cardElements[i].className = shuffleCards[i]+ ' fa symbols';
		
		}

		// initialising popup 

		function popup() {
	    				modal.style.display = "flex";
	    				document.getElementById('p1').innerHTML = 'You got '+removeStars+ ' moves played '+ moveCount+' completed game in '+seconds+' seconds.';
		}

		// Closing popup by clicking x
		span.onclick = function closeX () {
	    					modal.style.display = "none";
						}

		// function close popup by clicking any where
		window.onclick = function(event) {
	    					if (event.target == modal) {
	        					modal.style.display = "none";
	    					}
						}

		// Stopwatch initialisation
		let stopWatch = document.getElementById ('timer');
		let	time = 0;
		let	seconds=0
		
		// start time
		function startTime () {
			time = setInterval ( function (){
				seconds++;
				stopWatch.innerHTML = seconds + ' s';
			}, 1000); 
		}

		// stop the time function
		function stopTime ()	{
			clearInterval (time);
		}
		
		let displayCards = document.getElementsByClassName ('card');       
			console.log (displayCards);
		let	clickFlag = true;

		// Click Event
		function cardClick () {
			if (!clickFlag) {
				//alert ('Please wait you are clicking too fast'); CHECK
				return;
			}
	 		currentCard = this;
	 		currentCard.removeEventListener ('click', cardClick); 
	 		console.log (currentCard);

	 		

	 		// updating move counts
	 		let countMoves = document.getElementById ('moves');

	 		moveCount++ ;
	 		countMoves.innerHTML= moveCount;
	 		console.log(countMoves);

	 		// star ranking;
	 		if ( moveCount === 20) {
	 			let removeStar = document.getElementById('star3');
				removeStar.style.display = 'none';
				let star2 = document.getElementById('star2');
				star2.style.display = 'inline-block';
				let star1 = document.getElementById('star1');
				star1.style.display = 'inline-block';
	 		} else if (moveCount ===30) {
	 			let removeStar2 = document.getElementById ('star2');
	 			removeStar2.style.display = 'none';
	 			}

	 		removeStars = document.querySelector('.stars').innerHTML;		

	 		// start  stopwatch at the first click.
	 		if ( moveCount ===1) {
	 			startTime ();
	 		}
	 			
	 			currentCard.classList.add('open', 'show');


	 			if (previouseCard) {

	 				clickFlag = false;
	 				// matching cards
	 				if (currentCard.innerHTML === previouseCard.innerHTML) {
	 					currentCard.classList.add('match');
	 					previouseCard.classList.add('match');
	 					matchedCards.push(currentCard,previouseCard);
	 		
	 					// console.log ('match'); CHECK
	 					previouseCard = null ;
	 					
	 					// check if won
	 					if (cards.length === matchedCards.length) {
	 					
	 						// stopping stopwatch 
	 						stopTime();1

	 						// calling popup function 
	 						popup ();
							
	 					}
	 					clickFlag = true;
	 				} else {
	 					// when cards are not matched
	 					setTimeout (function(){

	 						currentCard.classList.remove ('open', 'show');	
	 						previouseCard.classList.remove ('open', 'show');
	 						currentCard.addEventListener ('click', cardClick);
	 						previouseCard.addEventListener ('click', cardClick);
	 						previouseCard = null ;
	 						clickFlag = true;
	 						
	 					}, 500);
	 				
	 				}
	 			

	 			} else {
	 					previouseCard = currentCard ;	
	 					openedCards.push(this);	
	 					clickFlag = true;
	 				}					
	 	} 
	 		
	 		// event listener function 
	 	for (let i=0; i < displayCards.length; i++) {
			displayCards[i].addEventListener('click', cardClick);

		}
		
	 }