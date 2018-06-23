function Stock() {

}

var errors = {};
function getNewForm(entityType) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").attributes["class"].value = "dialog";
				if (Object.keys(errors).length > 0)
					errors = {};
				if (entityType == 'EMPLOYEE') {
					$('#add_employee_name').focus();
					$('#add_employee_dob').datepicker({
						dateFormat : 'dd/mm/yy'
					});
					$('#add_employee_entranceDate').datepicker({
						dateFormat : 'dd/mm/yy'
					});
					document.getElementById("add_employee_entranceDate").value = today();
				} else if (entityType == 'CUSTOMER') {
					$('#add_customer_name').focus();
					$('#add_customer_dob').datepicker({
						dateFormat : 'dd/mm/yy'
					});
					$('#add_customer_openingDate').datepicker({
						dateFormat : 'dd/mm/yy'
					});
					document.getElementById("add_customer_openingDate").value = today();
				} else if (entityType == 'LOCATION') {
					$('#add_location_openingDate').datepicker({
						dateFormat : 'dd/mm/yy'
					});
					$('#add_location_name').focus();
					document.getElementById("add_location_openingDate").value = today();
				} else if (entityType == 'PRODUCT') {
					$('#add_product_boId_code').focus();
				} else {
				}

			} else {
				alert("Load New Form error.Please try again. Error code is " + request.status);
			}
		}
	};
	loading();
	var parameter = {};
	request.open("GET", "getNewForm/" + entityType + "?input=" + JSON.stringify(parameter), true);
	request.send();
}

function customerAdjForm() {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				document.getElementById("customer_adj_location").innerHTML = document.getElementById("detail-customer-location").innerHTML;
				$('#customer_adj_Date').datepicker({
					dateFormat : 'dd/mm/yy'
				});
				document.getElementById("customer_adj_Date").focus();
				document.getElementById("customer_adj_customername").innerHTML = document.getElementById("detail-customer-name").innerHTML;
				document.getElementById("customer_adj_customerId").innerHTML = document.getElementById("detail-customer-boId").innerHTML;
			}
		}
	};
	loading();
	request.open("GET", "getcustomerAdjForm?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function editForm(entityType) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").attributes["class"].value = "dialog";
				if (Object.keys(errors).length > 0)
					errors = {};
				if (entityType == 'PRODUCT') {
					document.getElementById("add_product_code").value = document.getElementById("detail-product-boId").innerHTML;
					document.getElementById("add_product_boId_code").value = document.getElementById("detail-product-boId-code").innerHTML;
					document.getElementById("add_product_location").value = document.getElementById("detail-product-locatin-boId").innerHTML;
					$('#add_product_code').focus();
					document.getElementById("add_product_name").value = document.getElementById("detail-product-name").innerHTML;
					document.getElementById("add_product_price").value = document.getElementById("detail-product-price").innerHTML;
					document.getElementById("add_product_category").value = document.getElementById("detail-product-category").innerHTML;
					document.getElementById("add_product_creditPrice").value = document.getElementById("detail-product-creditPrice").innerHTML;
					document.getElementById("add_product_specialPrice").value = document.getElementById("detail-product-specialPrice").innerHTML;
					document.getElementById("add_product_zayCarPrice").value = document.getElementById("detail-product-zayCarPrice").innerHTML;
					document.getElementById("add_product_mandalayPrice").value = document.getElementById("detail-product-MandalayPrice").innerHTML;
					var discounted = document.getElementById("detail-product-discounted").innerHTML;
					if (discounted == 'true')
						document.getElementById("add_product_discounted").checked = true;

					document.getElementById("add_product_boId_code").disabled = "true";
					document.getElementById("add_product_location").disabled = "true";

					document.getElementById("product_header").innerHTML = "Edit Product Form";
					document.getElementById("add-newform-save").value = "Edit";
					document.getElementById("newProductactionForm").action = "javascript:addEditProduct('contentEdit');";
				} else if (entityType == 'EMPLOYEE') {
					$('#add_employee_dob').datepicker({
						dateFormat : 'dd/mm/yy'
					});
					$('#add_employee_entranceDate').datepicker({
						dateFormat : 'dd/mm/yy'
					});
					document.getElementById("add_employee_boId").innerHTML = document.getElementById("detail-employee-boId").innerHTML;
					var fullName = document.getElementById("detail-employee-name").getElementsByTagName('span')[0].innerHTML + ' ' + document.getElementById("detail-employee-name").getElementsByTagName('span')[1].innerHTML + ' ' + document.getElementById("detail-employee-name").getElementsByTagName('span')[2].innerHTML + ' ' + document.getElementById("detail-employee-name").getElementsByTagName('span')[3].innerHTML;
					document.getElementById("add_employee_name").value = fullName;
					$('#add_employee_name').focus();
					document.getElementById("add_employee_position").value = document.getElementById("detail-employee-position").innerHTML;
					document.getElementById("add_employee_baseSalary").value = document.getElementById("detail-employee-baseSalary").innerHTML;
					document.getElementById("add_employee_putaSideAmount").value = document.getElementById("detail-employee-putaSideAmount").innerHTML;
					document.getElementById("add_employee_nrc").value = document.getElementById("detail-employee-nrc").innerHTML;
					if (document.getElementById("detail-employee-date-of-birth") != null)
						document.getElementById("add_employee_dob").value = document.getElementById("detail-employee-date-of-birth").innerHTML;
					document.getElementById("add_employee_education").value = document.getElementById("detail-employee-education").innerHTML;
					document.getElementById("add_employee_atm").value = document.getElementById("detail-employee-atm").innerHTML;
					if (document.getElementById("detail-employee-entrance-date") != null)
						document.getElementById("add_employee_entranceDate").value = document.getElementById("detail-employee-entrance-date").innerHTML;
					document.getElementById("add_employee_location").value = document.getElementById("detail-employee-location-id").innerHTML;
					document.getElementById("add_employee_email").value = document.getElementById("detail-employee-email").innerHTML;
					document.getElementById("add_employee_phoneNumber").value = document.getElementById("detail-employee-phone-number").innerHTML;
					document.getElementById("add_employee_addressLine1").value = document.getElementById("detail-employee-address-line1").innerHTML;
					document.getElementById("add_employee_addressLine2").value = document.getElementById("detail-employee-address-line2").innerHTML;
					document.getElementById("add_employee_city").value = document.getElementById("detail-employee-city").innerHTML;
					document.getElementById("add_employee_state").value = document.getElementById("detail-employee-state").innerHTML;
					document.getElementById("add_employee_country").value = document.getElementById("detail-employee-country").innerHTML;
					document.getElementById("add_employee_postalCode").value = document.getElementById("detail-employee-postalCode").innerHTML;
					// document.getElementById("add_employee_location").disabled
					// = "true";
					document.getElementById("employee_header").innerHTML = "Edit Employee Form";
					document.getElementById("add-newform-save").value = "Edit";
					document.getElementById("newEmployeeForm").action = "javascript:addEditEmployee('contentEdit');";
				} else if (entityType == 'CUSTOMER') {
					if (document.getElementById("isOpening-DateandAmount")) {
						document.getElementById("add_customer_openingDate").value = document.getElementById("purchaseOrder-openingDate").innerHTML;
						document.getElementById("add_customer_openingBalance").value = document.getElementById("purchaseOrder-openingNetAmount").innerHTML;
						document.getElementById("add_customer_remark").value = document.getElementById("purchaseOrder-openingRemark").innerHTML;
					}
					$('#add_customer_dob').datepicker({
						dateFormat : 'dd/mm/yy'
					});
					$('#add_customer_openingDate').datepicker({
						dateFormat : 'dd/mm/yy'
					});

					document.getElementById("add_customer_boId").innerHTML = document.getElementById("detail-customer-boId").innerHTML;
					var fullName = document.getElementById("detail-customer-name").getElementsByTagName('span')[0].innerHTML + ' ' + document.getElementById("detail-customer-name").getElementsByTagName('span')[1].innerHTML + ' ' + document.getElementById("detail-customer-name").getElementsByTagName('span')[2].innerHTML + ' ' + document.getElementById("detail-customer-name").getElementsByTagName('span')[3].innerHTML;
					document.getElementById("add_customer_name").value = fullName;
					$('#add_customer_name').focus();
					document.getElementById("add_customer_nrc").value = document.getElementById("detail-customer-nrc").innerHTML;
					if (document.getElementById("detail-customer-date-of-birth") != null)
						document.getElementById("add_customer_dob").value = document.getElementById("detail-customer-date-of-birth").innerHTML;
					document.getElementById("add_customer_location").value = document.getElementById("detail-customer-location-id").innerHTML;
					document.getElementById("add_customer_email").value = document.getElementById("detail-customer-email").innerHTML;
					document.getElementById("add_customer_phoneNumber").value = document.getElementById("detail-customer-phone-number").innerHTML;
					document.getElementById("add_customer_addressLine1").value = document.getElementById("detail-customer-address-line1").innerHTML;
					document.getElementById("add_customer_addressLine2").value = document.getElementById("detail-customer-address-line2").innerHTML;
					document.getElementById("add_customer_city").value = document.getElementById("detail-customer-city").innerHTML;
					document.getElementById("add_customer_state").value = document.getElementById("detail-customer-state").innerHTML;
					document.getElementById("add_customer_country").value = document.getElementById("detail-customer-country").innerHTML;
					document.getElementById("add_customer_postalCode").value = document.getElementById("detail-customer-postalCode").innerHTML;
					document.getElementById("add_customer_Type").value = document.getElementById("detail-customer-customerType").innerHTML;
					document.getElementById("customer_header").innerHTML = "Edit Customer Form";
					document.getElementById("add-newform-save").value = "Edit";
					document.getElementById("newCustomerForm").action = "javascript:addEditCustomer('contentEdit');";
				} else if (entityType == 'LOCATION') {
					$('#add_location_openingDate').datepicker({
						dateFormat : 'dd/mm/yy'
					});

					if (document.getElementById("detail-location-openingDate") != null) {
						console.log("")
						document.getElementById("add_location_openingDate").value = document.getElementById("detail-location-openingDate").innerHTML;
						document.getElementById("add_location_openingDate").disabled = true;
					}
					document.getElementById("add_location_boId").innerHTML = document.getElementById("detail-location-boId").innerHTML;
					document.getElementById("add_location_name").value = document.getElementById("detail-location-name").innerHTML;
					$('#add_location_name').focus();
					// document.getElementById("new_edit_table").className="show";
					document.getElementById("add_location_type").value = document.getElementById("detail-location-type").innerHTML;
					if (document.getElementById("add_location_type").value == "RETAIL") {
						var codeChanged = document.getElementById("detail-location-codeChanged").innerHTML;
						if (codeChanged == 'true') {
							document.getElementById("new_edit_table").className = "show";
							document.getElementById("add_location_codeChanged").checked = true;
						} else {
							document.getElementById("new_edit_table").className = "hide";
						}
					} else {
						document.getElementById("new_edit_table").className = "hide";
					}
					document.getElementById("add_location_type").disabled = true;
					document.getElementById("customer_header").innerHTML = "Edit Location Form";
					document.getElementById("add-newform-save").value = "Edit";
					document.getElementById("newLocationForm").action = "javascript:addEditLocation('contentEdit');";

				} else if (entityType == 'VOLUMEPRODUCT') {
					document.getElementById("add_product_code").value = document.getElementById("detail-product-boId").innerHTML;
					document.getElementById("add_product_code").disabled = true;
					document.getElementById("add_product_name").value = document.getElementById("detail-product-name").innerHTML;
					$('#add_product_name').focus();
					var discount = document.getElementById("detail-product-discounted").innerHTML;
					if (discount == "true")
						document.getElementById("add_product_discounted").checked = true;
					else
						document.getElementById("add_product_discounted").checked = false;
					var detailmin = document.getElementById("volumeprice_table").querySelectorAll("#detail_volume_min");
					var detailmax = document.getElementById("volumeprice_table").querySelectorAll("#detail_volume_max");
					var detailprice = document.getElementById("volumeprice_table").querySelectorAll("#detail_volume_price");
					for (var j = 0; j < detailmin.length; j++)
						addVolumeRow('volumeproduct');
					var inputmin = document.getElementById("volumeproduct").querySelectorAll("#volumeproduct_min");
					var inputmax = document.getElementById("volumeproduct").querySelectorAll("#volumeproduct_max");
					var inputprice = document.getElementById("volumeproduct").querySelectorAll("#volumeproduct_price");
					for (var i = 0; i < detailmin.length; i++) {
						inputmin[i + 1].value = detailmin[i].innerHTML;
						inputmax[i + 1].value = detailmax[i].innerHTML;
						inputprice[i + 1].value = detailprice[i].innerHTML;
					}
					document.getElementById("product_header").innerHTML = "Edit Volume Product Form";
					document.getElementById("add-newform-save").value = "Edit";
					document.getElementById("new_volume_product_form").action = "javascript:addNewVolumeProduct('contentEdit');";

				} else {
				}

			} else {
				alert("Load New Form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	if (entityType == 'LOCATION') {
		parameter['locationBoId'] = $("#detail-location-boId").text();
	}
	loading();
	request.open("GET", "getNewForm/" + entityType + "?input=" + JSON.stringify(parameter), true);
	request.send();
}

function checkLocationType() {
	var type = document.getElementById("add_location_type").value;
	if (type == "RETAIL")
		document.getElementById("add_location_codeChanged").disabled = false;
	else {
		document.getElementById("add_location_codeChanged").disabled = true;
		document.getElementById("add_location_codeChanged").checked = false;
	}
}

function checkCodeChange() {
	var codeCheck = document.getElementById("add_location_codeChanged").checked;
	if (codeCheck)
		$("#code-check").addClass("hide");
	else
		$("#code-check").removeClass("hide");

}

function loadOpeningData() {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				loadAction(document.getElementById("locationmenu"), 'location');
			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	parameter["add_location_boId"] = document.getElementById("detail-location-boId").innerHTML;
	parameter["fileName"] = "10st.txt";
	console.log(parameter);
	request.open("POST", "loadOpeningDataForLocation?input=" + JSON.stringify(parameter), true);
	request.send();
}

function deleteForm(entityType) {
	document.getElementById("confirm-text").innerHTML = "Are you sure you want to delete?";
	document.getElementById("confirm").attributes["class"].value = "dialog";
	document.getElementById("confirm-delete").attributes["onclick"].value = "deleteConfirm('" + entityType + "');";
}
function deleteConfirm(entityType) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("confirm").attributes["class"].value = "hide";
				if (entityType == "CUSTOMER") {
					document.getElementById("search-text").value = document.getElementById("detail-customer-location").innerHTML;
					search(this, 'LOCATION_NAME', entityType);
				} else if (entityType == "EMPLOYEE") {
					document.getElementById("search-text").value = document.getElementById("detail-employee-location").innerHTML;
					search(this, 'LOCATION_NAME', entityType);
				} else {
					search(this, 'ALL', entityType);
				}

			} else {
				alert("Delete error return :" + request.status);
			}
		}

	};
	var parameter = {};
	if (entityType == "EMPLOYEE") {
		parameter["boId"] = document.getElementById("detail-employee-boId").innerHTML;
	} else if (entityType == "LOCATION") {
		parameter["boId"] = document.getElementById("detail-location-boId").innerHTML;
	} else if (entityType == "CUSTOMER") {
		parameter["boId"] = document.getElementById("detail-customer-boId").innerHTML;
	} else if (entityType == "PRODUCT") {
		parameter["boId"] = document.getElementById("detail-product-boId").innerHTML;
	} else {
	}
	console.log(parameter);
	request.open("DELETE", "delete/" + entityType + "?input=" + JSON.stringify(parameter), true);
	request.send();
	loading();

}
function addNewProduct(description) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = JSON.parse(request.responseText);
				if (result.status == 'ERROR') {
					alert("Error : product code is already existed.")
				} else {
					alert("Successfully Recorded!");
					document.getElementById("add_product_boId_code").value = "";
					document.getElementById("add_product_name").value = "";
					document.getElementById("add_product_price").value = "";
					document.getElementById("add_product_creditPrice").value = "";
					document.getElementById("add_product_specialPrice").value = "";
					document.getElementById("add_product_zayCarPrice").value = "";
					document.getElementById("add_product_mandalayPrice").value = "";
					// document.getElementById("add_product_creditPrice").value
					// = "";
					// document.getElementById("add_product_specialPrice").value
					// = "";
					document.getElementById("add_product_discounted").checked = false;
					document.getElementById("add_product_location").selectedIndex = 0;
					document.getElementById("add_product_boId_code").focus();
				}
			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["add_product_code"] = document.getElementById("add_product_boId_code").value.trim();
	parameter["add_product_name"] = document.getElementById("add_product_name").value.trim();
	parameter["add_product_price"] = document.getElementById("add_product_price").value.trim().replace(",", "");
	parameter["add_product_category"] = document.getElementById("add_product_category").value.trim();
	var creditPrice = document.getElementById("add_product_creditPrice");
	parameter["add_product_creditPrice"] = creditPrice.value.trim().replace(",", "") ? creditPrice.value.trim().replace(",", "") : "0";
	var specialPrice = document.getElementById("add_product_specialPrice");
	parameter["add_product_specialPrice"] = specialPrice.value.trim().replace(",", "") ? specialPrice.value.trim().replace(",", "") : "0";
	parameter["add_product_zayCarPrice"] = document.getElementById("add_product_zayCarPrice").value.trim().replace(",", "") ? document.getElementById("add_product_zayCarPrice").value.trim().replace(",", "") : "0";
	parameter["add_product_mandalayPrice"] = document.getElementById("add_product_mandalayPrice").value.trim().replace(",", "") ? document.getElementById("add_product_mandalayPrice").value.trim().replace(",", "") : "0";
	parameter["add_product_discounted"] = document.getElementById("add_product_discounted").checked;
	parameter["productPrefix"] = document.getElementById("add_product_location").value;

	console.log(parameter);
	loading();
	request.open("POST", "saveNewProduct?input=" + JSON.stringify(parameter), true);
	request.send();
}
function addEditProduct(description) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = JSON.parse(request.responseText);
				if (result.status == 'ERROR') {
					alert("Error : product code is already existed.")
				} else {
					document.getElementById("dialog-temp").attributes["class"].value = "hide";
					loadAction(document.getElementById("productmenu"), 'product');
					document.getElementById("search-text").value = document.getElementById("add_product_code").value.trim();
					search(this, 'ID', 'PRODUCT');
					this.id = document.getElementById("add_product_code").value;
					aboutDetail(this, 'PRODUCT');
				}
			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["old_product_code"] = document.getElementById("detail-product-boId").innerHTML;
	// parameter["add_product_code"] =
	// document.getElementById("add_product_boId_code").value
	// .trim();

	parameter["add_product_name"] = document.getElementById("add_product_name").value.trim();
	parameter["add_product_price"] = document.getElementById("add_product_price").value.trim().replace(",", "");
	parameter["add_product_category"] = document.getElementById("add_product_category").value.trim();
	var creditPrice = document.getElementById("add_product_creditPrice");
	parameter["add_product_creditPrice"] = creditPrice.value.trim().replace(",", "") ? creditPrice.value.trim().replace(",", "") : "0";
	var specialPrice = document.getElementById("add_product_specialPrice");
	parameter["add_product_specialPrice"] = specialPrice.value.trim().replace(",", "") ? specialPrice.value.trim().replace(",", "") : "0";
	parameter["add_product_zayCarPrice"] = document.getElementById("add_product_zayCarPrice").value.trim().replace(",", "") ? document.getElementById("add_product_zayCarPrice").value.trim().replace(",", "") : "0";
	parameter["add_product_mandalayPrice"] = document.getElementById("add_product_mandalayPrice").value.trim().replace(",", "") ? document.getElementById("add_product_mandalayPrice").value.trim().replace(",", "") : "0";

	parameter["add_product_discounted"] = document.getElementById("add_product_discounted").checked;
	// parameter["productPrefix"] =
	// document.getElementById("add_product_location").value;
	console.log(parameter);
	loading();
	request.open("POST", "saveEditProduct?input=" + JSON.stringify(parameter), true);
	request.send();
}

function addNewEmployee(description) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = document.createElement("div");
				result.innerHTML = request.responseText;
				result = $(result).children("span").text();
				if (result == "ERROR") {
					alert("Check Your Employee Position");
					return;
				}
				alert("Successfully record");
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("employeemenu"), 'employee');
				$("#addEmployee").click();
			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["add_employee_name"] = document.getElementById("add_employee_name").value.trim();
	parameter["add_employee_position"] = document.getElementById("add_employee_position").value.trim();
	parameter["add_employee_baseSalary"] = document.getElementById("add_employee_baseSalary").value.trim() ? document.getElementById("add_employee_baseSalary").value.trim() : "0";
	parameter["add_employee_putaSideAmount"] = document.getElementById("add_employee_putaSideAmount").value.trim() ? document.getElementById("add_employee_putaSideAmount").value.trim() : "0";
	parameter["add_employee_nrc"] = document.getElementById("add_employee_nrc").value.trim();
	parameter["add_employee_dob"] = document.getElementById("add_employee_dob").value.trim();
	parameter["add_employee_education"] = document.getElementById("add_employee_education").value.trim();
	parameter["add_employee_atm"] = document.getElementById("add_employee_atm").value.trim();
	parameter["add_employee_entranceDate"] = document.getElementById("add_employee_entranceDate").value.trim();
	parameter["add_employee_location"] = document.getElementById("add_employee_location").value.trim();
	parameter["add_employee_email"] = document.getElementById("add_employee_email").value.trim();
	parameter["add_employee_phoneNumber"] = document.getElementById("add_employee_phoneNumber").value.trim();
	parameter["add_employee_addressLine1"] = document.getElementById("add_employee_addressLine1").value.trim();
	parameter["add_employee_addressLine2"] = document.getElementById("add_employee_addressLine2").value.trim();
	parameter["add_employee_city"] = document.getElementById("add_employee_city").value.trim();
	parameter["add_employee_state"] = document.getElementById("add_employee_state").value.trim();
	parameter["add_employee_country"] = document.getElementById("add_employee_country").value.trim();
	parameter["add_employee_postalCode"] = document.getElementById("add_employee_postalCode").value.trim();
	console.log(parameter);
	loading();
	request.open("POST", "saveNewEmployee?input=" + JSON.stringify(parameter), true);
	request.send();
}
function addEditEmployee(description) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = document.createElement("div");
				result.innerHTML = request.responseText;
				result = $(result).children("span").text();
				if (result == "ERROR") {
					alert("Check Your Employee Position");
					return;
				}
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				this.id = document.getElementById("add_employee_boId").innerHTML;
				aboutDetail(this, 'EMPLOYEE');
				// loadAction(document.getElementById("employeemenu"),
				// 'employee');
			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["add_employee_boId"] = document.getElementById("add_employee_boId").innerHTML;
	parameter["add_employee_name"] = document.getElementById("add_employee_name").value.trim();
	parameter["add_employee_position"] = document.getElementById("add_employee_position").value.trim();
	parameter["add_employee_baseSalary"] = document.getElementById("add_employee_baseSalary").value.trim() ? document.getElementById("add_employee_baseSalary").value.trim() : "0";
	parameter["add_employee_putaSideAmount"] = document.getElementById("add_employee_putaSideAmount").value.trim() ? document.getElementById("add_employee_putaSideAmount").value.trim() : "0";
	parameter["add_employee_nrc"] = document.getElementById("add_employee_nrc").value.trim();
	parameter["add_employee_dob"] = document.getElementById("add_employee_dob").value.trim();
	parameter["add_employee_education"] = document.getElementById("add_employee_education").value.trim();
	parameter["add_employee_atm"] = document.getElementById("add_employee_atm").value.trim();
	parameter["add_employee_entranceDate"] = document.getElementById("add_employee_entranceDate").value.trim();
	parameter["add_employee_location"] = document.getElementById("add_employee_location").value.trim();
	parameter["add_employee_email"] = document.getElementById("add_employee_email").value.trim();
	parameter["add_employee_phoneNumber"] = document.getElementById("add_employee_phoneNumber").value.trim();
	parameter["add_employee_addressLine1"] = document.getElementById("add_employee_addressLine1").value.trim();
	parameter["add_employee_addressLine2"] = document.getElementById("add_employee_addressLine2").value.trim();
	parameter["add_employee_city"] = document.getElementById("add_employee_city").value.trim();
	parameter["add_employee_state"] = document.getElementById("add_employee_state").value.trim();
	parameter["add_employee_country"] = document.getElementById("add_employee_country").value.trim();
	parameter["add_employee_postalCode"] = document.getElementById("add_employee_postalCode").value.trim();
	console.log(parameter);
	loading();
	request.open("POST", "saveEditEmployee?input=" + JSON.stringify(parameter), true);
	request.send();
}
function addNewCustomer(description) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				$("#addCustomer").click();
			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["add_customer_name"] = document.getElementById("add_customer_name").value.trim();
	parameter["add_customer_nrc"] = document.getElementById("add_customer_nrc").value.trim();
	parameter["add_customer_Type"] = document.getElementById("add_customer_Type").value.trim();
	parameter["add_customer_dob"] = document.getElementById("add_customer_dob").value.trim();
	parameter["add_customer_location"] = document.getElementById("add_customer_location").value.trim();
	parameter["add_customer_email"] = document.getElementById("add_customer_email").value.trim();
	parameter["add_customer_phoneNumber"] = document.getElementById("add_customer_phoneNumber").value.trim();
	parameter["add_customer_addressLine1"] = document.getElementById("add_customer_addressLine1").value.trim();
	parameter["add_customer_addressLine2"] = document.getElementById("add_customer_addressLine2").value.trim();
	parameter["add_customer_city"] = document.getElementById("add_customer_city").value.trim();
	parameter["add_customer_state"] = document.getElementById("add_customer_state").value.trim();
	parameter["add_customer_country"] = document.getElementById("add_customer_country").value.trim();
	parameter["add_customer_postalCode"] = document.getElementById("add_customer_postalCode").value.trim();
	// opening balance
	parameter["add_customer_openingDate"] = document.getElementById("add_customer_openingDate").value.trim();
	if (document.getElementById("add_customer_Type").value.trim() == 'RETAIL') {
		parameter["add_customer_openingBalance"] = "0";
	} else {
		parameter["add_customer_openingBalance"] = document.getElementById("add_customer_openingBalance").value.trim() ? document.getElementById("add_customer_openingBalance").value.trim() : "0";
	}
	parameter["add_customer_remark"] = document.getElementById("add_customer_remark").value.trim();

	console.log(parameter);
	loading();
	request.open("POST", "saveNewCustomer?input=" + JSON.stringify(parameter), true);
	request.send();
}
function addEditCustomer(description) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("customermenu"), 'customer');
				document.getElementById("search-text").value = document.getElementById("add_customer_boId").innerHTML;
				search(this, 'ID', 'CUSTOMER');
				this.id = document.getElementById("add_customer_boId").innerHTML;
				aboutDetail(this, 'CUSTOMER');
			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["add_customer_boId"] = document.getElementById("add_customer_boId").innerHTML;
	parameter["add_customer_name"] = document.getElementById("add_customer_name").value.trim();
	parameter["add_customer_nrc"] = document.getElementById("add_customer_nrc").value.trim();
	parameter["add_customer_type"] = document.getElementById("add_customer_Type").value.trim();
	parameter["add_customer_dob"] = document.getElementById("add_customer_dob").value.trim();
	parameter["add_customer_location"] = document.getElementById("add_customer_location").value.trim();
	parameter["add_customer_email"] = document.getElementById("add_customer_email").value.trim();
	parameter["add_customer_phoneNumber"] = document.getElementById("add_customer_phoneNumber").value.trim();
	parameter["add_customer_addressLine1"] = document.getElementById("add_customer_addressLine1").value.trim();
	parameter["add_customer_addressLine2"] = document.getElementById("add_customer_addressLine2").value.trim();
	parameter["add_customer_city"] = document.getElementById("add_customer_city").value.trim();
	parameter["add_customer_state"] = document.getElementById("add_customer_state").value.trim();
	parameter["add_customer_country"] = document.getElementById("add_customer_country").value.trim();
	parameter["add_customer_postalCode"] = document.getElementById("add_customer_postalCode").value.trim();
	// opening balance
	parameter["add_customer_openingDate"] = document.getElementById("add_customer_openingDate").value.trim();
	if (document.getElementById("add_customer_Type").value.trim() == "RETAIL") {
		parameter["add_customer_openingBalance"] = "0";
	} else {
		parameter["add_customer_openingBalance"] = document.getElementById("add_customer_openingBalance").value.trim() ? document.getElementById("add_customer_openingBalance").value.trim() : "0";
	}
	parameter["add_customer_remark"] = document.getElementById("add_customer_remark").value.trim();

	console.log(parameter);
	loading();
	request.open("POST", "saveEditCustomer?input=" + JSON.stringify(parameter), true);
	request.send();
}
function addNewLocation(description) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				window.location.reload();
				loadAction(document.getElementById("locationmenu"), 'location');
			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	if (Object.keys(errors).length > 0) {
		alert("Please choose correct product Code.")
		return;
	}
	var parameter = {};
	parameter["add_location_name"] = document.getElementById("add_location_name").value.trim();
	parameter["add_location_type"] = document.getElementById("add_location_type").value.trim();

	var openingDate = document.getElementById("add_location_openingDate").value;
	var boIdList = document.getElementsByName("add-location-product-boId");
	// var alterCodeList =
	// document.getElementsByName("add_location_alternate_productcode");
	var qtyList = document.getElementsByName("add_location_product_qty");
	var productList = {};
	// var productCodeList = {};
	for (var i = 1; i < boIdList.length; i++) {
		var value = parseInt(qtyList[i].value.trim() ? qtyList[i].value.trim() : 0);
		// var alterCode = alterCodeList[i].value.trim() ?
		// alterCodeList[i].value.trim(): "";

		if (value != 0) {
			if ((boIdList[i].value.trim() in productList)) {
				productList[boIdList[i].value.trim()] += value;
			} else {
				productList[boIdList[i].value.trim()] = value;
			}
		}

		// productList[boIdList[i].value] = qtyList[i].value;

		// productCodeList[boIdList[i].value.trim()]= alterCode;

	}
	parameter["codeChanged"] = document.getElementById("add_location_codeChanged").checked;
	parameter["productList"] = productList;
	parameter["openingDate"] = openingDate;
	parameter["remark"] = document.getElementById("add_location_remark").value;
	// parameter["productCodeList"]= productCodeList;
	console.log(parameter);
	loading();
	request.open("POST", "saveNewLocation?input=" + JSON.stringify(parameter), true);
	request.send();
}
function addEditLocation(description) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("locationmenu"), 'location');
				document.getElementById("search-text").value = document.getElementById("add_location_boId").innerHTML;
				search(this, 'ID', 'LOCATION');
				this.id = document.getElementById("add_location_boId").innerHTML;
				aboutDetail(this, 'LOCATION');
				var updateSeletedPorder = $("#porderlocationname option[value=" + this.id + "]");
				var updateSeletedSalary = $("#salarylocation option[value=" + this.id + "]");
				updateSeletedPorder[0].innerHTML = parameter["add_location_name"];
				updateSeletedSalary[0].innerHTML = parameter["add_location_name"];
			} else {
				alert("Error return :" + request.status);
			}
		}
	};

	if (Object.keys(errors).length > 0) {
		alert("Please choose correct product Code.")
		return;
	}

	var parameter = {};
	parameter["add_location_boId"] = document.getElementById("add_location_boId").innerHTML;
	parameter["add_location_name"] = document.getElementById("add_location_name").value.trim();
	parameter["add_location_type"] = document.getElementById("add_location_type").value.trim();

	var openingDate = document.getElementById("add_location_openingDate").value;
	var boIdList = document.getElementsByName("add_location_productcode");
	// var alterCodeList = document
	// .getElementsByName("add_location_alternate_productcode");
	var qtyList = document.getElementsByName("add_location_product_qty");
	var productCodeList = {};
	var productList = {};
	for (var i = 1; i < boIdList.length; i++) {
		var value = parseInt(qtyList[i].value.trim() ? qtyList[i].value.trim() : 0);
		// var alterCode = alterCodeList[i].value.trim() ?
		// alterCodeList[i].value
		// .trim() : "";
		if (value != 0) {
			if ((boIdList[i].value.trim() in productList)) {
				productList[boIdList[i].value.trim()] += value;
			} else {
				productList[boIdList[i].value.trim()] = value;
			}
		}
		// productList[boIdList[i].value] = qtyList[i].value;
		// productCodeList[boIdList[i].value.trim()] = alterCode;

	}
	parameter["productList"] = productList;
	parameter["openingDate"] = openingDate;
	// parameter["productCodeList"] = productCodeList;
	parameter["remark"] = document.getElementById("add_location_remark").value;
	console.log(parameter);
	loading();
	request.open("POST", "saveEditLocation?input=" + JSON.stringify(parameter), true);
	request.send();
}

function getStockList(description) {
	var table = document.getElementById("transfer-table");
	var rowCount = table.rows.length;
	if (rowCount > 1) {
		for (var i = 1; i < rowCount; i++) {
			var pcode = table.rows[i].cells[0].childNodes[0].innerHTML;
			if (pcode == document.getElementById("transfer-from-loc-stock-code").value) {
				alert("Already inserted in transfer stock list!");
				document.getElementById("transfer-quantity").disabled = true;
				document.getElementById("transfer-button").disabled = true;
				// document.getElementById("transfer-dialog-button").disabled =
				// true;

			} else {
				var index = document.getElementById("transfer-from-loc-stock-code").selectedIndex;
				document.getElementById("transfer-from-loc-stock-name").value = document.getElementById("transfer-from-loc-stock-name").options[index].value;
				document.getElementById("transfer-from-loc-stock-price").value = document.getElementById("transfer-from-loc-stock-price").options[index].value;
				if (description == 'stock') {
					document.getElementById("transfer-from-loc-stock-qty").value = document.getElementById("transfer-from-loc-stock-qty").options[index].value;
					document.getElementById("transfer-quantity").max = document.getElementById("transfer-from-loc-stock-qty").value;
				}

				document.getElementById("transfer-quantity").value = "";
				document.getElementById("transfer-quantity").disabled = false;
				document.getElementById("transfer-button").disabled = true;
			}
		}
	} else {
		var index = document.getElementById("transfer-from-loc-stock-code").selectedIndex;
		document.getElementById("transfer-from-loc-stock-name").value = document.getElementById("transfer-from-loc-stock-name").options[index].value;
		document.getElementById("transfer-from-loc-stock-price").value = document.getElementById("transfer-from-loc-stock-price").options[index].value;
		if (description == 'stock') {
			document.getElementById("transfer-from-loc-stock-qty").value = document.getElementById("transfer-from-loc-stock-qty").options[index].value;
			document.getElementById("transfer-quantity").max = document.getElementById("transfer-from-loc-stock-qty").value;
		}
		document.getElementById("transfer-quantity").value = "";
		document.getElementById("transfer-quantity").disabled = false;
		document.getElementById("transfer-button").disabled = true;
	}
}

function routeAdjustmentStockForm(element) {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				var endDate = document.getElementById(element.id + 'enddate').innerHTML;
				$('#adjustment-Date').datepicker({
					dateFormat : 'dd/mm/yy',
					changeYear : true,
					changeMonth : true,
					minDate : new Date(endDate)
				});

				// document.getElementById("adjustment-Date").value = today();
			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["routeId"] = element.id;
	loading();
	request.open("GET", "getAdjustmentStockForm?input=" + JSON.stringify(parameter), true);
	request.send(null);

}

function adjustmentStockForm() {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";

				$('#adjustment-Date').datepicker({
					dateFormat : 'dd/mm/yy'
				});
				// document.getElementById("adjustment-Date").value = today();
			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["routeId"] = "";
	loading();
	request.open("GET", "getAdjustmentStockForm?input=" + JSON.stringify(parameter), true);
	request.send(null);

}

function editReportAdjustmentStock() {
	var locationId = document.getElementById("adjustment-location-id").innerHTML;
	// var detailLocId =
	// document.getElementById("detail-location-boId").innerHTML;
	var route = document.getElementById("adjustment-route-id").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
			}
		}
	};
	var boIdList = document.getElementsByName("adjustmentStock_boIdList9");
	// var editboIdList = $("[name=add-adjustment-product-boId-extra1]");
	var editboIdList = $("[name=adjustmentStock_boIdList1]");
	var qtyList = document.getElementsByName("origin_valueList");
	var groundList = $("[name=edit-adjustmentStock_groundList]");
	var eqtyList = document.getElementsByName("origin_valueList1");
	var egroundList = $("[name=edit-adjustmentStock_groundList1]");
	var ee = document.getElementsByName("adjustmentStock_boIdList1");
	var productBoIdList = [];
	var productEditBoIdList = [];
	var productGroundQtyList = [];
	var productEditGroundQtyList = [];
	for (var i = 0; i < boIdList.length; i++) {
		productBoIdList.push(boIdList[i].innerHTML.trim());
		productGroundQtyList.push(parseInt(groundList[i].value.trim() ? groundList[i].value.trim() : "0"));
	}
	for (var i = 1; i < editboIdList.length; i++) {
		productEditBoIdList.push(editboIdList[i].innerHTML.trim());
		productEditGroundQtyList.push(egroundList[i].value.trim() ? egroundList[i].value.trim() : "0");
	}
	var parameter = {};
	parameter["productEditBoIdList"] = productEditBoIdList;
	parameter["productBoIdList"] = productBoIdList;
	parameter["productGroundQtyList"] = productGroundQtyList;
	parameter["productEditGroundQtyList"] = productEditGroundQtyList;
	parameter["locationId"] = locationId;
	parameter["adjustment-Date"] = document.getElementById("adjustment-Date").value;
	parameter["route"] = route;
	parameter["adjustmentBoId"] = document.getElementById("editAjdustmentBoId").innerHTML;
	console.log("Parameter ", parameter);
	loading();
	request.open("GET", "editReportAdjustmentStock?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function editAdjustmentStock() {
	var locationId = document.getElementById("adjustment-location-id").innerHTML;
	var detailLocId = document.getElementById("detail-location-boId").innerHTML;
	var route = document.getElementById("adjustment-route-id").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				if (route == "") {
					loadAction(document.getElementById("locationmenu"), 'location');
					document.getElementById("search-text").value = locationId;
					search(this, 'ID', 'LOCATION');
					this.id = locationId;
					aboutDetail(this, 'LOCATION');
				} else {
					loadAction(document.getElementById("locationmenu"), 'location');
					document.getElementById("search-text").value = detailLocId;
					search(this, 'ID', 'LOCATION');
					this.id = detailLocId;
					aboutDetail(this, 'LOCATION');
				}
			} else {
				alert("Load Adjustment form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["adjustment-Date"] = document.getElementById("adjustment-Date").value;
	parameter["route"] = route;
	parameter["detailLocId"] = detailLocId;
	var boIdList = document.getElementsByName("adjustmentStock_boIdList");
	// var editboIdList = $("[name=add-adjustment-product-boId-extra1]");
	var editboIdList = $("[name=adjustmentStock_boIdList1]");
	var qtyList = document.getElementsByName("origin_valueList");
	var groundList = $("[name=edit-adjustmentStock_groundList]");
	var eqtyList = document.getElementsByName("origin_valueList1");
	var egroundList = $("[name=edit-adjustmentStock_groundList1]");
	var ee = document.getElementsByName("adjustmentStock_boIdList1");
	var productBoIdList = [];
	var productEditBoIdList = [];
	var productGroundQtyList = [];
	var productEditGroundQtyList = [];

	for (var i = 0; i < boIdList.length; i++) {
		productBoIdList.push(boIdList[i].innerHTML.trim());
		productGroundQtyList.push(parseInt(groundList[i].value.trim() ? groundList[i].value.trim() : "0"));
	}
	for (var i = 1; i < editboIdList.length; i++) {
		productEditBoIdList.push(editboIdList[i].innerHTML.trim());
		productEditGroundQtyList.push(egroundList[i].value.trim() ? egroundList[i].value.trim() : "0");
	}
	parameter["productEditBoIdList"] = productEditBoIdList;
	parameter["productBoIdList"] = productBoIdList;
	parameter["productGroundQtyList"] = productGroundQtyList;
	parameter["productEditGroundQtyList"] = productEditGroundQtyList;
	parameter["description"] = document.getElementById("remark-adjustment-text").value ? document.getElementById("remark-adjustment-text").value : "";
	parameter["discount"] = document.getElementById("discount-adjustment").value ? document.getElementById("discount-adjustment").value : "0";
	console.log("parameter ", parameter);
	loading();
	request.open("GET", "editAdjustmentStock?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function closeAdjustment() {
	var locationId = document.getElementById("adjustment-location-id").innerHTML;
	var detailLocId = document.getElementById("detail-location-boId").innerHTML;
	var route = document.getElementById("adjustment-route-id").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = document.createElement("div");
				result.innerHTML = request.responseText;
				result = $(result).children("span").text();
				if (result == "checkTransation") {
					alert("Please change date,There are one or more transactions after this adjustment date!");
					//alert("ကျေးဇူးပြု၍ Date ပြောင်းပေးပါ။Adjustment ရဲ့နောက်ပိုင်းတွင် transactions များရှိနေပါသည်။");
					return;
				}
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				if (route == "") {
					loadAction(document.getElementById("locationmenu"), 'location');
					document.getElementById("search-text").value = locationId;
					search(this, 'ID', 'LOCATION');
					this.id = locationId;
					aboutDetail(this, 'LOCATION');
				} else {
					loadAction(document.getElementById("locationmenu"), 'location');
					document.getElementById("search-text").value = detailLocId;
					search(this, 'ID', 'LOCATION');
					this.id = detailLocId;
					aboutDetail(this, 'LOCATION');
				}
			} else {
				alert("Load Adjustment form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["adjustment-Date"] = document.getElementById("adjustment-Date").value;
	parameter["route"] = route;
	parameter["detailLocId"] = detailLocId;
	var boIdList = document.getElementsByName("adjustmentStock_boIdList");
	var editboIdList = $("[name=adjustmentStock_boIdList1]");
	/* var qtyList = document.getElementsByName("origin_valueList"); */
	var groundList = $("[name=edit-adjustmentStock_groundList]");
	/* var eqtyList = document.getElementsByName("origin_valueList1"); */
	var egroundList = $("[name=edit-adjustmentStock_groundList1]");
	var ee = document.getElementsByName("adjustmentStock_boIdList1");

	var productBoIdList = [];
	var productEditBoIdList = [];
	var productGroundQtyList = [];
	var productEditGroundQtyList = [];
	for (var i = 0; i < boIdList.length; i++) {
		productBoIdList.push(boIdList[i].innerHTML.trim());
		productGroundQtyList.push(parseInt(groundList[i].value.trim() ? groundList[i].value.trim() : "0"));
	}
	for (var i = 1; i < editboIdList.length; i++) {
		productEditBoIdList.push(editboIdList[i].innerHTML.trim());
		productEditGroundQtyList.push(egroundList[i].value.trim() ? egroundList[i].value.trim() : "0");
	}
	parameter["productEditBoIdList"] = productEditBoIdList;
	parameter["productBoIdList"] = productBoIdList;
	parameter["productGroundQtyList"] = productGroundQtyList;
	parameter["productEditGroundQtyList"] = productEditGroundQtyList;
	parameter["description"] = document.getElementById("remark-adjustment-text").value ? document.getElementById("remark-adjustment-text").value : "";
	parameter["discount"] = document.getElementById("discount-adjustment").value ? document.getElementById("discount-adjustment").value : "0";
	console.log(parameter);
	loading();
	request.open("GET", "closeAdjustmentStock?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function saveAdjustmentStock() {
	var locationId = document.getElementById("adjustment-location-id").innerHTML;
	var detailLocId = document.getElementById("detail-location-boId").innerHTML;
	var route = document.getElementById("adjustment-route-id").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				if (route == "") {
					loadAction(document.getElementById("locationmenu"), 'location');
					document.getElementById("search-text").value = locationId;
					search(this, 'ID', 'LOCATION');
					this.id = locationId;
					aboutDetail(this, 'LOCATION');
				} else {
					loadAction(document.getElementById("locationmenu"), 'location');
					document.getElementById("search-text").value = detailLocId;
					search(this, 'ID', 'LOCATION');
					this.id = detailLocId;
					aboutDetail(this, 'LOCATION');
				}

			} else {
				alert("Load Adjustment form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["adjustment-Date"] = document.getElementById("adjustment-date-span").innerHTML;
	parameter["route"] = route;
	parameter["detailLocId"] = detailLocId;

	var boIdList = document.getElementsByName("adjustmentStock_boIdList");
	// var qtyList = document.getElementsByName("origin_valueList");
	var groundList = document.getElementsByName("adjustmentStock_groundList");
	// var adjList = document.getElementsByName("adjustmentStock_valueList");
	var productBoIdList = [];
	var productGroundList = [];
	var productAdjList = [];
	var productQtyList = [];
	for (var i = 0; i < boIdList.length; i++) {
		productBoIdList.push(boIdList[i].innerHTML.trim());
		productGroundList.push(groundList[i].innerHTML.trim() ? groundList[i].innerHTML.trim() : 0);
		// productAdjList.push(adjList[i].innerHTML.trim() ?
		// adjList[i].innerHTML.trim(): 0);
		// productQtyList.push(qtyList[i].innerHTML.trim() ?
		// qtyList[i].innerHTML.trim() : 0);
	}
	parameter["productBoIdList"] = productBoIdList;
	parameter["productGroundList"] = productGroundList;
	parameter["description"] = document.getElementById("remark-adjustment-text").innerHTML ? document.getElementById("remark-adjustment-text").innerHTML : "";
	parameter["discount"] = document.getElementById("discount-adjustment").innerHTML ? document.getElementById("discount-adjustment").innerHTML : "0";
	// parameter["productAdjList"] =productAdjList;
	// parameter["productQtyList"] =productQtyList;
	console.log(parameter);
	loading();
	request.open("GET", "saveAdjustmentStock?input=" + JSON.stringify(parameter), true);
	request.send(null);

}
function calculateGroundStock() {
	var locationId = document.getElementById("adjustment-location-id").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = document.createElement("div");
				result.innerHTML = request.responseText;
				result = $(result).children("span").text();
				if (result == "ERROR") {
					alert("Please change date,There are one or more transactions after this adjustment date!");
					//alert("ကျေးဇူးပြု၍ Date ပြောင်းပေးပါ။Adjustment ရဲ့နောက်ပိုင်းတွင် transactions များရှိနေပါသည်။");
					return;
				} else {
					document.getElementById("dialog-temp").innerHTML = request.responseText;
					document.getElementById("dialog-temp").className = "dialog";
				}
			} else {
				alert("Load Adjustment form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["route"] = document.getElementById("adjustment-route-id").innerHTML;
	if (document.getElementById("adjustment-Date").value.trim() == null || document.getElementById("adjustment-Date").value.trim() == "") {
		$('#adjustment-Date').addClass("required");
		return;
	}
	$('#adjustment-Date').removeClass("required");
	parameter["adjustment-Date"] = document.getElementById("adjustment-Date").value;
	var boIdList = document.getElementsByName("add-adjustment-product-boId");
	var qtyList = document.getElementsByName("add_adjustment_product_qty");
	var productBoIdList = [];
	var productQtyList = [];
	for (var i = 1; i < boIdList.length; i++) {
		productBoIdList.push(boIdList[i].value.trim());
		productQtyList.push(parseInt(qtyList[i].value.trim() ? qtyList[i].value.trim() : 0));
	}
	/*
	 * var productList = {}; for (var i = 1; i < boIdList.length; i++) { var
	 * value = parseInt(qtyList[i].value.trim() ? qtyList[i].value.trim() : 0);
	 * if (value != 0) { if ((boIdList[i].value.trim() in productList)) {
	 * productList[boIdList[i].value.trim()] += value; } else {
	 * productList[boIdList[i].value.trim()] = value; } } }
	 * parameter["productList"] = productList;
	 */
	parameter["description"] = document.getElementById("remark-adjustment-text").value ? document.getElementById("remark-adjustment-text").value : "";
	parameter["discount"] = document.getElementById("discount-adjustment").value ? document.getElementById("discount-adjustment").value : "0";
	parameter["productBoIdList"] = productBoIdList;
	parameter["productQtyList"] = productQtyList;
	console.log(parameter);
	loading();
	request.open("GET", "calculateGroundStock?input=" + JSON.stringify(parameter), true);
	request.send(null);
}
function saveIssueStockToRoute(force) {
	var route = document.getElementById("issue-location-id").innerHTML;
	var locationId = document.getElementById("issue-outlet-location-id").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = document.createElement("div");
				result.innerHTML = request.responseText;
				result = $(result).children("span").text();
				if (result == "ERROR") {
					var r = confirm("This InvoiceNo. is already exist.If you want to save, click 'OK'.");
					if (r == true) {
						saveIssueStockToRoute("forced");
					} else {
						$('#issueInvoice').focus();
					}
					return;
				}
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("locationmenu"), 'location');
				document.getElementById("search-text").value = locationId;
				search(this, 'ID', 'LOCATION');
				this.id = locationId;
				aboutDetail(this, 'LOCATION');

			} else {
				alert("Load Issue form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["route"] = route;
	if (document.getElementById("issue-Date").value.trim() == null || document.getElementById("issue-Date").value.trim() == "") {
		$('#issue-Date').addClass("required");
		return;
	}
	$('#issue-Date').removeClass("required");
	parameter["issue-Date"] = document.getElementById("issue-Date").value;
	parameter["issueInvoice"] = document.getElementById("issueInvoice").value;

	var boIdList = document.getElementsByName("add-issue-product-boId");
	var qtyList = document.getElementsByName("add_issue_product_qty");
	var productList = {};
	for (var i = 1; i < boIdList.length; i++) {
		var value = parseInt(qtyList[i].value.trim() ? qtyList[i].value.trim() : 0);
		if (value != 0) {
			if ((boIdList[i].value.trim() in productList)) {
				productList[boIdList[i].value.trim()] += value;
			} else {
				productList[boIdList[i].value.trim()] = value;
			}
		}

	}
	parameter["productList"] = productList;
	if (force) {
		parameter['force'] = force;
	}
	loading();
	request.open("GET", "saveIssueStockToRoute?input=" + JSON.stringify(parameter), true);
	request.send(null);

}

function checkTransferQuantity(description) {
	var value = document.getElementById("transfer-quantity").value.trim();
	value = Number(value);
	if (isNaN(value)) {
		return;
	}
	if (description == 'stock') {
		var maxValue = document.getElementById("transfer-from-loc-stock-qty").value;
		if (value > 0 && value <= maxValue) {
			console.log(maxValue + "success" + value);
			document.getElementById("transfer-button").disabled = false;
		} else {
			console.log(maxValue + "fail" + value);
			document.getElementById("transfer-button").disabled = true;
		}
	} else if (description == 'product') {
		if (value > 0)
			document.getElementById("transfer-button").disabled = false;

	} else {
	}
}
function totalTransferQty() {
	var table = document.getElementById("transfer-table");
	var rowCount = table.rows.length;
	var totalQty = 0;
	var totalAmt = 0;
	if (rowCount > 2) {
		for (var i = 1; i < rowCount - 1; i++) {
			var qty = table.rows[i].cells[3].childNodes[0].innerHTML;
			var amt = table.rows[i].cells[4].childNodes[0].innerHTML;
			totalQty += Number(qty);
			totalAmt += Number(amt);
		}
	}
	document.getElementById("transfer_totalQty").innerHTML = totalQty;
	document.getElementById("transfer_totalAmt").innerHTML = totalAmt;
}
function transferProductStock() {
	var table = document.getElementById("transfer-table");
	var rowCount = table.rows.length;
	if (rowCount > 2) {
		for (var i = 1; i < rowCount - 1; i++) {
			var pcode = table.rows[i].cells[0].childNodes[0].innerHTML;
			if (pcode == document.getElementById("transfer-from-loc-stock-code").value) {
				alert("Already inserted in transfer stock list!");
				return;
			}
		}
	}
	var colCount = table.rows[0].cells.length;
	var row = table.insertRow(rowCount - 1);
	for (var i = 0; i < 6; i++) {
		var newcell = row.insertCell(i);
		newcell.innerHTML = table.rows[0].cells[i].innerHTML;
		switch (i) {
			case 0 :
				newcell.childNodes[0].innerHTML = document.getElementById("transfer-from-loc-stock-code").value;
				break;
			case 1 :
				newcell.childNodes[0].innerHTML = document.getElementById("transfer-from-loc-stock-name").value;
				break;
			case 2 :
				newcell.childNodes[0].innerHTML = document.getElementById("transfer-from-loc-stock-price").value;
				break;
			case 3 :
				newcell.childNodes[0].innerHTML = document.getElementById("transfer-quantity").value;
				break;
			case 4 :
				newcell.childNodes[0].innerHTML = Number(document.getElementById("transfer-from-loc-stock-price").value) * Number(document.getElementById("transfer-quantity").value);
				break;
			case 5 :
				var element1 = document.createElement("input");
				element1.setAttribute('type', 'button');
				element1.setAttribute('id', rowCount - 1);
				element1.setAttribute('value', 'Edit');
				element1.setAttribute('onclick', 'editTransferRow(this)');
				newcell.appendChild(element1);
				var element2 = document.createElement("input");
				element2.setAttribute('type', 'button');
				element2.setAttribute('id', rowCount - 1);
				element2.setAttribute('value', 'Delete');
				element2.setAttribute('onclick', 'deleteTransferRow(this)');
				newcell.appendChild(element2);
		}
	}
	document.getElementById("transfer-dialog-button").disabled = false;
	totalTransferQty();
}
function editTransferRow(editRow) {
	var table = document.getElementById("transfer-table");
	document.getElementById("transfer-from-loc-stock-code").value = table.rows[editRow.id].cells[0].childNodes[0].innerHTML;
	var index = document.getElementById("transfer-from-loc-stock-code").selectedIndex;
	document.getElementById("transfer-from-loc-stock-name").value = table.rows[editRow.id].cells[1].childNodes[0].innerHTML;
	document.getElementById("transfer-from-loc-stock-price").value = table.rows[editRow.id].cells[2].childNodes[0].innerHTML;
	document.getElementById("transfer-from-loc-stock-qty").value = document.getElementById("transfer-from-loc-stock-qty").options[index].value;
	document.getElementById("transfer-quantity").value = table.rows[editRow.id].cells[3].childNodes[0].innerHTML;
	document.getElementById("transfer-button").value = "Update";
	table.rows[editRow.id].cells[5].childNodes[0].disabled = true;
	table.rows[editRow.id].cells[5].childNodes[1].disabled = true;
	// document.getElementById("transfer-dialog-button").disabled = true;
	document.getElementById("transfer-button").onclick = function() {
		table.rows[editRow.id].cells[0].childNodes[0].innerHTML = document.getElementById("transfer-from-loc-stock-code").value;
		table.rows[editRow.id].cells[1].childNodes[0].innerHTML = document.getElementById("transfer-from-loc-stock-name").value;
		table.rows[editRow.id].cells[2].childNodes[0].innerHTML = document.getElementById("transfer-from-loc-stock-price").value;
		table.rows[editRow.id].cells[3].childNodes[0].innerHTML = document.getElementById("transfer-quantity").value;
		table.rows[editRow.id].cells[4].childNodes[0].innerHTML = Number(document.getElementById("transfer-from-loc-stock-price").value) * Number(document.getElementById("transfer-quantity").value);
		table.rows[editRow.id].cells[5].childNodes[1].disabled = false;
		table.rows[editRow.id].cells[5].childNodes[0].disabled = false;
		document.getElementById("transfer-dialog-button").disabled = false;
		document.getElementById("transfer-button").value = "Transfer";
		document.getElementById("transfer-button").setAttribute('onclick', 'transferProductStock()');
		totalTransferQty();
	}
}
function deleteTransferRow(deleteRow) {
	try {
		var table = document.getElementById("transfer-table");
		var rowCount = table.rows.length;
		// table.deleteRow(deleteRow.id);
		var d = deleteRow.parentNode.parentNode.rowIndex;
		table.deleteRow(d);
		if (rowCount == 2)
			document.getElementById("transfer-dialog-button").disabled = true;
		totalTransferQty();
	} catch (e) {
		alert(e);
	}
}
function deleteRouteRow(deleteRow) {
	try {
		var table = document.getElementById("route-stock-table");
		// table.deleteRow(deleteRow.id);
		var d = deleteRow.parentNode.parentNode.rowIndex;
		table.deleteRow(d);
		var rowCount = table.rows.length;
		if (rowCount == 1)
			document.getElementById("route-dialog-button").disabled = true;
	} catch (e) {
		alert(e);
	}
}
function nextTransfer(force) {
	var fromLocation = document.getElementById("detail-location-boId").innerHTML.trim();
	var toLocation = document.getElementById("to-location").value;
	var date = document.getElementById("transfer-date").value.trim();
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = document.createElement("div");
				result.innerHTML = request.responseText;
				result = $(result).children("span").text();
				if (result == "ERROR") {
					var r = confirm("This InvoiceNo. is already exist.If you want to save, click 'OK'.");
					if (r == true) {
						nextTransfer("forced");
					} else {
						$('#transfer-Invoice').focus();
					}
					return;
				}
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";

			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	loading();
	var transferRecord = {};
	transferRecord['transfer-date'] = date;
	transferRecord['from-location'] = fromLocation;
	transferRecord['to-location'] = toLocation;
	transferRecord['transferInvoice'] = document.getElementById("transfer-Invoice").value;
	if (force) {
		transferRecord['force'] = force;
	}
	request.open("GET", "getTransferLocation?input=" + JSON.stringify(transferRecord), true);
	request.send(null);
}

function editSaveTransferStockList() {
	var fromLocation = document.getElementById("transfer-from-location").innerHTML.trim();

	var toLocation = document.getElementById("to-location").value;

	var date = document.getElementById("transfer-date").value;

	var table = document.getElementById("transfer-stock-table");
	var rowCount = table.rows.length;
	var stockList = [];
	var extraStockList = [];
	var stockQtyList = [];
	var transferRecord = {};
	var extraBoIdList = null;
	var boIdList = document.getElementsByName("transfer-product-boId");

	var qtyList = document.getElementsByName("transfer-product-qty");

	if (document.getElementById("transfer_code_check").innerHTML == 'true')
		extraBoIdList = document.getElementsByName("transfer-to-product-boId");

	for (var i = 0; i < boIdList.length - 1; i++) {
		stockList.push(boIdList[i + 1].value.trim());
		if (document.getElementById("transfer_code_check").innerHTML == 'true') {
			extraStockList.push(extraBoIdList[i + 1].value.trim());
		}
		var value = parseInt(qtyList[i + 1].value.trim() ? qtyList[i + 1].value.trim() : 0);
		stockQtyList.push(value);
	}

	transferRecord['transfer-date'] = date;
	transferRecord['from-location'] = fromLocation;
	transferRecord['to-location'] = toLocation;
	transferRecord['stockList'] = stockList;
	transferRecord['stockQtyList'] = stockQtyList;
	transferRecord['transferComment'] = document.getElementById("transferComment").value;
	transferRecord['boId'] = document.getElementById("transfer-BoId").innerHTML;
	transferRecord['transferInvoice'] = document.getElementById("transfer-invoice").value;
	transferRecord["locationId"] = document.getElementById("location-id").innerHTML;

	if (document.getElementById("transfer_code_check").innerHTML == 'true') {
		transferRecord['extraStockList'] = extraStockList;
		console.log(transferRecord['extraStockList']);
	}
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = document.createElement("div");
				result.innerHTML = request.responseText;
				result = $(result).children("span").text();
				alert("Editing Transfer is Successfully Recorded!");
				searchFirst();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";

			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	loading();
	request.open("GET", "editSaveTransferStockList?input=" + JSON.stringify(transferRecord), true);
	request.send(null);
}

function saveTransferStockList() {
	var fromLocation = document.getElementById("transfer-from-location").innerHTML.trim();
	var toLocation = document.getElementById("transfer-to-location").innerHTML.trim();
	var date = document.getElementById("transfer-date").innerHTML.trim();
	var request = new XMLHttpRequest;
	var table = document.getElementById("transfer-stock-table");
	var rowCount = table.rows.length;
	/*
	 * var stockList = {}; var extraStockList = {}; var transferRecord = {}; var
	 * extraBoIdList = null;
	 */
	var stockList = [];
	var extraStockList = [];
	var stockQtyList = [];
	var transferRecord = {};
	var extraBoIdList = null;
	var boIdList = document.getElementsByName("transfer-product-boId");
	if (boIdList.length < 2) {
		alert("There is no stock list.");
		return;
	}
	for (var h = 1; h < boIdList.length; h++) {
		if (boIdList[h].value.trim() == "" || errors.length > 0) {
			alert("Check Your code,it is wrong.");
			return;
		}
	}
	if (document.getElementById("transfer_code_check").innerHTML == 'true') {
		extraBoIdList = document.getElementsByName("transfer-to-product-boId");
		for (var j = 1; j < extraBoIdList.length; j++) {
			if (extraBoIdList[j].value.trim() == "") {
				alert("Check Your code,it is  wrong.");
				/*
				 * var row = extraBoIdList[j]; console.log("ccc");
				 * $(row).addClass("required"); var id =
				 * row.parentNode.parentNode.id; errors[id] = "error";
				 */
				return;
			}
		}
	}
	var qtyList = document.getElementsByName("transfer-product-qty");
	if (document.getElementById("transfer_code_check").innerHTML == 'true')
		extraBoIdList = document.getElementsByName("transfer-to-product-boId");

	for (var i = 0; i < boIdList.length - 1; i++) {
		stockList.push(boIdList[i + 1].value.trim());
		if (document.getElementById("transfer_code_check").innerHTML == 'true') {
			extraStockList.push(extraBoIdList[i + 1].value.trim());
		}
		var value = parseInt(qtyList[i + 1].value.trim() ? qtyList[i + 1].value.trim() : 0);
		stockQtyList.push(value);
	}
	transferRecord['transfer-date'] = date;
	transferRecord['from-location'] = fromLocation;
	transferRecord['to-location'] = toLocation;
	transferRecord['stockList'] = stockList;
	transferRecord['stockQtyList'] = stockQtyList;
	transferRecord['transferComment'] = document.getElementById("transferComment").value;
	transferRecord['transferInvoice'] = document.getElementById("transfer-invoice").innerHTML;
	if (document.getElementById("transfer_code_check").innerHTML == 'true')
		transferRecord['extraStockList'] = extraStockList;
	// transferRecord['extra'] = codeChange;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = document.createElement("div");
				result.innerHTML = request.responseText;
				result = $(result).children("span").text();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				$("#transfer").click();
			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	if (Object.keys(errors).length > 0) {
		alert("Please choose correct product Code.")
		return;
	}
	loading();
	request.open("GET", "saveTransferStockList?input=" + JSON.stringify(transferRecord), true);
	request.send(null);
}

function saveCustomerAdj() {
	var customerId = document.getElementById("customer_adj_customerId").innerHTML;
	var request = new XMLHttpRequest;
	var parameter = {};
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("customermenu"), 'customer');
				document.getElementById("search-text").value = customerId;
				search(this, 'ID', 'CUSTOMER');
				this.id = customerId;
				aboutDetail(this, 'CUSTOMER');
			}
		}
	};
	parameter["customer_adj_Date"] = document.getElementById("customer_adj_Date").value;
	parameter["customer_adj_amount"] = document.getElementById("customer_adj_amount").value;
	parameter["customer_adj_Invoice"] = document.getElementById("customer_adj_Invoice").value;
	parameter["customer_adj_description"] = document.getElementById("customer_adj_description").value;
	parameter["customer_adj_customerId"] = customerId;
	console.log("Parameter", parameter);
	loading();
	request.open("GET", "saveCustomerAdj?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function savePayment(force) {
	var customerId = document.getElementById("payment_customerId").innerHTML;
	var force;
	var request = new XMLHttpRequest;
	var parameter = {};
	parameter["locationId"] = document.getElementById("paymet_location_id").innerHTML;
	parameter["customerId"] = customerId;
	parameter["paymentGeneral"] = document.getElementById("payment_general_amount").value.trim() ? document.getElementById("payment_general_amount").value.trim() : "0";
	parameter["paymentGeneralDiscount"] = document.getElementById("payment_general_discount_amount").value.trim() ? document.getElementById("payment_general_discount_amount").value.trim() : "0";
	parameter["paymentSwam"] = document.getElementById("payment_swam_amount").value.trim() ? document.getElementById("payment_swam_amount").value.trim() : "0";
	parameter["paymentGeneralCommission"] = document.getElementById("payment_general_amount_commission").value.trim() ? document.getElementById("payment_general_amount_commission").value.trim() : "0";
	parameter["paymentGeneralDiscountCommission"] = document.getElementById("payment_general_discount_amount_commission").value.trim() ? document.getElementById("payment_general_discount_amount_commission").value.trim() : "0";
	parameter["paymentSwamCommission"] = document.getElementById("payment_swam_amount_commission").value.trim() ? document.getElementById("payment_swam_amount_commission").value.trim() : "0";
	parameter["discountFalse"] = document.getElementById("discount_percent").value.trim() ? document.getElementById("discount_percent").value.trim() : "0";
	parameter["discountTrue"] = document.getElementById("discount_percent_true").value.trim() ? document.getElementById("discount_percent_true").value.trim() : "0";
	parameter["remark"] = document.getElementById("payment_remark").value;
	parameter["paymentDate"] = document.getElementById("payment_paymentDate").value;
	parameter["payInvoice"] = document.getElementById("payInvoice").value;
	parameter["generalDiscountFalseAmount"] = document.getElementById("general_amount_discount").innerHTML ? document.getElementById("general_amount_discount").innerHTML : "0";
	parameter["generalDiscountTrueAmount"] = document.getElementById("general_amount_discount_true").innerHTML ? document.getElementById("general_amount_discount_true").innerHTML : "0";
	if (document.getElementById("payment-Cash").checked == true) {
		parameter["paymentType"] = document.getElementById("payment-Cash").value;
	} else {
		parameter["paymentType"] = document.getElementById("payment-Bank").value;
	}
	parameter["purchaseOrderId"] = document.getElementById("payment_boId").innerHTML;
	if (force) {
		parameter["force"] = force;
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
						savePayment("forced");
					} else {
						$('#salesInvoice').focus();
					}
					return;
				}
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("customermenu"), 'customer');
				document.getElementById("search-text").value = customerId;
				search(this, 'ID', 'CUSTOMER');
				this.id = customerId;
				aboutDetail(this, 'CUSTOMER');
			} else {
				alert("Load payment form error.Please try again. Error code is " + request.status);
			}
		}
	};
	console.log("Parameter", parameter);
	loading();
	request.open("GET", "savePayment?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function OnDropDownChange(event) {
	var index = event.selectedIndex;
	document.getElementById("daily-sale-price").innerHTML = document.getElementById("daily-sale-priceList").options[index].value;
	document.getElementById("daily-sale-stock").innerHTML = document.getElementById("daily-sale-quantityList").options[index].value;

}
function loadRoutForm() {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				document.getElementById("route-location").innerHTML = document.getElementById("detail-location-name").innerHTML;
				$('#route-from-date').datepicker({
					dateFormat : 'dd/mm/yy'
				});
				$('#route-to-date').datepicker({
					dateFormat : 'dd/mm/yy'
				});
				document.getElementById("route-from-date").value = today();
				document.getElementById("route-to-date").value = today();
				document.getElementById("routecashallowance").value = document.getElementById("route-fieldTrip-cashAllowance").value;
				document.getElementById("routequota").value = document.getElementById("route-fieldTrip-saleQuota").value;

				document.getElementById("routecashDownSaleComm").value = document.getElementById("route-fieldTrip-cashDownSaleCommission").value;
				document.getElementById("routecreditSaleComm").value = document.getElementById("route-fieldTrip-creditSaleCommission").value;

				document.getElementById("routeDiscountCashDownSaleComm").value = document.getElementById("route-fieldTrip-discountCashDownSaleCommission").value;
				document.getElementById("routeDiscountCreditSaleComm").value = document.getElementById("route-fieldTrip-discountCreditSaleCommission").value;

				document.getElementById("routeShortFallFine").value = document.getElementById("route-fieldTrip-shortFallFine").value;
				document.getElementById("routeReturnFine").value = document.getElementById("route-fieldTrip-returnFine").value;

				document.getElementById("routeSwamCashDownSaleComm").value = document.getElementById("route-fieldTrip-cashDownSaleSwamCommission").value;
				document.getElementById("routeSwamCreditSaleComm").value = document.getElementById("route-fieldTrip-creditSaleSwamCommission").value;
				document.getElementById("routeSwamReturnFine").value = document.getElementById("route-fieldTrip-returnSwamFine").value;
				document.getElementById("routeDiscountReturnFine").value = document.getElementById("route-fieldTrip-returnDiscountFine").value;

			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	loading();
	request.open("GET", "createRouteForm?input=" + JSON.stringify(parameter), true);
	request.send(null);
}
function moveSelected(from, to) {
	$('#' + from + ' option:selected').remove().appendTo('#' + to);
}

function getLocationStockList(description) {
	var table = document.getElementById("route-stock-table");
	var rowCount = table.rows.length;
	if (rowCount > 1) {
		for (var i = 1; i < rowCount; i++) {
			var pcode = table.rows[i].cells[0].childNodes[0].innerHTML;
			if (pcode == document.getElementById("route-loc-stock-code").value) {
				alert("Already inserted in route stock list!");
				document.getElementById("route-quantity").disabled = true;
				document.getElementById("route-button").disabled = true;
				// document.getElementById("route-dialog-button").disabled =
				// true;

			} else {
				var index = document.getElementById("route-loc-stock-code").selectedIndex;
				document.getElementById("route-loc-stock-name").value = document.getElementById("route-loc-stock-name").options[index].value;
				document.getElementById("route-loc-stock-qty").value = document.getElementById("route-loc-stock-qty").options[index].value;
				document.getElementById("route-quantity").max = document.getElementById("route-loc-stock-qty").value;
				document.getElementById("route-quantity").value = "";
				document.getElementById("route-quantity").disabled = false;
				document.getElementById("route-button").disabled = true;
			}
		}
	} else {
		var index = document.getElementById("route-loc-stock-code").selectedIndex;
		document.getElementById("route-loc-stock-name").value = document.getElementById("route-loc-stock-name").options[index].value;
		document.getElementById("route-loc-stock-qty").value = document.getElementById("route-loc-stock-qty").options[index].value;
		document.getElementById("route-quantity").max = document.getElementById("route-loc-stock-qty").value;
		document.getElementById("route-quantity").value = "";
		document.getElementById("route-quantity").disabled = false;
		document.getElementById("route-button").disabled = true;
	}

}
function transferRouteStock() {
	var table = document.getElementById("route-stock-table");
	var rowCount = table.rows.length;
	if (rowCount > 1) {
		for (var i = 1; i < rowCount; i++) {
			var pcode = table.rows[i].cells[0].childNodes[0].innerHTML;
			if (pcode == document.getElementById("route-loc-stock-code").value) {
				alert("Already inserted in stock list!");
				return;
			}
		}
	}
	var colCount = table.rows[0].cells.length;
	var row = table.insertRow(rowCount);
	for (var i = 0; i < 4; i++) {
		var newcell = row.insertCell(i);
		newcell.innerHTML = table.rows[0].cells[i].innerHTML;
		switch (i) {
			case 0 :
				newcell.childNodes[0].innerHTML = document.getElementById("route-loc-stock-code").value;
				break;
			case 1 :
				newcell.childNodes[0].innerHTML = document.getElementById("route-loc-stock-name").value;
				break;
			case 2 :
				newcell.childNodes[0].innerHTML = document.getElementById("route-quantity").value;
				break;
			case 3 :
				var element1 = document.createElement("input");
				element1.setAttribute('type', 'button');
				element1.setAttribute('id', rowCount);
				element1.setAttribute('value', 'Edit');
				element1.setAttribute('onclick', 'editRouteRow(this)');
				newcell.appendChild(element1);
				var element2 = document.createElement("input");
				element2.setAttribute('type', 'button');
				element2.setAttribute('id', rowCount);
				element2.setAttribute('value', 'Delete');
				element2.setAttribute('onclick', 'deleteRouteRow(this)');
				newcell.appendChild(element2);
		}
	}
	document.getElementById("route-dialog-button").disabled = false;

}
function editRouteRow(editRow) {
	var table = document.getElementById("route-stock-table");
	document.getElementById("route-loc-stock-code").value = table.rows[editRow.id].cells[0].childNodes[0].innerHTML;
	document.getElementById("route-loc-stock-name").value = table.rows[editRow.id].cells[1].childNodes[0].innerHTML;
	document.getElementById("route-quantity").value = table.rows[editRow.id].cells[2].childNodes[0].innerHTML;
	document.getElementById("route-button").value = "Update";
	table.rows[editRow.id].cells[3].childNodes[0].disabled = true;
	table.rows[editRow.id].cells[3].childNodes[1].disabled = true;
	document.getElementById("route-button").onclick = function() {
		table.rows[editRow.id].cells[0].childNodes[0].innerHTML = document.getElementById("route-loc-stock-code").value;
		table.rows[editRow.id].cells[1].childNodes[0].innerHTML = document.getElementById("route-loc-stock-name").value;
		table.rows[editRow.id].cells[2].childNodes[0].innerHTML = document.getElementById("route-quantity").value;
		table.rows[editRow.id].cells[3].childNodes[1].disabled = false;
		table.rows[editRow.id].cells[3].childNodes[0].disabled = false;
		document.getElementById("route-button").value = "Add";
		document.getElementById("route-button").setAttribute('onclick', 'transferRouteStock()');
	}
}
function checkRouteQuantity(description) {
	var value = document.getElementById("route-quantity").value.trim();
	value = Number(value);
	if (isNaN(value)) {
		return;
	}
	if (description == 'stock') {
		var maxValue = document.getElementById("route-loc-stock-qty").value;
		if (value > 0 && value <= maxValue) {
			console.log(maxValue + "success" + value);
			document.getElementById("route-button").disabled = false;
		} else {
			console.log(maxValue + "fail" + value);
			document.getElementById("route-button").disabled = true;
		}
	} else {
	}
}
function getFieldTripAllowance() {
	var index = document.getElementById("route-fieldTrip-allowance").selectedIndex;

	document.getElementById("routecashallowance").value = document.getElementById("route-fieldTrip-cashAllowance").options[index].value;
	document.getElementById("routequota").value = document.getElementById("route-fieldTrip-saleQuota").options[index].value;
	document.getElementById("routecashDownSaleComm").value = document.getElementById("route-fieldTrip-cashDownSaleCommission").options[index].value;
	document.getElementById("routecreditSaleComm").value = document.getElementById("route-fieldTrip-creditSaleCommission").options[index].value;
	document.getElementById("routeShortFallFine").value = document.getElementById("route-fieldTrip-shortFallFine").options[index].value;
	document.getElementById("routeReturnFine").value = document.getElementById("route-fieldTrip-returnFine").options[index].value;
	document.getElementById("routeDiscountCashDownSaleComm").value = document.getElementById("route-fieldTrip-discountCashDownSaleCommission").options[index].value;
	document.getElementById("routeDiscountCreditSaleComm").value = document.getElementById("route-fieldTrip-discountCreditSaleCommission").options[index].value;

	document.getElementById("routeSwamCashDownSaleComm").value = document.getElementById("route-fieldTrip-cashDownSaleSwamCommission").options[index].value;
	document.getElementById("routeSwamCreditSaleComm").value = document.getElementById("route-fieldTrip-creditSaleSwamCommission").options[index].value;
	document.getElementById("routeSwamReturnFine").value = document.getElementById("route-fieldTrip-returnSwamFine").options[index].value;

	document.getElementById("routeDiscountReturnFine").value = document.getElementById("route-fieldTrip-returnDiscountFine").options[index].value;

}

function editZayCarRouteForm(element) {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				document.getElementById("route-location").innerHTML = document.getElementById("detail-location-name").innerHTML;
				$('#route-from-date').datepicker({
					dateFormat : 'dd/mm/yy'
				});
				$('#route-to-date').datepicker({
					dateFormat : 'dd/mm/yy'
				});

			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["boId"] = element.id;
	parameter["locationId"] = locationId;
	loading();
	request.open("GET", "editZayCarRouteForm?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function editSaveRouteStockList(force) {
	var fromLocation = document.getElementById("detail-location-boId").innerHTML;
	var fieldTripRoutBoId = document.getElementById("field-trip-route-boId").innerHTML;
	var request = new XMLHttpRequest;
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
						editSaveRouteStockList("forced");
					} else {
						hideLoading();
						$('#routeInvoice').focus();
					}
					return;
				}
				if (result == "CHECKDATE") {
					alert("Check your date,  end date is beyond start date");
					return;
				}
				alert("Successfully Recorded Route Edit Form!");
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("locationmenu"), 'location');
				document.getElementById("search-text").value = fromLocation;
				search(this, 'ID', 'LOCATION');
				this.id = fromLocation;
				aboutDetail(this, 'LOCATION');
			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var table = document.getElementById("route-stock-table");
	var rowCount = table.rows.length;
	var stockList = {};
	var routeRecord = {};
	var boIdList = document.getElementsByName("route-product-boId");
	var qtyList = document.getElementsByName("route-product-qty");
	for (var i = 1; i < boIdList.length; i++) {
		var value = parseInt(qtyList[i].value.trim() ? qtyList[i].value.trim() : 0);
		// if (value != 0) {
		if ((boIdList[i].value.trim() in stockList)) {
			stockList[boIdList[i].value.trim()] += value;
		} else {
			stockList[boIdList[i].value.trim()] = value;
		}
		// }
		// productList[boIdList[i].value] = qtyList[i].value;

	}
	routeRecord['location'] = fromLocation;
	// routeRecord['routeName'] = document.getElementById("route-name").value;
	routeRecord['routeInvoice'] = document.getElementById("routeInvoice").value;
	// routeRecord['fieldTripAllowance'] = document
	// .getElementById("route-fieldTrip-allowance").value;

	routeRecord["route-fieldTrip-allowance"] = document.getElementById("route-fieldTrip-allowance").value;

	var index = document.getElementById("route-fieldTrip-allowance").selectedIndex;
	routeRecord['route-fieldTrip-area'] = document.getElementById("route-fieldTrip-area").options[index].value;

	routeRecord['routecashallowance'] = document.getElementById("routecashallowance").value;

	routeRecord['routequota'] = document.getElementById("routequota").value;
	routeRecord['routecashDownSaleComm'] = document.getElementById("routecashDownSaleComm").value;
	routeRecord['routecreditSaleComm'] = document.getElementById("routecreditSaleComm").value;
	routeRecord['routediscountcashDownSaleComm'] = document.getElementById("routeDiscountCashDownSaleComm").value;
	routeRecord['routediscountcreditSaleComm'] = document.getElementById("routeDiscountCreditSaleComm").value;
	routeRecord['routeReturnFine'] = document.getElementById("routeReturnFine").value;
	routeRecord['routeSwamCashDownSaleComm'] = document.getElementById("routeSwamCashDownSaleComm").value;
	routeRecord['routeSwamCreditSaleComm'] = document.getElementById("routeSwamCreditSaleComm").value;
	routeRecord['routeShortFallFine'] = document.getElementById("routeShortFallFine").value;
	routeRecord['routeSwamReturnFine'] = document.getElementById("routeSwamReturnFine").value;
	routeRecord['routeDiscountReturnFine'] = document.getElementById("routeDiscountReturnFine").value;

	routeRecord['routewSalesQuantityWithinOneMonthComm'] = document.getElementById("routewSalesQuantityWithinOneMonthComm").value;
	routeRecord['routeSwamSalesQuantityWithinOneMonthComm'] = document.getElementById("routeSwamSalesQuantityWithinOneMonthComm").value;
	routeRecord['routeDiscountSalesQuantityWithinOneMonthComm'] = document.getElementById("routeDiscountSalesQuantityWithinOneMonthComm").value;

	routeRecord['city'] = document.getElementById("route-city").value;
	routeRecord['stockList'] = stockList;
	routeRecord['expense'] = document.getElementById("route-expense").value.trim() ? document.getElementById("route-expense").value.trim() : "0";
	routeRecord['from-date'] = document.getElementById("route-from-date").value;
	routeRecord['to-date'] = document.getElementById("route-to-date").value;
	var x = document.getElementById('route-to-employee-list');
	var employeeList = "";
	for (var i = 0; i < x.length; i++) {
		employeeList += x[i].value + ":";
	}
	routeRecord['employeeList'] = employeeList;
	if (force) {
		routeRecord['force'] = force;
	}
	console.log(routeRecord);
	routeRecord['city'] = document.getElementById("route-city").value;
	routeRecord['stockList'] = stockList;
	console.log("StockList  ", stockList);
	routeRecord['expense'] = document.getElementById("route-expense").value.trim() ? document.getElementById("route-expense").value.trim() : "0";
	routeRecord['from-date'] = document.getElementById("route-from-date").value;
	routeRecord['to-date'] = document.getElementById("route-to-date").value;
	var x = document.getElementById('route-to-employee-list');
	var employeeList = "";
	for (var i = 0; i < x.length; i++) {
		employeeList += x[i].value + ":";
	}
	routeRecord['employeeList'] = employeeList;
	routeRecord['boId'] = fieldTripRoutBoId;
	console.log("fieldTripRoutBoId" + fieldTripRoutBoId);
	loading();
	console.log(routeRecord);
	request.open("GET", "editSaveRouteStockList?input=" + JSON.stringify(routeRecord), true);
	request.send(null);
}

function checkNetAount(element) {
	var tr = $(element).parent().parent().parent();
	var grossNetPaid = parseInt(tr.children("tr[name=salary-emp]").children("td[name=gross-salary-emp-totalPay]").children("span").text());
	var grossNetPutASide = parseInt(tr.children("tr[name=salary-emp]").children("td[name=gross-salary-emp-putAsideDeduction]").children("span").text());
	var putASide = parseInt($(element).val()) ? parseInt($(element).val()) : 0;
	var netAmountPaid = grossNetPaid - putASide;
	var netAmountPutASide = putASide + grossNetPutASide;
	tr.children("tr[name=salary-net-emp]").children("td[name=netsalary-emp-totalPay]").text(netAmountPaid);
	tr.children("tr[name=salary-net-emp]").children("td[name=netsalary-emp-putAsideDeduction]").text(netAmountPutASide);
	return true;
}

function saveRouteStockList(force) {
	var fromLocation = document.getElementById("detail-location-boId").innerHTML;
	var request = new XMLHttpRequest;
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
						saveRouteStockList("forced");
					} else {
						hideLoading();
						$('#routeInvoice').focus();
					}
					return;
				}
				if (result == "CHECKDATE") {
					alert("Check your date,  end date is beyond start date");
					return;
				}
				alert("Successfully Recorded!");
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("locationmenu"), 'location');
				document.getElementById("search-text").value = fromLocation;
				search(this, 'ID', 'LOCATION');
				this.id = fromLocation;
				aboutDetail(this, 'LOCATION');
			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var table = document.getElementById("route-stock-table");
	var rowCount = table.rows.length;
	var stockList = {};
	var routeRecord = {};
	var boIdList = document.getElementsByName("route-product-boId");
	var qtyList = document.getElementsByName("route-product-qty");
	for (var i = 1; i < boIdList.length; i++) {
		var value = parseInt(qtyList[i].value.trim() ? qtyList[i].value.trim() : 0);
		if (value != 0) {
			if ((boIdList[i].value.trim() in stockList)) {
				stockList[boIdList[i].value.trim()] += value;
			} else {
				stockList[boIdList[i].value.trim()] = value;
			}
		}
		// productList[boIdList[i].value] = qtyList[i].value;

	}
	routeRecord['location'] = fromLocation;
	// routeRecord['routeName'] = document.getElementById("route-name").value;
	routeRecord['routeInvoice'] = document.getElementById("routeInvoice").value;
	// routeRecord['fieldTripAllowance'] = document
	// .getElementById("route-fieldTrip-allowance").value;

	routeRecord["route-fieldTrip-allowance"] = document.getElementById("route-fieldTrip-allowance").value;
	var index = document.getElementById("route-fieldTrip-allowance").selectedIndex;

	routeRecord['route-fieldTrip-area'] = document.getElementById("route-fieldTrip-area").options[index].value;

	routeRecord['routecashallowance'] = document.getElementById("routecashallowance").value;
	routeRecord['routequota'] = document.getElementById("routequota").value;
	routeRecord['routecashDownSaleComm'] = document.getElementById("routecashDownSaleComm").value;
	routeRecord['routecreditSaleComm'] = document.getElementById("routecreditSaleComm").value;

	routeRecord['routediscountcashDownSaleComm'] = document.getElementById("routeDiscountCashDownSaleComm").value;
	routeRecord['routediscountcreditSaleComm'] = document.getElementById("routeDiscountCreditSaleComm").value;

	routeRecord['routeShortFallFine'] = document.getElementById("routeShortFallFine").value;
	routeRecord['routeReturnFine'] = document.getElementById("routeReturnFine").value;

	routeRecord['routeSwamCashDownSaleComm'] = document.getElementById("routeSwamCashDownSaleComm").value;
	routeRecord['routeSwamCreditSaleComm'] = document.getElementById("routeSwamCreditSaleComm").value;
	routeRecord['routeSwamReturnFine'] = document.getElementById("routeSwamReturnFine").value;
	routeRecord['routeDiscountReturnFine'] = document.getElementById("routeDiscountReturnFine").value;

	routeRecord['routewSalesQuantityWithinOneMonthComm'] = document.getElementById("routewSalesQuantityWithinOneMonthComm").value;
	routeRecord['routeSwamSalesQuantityWithinOneMonthComm'] = document.getElementById("routeSwamSalesQuantityWithinOneMonthComm").value;
	routeRecord['routeDiscountSalesQuantityWithinOneMonthComm'] = document.getElementById("routeDiscountSalesQuantityWithinOneMonthComm").value;

	routeRecord['city'] = document.getElementById("route-city").value;
	routeRecord['stockList'] = stockList;
	routeRecord['expense'] = document.getElementById("route-expense").value.trim() ? document.getElementById("route-expense").value.trim() : "0";
	routeRecord['from-date'] = document.getElementById("route-from-date").value;
	routeRecord['to-date'] = document.getElementById("route-to-date").value;
	var x = document.getElementById('route-to-employee-list');
	var employeeList = "";
	for (var i = 0; i < x.length; i++) {
		employeeList += x[i].value + ":";
	}
	routeRecord['employeeList'] = employeeList;
	if (force) {
		routeRecord['force'] = force;
	}
	routeRecord['city'] = document.getElementById("route-city").value;
	routeRecord['stockList'] = stockList;
	routeRecord['expense'] = document.getElementById("route-expense").value.trim() ? document.getElementById("route-expense").value.trim() : "0";
	routeRecord['from-date'] = document.getElementById("route-from-date").value;
	routeRecord['to-date'] = document.getElementById("route-to-date").value;
	var x = document.getElementById('route-to-employee-list');
	var employeeList = "";
	for (var i = 0; i < x.length; i++) {
		employeeList += x[i].value + ":";
	}
	routeRecord['employeeList'] = employeeList;
	console.log("EmployeeList" + employeeList)
	loading();
	console.log(routeRecord);
	request.open("GET", "saveRouteStockList?input=" + JSON.stringify(routeRecord), true);
	request.send(null);
}

function openReturnForm(element) {
	var customerId = document.getElementById("detail-customer-boId").innerHTML;
	var locationId = document.getElementById("detail-customer-location-id").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				var dateStr = document.getElementById(element.id + 'date').innerHTML;
				$('#return-Date').datepicker({
					dateFormat : 'dd/mm/yy',
					changeYear : true,
					changeMonth : true,
					minDate : new Date(dateStr)
				});
				// document.getElementById("return-Date").value = today();

				document.getElementById("return-location").innerHTML = document.getElementById("detail-customer-location").innerHTML;
				document.getElementById("return-location-id").innerHTML = document.getElementById("detail-customer-location-id").innerHTML;
				document.getElementById("return_customerId").innerHTML = document.getElementById("detail-customer-boId").innerHTML;
				var fullName = document.getElementById("detail-customer-name").getElementsByTagName('span')[0].innerHTML + ' ' + document.getElementById("detail-customer-name").getElementsByTagName('span')[1].innerHTML + ' ' + document.getElementById("detail-customer-name").getElementsByTagName('span')[2].innerHTML + ' ' + document.getElementById("detail-customer-name").getElementsByTagName('span')[3].innerHTML;
				document.getElementById("return_customername").innerHTML = fullName;
				document.getElementById("return_invoice_no").innerHTML = document.getElementById(element.id + 'invoice').innerHTML;
				document.getElementById("return_boId").innerHTML = document.getElementById(element.id + 'boId').innerHTML;
			} else {
				alert("Load payment form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["customerId"] = customerId;
	parameter["locationId"] = locationId;
	parameter["purchaseOrdeId"] = element.id;
	loading();
	request.open("GET", "createCustomerReturnForm?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function editRouteForm(element) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				document.getElementById("route-location").innerHTML = document.getElementById("detail-location-name").innerHTML;
				$('#route-from-date').datepicker({
					dateFormat : 'dd/mm/yy'
				});
				$('#route-to-date').datepicker({
					dateFormat : 'dd/mm/yy'
				});
			} else {
				alert("Please try again. Error code is " + request.status);
			}
		}
	};
	parameter["boId"] = element.id;
	console.log(element.id);
	parameter["locationId"] = document.getElementById("detail-location-boId").innerHTML;
	loading();
	request.open("GET", "editRouteForm?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function editTransferForm(element) {
	var locationId = document.getElementById("location-id").innerHTML;
	var transferBoId = document.getElementById("transfer-BoId").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				document.getElementById("to-location").value = document.getElementById("detail-transfer-to-BoId").innerHTML;
				$('#transfer-date').datepicker({
					dateFormat : 'dd/mm/yy'
				});
			} else {
				alert("Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	parameter["transferBoId"] = transferBoId;
	loading();
	request.open("GET", "editTransferForm?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function editAdjustmentStockListForm(element) {
	var edit_Adjustment_boId = document.getElementById("edit_Adjustment_boId").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
			}
		}
	};
	var parameter = {};
	parameter["adjustment_boId"] = edit_Adjustment_boId;
	loading();
	request.open("GET", "editAdjustmentStockListForm?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function openDeleteTransferForm(element) {
	document.getElementById("confirm-text").innerHTML = "Are you sure you want to Delete?";
	document.getElementById("confirm").attributes["class"].value = "dialog";
	document.getElementById("confirm-delete").attributes["onclick"].value = "deleteTransferConfirm('" + document.getElementById("transfer-BoId").innerHTML + "');";
}

function openCancelPurchaseOrderForm(element) {
	document.getElementById("confirm-text").innerHTML = "Are you sure you want to Cancel?";
	document.getElementById("confirm").attributes["class"].value = "dialog";
	document.getElementById("confirm-delete").attributes["onclick"].value = "cancelPurchaseOrderConfirm('" + element.id + "');";
}

function deleteZayCarRoute(element) {
	document.getElementById("confirm-text").innerHTML = "Are you sure you want to Delete?";
	document.getElementById("confirm").attributes["class"].value = "dialog";
	document.getElementById("confirm-delete").attributes["onclick"].value = "deleteZayCarRouteConfirm('" + element.id + "');";
}

function deleteRoute(element) {
	document.getElementById("confirm-text").innerHTML = "Are you sure you want to Delete?";
	document.getElementById("confirm").attributes["class"].value = "dialog";
	document.getElementById("confirm-delete").attributes["onclick"].value = "deleteRouteConfirm('" + element.id + "');";
}

function cancelPurchaseOrderConfirm(purchaseOrderBoId) {
	var customerId = document.getElementById("detail-customer-boId").innerHTML;
	var locationId = document.getElementById("detail-customer-location-id").innerHTML;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				document.getElementById("confirm").attributes["class"].value = "hide";
				hideLoading();
				loadAction(document.getElementById("customermenu"), 'customer');
				document.getElementById("search-text").value = customerId;
				search(this, 'ID', 'CUSTOMER');
				this.id = customerId;
				aboutDetail(this, 'CUSTOMER');
			} else {
				alert("Delete error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["boId"] = purchaseOrderBoId;
	parameter["locationId"] = locationId;
	request.open("DELETE", "cancelPurchaseOrder?input=" + JSON.stringify(parameter), true);
	request.send();
	loading();
}

function deleteZayCarRouteConfirm(boId) {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("confirm").attributes["class"].value = "hide";
				loadAction(document.getElementById("locationmenu"), 'location');
				document.getElementById("search-text").value = locationId;
				search(this, 'ID', 'LOCATION');
				this.id = locationId;
				aboutDetail(this, 'LOCATION');
			} else {
				alert("Delete error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["boId"] = boId;
	console.log(boId);
	parameter["locationId"] = locationId;
	console.log(parameter["locationId"]);
	request.open("DELETE", "deleteZayCarRouteConfirm?input=" + JSON.stringify(parameter), true);
	request.send();
	loading();
}

function deleteRouteConfirm(boId) {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("confirm").attributes["class"].value = "hide";
				loadAction(document.getElementById("locationmenu"), 'location');
				document.getElementById("search-text").value = locationId;
				search(this, 'ID', 'LOCATION');
				this.id = locationId;
				aboutDetail(this, 'LOCATION');
			} else {
				alert("Delete error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["boId"] = boId;
	console.log(boId);
	parameter["locationId"] = locationId;
	console.log(parameter["locationId"]);
	request.open("DELETE", "deleteRouteConfirm?input=" + JSON.stringify(parameter), true);
	request.send();
	loading();
}

function deleteTransferConfirm(transferBoId) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("confirm").attributes["class"].value = "hide";
				document.getElementById("search-text").value = "";
				searchFirst();
			} else {
				alert("Delete error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["boId"] = transferBoId;
	parameter["locationId"] = document.getElementById("location-id").innerHTML;
	request.open("DELETE", "deleteTransfer?input=" + JSON.stringify(parameter), true);
	request.send();
	loading();
}

function getProductInformation(event, row) {
	if (event.which == 13 || event.keyCode == 13 || event.which == 9 || event.keyCode == 9) {
		var productCode = document.getElementById("location_product_boId");
		var productName = document.getElementById("add_location_product_name_lst");
		var productPrice = document.getElementById("add_location_product_price_lst");
		var index = -1;
		var d = row.parentNode.parentNode.rowIndex - 1;
		for (var i = 0; i < add_location_productList.options.length; i++) {
			if (add_location_productList.options[i].value == document.getElementsByName("add-location-product-boId")[d].value) {
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

		var boId = productCode.options[index].value;
		var name = productName.options[index].value;
		var price = productPrice.options[index].value;
		document.getElementsByName("add_location_productcode")[d].value = boId;
		document.getElementsByName("add_location_product_name")[d].innerHTML = name;
		document.getElementsByName("add_location_product_price")[d].innerHTML = price;
		document.getElementsByName("add_location_product_qty")[d].focus();
		$(row).removeClass("required");
		var id = row.parentNode.parentNode.id;
		if (errors[id])
			delete errors[id];
		return false;
	}

}
function getTransferToProductInfo(row) {
	var boIdList = document.getElementById("transfer_to_extra_productList");
	var codeProductPrice = document.getElementById("transfer-codeChange-product-price");
	var index = -1;
	var d = row.parentNode.parentNode.rowIndex - 1;
	for (var i = 0; i < transfer_to_productList.options.length; i++) {
		if (transfer_to_productList.options[i].value == document.getElementsByName("transfer-to-product-extra-boId")[d].value) {
			index = i;
			break;
		}
	}
	if (index == -1) {
		alert("Please choose correct Product Code!");
		$(row).addClass("required");
		var id = row.parentNode.parentNode.id;
		errors[id] = "error";
		document.getElementById("transfer-dialog-button").disabled = true;
		return false;
	}
	if (document.getElementById("transfer-to-location-codeChanged") != null && document.getElementById("transfer-to-location-codeChanged").innerHTML == 'true') {
		if (document.getElementsByName("transfer-product-price")[d].innerHTML != codeProductPrice.options[index].value) {
			alert("Code Price is not equal.Please,choose Alternativ code.");
			$(row).addClass("required");
			var id = row.parentNode.parentNode.id;
			errors[id] = "error";
			document.getElementById("transfer-dialog-button").disabled = true;
			document.getElementsByName("transfer-to-product-extra-boId")[d].focus();
			return false;
		}
	}
	document.getElementById("transfer-dialog-button").disabled = false;
	var boId = boIdList.options[index].value;
	document.getElementsByName("transfer-to-product-boId")[d].value = boId;
	document.getElementsByName("transfer-product-qty")[d].focus();
	$(row).removeClass("required");
	var id = row.parentNode.parentNode.id;
	if (errors[id])
		delete errors[id];
	return false;
}
function getTransferToProductInformation(event, row) {
	if (event.which == 13 || event.keyCode == 13 || event.which == 9 || event.keyCode == 9) {
		return getTransferToProductInfo(row);
	}
	return true;
}

function getTransferProductInfo(row) {
	var productName = document.getElementById("transfer-product-name-lst");
	var productPrice = document.getElementById("transfer-product-price-lst");
	var boIdList = document.getElementById("transfer_extra_productList");
	var index = -1;
	var d = row.parentNode.parentNode.rowIndex - 1;
	for (var i = 0; i < transfer_productList.options.length; i++) {
		if (transfer_productList.options[i].value == document.getElementsByName("transfer-product-extra-boId")[d].value) {
			index = i;
			break;
		}
	}
	if (index == -1) {
		alert("Please choose correct Product Code!");
		$(row).addClass("required");
		var id = row.parentNode.parentNode.id;
		errors[id] = "error";
		// document.getElementById("transfer-dialog-button").disabled = true;
		return false;
	}
	document.getElementById("transfer-dialog-button").disabled = false;
	var boId = boIdList.options[index].value;
	var name = productName.options[index].value;
	var price = productPrice.options[index].value;
	document.getElementsByName("transfer-product-boId")[d].value = boId;
	document.getElementsByName("transfer-product-name")[d].innerHTML = name;
	document.getElementsByName("transfer-product-price")[d].innerHTML = price;

	if (document.getElementById("transfer_code_check").innerHTML == 'true') {
		document.getElementsByName("transfer-to-product-extra-boId")[d].focus();
	} else {
		document.getElementsByName("transfer-product-qty")[d].focus();

	}

	$(row).removeClass("required");
	var id = row.parentNode.parentNode.id;
	if (errors[id])
		delete errors[id];
	return false;

}

function getTransferProductInformation(event, row) {
	if (event.which == 13 || event.keyCode == 13 || event.which == 9 || event.keyCode == 9) {
		return getTransferProductInfo(row);
	}
	return true;
}
function getRouteProductInformation(event, row) {
	if (event.which == 13 || event.keyCode == 13 || event.which == 9 || event.keyCode == 9) {
		var productName = document.getElementById("route-product-name-lst");
		var productPrice = document.getElementById("route-product-price-lst");
		var boIdList = document.getElementById("route_extra_productList");
		var index = -1;
		var d = row.parentNode.parentNode.rowIndex - 1;
		for (var i = 0; i < route_productList.options.length; i++) {
			if (route_productList.options[i].value == document.getElementsByName("route-product-extra-boId")[d].value) {
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
		var boId = boIdList.options[index].value;
		var name = productName.options[index].value;
		var price = productPrice.options[index].value;
		document.getElementsByName("route-product-boId")[d].value = boId;
		document.getElementsByName("route-product-name")[d].innerHTML = name;
		document.getElementsByName("route-product-price")[d].innerHTML = price;
		document.getElementsByName("route-product-qty")[d].focus();
		$(row).removeClass("required");
		var id = row.parentNode.parentNode.id;
		if (errors[id])
			delete errors[id];
		return false;
	}
}
function getAdjustmentProductInfo(event, row) {
	if (event.which == 13 || event.keyCode == 13 || event.which == 9 || event.keyCode == 9) {
		var productCode = document.getElementById("add_adjustment_productList_extra");
		var productName = document.getElementById("add_adjustment_product_name_lst");
		var productPrice = document.getElementById("add_adjustment_product_price_lst");
		var index = -1;
		var d = row.parentNode.parentNode.rowIndex - 1;
		for (var i = 0; i < add_adjustment_productList.options.length; i++) {
			if (add_adjustment_productList.options[i].value == document.getElementsByName("add-adjustment-product-boId-extra")[d].value) {
				index = i;
				break;
			}
		}
		if (index == -1) {
			alert("Please choose correct Product Code!");
			$(row).addClass("required");
			document.getElementsByName("add-adjustment-product-boId-extra")[d].focus();
			var id = row.parentNode.parentNode.id;
			errors[id] = "error";
			return false;
		}
		var boId = productCode.options[index].value;
		var name = productName.options[index].value;
		var price = productPrice.options[index].value;
		document.getElementsByName("add-adjustment-product-boId")[d].value = boId;
		document.getElementsByName("add_adjustment_product_name")[d].innerHTML = name;
		document.getElementsByName("add_adjustment_product_price")[d].innerHTML = price;
		document.getElementsByName("add_adjustment_product_qty")[d].focus();
		$(row).removeClass("required");
		var id = row.parentNode.parentNode.id;
		if (errors[id])
			delete errors[id];
		return false;
	}
	return true;
}

function getAdjustmentProductInfo1(event, row) {
	if (event.which == 13 || event.keyCode == 13 || event.which == 9 || event.keyCode == 9) {
		var productCode = document.getElementById("add_adjustment_productList_extra");

		var productName = document.getElementById("add_adjustment_product_name_lst");
		var productPrice = document.getElementById("add_adjustment_product_price_lst");
		var productNewDiscounted = document.getElementById("add_adjustment_product_newProductDiscount");
		var index = -1;
		var d = $(row).parent().parent();
		console.log(d);
		for (var i = 0; i < add_adjustment_productList.options.length; i++) {
			if (add_adjustment_productList.options[i].value == d.children("td[name=add-adjustment-product-boId-extra]").children("input").val()) {
				index = i;
				break;
			}
		}
		if (index == -1) {
			alert("Please choose correct Product Code!");
			console.log("----------Error---------")
			$(row).addClass("required");
			d.children("td[name=add-adjustment-product-boId-extra]").children("input").focus();
			var id = row.parentNode.parentNode.id;
			errors[id] = "error";
			return false;
		}
		var boId = productCode.options[index].value;
		var name = productName.options[index].value;
		var price = productPrice.options[index].value;
		var newProudctDiscount = productNewDiscounted.options[index].value;
		// d.children("td[name=add-adjustment-product-boId-extra]").children(
		// "input[name=add-adjustment-product-boId-extra1]").value = boId;
		// d.children("td[name=add-adjustment-product-boId-extra]").children("input").value
		// = boId;
		d.children("td[name=add-adjustment-product-boId-extra]").children("span").text(boId);
		d.children("td").children("span[name=add_adjustment_newProductDiscounted]").text(newProudctDiscount);
		d.children("td[name=add_adjustment_product_name]").text(name);
		d.children("td[name=add_adjustment_product_price]").text(price);
		/* d.children("td[name=origin_valueList1]").text("0"); */
		d.children("td").children("span").children("input").focus()
		$(row).removeClass("required");
		var id = row.parentNode.parentNode.id;
		if (errors[id])
			delete errors[id];
		return false;
	}
	return true;
}

function checkIssuseQty(event, obj) {
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	var totalIssueQty = 0;
	var issueQty = document.getElementsByName("add_issue_product_qty");
	for (var i = 0; i < issueQty.length; i++) {
		totalIssueQty += Number(issueQty[i].value);
	}
	document.getElementById("totalIssues-Qty").innerHTML = totalIssueQty;
}

function checkIssueEnterKey(event, obj) {
	if (event.which == 13 || event.keyCode == 13) {
		if ($(obj).val() == "" || $(obj).val() == 0) {
			$(obj).addClass("required");
			return false;
		}
		$(obj).removeClass("required");
		addRow("add-issue-stock-table");
		return false;
	}
	return true;
}
function getIssueProductInfo(event, row) {
	if (event.which == 13 || event.keyCode == 13 || event.which == 9 || event.keyCode == 9) {
		var productCode = document.getElementById("add_issue_productList_extra");
		var productName = document.getElementById("add_issue_product_name_lst");
		var productPrice = document.getElementById("add_issue_product_price_lst");
		var index = -1;
		var d = row.parentNode.parentNode.rowIndex - 1;
		for (var i = 0; i < add_issue_productList.options.length; i++) {
			if (add_issue_productList.options[i].value == document.getElementsByName("add-issue-product-boId-extra")[d].value) {
				index = i;
				break;
			}
		}
		if (index == -1) {
			alert("Please choose correct Product Code!");
			$(row).addClass("required");
			document.getElementsByName("add-issue-product-boId-extra")[d].focus();
			var id = row.parentNode.parentNode.id;
			errors[id] = "error";
			return false;
		}
		var boId = productCode.options[index].value;
		var name = productName.options[index].value;
		var price = productPrice.options[index].value;
		document.getElementsByName("add-issue-product-boId")[d].value = boId;
		document.getElementsByName("add_issue_product_name")[d].innerHTML = name;
		document.getElementsByName("add_issue_product_price")[d].innerHTML = price;
		document.getElementsByName("add_issue_product_qty")[d].focus();
		$(row).removeClass("required");
		var id = row.parentNode.parentNode.id;
		if (errors[id])
			delete errors[id];
		return false;
	}
}

function checkTotalKeyUp(event, obj) {
	var totalQty = 0;
	var totalPrice = 0;
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	var price = document.getElementsByName("add_location_product_price");
	var qty = document.getElementsByName("add_location_product_qty");
	var priceSolo = document.getElementsByName("add_location_product_price")[d].innerHTML;
	var qtySolo = document.getElementsByName("add_location_product_qty")[d].value;
	for (var i = 0; i < qty.length; i++) {
		totalQty += Number(qty[i].value);
		totalPrice += Number(qty[i].value) * Number(price[i].innerHTML);
	}
	document.getElementsByName("add_location_product_amount")[d].innerHTML = qtySolo * priceSolo;
	document.getElementById("totalLocation-Qty").innerHTML = totalQty;
	document.getElementById("totalLocation-Amount").innerHTML = totalPrice;
}

function checkEnterKey(event, obj) {
	if (event.which == 13 || event.keyCode == 13) {
		if ($(obj).val() == "" || $(obj).val() == 0) {
			$(obj).addClass("required");
			return false;
		}
		var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
		var price = document.getElementsByName("add_location_product_price")[d].innerHTML;
		var qty = document.getElementsByName("add_location_product_qty")[d].value;
		$(obj).removeClass("required");
		document.getElementsByName("add_location_product_amount")[d].innerHTML = price * qty;
		addRow("add-location-stock-table");
		return false;
	}
	return true;
}

function checkReturnRejectUp(event, obj) {
	var totalQty = 0;
	var totalPrice = 0;
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	var price = document.getElementsByName("return_product_price")[d].value;
	var qty = document.getElementsByName("return_product_qty")[d].value.trim() ? document.getElementsByName("return_product_qty")[d].value.trim() : "0";
	if (document.getElementsByName("return_product_discounted")[d].innerHTML == "false" && document.getElementsByName("return_product_category")[d].innerHTML == "GENERAL") {
		var promotion = document.getElementsByName("return_product_promotion")[d].value.trim() ? document.getElementsByName("return_product_promotion")[d].value.trim() : "0";
	} else {
		var promotion = 0;
	}
	var checkDiscount = document.getElementsByName("return_product_discounted");
	var checkSwam = document.getElementsByName("return_product_category");
	var traPrice = document.getElementsByName("return_product_price");
	var trapromotion = document.getElementsByName("return_product_promotion");
	var checkPromotion;
	var traQty = document.getElementsByName("return_product_qty");
	for (var i = 0; i < traQty.length; i++) {
		totalQty += Number(traQty[i].value);
	}
	document.getElementsByName("return-reject-total")[d].innerHTML = (Number(price) * Number(qty)) - ((Number(price) * Number(qty) * 0.01 * Number(promotion)));
	document.getElementById("totalReturnReject-Qty").innerHTML = totalQty;
	document.getElementById("totalReturnReject-Amount").innerHTML = ReturnOpeningBalance.checkTotal();
}

function checkReturnProductPrice(obj) {
	var totalQty = 0;
	var totalPrice = 0;
	var row = $(obj).parent().parent();
	var d = row.index() - 1;
	var price = obj.value;
	var qty = document.getElementsByName("return_product_qty")[d].value.trim() ? document.getElementsByName("return_product_qty")[d].value.trim() : "0";
	if (document.getElementsByName("return_product_discounted")[d].innerHTML == "false" && document.getElementsByName("return_product_category")[d].innerHTML == "GENERAL") {
		var promotion = document.getElementsByName("return_product_promotion")[d].value.trim() ? document.getElementsByName("return_product_promotion")[d].value.trim() : "0";
	} else {
		var promotion = 0;
	}
	var checkDiscount = document.getElementsByName("return_product_discounted");
	var checkSwam = document.getElementsByName("return_product_category");
	var traPrice = document.getElementsByName("return_product_price");
	var trapromotion = document.getElementsByName("return_product_promotion");
	var checkPromotion;
	var traQty = document.getElementsByName("return_product_qty");
	for (var i = 0; i < traQty.length; i++) {
		totalQty += Number(traQty[i].value);
	}
	document.getElementsByName("return-reject-total")[d].innerHTML = (Number(price) * Number(qty)) - ((Number(price) * Number(qty) * 0.01 * Number(promotion)));
	document.getElementById("totalReturnReject-Qty").innerHTML = totalQty;
	document.getElementById("totalReturnReject-Amount").innerHTML = ReturnOpeningBalance.checkTotal();
}

function ReturnOpeningBalance() {

}

ReturnOpeningBalance.checkTotal = function() {
	var total = 0;
	$("[name=return-reject-total]").each(function(index, element) {
		element = $(element);
		var number = parseInt(element.text()) || 0;
		total += number;
	});
	return total;
}

function checkReturnKeyUp(event, obj) {
	var totalQty = 0;
	var totalPrice = 0;
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	var price = document.getElementsByName("lineItem-price")[d].innerHTML;
	var qty = document.getElementsByName("lineItem-quantity")[d].value.trim() ? document.getElementsByName("lineItem-quantity")[d].value.trim() : "0";
	if (document.getElementsByName("lineItem-category")[d].innerHTML == "true" && document.getElementsByName("lineItem-discounted")[d].innerHTML != "true") {
		document.getElementsByName("return-total")[d].innerHTML = (Number(price) * Number(qty)) - Number(price) * Number(qty) * (Number(document.getElementsByName("lineItem-promotion")[d].innerHTML) * 0.01);
	} else {
		document.getElementsByName("return-total")[d].innerHTML = Number(price) * Number(qty);
	}
	var traPrice = document.getElementsByName("lineItem-price");
	var traQty = document.getElementsByName("lineItem-quantity");
	var traCategory = document.getElementsByName("lineItem-category");
	var traDiscounted = document.getElementsByName("lineItem-discounted");
	var traPromotion = document.getElementsByName("lineItem-promotion");
	for (var i = 0; i < traQty.length; i++) {
		totalQty += Number(traQty[i].value);
		if (traCategory[i].innerHTML == "true" && traDiscounted[i].innerHTML != "true") {
			totalPrice += (Number(traQty[i].value) * Number(traPrice[i].innerHTML)) - (Number(traQty[i].value) * Number(traPrice[i].innerHTML) * 0.01 * Number(traPromotion[i].innerHTML));
		} else {
			totalPrice += Number(traQty[i].value) * Number(traPrice[i].innerHTML);
		}
	}
	document.getElementById("totalReturnReject-Qty").innerHTML = totalQty;
	document.getElementById("totalReturnReject-Amount").innerHTML = totalPrice;
}

function checkTransferAmountRemoveRow(event, obj) {
	var totalQty = 0;
	var totalPrice = 0;
	var totalAmount = document.getElementsByName("transfer-product-amount");
	var traQty = document.getElementsByName("transfer-product-qty");
	for (var i = 0; i < totalAmount.length; i++) {
		totalQty += Number(traQty[i].value);
		totalPrice += Number(totalAmount[i].innerHTML);
	}
	document.getElementById("totalTransfer-Qty").innerHTML = totalQty;
	document.getElementById("totalTransfer-Amount").innerHTML = totalPrice;
}

function checkTransferAmount(event, obj) {
	var totalQty = 0;
	var totalPrice = 0;
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	var price = document.getElementsByName("transfer-product-price")[d].innerHTML;
	var traQty = document.getElementsByName("transfer-product-qty");
	var qty = document.getElementsByName("transfer-product-qty")[d].value;
	var traPrice = document.getElementsByName("transfer-product-price");
	for (var i = 0; i < traQty.length; i++) {
		totalQty += Number(traQty[i].value);
		totalPrice += Number(traQty[i].value) * Number(traPrice[i].innerHTML);
	}
	document.getElementsByName("transfer-product-amount")[d].innerHTML = price * qty;
	document.getElementById("totalTransfer-Qty").innerHTML = totalQty;
	document.getElementById("totalTransfer-Amount").innerHTML = totalPrice;
}

function checkTransferEnterKey(event, obj) {
	if (event.which == 13 || event.keyCode == 13) {
		if ($(obj).val() == "" || $(obj).val() == 0) {
			$(obj).addClass("required");
			return false;
		}
		var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
		var price = document.getElementsByName("transfer-product-price")[d].innerHTML;
		var qty = document.getElementsByName("transfer-product-qty")[d].value;
		$(obj).removeClass("required");
		document.getElementsByName("transfer-product-amount")[d].innerHTML = price * qty;
		addRow("transfer-stock-table");
		return false;
	}
	return true;
}

function checkRouteTotalQtyKey(event, obj) {
	var totalQty = 0;
	var totalAmount = 0;
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	var qty = document.getElementsByName("route-product-qty");
	var price = document.getElementsByName("route-product-price");
	var tempQty = document.getElementsByName("route-product-qty")[d].value;
	var tempPrice = document.getElementsByName("route-product-price")[d].innerHTML;
	for (var i = 0; i < qty.length; i++) {
		totalQty += Number(qty[i].value);
		totalAmount += Number(qty[i].value) * Number(price[i].innerHTML)
	}
	document.getElementsByName("route-product-amount")[d].innerHTML = Number(tempQty) * Number(tempPrice);
	document.getElementById("totalRoute-Amount").innerHTML = totalAmount;
	document.getElementById("totalRoute-Qty").innerHTML = totalQty;
}

function checkRouteEnterKey(event, obj) {
	if (event.which == 13 || event.keyCode == 13) {
		if ($(obj).val() == "" || $(obj).val() == 0) {
			$(obj).addClass("required");
			return false;
		}
		var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
		var price = document.getElementsByName("route-product-price")[d].innerHTML;
		var qty = document.getElementsByName("route-product-qty")[d].value;
		$(obj).removeClass("required");
		document.getElementsByName("route-product-amount")[d].innerHTML = price * qty;
		addRow("route-stock-table");
		return false;
	}
	return true;
}

function checkAdjKeyPress(event, obj) {
	var qtyList = $("[name=add_adjustment_product_qty]");
	var total_adj = 0;
	qtyList.each(function(index, element) {
		element = $(element);
		total_adj += Number(element.val());
	});
	document.getElementById("total-adjust").innerHTML = total_adj;
}

function checkAdjustmentEnterKey(event, obj) {
	var qtyList = $("[name=add_adjustment_product_qty]");
	console.log(qtyList);
	var total_adj = 0;
	qtyList.each(function(index, element) {
		element = $(element);
		total_adj += Number(element.val());
	});
	if (event.which == 13 || event.keyCode == 13) {
		if ($(obj).val() == "" || $(obj).val() == 0) {
			$(obj).addClass("required");
			return false;
		}
		$(obj).removeClass("required");
		addRow("add-adjustment-stock-table");
		document.getElementById("total-adjust").innerHTML = total_adj;
		return false;
	}
	return true;
}

function checkNewAdjustmentEnterKey(event, obj) {
	var qtyList = $("[name=adjustmentStock_groundList]");
	console.log(qtyList);
	var total_adj = 0;
	qtyList.each(function(index, element) {
		element = $(element);
		total_adj += Number(element.val());
	});
	if (event.which == 13 || event.keyCode == 13) {
		if ($(obj).val() == "") {
			$(obj).addClass("required");
			return false;
		}
		$(obj).removeClass("required");
		addRow("editAdjustment-StockList");
		document.getElementById("total-adjust").innerHTML = total_adj;
		return false;
	}
	return true;
}

function addRowAdj(parentId, row) {
	var tempRow = $("#" + parentId).children("tbody").children("tr[name=template]").clone();
	tempRow.attr("name", row);
	tempRow.removeClass("hide");
	$("#" + parentId).children("tbody").append(tempRow);
	tempRow.children("td[name=add-adjustment-product-boId-extra]").children("input:not([class=hide])").get(0).focus();
	return false;
}

function checkDiscountKeyup(event) {
	var discount = document.getElementById("discount-adjustment").value ? document.getElementById("discount-adjustment").value : 0;
	if (discount == 0) {
		discount = 100;
	}
	var GQty = document.getElementsByName("edit-adjustmentStock_groundList");
	var gPrice = document.getElementsByName("edit-adjustment_price");
	var booleanDiscount = document.getElementsByName("edit-adjustment_Discounted");
	var EditGQty = document.getElementsByName("edit-adjustmentStock_groundList1");
	var EditgPrice = document.getElementsByName("add_adjustment_product_price");
	var EditbooleanDiscount = document.getElementsByName("add_adjustment_newProductDiscounted");
	var totalGroundAmount = 0;
	var totalEditGroundAmount = 0;
	for (var i = 0; i < GQty.length; i++) {
		if (booleanDiscount[i].innerHTML == "true") {
			document.getElementsByName("edit-adjustmentStock_amount")[i].innerHTML = parseInt(GQty[i].value ? GQty[i].value : 0) * parseInt(gPrice[i].innerHTML) * 0.01 * parseInt(discount);
			totalGroundAmount += parseInt(GQty[i].value ? GQty[i].value : 0) * parseInt(gPrice[i].innerHTML) * 0.01 * parseInt(discount);
		} else {
			document.getElementsByName("edit-adjustmentStock_amount")[i].innerHTML = parseInt(GQty[i].value ? GQty[i].value : 0) * parseInt(gPrice[i].innerHTML);
			totalGroundAmount += parseInt(GQty[i].value ? GQty[i].value : 0) * parseInt(gPrice[i].innerHTML);
		}
	}
	for (var i = 1; i < EditGQty.length; i++) {
		if (EditbooleanDiscount[i].innerHTML == "true") {
			document.getElementsByName("add_adjustment_product_total")[i].innerHTML = parseInt(EditGQty[i].value ? EditGQty[i].value : 0) * parseInt(EditgPrice[i].innerHTML) * 0.01 * parseInt(discount);
			console.log("discount ", discount);
			totalEditGroundAmount += parseInt(EditGQty[i].value ? EditGQty[i].value : 0) * parseInt(EditgPrice[i].innerHTML) * 0.01 * parseInt(discount);
		} else {
			document.getElementsByName("add_adjustment_product_total")[i].innerHTML = parseInt(EditGQty[i].value ? EditGQty[i].value : 0) * parseInt(EditgPrice[i].innerHTML);
			totalEditGroundAmount += parseInt(EditGQty[i].value ? EditGQty[i].value : 0) * parseInt(EditgPrice[i].innerHTML);
		}
	}
	document.getElementById("totalAdjustment-Amount").innerHTML = totalGroundAmount + totalEditGroundAmount;
}

function checkAdjustmentKeyup(event) {
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	console.log("D ", event.target.parentNode.parentNode.parentNode);

	var tableNewRow = $("#editAdjustment-StockList tr[name=data]");
	// var oringinQty =
	// parseInt(document.getElementsByName("origin_valueList")[d].innerHTML);
	var totalQty = 0;
	var totalGQty = 0;
	var totalAQty = 0;
	var tempGQty = 0, tempQty = 0;
	var tQty = 0;
	var tGQty = 0;
	var tAmount = 0;
	var groundQty = parseInt(document.getElementsByName("edit-adjustmentStock_groundList")[d].value);
	// document.getElementsByName("adjustmentStock_valueList")[d].innerHTML = 0
	// - (oringinQty - groundQty);
	// var Qty = document.getElementsByName("origin_valueList");
	var GQty = document.getElementsByName("edit-adjustmentStock_groundList");
	var gPrice = document.getElementsByName("edit-adjustment_price");
	var booleanDiscount = document.getElementsByName("edit-adjustment_Discounted");
	var discount = document.getElementById("discount-adjustment").value ? document.getElementById("discount-adjustment").value : 0;
	if (booleanDiscount[d].innerHTML == "true") {
		document.getElementsByName("edit-adjustmentStock_amount")[d].innerHTML = (parseInt(GQty[d].value ? GQty[d].value : 0) * parseInt(gPrice[d].innerHTML ? gPrice[d].innerHTML : 0)) - (parseInt(GQty[d].value ? GQty[d].value : 0) * parseInt(gPrice[d].innerHTML ? gPrice[d].innerHTML : 0)) * 0.01 * parseInt(discount);
	} else {
		document.getElementsByName("edit-adjustmentStock_amount")[d].innerHTML = parseInt(GQty[d].value ? GQty[d].value : 0) * parseInt(gPrice[d].innerHTML ? gPrice[d].innerHTML : 0);
	}

	for (var i = 0; i < GQty.length; i++) {
		// tempQty = parseInt(Qty[i].innerHTML ? Qty[i].innerHTML : 0);
		tempGQty = parseInt(GQty[i].value ? GQty[i].value : 0);
		// tQty += tempQty;
		tGQty += tempGQty;
		if (isNaN(tempGQty)) {
			tempGQty = 0;
		}
		if (booleanDiscount[i].innerHTML == "true") {
			tAmount += (parseInt(GQty[i].value ? GQty[i].value : 0) * parseInt(gPrice[i].innerHTML ? gPrice[i].innerHTML : 0)) - parseInt(GQty[i].value ? GQty[i].value : 0) * parseInt(gPrice[i].innerHTML ? gPrice[i].innerHTML : 0) * 0.01 * parseInt(discount);
		} else {
			tAmount += parseInt(GQty[i].value ? GQty[i].value : 0) * parseInt(gPrice[i].innerHTML ? gPrice[i].innerHTML : 0);
		}
	}
	// document.getElementsByName("adjustmentStock_valueList")[d].innerHTML = 0
	// - (parseInt(Qty[d].innerHTML) - parseInt(GQty[d].value ? GQty[d].value
	// : 0));
	tableNewRow.each(function(index, element) {
		element = $(element);
		// var originalQty = $("[name=origin_valueList1]", element).text();
		// totalQty += parseInt(originalQty);
		var groundQty = $("[name=edit-adjustmentStock_groundList1]", element).val();
		var price = $("[name=add_adjustment_product_price]", element).text();
		var newDiscount = $("[name=add_adjustment_newProductDiscounted]", element).text();
		totalGQty += parseInt(groundQty);
		// $("[name=add_adjustment_product_total]", element).text(
		// parseInt(groundQty) - parseInt(price));
		if (newDiscount == "true") {
			totalAQty += parseInt(groundQty) * parseInt(price) - parseInt(groundQty) * parseInt(price) * 0.01 * discount;
		} else {
			totalAQty += parseInt(groundQty) * parseInt(price);
		}
	});
	// document.getElementById("total-Qty").innerHTML = parseInt(totalQty)
	// + parseInt(tQty);
	document.getElementById("totalAdjustment-Amount").innerHTML = (parseInt(tAmount)) + parseInt(totalAQty);
	document.getElementById("totalGround-Qty").innerHTML = parseInt(totalGQty) + parseInt(tGQty);
}
function checkAdjustmentKeyup1(event) {
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	var tableNewRow = $("#editAdjustment-StockList tr[name=data]");
	var totalQty = 0;
	var totalGQty = 0;
	var totalAmount = 0;
	var tQty = 0;
	var tGQty = 0;
	var tAQty = 0;
	// var Qty = document.getElementsByName("origin_valueList");
	var discount = document.getElementById("discount-adjustment").value ? document.getElementById("discount-adjustment").value : 0;
	var GQty = document.getElementsByName("edit-adjustmentStock_groundList");
	var GPrice = document.getElementsByName("edit-adjustment_price");
	var booleanDiscount = document.getElementsByName("edit-adjustment_Discounted");
	tableNewRow.each(function(index, element) {
		element = $(element);
		var price = $("[name=add_adjustment_product_price]", element).text();
		var EGqty = $("[name=edit-adjustmentStock_groundList1]", element).val();
		var newProductDiscount = $("[name=add_adjustment_newProductDiscounted]", element).text();
		console.log("NewProductDiscount ", newProductDiscount);
		if (newProductDiscount == "true") {
			$("[name=add_adjustment_product_total]", element).text((parseInt(EGqty ? EGqty : 0) * parseInt(price ? price : 0)) - parseInt(EGqty ? EGqty : 0) * parseInt(price ? price : 0) * 0.01 * parseInt(discount));
			totalAmount += parseInt(parseInt(EGqty ? EGqty : 0) * parseInt(price ? price : 0)) - (EGqty ? EGqty : 0) * parseInt(price ? price : 0) * 0.01 * parseInt(discount);
		} else {
			$("[name=add_adjustment_product_total]", element).text(parseInt(EGqty ? EGqty : 0) * parseInt(price ? price : 0));
			totalAmount += parseInt(EGqty ? EGqty : 0) * parseInt(price ? price : 0);
		}
		// totalAmount+=parseInt(price+EGqty);
		var groundQty = $("[name=edit-adjustmentStock_groundList1]", element).val();
		groundQty = groundQty || 0;
		totalGQty += parseInt(groundQty);
	});

	for (var i = 0; i < GQty.length; i++) {
		// tQty += parseInt(Qty[i].innerHTML);
		tGQty += parseInt(GQty[i].value);
		if (booleanDiscount[i].innerHTML == "true") {
			tAQty += (parseInt(GQty[i].value) * parseInt(GPrice[i].innerHTML)) - parseInt(GQty[i].value) * parseInt(GPrice[i].innerHTML) * 0.01 * discount;
		} else {
			tAQty += parseInt(GQty[i].value) * parseInt(GPrice[i].innerHTML);
		}

	}
	// document.getElementById("total-Qty").innerHTML = parseInt(totalQty)
	// + parseInt(tQty);
	document.getElementById("totalGround-Qty").innerHTML = parseInt(totalGQty) + parseInt(tGQty);
	document.getElementById("totalAdjustment-Amount").innerHTML = parseInt(totalAmount) + parseInt(tAQty);
}

function addRowAdj1(event, row) {
	if (event.which == 13 || event.keyCode == 13) {
		if ($(row).val() == "") {
			$(row).addClass("required");
			return false;
		}
		$(row).removeClass("required");
		addRowAdj("editAdjustment-StockList", "data");
		return false;
	}
	return true;
}

function addRow(parentId) {
	var table = document.getElementById(parentId);
	var temp = $("#" + parentId + " tr[name=skip]");
	temp.detach();
	var childList = table.getElementsByTagName("tr");
	var newinnerhtml = childList[1].innerHTML;
	var row = table.insertRow(childList.length);
	$(row).html(newinnerhtml);
	$(row).attr("id", new Date().toString());
	$(row).attr("name", $(childList[1]).attr("name"));
	$("#" + parentId + " tr:last td:first-child input").focus();
	/*
	 * $("#" + parentId + " tr:last td:first-child input").focusout(function() {
	 * if (parentId == 'transfer-stock-table') { var result =
	 * getTransferProductInfo(this); var r = row.rowIndex - 1;
	 * changeTransferTotalAmount(r); return result; } });
	 * 
	 * $("#" + parentId + " tr:last td:nth-child(2) input ").focusout(function() {
	 * if (parentId == 'transfer-stock-table') { var result =
	 * getTransferToProductInfo(this); var r = row.rowIndex - 1; //
	 * changeTransferTotalAmount(r); return result; } });
	 */

	$(table).children("tbody").append(temp);

}
function changeTransferTotalAmount(d) {
	var price = document.getElementsByName("transfer-product-price")[d].innerHTML.trim();
	var qty = document.getElementsByName("transfer-product-qty")[d].value.trim();
	if (price != '' && qty != '' && qty > 0) {
		document.getElementsByName("transfer-product-amount")[d].innerHTML = price * qty;
	}

	var traQty = document.getElementsByName("transfer-product-qty");
	var traPrice = document.getElementsByName("transfer-product-price");
	var totalQty = 0;
	var totalPrice = 0;
	for (var i = 0; i < traQty.length; i++) {
		totalQty += Number(traQty[i].value);
		totalPrice += Number(traQty[i].value) * Number(traPrice[i].innerHTML);
	}

	document.getElementById("totalTransfer-Qty").innerHTML = totalQty;
	document.getElementById("totalTransfer-Amount").innerHTML = totalPrice;

}
function appendRow(parentId) {
	var table = document.getElementById(parentId);
	var childList = table.getElementsByTagName("tr");
	var row = table.insertRow(childList.length);
	row.innerHTML = childList[1].innerHTML;
	$(row).attr("name", $(childList[1]).attr("name"));
	var firstColumn = $("#" + parentId + " tr td:first-child");
	firstColumn.each(function(index, element) {
		if (!index)
			return true;
		if (index == firstColumn.length - 1)
			return true;
		$(this).text(index - 1 + ".");
		return true;
	});
}

function removeRowQty(element, event) {
	var d = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
	removeRow(element);
}

function removeRow(element, event, parameter) {
	element = $(element);
	var removeElement = element.parent().parent();
	var table = removeElement.parent();
	if (table.children().length < 2) {
		alert("Can't remove last element");
		return;
	}
	if (errors[removeElement.attr("id")])
		delete errors[removeElement.attr("id")];
	removeElement.detach();
	var parentId = table.parent().attr("id");
	if (parameter == 'transfer')
		checkTransferAmountRemoveRow(event, element)
	if (parameter == 'adjustment')
		checkAdjKeyPress(event, element);
	if (parameter == 'issue')
		removeTotalIssueRow();
}

function removeTotalIssueRow() {
	var issueQuantities = document.getElementsByName("add_issue_product_qty");
	var totalCount = 0;
	for (var i = 0; i < issueQuantities.length; i++) {
		totalCount = +issueQuantities[i].value;
	}
	document.getElementById("totalIssues-Qty").innerHTML = totalCount;
}

function removeCurrentRow(currentElement) {
	console.log(currentElement);
	var parent = $(currentElement).parent();
	removeElement.detach();
	console.log(parent);
	parent.detach();
}

function addNewVolumeProduct(description) {
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = JSON.parse(request.responseText);
				if (result.status == 'ERROR') {
					alert("Error : product code is already existed.")
				} else {
					alert("Successfully Recorded!");
					searchFirst();
					document.getElementById("dialog-temp").attributes["class"].value = "hide";
				}
			} else {
				alert("Error return :" + request.status);
			}
		}
	};
	var parameter = {};
	parameter["description"] = description;
	parameter["add_product_code"] = document.getElementById("add_product_code").value.trim();
	parameter["add_product_name"] = document.getElementById("add_product_name").value.trim();
	parameter["add_product_discounted"] = document.getElementById("add_product_discounted").checked;
	var min = document.getElementById("volumeproduct_min").value.trim();
	var minArray = [];
	var maxArray = [];
	var priceArray = [];
	var minvar = document.getElementById("volumeproduct").querySelectorAll("#volumeproduct_min");
	var maxvar = document.getElementById("volumeproduct").querySelectorAll("#volumeproduct_max");
	var pricevar = document.getElementById("volumeproduct").querySelectorAll("#volumeproduct_price");
	for (var i = 1; i < minvar.length; i++) {
		minArray[minArray.length] = minvar[i].value;
		maxArray[maxArray.length] = maxvar[i].value;
		priceArray[priceArray.length] = pricevar[i].value;
	}
	parameter["volumeproduct_min"] = minArray;
	parameter["volumeproduct_max"] = maxArray;
	parameter["volumeproduct_price"] = priceArray;
	loading();
	request.open("POST", "saveNewVolumeProduct?input=" + JSON.stringify(parameter), true);
	console.log(parameter);
	request.send();
}

function checkVolumePriceEnterKey(event) {
	if (event.which == 13 || event.keyCode == 13) {
		addVolumeRow("volumeproduct");
		return false;
	}
	return true;
}

function addVolumeRow(parentId) {
	var table = document.getElementById(parentId);
	if (table != null) {
		var childList = table.getElementsByTagName("tr");
		var newinnerhtml = childList[1].innerHTML;
		var row = table.insertRow(childList.length);
		$(row).html(newinnerhtml);
		$(row).attr("value", $(childList[1]).attr("value"));
		$(row).attr("id", $(childList[1]).attr("id"));
		$(row).find('input')[0].focus();
	}
}

function carLoadRouteForm() {
	var locationId = document.getElementById("detail-location-boId").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").innerHTML = request.responseText;
				document.getElementById("dialog-temp").className = "dialog";
				document.getElementById("route-location").innerHTML = document.getElementById("detail-location-name").innerHTML;
				$('#route-from-date').datepicker({
					dateFormat : 'dd/mm/yy'
				});
				$('#carroute-to-date').datepicker({
					dateFormat : 'dd/mm/yy'
				});
				document.getElementById("route-from-date").value = today();
				document.getElementById("carroute-to-date").value = today();
			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var parameter = {};
	parameter["locationId"] = locationId;
	loading();
	request.open("GET", "createCarRouteForm?input=" + JSON.stringify(parameter), true);
	request.send(null);
}

function saveCarRoute() {
	var fromLocation = document.getElementById("detail-location-boId").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				var result = document.createElement("div");
				result.innerHTML = request.responseText;
				result = $(result).children("span").text();
				if (result == "CHECKDATE") {
					alert("Check your date,  end date is beyond start date");
					return;
				}
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("locationmenu"), 'location');
				document.getElementById("search-text").value = fromLocation;
				search(this, 'ID', 'LOCATION');
				this.id = fromLocation;
				aboutDetail(this, 'LOCATION');
				alert("Successfully Recorded!");
			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var routeRecord = {};
	routeRecord['location'] = fromLocation;
	routeRecord['routeName'] = document.getElementById("route-name").value;
	// routeRecord['fieldTripAllowance'] =
	// document.getElementById("route-fieldTrip-allowance").value;
	routeRecord['city'] = document.getElementById("route-city").value;
	routeRecord['expense'] = document.getElementById("route-expense").value.trim() ? document.getElementById("route-expense").value.trim() : "0";
	var x = document.getElementById('route-to-employee-list');
	var employeeList = "";
	for (var i = 0; i < x.length; i++) {
		employeeList += x[i].value + ":";
	}
	routeRecord['employeeList'] = employeeList;
	routeRecord['from-date'] = document.getElementById("route-from-date").value;
	routeRecord['to-date'] = document.getElementById("carroute-to-date").value;

	routeRecord['presentFine'] = document.getElementById("presentFine").value.trim() ? document.getElementById("presentFine").value.trim() : "0";

	routeRecord['saleQuota'] = document.getElementById("saleQuota").value.trim() ? document.getElementById("saleQuota").value.trim() : "0";

	routeRecord['cashDownSalesQuantityCommission'] = document.getElementById("cashDownSalesQuantityCommission").value.trim() ? document.getElementById("cashDownSalesQuantityCommission").value.trim() : "0";
	routeRecord['creditSalesQuantityCommission'] = document.getElementById("creditSalesQuantityCommission").value.trim() ? document.getElementById("creditSalesQuantityCommission").value.trim() : "0";
	routeRecord['salesQuantityWithinOneMonthCommission'] = document.getElementById("salesQuantityWithinOneMonthCommission").value.trim() ? document.getElementById("salesQuantityWithinOneMonthCommission").value.trim() : "0";

	routeRecord['car-returnFine'] = document.getElementById("car-returnFine").value.trim() ? document.getElementById("car-returnFine").value.trim() : "0";

	routeRecord['swamCashDownSalesQuantityCommission'] = document.getElementById("swamCashDownSalesQuantityCommission").value.trim() ? document.getElementById("swamCashDownSalesQuantityCommission").value.trim() : "0";
	routeRecord['swamCreditSalesQuantityCommission'] = document.getElementById("swamCreditSalesQuantityCommission").value.trim() ? document.getElementById("swamCreditSalesQuantityCommission").value.trim() : "0";
	routeRecord['swamSalesQuantityWithinOneMonthCommission'] = document.getElementById("swamSalesQuantityWithinOneMonthCommission").value.trim() ? document.getElementById("swamSalesQuantityWithinOneMonthCommission").value.trim() : "0";

	routeRecord['car-swamReturnFine'] = document.getElementById("car-swamReturnFine").value.trim() ? document.getElementById("car-swamReturnFine").value.trim() : "0";

	routeRecord['car-swamReturnFine'] = document.getElementById("car-swamReturnFine").value.trim() ? document.getElementById("car-swamReturnFine").value.trim() : "0";

	routeRecord['car-discountReturnFine'] = document.getElementById("car-discountReturnFine").value.trim() ? document.getElementById("car-discountReturnFine").value.trim() : "0";

	routeRecord['depreciation'] = document.getElementById("depreciation").value.trim() ? document.getElementById("depreciation").value.trim() : "0";
	routeRecord['shortFallFine'] = document.getElementById("shortFallFine").value.trim() ? document.getElementById("shortFallFine").value.trim() : "0";
	routeRecord['saleRevenuePercentage'] = document.getElementById("saleRevenuePercentage").value.trim() ? document.getElementById("saleRevenuePercentage").value.trim() : "0";

	routeRecord['discountDebitCollectionPercentage'] = document.getElementById("discountDebitCollectionPercentage").value.trim() ? document.getElementById("discountDebitCollectionPercentage").value.trim() : "0";
	loading();
	request.open("GET", "saveCarRoute?input=" + JSON.stringify(routeRecord), true);
	request.send(null);
}

function editCarRoute() {
	var fromLocation = document.getElementById("detail-location-boId").innerHTML;
	var boId = document.getElementById("route-boId").innerHTML;
	var request = new XMLHttpRequest;
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				hideLoading();
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				loadAction(document.getElementById("locationmenu"), 'location');
				document.getElementById("search-text").value = fromLocation;
				search(this, 'ID', 'LOCATION');
				this.id = fromLocation;
				aboutDetail(this, 'LOCATION');
				alert("Successfully Recorded!");
			} else {
				alert("Load transfer form error.Please try again. Error code is " + request.status);
			}
		}
	};
	var routeRecord = {};
	routeRecord['location'] = fromLocation;
	routeRecord['routeName'] = document.getElementById("route-name").value;
	// routeRecord['fieldTripAllowance'] =
	// document.getElementById("route-fieldTrip-allowance").value;
	routeRecord['city'] = document.getElementById("route-city").value;
	routeRecord['expense'] = document.getElementById("route-expense").value.trim() ? document.getElementById("route-expense").value.trim() : "0";
	var x = document.getElementById('route-to-employee-list');
	var employeeList = "";
	for (var i = 0; i < x.length; i++) {
		employeeList += x[i].value + ":";
	}
	routeRecord['employeeList'] = employeeList;
	routeRecord['from-date'] = document.getElementById("route-from-date").value;
	routeRecord['to-date'] = document.getElementById("route-to-date").value;

	routeRecord['presentFine'] = document.getElementById("presentFine").value.trim() ? document.getElementById("presentFine").value.trim() : "0";

	routeRecord['saleQuota'] = document.getElementById("saleQuota").value.trim() ? document.getElementById("saleQuota").value.trim() : "0";

	routeRecord['cashDownSalesQuantityCommission'] = document.getElementById("cashDownSalesQuantityCommission").value.trim() ? document.getElementById("cashDownSalesQuantityCommission").value.trim() : "0";
	routeRecord['creditSalesQuantityCommission'] = document.getElementById("creditSalesQuantityCommission").value.trim() ? document.getElementById("creditSalesQuantityCommission").value.trim() : "0";
	routeRecord['salesQuantityWithinOneMonthCommission'] = document.getElementById("salesQuantityWithinOneMonthCommission").value.trim() ? document.getElementById("salesQuantityWithinOneMonthCommission").value.trim() : "0";

	routeRecord['returnQuantityCommission'] = document.getElementById("returnQuantityCommission").value.trim() ? document.getElementById("returnQuantityCommission").value.trim() : "0";

	routeRecord['swamCashDownSalesQuantityCommission'] = document.getElementById("swamCashDownSalesQuantityCommission").value.trim() ? document.getElementById("swamCashDownSalesQuantityCommission").value.trim() : "0";
	routeRecord['swamCreditSalesQuantityCommission'] = document.getElementById("swamCreditSalesQuantityCommission").value.trim() ? document.getElementById("swamCreditSalesQuantityCommission").value.trim() : "0";
	routeRecord['swamSalesQuantityWithinOneMonthCommission'] = document.getElementById("swamSalesQuantityWithinOneMonthCommission").value.trim() ? document.getElementById("swamSalesQuantityWithinOneMonthCommission").value.trim() : "0";
	routeRecord['car-swamReturnFine'] = document.getElementById("car-swamReturnFine").value.trim() ? document.getElementById("car-swamReturnFine").value.trim() : "0";

	routeRecord['car-discountReturnFine'] = document.getElementById("car-discountReturnFine").value.trim() ? document.getElementById("car-discountReturnFine").value.trim() : "0";

	routeRecord['depreciation'] = document.getElementById("depreciation").value.trim() ? document.getElementById("depreciation").value.trim() : "0";
	routeRecord['shortFallFine'] = document.getElementById("shortFallFine").value.trim() ? document.getElementById("shortFallFine").value.trim() : "0";
	routeRecord['saleRevenuePercentage'] = document.getElementById("saleRevenuePercentage").value.trim() ? document.getElementById("saleRevenuePercentage").value.trim() : "0";

	routeRecord['discountDebitCollectionPercentage'] = document.getElementById("discountDebitCollectionPercentage").value.trim() ? document.getElementById("discountDebitCollectionPercentage").value.trim() : "0";

	routeRecord['boId'] = boId;
	console.log(routeRecord);
	loading();
	request.open("GET", "editCarRoute?input=" + JSON.stringify(routeRecord), true);
	request.send(null);
}

Stock.removeEditAdjustmentRow = function(row, event) {
	$("[name=edit-adjustmentStock_groundList]", $(row).parent().parent().parent()).val(0);
	checkAdjustmentKeyup(event);
	removeRow($(row).parent());
}

Stock.removeAdjustmentRow = function(row, event) {
	// do edit function
	$("[name=edit-adjustmentStock_groundList1]", $(row).parent().parent()).val(0);
	checkAdjustmentKeyup1(event);
	removeRow(row);
}