$(window).on('load',function(){	
	loadPage($(window)[0].location.hash);
});
$(document).ready(function(){	
	//Hyperlink click
	$(document).on('click','a[href]',function(event){
		loadPage($(this).attr("href"),event);
	});

	//Hero opacity control
	$(window).scroll(function(){
		if($(document).scrollTop()>0){
			$(".hero-pic").css("opacity", function(){
				return (1 - $(document).scrollTop()/1000 *5);
			});
		}else{
			$(".hero-pic").css("opacity", "1");
		}		
	});

	//Filter
	$('.content').on('click','.filter a',function(){	
		$('.filter li > a').removeClass('active');
		$(this).addClass('active');
		var filterBy = $(this).data('filter-by');
		$('.card').animate({'opacity':'0'},500,function(){		
			$('.card').css({'display':'none'});			
			$('.' + filterBy).css({'display':'inline-block'});				
			$('.' + filterBy).animate({'opacity':'1'},500)			
		});			
	});
})

var recentBlogs;
function loadPage(href,event){	
	if(href.length===0){
		href = "#/home";
	}
	if(href.indexOf("http")>-1 || href.indexOf("Resume")>-1){
		return true;
	}else if(href.substring(0,2)==='#/'){
		var page = href.substring(2)
		if(page.length===0){
			page = "home";
		}
		$(".content").load(page + ".html",function(data,status){
			if ( status === "error" ) {
				$(".content").load("error.html",function(){
					page="error";
					menuState(page);
					pageConfig();						
				});				
			}else{
				menuState(page);
				pageConfig();		
			}			
		})
		window.location.hash= "/" + page;
		return false;
	}else{
		event.preventDefault();
		var hash = href;
		$("body").animate({ scrollTop: ($("#"+hash).offset().top - 120)},1000);    				
		return false;
	}		
}


function menuState(page){
	var selMenu =  page.indexOf("/")>0 ? page.substring(0,page.indexOf("/")) : page;
	$(".nav li a").removeClass('active');
	$("a[href='#/" + selMenu + "']").addClass('active');
}

function pageConfig(){
	var config = $(".config");
	if(config.length){
		$(".hero-title").html(config.data("hero-title"));
		$("title").html(config.data("page-title"))
		
		if(config.data("hero-text")){
			$(".hero-text").html(config.data("hero-text"));
			$(".hero-text").show();
		}else{						
			$(".hero-text").hide();							
		}
		if(config.data("hero-sub-title")){
			$(".hero-sub-title").html(config.data("hero-sub-title"));
			$(".hero-sub-title").show();
		}else{						
			$(".hero-sub-title").hide();							
		}											
	}
	$("body").scrollTop(0);
	if($('#blog-list').length){			
		$.getJSON("./data/blog.json",loadBlogList);
	}
	if($('#recent-list').length){
		
		if(!recentBlogs){
			$.getJSON("./data/blog.json",loadRecentList);		
		}else{
			loadRecentList(recentBlogs);	
		}		
	}
	if($('#disqus_thread').length){			
		var disqus_config = function () {
		    this.page.url = window.location;
		    this.page.identifier = window.location;
		};
		loadDisqus();					
	}	
}

function loadBlogList(blogs){
	blogs.forEach(function(blog){
		var contentCard = $("<div/>",{class:'card-content'});
		var cardDetails = $("<div/>",{class:'card-details'});
		
		var link ={};
		link.href = blog.link;		
		link.html = "<h4>" + blog.title + "</h4>";
		cardDetails.append($("<a/>",link));

		var tagsDiv = $("<ul/>",{class:"list-unstyled article-type"})
		var tags = blog.tags.split(",");
		tags.forEach(function(tag){
			tagsDiv.append($("<li/>",{"text":tag}));
		})
		cardDetails.append(tagsDiv);

		var img = {};
		img.class = "img-responsive card-hero";
		img.alt = blog.title;
		img.src = blog.imageUrl;
		cardDetails.append($("<img/>",img));

		var summary = $("<p/>",{html:blog.summary}).append($("<a/>",{href:blog.link,text:"read more"}));
		cardDetails.append(summary);

		contentCard.append(cardDetails);
		$("#blog-list").append(contentCard);
	})

}

function loadRecentList(recentBlogs){
	var recentBlogsDiv = $("#recent-list");
	recentBlogs.forEach(function(blog){		
		recentBlogsDiv.append($("<li/>").append($("<a/>",{href:blog.link,text:blog.title})));
	})	
}

