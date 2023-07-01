function getDeviceType(){
	var ua = navigator.userAgent;
	if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)){
		return "mobile";
	}
	return "desktop";
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return "tablet";
	}
	return "desktop";
};
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
var thisDeviceType = getDeviceType();
var isDesktop = (thisDeviceType == "desktop");
var isMobile  = (thisDeviceType == "mobile");
var isTablet  = (thisDeviceType == "tablet");
/*
if( !isDesktop ){
	document.write('<button style="position:absolute;width:100%;height:100%;background-color:#fff;font-size:7vw;">mobile version not suppoerted yet!</button>');
};
*/