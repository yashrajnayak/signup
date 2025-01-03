// Constants for form URLs (these don't change with dates)
const FORM_URLS = {
    "Mumbai": "https://docs.google.com/forms/d/e/1FAIpQLSdaC4Uqts-p-Ad9lUhOfCt4yMsBQJ3_fkQpyp4GwPvnVMxNtQ/viewform",
    "Delhi NCR": "https://docs.google.com/forms/d/e/1FAIpQLSe49RWkRssB4AFO9NVL08UcSp7eKA0VJVmUmzQKmS8quMEszg/viewform",
    "Bengaluru": "https://docs.google.com/forms/d/e/1FAIpQLSdcqzZ-wE3IzhmkOV_ElC8TIugCK7p8eEznTJCWjSlGYMB46A/viewform"
};

async function populateEventOptions() {
    const eventOptionsDiv = document.getElementById('eventOptions');
    
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        
        // Filter events that haven't occurred yet
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const futureEvents = config.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today;
        });

        futureEvents.forEach((event, index) => {
            const radioDiv = document.createElement('div');
            radioDiv.className = 'radio-option';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `event${index}`;
            input.name = 'event';
            input.value = FORM_URLS[event.city];
            input.required = true;
            
            const label = document.createElement('label');
            label.htmlFor = `event${index}`;
            // Format date to be more readable
            const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            label.textContent = `${event.city} (${formattedDate})`;
            
            radioDiv.appendChild(input);
            radioDiv.appendChild(label);
            eventOptionsDiv.appendChild(radioDiv);
        });
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

document.addEventListener('DOMContentLoaded', populateEventOptions);

document.getElementById('githubForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const selectedEvent = document.querySelector('input[name="event"]:checked');
    const errorElement = document.getElementById('usernameError');
    
    // Hide error message initially
    errorElement.classList.remove('visible');
    
    if (!selectedEvent) {
        alert('Please select an event');
        return;
    }

    const apiUrl = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            errorElement.classList.add('visible');
            return;
        }
        const data = await response.json();
        
        // Find the selected event details
        const selectedEventDetails = CONFIG.events.find(event => event.formUrl === selectedEvent.value);
        const eventInfo = `${selectedEventDetails.city} (${selectedEventDetails.date})`;
        
        // Get user's full name from GitHub API (fallback to username if name is null)
        const fullName = data.name || username;
        
        // Construct the URL with all parameters
        const redirectUrl = `${selectedEvent.value}?usp=pp_url` + 
            `&entry.1334197574=${encodeURIComponent(eventInfo)}` +
            `&entry.1252770814=${encodeURIComponent(username)}` +
            `&entry.1001119393=${encodeURIComponent(fullName)}`;
            
        window.location.href = redirectUrl;
    } catch (error) {
        console.error('Error:', error);
        errorElement.classList.add('visible');
    }
});

// Add this to hide error message when user starts typing
document.getElementById('username').addEventListener('input', function() {
    document.getElementById('usernameError').classList.remove('visible');
});