(function(){
	var currPage="blogs";
	var page ="";
	var shadowPosition=200;
	var titlePosition=60;	
	var delta =0;	
	var currentPosition=0;
	var titleMode="primary";
	
	$(window).on('hashchange', function(){
		loadPage();
	});

	$(window).on('load', function(){
		loadPage();
	});

	$(document).ready(function(){
		var wrap = $(window);
		var lastPosition = 0;

		wrap.on("scroll",function(e){	
			if($(window).width() <= 470){
				shadowPosition=75;
				titlePosition = 40
			}else{
				shadowPosition=200;
				titlePosition=60;
			}	
			currentPosition = $(window).scrollTop();		
			delta = lastPosition - currentPosition;
			lastPosition = currentPosition;			
			if(delta<0){
				if (currentPosition > shadowPosition) {
				  	$(".site-header-secondary").addClass("site-header-shadow");	
				  	titleMode="secondary";
				}else if (currentPosition > titlePosition) {
				  	$(".site-header-primary .site-header-title").addClass("hidden");			  	
				  	$(".site-header-secondary").removeClass("hidden");					  	
				}
			}else{
				if (currentPosition < titlePosition) {
				  	$(".site-header-primary .site-header-title").removeClass("hidden");			  	
				  	$(".site-header-secondary").addClass("hidden");	
				}else if (currentPosition < shadowPosition) {
					$(".site-header-secondary").removeClass("site-header-shadow");	
					titleMode="primary";
				}
			}
			  
		});

		$("nav").on("mouseenter","li",function(){			
			navBgHover($(this));			
		});
		$("nav").on("mouseleave","li",function(){						
			navBgReset();		
		});

		$("nav").on("click","li",function(){			
			changePage($(this));
		});

		$("footer").on("click",".footer-nav",function(){			
			changePage($(this));
		});

		$("#page-wrapper").on("click",".post",function(){		
			getPage($(this).data("url"),"#page-wrapper");	
		});
		$("#page-wrapper").on("click",".nav-tabs li",function(){
			console.log("tabs" + $(this))
  			$(this).tab('show')
		});
		$("#page-wrapper").on("click",".resume-job-title",function(){
			toggelClose($(this));
		});
		$("#page-wrapper").on("click",".resume-skill-title",function(){
			toggelClose($(this));
		});
	});
	
	function loadPage(uri){
		var url = uri||document.URL;	
		if(url.indexOf("#")===-1 || url.indexOf("html")===-1 ){
			url="/#/blogs.html";		
		}
		var url =url.substr(url.indexOf('#')+1);
		var theme = url.substr(1,url.indexOf("/",2)-1)		
		if(theme.length===0){
			theme=url.substr(1,url.indexOf(".html")-1);
		}			
		page = theme;
		if (url !== '') {
			getPage( url,"#page-wrapper");				
			$("#navbar-top").removeClass("in");
			$("#navbar-top").attr("aria-expanded","false");
			if(theme!==currPage){
				navBgAnimate();	
			}			
		}
	}

	function changePage(el){
		page = el.data("page");
		window.location.hash = "/" + page + ".html"
	}
	
	function getPage(url,id){		
		//console.log("url: " + url);
		$.get(url,function(data){
			$(id).html(data);	
		}).error(function(){
			loadPage("/#/blogs.html");	
		}).done(function(){
			window.location.hash =url;
			//console.log("TOP "+ currentPosition)
			if (currentPosition > $(id).offset().top) {
				$(window).scrollTop($(".site-header-shadow").offset.top+50);
			}
		});	
	}
	function navBgHover(el){
		$("#nav-bg").css({"height":el.outerHeight(),
							   "width":el.outerWidth(),
							   "left":el.offset().left});	
	}
	function navBgReset(){
		$("#nav-bg").addClass("hidden");
		$("#nav-bg").css({"height":"0",
							   "width":"0",
							   "left":"0"});	
	}
	function navBgAnimate(){		
		$("#nav-bg").attr("class",page);
		var id="#site-header-pri"
		if(titleMode==="secondary"){
			id="#site-header-sec";
		}else{
			id="#site-header-pri";
		}
		$("#nav-bg").animate({height:$(id).outerHeight(),
						  width:$(id).outerWidth(),
						  left:$(id).offset().left},0.26,function(){
							$("#site-header-pri").addClass(page);
							$("#site-header-sec").addClass(page);	
							$("#site-footer").addClass(page);					
							$("#site-header-pri").removeClass(currPage);
							$("#site-header-sec").removeClass(currPage)
							$("#site-footer").removeClass(currPage);
							currPage=page;
						  });

	}
	function toggelClose(el){
		console.log("State:" + el.attr('data-state'));
  		if(el.attr('data-state')==='closed'){
  			el.next().removeClass('closed');
  			el.attr('data-state','open');
  		}else{  				
  			el.next().addClass('closed');
  			el.attr('data-state','closed');
  		}
	}
})()