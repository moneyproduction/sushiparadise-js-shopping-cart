let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow',window.scrollY > 0);
});


let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('#menu-icon')
    navbar.classList.toggle('active')
}

window.onscroll = () => {
    menu.classList.remove('#menu-icon')
    navbar.classList.remove('active')
}
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
   duration: 2500,
   delay: 400,
  
})

sr.reveal('.home-text', {origin: 'left'})
sr.reveal('.home-img',{origin: 'right'})
sr.reveal('.about-text',{delay: '200'})
sr.reveal('.about-img',{delay: '200'})
sr.reveal('.spanmenu',{delay: '200'})
sr.reveal('.section-title',{delay: '200'})
sr.reveal('.product-box',{origin: 'left', interval:200})
sr.reveal('.services',{delay: '200'})
sr.reveal('.btn',{delay: '200'})
sr.reveal('.contact',{origin: 'right', interval:200})












let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

cartIcon.onclick = () => {
    cart.classList.add('active')
};

closeCart.onclick = () => {
    cart.classList.remove('active')
};





if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);

}else{
    ready();
};

function ready(){
    let reomveCartButtons = document.getElementsByClassName('cart-remove')
    for(let i = 0; i < reomveCartButtons.length; i++){
        let button = reomveCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    let quantityInputs = document.getElementsByClassName('cart-quantity')
    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener('change',quantityChanged);
    }
    let addCart = document.getElementsByClassName('add-cart')
    for(let i = 0; i < addCart.length; i++){
        let button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
};
function buyButtonClicked(){
    alert('Дякую за замовлення, очікуйте дзвінок для пітвердження замовлення')
    let cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
}



function removeCartItem (event){
    const buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
};

function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}


function addCartClicked(event){
    let button = event.target
    let shopProducts = button.parentElement
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText
    let price = shopProducts.getElementsByClassName('price')[0].innerText
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src

    addProductToCart(title, price,productImg)
    updateTotal()
}

function addProductToCart(title, price, productImg){
    let cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    let cartItems = document.getElementsByClassName('cart-content')[0]
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
    for(let i = 0; i < cartItemsNames.length; i++){
       if(cartItemsNames[i].innerText == title){
        alert('Ви вже добавили цей товар до кошику');
        return;  
    }
  
}





let cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
     <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
    </div>
     <i class='bx bxs-trash cart-remove'></i>`;
    
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);

    
}

function updateTotal(){
    let cartContent = document.getElementsByClassName('cart-content') [0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    let total = 0;
    
    for(let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName('cart-price')[0]
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace('₴', ''))
       let quantity = quantityElement.value; 
       total = total + (price * quantity);
    }
       total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = '₴' + total;
    
}


