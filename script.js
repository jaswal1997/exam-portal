// Mock database of users with their exams
const users = [
    {
        username: 'student1',
        password: 'pass1',
        exam: [
            { question: 'What is 5 + 3?', options: ['6', '7', '8'], correct: '8' },
            { question: 'What is the capital of Germany?', options: ['Berlin', 'Paris', 'Rome'], correct: 'Berlin' }
        ]
    },
    {
        username: 'student2',
        password: 'pass2',
        exam: [
            { question: 'What is 7 - 4?', options: ['1', '2', '3'], correct: '3' },
            { question: 'What is the capital of Spain?', options: ['Madrid', 'Lisbon', 'Barcelona'], correct: 'Madrid' }
        ]
    }
];

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate login credentials
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('exam').style.display = 'block';
        loadQuestions(user.exam);
    } else {
        alert('Invalid login');
    }
});

// Load questions based on the logged-in user
function loadQuestions(questions) {
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = ''; // Clear previous questions

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

// Handle exam submission
document.getElementById('submitExam').addEventListener('click', function() {
    const user = users.find(u => u.username === document.getElementById('username').value);
    const questions = user.exam;

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
