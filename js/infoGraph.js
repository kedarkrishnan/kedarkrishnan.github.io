(function (){
	
	var infoGraph={
		skillLevel:{
			options:{
				labelColor	:"#000",
				labelStart	:80,
				bubleColor	:"#03A9F4",
				bubleRadius	:5,
				bubleStrokeColor:"#03A9F4",
				maxLevel	:10,
				showMax		:true
			}
		}
	};	
	
	var skillLevel = infoGraph.skillLevel;

	
	skillLevel.labelColor=function(labelColor){
		var self = this;
		skillLevel.options.labelColor=labelColor;		
		return self;
	};
	
	skillLevel.labelStart=function(labelStart){
		var self = this;
		skillLevel.options.labelStart=labelStart;
		return self;
	};

	skillLevel.bubleColor=function(bubleColor){
		var self = this;
		skillLevel.options.bubleColor=bubleColor;
		return self;
	};

	skillLevel.bubleRadius=function(bubleRadius){
		var self = this;
		skillLevel.options.bubleRadius=bubleRadius;
		return self;
	};
	
	skillLevel.bubleStrokeColor=function(bubleStrokeColor){
		var self = this;
		skillLevel.options.bubleStrokeColor=bubleStrokeColor;
		return self;
	};

	skillLevel.maxLevel=function(maxLevel){
		var self = this;
		skillLevel.options.maxLevel=maxLevel;
		return self;
	};

	skillLevel.showMax=function(showMax){
		var self = this;
		skillLevel.options.showMax=showMax;
		return self;
	};
	
	skillLevel.draw = function(id,data){
		var options=skillLevel.options;
		var spacer = (options.bubleRadius*2+5);
		
		var skillSvg = d3.select("#"+id).append("div").selectAll("skill")
						 .data(data)
						 .enter()
						 .append("svg")
						 .attr("width",spacer*options.maxLevel+ options.labelStart + spacer)
						 .attr("height",spacer*1.5)
						 .style("display","block");

						skillSvg.append("text")		
								.attr("x",options.labelStart)
								.attr("y",spacer*1.15)	
								.style("font-size",options.bubleRadius *0.175+"em")				
								.attr("text-anchor","end")										
								.text(function(d){return d.skill;})
								.attr("fill",options.labelColor);


						 skillSvg.selectAll("skilllevel")
								 .data(function (d){
								 		return  d3.range(d.level);})
								 .enter()
								 .append("circle")
								 .attr("cx", function(d,i){return i*spacer+options.labelStart+spacer;})
								 .attr("cy",spacer*1.5/2)
								 .attr("r",options.bubleRadius)								 
								 .attr("fill","#fff")
								 .transition()
								 .attr("fill",options.bubleColor)								 													 
								 .duration(1000)
								 .delay(function(d,i){
								 	return 100*i;
								 });


				
		if(options.showMax){				 
							 skillSvg.selectAll("totalLevel")
									 .data(function (d){ return  d3.range(options.maxLevel);})
									 .enter()
									 .append("circle")
									 .attr("cx", function(d,i){return i*spacer + options.labelStart+spacer;})
									 .attr("cy",spacer*1.5/2) 
									 .attr("r",options.bubleRadius)	
									 .attr("stroke-width",1.5)							 
									 .attr("stroke",options.bubleStrokeColor)	
									 .attr("fill","none");							 
		}
		reset();		
	}; 

	reset=function (){
		skillLevel.options.labelColor="#000";		
		skillLevel.options.labelStart=80;		
		skillLevel.options.bubleColor="#03A9F4";
		skillLevel.options.bubleRadius=5;		
		skillLevel.options.bubleStrokeColor="#03A9F4";		
		skillLevel.options.maxLevel=10;		
		skillLevel.options.showMax=true;
	};

	this.infoGraph = infoGraph;
})();