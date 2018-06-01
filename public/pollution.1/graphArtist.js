/*global angular*/
/*global AmCharts*/

angular.module("StatsApp")
  .controller("graphArtist", ["$scope", "$http",
        function($scope, $http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v2/pollution-cities";
            var api = "proxyART/artists/1/releases";
            
            
        $http.get(api).then(function(response1){
            $http.get(apiPropia).then(function(response2){

                var ultimoAux = [];
                for(var i=0;i<response2.data.length;i++){
                    ultimoAux.push({
                          "y": getRandomArbitrary(-25,26),
                          "x": getRandomArbitrary(-25,26),
                          "value": response1.data.releases[i].title,
                          "y2": getRandomArbitrary(-25,26),
                          "x2": getRandomArbitrary(-25,26),
                          "value2": response2.data[i].nitrous
                        });
                }
                
                console.log(ultimoAux);
                
                var chart = AmCharts.makeChart( "chartdiv", {
                        "type": "xy",
                        "theme": "light",
                        "balloon":{
                         "fixedPosition":true,
                        },
                        "dataProvider": ultimoAux,
                        "valueAxes": [ {
                          "position": "bottom",
                          "axisAlpha": 0
                        }, {
                          "minMaxMultiplier": 1.2,
                          "axisAlpha": 0,
                          "position": "left"
                        } ],
                        "startDuration": 1.5,
                        "graphs": [ {
                          "balloonText": "x:<b>[[x]]</b> y:<b>[[y]]</b><br>value:<b>[[value]]</b>",
                          "bullet": "circle",
                          "bulletBorderAlpha": 0.2,
                          "bulletAlpha": 0.8,
                          "lineAlpha": 0,
                          "fillAlphas": 0,
                          "valueField": "value",
                          "xField": "x",
                          "yField": "y",
                          "maxBulletSize": 100
                        }, {
                          "balloonText": "x:<b>[[x]]</b> y:<b>[[y]]</b><br>value:<b>[[value]]</b>",
                          "bullet": "diamond",
                          "bulletBorderAlpha": 0.2,
                          "bulletAlpha": 0.8,
                          "lineAlpha": 0,
                          "fillAlphas": 0,
                          "valueField": "value2",
                          "xField": "x2",
                          "yField": "y2",
                          "maxBulletSize": 100
                        } ],
                        "marginLeft": 46,
                        "marginBottom": 35,
                        "export": {
                          "enabled": true
                        }
                  });
               
               
               function getRandomArbitrary(min, max) {
                  var random = Math.random() * (max - min) + min;
                  return Math.round(random);
                  
                }
                

        }); 
    });     
}]);




/*
angular.module("StatsApp")
  .controller("graphArtist", ["$scope", "$http",
        function($scope, $http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v2/pollution-cities";
            var api = "proxyFOO/v1/competitions";
            
            
        $http.get(api).then(function(response1){
            $http.get(apiPropia).then(function(response2){
                
                var children = [];

                for(var i=0;i<response1.data.length;i++){
                    var ultimoAux = [];
                    ultimoAux.push({name: parseInt(response1.data[i].year)});
                    ultimoAux.push({name: response1.data[i].numberOfGames});
                    var tdDetail = {name: response1.data[i].league,children: ultimoAux};
                    children.push(tdDetail)
                } 
                  for(var i=0;i<response2.data.length;i++){
                    ultimoAux = [];
                    ultimoAux.push({name: parseInt(response2.data[i].year)});
                    ultimoAux.push({name: response2.data[i].nitrous});
                    var tdDetail1 = {name:  response2.data[i].city.toUpperCase().substring(3,0),children: ultimoAux};
                    children.push(tdDetail1)
                } 
                
                console.log(children);
                
                
                
               var pubs =
                {
                    "name": "",
                    "children": children
                };
                
                var diameter = 800;
                
                var margin = {top: 20, right: 240, bottom: 20, left: 120},
                    width = diameter,
                    height = diameter;
                    
                var i = 0,
                    duration = 350,
                    root;
                
                var tree = d3.layout.tree()
                    .size([360, diameter / 2 - 80])
                    .separation(function(a, b) { return (a.parent == b.parent ? 4 : 10) / a.depth; });
                
                var diagonal = d3.svg.diagonal.radial()
                    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });
                
                var svg = d3.select("body").append("svg")
                    .attr("width", width )
                    .attr("height", height )
                  .append("g")
                    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
                
                root = pubs;
                root.x0 = height / 2;
                root.y0 = 0;
                
                root.children.forEach(collapse); // start with all children collapsed
                update(root);
                
                d3.select(self.frameElement).style("height", "1600px");
                
                function update(source) {
                
                  // Compute the new tree layout.
                  var nodes = tree.nodes(root),
                      links = tree.links(nodes);
                
                  // Normalize for fixed-depth.
                  nodes.forEach(function(d) { d.y = d.depth * 80; });
                
                  // Update the nodes…
                  var node = svg.selectAll("g.node")
                      .data(nodes, function(d) { return d.id || (d.id = ++i); });
                
                  // Enter any new nodes at the parent's previous position.
                  var nodeEnter = node.enter().append("g")
                      .attr("class", "node")
                      //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
                      .on("click", click);
                
                  nodeEnter.append("circle")
                      .attr("r", 1e-6)
                      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
                
                  nodeEnter.append("text")
                      .attr("x", 10)
                      .attr("dy", ".35em")
                      .attr("text-anchor", "start")
                      //.attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length * 8.5)  + ")"; })
                      .text(function(d) { return d.name; })
                      .style("fill-opacity", 1e-6);
                
                  // Transition nodes to their new position.
                  var nodeUpdate = node.transition()
                      .duration(duration)
                      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
                
                  nodeUpdate.select("circle")
                      .attr("r", 4.5)
                      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
                
                  nodeUpdate.select("text")
                      .style("fill-opacity", 1)
                      .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length + 50)  + ")"; });
                
                  // TODO: appropriate transform
                  var nodeExit = node.exit().transition()
                      .duration(duration)
                      //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
                      .remove();
                
                  nodeExit.select("circle")
                      .attr("r", 1e-6);
                
                  nodeExit.select("text")
                      .style("fill-opacity", 1e-6);
                
                  // Update the links…
                  var link = svg.selectAll("path.link")
                      .data(links, function(d) { return d.target.id; });
                
                  // Enter any new links at the parent's previous position.
                  link.enter().insert("path", "g")
                      .attr("class", "link")
                      .attr("d", function(d) {
                        var o = {x: source.x0, y: source.y0};
                        return diagonal({source: o, target: o});
                      });
                
                  // Transition links to their new position.
                  link.transition()
                      .duration(duration)
                      .attr("d", diagonal);
                
                  // Transition exiting nodes to the parent's new position.
                  link.exit().transition()
                      .duration(duration)
                      .attr("d", function(d) {
                        var o = {x: source.x, y: source.y};
                        return diagonal({source: o, target: o});
                      })
                      .remove();
                
                  // Stash the old positions for transition.
                  nodes.forEach(function(d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                  });
                }
                
                // Toggle children on click.
                function click(d) {
                  if (d.children) {
                    d._children = d.children;
                    d.children = null;
                  } else {
                    d.children = d._children;
                    d._children = null;
                  }
                  
                  update(d);
                }
                
                // Collapse nodes
                function collapse(d) {
                  if (d.children) {
                      d._children = d.children;
                      d._children.forEach(collapse);
                      d.children = null;
                    }
                }
        }); 
    });     
}]);

*/