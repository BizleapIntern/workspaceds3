function sales(element, description, entityType) {
	if (tempParameter != "" && tempParameter != undefined) {
		var previous = tempParameter.element;
		previous.className = "";
	}
	var parameter = {};
	var index = document.getElementById("porderlocationname").selectedIndex;
	parameter["value"] = document.getElementById("porderlocationname").options[index].value;
	parameter["pordersearchdate"] = document.getElementById("porderStartDate").value;
	parameter["porderenddate"] = document.getElementById("porderEndDate").value;
	parameter["description"] = description;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState != 4)
			return;
		if (request.status != 200) {
			alert("Error return " + request.status);
			return;
		}
		hideLoading();
		document.getElementById("action-purchase_order").className = "show";
		if (description == "salesitems") {
			document.getElementById("reportSalesItems").className = "show";
			document.getElementById("reportPurcahseOrder").className = "hide";
			document.getElementById("reportLeftSalesItems").className = "hide";
		}
		if (description == "leftsalesitems") {
			document.getElementById("reportLeftSalesItems").className = "show";
			document.getElementById("reportSalesItems").className = "hide";
			document.getElementById("reportPurcahseOrder").className = "hide";

		}
		if (description == "reportInventory") {
			document.getElementById("reportLeftSalesItems").className = "hide";
			document.getElementById("reportSalesItems").className = "hide";
			document.getElementById("reportPurcahseOrder").className = "hide";

		}
		if (description == "customerClosingReport") {
			document.getElementById("reportLeftSalesItems").className = "hide";
			document.getElementById("reportSalesItems").className = "hide";
			document.getElementById("reportPurcahseOrder").className = "hide";

		}

		// loadAction(document.getElementById(entityType.toLowerCase()+"menu"),
		// entityType.toLowerCase());
		element.className = "search-active";
		document.getElementById("detail").innerHTML = request.responseText;
		document.getElementById("content").innerHTML = "";
		var selects = document.getElementById("porderlocationname");
		st = selects.options[selects.selectedIndex].text;
		document.getElementById("content").innerHTML = "<center>" + st
				+ "</center>";
		document.getElementById("salesitems_detail_table").className = "show";
	};
	parameter.element = element;
	element.className = "search-active";
	parameter.entityType = entityType;
	tempParameter = parameter;
	request.open("GET", "sales/" + description + "?input="
			+ JSON.stringify(parameter), true);
	connectionStatus = true; // working
	request.send();
	loading();

}

function checkPayment() {
	var paymentGeneral = document.getElementById("payment_general_amount").value ? document
			.getElementById("payment_general_amount").value : 0;
	var paymentGeneralDiscount = document.getElementById("payment_general_discount_amount").value ? document
					.getElementById("payment_general_discount_amount").value : 0;
	var paymentSwam = document.getElementById("payment_swam_amount").value ? document
					.getElementById("payment_swam_amount").value : 0;
	var paymentGeneralCommission = document.getElementById("payment_general_amount_commission").value ? document
							.getElementById("payment_general_amount_commission").value : 0;
	var paymentGeneralDiscountCommission = document.getElementById("payment_general_discount_amount_commission").value ? document
									.getElementById("payment_general_discount_amount_commission").value : 0;
	var paymentSwamCommission = document.getElementById("payment_swam_amount_commission").value ? document
									.getElementById("payment_swam_amount_commission").value : 0;
	var general_amount_discount = document.getElementById("general_amount_discount").innerHTML ? document
			.getElementById("general_amount_discount").innerHTML : 0;
	var general_amount_discount_true = document.getElementById("general_amount_discount_true").innerHTML ? document
					.getElementById("general_amount_discount_true").innerHTML : 0;
	var netAmount = document.getElementById("lastPayment").innerHTML?document.getElementById("lastPayment").innerHTML:0;
	var balance = Number(netAmount) - Number(general_amount_discount)-Number(general_amount_discount_true)- (Number(paymentGeneral)+Number(paymentSwam)+Number(paymentGeneralDiscount)+Number(paymentGeneralCommission)+Number(paymentSwamCommission)+Number(paymentGeneralDiscountCommission));
	document.getElementById("payment_balance").innerHTML = balance;
}

function checkDiscountGeneral() {
	var discount = document.getElementById("discount_percent").value ? document
			.getElementById("discount_percent").value : 0;
	var paymentGeneral = document.getElementById("payment_general_amount").value ? document
					.getElementById("payment_general_amount").value : 0;
	var paymentGeneralDiscount = document.getElementById("payment_general_discount_amount").value ? document
							.getElementById("payment_general_discount_amount").value : 0;
	var paymentSwam = document.getElementById("payment_swam_amount").value ? document
							.getElementById("payment_swam_amount").value : 0;
	var payment=Number(paymentGeneral)+Number(paymentSwam)+Number(paymentGeneralDiscount);
	var generalDiscountTrue=document.getElementById("general_amount_discount_true").innerHTML?document.getElementById("general_amount_discount_true").innerHTML:0;
	var lastGeneral_amount=document.getElementById("lastGeneral_amount").innerHTML?document.getElementById("lastGeneral_amount").innerHTML:0;
	var netAmount = document.getElementById("lastPayment").innerHTML;
	document.getElementById("general_amount_discount").innerHTML=lastGeneral_amount*discount*0.01;
	document.getElementById("last_general_amount_discount").innerHTML=lastGeneral_amount-(lastGeneral_amount*discount*0.01);
	var balance = (Number(netAmount) - Number(payment)) - Number(lastGeneral_amount*discount*0.01)-Number(generalDiscountTrue);
	document.getElementById("payment_balance").innerHTML = balance;
}

function checkDiscountGeneralTrue() {
	var discount = document.getElementById("discount_percent_true").value ? document
			.getElementById("discount_percent_true").value : 0;
	var paymentGeneral = document.getElementById("payment_general_amount").value ? document
					.getElementById("payment_general_amount").value : 0;
	var paymentGeneralDiscount = document.getElementById("payment_general_discount_amount").value ? document
							.getElementById("payment_general_discount_amount").value : 0;
	var paymentSwam = document.getElementById("payment_swam_amount").value ? document
							.getElementById("payment_swam_amount").value : 0;
	var payment=Number(paymentGeneral)+Number(paymentSwam)+Number(paymentGeneralDiscount);
	var generalDiscount=document.getElementById("general_amount_discount").innerHTML?document.getElementById("general_amount_discount").innerHTML:0;
	var lastGeneral_Discount_Amount=document.getElementById("lastGeneral_Discount_Amount").innerHTML?document.getElementById("lastGeneral_Discount_Amount").innerHTML:0;
	var netAmount = document.getElementById("lastPayment").innerHTML;
	document.getElementById("general_amount_discount_true").innerHTML=lastGeneral_Discount_Amount*discount*0.01;
	document.getElementById("last_general_amount_discount_true").innerHTML=lastGeneral_Discount_Amount-(lastGeneral_Discount_Amount*discount*0.01);
	var balance = (Number(netAmount) - Number(payment)) - Number(lastGeneral_Discount_Amount*discount*0.01)-Number(generalDiscount);
	document.getElementById("payment_balance").innerHTML = balance;
}

function checkDiscount() {
	var discount = document.getElementById("discount_amount").value ? document
			.getElementById("discount_amount").value : 0;
	var paymentGeneral = document.getElementById("payment_general_amount").value ? document
					.getElementById("payment_general_amount").value : 0;
	var paymentGeneralDiscount = document.getElementById("payment_general_discount_amount").value ? document
							.getElementById("payment_general_discount_amount").value : 0;
	var paymentSwam = document.getElementById("payment_swam_amount").value ? document
							.getElementById("payment_swam_amount").value : 0;
	var payment=Number(paymentGeneral)+Number(paymentSwam)+Number(paymentGeneralDiscount);
	var netAmount = document.getElementById("lastPayment").innerHTML;
	var balance = (Number(netAmount) - Number(payment)) - Number(discount);
	document.getElementById("payment_balance").innerHTML = balance;
}

function checkDiscountPercent(){
	var netAmount = document.getElementById("lastPayment").innerHTML;
	var discountPercent = document.getElementById("discount_percent").value ? document
			.getElementById("discount_percent").value : 0;
	var paymentGeneral = document.getElementById("payment_general_amount").value ? document
					.getElementById("payment_general_amount").value : 0;
	var paymentGeneralDiscount = document.getElementById("payment_general_discount_amount").value ? document
							.getElementById("payment_general_discount_amount").value : 0;
	var paymentSwam = document.getElementById("payment_swam_amount").value ? document
							.getElementById("payment_swam_amount").value : 0;
	var payment=Number(paymentGeneral)+Number(paymentSwam)+Number(paymentGeneralDiscount);
	var netAmount = document.getElementById("lastPayment").innerHTML;
	var discountValue= Number(netAmount)*(discountPercent*0.01);
	document.getElementById("discount_amount").innerHTML=discountValue;			
}

function reportPurchaseOrder(element, description) {
	document.getElementById("reportPurcahseOrder") ? document
			.getElementById("reportPurcahseOrder").className = "hide" : "";
	if (tempParameter != "" && tempParameter != undefined) {
		var previous = tempParameter.element;
		previous.className = "";
	}
	if (document.getElementById("porderlocationname").value == "ALL") {
		alert("Please Choose Location");
		return;
	}

	if (document.getElementById("porderStartDate").value == "") {
		alert("Enter Start Date");
		return;
	}
	if (document.getElementById("porderEndDate").value == "") {
		alert("Enter End Date");
		return;
	}
	var parameter = {};
	parameter.description = description;
	parameter.element = element;
	parameter.searchType="LOCATIONID_DATE";
	parameter.entityType="PURCHASE_ORDER";
	if (typeof pageNumber === 'undefined')
		pageNumber = 1;
	parameter["pageNumber"] = pageNumber.toString();
	//element.className = "search-active";
	tempParameter = parameter;
	var index = document.getElementById("porderlocationname").selectedIndex;
	parameter["value"] = document.getElementById("porderlocationname").options[index].value;
	parameter["name"] = document.getElementById("porderlocationname").options[index].text;
	parameter["pordersearchdate"] = document.getElementById("porderStartDate").value;
	document.getElementById("reportPurcahseOrder").className = "hide";
		document.getElementById("reportTransferFrom").className = "hide";
		document.getElementById("reportTransferTo").className = "hide";
		document.getElementById("reportAdjustment").className = "hide";
		document.getElementById("action-transfer_from-to").className = "hide";
		document.getElementById("action-purchase_order").className = "hide";
		document.getElementById("delete-transfer").className="hide";
		document.getElementById("edit-transfer").className="hide";
		document.getElementById("editAdjustment").className="hide";
	if (document.getElementById("porderEndDate") != undefined)
		parameter["porderenddate"] = document.getElementById("porderEndDate").value;
	if (document.getElementById("salary-date") != undefined)
		parameter["location-salary-date"] = document
				.getElementById("salary-date").value;
	parameter["description"] = description;
	if (description == "reportPurcahseOrder") {
		window.open(
				"report/SaleReport.xlsx?input=" + JSON.stringify(parameter),
				"_blank");

	}else {
		window.open("purchaseOrderReport/Report-" + parameter["name"] + ":"
				+ description + ".xlsx?input=" + JSON.stringify(parameter),
				"_blank");
	}
	console.log(parameter);
}

function reportLocationStockList() {
	var locationBoId = $("#detail-location-name").attr("value");
	var parameter = {};
	parameter.boId = locationBoId;
	window.open("locationStockListReport/report.xlsx?input="
			+ JSON.stringify(parameter), "_blank");
}

function reportTransferFromStockList() {
	var parameter = {};
	var index = document.getElementById("porderlocationname").selectedIndex;
	parameter["value"] = document.getElementById("porderlocationname").options[index].value;
	window.open("transferFromReport/TransferFromReport.xlsx?input="
			+ JSON.stringify(parameter), "_blank");
}

function reportAdjustmentStockList() {
	var parameter = {};
	var index = document.getElementById("porderlocationname").selectedIndex;
	parameter["value"] = document.getElementById("porderlocationname").options[index].value;
	window.open(
			"adjustmentStockListReport/AdjustmentStockListReport.xlsx?input="
					+ JSON.stringify(parameter), "_blank");
}
function reportRouteList() {
	var parameter = {};
	var index = document.getElementById("porderlocationname").selectedIndex;
	parameter["value"] = document.getElementById("porderlocationname").options[index].value;
	window.open(
			"routeListReport/RouteListReport.xlsx?input="
					+ JSON.stringify(parameter), "_blank");
}

function reportSalary(element, description) {
	if (tempParameter != "" && tempParameter != undefined) {
		var previous = tempParameter.element;
		previous.className = "";
	}
	if (document.getElementById("salary-date").value == "") {
		alert("Enter a month");
		return null;
	}
	var parameter = {};
	parameter.description = description;
	parameter.element = element;
	element.className = "search-active";
	tempParameter = parameter;
	var index = document.getElementById("salarylocation").selectedIndex;
	if (index <= 0) {
		alert("Select Location Name");
		return null;
	}
	parameter["value"] = document.getElementById("salarylocation").options[index].value;
	parameter["name"] = document.getElementById("salarylocation").options[index].text;
	parameter["location-salary-date"] = document.getElementById("salary-date").value;

	var dateStr = parameter["location-salary-date"];
	var res = dateStr.replace("/", "_");

	window.open("purchaseOrderReport/SalaryReport_" + parameter["name"] + "_"
			+ res + ".xlsx?input=" + JSON.stringify(parameter), "_blank");

	console.log(parameter);
	// request.send();
	// loading();
}



function reportMonthlyBonusSalary(element, description) {
	if (tempParameter != "" && tempParameter != undefined) {
		var previous = tempParameter.element;
		previous.className = "";
	}
	if (document.getElementById("montlyBonus-date").value == "") {
		alert("Enter a month");
		return null;
	}
	var parameter = {};
	parameter.description = description;
	parameter.element = element;
	element.className = "search-active";
	tempParameter = parameter;
	var index = document.getElementById("montlyBonuslocation").selectedIndex;
	if (index <= 0) {
		alert("Select Location Name");
		return null;
	}
	parameter["value"] = document.getElementById("montlyBonuslocation").options[index].value;
	parameter["name"] = document.getElementById("montlyBonuslocation").options[index].text;
	parameter["location-salary-date"] = document
			.getElementById("montlyBonus-date").value;

	var dateStr = parameter["location-salary-date"];
	var res = dateStr.replace("/", "_");

	window.open("reportMonthlyBonusSalary/reportMonthlyBonusSalary.xlsx?input="
			+ JSON.stringify(parameter), "_blank");
}

function openBonusCompensation() {
	var locationBoId = document.getElementById("detail-location-boId").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").attributes["class"].value = "dialog";
			}
		}
		;
	}
	var parameter = {};
	parameter["locationBoId"] = locationBoId;
	loading();
	request.open("GET", "get15BonuusCompensationForm?input="
			+ JSON.stringify(parameter), true);
	request.send();
}

function compensationForm() {
	var locationBoId = document.getElementById("detail-employee-location-id").innerHTML;
	var type = document.getElementById("detail-employee-location-type").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").attributes["class"].value = "dialog";
				// to fill data
				document.getElementById("empid").innerHTML = document
						.getElementById("detail-employee-boId").innerHTML;
				document.getElementById("employee_name").innerHTML = document
						.getElementById("employee_title").innerHTML
						+ " "
						+ document.getElementById("employee_firstName").innerHTML
						+ " "
						+ document.getElementById("employee_middleName").innerHTML
						+ " "
						+ document.getElementById("employee_lastName").innerHTML;
				document.getElementById("foodAllowance").value = document
						.getElementById("compensation_foodAllowance") != null ? document
						.getElementById("compensation_foodAllowance").innerHTML
						: "0";
				document.getElementById("houseAttendanceAllowance").value = document
						.getElementById("compensation_houseAttendanceAllowance") != null ? document
						.getElementById("compensation_houseAttendanceAllowance").innerHTML
						: "0";

				document.getElementById("onTimeAllowance").value = document
						.getElementById("compensation_onTimeAllowance") != null ? document
						.getElementById("compensation_onTimeAllowance").innerHTML
						: "0";
				document.getElementById("goodAttendanceAllowance").value = document
						.getElementById("compensation_goodAttendanceAllowance") != null ? document
						.getElementById("compensation_goodAttendanceAllowance").innerHTML
						: "0";
				document.getElementById("commuteAllowance").value = document
						.getElementById("compensation_commuteAllowance") != null ? document
						.getElementById("compensation_commuteAllowance").innerHTML
						: "0";

				document.getElementById("codeExamAllowance").value = document
						.getElementById("compensation_codeExamAllowance") != null ? document
						.getElementById("compensation_codeExamAllowance").innerHTML
						: "0";
				document.getElementById("codeWrongFine").value = document
						.getElementById("compensation_codeWrongFine") != null ? document
						.getElementById("compensation_codeWrongFine").innerHTML
						: "0";
				document.getElementById("priceWrongFine").value = document
						.getElementById("compensation_priceWrongFine") != null ? document
						.getElementById("compensation_priceWrongFine").innerHTML
						: "0";

				document.getElementById("customerSignatureFine").value = document
						.getElementById("compensation_customerSignatureFine") != null ? document
						.getElementById("compensation_customerSignatureFine").innerHTML
						: "0";
				document.getElementById("salesQuantityCommission").value = document
						.getElementById("compensation_salesQuantityCommission") != null ? document
						.getElementById("compensation_salesQuantityCommission").innerHTML
						: "0";
				document.getElementById("cashDownSalesQuantityCommission").value = document
						.getElementById("compensation_cashDownSalesQuantityCommission") != null ? document
						.getElementById("compensation_cashDownSalesQuantityCommission").innerHTML
						: "0";

				document.getElementById("putASideSalesQuantityCommmission").value = document
						.getElementById("compensation_putASideSalesQuantityCommmission") != null ? document
						.getElementById("compensation_putASideSalesQuantityCommmission").innerHTML
						: "0";
				document.getElementById("salesRevenueCommission").value = document
						.getElementById("compensation_salesRevenueCommission") != null ? document
						.getElementById("compensation_salesRevenueCommission").innerHTML
						: "0";
				document.getElementById("cashDownSalesRevenueCommission").value = document
						.getElementById("compensation_cashDownSalesRevenueCommission") != null ? document
						.getElementById("compensation_cashDownSalesRevenueCommission").innerHTML
						: "0";

				document.getElementById("putAsideSalesRevenueCommission").value = document
						.getElementById("compensation_putAsideSalesRevenueCommission") != null ? document
						.getElementById("compensation_putAsideSalesRevenueCommission").innerHTML
						: "0";

				document.getElementById("salesSwamQuantityCommission").value = document
						.getElementById("compensation_salesSwamQuantityCommission") != null ? document
						.getElementById("compensation_salesSwamQuantityCommission").innerHTML
						: "0";
				document.getElementById("cashDownSalesSwamQuantityCommission").value = document
						.getElementById("compensation_cashDownSalesSwamQuantityCommission") != null ? document
						.getElementById("compensation_cashDownSalesSwamQuantityCommission").innerHTML
						: "0";

				document.getElementById("putASideSalesSwamQuantityCommmission").value = document
						.getElementById("compensation_putASideSalesSwamQuantityCommmission") != null ? document
						.getElementById("compensation_putASideSalesSwamQuantityCommmission").innerHTML
						: "0";

				document.getElementById("quarterlySalesRevenueCommission").value = document
						.getElementById("compensation_quarterlySalesRevenueCommission") != null ? document
						.getElementById("compensation_quarterlySalesRevenueCommission").innerHTML
						: "0";
				document.getElementById("extraSalesRevenueCommission").value = document
						.getElementById("compensation_extraSalesRevenueCommission") != null ? document
						.getElementById("compensation_extraSalesRevenueCommission").innerHTML
						: "0";

				document
						.getElementById("salesRevenueDebitCollectionCommission").value = document
						.getElementById("compensation_salesRevenueDebitCollectionCommission") != null ? document
						.getElementById("compensation_salesRevenueDebitCollectionCommission").innerHTML
						: "0";
				document.getElementById("debitDuePenalty").value = document
						.getElementById("compensation_debitDuePenalty") != null ? document
						.getElementById("compensation_debitDuePenalty").innerHTML
						: "0";
				document.getElementById("fieldGoingPerDayAllowance").value = document
						.getElementById("compensation_fieldGoingPerDayAllowance") != null ? document
						.getElementById("compensation_fieldGoingPerDayAllowance").innerHTML
						: "0";

				document.getElementById("downTownMarketAllowance").value = document
						.getElementById("compensation_downTownMarketAllowance") != null ? document
						.getElementById("compensation_downTownMarketAllowance").innerHTML
						: "0";
				document.getElementById("monthlySaleAmountCommissionForShop").value = document
						.getElementById("compensation_monthlySaleAmountCommissionForShop") != null ? document
						.getElementById("compensation_monthlySaleAmountCommissionForShop").innerHTML
						: "0";
				document.getElementById("cashierCommission").value = document
						.getElementById("compensation_cashierCommission") != null ? document
						.getElementById("compensation_cashierCommission").innerHTML
						: "0";

				document.getElementById("firstAwardAllowance").value = document
						.getElementById("compensation_firstAwardAllowance") != null ? document
						.getElementById("compensation_firstAwardAllowance").innerHTML
						: "0";
				document.getElementById("secondAwardAllowance").value = document
						.getElementById("compensation_secondAwardAllowance") != null ? document
						.getElementById("compensation_secondAwardAllowance").innerHTML
						: "0";
				document.getElementById("thirdAwardAllowance").value = document
						.getElementById("compensation_thirdAwardAllowance") != null ? document
						.getElementById("compensation_thirdAwardAllowance").innerHTML
						: "0";

				document.getElementById("auditAllowance").value = document
						.getElementById("compensation_auditAllowance") != null ? document
						.getElementById("compensation_auditAllowance").innerHTML
						: "0";
				document
						.getElementById("promotionSalesQuantityCommissionForRetail").value = document
						.getElementById("compensation_promotionSalesQuantityCommissionForRetail") != null ? document
						.getElementById("compensation_promotionSalesQuantityCommissionForRetail").innerHTML
						: "0";
				document.getElementById("overTimeAllowance").value = document
						.getElementById("compensation_overTimeAllowance") != null ? document
						.getElementById("compensation_overTimeAllowance").innerHTML
						: "0";

				document.getElementById("absentDayFine").value = document
						.getElementById("compensation_absentDayFine") != null ? document
						.getElementById("compensation_absentDayFine").innerHTML
						: "0";

				document.getElementById("zayCarFieldTripAllowance").value = document
						.getElementById("compensation_zayCarFieldTripAllowance") != null ? document
						.getElementById("compensation_zayCarFieldTripAllowance").innerHTML
						: "0";
				document.getElementById("commissionPercentage").value = document
						.getElementById("compensation_commissionPercentage") != null ? document
						.getElementById("compensation_commissionPercentage").innerHTML
						: "0";
				document.getElementById("putAsideValue").value = document
						.getElementById("compensation_putAsideValue") != null ? document
						.getElementById("compensation_putAsideValue").innerHTML
						: "0";
				document.getElementById("returnPenalty").value = document
						.getElementById("compensation_returnPenalty") != null ? document
						.getElementById("compensation_returnPenalty").innerHTML
						: "0";
				document.getElementById("producedValue").value = document
						.getElementById("compensation_producedValue") != null ? document
						.getElementById("compensation_producedValue").innerHTML
						: "0";
				document.getElementById("returnPercentage").value = document
						.getElementById("compensation_returnPercentage") != null ? document
						.getElementById("compensation_returnPercentage").innerHTML
						: "0";

			}
		}
		;
	}
	var parameter = {};
	parameter["locationBoId"] = locationBoId;
	loading();
	request.open("GET", "getCompensationForm?input="
			+ JSON.stringify(parameter), true);
	request.send();
}

function update15BonusCompensation() {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				alert("Successfully save compensation data");

			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationBoId"]=document.getElementById("location-BoId").innerHTML;
	parameter["cashDownSaleCommission"] = document
			.getElementById("cashDownSaleCommission").value.trim() ? document
			.getElementById("cashDownSaleCommission").value.trim() : "0";

	parameter["creditSaleCommission"] = document
			.getElementById("creditSaleCommission").value.trim() ? document
			.getElementById("creditSaleCommission").value.trim() : "0";

	parameter["debtCollectionCommission"] = document
			.getElementById("debtCollectionCommission").value.trim() ? document
			.getElementById("debtCollectionCommission").value.trim() : "0";

	parameter["managerExtraCashDownSaleCommission"] = document
			.getElementById("managerExtraCashDownSaleCommission").value.trim() ? document
			.getElementById("managerExtraCashDownSaleCommission").value.trim()
			: "0";

	parameter["managerExtraDebitCollectionCommission"] = document
			.getElementById("managerExtraDebitCollectionCommission").value
			.trim() ? document
			.getElementById("managerExtraDebitCollectionCommission").value
			.trim() : "0";

	parameter["discountSaleTraget"] = document
			.getElementById("discountSaleTraget").value.trim() ? document
			.getElementById("discountSaleTraget").value.trim() : "0";

	parameter["discountSaleTragetCommission"] = document
			.getElementById("discountSaleTragetCommission").value.trim() ? document
			.getElementById("discountSaleTragetCommission").value.trim()
			: "0";

	parameter["discountSaleTragetFine"] = document
			.getElementById("discountSaleTragetFine").value.trim() ? document
			.getElementById("discountSaleTragetFine").value.trim() : "0";

	parameter["saleTraget"] = document.getElementById("saleTraget").value
			.trim() ? document.getElementById("saleTraget").value.trim() : "0";

	parameter["saleTragetCommission"] = document
			.getElementById("saleTragetCommission").value.trim() ? document
			.getElementById("saleTragetCommission").value.trim() : "0";

	parameter["saleTragetFine"] = document.getElementById("saleTragetFine").value
			.trim() ? document.getElementById("saleTragetFine").value.trim()
			: "0";

	loading();
	request.open("POST", "update15BonusCompensation?input="
			+ JSON.stringify(parameter), true);
	request.send();
}

function updateCompensation() {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				this.id = document.getElementById("empid").innerHTML;
				aboutDetail(this, 'EMPLOYEE');
				alert("Successfully save compensation data");
			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["empid"] = document.getElementById("empid").innerHTML;
	// parameter["codeAllowance"] =
	// document.getElementById("codeAllowance").value;
	// parameter["codeAllowance"] = "0";
	parameter["foodAllowance"] = document.getElementById("foodAllowance").value
			.trim() ? document.getElementById("foodAllowance").value.trim()
			: "0";
	parameter["houseAttendanceAllowance"] = document
			.getElementById("houseAttendanceAllowance").value.trim() ? document
			.getElementById("houseAttendanceAllowance").value.trim() : "0";

	parameter["onTimeAllowance"] = document.getElementById("onTimeAllowance").value
			.trim() ? document.getElementById("onTimeAllowance").value.trim()
			: "0";
	parameter["goodAttendanceAllowance"] = document
			.getElementById("goodAttendanceAllowance").value.trim() ? document
			.getElementById("goodAttendanceAllowance").value.trim() : "0";
	parameter["commuteAllowance"] = document.getElementById("commuteAllowance").value
			.trim() ? document.getElementById("commuteAllowance").value.trim()
			: "0";

	parameter["codeExamAllowance"] = document
			.getElementById("codeExamAllowance").value.trim() ? document
			.getElementById("codeExamAllowance").value.trim() : "0";
	parameter["codeWrongFine"] = document.getElementById("codeWrongFine").value
			.trim() ? document.getElementById("codeWrongFine").value.trim()
			: "0";
	parameter["priceWrongFine"] = document.getElementById("priceWrongFine").value
			.trim() ? document.getElementById("priceWrongFine").value.trim()
			: "0";

	parameter["customerSignatureFine"] = document
			.getElementById("customerSignatureFine").value.trim() ? document
			.getElementById("customerSignatureFine").value.trim() : "0";
	parameter["salesQuantityCommission"] = document
			.getElementById("salesQuantityCommission").value.trim() ? document
			.getElementById("salesQuantityCommission").value.trim() : "0";
	parameter["cashDownSalesQuantityCommission"] = document
			.getElementById("cashDownSalesQuantityCommission").value.trim() ? document
			.getElementById("cashDownSalesQuantityCommission").value.trim()
			: "0";

	parameter["putASideSalesQuantityCommmission"] = document
			.getElementById("putASideSalesQuantityCommmission").value.trim() ? document
			.getElementById("putASideSalesQuantityCommmission").value.trim()
			: "0";
	parameter["salesRevenueCommission"] = document
			.getElementById("salesRevenueCommission").value.trim() ? document
			.getElementById("salesRevenueCommission").value.trim() : "0";
	parameter["cashDownSalesRevenueCommission"] = document
			.getElementById("cashDownSalesRevenueCommission").value.trim() ? document
			.getElementById("cashDownSalesRevenueCommission").value.trim()
			: "0";

	parameter["putAsideSalesRevenueCommission"] = document
			.getElementById("putAsideSalesRevenueCommission").value.trim() ? document
			.getElementById("putAsideSalesRevenueCommission").value.trim()
			: "0";

	parameter["salesSwamQuantityCommission"] = document
			.getElementById("salesSwamQuantityCommission").value.trim() ? document
			.getElementById("salesSwamQuantityCommission").value.trim()
			: "0";
	parameter["cashDownSalesSwamQuantityCommission"] = document
			.getElementById("cashDownSalesSwamQuantityCommission").value.trim() ? document
			.getElementById("cashDownSalesSwamQuantityCommission").value.trim()
			: "0";

	parameter["putASideSalesSwamQuantityCommmission"] = document
			.getElementById("putASideSalesSwamQuantityCommmission").value
			.trim() ? document
			.getElementById("putASideSalesSwamQuantityCommmission").value
			.trim() : "0";

	parameter["quarterlySalesRevenueCommission"] = document
			.getElementById("quarterlySalesRevenueCommission").value.trim() ? document
			.getElementById("quarterlySalesRevenueCommission").value.trim()
			: "0";
	parameter["extraSalesRevenueCommission"] = document
			.getElementById("extraSalesRevenueCommission").value.trim() ? document
			.getElementById("extraSalesRevenueCommission").value.trim()
			: "0";

	parameter["salesRevenueDebitCollectionCommission"] = document
			.getElementById("salesRevenueDebitCollectionCommission").value
			.trim() ? document
			.getElementById("salesRevenueDebitCollectionCommission").value
			.trim() : "0";
	parameter["debitDuePenalty"] = document.getElementById("debitDuePenalty").value
			.trim() ? document.getElementById("debitDuePenalty").value.trim()
			: "0";
	parameter["fieldGoingPerDayAllowance"] = document
			.getElementById("fieldGoingPerDayAllowance").value.trim() ? document
			.getElementById("fieldGoingPerDayAllowance").value.trim()
			: "0";

	parameter["downTownMarketAllowance"] = document
			.getElementById("downTownMarketAllowance").value.trim() ? document
			.getElementById("downTownMarketAllowance").value.trim() : "0";
	parameter["monthlySaleAmountCommissionForShop"] = document
			.getElementById("monthlySaleAmountCommissionForShop").value.trim() ? document
			.getElementById("monthlySaleAmountCommissionForShop").value.trim()
			: "0";
	parameter["cashierCommission"] = document
			.getElementById("cashierCommission").value.trim() ? document
			.getElementById("cashierCommission").value.trim() : "0";

	parameter["firstAwardAllowance"] = document
			.getElementById("firstAwardAllowance").value.trim() ? document
			.getElementById("firstAwardAllowance").value.trim() : "0";
	parameter["secondAwardAllowance"] = document
			.getElementById("secondAwardAllowance").value.trim() ? document
			.getElementById("secondAwardAllowance").value.trim() : "0";
	parameter["thirdAwardAllowance"] = document
			.getElementById("thirdAwardAllowance").value.trim() ? document
			.getElementById("thirdAwardAllowance").value.trim() : "0";

	parameter["auditAllowance"] = document.getElementById("auditAllowance").value
			.trim() ? document.getElementById("auditAllowance").value.trim()
			: "0";
	parameter["promotionSalesQuantityCommissionForRetail"] = document
			.getElementById("promotionSalesQuantityCommissionForRetail").value
			.trim() ? document
			.getElementById("promotionSalesQuantityCommissionForRetail").value
			.trim() : "0";
	parameter["overTimeAllowance"] = document
			.getElementById("overTimeAllowance").value.trim() ? document
			.getElementById("overTimeAllowance").value.trim() : "0";

	parameter["absentDayFine"] = document.getElementById("absentDayFine").value
			.trim() ? document.getElementById("absentDayFine").value.trim()
			: "0";

	parameter["zayCarFieldTripAllowance"] = document
			.getElementById("zayCarFieldTripAllowance").value.trim() ? document
			.getElementById("zayCarFieldTripAllowance").value.trim() : "0";
	parameter["commissionPercentage"] = document
			.getElementById("commissionPercentage").value.trim() ? document
			.getElementById("commissionPercentage").value.trim() : "0";
	parameter["putAsideValue"] = document.getElementById("putAsideValue").value
			.trim() ? document.getElementById("putAsideValue").value.trim()
			: "0";
	parameter["returnPenalty"] = document.getElementById("returnPenalty").value
			.trim() ? document.getElementById("returnPenalty").value.trim()
			: "0";
	parameter["producedValue"] = document.getElementById("producedValue").value
			.trim() ? document.getElementById("producedValue").value.trim()
			: "0";
	parameter["returnPercentage"] = document.getElementById("returnPercentage").value
			.trim() ? document.getElementById("returnPercentage").value.trim()
			: "0";

	console.log(parameter);
	loading();
	request.open("POST", "updateCompensation?input="
			+ JSON.stringify(parameter), true);
	request.send();
}

function viewStockListCar(element) {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var routeId = element.id;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";

			} else {
				alert("Load view Salary form error.Please try again. Error code is "
						+ request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["routeId"] = routeId;
	request.open("GET", "getRouteStockListFormCar?input="
			+ JSON.stringify(parameter), true);
	request.send(null);
}

function today() {
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	if (day < 10)
		day = "0" + day;
	if (month < 10)
		month = "0" + month;
	return (day + "/" + month + "/" + year);
}

function printInvoice() {
	alert("at print");
	document.getElementById("printSalesDate").innerHTML = document
			.getElementById("salesDate").value;
	document.getElementById("printSalesLocation").innerHTML = document
			.getElementById("salesLocationName").innerHTML;
	document.getElementById("printSalesInvNo").innerHTML = document
			.getElementById("salesInvoice").value;
	var custList = document.getElementById("saleCustomerId");
	var custname = custList.options[custList.selectedIndex].text;
	if (custname.indexOf(",") > -1) {
		custname = custname.substring(0, custname.indexOf(","));
	}
	document.getElementById("printSalesName").innerHTML = custname;
	// product
	var productName = document.querySelectorAll("#dailySalesProductName");
	var productPrice = document.querySelectorAll("#dailySalesProductPrice");
	var productQuantity = document.querySelectorAll("#dailySalesquantity");
	var productTotal = document.querySelectorAll("#dailySalestotal");

	var table = document.getElementById("salesItemsList");
	for (var i = 1; i <= productName.length; i++) {
		table.insertRow(i);
		table.rows[i].insertCell(0);
		table.rows[i].cells[0].appendChild(document
				.createTextNode(productName[i - 1].innerHTML));
		table.rows[i].insertCell(1);
		table.rows[i].cells[1].appendChild(document
				.createTextNode(productPrice[i - 1].value));
		table.rows[i].insertCell(2);
		table.rows[i].cells[2].appendChild(document
				.createTextNode(productQuantity[i - 1].value));
		table.rows[i].insertCell(3);
		table.rows[i].cells[3].appendChild(document
				.createTextNode(productTotal[i - 1].innerHTML));
	}
	var prtContent = document.getElementById("printArea");
	var WinPrint = window
			.open('', '',
					'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
	WinPrint.document.write(prtContent.innerHTML);
	WinPrint.document.close();
	WinPrint.focus();
	WinPrint.print();
	WinPrint.close();
	// document.getElementById("mytemp").innerHTML=request.responseText;

}

function myp(event) {
	alert("change");
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	alert(d);
}
