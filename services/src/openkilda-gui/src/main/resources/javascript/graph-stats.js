/*<![CDATA[*/
/** Below the javascript/ajax/jquery code to generate and display the stats api results.
* By default api will show stats of the previous day
* user can generate stats via filter elements on the html page */


/**
* Execute  getGraphData function when onchange event is fired 
* on the filter input values of datetimepicker, downsampling and menulist.
*/
$(function() {
		
		$("#datetimepicker7,#datetimepicker8,#downsampling,#menulist,#autoreload").on("change",function() {
			getGraphData();
		});
	});
	


/**
* Execute this function when page is loaded
* or when user is directed to this page.
*/
$(document).ready(function() {

	
	var linkData = localStorage.getItem("linkData");	
	var obj = JSON.parse(linkData)
	

	var source = obj.source_switch.replace(/:/g, "")
	var target = obj.target_switch.replace(/:/g, "")
	
	$.datetimepicker.setLocale('en');
	var date = new Date()
	
	var yesterday = new Date(date.getTime());
	yesterday.setDate(date.getDate() - 1);
	
	var YesterDayDate = moment(yesterday).format("YYYY/MM/DD HH:mm:ss");
	var EndDate = moment(date).format("YYYY/MM/DD HH:mm:ss");
	
	var convertedStartDate = moment(YesterDayDate).format("YYYY-MM-DD-HH:mm:ss");
	var convertedEndDate = moment(EndDate).format("YYYY-MM-DD-HH:mm:ss");
	
	var downsampling = "10m";
	
	$("#downsampling").val(downsampling)
	$("#datetimepicker7").val(YesterDayDate);
	$("#datetimepicker8").val(EndDate);

	$('#datetimepicker7').datetimepicker({
		  format:'Y/m/d h:i:s',
	});

	$('#datetimepicker8').datetimepicker({
		  format:'Y/m/d h:i:s',
	});

	$('#datetimepicker_dark').datetimepicker({theme:'dark'})
	var obj = JSON.parse(linkData)
	
	if(obj.hasOwnProperty("flowid")) {
		$.ajax({
			dataType: "jsonp",				
			url : APP_CONTEXT + "/stats/"+convertedStartDate+"/"+convertedEndDate+"/pen.flow.packets"+"?"+"switchid="+source,	
			
			type : 'GET',
			success : function(response) {	
					
				$("#wait1").css("display", "none");	
				showStatsData(response);
			},
			dataType : "json"
		});
	} else {
		$.ajax({
			dataType: "jsonp",				
			url : APP_CONTEXT + "/stats/"+convertedStartDate+"/"+convertedEndDate+"/pen.isl.latency"+"?"+"src_switch="+source+"&src_port="+obj.src_port+"&dst_switch="+target+"&dst_port="+obj.dst_port+"&averageOf=10m",	
			type : 'GET',
			success : function(response) {	
					
				$("#wait1").css("display", "none");	
				showStatsData(response);
			},
			dataType : "json"
		});
	}
})


/**
* Execute this function to show visulization of stats graph
* represnting time and metric on the axis.
*/
function showStatsData(response) {	
	var data = response
		var graphData = [];
		if(data.length){
			var getValue = data[0].dps;
			$.each(getValue, function (index, value) {
				
			  graphData.push([new Date(Number(index*1000)),value])

			 }) 
		}
		
		var g = new Dygraph(document.getElementById("graphdiv"), graphData,
        {
		    drawPoints: true,
		    labels: ['Time', 'pen.isl.latency']
		});
}


/**
* Execute this function to  show stats data whenever user filters data in the
* html page.
*/
function getGraphData() {
	
	
	var regex = new RegExp("^\\d+(s|h|m){1}$");

	var currentDate = new Date();
	var startDate = new Date($("#datetimepicker7").val());

	var endDate =  new Date($("#datetimepicker8").val());
	var convertedStartDate = moment(startDate).format("YYYY-MM-DD-HH:mm:ss");
	

	
	var convertedEndDate = moment(endDate).format("YYYY-MM-DD-HH:mm:ss");
	
	var downsampling = $("#downsampling").val();
	
	var downsamplingValidated = regex.test(downsampling);
	
	var selMetric=$("select.selectbox_menulist").val();
		
	
	var valid=true;
	
	if(downsamplingValidated == false) {	
		
		$.toast({
		    heading: 'Error',
		    text: 'Please enter correct downsampling',
		    showHideTransition: 'fade',
		    position: 'top-right',
		    icon: 'error'
		})
		
		valid=false;
		return
	}
	
	if(startDate.getTime() > currentDate.getTime()) {
		$.toast({
		    heading: 'Error',
		    text: 'startDate should not be greater than currentDate.',
		    showHideTransition: 'fade',
		    position: 'top-right',
		    icon: 'error'
		})
		
		
		valid=false;
		return;
	}
	
	else if(endDate.getTime() < startDate.getTime()){
		$.toast({
		    heading: 'Error',
		    text: 'endDate should not be less than startDate',
		    showHideTransition: 'fade',
		    position: 'top-right',
		    icon: 'error'
		})
		valid=false;
		return;
	}
	
	var autoreload = $("#autoreload").val();
	
	var numbers = /^[-+]?[0-9]+$/;  
	
	var checkNo = $("#autoreload").val().match(numbers);
	
	
	//if filter values are valid then call stats api
	if(valid){
		
		
		var linkData = localStorage.getItem("linkData");	
		var obj = JSON.parse(linkData)
		

		var source = obj.source_switch.replace(/:/g, "")
		var target = obj.target_switch.replace(/:/g, "")
		
		

		
		
			if(obj.hasOwnProperty("flowid")) {
		$.ajax({
			dataType: "jsonp",				
			url : APP_CONTEXT + "/stats/"+convertedStartDate+"/"+convertedEndDate+"/"+selMetric+"?"+"switchid="+source,	
			
			//http://192.168.80.187:1010/openkilda/stats/2017-12-02-03:16:02/2017-12-05-09:29:38/pen.flow.packets?switchid=deadbeef00000002&switchid=deadbeef00000001
			type : 'GET',
			success : function(response) {	
					
				$("#wait1").css("display", "none");	
				showStatsData(response);
			},
			dataType : "json"
		});
	} else {
		$.ajax({
			dataType: "jsonp",					
			url : APP_CONTEXT + "/stats/"+convertedStartDate+"/"+convertedEndDate+"/"+selMetric+"?"+"src_switch="+source+"&src_port="+obj.src_port+"&dst_switch="+target+"&dst_port="+obj.dst_port+"&averageOf="+downsampling,
			
			type : 'GET',
			success : function(response) {	
					
				$("#wait1").css("display", "none");	
				showStatsData(response);
				
			},
			dataType : "json"
		});
		
	}
				
			try {
				clearInterval(graphInterval);
			} catch(err) {

			}
			
			if(autoreload){
				graphInterval = setInterval(function(){
					callIntervalData() 
				}, 1000*autoreload);
			}
		
	}
	
}

function callIntervalData(){
	
	var currentDate = new Date();
	
	var startDate = new Date($("#datetimepicker7").val());
	var convertedStartDate = moment(startDate).format("YYYY-MM-DD-HH:mm:ss");
	
	var endDate = new Date()
	var convertedEndDate = moment(endDate).format("YYYY-MM-DD-HH:mm:ss");
	
	var downsampling =$("#downsampling").val()
	
	var linkData = localStorage.getItem("linkData");	
	var obj = JSON.parse(linkData)
	
	
	var selMetric=$("select.selectbox_menulist").val();

	var source = obj.source_switch.replace(/:/g, "")
	var target = obj.target_switch.replace(/:/g, "")
		
		if(obj.hasOwnProperty("flowid")) {
		$.ajax({
			dataType: "jsonp",				
			url : APP_CONTEXT + "/stats/"+convertedStartDate+"/"+convertedEndDate+"/"+selMetric+"?"+"switchid="+source,	
			
			type : 'GET',
			success : function(response) {	
					
				$("#wait1").css("display", "none");	
				showStatsData(response);
			},
			dataType : "json"
		});
	} else {
		$.ajax({
			dataType: "jsonp",

			url : APP_CONTEXT + "/stats/"+convertedStartDate+"/"+convertedEndDate+"/"+selMetric+"?"+"src_switch="+source+"&src_port="+obj.src_port+"&dst_switch="+target+"&dst_port="+obj.dst_port+"&averageOf="+downsampling,

			type : 'GET',
			success : function(response) {	
					console.log(response)
				showStatsData(response);
			},
			dataType : "json"
		});
		
	}
	
}

function autoreload(){
	$("#autoreload").toggle();
	var checkbox =  $("#check").prop("checked");
	if(checkbox == false){
		
		$("#autoreload").val('');
		clearInterval(callIntervalData);
		clearInterval(graphInterval);
		
	}
}

/* ]]> */