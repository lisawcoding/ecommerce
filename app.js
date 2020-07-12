const productDiv=document.querySelector("#products-div");
const headerHeight=document.querySelector("header .nav-1").offsetHeight;

const shoppingCartQty=document.querySelector(".nav-1 .shopping-cart .qty");

if (localStorage.getItem("qty")==null || isNaN(localStorage.getItem("shopping-qty"))) {
  console.log("NaN");
  shoppingCartQty.innerText="0";
} else {
  shoppingCartQty.innerText=localStorage.getItem("shopping-qty");
  // shoppingCartQty.innerText=JSON.parse(localStorage.getItem("shopping-qty"));
}

// shop now button
// document.querySelector("#shop-now").addEventListener("click",function(){
//     window.scrollTo({
//         top: productDiv.offsetTop - headerHeight - 70,
//         behavior: "smooth"
//     })
// })
document.querySelector("#shop-now").addEventListener("click", function(){
	
  var scrollHeight=
  parseFloat(window.getComputedStyle(document.querySelector("#hero")).height)+parseFloat(window.getComputedStyle(document.querySelector("#discount-banner-div")).height)+parseFloat(window.getComputedStyle(document.querySelector("header .nav-2")).height);
	
	document.body.scrollTop = scrollHeight; // For Safari
  document.documentElement.scrollTop = scrollHeight; // For Chrome, Firefox, IE and Opera
  })




  
// add more products
const url="fake-info-33.json";
fetch(url)
.then(function(res){
    if(!res.ok){
        throw Error(res.status);
    }
    return res.json();
})
.then(function(data){

  //temp data in localstorage
  
  localStorage.setItem("img", data[0].items[1].photo);
  localStorage.setItem("department", data[0].department);
  localStorage.setItem("price", data[0].items[1].price);

    // // add more products, best seller
    for(var i=0; i<data.length; i++){
      
        document.querySelector(".best-seller-div img").src=data[i].items[1].photo;
        document.querySelector(".best-seller-div img").alt=data[i].department+" photo";
        document.querySelector(".best-seller-div .info .department").innerText=data[i].department+" - ";
        document.querySelector(".best-seller-div .price").innerText=data[i].items[1].price;
        // document.querySelector(".best-seller-div h1").innerText=i;

        if( i != data.length-1) {
        var cln=document.querySelector(".best-seller-div .product-wrapper").cloneNode(true);
        document.querySelector(".best-seller-div .swiper-wrapper").appendChild(cln);
        }

    }


    // // add more products, what's new
    function WhatsNewDivAddImg(){
      document.querySelector(".whats-new-div img").src=data[i].items[0].photo;
      document.querySelector(".whats-new-div img").alt=data[i].department+" photo";
      document.querySelector(".whats-new-div .info .department").innerText=data[i].department+" - ";
      document.querySelector(".whats-new-div .price").innerText=data[i].items[0].price;
      // document.querySelector(".whats-new-div h1").innerText=i;
    }
    for(var i=0; i<data.length; i++){
      if(i>1) {
        var cln=document.querySelector(".whats-new-div .product-wrapper").cloneNode(true);
        document.querySelector(".whats-new-div .grid-div").appendChild(cln);
      }
          WhatsNewDivAddImg();
    }

    //add more products, shop-by-catagory
    for(var i=0; i<data.length; i++){
      var elem=document.querySelector("#department-div .department-tab-div").appendChild(document.createElement("button"));
        elem.innerText=data[i].department;

        var cln=document.querySelector(".clone-sample .swiper-container.only").cloneNode(true);
        document.querySelector(".department-content-div").appendChild(cln);
    }

    var cateSwiperContainers=document.querySelectorAll(".department-content-div .swiper-container");  
    var cateSwiperWrappers=document.querySelectorAll(".department-content-div .swiper-wrapper");  

    var n=0;
    while(n<10) {
      for(var i=0; i<data[n].items.length; i++) {

        var clnSlide=document.querySelector(".clone-sample .swiper-slide").cloneNode(true);

        // clnSlide.children[0].innerText=data[n].department;
        // clnSlide.children[1].children[0].src=data[n].items[i].photo;
        clnSlide.querySelector("img").src=data[n].items[i].photo;
        clnSlide.querySelector("img").alt=data[n].department+" image ";
        clnSlide.querySelector(".info .department").innerText=data[n].department+" - ";
        clnSlide.querySelector(".info .price").innerText=data[n].items[i].price;

        cateSwiperWrappers[n].appendChild(clnSlide);
      }
      n=n+1;
    }




// category-department auotloop
        const categoryBtns=document.querySelectorAll(".department-tab-div button");
        const categoryContents=document.querySelectorAll(".department-content-div .swiper-container");
        const departmentDiv=document.querySelector("#department-div");

        categoryBtns[0].classList.add("btn-active");
        categoryContents[0].classList.add("cate-show");

        function removeClass (){
            for( var i=0; i<categoryBtns.length; i++){
            categoryBtns[i].classList.remove("btn-active");
            categoryContents[i].classList.remove("cate-show");
          };
        }

        var number=0;
        function cateLoop () {
          removeClass();
          categoryBtns[number].classList.add("btn-active");
          categoryContents[number].classList.add("cate-show");
          
          if(number<categoryBtns.length-1) {
            number++;
          } else {
            number=0;
          }
        }

        var categoryLoop=setInterval(cateLoop, 1000)

        departmentDiv.addEventListener("mouseenter", function(){
          clearInterval(categoryLoop);
        })
        departmentDiv.addEventListener("mouseleave", function(){
          categoryLoop=setInterval(cateLoop, 1000); 
        })

        if(window.matchMedia("(max-width:760px)").matches){
          document.querySelectorAll(".department-content-div").forEach(function(div){
            div.addEventListener("touchstart", function(){
              clearInterval(categoryLoop);
            })
            div.addEventListener("touchend", function(){
              categoryLoop=setInterval(cateLoop, 1000);
            })
          })
        }

      categoryBtns.forEach(function(btn){
        btn.addEventListener("click", function(){
          clearInterval(categoryLoop);
            removeClass();
            this.classList.add("btn-active");

            for(var i=0; i<categoryBtns.length; i++){
              if(categoryBtns[i].classList.contains("btn-active")){
                console.log(i);
                categoryContents[i].classList.add("cate-show");
                number=i;                  
              }
            }
            if(window.matchMedia("(max-width:760px)").matches) {
              categoryLoop=setInterval(cateLoop, 1000);
              this.style.background="var(--light-grey)";
              this.style.color="var(--b)";              
            }
        })
      })
        
// category-department auotloop



})
.then(function(){

    // best-seller-div swiper
    var bestSellerSwiper = new Swiper('.best-seller-div .swiper-container', {
      navigation: {
          nextEl: '.best-seller-div .swiper-button-next',
          prevEl: '.best-seller-div .swiper-button-prev',
        },
        speed: 500,
        autoplay: {
          delay: 3700,
          disableOnInteraction: false,
        },
        slidesPerView: 6,
      spaceBetween: 17,
      breakpoints: {
        370: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        480: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        640: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        790: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        1120: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },         
      }
    })
    const bestSellerDiv=document.querySelector(".best-seller-div");
    bestSellerDiv.addEventListener("mouseover", function(){
      bestSellerSwiper.autoplay.stop();
    })
    bestSellerDiv.addEventListener("mouseout", function(){
      bestSellerSwiper.autoplay.start();
    })

  var departmentSwiper = new Swiper('#department-div .swiper-container', {

      speed: 100,
      navigation: {
        nextEl: '#department-div .swiper-button-next',
        prevEl: '#department-div .swiper-button-prev',
      },
      slidesPerView: 6,
      breakpoints: {
        370: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        480: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        640: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        790: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        900: {
          slidesPerView: 5,
          slidesPerGroup: 5,
    
        },
        1120: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },         
      }
  })

        const departmentContainers=document.querySelectorAll("#department-div .swiper-container");

      for(var i=0; i<departmentContainers.length; i++){
        if(departmentContainers[i].querySelector(".swiper-button-next").classList.contains("swiper-button-disabled") && window.matchMedia("(min-width:790px)")){
          console.log(i);
          departmentContainers[i].querySelectorAll(".arrow").forEach(function(a){
            a.style.display="none";
          })
        }
      }



})
.then(function(){
    //make img square
  const squareImgs=document.querySelectorAll(".square-img");
  // console.log(squareImgs);
  squareImgs.forEach(function(e){
      if(e.width>e.height) {
        // e.style.border="3px dashed green";
        e.classList.add("img-square");
      } else {
        // e.style.border="2px dotte hotpink"
      }
    })
})
.then(function(){

  // click to open a new product page
  var imgContainers=document.querySelectorAll("#products-div a .img-container");
  for(var i=0; i<imgContainers.length; i++) {
    imgContainers[i].addEventListener("click", function(){
      var url=this.querySelector("img").getAttribute("src");
      var content=this.nextElementSibling.querySelector(".content").innerText;
      var price=this.nextElementSibling.querySelector(".price").innerText;
      localStorage.setItem("img", url);
      localStorage.setItem("content", content);
      localStorage.setItem("price", price);
      localStorage.setItem("department", this.nextElementSibling.querySelector(".department").innerText);
    })
  }

  var cart=[];
  if(localStorage.getItem("cart")==null){
    console.log("null");
      localStorage.setItem("cart", JSON.stringify(cart));
  }
})
.catch(function(err){
    console.log(err);
})

// hero slider
var heroSwiper = new Swiper('#hero .swiper-container', {
  speed: 1500,
  spaceBetween: 0,
  autoplay: {
    delay: 2000,
    // disableOnInteraction: false,
  },
  loop: true,
  grabCursor: true,
  navigation: {
    nextEl: '#hero .swiper-button-next',
    prevEl: '#hero .swiper-button-prev',
  },
  pagination: {
    el: '#hero .swiper-pagination',
    clickable: true,
  },
});
const swiperContainer=document.querySelector(".swiper-container");
swiperContainer.addEventListener("mouseover", function(){
  heroSwiper.autoplay.stop();
})
swiperContainer.addEventListener("mouseout", function(){
  heroSwiper.autoplay.start();
})