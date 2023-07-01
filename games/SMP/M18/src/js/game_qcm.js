var QCM;
var question_index = 0;
var board    = document.getElementById('board');
/*var figure   = document.getElementById('figure');*/
/*var testdiv  = document.getElementById('testdiv');*/
/*var question = document.getElementById('question');*/
var choice_1 = document.getElementById('choice_1');
var choice_2 = document.getElementById('choice_2');
var choice_3 = document.getElementById('choice_3');
var choice_4 = document.getElementById('choice_4');



function drawQuestion(){
	board.innerHTML = QCM[question_index];
};


function start_game(){
	window.scrollTo({ top: 0});
	QCM = QCMS[ Math.floor(Math.random() * QCMS.length) ];
	QCM = QCMS[0];
	drawQuestion();
};
function restart_again(){
	start_game();
};
function nextquestion(index){
	restart_again();
};