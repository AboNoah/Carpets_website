// Image Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
    initializeMap();
    
    // Initialize gallery filters
    //initializeGalleryFilters();
    
    // Initialize image modal
    //initializeImageModal();
    
    // Animate gallery items on scroll
    //animateGalleryItems();
    
    // Add click events for contact information
    setupContactInteractions();
});

function initializeMap() {
    // Initialize the map centered on Riyadh, Saudi Arabia
    const map = L.map('map').setView([24.7136, 46.6753], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Add a marker for the business location
    const marker = L.marker([24.7136, 46.6753]).addTo(map);
    marker.bindPopup("<b>موقعنا</b><br>متجر إصلاح السجاد").openPopup();

    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation to gallery items when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to all gallery items
    const galleryItems = document.querySelectorAll('.carpet-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        observer.observe(item);
    });


}
function setupContactInteractions() {
    // Phone number click handler
    const phoneNumber = document.querySelector('.fa-phone')?.parentNode;
    if (phoneNumber) {
        phoneNumber.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) { // Only on mobile
                e.preventDefault();
                window.location.href = 'tel:0501234567';
            }
        });
    }

    // Email click handler
    const email = document.querySelector('.fa-envelope')?.parentNode;
    if (email) {
        email.addEventListener('click', function(e) {
            window.location.href = 'mailto:ahmed@example.com';
        });
    }
}