// board_suggestions.js

// DOMcontentloaded를 통해 문서가 완전히 업로드되는 event 후 funtion()이 실행됨
// 이때 funtion은 실행되는 다음 코드를 의미함.
// getElementById를 통해 id = suggestionForm, suggestionList인 form태그와 div태그에서 정보를 가져옴.
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('suggestionForm');
    const suggestionsList = document.getElementById('suggestionsList');

    // 다른 사용자들이 올린 이미 존재하는 건의사항들을 로드하는 역할을 해줌
    fetchSuggestions();

    // 제출 버튼을 누르면 이벤트가 발생
    // form은 suggestionForm에서 받아온 변수임.
    // 새로운 데이터를 입력했을 때 서버로 업로드하여 그 제안을 처리하는 것임.
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // 제출 버튼 누를 때 새로고침을 방지함
        const name = document.getElementById('name').value; // .value를 통해 값을 할당함.
        const suggestion = document.getElementById('suggestion').value;
        addSuggestion(name, suggestion);
    });

    //get 요청을 하여 url에서 데이터를 가져옴
    function fetchSuggestions() {
        fetch('/api/suggestions')
            .then(response => response.json()) // 받은 값을 json 데이터 형식으로 파싱함
            .then(suggestions => {
                suggestionsList.innerHTML = ''; // suggestionList의 목록을 초기화함. 왜냐하면 fetchSuggestions를 통해 데이터 목록을 가져왔을 때 중복된 데이터가 발생할 수 있기 때문에 항상 초기화함.
                suggestions.forEach(displaySuggestion); // 새로운 값들을 추가함.
            });
    }

    function addSuggestion(name, suggestion) {
        fetch('/api/suggestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', //보내는 데이터 형식 지정
            },
            body: `name=${encodeURIComponent(name)}&suggestion=${encodeURIComponent(suggestion)}`//서버로 보내는 데이터를 인코딩함
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            form.reset(); // 입력 폼을 초기화 --> 다음 입력을 할 수 있도록
            fetchSuggestions(); // fetchSuggestions 함수를 통해 새롭게 올린 건의사항을 보여줌
        });
    }
    
    //suggestionItem 이라는 div 태그를 생성
    //css를 위해 suggestion-item 이라는 class를 지정
    //innerHTML을 해당 내용으로 바꾸고 suggestionList에 업로드 
    function displaySuggestion(item) {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.innerHTML = `
            <!-- 댓글 -->
            <div class="comment">
                <p><strong>${item.name}</strong>: ${item.suggestion}</p>
            <!-- 대댓글 영역 -->
            <div id="replies-${item.id}" class="replies">
                <!-- 대댓글이 동적으로 추가됨 -->
            </div>
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
                    `;
                    repliesContainer.appendChild(replyItem);
                });
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


/*
    window.deleteSuggestion = function(id) {
        //fetch(`/api/suggestions/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                fetchSuggestions();
            });
    }
*/
    // Fetch suggestions every 30 seconds
    setInterval(fetchSuggestions, 30000);
});
