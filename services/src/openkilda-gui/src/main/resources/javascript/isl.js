/*<![CDATA[*/

/** Below the javascript/ajax/jquery code to generate and display the isl and the flow details*/


/**
* Retieve object of the isl/links details json object
* and parse it
*/
$(document).ready(function(){
	
	var linkData = localStorage.getItem("linkData");	
	
//	console.log(linkData);
	var obj = JSON.parse(linkData)
    
	$("#wait1").css("display", "none");
	showLinkDetails(obj);
	getMetric();
	
})


/**call the metrics api to show list of the metric values in the drop down*/
function getMetric() {
	
	
	var linkData = localStorage.getItem("linkData");	
	var obj = JSON.parse(linkData)
	
	$.ajax({
		url : APP_CONTEXT + "/switch/metrics",
		type : 'GET',
		success : function(response) {
			var metricList=response;
			var optionHTML="";
			for(var i=0;i<=metricList.length-1;i++){
				optionHTML+="<option value="+metricList[i]+">"+metricList[i]+"</option>";
							
			}
			
			if(obj.hasOwnProperty("flowid")) {
				$("select.selectbox_menulist").html("").html(optionHTML);
				$('#menulist').val('pen.flow.packets');
			} else {
				$("select.selectbox_menulist").html("").html(optionHTML);
				$('#menulist').val('pen.isl.latency');
			}

			
		},
		dataType : "json"
	});
}


/**
generate and display the isl/low details in the html
*/
function showLinkDetails(linkData){	
	$(".graph_div").show();
	//check if object contains flow id
	if (linkData.hasOwnProperty("flowid")) {
		$('.flow_details_div').show();
		$('.isl_details_div').hide();
		$('#DownsampleID').hide();
		/*$('.isl-speed-latency-bandwidth-details-div').hide();
		$('.isl-source-details-div').show();
		$('.flow_detail_title_div').show();
		$('.isl_detail_title_div').hide();
		*/
		var size = 0, key;
					
		$(".flow_div_flow_id").html(linkData.flowid);
		
		$(".flow_div_source_switch").html(linkData.source_switch);
	    $(".flow_div_source_port").html(linkData.src_port);
	    $(".flow_div_source_vlan").html(linkData.src_vlan);
	    
	    $(".flow_div_destination_switch").html(linkData.target_switch);
	    $(".flow_div_destination_port").html(linkData.dst_port);  
	    $(".flow_div_destination_vlan").html(linkData.dst_vlan);
	    
	    $(".flow_div_Status").html(linkData.status);  
	    $(".flow_div_maximum_bandwidth").html(linkData.maximum_bandwidth);  
		
	} else {
		$('.flow_details_div').hide();
		$('.isl_details_div').show();
		$('#DownsampleID').show();
		/*$('.isl-speed-latency-bandwidth-details-div').show();
		$('.flow_details_id').hide();
		$('.isl_sbl_details').show();
		$('.isl_details').show();
		$('.flow_detail_title_div').hide();
		$('.isl_detail_title_div').show();*/
		var size = 0, key;
	
		$(".link_div_source_switch").html(linkData.source_switch);
	    $(".link_div_source_port").html(linkData.src_port);	    
	    $(".link_div_destination_switch").html(linkData.target_switch);
	    $(".link_div_destination_port").html(linkData.dst_port); 
	    
	    
	    $(".isl_div_speed").html(linkData.speed); 
	    $(".isl_div_latency").html(linkData.latency); 
	    $(".isl_div_avaliable_bandwidth").html(linkData.available_bandwidth); 	   
	}	
}

/* ]]> */