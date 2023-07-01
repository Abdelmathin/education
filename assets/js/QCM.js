// questions : so2al bla ajwiba, khaso itmsa7

function isList(a)
{
	if( a.pop && a.push )
	{
		return 1;
	}
	return 0;
}

function fixQuestions(qts)
{
	var new_questions_list = [];
	for (var i = 0; i < qts.length; i++)
	{
		var a = i+1;
		while( a < qts.length && !(isList(qts[a])) ){a++;};

		var b = i+1;
		var ignore_it = 1;
		while( b < a )
		{
			if( qts[b] )
			{
				ignore_it = 0;
				break;
			}
			b++;
		}
		if( ignore_it )
		{
			i = a;
			continue;
		}
		var c = i + 5 - a;
		b = i;
		while( b < a )
		{
			new_questions_list.push(qts[b]);b++;
		}
		b = 0;
		while( b < c )
		{
			new_questions_list.push("");b++;
		}
		new_questions_list.push(qts[a]);
		i = a;
		continue;
	}
	return new_questions_list;
}

questions = fixQuestions(questions);



var correct_answers = ["","","",""];
		    	var totale_timer_record = 0;
		    	var timer = document.getElementById("timer");
		    	var timer_maxvalue = timer.innerHTML;
		    	var setTimerValue_timer = 0;


	    		var board = document.getElementById("board");
		    	var choices_area = document.getElementById("choices");
		    	var default_choice_button = choices_area.innerHTML;


		    	var current_board_index = 0;

				function shuffle(this_array){
					var currentIndex = this_array.length, temporaryValue, randomIndex;
					// While there remain elements to shuffle...
					while (0 !== currentIndex) {
						// Pick a remaining element...
						randomIndex = Math.floor(Math.random() * currentIndex);
						currentIndex -= 1;
						// And swap it with the current element.
						temporaryValue = this_array[currentIndex];
						this_array[currentIndex] = this_array[randomIndex];
						this_array[randomIndex] = temporaryValue;
					}
					currentIndex=0;
					while(currentIndex<this_array.length){
						if( (this_array[currentIndex] == "") && (currentIndex<(this_array.length-1)) ){
							this_array[currentIndex] = this_array[currentIndex+1];
							this_array[currentIndex+1] = "";
						}
						currentIndex=currentIndex+1;
					}
					return this_array;
				};

		    	function getBoardIndex()
		    	{
		    		if( !board.index )
		    		{
		    			board.index = "0";
		    		}
		    		var board_index = eval(board.index);
		    		if( (!board_index) )
		    		{
		    			board_index = 0;
		    		}
		    		if (questions.length <= board_index)
		    		{
		    			return questions.length;
		    		}
		    		return board_index;
		    	}
		    	function nextQuestion()
		    	{
		    		for (var i = 0; i < correct_answers.length ; i++){correct_answers[i] = "";};

		    		var r = eval(timer.innerHTML);
		    		if( !r )
		    		{
		    			timer.innerHTML = timer_maxvalue;
		    		}
		    		var k = 0;

		    		var board_index = eval(board.index);
		    		if( (!board_index) )
		    		{
		    			board_index = 0;
		    		}
		    		current_board_index = board_index;
		    		if (questions.length <= board_index)
		    		{
		    			current_board_index = questions.length;
		    			return youWain();
		    		}
		    		choices_area.innerHTML = "";
		    		var answers = questions[board_index+5];
		    		if( !answers ){answers = [];};

		    		board.innerHTML = questions[board_index];
		    		document.getElementById("error_board").innerHTML = board.innerHTML;


		    		var new_choices_area_innerHTML_list = ["", "", "", ""];
		    		var new_choices_area_innerHTML = "";
		    		var p = 1;
		    		while( k < 4 )
		    		{
		    			var choice = questions[board_index+k+1];
		    			if( !choice )
		    			{
		    				k+=1;
		    				continue;
		    			}
		    			new_choices_area_innerHTML_list[p-1] = (
							default_choice_button.replace("choice_id", "choice_"+p).replace("answer", choice)
		    				);
		    			k+=1;
		    			p+=1;
		    		}

		    		shuffle(new_choices_area_innerHTML_list);
		    		
		    		for (k = 0; k < new_choices_area_innerHTML_list.length; k++ ) {
		    			new_choices_area_innerHTML+=new_choices_area_innerHTML_list[k]
		    		}
		    		choices_area.innerHTML = new_choices_area_innerHTML;

		    		// 
		    		k = 0;
		    		while( k < 10 )
		    		{
			    		var choice_button = document.getElementById("choice_"+( k ));
			    		if( choice_button )
			    		{
		    				choice_button.setAttribute("onclick", 'youlose(this)');
			    		}
	    				k+=1;
		    		}
		    		//
		    		k = 0;
		    		while( k < answers.length )
		    		{
			    		var choice_button = document.getElementById("choice_"+(answers[k]));		    			
		    			correct_answers[k] = choice_button.innerHTML;
	    				choice_button.removeAttribute("href");
	    				choice_button.setAttribute("onclick", 'gotoNextQuestion(this)');
	    				k+=1;
		    		}
		    		board.index = "" + (board_index+6);
		    	}

		    	function restAll()
		    	{
		    		current_board_index = 0;
		    		clearTimeout(setTimerValue_timer);
		    		totale_timer_record = 0;
		    		timer.innerHTML     = "0";
		    		board.index         = "0";

		    		var close_buttons = document.getElementsByClassName('close');

		    		for (var i = 0; i < close_buttons.length; i++) {
	    				close_buttons[i].setAttribute("onmouseup", 'startGame()');
		    		}
		    	}


		    	function resetTimer()
		    	{
		    		timer.innerHTML = timer_maxvalue;
		    	}



		    	function gotoNextQuestion(self){
		    		self.style.backgroundColor="green";
		    		resetTimer();
		    		setTimeout(nextQuestion,500);
		    	}


		    	function setGameOver(wain)
		    	{
	    			var error_board = document.getElementById('error_board');
	    			var Intro_Title = document.getElementById('Intro_Title');
		    		var percent = (((current_board_index)*1.0/questions.length)*100).toFixed(0);
		    		var mention = "Insuffisant";
		    		if( 90 <= percent)
		    		{
		    			mention = "Excellent";
		    		}else
		    		if( 75 <= percent)
		    		{
		    			mention = "Très bien";
		    		}else
		    		if( 70 <= percent)
		    		{
		    			mention = "Bien";
		    		}else
		    		if( 60 <= percent)
		    		{
		    			mention = "Satisfaisant";
		    		}else
		    		if( 50 <= percent)
		    		{
		    			mention = "Passable";
		    		}

		    		Intro_Title.innerHTML = mention;

		    		if( percent < 1 )
		    		{
			    		error_board.innerHTML = "Vous n'avez répondu correctement à aucune des questions";
		    		}else{
			    		error_board.innerHTML = "Vous avez dépassé " + percent +"% des questions";
			    		// error_board.innerHTML = "Vous avez réussi " + percent +"% des questions";
		    			// error_board.innerHTML = "Vous réussissez " + percent +"% des questions";
		    		}

		    		if( wain )
		    		{
		    			//document.getElementById('correct_answer_title').innerHTML = "totale time :" + totale_timer_record + "Second";
		    		}else
		    		if( !wain )
		    		{
		    			var text = "<ul>";
		    			for (var i = 0; i < correct_answers.length ; i++)
			    		{
			    			if( correct_answers[i] )
			    			{
			    				document.getElementById('correct_answer_title').innerHTML = correct_answers[i] + ":";
			    				// text = text + "<li>"+correct_answers[i]+"</li>";
			    			}
			    		}
			    		text+="</ul>";
			    		document.getElementById('correct_answer').innerHTML = "<center>"+board.innerHTML+"</center>";
		    		}
		    		restAll();
		    		var url = "" + window.location;
		    		window.location =  url.split("#")[0] + "#intro";
		    	}


		    	function youlose(self)
		    	{
		    		self.style.backgroundColor="red";
		    		setGameOver(0);
		    	}

				function youWain()
				{
					document.getElementById('Intro_Title').innerHTML = "Bravo!";
					document.getElementById('error_board').innerHTML = "Vous avez réussi toutes les questions";
		    		setGameOver(1);
				}


		    	function setTimerValue()
		    	{
			    	if( !timer )
			    	{
			    		return 0;
			    	}
			    	var timer_value = eval(timer.innerHTML);
			    	if( !timer_value )
			    	{
			    		clearTimeout(setTimerValue_timer);
			    		setGameOver(0);
			    		return 0;
			    	}
			    	totale_timer_record+=1;

			    	timer.innerHTML = "" + (timer_value-1);
			    	clearTimeout(setTimerValue_timer);
			    	setTimerValue_timer = setTimeout(setTimerValue, 1000);
			    	return 1;
		    	}



		    	function startGame()
		    	{
		    		nextQuestion();
			    	setTimerValue_timer = setTimeout(setTimerValue, 1000);
		    	}
		    	startGame();

