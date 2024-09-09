document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate login
    if (username === 'admin' && password === 'password') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('exam').style.display = 'block';
        loadQuestions();
    } else {
        alert('Invalid login');
    }
});

function loadQuestions() {
    const questionsContainer = document.getElementById('questions');
    // Example questions
    const questions = [
        { question: 'What is 2 + 2?', options: ['3', '4', '5'], correct: '4' },
        { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'], correct: 'Paris' }
    ];

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <p>${q.question}</p>
            ${q.options.map(option => `
                <label>
                    <input type="radio" name="q${index}" value="${option}">
                    ${option}
                </label>
            `).join('<br>')}
        `;
        questionsContainer.appendChild(questionDiv);
    });
}

document.getElementById('submitExam').addEventListener('click', function() {
    const questions = [
        { correct: '4' },
        { correct: 'Paris' }
    ];
    
    let score = 0;
    
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.correct) {
            score++;
        }
    });

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h3>Your Score: ${score} / ${questions.length}</h3>`;
    resultDiv.style.display = 'block';
});
