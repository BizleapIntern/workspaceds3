function getReturnProductInformation(event,row){
	if (event.which == 13 || event.keyCode == 13 || event.which == 9
			|| event.keyCode == 9) {
	var productName = document.getElementById("return_product_name_lst");
	var productPrice = document.getElementById("return_product_price_lst");
	console.log("ProductPrice" , productPrice);
	var productDiscount= document.getElementById("return_product_discounted_1st");
	var productCategory= document.getElementById("return_product_category_1st");
	var index = -1;
	var d = row.parentNode.parentNode.rowIndex - 1;
	for (var i = 0; i < return_productList.options.length; i++) {
		if (return_productList.options[i].value == document.getElementsByName("return-product-boId")[d].value) {
			index = i;
			break;
		}
	}
	if (index == -1) {
		alert("Please choose correct Product Code!");
		$(row).addClass("required");
		var id = row.parentNode.parentNode.id;
		errors[id] = "error";
		return false;
	}
	var name = productName.options[index].value;
	var price = productPrice.options[index].value;
	var priceName = price.split(";");	
	console.log("PriceName ",priceName);
	var select = $(document.getElementsByName("return_product_price")[d]);
	$(select).empty();
	for(var i=0;i<(priceName.length-1);i++){
		var priceNameString=priceName[i].split(",");
		 var option = $(document.createElement("OPTION"));
		option.text(priceName[i]);
		option.val(priceNameString[1]);
		 select.append(option);
	} 
	var discount= productDiscount.options[index].value;
	var category= productCategory.options[index].value;
	document.getElementsByName("return_product_name")[d].innerHTML = name;
	//document.getElementsByName("return_product_price")[d].innerHTML = price;
	document.getElementsByName("return_product_discounted")[d].innerHTML = discount;
	document.getElementsByName("return_product_category")[d].innerHTML= category;
	document.getElementsByName("return_product_qty")[d].focus();
	$(row).removeClass("required");
	var id = row.parentNode.parentNode.id;
	if (errors[id])
		delete errors[id];
	return false;
	}
}

function editPurchaseOrderForm(element){
	locationId=document.getElementById("detail-customer-location-id").innerHTML;
	var customerId = document.getElementById("detail-customer-boId").innerHTML;
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
				//document.getElementById("editDate").value = today();
				var fullName = document.getElementById("detail-customer-name")
				.getElementsByTagName('span')[0].innerHTML
				+ ' '
				+ document.getElementById("detail-customer-name")
						.getElementsByTagName('span')[1].innerHTML
				+ ' '
				+ document.getElementById("detail-customer-name")
						.getElementsByTagName('span')[2].innerHTML
				+ ' '
				+ document.getElementById("detail-customer-name")
						.getElementsByTagName('span')[3].innerHTML;
		document.getElementById("edit-customer-name").innerHTML = fullName;
		document.getElementById("edit-customer-type").innerHTML=document.getElementById("detail-customer-customerType").innerHTML;
		document.getElementById("detail-location-type-Daily").innerHTML=document.getElementById("detail-location-type").innerHTML;
		document.getElementById("salesInvoice").value=document.getElementById(element.id + 'invoice').innerHTML;
			} else {
				alert("Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["customerId"] = customerId;
	parameter["purchaseOrdeId"] = element.id;
	loading();
	request.open("GET", "editPurchaseOrderForm?input=" + JSON.stringify(parameter),
			true);
	request.send(null);
}

function checkTotaleditKey(event,element){
	element = $(element);
	var tr = element.parent().parent();
	var qty = tr.children("td[name=edit_NameQty]").children("input").val();
	var price=tr.children("td[name=edit_NamePrice]").children("span").text();
	tr.children("td[name=edit_NameTotal]").children("span").text(qty*price);
	
	var totalNewList=document.getElementsByName("dailySalestotal");
	
	
	var totalList=tr.children("td[name=edit_NameTotal]");
	console.log("TotalList",totalList);
	var totalValue=0;
	console.log(parseInt(totalList[1].innerHTML));
	for(var i=1;i<totalList.length;i++){
		totalValue+=parseInt(totalList[i].innerHTML);
	}
	console.log(totalValue);
	//document.getElementById("dailysales-total").innerHTML=totalValue;
}


function checkTotaleditKeyNew(event,element){
	var qty = $(element).val();
	var tr = $(element).parent().parent().parent();
	var price=tr.children("td[name=dailySalesProductPrice]").children("select[name=productAllPrice]").val();
	//var price=tr.children("td[name=dailySalesProductPrice]").children("input").val();
	tr.children("td").children("span[name=dailySalestotal]").text(qty*price);
}


function checkReturnEnterKey(event){
if (event.which == 13 || event.keyCode == 13) {
		var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
		addRow("retrun-detail-purchaseOrder");
		return false;
	}
	return true;
}
function saveReturnList(description,force) {
	var custBoId = document.getElementById("return_customerId").innerHTML;
	var locationId = document.getElementById("return-location-id").innerHTML;
	var request = new XMLHttpRequest;
	var parameter = {};
	parameter["return-Date"] = document.getElementById("return-Date").value;
	parameter["customerId"] = custBoId;
	parameter["locationId"] = locationId;
	parameter["purchaseOrderId"] = document.getElementById("return_boId").innerHTML;
    parameter["returnInvoice"]=document.getElementById("salesInvoice").value;
	if(force){
	parameter["force"]=force;
	}
	var table = document.getElementById("retrun-detail-purchaseOrder");
	var rowCount = table.rows.length;
	var returnCodeList=[];
	var rejectCodeList=[];
	var returnPriceList=[];
	var rejectPriceList=[];
	var rejectPromotionList=[];
	var returnPromotionList=[];
	var returnQtyList=[];
	var rejectQtyList=[];
	for(var i=1;i<rowCount;i++){
		var pcode="";
		if(table.rows[i].cells[0].childNodes[0].getAttribute('type')=='search')
			pcode = table.rows[i].cells[0].childNodes[0].value;
		else
			pcode = table.rows[i].cells[0].childNodes[0].innerHTML;

		var promotion = "0";
		if (table.rows[i].cells[4].childNodes[0].getAttribute('type') == 'number')
			promotion = table.rows[i].cells[4].childNodes[0].value.trim() ? table.rows[i].cells[4].childNodes[0].value
					.trim()
					: "0";
		var returnQty;
		var reject;
		if(document.getElementById("return_invoice_no").innerHTML=='Opening b/f' || document.getElementById("return_invoice_no").innerHTML=='opening b/f' ){
			returnQty = $("input", $("td",$(table.rows[i]))[6]).val();
			reject = table.rows[i].cells[8].childNodes[0].checked;
			
		}else{
			returnQty = $("input", $("td",$(table.rows[i]))[7]).val();
			reject = table.rows[i].cells[9].childNodes[0].checked;
		}
		var returnPrice="0";
		//if (returnQty > 0) {
			if(returnQty != 'undefined'){	
				if(document.getElementById("return_invoice_no").innerHTML=='Opening b/f' || document.getElementById("return_invoice_no").innerHTML=='opening b/f' ){
					promotion= $("input", $("td",$(table.rows[i]))[4]).val();
					returnPrice= $("select",$("td",$(table.rows[i]))[2]).val();
				}else{
					promotion=$("span", $("td",$(table.rows[i]))[4]).text();
				    returnPrice=$("span",$("td",$(table.rows[i]))[2]).text();
				}
				var qty = returnQty?returnQty:"0";
				if (reject == false && qty>0){
					returnCodeList.push(pcode);
					returnQtyList.push(qty);
					returnPromotionList.push(promotion?promotion:"0");
					returnPriceList.push(returnPrice);
				}
				else if(reject==true && qty>0){
					rejectCodeList.push(pcode);
				    rejectQtyList.push(qty);
				    rejectPromotionList.push(promotion?promotion:"0");
				    rejectPriceList.push(returnPrice);
				}		    
		}
	}
	
	/*var returnList = {};
	var rejectList = {};
	var promotionList={};
	for (var i = 1; i < rowCount; i++) {
		var pcode="";
		if(table.rows[i].cells[0].childNodes[0].getAttribute('type')=='search')
			pcode = table.rows[i].cells[0].childNodes[0].value;
		else
			pcode = table.rows[i].cells[0].childNodes[0].innerHTML;

		var promotion = "0";
		if (table.rows[i].cells[4].childNodes[0].getAttribute('type') == 'number')
			promotion = table.rows[i].cells[4].childNodes[0].value.trim() ? table.rows[i].cells[4].childNodes[0].value
					.trim()
					: "0";
		var returnQty;
		var reject;
		if(document.getElementById("return_invoice_no").innerHTML=='Opening b/f' || document.getElementById("return_invoice_no").innerHTML=='opening b/f' ){
			returnQty = $("input", $("td",$(table.rows[i]))[6]).val();
			reject = table.rows[i].cells[8].childNodes[0].checked;
			
		}else{
			returnQty = $("input", $("td",$(table.rows[i]))[7]).val();
			reject = table.rows[i].cells[9].childNodes[0].checked;
		}		
  
		if (returnQty > 0) {
			if(returnQty != 'undefined'){	
				if(document.getElementById("return_invoice_no").innerHTML=='Opening b/f' || document.getElementById("return_invoice_no").innerHTML=='opening b/f' ){
					promotionList[pcode] = $("input", $("td",$(table.rows[i]))[4]).val();
				}else{
					promotionList[pcode] = $("span", $("td",$(table.rows[i]))[4]).text();
				}
				
				var qty = parseInt(returnQty);
				if (reject == false){
					(returnList[pcode]==null)?returnList[pcode]=qty:returnList[pcode]+=qty;
				}
				else
					(rejectList[pcode] ==null)? rejectList[pcode] =qty : rejectList[pcode] +=qty;
			}
		}
	}	
	if (returnList.length == 0 && rejectList.length == 0) {
		alert("There is no return and reject quantity.");
		return;
	}
	parameter["returnList"] = returnList;
	parameter["rejectList"] = rejectList;
    console.log("PromotionList" , promotionList);
	parameter["promotionList"] = promotionList;*/
	parameter["returnCodeList"] = returnCodeList;
	parameter["rejectCodeList"] = rejectCodeList;
	parameter["returnPriceList"]=returnPriceList;
	parameter["rejectPriceList"]=rejectPriceList;
	parameter["returnPromotionList"] = returnPromotionList;
	parameter["rejectPromotionList"] = rejectPromotionList;
	parameter["returnQtyList"] = returnQtyList;
	parameter["rejectQtyList"] = rejectQtyList;
    console.log("parameter" , parameter);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
			    var result=document.createElement("div");
				result.innerHTML=request.responseText;
				result=$(result).children("span").text();
				if(result=="ERROR")
					{
					var r=confirm("This InvoiceNo. is already exist.If you want to save,click 'OK'.");
					if(r==true){
					saveReturnList(description,"forced");
					}
					else{
					$('#salesInvoice').focus();
					}
					return;
					}
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("customermenu"), 'customer');
				document.getElementById("search-text").value = custBoId;
				search(this, 'ID', 'CUSTOMER');
				this.id = custBoId;
				aboutDetail(this, 'CUSTOMER');

			} else {
				alert("Load Return form error.Please try again. Error code is "
						+ request.status);
			}
		}
	};
	if (Object.keys(errors).length > 0) {
		alert("Please choose correct product Code.")
		return;
	}
	loading();
	request.open("GET", "saveReturnList?input=" + JSON.stringify(parameter),
		true);
    request.send();
	return;
}