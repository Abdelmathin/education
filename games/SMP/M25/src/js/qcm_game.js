	var min_width_for_choice_button = 0;
	var min_height_for_choice_button = 0;
	var imin_width_for_choice_button = 0;
	imin_width_for_choice_button = document.createElement("button");
	imin_width_for_choice_button.style.width="auto";
	if( isDesktop){
		imin_width_for_choice_button.innerHTML = "Hello Abdelmathin!";		
	}else{
		imin_width_for_choice_button.innerHTML = "Hello Abdelmathin Habachi!";				
	}
	imin_width_for_choice_button.setAttribute("class","invisible_element_"+thisDeviceType);
	document.body.appendChild(imin_width_for_choice_button);
	min_width_for_choice_button = imin_width_for_choice_button.offsetWidth;
	min_height_for_choice_button = imin_width_for_choice_button.offsetHeight;
	document.body.removeChild(imin_width_for_choice_button);


	const window_width  = window.innerWidth  || document.documentElement.clientWidth || document.body.clientWidth;
	const window_height = window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;
	var window_maxmin = window_height;
	if( window_maxmin <window_width ){window_maxmin = window_width;};
	var message = document.createElement("div");

	var this_board_text = "";


	var The_right_options;
	var marked_options=0;

	var QCM;
	var current_window_height;

	var madiv    = document.getElementById("madiv");
	var youwain     = document.getElementById("youwain");
	var timer       = document.getElementById("timer");
	var points      = document.getElementById("points");
	var result_panl = document.getElementById("result_panl");
	var curerntEx   = "";

	var board      = document.getElementById('board');
	var button1    = document.getElementById("choice_1");
	var button2    = document.getElementById("choice_2");
	var button3    = document.getElementById("choice_3");
	var button4    = document.getElementById("choice_4");
	var choices    = document.getElementsByClassName("choice");

	var wait_nextquestion = 0;

	var myTimeout;
	var myTimeout1;
	var is_exercice = 0;
	var isgameover = 0;

	var maximum_time = 30;
	var seconds = maximum_time;

	var i=0;



	function on_wait_question(){
		wait_nextquestion = 1;
		isgameover = 0;
		marked_options=0;
		The_right_options="";
	}
	function on_draw_question(){
		wait_nextquestion = 0;
		isgameover = 0;
	}
		



	function show_game_over_message(){
		clearTimeout(myTimeout);
		clearTimeout(myTimeout1);
		//message.style = "box-shadow: 0px 0px 20px 10px currentColor;border-radius:"+(window_width/27)+"px;background-color:rgba(0,0,0,0.75);position:absolute;width:"+(window_width*0.70)+"px;height:"+(window_height*0.70)+"px;left:15%;top:15%;"
		//message.setAttribute("style","width:90%;height:60%;left:5%;top:50%;transform:translate(5%,50%);box-shadow: 0px 0px 20px 10px currentColor;border-radius:20px;background-color:rgba(0,0,0,0.75);");
		message.setAttribute("style","");
		message.setAttribute("class","game_over_label");
		message.innerHTML="<br><br><br><center><img onclick=\"start_game()\" src=\"src/reboot.png\" style=\"width:"+(window_maxmin*0.07)+"px;\"></center>";
		message.innerHTML=message.innerHTML+"<button class=\"copyright_abdelmathin_"+thisDeviceType+"\">Copyright © abdelmathin 2020</button>";
		document.body.appendChild(message);
	}


	function  hide_choice(that) {
		that.setAttribute("class","hide_choice_"+thisDeviceType);
	}

	function hide_choices(){
		var choice_index;
		for (choice_index = 1; choice_index <= 4; choice_index++) {
			document.getElementById("choice_"+choice_index).setAttribute("class","hide_choice_"+thisDeviceType);
		}
	}

	function set_text(this_button,this_iner){
		if( this_iner == "" ){
			hide_choice(this_button);
		}
		this_button.innerHTML = this_iner;
	}

	function show_choices(c_1,c_2,c_3,c_4,resp,flag,endl){
		board.innerHTML = this_board_text+(QCM[i]);
		if( typeof resp == typeof "resp" ){
			board.innerHTML=QCM[i]+"<br>"+resp;
			this_board_text = QCM[i]+"<br>";
			if( resp == "" ){
				this_board_text = resp;
			}
			resp=1;
		}
		
		if( typeof resp == typeof [1,2] ){
			var iresp = 0;
			for(iresp = 0;iresp<resp.length;iresp++){
				resp[iresp] = arguments[resp[iresp]-1];
			}
		}else{
			resp = [arguments[resp-1]];
		}


		var my_choices    = [c_1,c_2,c_3,c_4];
		
		if( isDesktop ){
			if( flag == 0 ){
				board.innerHTML = (curerntEx+endl);
			}else
			if( flag == 1 ){
				board.innerHTML = (curerntEx+board.innerHTML);
			}
		}
		shuffle(my_choices);
		var iresp = 0;
		for(iresp = 0;iresp<resp.length;iresp++){
			resp[iresp] = document.getElementById("choice_"+(my_choices.indexOf(resp[iresp])+1));
		}
		The_right_options = resp;
		marked_options    = 0;


		set_text(button1,my_choices[0]);
		set_text(button2,my_choices[1]);
		set_text(button3,my_choices[2]);
		set_text(button4,my_choices[3]);


		var choice_index;
		var max_width = 0;
		var max_height = 0;
		var this_button = 0;
		for (choice_index = 1; choice_index <= 4; choice_index++) {
			this_button = document.getElementById("choice_"+choice_index);
			if( this_button.innerHTML != "" ){
				this_button.style.width="auto";
				//this_button.style.height="auto";
				this_button.setAttribute("class","default_style_choice_"+thisDeviceType);
				if( max_width < this_button.offsetWidth ){
					max_width = this_button.offsetWidth
				}
				if( max_height < this_button.offsetHeight ){
					max_height = this_button.offsetHeight
				}
			}
		}
		if( max_width < min_width_for_choice_button ){
			max_width = min_width_for_choice_button;
		}
		if( max_height < min_height_for_choice_button ){
			max_height = min_height_for_choice_button;
		}
		if( ( max_width < window_width*0.45 ) && ( window_width*0.35 < max_width ) ){
			max_width = window_width*0.45;
		}
		for (choice_index = 1; choice_index <= 4; choice_index++) {
			document.getElementById("choice_"+choice_index).style.width=max_width+"px";
			//document.getElementById("choice_"+choice_index).style.height=max_height+"px";
		}
		//alterExistingCSSRuleAttrib(".default_style_choice_"+thisDeviceType, "width", "90%" );
		reset_objects();
	}




	function reset_objects(){
		board.setAttribute("class","board_"+thisDeviceType);
		madiv.setAttribute("class","madiv_"+thisDeviceType);
		points.innerHTML = Number(points.innerHTML)+1;
	}




	function reset(){
		this_board_text = "";
		message.setAttribute("style","position:absolute;left:-2000%;top:-2000%;");
		reset_objects();
		timer.style = "position:absolute;top:0%;left:2%;";
		is_exercice = 0;
		maximum_time = 30;
		seconds = maximum_time;
		i=0;
		isgameover = 0;
		points.innerHTML=-1;
	}


	function gameover(that){
		clearTimeout(myTimeout);
		isgameover = 1;
		var igameover = 0;
		for( igameover = 0; igameover < The_right_options.length; igameover++){
			The_right_options[igameover].setAttribute("class","suggest_choice_"+thisDeviceType);
		}
		seconds = 5000;
		if( that != 0 ){
			that.setAttribute("class","is_false_choice_"+thisDeviceType);			
		}
	}

	function nextquestion(that){
		if( that == 0 ){
			var imchoices = 0;
			for( imchoices = 0; imchoices < The_right_options.length; imchoices++){
				The_right_options[imchoices].setAttribute("class","is_true_choice_"+thisDeviceType);
			}			
		}else{
			// deplacated choices case!
			that.setAttribute("class","is_true_choice_"+thisDeviceType);
		}
		on_wait_question();
		clearTimeout(myTimeout);clearTimeout(myTimeout1);myTimeout1 = setTimeout(run_game,250);
	}
	function multiple_choices_case(that){
		var imchoices = 0;
		for( imchoices = 0; imchoices < The_right_options.length; imchoices++){
			if( The_right_options[imchoices].innerHTML == that.innerHTML ){
				that.setAttribute("class","is_true_m_choice_"+thisDeviceType);
				marked_options+=1;
				if( marked_options == The_right_options.length ){
					return nextquestion(0);
				}
				return that;
			}
		}
		return gameover(that);		
	}
	function function_name(that,argument) {
		if( wait_nextquestion ){
			return 0;
		}
		if( isgameover != 0 ){
			return show_game_over_message();
		}
		if( 1 < (The_right_options.length) ){
			return multiple_choices_case(that);
		}else
		if( (The_right_options.length) == 1 && (The_right_options[0].innerHTML == that.innerHTML) ){
			return nextquestion(that);
		}
		return gameover(that);
	}






	function wait_respose(){
		if( 1000 < seconds ){
			return 0;
		}
		seconds-=1;
		if( seconds <= 0 ){
			timer.innerHTML = "0";
			return gameover(0);
			if( is_exercice == 0 ){
				gameover();
				return 0;
			}else{
				clearTimeout(myTimeout1);myTimeout1 = setTimeout(run_game,1000);
			}
		}else{
			timer.innerHTML = seconds;
			myTimeout = setTimeout(wait_respose,1000);
		}
	}

	function run_game(){
		on_draw_question();
		hide_choices();
		if( QCM[i+1] == "!" ){
			madiv.style="position:absolute;left:-1000%;";
			timer.style="position:absolute;left:-1000%;";
			result_panl.innerHTML="<button onclick=\"start_game()\">restat</button>";
			return 0;
		}
		seconds = maximum_time;
		if( typeof QCM[i+2] == typeof QCM ){
			curerntEx="";
			if( isDesktop ){
				curerntEx = QCM[i+2][0];
				show_choices(QCM[i+2][1],QCM[i+2][2],QCM[i+2][3],QCM[i+2][4],QCM[i+2][5],0,QCM[i+2][6]);
			}else{
				curerntEx = QCM[i+3][0];
				show_choices(QCM[i+3][1],QCM[i+3][2],QCM[i+3][3],QCM[i+3][4],QCM[i+3][5],0,QCM[i+3][6]);
			}
			is_exercice = 1;
		}else{
			timer.innerHTML = seconds;
			is_exercice = 0;
			show_choices(QCM[i+1],QCM[i+2],QCM[i+3],QCM[i+4],QCM[i+5],1,"");
		}

		i+=6;
		if ( QCM[i-5] != "!" ){
			clearTimeout(myTimeout);
			myTimeout = setTimeout(wait_respose,1000);
		};
	};
	function start_game(){
		QCM = QCMS[ Math.floor(Math.random() * QCMS.length) ];
		QCM = QCMS[0];
		reset();
		run_game();
	};
	start_game();



