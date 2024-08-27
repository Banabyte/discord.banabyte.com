document.addEventListener("DOMContentLoaded", function() {
    // Initialize Swiper
    var swiper = new Swiper('.swiper-container', {
        loop: true, // Loop through slides
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000, // Auto scroll every 5 seconds
        },
        slidesPerView: 1, // Show one testimonial at a time
        spaceBetween: 20, // Space between slides
    });

    // Lazy loading images (if you have images in testimonials or elsewhere)
    const lazyImages = document.querySelectorAll('img[data-src]');
    const loadImage = (image) => {
        const src = image.getAttribute('data-src');
        if (src) {
            image.src = src;
            image.removeAttribute('data-src'); // Remove the attribute after loading
        }
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(image => observer.observe(image));

    // Fetching Discord Server Info with Lazy Loading
    const serverInfo = document.getElementById('server-info');
    const fetchServerInfo = () => {
        fetch('https://discord.com/api/guilds/757079346719621150/widget.json')
            .then(response => response.json())
            .then(data => {
                serverInfo.innerHTML = `
                    <p><i class="fas fa-users"></i> Members Active: ${data.presence_count}</p>
                    <p><i class="fas fa-microphone"></i> ${data.channels.length} Channels</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching Discord widget:', error);
            });
    };

    const serverInfoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fetchServerInfo();
                observer.unobserve(entry.target);
            }
        });
    });

    serverInfoObserver.observe(serverInfo);
});
