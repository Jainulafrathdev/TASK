

export let cart ;

loadFromStorage();

export function loadFromStorage(){
  cart= JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionsId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionsId: '2'
  }];
}
}



export function addToCart(productId, quantitySelector) {

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += quantitySelector;
  } else {

    cart.push({
      productId: productId,
      quantity: quantitySelector,
      deliveryOptionsId: '1'
    });
  }
  saveToStorage();
}



function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

//  export function addToCart(productId, quantity) {
//   let matchingItem;
//   cart.forEach((cartItem) => {
//     if (productId === cartItem.productId) {
//       matchingItem = cartItem;
//     }
//   });

//   if (matchingItem) {
//     matchingItem.quantity += quantity;
//   } else {
//     cart.push({
//       productId,
//       quantity
//     })
//   }
//   //saveToStorage();

// }


export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  cart = newCart;
  saveToStorage();


}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  

  document.querySelector('.js-return-to-home').innerHTML = `${cartQuantity} items`;
  //updateabc.innerHTML = `${cartQuantity} items`;
  
  console.log(document.querySelector('.js-return-to-home').innerHTML = `${cartQuantity} items`);




}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

  });
};

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
};

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  //console.log(matchingItem);
  matchingItem.deliveryOptionsId = deliveryOptionId;
  saveToStorage();
} 



