document.addEventListener('DOMContentLoaded', function() {
    // Check URL parameters for order details
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
        // You could fetch order details here if needed
        console.log('Payment session:', sessionId);
        
        // Show a thank you message with the session ID
        const message = document.querySelector('.success-message');
        if (message) {
            message.innerHTML += `<br><small>Reference: ${sessionId.substring(0, 8)}...</small>`;
        }
    }
    
    // Auto-redirect after 10 seconds (optional)
    setTimeout(() => {
        // You could redirect to home or shop
        // window.location.href = '../HTML/Index.html';
    }, 10000);
    
    // Add confetti effect (optional)
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 250);
    }
});