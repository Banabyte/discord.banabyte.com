document.addEventListener("DOMContentLoaded", function() {
    fetch('https://discord.com/api/guilds/757079346719621150/widget.json')
        .then(response => response.json())
        .then(data => {
            const serverInfo = document.getElementById('server-info');
            // Fetch the total number of members from the widget data
            serverInfo.innerHTML = `
                <p><i class="fas fa-users"></i> Total Members: ${data.presence_count}</p>
                <p><i class="fas fa-microphone"></i> ${data.channels.length} Channels</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching Discord widget:', error);
        });
});
