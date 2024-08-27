document.addEventListener("DOMContentLoaded", function() {
    // Testimonial Slider Functionality
    const slider = document.getElementById('testimonial-slider');
    const scrollAmount = slider.offsetWidth; // Calculate the width to scroll

    // Scroll Right Button
    document.querySelector('.arrow-right').addEventListener('click', () => {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Scroll Left Button
    document.querySelector('.arrow-left').addEventListener('click', () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    // Fetching Discord Server Info
    fetch('https://discord.com/api/guilds/757079346719621150/widget.json')
        .then(response => response.json())
        .then(data => {
            const serverInfo = document.getElementById('server-info');
            serverInfo.innerHTML = `
                <p><i class="fas fa-users"></i> Members Active: ${data.presence_count}</p>
                <p><i class="fas fa-microphone"></i> ${data.channels.length} Channels</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching Discord widget:', error);
        });
});
