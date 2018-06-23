var searchType = 'mainwarehouse'; // default search Type
var searchId = null;
var connectionStatus = false;
var isExport = false; // Export status
var previousId;
var pageNumber = 1;
var SEARCH = {};
(function() {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState != 4)
			return;

		if (request.status != 200) {
			alert("Error" + request.status);
			return;
		}
		var result = request.responseText.replace("<span>", "").replace(
				"</span>", "");
		SEARCH.PAGE_SIZE = parseInt(result.trim());
		Object.freeze(SEARCH);
		// loadAction(document.getElementById("locationmenu"),'location');
	};
	request.open("GET", "init", true);
	request.send();
})();
function expandList(object) {
	var childList = object.parentNode.getElementsByTagName('ul');
	for (var j = 0; j < childList.length; j++) {
		var currentState = childList[j].style.display;
		if (currentState == "none") {
			childList[j].style.display = "block";
		} else {
			childList[j].style.display = "none";
		}
	}
}
function showBusyMessage(message) {
	var popUp = document.getElementById("temp");
	popUp.innerHTML = message;
	popUp.attributes["class"].value = "pop-up-error";
	setTimeout(function() {
		popUp.attributes["class"].value = "hide";
	}, 5000);
}
var active = "";
function loadAction(currentElement, activeId) {
	active = activeId;
	if (active == "employee") {
		document.getElementById("action-employee").className = "show";
		document.getElementById("search-employee").className = "search-button";
		document.getElementById("search-department").className = "hide";
		document.getElementById("search-company").className = "hide";
		document.getElementById("action-department").className = "hide";
		document.getElementById("action-company").className = "hide";
		document.getElementById("search-Text").className = "show";
		document.getElementById("editDepartment").className = "hide";
		document.getElementById("deleteDepartment").className = "hide";
		document.getElementById("editCompany").className = "hide";
		document.getElementById("deleteCompany").className = "hide";
		document.getElementById("deleteEmployee").className = "hide";
		document.getElementById("editEmployee").className = "hide";

	} else if (active == "department") {
		document.getElementById("action-department").className = "show";
		document.getElementById("search-department").className = "search-button";
		document.getElementById("search-employee").className = "hide";
		document.getElementById("search-company").className = "hide";
		document.getElementById("action-employee").className = "hide";
		document.getElementById("action-company").className = "hide";
		document.getElementById("search-Text").className = "show";
		document.getElementById("editEmployee").className = "hide";
		document.getElementById("deleteEmployee").className = "hide";
		document.getElementById("editCompany").className = "hide";
		document.getElementById("deleteCompany").className = "hide";
		document.getElementById("editDepartment").className = "hide";
		document.getElementById("deleteDepartment").className = "hide";
	} else if (active == "company") {
		document.getElementById("action-company").className = "show";
		document.getElementById("search-company").className = "search-button";
		document.getElementById("search-department").className = "hide";
		document.getElementById("search-employee").className = "hide";
		document.getElementById("action-department").className = "hide";
		document.getElementById("action-employee").className = "hide";
		document.getElementById("search-Text").className = "show";
		document.getElementById("editEmployee").className = "hide";
		document.getElementById("deleteEmployee").className = "hide";
		document.getElementById("editDepartment").className = "hide";
		document.getElementById("deleteDepartment").className = "hide";
		document.getElementById("editCompany").className = "hide";
		document.getElementById("deleteCompany").className = "hide";
	} else {

	}
	document.getElementById("content").innerHTML = "";
	document.getElementById("detail").innerHTML = "";
	document.getElementById("search-result").innerHTML = "";
	var action = document.getElementById("action-menu").getElementsByTagName(
			"li");
	for (var i = 0; i < action.length; i++) {
		action[i].className = "";
	}
	currentElement.className = "action-active";
}
var detailId = false;
function aboutDetail(element, entityType) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("detail").innerHTML = request.responseText;
				document.getElementById("detail-table").className = "show";
				if (entityType == "EMPLOYEE") {
					document.getElementById("employee-detail-table").className = "show";
					document.getElementById("deleteEmployee").className = "show";
					document.getElementById("editEmployee").className = "show";
				} else if (entityType == "COMPANY") {

				} else if (entityType == "DEPARTMENT") {
					document.getElementById("department-detail-table").className = "show";
					document.getElementById("editDepartment").className = "show";
					document.getElementById("deleteDepartment").className = "show";
				}

				else {
				}

				if (detailId) {
					detailId.className = "";
					element.className = "active";
				} else {
					element.className = "active";
				}
				detailId = element;
			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	parameter = {};
	loading();
	console.log(parameter);
	request.open("GET", "detail/" + entityType + "?input="
			+ JSON.stringify(parameter), true);
	request.send();
}
function showMoreEmployee(element) {
	$("#show-more-employee").show(700);
	element.value = "<<";
	element.attributes["onclick"].value = "showLessEmployee(this);";
}
function showLessEmployee(element) {
	$("#show-more-employee").hide(700);
	element.value = ">>";
	element.attributes["onclick"].value = "showMoreEmployee(this);";
}
function showMoreCustomer(element) {
	$("#show-more-customer").show(700);
	element.value = "<<";
	element.attributes["onclick"].value = "showLessCustomer(this);";
}
function showLessCustomer(element) {
	$("#show-more-customer").hide(700);
	element.value = ">>";
	element.attributes["onclick"].value = "showMoreCustomer(this);";
}

function displayPaginationState(size, pageNumber) {
	var pageCount = (Math.ceil(parseInt(size / SEARCH.PAGE_SIZE)) + (size
			% SEARCH.PAGE_SIZE > 0 ? 1 : 0));
	pageNumber = Math.max(Math.min(pageNumber, pageCount), 1);
	document.getElementById("employee-pagination-descriptor").innerHTML = pageNumber
			+ "/" + pageCount;
}
var detailId = false;

function increase() {
	var amount = document.getElementById("transfer-amount").attributes["value"].value;
	amount += 100;
	document.getElementById("transfer-amount").innerHTML = amount;
}
function decrease() {
	var amount = document.getElementById("transfer-amount").attributes["value"].value;
	amount -= 100;
	document.getElementById("transfer-amount").innerHTML = amount;
}

function getAjaxObject() {
	return new XMLHttpRequest();
}
function connectToServer(connection, request) {
	request.open(connection.method, connection.url, true);
	request.send(null);
}
var dayInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
function convertDate(string) {
	var currentDate = new Date;
	if (currentDate.getFullYear() % 4 == 0) { // for leap year
		dayInMonth[1] = 29;
	}
	var date = {};

	if (string.indexOf("-") > 0)
		var splitSt = "-";
	else if (string.indexOf("/") > 0)
		splitStr = "/";
	else
		splitStr = ".";
	var inputDate = string.split(splitStr);
	console.log("Input Date:" + inputDate.length + " " + inputDate[0]);
	if (inputDate.length > 3) {
		date["status"] = false;
		date["error"] = "Invalid date format.";
		return date;
	}
	if (inputDate.length == 1 && inputDate[0] == "") {
		date["status"] = true;
		var currentDate = new Date();
		date["day"] = currentDate.getDate();
		date["month"] = currentDate.getMonth() + 1;
		date["year"] = currentDate.getFullYear();
		date["startDay"] = 1;
		date["endDay"] = dayInMonth[currentDate.getMonth()];
		date["startMonth"] = 1;
		date["endMonth"] = 12;
		date["startYear"] = 1980; // assume this company is found 1980
		date["endYear"] = currentDate.getFullYear();
		return date;
	}
	if (inputDate.length == 1) { // year
		var year = parseInt(inputDate[0]);
		if (isNaN(year)) {
			date["status"] = false;
			date["error"] = "Invalid format.";
			return date;
		}
		if (year < 1) {
			date["status"] = false;
			date["error"] = "Input can\'t be less than one.";
			return date;
		}
		if (year < 32) {
			if (year > dayInMonth[currentDate.getMonth()]) {
				date["status"] = false;
				date["error"] = "Day is this can\'t be greater than "
						+ (dayInMonth[currentDate.getMonth()]);
				return date;
			}
			date["status"] = true;
			date["day"] = year;
			date["month"] = currentDate.getMonth() + 1;
			date["year"] = currentDate.getFullYear();
			date["startDay"] = year;
			date["endDay"] = year;
			date["startMonth"] = date["month"];
			date["endMonth"] = date["month"];
			date["startYear"] = date["year"];
			date["endYear"] = date["year"];
			return date;
		}
		if (year > currentDate.getFullYear()) {
			date["status"] = false;
			date["error"] = "Year can\'t be greater than current year.";
			return date;
		}
		date["status"] = true;
		date["day"] = currentDate.getDate();
		date["month"] = currentDate.getMonth() + 1;
		date["year"] = year;
		date["startDay"] = 1;
		date["endDay"] = dayInMonth[currentDate.getMonth()];
		date["startMonth"] = 1;
		date["endMonth"] = 12;
		date["startYear"] = date["year"];
		date["endYear"] = date["year"];
		return date;
	}
	if (inputDate.length == 2) {
		inputDate[0] = parseInt(inputDate[0]);
		if (isNaN(inputDate[0])) {
			date["status"] = false;
			date["error"] = "Invalid date format.";
			return date;
		}
		inputDate[1] = parseInt(inputDate[1]);
		if (isNaN(inputDate[1])) {
			date["status"] = false;
			date["error"] = "Invalid date format.";
			return date;
		}
		if (inputDate[0] < 1 || inputDate[1] < 1) {
			date["status"] = false;
			date["error"] = "Invalid date format.";
			return date;
		}
		if (inputDate[1] > 12) { // it would be year
			if (inputDate[0] > 12) {
				date["status"] = false;
				date["error"] = "Month can\'t be greater than 12.";
				return date;
			}
			if (inputDate[1] > currentDate.getFullYear()) {
				date["status"] = false;
				date["error"] = "Year can\'t by greater than current year.";
				return date;
			}
			date["status"] = true;
			date["day"] = currentDate.getDate();
			date["month"] = inputDate[0];
			date["year"] = inputDate[1];
			date["startDate"] = 1;
			date["endDate"] = dayInMonth[currentDate.getMonth()];
			date["startMonth"] = date["month"];
			date["endMonth"] = date["month"];
			date["startYear"] = inputDate[1];
			date["endYear"] = inputDate[1];
			return date;
		} else {
			if (inputDate[0] > dayInMonth[currentDate.getMonth()]) {
				date["status"] = false;
				date["error"] = "Day can\'t be greater than "
						+ (dayInMonth[currentDate.getMonth()]);
				return date;
			}
			date["status"] = true;
			date["day"] = inputDate[0];
			date["month"] = inputDate[1];
			date["year"] = currentDate.getFullYear();
			date["startDay"] = inputDate[0];
			date["endDay"] = inputDate[0];
			date["startMonth"] = inputDate[1];
			date["endMonth"] = inputDate[1];
			date["startYear"] = date["year"];
			date["endYear"] = date["year"];
			return date;
		}
	} else {
		inputDate[0] = parseInt(inputDate[0]);
		if (isNaN(inputDate[0])) {
			date["status"] = false;
			date["error"] = "Invalid date format.";
			return date;
		}
		inputDate[1] = parseInt(inputDate[1]);
		if (isNaN(inputDate[1])) {
			date["status"] = false;
			date["error"] = "Invalid date format";
			return date;
		}
		inputDate[2] = parseInt(inputDate[2]);
		if (isNaN(inputDate[2])) {
			date["status"] = false;
			date["error"] = "Invalid date format.";
			return date;
		}
		if (inputDate[0] < 1 || inputDate[1] < 1 || inputDate[2] < 1) {
			date["status"] = false;
			date["error"] = "Input date can\'t be  less than 1.";
			return date;
		}
		if (inputDate[0] > dayInMonth[currentDate.getMonth()]) {
			date["status"] = false;
			date["error"] = "Day can\'t be greater than "
					+ (dayInMonth[currnetDate.getMonth()]);
			return date;
		}
		if (inputDate[1] > 12) {
			date["status"] = false;
			date["error"] = "Month can\'t be greater than 12.";
			return date;
		}
		if (inputDate[2] > currentDate.getFullYear()) {
			date["status"] = false;
			date["error"] = "Year can\'t be greater than current year.";
			return date;
		}
		date["status"] = true;
		date["day"] = inputDate[0];
		date["month"] = inputDate[1];
		date["year"] = inputDate[2];
		date["startDay"] = date["day"];
		date["endDay"] = date["day"];
		date["startMonth"] = date["month"];
		date["endMonth"] = date["month"];
		date["startYear"] = date["year"];
		date["endYear"] = date["year"];
		return date;
	}
}
function showError(message, errorCode) {
	if (errorCode == 0) {
		alert("Can't connect to server. Please restart your application server");
		return;
	}
	alert(message + " error code is :" + errorCode);
}

var tempParameter = "";
function search(element, searchType, entityType) {
	// check is another proccess is still working
	if (connectionStatus) {
		return;
	}

	if (active == "") {
		return;
	}
	if (tempParameter != "" && tempParameter != undefined) {
		var previous = tempParameter.element;
		previous.className = "";
	}
	var parameter = {};
	parameter["searchType"] = searchType;
	parameter["value"] = document.getElementById("search-text").value.trim();
	var trimtext = document.getElementById("search-text").value.trim();
	if (typeof pageNumber === 'undefined')
		pageNumber = 1;
	parameter["pageNumber"] = pageNumber.toString();
	parameter["pageSize"] = SEARCH.PAGE_SIZE.toString();
	parameter.entityType = entityType;
	parameter.element = element;
	element.className = "search-active";
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState != 4)
			return;
		if (request.status != 200) {
			alert("Error return " + request.status);
			return;
		}
		hideLoading();
		element.className = "search-active";
		document.getElementById("content").innerHTML = request.responseText;
		document.getElementById("search-text").value = parameter["value"];
	}
	tempParameter = parameter;
	loading();
	console.log(parameter);
	request.open("GET", "search/" + entityType + "?input="
			+ JSON.stringify(parameter), true);
	connectionStatus = true; // working
	request.send();
}

function searchFirst() {
	search("", tempParameter.searchType, tempParameter.entityType, 1);
}
function searchEnd() {
	var endPage = Math.ceil(document.getElementById("search-total").innerHTML
			/ SEARCH.PAGE_SIZE);
	search("", tempParameter.searchType, tempParameter.entityType, endPage);
}
function searchPrevious() {
	tempParameter.pageNumber = Math.max(2, tempParameter.pageNumber);
	search("", tempParameter.searchType, tempParameter.entityType,
			tempParameter.pageNumber - 1);
}
function searchNext() {
	var endPage = Math.ceil(document.getElementById("search-total").innerHTML
			/ SEARCH.PAGE_SIZE) - 1;
	tempParameter.pageNumber = Math.min(endPage, tempParameter.pageNumber);
	search("", tempParameter.searchType, tempParameter.entityType,
			parseInt(tempParameter.pageNumber) + 1);
}

function getEmployeeData() {
	var employList = document.getElementById("route-employee-list");
	var index = employList.selectedIndex;
	var boId = employList.value;
	var name = employList.options[index].innerHTML;
	var employeediv = document.getElementById("route-employee");
	var empSpan = document.createElement('span');
	empSpan.id = boId;
	empSpan.innerHTML = name;
	employeediv.appendChild(empSpan);

}

function loading() {
	var opts = {
		lines : 8, // The number of lines to draw
		length : 20, // The length of each line
		width : 5, // The line thickness
		radius : 5, // The radius of the inner circle
		corners : 1, // Corner roundness (0..1)
		rotate : 3, // The rotation offset
		direction : 1, // 1: clockwise, -1: counterclockwise
		color : '#aaa', // #rgb or #rrggbb or array of colors
		speed : 0.8, // Rounds per second
		trail : 57, // Afterglow percentage
		shadow : true, // Whether to render a shadow
		hwaccel : true, // Whether to use hardware acceleration
		className : 'spinner', // The CSS class to assign to the spinner
		zIndex : 2e9, // The z-index (defaults to 2000000000)
		top : '50%', // Top position relative to parent
		left : '50%' // Left position relative to parent
	};
	document.getElementById("loading").className = "dialog";
	var target = document.getElementById('loading');
	var spinner = new Spinner(opts).spin(target);
	$(target).data('spinner', spinner);
}
function hideLoading() {
	connectionStatus = false;
	$('#loading').data('spinner').stop();
	document.getElementById("loading").className = "hide";
}