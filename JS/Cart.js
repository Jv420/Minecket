// ========================
//        EMPTY CART
// ========================

document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartNoneElement = document.querySelector('#cart-none');
    const cartTotalElement = document.querySelector('#cart-total');
    
    // Prijzen voor elk item
    const prices = {
        'cart-item-1': 0.99,  // Bronze VIP
        'cart-item-2': 5.99,  // Silver VIP
        'cart-item-3': 9.99,  // Gold VIP
        'cart-item-4': 2.99   // Cosmetics
    };
    
    let totalPrice = 0;
    let hasItems = false;

    if (cart && cart.length > 0) {
        for (const item of cart) {
            const itemId = `#${item}`;
            const itemElement = document.querySelector(itemId);
            if (itemElement) {
                itemElement.classList.add('active');
                itemElement.style.display = 'flex';
                
                // Voeg prijs toe aan totaal
                if (prices[item]) {
                    totalPrice += prices[item];
                }
                
                hasItems = true;
            }
        }

        // Verberg "empty cart" bericht als er items zijn
        if(cartNoneElement && hasItems) {
            cartNoneElement.style.display = 'none';
        }
        
        // Toon total price section
        if (cartTotalElement && hasItems) {
            cartTotalElement.style.display = 'block';
            document.getElementById('total-price').textContent = `€${totalPrice.toFixed(2)}`;
        }
    } else {
        // Toon "empty cart" bericht als winkelwagen leeg is
        if(cartNoneElement) {
            cartNoneElement.style.display = 'flex';
        }
        if (cartTotalElement) {
            cartTotalElement.style.display = 'none';
        }
    }
    
    // Verberg cart items die niet in winkelwagen zitten
    document.querySelectorAll('.cart-item').forEach(item => {
        if (!item.classList.contains('active')) {
            item.style.display = 'none';
        }
    });
});

// ========================
// REMOVE ITEM FROM CART
// ========================

function removeFromCart(type) {
   const cart = localStorage.getItem('cart');
   if(cart) {
      const cartObj = JSON.parse(cart);
      const newCart = cartObj.filter(item => item !== type);
      localStorage.setItem('cart', JSON.stringify(newCart));
   }
}

// Voeg event listeners toe voor remove knoppen
document.addEventListener('DOMContentLoaded', function() {
    // Remove button voor item 1
    const removeBtn1 = document.getElementById("remove-item-1");
    if (removeBtn1) {
        removeBtn1.addEventListener("click", function (event) {
            event.preventDefault();
            removeFromCart('cart-item-1');
            location.reload();
        });
    }

    // Remove button voor item 2
    const removeBtn2 = document.getElementById("remove-item-2");
    if (removeBtn2) {
        removeBtn2.addEventListener("click", function (event) {
            event.preventDefault();
            removeFromCart('cart-item-2');
            location.reload();
        });
    }

    // Remove button voor item 3
    const removeBtn3 = document.getElementById("remove-item-3");
    if (removeBtn3) {
        removeBtn3.addEventListener("click", function (event) {
            event.preventDefault();
            removeFromCart('cart-item-3');
            location.reload();
        });
    }

    // Remove button voor item 4
    const removeBtn4 = document.getElementById("remove-item-4");
    if (removeBtn4) {
        removeBtn4.addEventListener("click", function (event) {
            event.preventDefault();
            removeFromCart('cart-item-4');
            location.reload();
        });
    }
});