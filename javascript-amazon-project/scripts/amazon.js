import { cart,addToCart, updateCartQuantity,calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";




let productHTML = '';

products.forEach((product) => {

  
  productHTML += `<div class="product-container">
       <div class="product-image-container">
           <img class="product-image"
              src="${product.image}">
       </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-cart-added-message-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id= "${product.id}">
            Add to Cart
          </button>
        </div>`;
});

document.querySelector('.js-product-grid').innerHTML
  = productHTML;
  



// export function updateCartQuantity(productId) {
//   let cartQuantity = 0;
//   cart.forEach((cartItem) => {
//     cartQuantity += cartItem.quantity;
//   })

//   document.querySelector('.js-cart-quantity').innerHTML
//     = cartQuantity;


//    let addedMessage = document.querySelector(`.js-cart-added-message-${cart.productId}`);

//   addedMessage.classList.add('added-to-cart-visible');

//   let addedMessageTimeout = {};

//   const previousTimeOutId = addedMessageTimeout[cart.productId];

//   if (previousTimeOutId) {
//     clearTimeout(previousTimeOutId);
//   }
//   const timeoutId = setTimeout(() => {
//     addedMessage.classList.remove('added-to-cart-visible');
//   }, 2000);


//   addedMessageTimeouts[productId] = timeoutId;

// }
calculateCartQuantity();





document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      let { productId } = button.dataset;
      let selectQuantity = document.querySelector(`.js-select-quantity-${productId}`);
      let quantitySelector = Number(selectQuantity.value);
      addToCart(productId,quantitySelector);


      let addedMessage = document.querySelector(`.js-cart-added-message-${productId}`);

      addedMessage.classList.add('added-to-cart-visible');

      let addedMessageTimeout = [];

      const previousTimeOutId = addedMessageTimeout[productId];

      if (previousTimeOutId) {
        clearTimeout(previousTimeOutId);
      }
      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 3000);


      addedMessageTimeout[productId] = timeoutId;


     // update cart
     calculateCartQuantity();

      })








      // addToCart(productId, quantity);
      //updateCartQuantity(productId);



    });
  




