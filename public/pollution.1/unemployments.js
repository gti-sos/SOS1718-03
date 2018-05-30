 angular.module("StatsApp").controller("unemployments", ["$scope", "$http", function($scope, $http) {
     
     console.log("List Ctrl initialized!");
       var apiPropia = "/api/v2/global-warmings";
        var api2 = "proxyUNE/api/v1/unemployments";
            
     
       $http.get(api2).then(function(response1) {
                $http.get(apiPropia).then(function(response2) {
                    
                    var ultimo = [];
                    var ultimo1 = [];
                    var ultimo2 = [];
                    var a=0;
                    var a1=0;
                    var a2=0;
                     for (var i = 0; i < response1.data.length; i++) {
                          a = a + parseInt(response1.data[i].young);
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
  "type":"venn",
  "title":{
    "text": "unemployments and globalWarmings"
  },
  "tooltip":{
    "text": "%t",
    "border-radius": 5,
    "font-size": 15
  },
  "series":[
    {
      "values":ultimo,
      "join":[15],
      "text": "total sum of young people",
      "background-color":'#006ACC',
      "tooltip":{
        "background-color":'#006ACC',
      }
    },
    {
      "values":ultimo1,
      "join":[15],
      "text": "total sum of temperature",
      "background-color":'#FBB148',
      "tooltip":{
        "background-color":'#FBB148',
      }
    },
    {
      "values":ultimo2,
      "join":[15],
      "text": "total sum of peakPower",
      "background-color":'#DD0031',
      "tooltip":{
        "background-color":'#DD0031',
      }
    }
  ]
};
 
zingchart.render({ 
	id : 'unemployments', 
	data : myConfig, 
	height: '100%', 
	width: "100%" 
});
});
});
}]);


