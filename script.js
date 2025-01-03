const CONFIG = {
    events: [
        {
            city: "Mumbai",
            date: "18th January 2025",
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdaC4Uqts-p-Ad9lUhOfCt4yMsBQJ3_fkQpyp4GwPvnVMxNtQ/viewform"
        },
        {
            city: "Delhi NCR",
            date: "18th January 2025",
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe49RWkRssB4AFO9NVL08UcSp7eKA0VJVmUmzQKmS8quMEszg/viewform"
        },
        {
            city: "Bengaluru",
            date: "25th January 2025",
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdcqzZ-wE3IzhmkOV_ElC8TIugCK7p8eEznTJCWjSlGYMB46A/viewform"
        }
    ]
};

async function populateEventOptions() {
    const eventOptionsDiv = document.getElementById('eventOptions');
    
    CONFIG.events.forEach((event, index) => {
        const radioDiv = document.createElement('div');
        radioDiv.className = 'radio-option';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `event${index}`;
        input.name = 'event';
        input.value = event.formUrl;
        input.required = true;
        
        const label = document.createElement('label');
        label.htmlFor = `event${index}`;
        label.textContent = `${event.city} (${event.date})`;
        
        radioDiv.appendChild(input);
        radioDiv.appendChild(label);
        eventOptionsDiv.appendChild(radioDiv);
    });
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