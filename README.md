# GitTogether Registration

A sleek registration portal for GitTogether events that validates GitHub usernames and redirects users to event-specific registration forms.

## Features

- 🎯 Simple and intuitive user interface
- 👤 Real-time GitHub username validation
- 📍 Multiple event location support
- 🎨 GitHub-like dark theme
- 📱 Fully responsive design

## Managing Events

### Event Configuration
Events are managed through the `config.json` file. Each event requires:
- `city`: Name of the city (must match exactly with the FORM_URLS entries in script.js)
- `date`: Date in YYYY-MM-DD format

### Adding New Events
1. Open `config.json`
2. Add a new event object to the `events` array.

### Removing Events
1. To remove an event, simply delete its entry from the `config.json` file
2. Events with past dates are automatically filtered out and won't appear in the form

### Important Notes
- The date format must be YYYY-MM-DD
- City names in `config.json` must exactly match the keys in `FORM_URLS`
- Past events are automatically hidden from the registration form
- Form URLs are maintained separately in `script.js` as they typically remain constant for each city