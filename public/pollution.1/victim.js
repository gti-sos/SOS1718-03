 angular.module("StatsApp").controller("victim", ["$scope", "$http", function($scope, $http) {
     
     console.log("List Ctrl initialized!");
       var apiPropia = "/api/v2/global-warmings";
        var api2 = "proxyVIC/api/v1/homicide-reports-data";
            
     
       $http.get(api2).then(function(response1) {
                $http.get(apiPropia).then(function(response2) {
                    
                    var ultimo = [];
                    var ultimo1 = [];
                    var ultimo2 = [];
                    var a=0;
                    var a1=0;
                    var a2=0;
                     for (var i = 0; i < response1.data.length; i++) {
                          a = a + parseInt(response1.data[i].victim_count);
                     }
                     ultimo.push(a);
                     for (var i = 0; i < response2.data.length; i++) {
                          a1 = a1 + parseInt(response2.data[i].temperature);
                     }
                     ultimo1.push(a1);
                     for (var i = 0; i < response2.data.length; i++) {
                          a2 = a2 + parseInt(response2.data[i].peakPower);
                     }
                     ultimo2.push(a2);
                     console.log(ultimo);
                     console.log(ultimo1);
                     console.log(ultimo2);
                    
var myConfig = {            
backgroundColor:'#FBFCFE',
 	type: "ring",
 	title: {
 	  text: "homicide reports data and globalWarmings",
 	  fontFamily: 'Lato',
 	  fontSize: 14,
 	  // border: "1px solid black",
 	  padding: "15",
 	  fontColor : "#1E5D9E",
 	},
 	 	plot: {
 	  slice:'50%',
 	  borderWidth:0,
 	  backgroundColor:'#FBFCFE',
 	  animation:{
 	    effect:2,
 	    sequence:3
 	  },
 	  valueBox: [
 	    {
 	      type: 'all',
 	      text: '%t',
 	      placement: 'out'
 	    }, 
 	    {
 	      type: 'all',
 	      text: '%npv%',
 	      placement: 'in'
 	    }
 	  ]
 	},
  tooltip:{
 	    fontSize:16,
 	    anchor:'c',
 	    x:'50%',
 	    y:'50%',
 	    sticky:true,
 	    backgroundColor:'none',
 	    borderWidth:0,
 	    thousandsSeparator:',',
 	    text:'<span style="color:%color"> %t</span><br><span style="color:%color">total amount: %v</span>',
      mediaRules:[
        {
            maxWidth:500,
       	    y:'54%',
        }
      ]
  },
 	plotarea: {
 	  backgroundColor: 'transparent',
 	  borderWidth: 0,
 	  borderRadius: "0 0 0 10",
 	  margin: "70 0 10 0"
 	},
 	legend : {
    toggleAction:'remove',
    backgroundColor:'#FBFCFE',
    borderWidth:0,
    adjustLayout:true,
    align:'center',
    verticalAlign:'bottom',
    marker: {
        type:'circle',
        cursor:'pointer',
        borderWidth:0,
        size:5
    },
    item: {
        fontColor: "#777",
        cursor:'pointer',
        offsetX:-6,
        fontSize:12
    },
    mediaRules:[
        {
            maxWidth:500,
            visible:false
        }
    ]
 	},
 	scaleR:{
 	  refAngle:270
 	},
	series : [{
                            
                            text: 'Victim Count',
                            values: ultimo,
                            lineColor: "#00BAF2",
                			backgroundColor: "#00BAF2",
                			lineWidth: 1,
                			marker: {
                			  backgroundColor: '#00BAF2'
			}
                        },{
                            text: 'Temperature',
                            values:ultimo1,
                            	lineColor: "#E80C60",
                    			backgroundColor: "#E80C60",
                    			lineWidth: 1,
                    			marker: {
                    			  backgroundColor: '#E80C60'
			}
                        },
                        {
                            text: 'PeakPower',
                            values:ultimo2,
                            lineColor: "#9B26AF",
                			backgroundColor: "#9B26AF",
                			lineWidth: 1,
                			marker: {
                			  backgroundColor: '#9B26AF'
                			}
                        }]
};
 
zingchart.render({ 
	id : 'myChart', 
  data: {
    gui:{
      contextMenu:{
        button:{
          visible: true,
          lineColor: "#2D66A4",
          backgroundColor: "#2D66A4"
        },
        gear: {
          alpha: 1,
          backgroundColor: "#2D66A4"
        },
        position: "right",
        backgroundColor:"#306EAA", /*sets background for entire contextMenu*/
        docked: true, 
        item:{
          backgroundColor:"#306EAA",
          borderColor:"#306EAA",
          borderWidth: 0,
          fontFamily: "Lato",
          color:"#fff"
        }
      
      },
    },
    graphset: [myConfig]
  },
	height: '499', 
	width: '99%' 
});
});
});
}]);


