// =====================
//   BENEFITS POPUPS
// =====================

function setupPopup(openBtn, closeBtn, popup, overlay) {
  openBtn.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.add("popup-active");
    overlay.style.display = "block";
  });

  closeBtn.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("popup-active");
    overlay.style.display = "none";
  });
}

const popup1 = document.getElementById("benefits-1");
const overlay1 = document.querySelector(".overlay");
setupPopup(
  document.getElementById("open-popup-1"),
  document.getElementById("close-popup-1"),
  popup1,
  overlay1
);

const popup2 = document.getElementById("benefits-2");
const overlay2 = document.querySelector(".overlay");
setupPopup(
  document.getElementById("open-popup-2"),
  document.getElementById("close-popup-2"),
  popup2,
  overlay2
);

const popup3 = document.getElementById("benefits-3");
const overlay3 = document.querySelector(".overlay");
setupPopup(
  document.getElementById("open-popup-3"),
  document.getElementById("close-popup-3"),
  popup3,
  overlay3
);

const popup4 = document.getElementById("benefits-4");
const overlay4 = document.querySelector(".overlay");
setupPopup(
  document.getElementById("open-popup-4"),
  document.getElementById("close-popup-4"),
  popup4,
  overlay4
);

// =====================
//   PURCHASE SYSTEM
// =====================

function addToCart(item) {
    const cart = localStorage.getItem('cart');
    if(cart) {
        const cartObj = JSON.parse(cart);
        if(!cartObj.includes(item)) {
            cartObj.push(item);
            localStorage.setItem('cart', JSON.stringify(cartObj));
            return true; // Item toegevoegd
        }
    } else {
        localStorage.setItem('cart', JSON.stringify([item]));
        return true; // Item toegevoegd
    }
    return false; // Item was al in winkelwagen
}

// Voeg event listeners toe voor buy knoppen
document.addEventListener('DOMContentLoaded', function() {
    // Buy button voor item 1
    const buyBtn1 = document.getElementById('buy-item-1');
    if (buyBtn1) {
        buyBtn1.addEventListener('click', function(event) {
            event.preventDefault();
            const added = addToCart('cart-item-1');
            if (added) {
                const successPopup = document.getElementById('success-add');
                successPopup.classList.add('active');
                setTimeout(() => {
                    successPopup.classList.remove('active');
                }, 3000);
                
                // Open Stripe checkout in nieuw tabblad na korte delay
                setTimeout(() => {
                    window.open(this.href, '_blank');
                }, 500);
            }
        });
    }

    // Buy button voor item 2
    const buyBtn2 = document.getElementById('buy-item-2');
    if (buyBtn2) {
        buyBtn2.addEventListener('click', function(event) {
            event.preventDefault();
            const added = addToCart('cart-item-2');
            if (added) {
                const successPopup = document.getElementById('success-add');
                successPopup.classList.add('active');
                setTimeout(() => {
                    successPopup.classList.remove('active');
                }, 3000);
                
                setTimeout(() => {
                    window.open(this.href, '_blank');
                }, 500);
            }
        });
    }

    // Buy button voor item 3
    const buyBtn3 = document.getElementById('buy-item-3');
    if (buyBtn3) {
        buyBtn3.addEventListener('click', function(event) {
            event.preventDefault();
            const added = addToCart('cart-item-3');
            if (added) {
                const successPopup = document.getElementById('success-add');
                successPopup.classList.add('active');
                setTimeout(() => {
                    successPopup.classList.remove('active');
                }, 3000);
                
                setTimeout(() => {
                    window.open(this.href, '_blank');
                }, 500);
            }
        });
    }

    // Buy button voor item 4
    const buyBtn4 = document.getElementById('buy-item-4');
    if (buyBtn4) {
        buyBtn4.addEventListener('click', function(event) {
            event.preventDefault();
            const added = addToCart('cart-item-4');
            if (added) {
                const successPopup = document.getElementById('success-add');
                successPopup.classList.add('active');
                setTimeout(() => {
                    successPopup.classList.remove('active');
                }, 3000);
                
                setTimeout(() => {
                    window.open(this.href, '_blank');
                }, 500);
            }
        });
    }
});