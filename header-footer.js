// header


var newsSiper = new Swiper('header .nav-2 .swiper-container', {
	direction: 'vertical',
	loop: true,
	speed: 720,
	centeredSlides: true,
    // spaceBetween: 100,
    autoplay: {
    delay: 2000,
  },
});
// header

// tool-div
const nav2=document.querySelector(".nav-2");
const nav1=document.querySelector(".nav-1");
const goTopBtn=document.querySelector(".tool-div .go-top-btn");
const overlay=document.querySelector(".overlay");
const callOutDiv=document.querySelector(".tool-div .call-out-div");

window.addEventListener("scroll", function(){
	if(document.body.scrollTop > nav2.offsetHeight || document.documentElement.scrollTop > nav2.offsetHeight) {
		nav1.classList.add("nav-fixed");
		goTopBtn.style.display="block";
	} else {
		nav1.classList.remove("nav-fixed");
		goTopBtn.style.display="none";
	}
})
goTopBtn.addEventListener("click", function(){
	document.body.scrollTop=0;
	document.documentElement.scrollTop=0;
  })

document.querySelector(".tool-div .message-icon").addEventListener("click", function(){
	document.querySelector(".app").classList.toggle("block");
	document.querySelector(".phone-call").classList.toggle("block");
})



function removeCallOutDiv (){
	callOutDiv.style.bottom="-23rem";
	// overlay.classList.remove("show");
	overlay.classList.remove("block");	
	callOutDiv.classList.remove("flex");
}

document.querySelector(".tool-div .phone-call").addEventListener("click", function(){
	// callOutDiv.style.bottom="15%";
	overlay.classList.toggle("block");	
	callOutDiv.classList.toggle("flex");
})
document.querySelector(".tool-div .cross").addEventListener("click", function(){
	removeCallOutDiv();
})
overlay.addEventListener("click", function(){
	removeCallOutDiv();
})


document.querySelector(".nav-1 .hamburger").addEventListener("click", function(){
	document.querySelector(".nav-2 .width-1200 .tabs").classList.toggle("show");
})