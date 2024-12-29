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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, suggestion })
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
            <!-- 댓글 -->
            <div class="comment">
                <p><strong>${item.name}</strong>: ${item.suggestion}</p>
                <button onclick="deleteSuggestion(${item.id})">삭제</button>
            </div>
            
            <!-- 대댓글 영역 -->
            <div id="replies-${item.id}" class="replies">
                <!-- 대댓글이 동적으로 추가됨 -->
            </div>
            <form class="replyForm" data-suggestion-id="${item.id}">
                <textarea placeholder="대댓글 작성" required></textarea>
                <button type="submit">대댓글 작성</button>
            </form>
        `;
        suggestionsList.appendChild(suggestionItem);

        // Load replies for this suggestion
        loadReplies(item.id);
    }

    function loadReplies(suggestionId) {
        fetch(`/api/replies/${suggestionId}`)
            .then(response => response.json())
            .then(replies => {
                const repliesContainer = document.getElementById(`replies-${suggestionId}`);
                repliesContainer.innerHTML = ''; // 기존 대댓글 초기화
                replies.forEach(reply => {
                    const replyItem = document.createElement('div');
                    replyItem.classList.add('reply-item');
                    replyItem.innerHTML = `
                        <p><strong>관리자:</strong> ${reply.reply}</p>
                        <button onclick="deleteReply(${reply.id}, ${suggestionId})">삭제</button>
                    `;
                    repliesContainer.appendChild(replyItem);
                });
            });
    }

    window.deleteSuggestion = function(id) {
        fetch(`/api/suggestions/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                fetchSuggestions();
            });
    }

    window.deleteReply = function(replyId, suggestionId) {
        fetch(`/api/replies/${replyId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                loadReplies();
            });
    }

    
    document.addEventListener('submit', function(e) {
        if (e.target.classList.contains('replyForm')) {
            e.preventDefault();
            const form = e.target;
            const suggestionId = form.getAttribute('data-suggestion-id');
            const replyText = form.querySelector('textarea').value;

            fetch('/api/replies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ suggestion_id: suggestionId, reply: replyText })
            })
            .then(response => response.json())
            .then(() => {
                form.reset();

                // 새 대댓글을 즉시 UI에 추가
                const repliesContainer = document.getElementById(`replies-${suggestionId}`);
                const replyItem = document.createElement('div');
                replyItem.classList.add('reply-item');
                replyItem.innerHTML = `
                    <p><strong>관리자:</strong> ${replyText}</p>
                `;
                repliesContainer.appendChild(replyItem);
            });
        }
    });
});
