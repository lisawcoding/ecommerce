document.querySelector(".nav-1 .shopping-cart .qty").innerText=localStorage.getItem("shopping-qty");
//add more radom images - small-img-div

const image=document.querySelector(".product-div .small-img-div .clone");
var n=0;
for(var i=0; i<5; i++) {

	// var w=Math.floor(Math.random()*200+120);
  // document.querySelectorAll(".product-div .small-img-div .img-wrapper img")[i].src="https://source.unsplash.com/"+(200+i)+"x"+w+"/?fashion";
  
  
  document.querySelectorAll(".product-div .small-img-div .img-wrapper img")[i].src=localStorage.getItem("img");
  document.querySelector(".product-div .product-name").innerText=localStorage.getItem("content");
  document.querySelector(".path .department").innerText=localStorage.getItem("department").replace("-","");
  // document.querySelector(".product-div form input[name*='price']").value="20";

  var cln=image.cloneNode(true);
  document.querySelector(".product-div .small-img-div .swiper-wrapper").appendChild(cln);  
 
}

for(var i=0; i<document.querySelectorAll(".product-div .small-img-div .img-wrapper").length; i++){
  // console.log(i);
  document.querySelectorAll(".product-div .small-img-div h1")[i].innerText=i+1;
}

// page index total-page
const totalSlides=document.querySelectorAll(".small-img-div .swiper-slide");
const totalImages=document.querySelectorAll(".small-img-div .swiper-slide img");
const currentPage=document.querySelector(".page-index .current-page");

document.querySelector(".page-index .total-page").innerText=totalSlides.length;

// if(window.matchMedia("(min-width: 601px)").matches){
//   var myProductSwiper = new Swiper('.product-div .small-img-div .swiper-container', {
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     slidesPerGroup: 1,
//     loop: false,
//       slidesPerView: 6,
//       spaceBetween: 10,
//   });
// }  
// else {
//   var myProductSwiper = new Swiper('.product-div .small-img-div .swiper-container', {
//     loop: true,
//       slidesPerView: 1,
//       spaceBetween: 15,
//   });  
// }

var myProductSwiper = new Swiper('.product-div .small-img-div .swiper-container', {
  navigation: {
      nextEl: '.small-img-div .swiper-button-next',
      prevEl: '.small-img-div .swiper-button-prev',
    },
    speed: 500,
    // autoplay: {
    //   delay: 3700,
    //   disableOnInteraction: false,
    // },
    slidesPerView: 6,
    slidesPerGroup: 1,
  spaceBetween: 9,
  loop: true,
  breakpoints: {
    370: {
      slidesPerView:1,
    },
    430: {
      slidesPerView: 1,
    },
    620: {
      slidesPerView: 5,
    },
    790: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 4,
    },
    1020: {
      slidesPerView: 5,

    },
    1200: {
      slidesPerView: 6,
    },         
  }
})

myProductSwiper.on("slideChange", function(){
  if (myProductSwiper.activeIndex>totalSlides.length) {
    currentPage.innerText=1;
  } else if (myProductSwiper.activeIndex<1 ) {
    currentPage.innerText=totalSlides.length;
  } else {
    currentPage.innerText=myProductSwiper.activeIndex;
  }
  
})



// document.querySelector("page-index .current-page").innerText=document.querySelector(".small-img-div .swiper-slide-active");




const mainImg=document.querySelector(".product-div .main-img img");
const mainImgH1=document.querySelector(".main-img h1");

function mainImgSrc() {
  mainImg.src=document.querySelector(".product-div .small-img-div .swiper-slide-active img").getAttribute("src")
}

mainImgSrc();

document.querySelectorAll(".product-div .small-img-div img").forEach(function(i){
  i.addEventListener("mouseover", function(){
    mainImg.src=this.src;
    mainImgH1.innerText=this.parentNode.parentNode.innerText;

  })
})

for(var i=0; i<totalSlides.length; i++){
  totalImages[i].addEventListener("mouseover", function(){
    mainImg.src=this.src;    
    // mainImgH1=this.parentNode.parentNode.innerText;
    var slide=this.parentElement.parentElement;
    for(var i=0; i<totalSlides.length; i++){
      totalSlides[i].style.opacity="1";
    }
    if (window.matchMedia("(min-width: 601px)").matches){
      slide.style.opacity=".6";      
    }
    console.log(slide);
  })
}


//right div
//form div logic qty/price
// const pricePer=document.querySelector(".product-div .amount input[name='price']").value;
// const pricePer=document.querySelector(".product-div .amount input[name='price']").value;
const pricePer=parseFloat(localStorage.getItem("price").replace("$", ""));
const priceTotal=document.querySelector(".product-div .amount .price-total");
// const priceInput=document.querySelector(".product-div .amount input[name='price']");
const priceTWD=document.querySelector(".product-div .amount .twd");
const qtyInput=document.querySelector(".product-div .qty input[name='qty']");

priceTotal.innerText=pricePer;
priceTWD.innerText=Math.round(parseFloat(priceTotal.innerText)*30);

function updatePrice(){
  var qty=parseInt(qtyInput.value);

  if(isNaN(qty) || qty<1) {
      qtyInput.value=""; 
  } else {
    priceTotal.innerText=qty*pricePer;
    priceTWD.innerText=pricePer*qty*30; 

    priceTotal.innerText=parseFloat(priceTotal.innerText).toLocaleString();
    priceTWD.innerText=parseFloat(priceTWD.innerText).toLocaleString();
  }
}

document.querySelector(".subtract").addEventListener("click", function(){
  var qty=parseInt(document.querySelector(".product-div .qty input[name='qty']").value);	
  if(qty>1){
    qty--;
    qtyInput.value=qty;
    updatePrice();
  } else {
    console.log("minmun qty")
  }
})
document.querySelector(".add").addEventListener("click", function(){
  var qty=parseInt(qtyInput.value);
  qty++;
  qtyInput.value=qty;
  updatePrice();
})

qtyInput.addEventListener("focusin", function(){
  // qtyInput.value="";
  updatePrice();
})
qtyInput.addEventListener("focusout", function(){
  if(qtyInput.value==""){
    qtyInput.value="1";    
  }
})
qtyInput.addEventListener("keyup", function(){
  updatePrice();
})
// qtyInput.addEventListener("change", function(){
//    updatePrice();
// })

            
// var cart=[];
var item={};

document.querySelector(".product-div .right input[type='submit']").addEventListener("click", function(){

      // this.disabled=true;

      // var url=new URL(window.location.href);
      // var cartSize=url.searchParams.get('size');
      // var cartQty=url.searchParams.get("qty");
      // var cartPrice=url.searchParams.get("price");
      // var cartImg=totalImages[0].getAttribute("src");

  localStorage.setItem("size", document.querySelector(".custom-select select").value);
  localStorage.setItem("qty", qtyInput.value);

  item.img=localStorage.getItem("img");
  item.size=localStorage.getItem("size");
  item.price=localStorage.getItem("price");  
  item.qty=localStorage.getItem("qty");
  item.content=localStorage.getItem("content");

  // alert("add to cart: size: "+ item.size+" qty: "+item.qty);


  var cart=JSON.parse(localStorage.getItem("cart"));

  function addLocalStorage(){
    localStorage.setItem("item", JSON.stringify(item));
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  if(localStorage.getItem("cart")!="[]"){
    var pattern='"img":"' + item.img + '","size":"' + item.size+'"';
    if(localStorage.getItem("cart").indexOf(pattern)!=-1) {
        for(var i=0; i<cart.length; i++) {
        if(cart[i].img==item.img && cart[i].size==item.size) {
            cart[i].qty=(Number(cart[i].qty)+Number(item.qty)).toString();
            localStorage.setItem("cart", JSON.stringify(cart));   
        } 
      }
    } else {
      addLocalStorage();
    }
  } else {
    addLocalStorage();
  }
  document.querySelector(".nav-1 .shopping-cart .qty").innerText=localStorage.getItem("shopping-qty");
  document.querySelector("#added-alert").style.display="flex";
  overlay.style.display="block";

  localStorage.setItem("shopping-qty", parseFloat(localStorage.getItem("shopping-qty"))+parseFloat(localStorage.getItem("qty")))
  
})



// tag content change
const tabs=document.querySelectorAll(".description .title");
const contents=document.querySelectorAll(".description .content");

for(var i=0; i<tabs.length; i++) {
  tabs[i].addEventListener("click", function(){
    for(var i=0; i<tabs.length; i++){
      tabs[i].classList.remove("tab-active");
      contents[i].classList.remove("show");
    }
    this.classList.toggle("tab-active");
    changeContent();
  })
};

function changeContent (){
  for(var i=0; i<tabs.length; i++) {
    if(tabs[i].classList.contains("tab-active")){
      contents[i].classList.add("show");
    }
  }
}

const zoonContainer=document.querySelector(".img-zoon-container");
const zoonResult=document.querySelector(".img-zoom-result");
const imgFrame=document.querySelector(".main-img");

function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  img.parentElement.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}


  imgFrame.addEventListener("mouseenter", function(){
    zoonResult.classList.add("show");
    imageZoom("myimage", "myresult");
  })
  imgFrame.addEventListener("mouseleave", function(){
    zoonResult.classList.remove("show");
    var el=document.querySelector(".img-zoom-lens");
    el.remove();
  })


const imgs=document.querySelectorAll(".product-div img");

// for(var i=0; i<imgs.length; i++) {
//   imgs[i].addEventListener("load", function(){
//     if(this.width > this.height) {
//       zoonContainer.classList.remove("center-v");
//      zoonContainer.classList.add("center-h") ;
//      this.style.height="auto";
//      this.style.width="100%";
//     } else {
//        if (window.matchMedia("(max-width:430px)").matches) {
//             document.querySelector(".small-img-div .inner").style.height="70vw";
//             this.style.background="pink";
//         }
//        else if(window.matchMedia("(max-width:620px)").matches) {
//         this.style.background="pink";
//         document.querySelector(".main-img img").style.height="70vw";
//       }
//       else {
//         zoonContainer.classList.remove("center-h");
//         zoonContainer.classList.add("center-v");
//         this.style.height="100%";
//         this.style.width="auto";
//       }

//     }  
//   })  
// }
for(var i=0; i<imgs.length; i++) {
  imgs[i].addEventListener("load", function(){
    if(this.width > this.height) {
      zoonContainer.classList.remove("center-v");
     zoonContainer.classList.add("center-h") ;
     this.style.height="auto";
     this.style.width="100%";
    } else {

      if (window.matchMedia("(max-width:430px)").matches) {
        console.log(this.parentNode);
        // document.querySelectorAll(".small-img-div .img-wrapper").style.height="50vh";
        this.parentNode.style.height="50vh";
      }
 
        zoonContainer.classList.remove("center-h");
        zoonContainer.classList.add("center-v");
        this.style.height="100%";
        this.style.width="auto";
    }  
  })  
}




const shoppingCartQty=document.querySelector(".nav-1 .shopping-cart .qty");

if (localStorage.getItem("qty")==null) {
  shoppingCartQty.innerText="0";
  console.log("null");
} else {
  shoppingCartQty.innerText=localStorage.getItem("shopping-qty");
  console.log("qty");
}

// check different browser
// if(navigator.userAgent.toLowerCase().indexOf("firefox")!=-1) {
// 	document.querySelector(".product-div .qty input[name='qty']").setAttribute("type", "text")
// }

// alert-box
const allertBtns=document.querySelectorAll("#added-alert a");
allertBtns.forEach(function(a){
  a.addEventListener("mouseenter", function(){
    allertBtns.forEach(function(a){
      a.classList.remove("alert-btn-active");
    })
    a.classList.add("alert-btn-active");
  })
})

const addedAlert=document.querySelector("#added-alert");
document.querySelector(".cross").addEventListener("click", function(){
  addedAlert.style.display="none";
  overlay.style.display="none";
})
overlay.addEventListener("click", function(){
  this.style.display="none";
  addedAlert.style.display="none";
})


// function goBack() {
//   window.history.back()
// }