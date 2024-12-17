document.getElementById('githubForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const apiUrl = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert('Invalid GitHub username');
            return;
        }
        const data = await response.json();
        window.location.href = 'https://github.com/features/copilot/plans';
    } catch (error) {
        console.error('Error:', error);
        alert('Invalid GitHub username');
    }
});