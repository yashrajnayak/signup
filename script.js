async function loadConfig() {
    try {
        const response = await fetch('config.yml');
        const text = await response.text();
        // Using jsYaml library to parse YAML
        return jsyaml.load(text);
    } catch (error) {
        console.error('Error loading config:', error);
        return null;
    }
}

async function populateEventOptions() {
    const config = await loadConfig();
    if (!config) return;

    const eventOptionsDiv = document.getElementById('eventOptions');
    
    config.events.forEach((event, index) => {
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
    
    if (!selectedEvent) {
        alert('Please select an event');
        return;
    }

    const apiUrl = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert('Invalid GitHub username');
            return;
        }
        const data = await response.json();
        window.location.href = selectedEvent.value;
    } catch (error) {
        console.error('Error:', error);
        alert('Invalid GitHub username');
    }
});