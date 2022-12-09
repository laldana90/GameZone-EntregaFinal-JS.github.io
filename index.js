// Cart 
let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart")

// Open Cart
cartIcon.onclick = () =>{
  cart.classList.add("active");
};

//Close Cart
closeCart.onclick = () =>{
  cart.classList.remove("active");
};

// Cart Working 

if (document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready();
}

function ready (){
  // Remove Items 
  const removeCartButtons = document.getElementsByClassName('cart-remove')
  console.log(removeCartButtons)
  for(let i = 0; i < removeCartButtons.length; i++){
    const button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  // Quantity Changes
  let quantityInputs = document.getElementsByClassName('cart-quantity')
  for(let i = 0; i < quantityInputs.length; i++){
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
  // Add to Cart 
  let addCart = document.getElementsByClassName('cards');
  for(let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }

  // Comprar Ahora
  document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

}

  function buyButtonClicked(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title:  `Felicidades ${infoUsuarioStorage.nombre} ${infoUsuarioStorage.apellido}, tu compra ha sido realizada con exito!!!`,
      showConfirmButton: false,
      background: 'black',
      color: 'whitesmoke'
    })
    let cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
      cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
  }

// Remove Items from Cart

function removeCartItem(event){
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// Quantity Changes
function quantityChanged(event){
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal()
}

// Add to Cart
function addCartClicked(event){
  let button = event.target
  let shopProducts = button.parentElement
  let name = shopProducts.getElementsByClassName('name')[0].innerText;
  let price = shopProducts.getElementsByClassName('price')[0].innerText;
  let image = shopProducts.getElementsByClassName('image')[0].src;
  addProductToCart(name, price, image);
  updateTotal();
}

function addProductToCart(name,price,image){
  let cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box')
  let cartItems = document.getElementsByClassName('cart-content')[0];
  let cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
  for(let i = 0; i < cartItemsNames.length; i++){
    if (cartItemsNames[i].innerText == name) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title:  `${infoUsuarioStorage.nombre} Ya has agregado este producto a tu carrito.`,
      showConfirmButton: false,
      background: 'black',
      color: 'whitesmoke'          
    })
    return;
    }
    
  }
  
  let cartBoxContent = `
<img src="${image}" alt="" class="cart-img" />
<div class="detail-box">
  <div class="cart-product-title">${name}</div>
  <div class="price">${price}</div>
  <input type="number" value="1" class="cart-quantity" />
</div>

<i class="bx bxs-trash-alt cart-remove"></i>`;

cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('click', quantityChanged);

}






// Update Total
function updateTotal () {
  const cartContent = document.getElementsByClassName('cart-content')[0]
  const cartBoxes = cartContent.getElementsByClassName('cart-box')
  let total = 0;
  for(let i = 0; i < cartBoxes.length; i++){
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName('price')[0];
    let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + (price * quantity);

    
  }

  document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    
  }





// Products Fetch con .Json

const divCards = document.querySelector('.cards')

const findProducts = async () => {
    const productsFetch = await fetch('productos.json')
    const productsJson = await productsFetch.json()

    console.log(productsJson)

    productsJson.forEach(prod => {
        const { name,price,description,image } = prod
        divCards.innerHTML += `
        <div class="card" style="width: 18rem; margin: 30px; padding: 10px">
  <img src="${image}" class="image" alt="...">
  <div class="card-body">
  <h2 style="color: black;" class="name">${name}</h2>
    <p class="card-text" style="color: black">${description}</p>
    <p style="color: black" class="price">$${price}</p>
    
  </div>
</div>
        `

    })
}

findProducts()


// Storage/JSON

const formularioUsuario = document.getElementById('formulario')
const tituloBienvenida = document.getElementById('tituloBienvenida')
const nombreUsuario = document.getElementById('nombre')
const apellidoUsuario = document.getElementById('apellido')


const infoUsuario = {}

formularioUsuario.onsubmit = (event) => {
    event.preventDefault()
    infoUsuario.nombre = nombreUsuario.value
    infoUsuario.apellido = apellidoUsuario.value
 
    localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario))
   

}

const infoUsuarioStorage = JSON.parse(localStorage.getItem('infoUsuario'))

if(infoUsuarioStorage.nombre !== "" || infoUsuarioStorage.apellido !== "") {
    tituloBienvenida.innerText =  `Hola ${infoUsuarioStorage.nombre} ${infoUsuarioStorage.apellido}, Comencemos con tu compra, solo haz click en la imagen del producto que deseas.!!!`
}






