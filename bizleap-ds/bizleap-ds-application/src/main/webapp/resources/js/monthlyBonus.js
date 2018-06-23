
function openMonthlyBonus(){
	var locationId=document.getElementById("detail-location-boId").innerHTML;
	var request=new XMLHttpRequest;
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.status==200){
				hideLoading();
				document.getElementById("dialog-temp").innerHTML=request.responseText;
				document.getElementById("dialog-temp").className="dialog";		
				document.getElementById("location-bonus-name").innerHTML=document.getElementById("detail-location-name").innerHTML;
				document.getElementById("show-location-bonus-Id").innerHTML=document.getElementById("detail-location-boId").innerHTML;
				$("#location-bonus-date").datepicker({
								dateFormat: 'mm/yy',
								changeMonth: true,
								changeYear: true,
								showButtonPanel: true,

								onClose: function(dateText, inst) {
									var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
									var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
									$(this).val($.datepicker.formatDate('mm/yy', new Date(year, month, 1)));
								}
					});

				$("#location-bonus-date").focus(function () {
						$(".ui-datepicker-calendar").hide();
						$("#ui-datepicker-div").position({
							my: "center top",
							at: "center bottom",
							of: $(this)});
					});	
					
			}else{
				alert("Load view Bonus form error.Please try again. Error code is "+request.status);
			}
		}
	};
	request.open("GET","openMonthlyBonus",true);
	request.send(null);
}

function viewMonthlyBonus(){
	var locationId=document.getElementById("detail-location-boId").innerHTML;
	var date =document.getElementById("location-bonus-date").value;
	
	var request=new XMLHttpRequest;
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.status==200){
			hideLoading();
				document.getElementById("dialog-temp").innerHTML=request.responseText;
				document.getElementById("dialog-temp").className="dialog";
				document.getElementById("location-bonus-data").className="hide";	
				document.getElementById("location-bonus--selected-date").innerHTML=date;
				
			}else{
				alert("Load view Monthly Bonus form error.Please try again. Error code is "+request.status);
				hideLoading();
			}
		}
	};
	var parameter={};
	parameter["locationId"]=locationId;
	if(date==''){
		alert('Please fill date!');		
		return false;
	}
	parameter["date"]=date;
	loading();
	request.open("GET","viewMonthlyBonus?input="+JSON.stringify(parameter),true);
	request.send(null);
}
function saveMonthlyBonus(){
	var locationId=document.getElementById("location-bonus-Id").innerHTML;
	var date =document.getElementById("location-bonus--selected-date").innerHTML;
	var request=new XMLHttpRequest;
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.status==200){
				hideLoading();
				document.getElementById("dialog-temp").innerHTML=request.responseText;
				document.getElementById("dialog-temp").className="hide";				
			}else{
				alert("Saving Monthly Bonus form error.Please try again. Error code is "+request.status);
				hideLoading();
			}
		}
	};
	var parameter={};
	parameter["locationId"]=locationId;
	parameter["date"]=date;
	loading();
	request.open("POST","saveMonthlyBonus?input="+JSON.stringify(parameter),true);
	request.send(null);

}

function deleteMonthlyBonus(){
	var locationId=document.getElementById("location-bonus-Id").innerHTML;
	var date =document.getElementById("location-bonus--selected-date").innerHTML;
	var request=new XMLHttpRequest;
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.status==200){
				alert("Successfully Salary Deleted");
				document.getElementById("dialog-temp").attributes["class"].value = "hide";
				hideLoading();	
			}else{
				alert("Load delete Salary form error.Please try again. Error code is "+request.status);
				hideLoading();	
			}
		}
	};
	parameter["locationId"]=locationId;
	parameter["date"]=date;
	loading();	
	
	request.open("GET","makeDeleteMonthlyBonus?input="+JSON.stringify(parameter),true);
	request.send(null);		
}
