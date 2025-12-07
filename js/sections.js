document.addEventListener('DOMContentLoaded', function() {
    // Initialize Slick Slider for Reviews
    if (document.querySelector('.reviews-slider')) {
        $('.reviews-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            rtl: true,
            autoplay: true,
            autoplaySpeed: 5000,
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-right"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-left"></i></button>'
        });
    }

    // Tab functionality for Curriculums
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Video Modal
    const videoThumbnails = document.querySelectorAll('.video-thumbnail, .youtube-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = thumbnail.closest('a') ? thumbnail.closest('a').href : '#';
            
            // For YouTube videos, you would typically open a modal with an iframe
            // This is a placeholder for the video modal functionality
            if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                // You can implement a lightbox or modal here
                // For now, we'll just open the video in a new tab
                window.open(videoUrl, '_blank');
            }
        });
    });

    // Animate numbers in achievements section
    const animateNumbers = () => {
        const achievements = document.querySelectorAll('.achievement h3');
        
        achievements.forEach(achievement => {
            const target = parseInt(achievement.textContent);
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 50; // Adjust speed of counting
                
                const updateNumber = () => {
                    if (current < target) {
                        current += increment;
                        if (current > target) current = target;
                        achievement.textContent = Math.floor(current) + (achievement.textContent.includes('%') ? '%' : '+');
                        requestAnimationFrame(updateNumber);
                    }
                };
                
                // Start animation when section is in viewport
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        updateNumber();
                        observer.unobserve(achievement);
                    }
                });
                
                observer.observe(achievement);
            }
        });
    };

    // Initialize animations when the page loads
    animateNumbers();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});
