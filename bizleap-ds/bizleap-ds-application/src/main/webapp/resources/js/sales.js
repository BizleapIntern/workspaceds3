var totalDis = 0;
var totalDisTrue = 0;
var rowtemp = 0;

function getCustomerBoId(event) {
	var custList = document.getElementById("saleCustomerId");
	var index = -1;
	for (var i = 0; i < customerList.options.length; i++) {
		if (customerList.options[i].value == event.value) {
			index = i;
			break;
		}
	}
	if (index == -1) {
		alert("Please choose Customer!");
		document.getElementById("daily-saleCustomerId").innerHTML = "";
		return;
	} else {
		console.log("Test", customerList.options[index].value.split(":")[0]);
		document.getElementById("daily-Cust").value = customerList.options[index].value
				.split(":")[0];
		document.getElementById("saleCustomerId").value = custList.options[index].value;
		document.getElementById("daily-saleCustomerId").innerHTML = custList.options[index].innerHTML;
	}
}
function dailySalesForm(description) {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				$('#salesDate').datepicker({
					dateFormat : 'dd/mm/yy'
				});
				document.getElementById("salesDate").focus();
				document.getElementById("salesDate").value = today();
				document.getElementById("detail-location-type-Daily").innerHTML = document
						.getElementById("detail-location-type").innerHTML;
			} else {
				alert("Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	loading();
	request.open("GET", "dailySalesForm?input=" + JSON.stringify(parameter),
			true);
	request.send(null);
}
function addSalesRow(parentId) {
	var table = document.getElementById(parentId);
	var childList = table.getElementsByTagName("tr");
	var newinnerhtml = childList[1].innerHTML;
	console.log("Work");
	var row = table.insertRow(childList.length - 9);
	$(row).html(newinnerhtml);
	$(row).attr("name", $(childList[1]).attr("name"));
	$(row).find('input')[0].focus();
}

function getProductInfo(event, row) {
	if (event.which == 13 || event.keyCode == 13 || event.which == 9
			|| event.keyCode == 9) {
		var productCode = document.getElementById("sales_Inventory_extraStock");
		var productName = document.getElementById("salesProductName");
		var productPrice = document.getElementById("salesProductPrice");
		var stockList = document.getElementById("sales_Inventory_Stock");
		var productDiscounted = document
				.getElementById("salesProductDiscounted");
		var productCategory = document.getElementById("salesProductCategory");
		var index = -1;
		var d = row.parentNode.parentNode.rowIndex - 1;
		for (var i = 0; i < productList.options.length; i++) {
			if (productList.options[i].value == document
					.getElementsByName("extrasalesProductcodeList")[d].value) {
				index = i;
				break;
			}
		}
		if (index == -1) {
			// alert("Please choose correct Product Code!");
			// document.getLementsByName("dailySalestotal")[d].focus();

			var namespan = document.getElementsByName("dailySalesProductName")[d];
			var totalSale = document.getElementsByName("dailySalestotal")[d];
			var pricespan = document
					.getElementsByName("dailySalesProductPrice")[d];
			var quantityspan = document.getElementsByName("dailySalesquantity")[d];
			var discountspan = document
					.getElementsByName("dailySalesProductDiscounted")[d];

			var element0 = document.createElement("input");
			// $(totalSale).find('input')[d].focus();
			element0.setAttribute('type', 'text');
			element0.setAttribute('name', 'other');
			element0.setAttribute('value', '');
			element0.setAttribute('onkeypress',
					'return checkOtherEnterKey(event)');
			namespan.innerHTML = "";

			$(namespan).append(element0);

			var element1 = document.createElement("input");
			// $(totalSale).find('input')[d].focus();
			element1.setAttribute('type', 'number');
			element1.setAttribute('name', 'othercost');
			element1.setAttribute('value', '');
			element1.setAttribute('placeholder', '0');
			element1.setAttribute('onkeypress',
					'return checkOtherCostEnterKey(event)');
			element1
					.setAttribute('onkeyup', 'checkOtherCostCalculation(event)');
			totalSale.innerHTML = "";

			$(totalSale).append(element1);
			// $(totalSale).find('input').focus();

			$(quantityspan).attr('class', 'hide');
			$(pricespan).attr('class', 'hide');
			$(namespan).find('input').focus();
			return false;
		}
		var boId = productCode.options[index].value;
		var name = productName.options[index].value;
		var price = productPrice.options[index].value;
		var priceName = price.split(";");
		var discounted = productDiscounted.options[index].value;
		var category = productCategory.options[index].value;
		document.getElementsByName("salesProductcodeList")[d].value = boId;
		document.getElementsByName("dailySalesProductName")[d].innerHTML = name;
		var select = $(document.getElementsByName("dailySalesProductPrice")[d]);
		$(select).empty();
		for (var i = 0; i < (priceName.length - 1); i++) {
			var priceNameString = priceName[i].split(",");
			var option = $(document.createElement("OPTION"));
			option.text(priceName[i]);
			option.val(priceNameString[1]);
			select.append(option);
		}
		// document.getElementsByName("dailySalesProductPrice")[d].value =
		// price;
		document.getElementsByName("dailySalesProductDiscounted")[d].innerHTML = discounted;
		document.getElementsByName("dailySalesCategory")[d].innerHTML = category;
		document.getElementsByName("dailySalesquantity")[d].focus();
		return false;
	}
	return true;
}

function checkProductPrice1(element) {
	var row = $(element).parent().parent();
	var d = row.index() - 1;
	var qty = document.getElementsByName("dailySalesquantity")[d].value;
	document.getElementsByName("dailySalestotal")[d].innerHTML = qty
			* element.value;
	totalSales();
}

function getParentByTagName(currentElement, tagName) {
	var element = $(currentElement);
	while (element != null) {
		if (element.prop("tagName").toLowerCase() == tagName)
			return element;
		element = element.parent();
	}
}

function getProductInfoEdit(event, row) {
	if (event.which == 13 || event.keyCode == 13 || event.which == 9
			|| event.keyCode == 9) {
		var productCode = document.getElementById("sales_Inventory_extraStock");
		var productName = document.getElementById("salesProductName");
		var productPrice = document.getElementById("salesProductPrice");
		var stockList = document.getElementById("sales_Inventory_Stock");
		var productDiscounted = document
				.getElementById("salesProductDiscounted");
		var index = -1;
		element = $(row);
		var tr = element.parent().parent();
		// var d = row.parentNode.parentNode.parentNode.rowIndex - 1;
		for (var i = 0; i < productList.options.length; i++) {
			if (productList.options[i].value == tr.children(
					"td[name=extrasalesProductcodeList]").children("input")
					.val())
			/* document.getElementsByName("extrasalesProductcodeList")[d].value) */{
				index = i;
				break;
			}
		}
		if (index == -1) {
			alert("Please choose correct Product Code!");
			return false;
		}
		var boId = productCode.options[index].value;
		var name = productName.options[index].value;
		var price = productPrice.options[index].value;
		var discounted = productDiscounted.options[index].value;
		tr.children("td[name=extrasalesProductcodeList]").children(
				"input[name=salesProductcodeList]").val(boId);
		tr.children("td[name=dailySalesProductName]").children("span").text(
				name);
		tr.children("td[name=dailySalesProductPrice]").children(
				"input[name=dailySalesProductPrice]").val(price);
		tr.children("td[name=dailySalesProductDiscounted]").children("span")
				.text(discounted);
		tr.children("td").children("span[name=otherspan]").children(
				"input[name=dailySalesquantity]").focus();
		tr.children("td").children("span[name=dailySalestotal]").text(price);
		return false;
	}
	return true;
}

function checkQuantityEnterKey(event) {
	if (event.which == 13 || event.keyCode == 13) {
		addSalesRow("sales-table");
		return false;
	}
	return true;

}

function checkCalculateAmount(event, edit) {
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	rowtemp = d;
	var qty = document.getElementsByName("dailySalesquantity")[d].value;
	var price = document.getElementsByName("dailySalesProductPrice")[d].value;
	document.getElementsByName("dailySalestotal")[d].innerHTML = qty * price;
	totalSales(edit);
}

function checkCalculateAmountByKeyUp(event, edit) {
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	rowtemp = d;
	var qty = document.getElementsByName("dailySalesquantity")[d].value;
	var price = document.getElementsByName("dailySalesProductPrice")[d].value;
	document.getElementsByName("dailySalestotal")[d].innerHTML = qty * price;
	totalSales(edit);
}

function checkCalculateAmountEditEnter(event) {
	var d = event.target.parentNode.parentNode.rowIndex - 1;
	if (event.which == 13 || event.keyCode == 13 || event.which == 9
			|| event.keyCode == 9) {
		$(document.getElementsByName("dailySalesquantity")[d]).focus();
		return false;
	}
	return true;
}

function checkCalculateAmountEditByOnChange(event, element) {
	var d = event.target.parentNode.parentNode.rowIndex - 1;
	var qty = document.getElementsByName("dailySalesquantity")[d].value;
	var price = document.getElementsByName("dailySalesProductPrice")[d].value;
	document.getElementsByName("dailySalestotal")[d].innerHTML = qty * price;
	totalSales();
}

function checkCalculateAmountEdit(event, element) {
	var d = event.target.parentNode.parentNode.rowIndex - 1;
	var qty = document.getElementsByName("dailySalesquantity")[d].value;
	var price = document.getElementsByName("dailySalesProductPrice")[d].value;
	document.getElementsByName("dailySalestotal")[d].innerHTML = qty * price;
	totalSales();
}

function checkOtherEnterKey(event) {
	if (event.which == 13 || event.keyCode == 13) {
		addSalesRow("sales-table");
		return false;
	}
	return true;
}

function checkOtherCostEnterKey(event) {
	if (event.which == 13 || event.keyCode == 13) {
		addSalesRow("sales-table");
		return false;
	}
	return true;
}

function checkFoucuQuantityEnterKey(event) {
	if (event.which == 13 || event.keyCode == 13) {
		var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
		document.getElementsByName("dailySalesquantity")[d].focus();
	}
}
function checkOtherCostCalculation(event) {
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	totalSales();
}
function removeSalesRow(element) {
	element = $(element);
	var removeElement = element.parent().parent();
	var table = removeElement.parent();
	if (table.children().length < 2) {
		alert("Can't remove last element");
		return;
	}
	removeElement.detach();
	totalSales();
}

function totalSales(edit) {
	var amtList = document.getElementsByName("dailySalestotal");
	var qtyList = document.getElementsByName("dailySalesquantity");
	var disList = document.getElementsByName("dailySalesProductDiscounted");
	var swamList = document.getElementsByName("dailySalesCategory");
	var totalQty = 0;
	var totalAmt = 0;
	totalDis = 0;
	totalDisTrue = 0;
	if (qtyList.length > 1) {
		for (var i = 1; i < qtyList.length; i++) {
			if (qtyList[i].value != "") {
				totalQty += parseInt(qtyList[i].value.trim() ? qtyList[i].value
						.trim() : 0);
				totalAmt += parseInt(amtList[i].innerHTML ? amtList[i].innerHTML
						: 0);

				var boo = disList[i].innerHTML === "true" ? true : false;
				var swam = swamList[i].innerHTML === "SWAM" ? true : false;
				if (!boo && !swam) {
					totalDis += parseInt(amtList[i].innerHTML ? amtList[i].innerHTML
							: 0);
				}
				if (boo && !swam) {
					totalDisTrue += parseInt(amtList[i].innerHTML ? amtList[i].innerHTML
							: 0);
				}
			}
		}
	}
	document.getElementById("dailysales-gross-total").innerHTML = totalAmt;
	var otherList = document.getElementsByName("othercost");
	for (var i = 0; i < otherList.length; i++) {
		totalAmt += parseInt(otherList[i].value.trim() ? otherList[i].value
				.trim() : 0);
	}

	document.getElementById("dailysales-total").innerHTML = totalAmt;
	document.getElementById("dailysales-totalqty").innerHTML = totalQty;
	calculatediscount(totalAmt);
	calculatediscountTrue(totalAmt);
	var discount = document.getElementById("salesDiscount").innerHTML;
	var discountTrue = document.getElementById("salesDiscountTrue").innerHTML;
	var cashdiscount = document.getElementById("salesCashDiscount").value
			.trim() ? document.getElementById("salesCashDiscount").value.trim()
			: 0;
	var net = totalAmt - discount - discountTrue;
	net = net - cashdiscount;
	document.getElementById("dailysales-netAmount").innerHTML = net;
	console.log("EDit ", edit);
	if (edit == "edit") {
		document.getElementById("balance").innerHTML = Number(net)
				- (Number(document.getElementById("salePaidGeneral").innerHTML ? document
						.getElementById("salePaidGeneral").innerHTML
						: 0)
						+ Number(document
								.getElementById("salePaidPaidGeneralDiscount").innerHTML ? document
								.getElementById("salePaidPaidGeneralDiscount").innerHTML
								: 0) + Number(document
						.getElementById("salePaidSwam").innerHTML ? document
						.getElementById("salePaidSwam").innerHTML : 0));
	} else {
		document.getElementById("balance").innerHTML = Number(net)
				- (Number(document.getElementById("salePaidGeneral").value ? document
						.getElementById("salePaidGeneral").value
						: 0)
						+ Number(document
								.getElementById("salePaidPaidGeneralDiscount").value ? document
								.getElementById("salePaidPaidGeneralDiscount").value
								: 0) + Number(document
						.getElementById("salePaidSwam").value ? document
						.getElementById("salePaidSwam").value : 0));
	}
}

function calculatediscountTrue(totalAmt) {
	var totalAmount = document.getElementById("dailysales-gross-total").innerHTML
			.trim() ? document.getElementById("dailysales-gross-total").innerHTML
			.trim()
			: 0;
	var per = document.getElementById("salesDiscountPerTrue").value.trim() ? document
			.getElementById("salesDiscountPerTrue").value.trim()
			: 0;
	if (document.getElementById("detail-location-type-Daily").innerHTML == "RETAIL") {
		var value = Number(totalAmount);
	} else {
		var value = Number(totalDisTrue);
	}
	var percentage = Number(per);
	if (value > 0) {
		var disAmt = value * (percentage / 100);
		document.getElementById("salesDiscountTrue").innerHTML = parseInt(disAmt);
	}
	calculateNetTotal();
}

function calculatediscount(totalAmt) {
	var totalAmount = document.getElementById("dailysales-gross-total").innerHTML
			.trim() ? document.getElementById("dailysales-gross-total").innerHTML
			.trim()
			: 0;
	var per = document.getElementById("salesDiscountPer").value.trim() ? document
			.getElementById("salesDiscountPer").value.trim()
			: 0;
	if (document.getElementById("detail-location-type-Daily").innerHTML == "RETAIL") {
		var value = Number(totalAmount);
	} else {
		var value = Number(totalDis);
	}
	var percentage = Number(per);
	if (value > 0) {
		var disAmt = value * (percentage / 100);
		document.getElementById("salesDiscount").innerHTML = parseInt(disAmt);
	}
	calculateNetTotal();
}

function calculateNetTotal() {
	var totalAmount = document.getElementById("dailysales-total").innerHTML
			.trim() ? document.getElementById("dailysales-total").innerHTML
			.trim() : 0;
	var discount = document.getElementById("salesDiscount").innerHTML.trim() ? document
			.getElementById("salesDiscount").innerHTML.trim()
			: 0;
	var discountTrue = document.getElementById("salesDiscountTrue").innerHTML
			.trim() ? document.getElementById("salesDiscountTrue").innerHTML
			.trim() : 0;
	var salesCashDiscount = document.getElementById("salesCashDiscount").value
			.trim() ? document.getElementById("salesCashDiscount").value.trim()
			: 0;
	salesCashDiscount = Number(salesCashDiscount);
	discount = Number(discount);
	discountTrue = Number(discountTrue);
	totalAmount = Number(totalAmount);
	if (totalAmount >= 0) {
		console.log("Value" + totalAmount + "Discount" + discount
				+ "discountTrue" + discountTrue + "SalesCashDisount"
				+ salesCashDiscount);
		var value = totalAmount - discount - discountTrue - salesCashDiscount;
		console.log("Value", value);
		document.getElementById("dailysales-netAmount").innerHTML = value;
		console.log("NetAmount", document
				.getElementById("dailysales-netAmount").innerHTML);
		document.getElementById("balance").innerHTML = parseInt(value)
				- (Number(document.getElementById("salePaidGeneral").value ? document
						.getElementById("salePaidGeneral").value
						: 0)
						+ Number(document
								.getElementById("salePaidPaidGeneralDiscount").value ? document
								.getElementById("salePaidPaidGeneralDiscount").value
								: 0) + Number(document
						.getElementById("salePaidSwam").value ? document
						.getElementById("salePaidSwam").value : 0));
	}
}

function calculateBalance() {
	var salePaidGeneral = document.getElementById("salePaidGeneral").value ? document
			.getElementById("salePaidGeneral").value
			: 0;
	var salePaidGeneralDiscount = document
			.getElementById("salePaidPaidGeneralDiscount").value ? document
			.getElementById("salePaidPaidGeneralDiscount").value : 0;
	var salePaidSwam = document.getElementById("salePaidSwam").value ? document
			.getElementById("salePaidSwam").value : 0;
	var netAmount = document.getElementById("dailysales-netAmount").innerHTML;
	document.getElementById("balance").innerHTML = Number(netAmount)
			- (Number(salePaidGeneral) + Number(salePaidGeneralDiscount) + Number(salePaidSwam));
}

function editPurchase() {
	var request = new XMLHttpRequest;
	var codeList = document.getElementsByName("salesProductcodeList");
	var qtyList = document.getElementsByName("dailySalesquantity");
	var priceList = document.getElementsByName("dailySalesProductPrice");
	var customerId = document.getElementById("detail-customer-boId").innerHTML;
	var locationId = document.getElementById("salesLocationId").innerHTML;
	var productCodeList = [];
	var productPriceList = [];
	var productQtyList = [];
	for (var i = 1; i < codeList.length; i++) {
		productCodeList.push(codeList[i].value.trim());
		productPriceList.push(priceList[i].value.trim() ? priceList[i].value
				.trim() : "0");
		productQtyList.push(qtyList[i].value.trim() ? qtyList[i].value.trim()
				: "0");
	}
	var otherList = document.getElementsByName("other");
	var othercostList = document.getElementsByName("othercost");
	var othercost = {};

	for (var i = 1; i < otherList.length; i++) {
		value = othercostList[i].value.trim() ? othercostList[i].value.trim()
				: "0";
		if (value != 0)
			othercost[otherList[i].value.trim()] = value;
	}
	var saleRecords = {};
	saleRecords['productCodeList'] = productCodeList;
	saleRecords['productPriceList'] = productPriceList;
	saleRecords['productQtyList'] = productQtyList;
	saleRecords['othercost'] = othercost;
	saleRecords['salesDate'] = document.getElementById("salesDate").value;
	saleRecords['routeId'] = document.getElementById("saleMarketRoute").innerHTML;
	saleRecords['salesInvoice'] = document.getElementById("salesInvoice").value;
	saleRecords['salesLocation'] = document.getElementById("salesLocationId").innerHTML;
	saleRecords["boId"] = document.getElementById("purchaseOrder-Id").innerHTML;
	saleRecords["locationId"] = locationId;
	saleRecords['saleCustomerId'] = customerId;

	saleRecords['discount'] = document.getElementById("salesDiscountPer").value
			.trim() ? document.getElementById("salesDiscountPer").value.trim()
			: "0";
	saleRecords['discountTrue'] = document
			.getElementById("salesDiscountPerTrue").value.trim() ? document
			.getElementById("salesDiscountPerTrue").value.trim() : "0";
	saleRecords['cashDiscount'] = document.getElementById("salesCashDiscount").value
			.trim() ? document.getElementById("salesCashDiscount").value : "0";
	saleRecords['netAmount'] = document.getElementById("dailysales-netAmount").innerHTML
			.trim() ? document.getElementById("dailysales-netAmount").innerHTML
			: "0";
	saleRecords['customerType'] = document.getElementById("edit-customer-type").innerHTML;

	var netAmount = document.getElementById("dailysales-netAmount").innerHTML
			.trim() ? document.getElementById("dailysales-netAmount").innerHTML
			: "0";
	saleRecords['netAmount'] = netAmount;
	var paidAmountGeneral;
	var paidAmountGeneralDiscount;
	var paidAmountGeneralSwam;
	if (document.getElementById("edit-customer-type").innerHTML != "RETAIL") {
		paidAmountGeneral = document.getElementById("salePaidGeneral").innerHTML ? document
				.getElementById("salePaidGeneral").innerHTML
				: "0";
		paidAmountGeneralDiscount = document
				.getElementById("salePaidPaidGeneralDiscount").innerHTML ? document
				.getElementById("salePaidPaidGeneralDiscount").innerHTML
				: "0";
		paidAmountGeneralSwam = document.getElementById("salePaidSwam").innerHTML ? document
				.getElementById("salePaidSwam").innerHTML
				: "0";
	} else {
		paidAmountGeneral = document.getElementById("salePaidGeneral").value ? document
				.getElementById("salePaidGeneral").value
				: "0";
		paidAmountGeneralDiscount = document
				.getElementById("salePaidPaidGeneralDiscount").value ? document
				.getElementById("salePaidPaidGeneralDiscount").value : "0";
		paidAmountGeneralSwam = document.getElementById("salePaidSwam").value ? document
				.getElementById("salePaidSwam").value
				: "0";
		if ((Number(paidAmountGeneral) + Number(paidAmountGeneralDiscount) + Number(paidAmountGeneralSwam)) != Number(netAmount)) {
			alert("Please paid payment because of Retail type");
			return;
		}
	}

	saleRecords['paidAmountGeneral'] = paidAmountGeneral;
	saleRecords['paidAmountGeneralDiscount'] = paidAmountGeneralDiscount;
	saleRecords['paidAmountGeneralSwam'] = paidAmountGeneralSwam;
	console.log("SaleRecords", saleRecords);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = document.createElement("div");
				result.innerHTML = request.responseText;
				result = $(result).children("span").text();
				if (result == "PAYMENT") {
					alert("You have payments.Therefore you will first be to edit Payment-Date at PaymentDetail");
				}
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("customermenu"), 'customer');
				document.getElementById("search-text").value = customerId;
				this.id = customerId;
				search(this, 'ID', 'CUSTOMER');
				aboutDetail(this, 'CUSTOMER');
			} else {
				alert("Load transfer form error.Please try again. Error code is "
						+ request.status);
			}
		}
	};
	if (Object.keys(productCodeList).length <= 0) {
		alert("Cann't Save Because you don't sale Product.");
		return;
	}
	loading();
	request.open("GET", "editPurchaseOrderRecord?input="
			+ JSON.stringify(saleRecords), true);
	request.send(null);
}

function salesPaid(force, toLocation) {
	var request = new XMLHttpRequest;
	var routeId = document.getElementById("saleMarketRoute").innerHTML;
	var codeList = document.getElementsByName("salesProductcodeList");
	var qtyList = document.getElementsByName("dailySalesquantity");
	var priceList = document.getElementsByName("dailySalesProductPrice");
	var productCodeList = [];
	var salePriceList = [];
	var saleQuantityList = [];
	for (var i = 1; i < codeList.length; i++) {
		productCodeList.push(codeList[i].value);
		salePriceList.push(priceList[i].value.trim() ? priceList[i].value
				.trim() : "0");
		saleQuantityList.push(qtyList[i].value.trim() ? qtyList[i].value.trim()
				: "0")
	}
	/*
	 * var lineItem = {}; var priceItem = {}; console.log(codeList.length) for
	 * (var i = 0; i < codeList.length; i++) { value =
	 * parseInt(qtyList[i].value.trim() ? qtyList[i].value.trim() : "0"); var
	 * price = parseInt(priceList[i].value.trim() ? priceList[i].value .trim() :
	 * "0"); if (value != 0) { var temp = lineItem[codeList[i].value.trim()] ?
	 * parseInt(lineItem[codeList[i].value .trim()]) : 0;
	 * lineItem[codeList[i].value.trim()] = (temp + value).toString();
	 * priceItem[codeList[i].value.trim()] = price.toString(); } }
	 */
	var otherList = document.getElementsByName("other");
	var othercostList = document.getElementsByName("othercost");
	var othercost = {};
	for (var i = 0; i < otherList.length; i++) {
		value = othercostList[i].value.trim() ? othercostList[i].value.trim()
				: "0";
		if (value != 0)
			othercost[otherList[i].value.trim()] = value;
	}
	var saleRecords = {};
	saleRecords['productCodeList'] = productCodeList;
	saleRecords['salePriceList'] = salePriceList;
	saleRecords['saleQuantityList'] = saleQuantityList;
	/*
	 * saleRecords['lineItem'] = lineItem; saleRecords['priceList'] = priceItem;
	 */
	saleRecords['othercost'] = othercost;
	saleRecords['salesDate'] = document.getElementById("salesDate").value;
	saleRecords['routeId'] = routeId;
	saleRecords['salesInvoice'] = document.getElementById("salesInvoice").value;
	saleRecords['salesLocation'] = document.getElementById("salesLocationId").innerHTML;
	if (force) {
		saleRecords['force'] = force;
	}
	if (toLocation) {
		saleRecords['toLocation'] = toLocation;
	}
	var custList = document.getElementById("saleCustomerId");
	var custId = document.getElementById("daily-saleCustomerId").innerHTML;

	if (custId.trim() != "")
		saleRecords['saleCustomerId'] = document
				.getElementById("saleCustomerId").value;
	else {
		alert("Please choose Customer!");
		return;
	}

	saleRecords['discount'] = document.getElementById("salesDiscountPer").value
			.trim() ? document.getElementById("salesDiscountPer").value.trim()
			: "0";
	saleRecords['discountTrue'] = document
			.getElementById("salesDiscountPerTrue").value.trim() ? document
			.getElementById("salesDiscountPerTrue").value.trim() : "0";
	saleRecords['cashDiscount'] = document.getElementById("salesCashDiscount").value
			.trim() ? document.getElementById("salesCashDiscount").value : "0";
	var netAmount = document.getElementById("dailysales-netAmount").innerHTML
			.trim() ? document.getElementById("dailysales-netAmount").innerHTML
			: "0";
	saleRecords['netAmount'] = netAmount;
	var paidAmountGeneral = document.getElementById("salePaidGeneral").value
			.trim() ? document.getElementById("salePaidGeneral").value : "0";
	saleRecords['paidAmountGeneral'] = paidAmountGeneral;
	var paidAmountGeneralDiscount = document
			.getElementById("salePaidPaidGeneralDiscount").value.trim() ? document
			.getElementById("salePaidPaidGeneralDiscount").value
			: "0";
	saleRecords['paidAmountGeneralDiscount'] = paidAmountGeneralDiscount;
	var paidAmountGeneralSwam = document.getElementById("salePaidSwam").value
			.trim() ? document.getElementById("salePaidSwam").value : "0";
	saleRecords['paidAmountGeneralSwam'] = paidAmountGeneralSwam;
	if ($("#" + saleRecords['saleCustomerId']).attr("data-type") == "RETAIL") {
		if ((Number(paidAmountGeneral) + Number(paidAmountGeneralDiscount) + Number(paidAmountGeneralSwam)) != Number(netAmount)) {
			alert("Please paid payment because of Retail type");
			return;
		}
	}
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = document.createElement("div");
				result.innerHTML = request.responseText;
				result = $(result).children("span").text();
				if (result == "ERROR") {
					var r = confirm("This InvoiceNo. is already exist.If you want to save,click 'OK'.");
					if (r == true) {
						salesPaid("froced");
					} else {
						$('#salesInvoice').focus();
					}
					return;
				}
				if (result == "CHECKDATE") {
					alert("Please,check your sale date,sale date is before Route start date.")
					return;
				}
				if (result == "ADJUSTMENT") {
					var r = confirm("This Date have Adjustment,If you want to sale from Adjustment,click 'OK',if not,click 'Cancel'!");
					//document.getElementById("confirmBox").innerHTML="show";
					if (r == true) {
						salesPaid(force, "adjustment");
					} else {
						salesPaid(force, "location");
					}
					return;
			}
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				routeId = document.getElementById("saleMarketRoute").innerHTML;
				if (routeId != "") {
					console.log("RouteID  ", routeId);
					routeId = document.getElementById(routeId);
					saleFromRoute(routeId);

				} else {
					$("#dailySale").click();
				}
			} else {
				alert("Load DailySale form error.Please try again. Error code is "
						+ request.status);
			}
		}
	};
	if (Object.keys(productCodeList).length <= 0) {
		alert("Cann't Save Because you don't sale Product.");
		return;
	}
	console.log("saleRecords", saleRecords);
	loading();
	request.open("GET", "saveSaleRecord?input=" + JSON.stringify(saleRecords),
			true);
	request.send(null);
}

function marketRoute() {
	var locationId = document.getElementById("salesLocationId").innerHTML;
	var routeId = document.getElementById("salerouteId").value;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";

				document.getElementById("market-sales").className = "show";
				document.getElementById("market-route-requirement").className = "hide";
				document.getElementById("market-route-information").className = "show";
				document.getElementById("saleMarketRoute").innerHTML = routeId;

			} else {
				alert("Load view Salary form error.Please try again. Error code is "
						+ request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["routeId"] = routeId;
	loading();
	request.open("GET",
			"getRouteByLocation?input=" + JSON.stringify(parameter), true);
	request.send(null);
}
function saleFromRoute(element, routeBoId) {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var routeId = element.id;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				if (routeId == "") {
					$('#salesDate').datepicker({
						dateFormat : 'dd/mm/yy'
					});
					document.getElementById("salesDate").value = today();
					$('#salesDate').focus();

				} else {
					var startDate = document.getElementById(element.id
							+ 'startdate').innerHTML;
					var endDate = document.getElementById(element.id
							+ 'enddate').innerHTML;
					$('#salesDate').datepicker({
						dateFormat : 'dd/mm/yy',
						changeYear : true,
						changeMonth : true,
						minDate : new Date(startDate),
						maxDate : new Date(endDate)
					});

				}
				// document.getElementById("market-sales").className="show";
				// document.getElementById("market-route-requirement").className="hide";
				// document.getElementById("market-route-information").className="show";

				// document.getElementById("saleMarketRoute").innerHTML =
				// routeId;
			} else {
				alert("Load view Salary form error.Please try again. Error code is "
						+ request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["routeId"] = routeId;
	loading();
	request.open("GET",
			"getRouteByLocation?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function RecalculateCommission(element) {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var routeId = element.id;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				loadAction(document.getElementById("locationmenu"), 'location');
				document.getElementById("search-text").value = locationId;
				search(this, 'ID', 'LOCATION');
				this.id = detailLocId;
				aboutDetail(this, 'LOCATION');
			} else {
				alert("Load Recalculate Commission form error.Please try again. Error code is "
						+ request.status);
			}
		}
	};
	var parameter = {};
	parameter["routeId"] = routeId;
	loading();
	request.open("GET", "recalculateCommission?input="
			+ JSON.stringify(parameter), true);
	request.send(null);
}

function issueStockToRoute(element) {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var routeId = element.id;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				var startDate = document.getElementById(element.id
						+ 'startdate').innerHTML;
				var endDate = document.getElementById(element.id + 'enddate').innerHTML;
				$('#issue-Date').datepicker({
					dateFormat : 'dd/mm/yy',
					changeYear : true,
					changeMonth : true,
					minDate : new Date(startDate),
					maxDate : new Date(endDate)
				});

			} else {
				alert("Load view Issue form error.Please try again. Error code is "
						+ request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["routeId"] = routeId;
	loading();
	request.open("GET", "getIssueStockForm?input=" + JSON.stringify(parameter),
			true);
	request.send(null);
}

function closeZayCarRoute(element) {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var routeId = element.id;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				loadAction(document.getElementById("locationmenu"), 'location');
				document.getElementById("search-text").value = locationId;
				search(this, 'ID', 'LOCATION');
				this.id = detailLocId;
				aboutDetail(this, 'LOCATION');
			} else {
				alert("Load view ZayCar Route form error.Please try again. Error code is "
						+ request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["routeId"] = routeId;
	loading();
	request.open("GET", "closeZayCareRoute?input=" + JSON.stringify(parameter),
			true);
	request.send(null);
}

function viewStockList(element) {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var routeId = element.id;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
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
	loading();
	request.open("GET", "getRouteStockListForm?input="
			+ JSON.stringify(parameter), true);
	request.send(null);
}