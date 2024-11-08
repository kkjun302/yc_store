// board_suggestions.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('suggestionForm');
    const suggestionsList = document.getElementById('suggestionsList');

    // Load existing suggestions
    fetchSuggestions();

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const suggestion = document.getElementById('suggestion').value;
        addSuggestion(name, suggestion);
    });

    function fetchSuggestions() {
        fetch('/api/suggestions')
            .then(response => response.json())
            .then(suggestions => {
                suggestionsList.innerHTML = '';
                suggestions.forEach(displaySuggestion);
            });
    }

    function addSuggestion(name, suggestion) {
        fetch('/api/suggestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(name)}&suggestion=${encodeURIComponent(suggestion)}`
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            form.reset();
            fetchSuggestions();
        });
    }

    function displaySuggestion(item) {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.innerHTML = `
            <p><strong>${item.name}</strong>: ${item.suggestion}</p>
            <button onclick="deleteSuggestion(${item.id})">삭제</button>
        `;
        suggestionsList.appendChild(suggestionItem);
    }

    window.deleteSuggestion = function(id) {
        fetch(`/api/suggestions/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                fetchSuggestions();
            });
    }

    // Fetch suggestions every 30 seconds
    setInterval(fetchSuggestions, 30000);
});