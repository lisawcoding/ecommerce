    var myCart=JSON.parse(localStorage.getItem("cart"));
    console.log(myCart);


    for(var i=0; i<myCart.length; i++){
    const cln=document.querySelector(".clone").cloneNode(true);
    cln.setAttribute("class", "buy table clone");
    document.querySelector(".items-list-div").appendChild(cln); 

    document.querySelector("#my-cart .items-list-div img").src=myCart[i].img;
    document.querySelector("#my-cart .items-list-div .size").innerText=myCart[i].size;
    document.querySelector("#my-cart .items-list-div .price").innerText=myCart[i].price;
    document.querySelector("#my-cart .items-list-div input[name='qty']").value=myCart[i].qty;
    document.querySelector("#my-cart .items-list-div .content").innerText=myCart[i].content;
    // document.querySelector("#my-cart .items-list-div .i").setAttribute("id", i);
    document.querySelector("#my-cart .items-list-div .price-total").innerText=Number((myCart[i].price).replace("$", ""))*Number(myCart[i].qty);
    
    }


    const qtyInputs=document.querySelectorAll("#my-cart .buy input[name='qty']");
    // const priceTotals=document.querySelectorAll("#my-cart .price-total");
    const buyCart=document.querySelectorAll("#my-cart .table.buy");
    const emptyMessage=document.querySelector(".empty-message");

    function updateTotal(){
        var TotalQty=0;
        var TotalAmount=0;

        // const qtyInputs=document.querySelectorAll("#my-cart input[name='qty']");
        const priceTotals=document.querySelectorAll("#my-cart .price-total");
        const buyCart=document.querySelectorAll("#my-cart .table.buy");
        

        for(var i=0; i<buyCart.length; i++) {
            TotalQty=TotalQty+Number(document.querySelectorAll("#my-cart input[name='qty']")[i].value);
            TotalAmount=TotalAmount+Number(priceTotals[i].innerText.replace("$", ""));
        }
            document.querySelector("#my-cart .total-qty").innerText=TotalQty;
            document.querySelector("#my-cart .total-amount").innerText=TotalAmount;

            localStorage.setItem("shopping-qty", document.querySelector(".summary .total-qty").innerText); 
            document.querySelector(".nav-1 .shopping-cart .qty").innerText=localStorage.getItem("shopping-qty");
            document.querySelector(".title-bar .shopping-cart .qty").innerText=localStorage.getItem("shopping-qty");

            
    if(document.querySelector(".total-qty").innerText=="0"){
        emptyMessage.style.display="block";
    }
    }

    updateTotal();

    function priceStyle(){
        // document.querySelectorAll("#my-cart .price-total")[i].innerText=Number(document.querySelectorAll("#my-cart .price-total")[1].innerText.replace("$", "")).toFixed(2);
        document.querySelectorAll("#my-cart .price-total").forEach(function(p){
            p.innerText="$"+(Number(p.innerText.replace("$", "")).toFixed(2));
        })
        
        document.querySelector("#my-cart .total-amount").innerText=Number(document.querySelector("#my-cart .total-amount").innerText).toFixed(2);
        }

    priceStyle();

    function updateLocalStorageCart(){
  
         var myCart=[];
        for( var i=0; i<document.querySelectorAll(".table.buy").length; i++) {
            var cartItem={};
           
            cartItem.img=document.querySelectorAll(".table.buy img")[i].src;
            cartItem.size=document.querySelectorAll(".table.buy .size")[i].innerText;
            cartItem.price=document.querySelectorAll(".table.buy .price")[i].innerText;
            cartItem.qty=document.querySelectorAll(".table.buy input[name='qty']")[i].value; 
            cartItem.content=document.querySelectorAll(".table.buy .content")[i].innerText;
    
            myCart.push(cartItem);
        }
            console.log(myCart);
            
            localStorage.setItem("cart", JSON.stringify(myCart));
    }

    qtyInputs.forEach(function(q){
        q.addEventListener("change", function(){
            if(this.value<1) {
                this.value=1;
            } 

            this.parentElement.parentElement.querySelector(".price-total").innerText=this.value* this.parentElement.parentElement.querySelector(".price").innerText.replace("$", "");
            
            updateTotal();
            priceStyle();

            updateLocalStorageCart();
            console.log("change");
        })
    })
    





    const titleBarCheckBox=document.querySelector(".title-bar input[type='checkbox']");
    const cartItemsCheckBoxes=document.querySelectorAll(".table.buy input[type='checkbox']");
    titleBarCheckBox.addEventListener("click", function(){
        if(titleBarCheckBox.checked==true){
           cartItemsCheckBoxes .forEach(function(c){
                c.checked=true;
            })     
        } else {
            cartItemsCheckBoxes.forEach(function(c){
                c.checked=false;
            })   
        }
    })

    for(var i=0; i<buyCart.length; i++){
        document.querySelectorAll(".table.buy .remove")[i].addEventListener("click", function(){
            if(titleBarCheckBox.checked==true) {
                document.querySelectorAll(".buy").forEach(function(table){
                    table.remove();
                })
            } else {
                // this.parentElement.parentElement.parentElement.remove();             
                this.parentElement.parentElement.remove();             
            }
            updateTotal();
            priceStyle();   
            updateLocalStorageCart();
        })   
    }

    const imgs=document.querySelectorAll(".buy img");
    for(var i=0; i<imgs.length; i++){
        imgs[i].addEventListener("load", function(){
            if(this.height > this.width) {
                this.style.height="100%";
                this.style.width="auto";
            }
        })
    }

    // document.querySelector(".confirm").addEventListener("click", function(){
    //     if(Number(document.querySelector(".total-qty").innerText)>0){
    //         if (window.confirm("Congratulations, your order has been successful sent! \n go back to home page?")) { 
    //             window.location.href="index.html";
    //           }
    //         this.disabled=true;
    //         document.querySelectorAll(".table input").forEach(function(input){
    //             input.disabled=true;
    //         })
    //         document.querySelectorAll(".table .remove").forEach(function(remove){
    //             remove.style.display="none";
    //         })
    //     } else {
    //         if (window.confirm("the cart is empty! \n go back to home page?")) { 
    //             window.location.href="index.html";
    //           }
    //     }
    //     localStorage.clear();
    // })


    document.querySelector(".confirm").addEventListener("click", function(){
        if(Number(document.querySelector(".total-qty").innerText)>0){
            document.querySelectorAll(".table input").forEach(function(input){
                input.disabled=true;
            })
            document.querySelectorAll(".table .remove").forEach(function(remove){
                remove.style.display="none";
            })
            document.querySelectorAll(".table input[name='qty']").forEach(function(input){
                input.style.background="transparent";
                input.style.border="none";
            })
            this.style.display="none";
            emptyMessage.style.display="block";
            emptyMessage.querySelector("span").innerText="Congratulations, your order has been successfully sent! "

        } else {
            if (window.confirm("the cart is empty! \n go back to home page?")) { 
                window.location.href="index.html";
              }
              this.disabled=true;
        }
        localStorage.clear();
    })
