// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

mobileMenu.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Sticky header on scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.style.transform = 'translateY(0)';
    return;
  }
  
  if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
    // Scrolling down
    header.style.transform = `translateY(-${header.offsetHeight}px)`;
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formObject);
    
    // Show success message
    alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
    this.reset();
  });
}

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.service-card, .gallery-item, .about-content, .about-image');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.service-card, .gallery-item, .about-content, .about-image');
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Initial check in case elements are already in view
  animateOnScroll();
      initMap();

});
function initMap() {

      // Initialize the map with a closer zoom level
    const map = L.map('map').setView([24.640740111807077, 46.77614865190079], 16);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);
    
    // Add a marker for the business location with a custom icon
    const myIcon = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    const marker = L.marker([24.640740111807077, 46.77614865190079], {icon: myIcon}).addTo(map)
        .bindPopup(`
            <div style="text-align: right; direction: rtl;">
                <strong>فني سجاد محترف</strong><br>
                الرياض، المملكة العربية السعودية<br>
                <a href="https://www.google.com/maps/dir/?api=1&destination=24.640740111807077,46.77614865190079" 
                   target="_blank" 
                   style="color: #0066cc; text-decoration: underline;">
                    افتح في خرائط جوجل
                </a>
            </div>
        `)
        .openPopup();
        
    // Adjust map view to ensure marker is visible with some padding
    map.fitBounds([
        [marker.getLatLng().lat - 0.005, marker.getLatLng().lng - 0.005],
        [marker.getLatLng().lat + 0.005, marker.getLatLng().lng + 0.005]
    ]);
}
// Add scroll event listener for animation
window.addEventListener('scroll', animateOnScroll);
