let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let removeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

removeCart.onclick = () => {
    cart.classList.remove("active");
};


if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}else {
    ready();
}

function ready() {
    var removeIconButton = document.getElementsByClassName('cart-remove');
    console.log(removeIconButton);
    for( var i = 0; i < removeIconButton.length; i++) {
         var Button = removeIconButton[i];
         Button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChange)
    }

    var addCart = document.getElementsByClassName("add-cart");
    for(var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked )
    }

    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked)

}

function buyButtonClicked() {
    alert("your order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}




function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
     updatetotal();
}

// quantity icreament

function quantityChange(event) {
     var input = event.target;
     if(isNaN(input.value) || input.value <= 0) {
        input.value = 0;
     }

     updatetotal();
}


// addtocart Function
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImage = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImage);
    updatetotal();

}

function addProductToCart(title, price, productImage) {
   var cartShopBox = document.createElement("div");
   cartShopBox.classList.add("cart-box");
   var cartItems = document.getElementsByClassName('cart-content')[0];
   var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
   for(var i = 0; i < cartItemsNames.length; i++) {
    if(cartItemsNames[i].innerText == title) {
        alert("already in cart");
        return;
    }
   
   }


var cartBoxContent = `
<img src="${productImage}" alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">
        ${title}
    </div>
        <div class="cart-price">
            ${price}
        </div>
        <input type="number" value = "1" class="cart-quantity">
    </div>
    <!-- remove cart -->
    <i class='bx bxs-trash-alt cart-remove'></i>`;


    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChange);

}




// update function total 

function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = document.getElementsByClassName("cart-box");
    var total = 0;

    for ( var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // if there is a decimal numbeer
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "$" + total;

         
  
}