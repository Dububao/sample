
window.onload = function () {
	init();
}

//init page
function init() {
	hideMessage();
	showDiv("menu");
	hideDiv("cachePage");
	hideDiv("reportPage");
	document.getElementById('title').onclick = init;
	document.getElementById('writeReportPage').onclick = toReportPage;
	document.getElementById('clearCachePage').onclick = toCachePage;
	document.getElementById('cacheClear').onclick = clickCacheClearBtn;
	document.getElementById('cacheCancel').onclick = init;
	//document.getElementById('reportPage').innerHTML = "";
}

//redirect to cacheClear Page
function toCachePage() {	
	hideDiv("menu");
	showDiv("cachePage");
	document.getElementById('reportPage').innerHTML = "";
}

//redirect to writeReport page
function toReportPage() {	
	hideDiv("menu");
	showDiv("reportPage");
	document.getElementById('reportPage').innerHTML = "<iframe src='http://myhengtian/Default.aspx' width='900px' height='700px' id='reportFrame'></iframe>";
	
}

function test() {
	try {
	 var obj = document.getElementById("reportFrame").contentWindow;  
	 var ifmObj = obj.document.getElementById("calendar");  
	 console.log(ifmObj);
	} catch (err) {
		showMessage(err);
	}
}

//show div
function showDiv(id) {
	document.getElementById(id).style.display = "block";
}

//hide div
function hideDiv(id) {
	document.getElementById(id).style.display="none";
}

//show message
function showMessage(msg) {
	document.getElementById("msgContent").style.display="block";
	document.getElementById("msg").innerHTML = msg;
}

//hide message
function hideMessage() {
	document.getElementById("msgContent").style.display="none";
	document.getElementById("msg").innerHTML = "";
}

//click cache clear button
function clickCacheClearBtn(id) {
	showMessage("清除浏览数据中...");
	document.getElementById('cacheClear').onclick = "";
	document.getElementById('cacheClear').style.color = "#a9c08c";
	document.getElementById('cacheClear').style.background = "-webkit-gradient(linear, left top, left bottom, from(#4e7d0e), to(#7db72f))";
	var cacheOption = getCheckboxValue("cacheOption");
	var time = getCacheBeginTime();
	var sinceTime = (new Date()).getTime() - time;
	try {
		chrome.browsingData.remove({ "since": sinceTime }, cacheOption , function () {
			showMessage("清除完成");			
		});
	} catch (err){
		showMessage(err);
	} finally{
		document.getElementById('cacheClear').onclick = clickCacheClearBtn;
		document.getElementById('cacheClear').style.color = "#e8f0de";
		document.getElementById('cacheClear').style.background = "-webkit-gradient(linear, left top, left bottom, from(#7db72f), to(#4e7d0e))";
	}
}


//getCheckbox Value
function getCheckboxValue(name) {
	var values = {};
	var arr = document.getElementsByName(name);
	//arr是一个数组，就是所有checkbox的值；
	for(i=0;i<arr.length;i++){
		values[arr[i].value] = arr[i].checked;		
	}
	console.log(values);
	return values;
}

//getCacheBeginTime
function getCacheBeginTime() {
	var obj = document.getElementById("clear-browser-data-time-period");
	var index = obj.selectedIndex; // 选中索引
	var text = obj.options[index].text; // 选中文本
	var value = obj.options[index].value; // 选中值
	var time = 0;
	switch (value) {
		case "0":
			//前一个小时
			time = 1000 * 60 * 60;
			break;
		case "1":
			//前一天
			time = 1000 * 60 * 60 * 24;
			break;
		 case "2":
			//前一周
			time = 1000 * 60 * 60 * 24 * 7;
			break;
		case "3":
			//前一月
			time = 1000 * 60 * 60 * 24 * 7 * 4;
			break;
		case "4":
		   time = 0;
		   break;
		default:
		   time = 0;
	}
	return time;
}

