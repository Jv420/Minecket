document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    
    if (error) {
        const message = document.querySelector('.cancel-message');
        if (message) {
            message.innerHTML += `<br><strong>Reason:</strong> ${decodeURIComponent(error)}`;
        }
    }
    
    // Store cancellation for analytics
    try {
        localStorage.setItem('last_cancellation', new Date().toISOString());
    } catch (e) {
        // LocalStorage might be disabled
    }
});