function createCookie(t,e,o){var n=new Date;n.setTime(n.getTime()+24*o*60*60*1e3),document.cookie=encodeURI(t)+"="+encodeURI(e)+";domain=."+document.domain+";path=/;; expires="+n.toGMTString()}function readCookie(t){for(var e=t+"=",o=document.cookie.split(";"),n=0;n<o.length;n++){for(var i=o[n];" "===i.charAt(0);)i=i.substring(1,i.length);if(0===i.indexOf(e))return i.substring(e.length,i.length)}return null}$=$||jQuery,$(document).ready(function(){"use strict";$(".search-result-item-image").hover(function(){$(".search-result-item-headline",$(this).parent()).addClass("search-hover")},function(){$(".search-result-item-headline",$(this).parent()).removeClass("search-hover")})}),$(document).ready(function(){"use strict";$("#comments-link").click(function(){$("html, body").animate({scrollTop:$("#comments").offset().top-100},2e3)})}),$(document).ready(function(){"use strict";if(null==readCookie("greenpeace")){$(".cookie-block").show();const t=$(".cookie-block").height();$("footer").css("margin-bottom",t+"px")}$("#hidecookie").click(function(){$(".cookie-block").slideUp("slow"),$("footer").css("margin-bottom","0"),createCookie("greenpeace","2",365)})}),$(document).ready(function(){"use strict";$(".country-select-dropdown").click(function(){$(this).parent().toggleClass("active-li"),$(".country-select-box").toggle()}),$(".country-select-box .country-list li").click(function(){$(this).parents(".country-select-box").find("li").removeClass("active"),$(this).addClass("active")}),$(".country-selectbox").click(function(){$(this).toggleClass("active"),$(this).parent().find(".option-contry").toggleClass("active")})}),$(document).ready(function(){"use strict";$(".page-template img, .post-content img").each(function(){$(this).attr("title",$(this).attr("alt"))})}),$(document).ready(function(){"use strict";if($(document).on("click",[".navbar-dropdown-toggle",".country-dropdown-toggle",".navbar-search-toggle"].join(),function(t){t.preventDefault(),t.stopPropagation();var e=$(this),o=e.data("target");if(!o)throw new Error("Missing `data-target` attribute: specify the container to be toggled");var n=e.data("toggle");if(!n)throw new Error("Missing `data-toggle` attribute: specify the class to toggle");$(o).toggleClass(n),$(this).toggleClass(n),e.attr("aria-expanded",function(t,e){return"false"===e?"true":"false"})}),$(document).on("click",function(t){var e=t.target;$('button[aria-expanded="true"]').each(function(t,o){var n=$(o),i=$(n.data("target")).get(0);i&&!$.contains(i,e)&&n.trigger("click")})}),$(document).bind("keyup",function(t){27===t.which&&$(document).trigger("click")}),$(document).on("click",".close-navbar-dropdown",function(t){t.preventDefault(),$(".navbar-dropdown-toggle").trigger("click")}),$(window).width()<=768){var t,e=0,o=5,n=$(".top-navigation").outerHeight();$(window).scroll(function(){t=!0}),setInterval(function(){t&&(!function(){var t=$(this).scrollTop();Math.abs(e-t)<=o||(t>e&&t>n?$(".top-navigation").removeClass("nav-down").addClass("nav-up"):t+$(window).height()<$(document).height()&&$(".top-navigation").removeClass("nav-up").addClass("nav-down"),e=t)}(),t=!1)},250);var i=$(".mobile-menus");$(document).click(function(){$(".menu").hasClass("active")&&(i.animate({left:0==parseInt(i.css("left"),10)?-320:0}),$(".menu").removeClass("active")),$(".search-box").hasClass("active")&&a.slideToggle().toggleClass("active")}),$(".menu").click(function(){event.stopPropagation(),$(this).toggleClass("active"),i.animate({left:-320==parseInt(i.css("left"),10)?0:-320})});var a=$("#search .search-box");$("#search-trigger").on("click",function(t){t.stopPropagation(),a.slideToggle().toggleClass("active")})}}),$(document).ready(function(){"use strict";$('div.wp-caption[class*="align"]').each(function(){const t=$(this).find("img").attr("width");$(this).css("cssText","width: "+t+"px !important;")})}),$(document).ready(function(){"use strict";$('a[href$=".pdf"]').each(function(){let t=$(this);t.parent("h1, h2, h3, h4, h5, h6").length||t.has("img").length||t.addClass("icon-link pdf-link")})});
//# sourceMappingURL=main.js.map
