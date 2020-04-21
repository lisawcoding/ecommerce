let lan;
if((navigator.language || navigator.browserLanguage).toLowerCase()!="zh-tw"){
	lan="en";
} else {
	lan="zh";
}
function translate(){
	const url="resume.json";
	fetch(url)
	.then(function(res){
		if(!res.ok) {
			throw Error(res.status);
		}
		return res.json();
	})
	.then(function(data){
		console.log(data.description);

		// document.querySelector(".lan").innerText=navigator.language+"&"+lan;
		document.querySelectorAll("*[data-lan]").forEach(function(elm){
			elm.innerHTML=eval(`data.${elm.dataset.lan}.${lan}`);
		})	
		document.querySelector("*[data-lan='submit']").value=eval(`data.submit.${lan}`);
		document.querySelectorAll("*[data-list]").forEach(function(elm){
			elm.innerHTML="";
			for(var i=0; i<eval(`data.${elm.dataset.list}.${lan}`).length; i++){
				var node=elm.appendChild(document.createElement("li"));
				node.innerText=eval(`data.${elm.dataset.list}.${lan}[i]`);
			}
		})

		for(var i=0; i<data.projects.length; i++){
			console.log(data.projects[i].cards[0]);
			
			var yearCln=document.querySelector(".year").cloneNode(true);
			yearCln.setAttribute("class", "year");
			yearCln.setAttribute("data-no", i);
			document.querySelector(".projects .container").insertBefore(yearCln, document.querySelector(".year.clone"));

			document.querySelectorAll(".year:not(.clone)")[i].querySelector("h3").innerText=eval(`data.projects[i].year.${lan}`);

		}

		document.querySelectorAll(".year:not(.clone)").forEach(function(y){
			var n=Number(y.getAttribute("data-no"));
			for(var i=0; i<data.projects[n].cards.length; i++){
				var cardCln=y.querySelector(".clone").cloneNode(true);
				cardCln.setAttribute("class", "card");
				// cardCln.setAttribute("data-no", i);
				y.querySelector(".cards").insertBefore(cardCln, y.querySelector(".clone"))

				y.querySelectorAll("a")[i].href=data.projects[n].cards[i].link;
				// y.querySelectorAll("iframe")[i].src=data.projects[n].cards[i].link;
				y.querySelectorAll("img")[i].src=data.projects[n].cards[i].img;
				y.querySelectorAll("img")[i].alt=eval(`data.projects[n].cards[i].${lan}.title`)+"image";
				y.querySelectorAll(".title")[i].innerText=eval(`data.projects[n].cards[i].${lan}.title`);

				var number=(eval(`data.projects[n].cards[i].${lan}.des`).length);
				// console.log(number);
				for(var a=0; a<number; a++){

					var node=document.createElement("li");
					var nodetext=document.createTextNode((eval(`data.projects[n].cards[i].${lan}.des[a]`)));
					
					node.appendChild(nodetext);
					y.querySelectorAll(".description")[i].appendChild(node);
				}
			}
			y.querySelector(".card.clone").remove();
		})
	})
	.catch(function(err) {
		console.log(err);
	})	
}
translate();

//navbar***********************************************************************************
//language switch
let hamburger=document.querySelector(".hamburger");
let navbar=document.querySelector(".navbar");
let navItemContainer=document.querySelector(".navItem-container");
let en=document.querySelector("#en");
let zh=document.querySelector("#zh");

document.querySelector(`#${lan}`).classList.add("active");
function runProject(){
	document.querySelectorAll(".year:not(.clone)").forEach(function(y){
		y.remove();
	})
	translate();
}
en.addEventListener("click", function(){
	zh.classList.remove("active");
	this.classList.add("active");
	lan="en";
	runProject();
})
zh.addEventListener("click", function(){
	en.classList.remove("active");
	this.classList.add("active");
	lan="zh";
	runProject();
})


//navbar active seleted
let sections=document.querySelectorAll("section");
let navItems=document.querySelectorAll(".navItem");

function removeActive(){
	for(var i=0; i<navItems.length; i++){
		navItems[i].classList.remove("active");
	}
}

// navItem active on scroll
window.addEventListener("scroll",function(){
	// document.querySelector(".language-container .lan").innerText=window.pageYOffset.toFixed(0);
	for(var i=0; i<sections.length; i++){
		if(window.pageYOffset==0){
			removeActive();
			navItems[0].classList.add("active");
		} else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
			removeActive();
			navItems[sections.length-1].classList.add("active");
		}
		if(window.pageYOffset>=sections[i].offsetTop+sections[i].offsetHeight-navbar.offsetHeight){
			removeActive();
			navItems[i+1].classList.add('active');
		}
	}
})


//navItem active on click	
function clickNav(n){
	// sections[n].scrollIntoView({behavior:'smooth'});
	window.scrollTo(0, sections[n].offsetTop-navbar.offsetHeight+1);
	document.querySelector(".game").play();
	
	if(window.getComputedStyle(hamburger).getPropertyValue("display")=="flex"){
		navItemContainer.classList.remove("show");
		hamburger.classList.remove("change");
		// hamburger.classList.remove("active");
	}
	removeActive();
	navItems[n].classList.add("active");
}

//hambuerger
hamburger.addEventListener("click", function(){
	navItemContainer.classList.toggle("show");
	// hamburger.classList.toggle("active");
	this.classList.toggle("change");
})
//id photo slider*************************************************************************
// var imgs=document.querySelectorAll(".slide-inner img");
// var slideInner=document.querySelector(".slide-inner");
// var current=0;
// var slide=true;

// async function imgLoop(){
// 		imgs[current].classList.add("slideout");
// 		if(current<imgs.length-1){
// 			current++;
// 		} else {
// 			current=0;
// 		}	                                                                             

// 		var firstImg=document.querySelector(".slide-inner img:nth-of-type(1)");
// 		var ml=getComputedStyle(firstImg, null).getPropertyValue("margin-left");
// 		var width=getComputedStyle(firstImg, null).getPropertyValue("width");
// 		if(Math.abs(parseFloat(ml))>=parseFloat(width)){
			
// 			const slideOut= await firstImg.classList.remove("slideout");
// 			const slideInner= await slideInner.appendChild(firstImg);
// 			slideOut();
// 			slideInner();
// 		}
// 	t=setTimeout("imgLoop()",1000);
// }
// window.addEventListener("load", function(){
// 	setTimeout("imgLoop()",3000);
// })
// // slider autoplay stop when hover
// slideInner.addEventListener("mouseover", function(){
// 	clearTimeout();
// })
// slideInner.addEventListener("mouseleave", function(){
// 	imgLoop();
// })

let dots=document.querySelectorAll(".dot");
let next=document.querySelector(".next");
let prev=document.querySelector(".prev");
var slides=document.querySelectorAll(".id-photo img");
let current=0;

function remove(){
    for(var i=0; i<dots.length; i++){
        dots[i].classList.remove("dot-active");
        slides[i].classList.remove("slide-active");
    }
}
function slideAction(){
    for(var i=0; i<dots.length; i++){
        if(dots[i].classList.contains("dot-active")){
            console.log(slides[i]);
            slides[i].classList.add("slide-active");
            current=i;
        }
    }   
}
dots.forEach(function(dot){
    dot.addEventListener("click", function(){
        remove();
        this.classList.add("dot-active");
        slideAction();
    })
})
next.addEventListener("click", function(){
    if(current<dots.length-1){
        current++;
    } else {
        current=0;
    }    
    remove();
    dots[current].classList.add("dot-active");  
    slideAction();  
})
prev.addEventListener("click", function(){
    if(current<=0){
        current=dots.length-1;
    } else {
        current--;
    }    
    remove();
    dots[current].classList.add("dot-active");    
    slideAction();
})


// form sumbmit^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//initialize Firebase
 var config = {
    apiKey: "AIzaSyDiCsaX3HCEqJbtCHYrPDIdtrw9LTYEIek",
    authDomain: "contactform-c2a0c.firebaseapp.com",
    databaseURL: "https://contactform-c2a0c.firebaseio.com",
    projectId: "contactform-c2a0c",
    storageBucket: "contactform-c2a0c.appspot.com",
    messagingSenderId: "205647187411"
  };
   firebase.initializeApp(config);
   
//reference messages collection
var messagesRef=firebase.database().ref("messages");

//raddom number checking
var a=Math.floor(Math.random()*10+1);
var b=Math.floor(Math.random()*10+1);
var sum=document.querySelector(".sum");
document.querySelector(".a").innerHTML=a;
document.querySelector(".b").innerHTML=b;

// document.querySelector(".Submit").disabled = true;
var answer;
sum.addEventListener("keyup", function(){
	console.log(1);
	if(Number(document.querySelector(".sum").value)==a+b){
	console.log("correct");
	document.querySelector(".submit").style.background="var(--brown)";
	document.querySelector(".submit").style.color="#f2f2f2";
	answer=true;
} else {
	answer=false;
}
})
// function to get form value
document.querySelector("#contact-form").addEventListener("submit",function(e){
	e.preventDefault();//sent to html page by default
	if(answer==true){
	// get value
	var name=document.querySelector("#name").value;
	var phone=document.querySelector("#phone").value;
	var email=document.querySelector("#email").value;
	var message=document.querySelector("#message").value;
	
	//save message
	saveMessage(name, phone, email, message)
	// show alert
	document.querySelector(".alert-ok").style.display="block";
	//clear form input
	document.querySelector("#contact-form").reset();		
	} else {
		document.querySelector(".alert-ng").style.display="block";
	}
	setTimeout(function(){
		document.querySelector(".alert-ok").style.display="none";
		document.querySelector(".alert-ng").style.display="none";
	},3000)
})

function saveMessage(name, email, phone, message){
	var newMessageRef=messagesRef.push();
	newMessageRef.set({
		name:name,
		phone:phone,
		email:email,
		message:message,
	})
}

// //go to Top Btn^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
var topBtn=document.querySelector("#topBtn");
window.onscroll = function() {showScrollBtn()};

function showScrollBtn() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else{
        topBtn.style.display = "none";
}
}
function goToTop() {
	document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

    // var swiper = new Swiper('body', {
    //   slidesPerView: 1,
    // });
// var mediaElem=document.querySelector(".main2 .computer").contentWindow.document.getElementsByTagName("*");

// var x=window.matchMedia("(max-width:791px)");

// function resetCSSMedia(){
//     if(x.matches){
//         // mediaElem.removeAttribute();
//         removeRule();
//         // mediaElem.removeAttribute('style');
//     }
// }

// function removeRule() {
//     if(typeof window.CSSMediaRule !== "function") 
//         return false; //Your browser doesn't support media query feature

//     var s = document.styleSheets, r,
//         i, j, k;

//     if(!s) return false; //no style sheets found

//     // walk throuth css sheets
//     for(i=0; i<s.length; i++) {
//         // get all rules
//         r = s[i].cssRules; 
//         if(!r) continue;

//         for(j=0; j<r.length; j++) {
//             //If there's a rule for media query
//             if(r[j] instanceof CSSMediaRule &&
//                     r[j].media.mediaText == "only screen and (min-width: 600px)") {
//                 for(k=0; k<r[j].cssRules.length; k++) {
//                     // remove all rules of it
//                     r[j].deleteRule(r[j].cssRules[k]);
//                 }
//                 return true;
//             }
//         }
//     }
// }
// window.addEventListener("load", function(){
//     removeRule();
//     resetCSSMedia();
// })
// removeRule();


