// DOM Elements
const examForm = document.getElementById('examForm');
const numQuestionsInput = document.getElementById('numQuestions');
const questionsValue = document.getElementById('questionsValue');
const examPaperSection = document.getElementById('examPaperSection');
const examPaper = document.getElementById('examPaper');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Event Listeners
numQuestionsInput.addEventListener('input', function() {
    questionsValue.textContent = this.value;
});

examForm.addEventListener('submit', function(e) {
    e.preventDefault();
    generateExamPaper();
});

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

// Generate Exam Paper
function generateExamPaper() {
    const subject = document.getElementById('subject').value;
    const grade = document.getElementById('grade').value;
    const topic = document.getElementById('topic').value;
    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    const difficulty = document.getElementById('difficulty').value;
    const marks = parseInt(document.getElementById('marks').value);
    const questionTypes = getSelectedQuestionTypes();

    if (questionTypes.length === 0) {
        alert('Please select at least one question type');
        return;
    }

    // Calculate time (2 minutes per mark as standard)
    const timeLimit = Math.round(marks / 50 * 180); // 180 minutes for 100 marks
    const marksPerQuestion = Math.floor(marks / numQuestions);

    // Generate questions
    const questions = generateQuestions(numQuestions, subject, topic, difficulty, questionTypes, marksPerQuestion);

    // Create exam paper HTML
    let paperHTML = `
        <div class="paper-header">
            <div class="school-name">📚 ExamAI - Online Exam Generator</div>
            <div class="exam-title">${subject} Examination</div>
        </div>

        <div class="paper-info">
            <div class="info-item">
                <span class="info-label">Subject:</span>
                <span class="info-value">${subject}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Class/Grade:</span>
                <span class="info-value">${grade}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Topic:</span>
                <span class="info-value">${topic}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Difficulty:</span>
                <span class="info-value">${difficulty}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Total Marks:</span>
                <span class="info-value">${marks}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Time Limit:</span>
                <span class="info-value">${timeLimit} minutes</span>
            </div>
        </div>

        <div class="instructions">
            <h4>📋 Instructions:</h4>
            <ol>
                <li>Write your name, roll number, and other required details clearly.</li>
                <li>Read each question carefully before answering.</li>
                <li>Attempt all questions in the order they appear.</li>
                <li>Write your answers clearly in the designated answer spaces.</li>
                <li>Rough work should be shown clearly.</li>
                <li>Time limit is ${timeLimit} minutes from the start of the examination.</li>
            </ol>
        </div>
    `;

    // Add questions
    questions.forEach((question, index) => {
        const difficultyClass = `difficulty-${question.difficulty.toLowerCase()}`;
        paperHTML += `
            <div class="question-section">
                <div class="question-header">
                    <div class="question-number">${index + 1}</div>
                    <div class="question-text">${question.text}</div>
                </div>
                <div class="question-meta">
                    <span class="marks-badge">Marks: ${question.marks}</span>
                    <span class="difficulty-badge ${difficultyClass}">${question.difficulty}</span>
                    <span class="difficulty-badge" style="background: #dbeafe; color: #1e40af;">${question.type}</span>
                </div>
                <div class="answer-space">
                    ${getAnswerSpaceText(question.type)}
                </div>
            </div>
        `;

        // Add page break after every 5 questions
        if ((index + 1) % 5 === 0 && index + 1 !== questions.length) {
            paperHTML += '<div class="page-break">--- Page Break ---</div>';
        }
    });

    // Add footer
    paperHTML += `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #1e3a8a; text-align: center; color: #6b7280;">
            <p><strong>Generated by ExamAI</strong></p>
            <p style="font-size: 0.85rem;">Date: ${new Date().toLocaleDateString()}</p>
        </div>
    `;

    examPaper.innerHTML = paperHTML;
    examPaperSection.style.display = 'block';

    // Scroll to exam paper
    setTimeout(() => {
        examPaperSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // Save to localStorage
    saveExamData({
        subject,
        grade,
        topic,
        difficulty,
        marks,
        timeLimit,
        questions,
        generatedAt: new Date().toISOString()
    });
}

// Generate Questions
function generateQuestions(count, subject, topic, difficulty, types, marksPerQuestion) {
    const questions = [];
    const questionTemplates = getQuestionTemplates(subject, topic, difficulty);

    for (let i = 0; i < count; i++) {
        const type = types[i % types.length];
        const template = questionTemplates[i % questionTemplates.length];
        const difficultyLevel = difficulty;

        let questionText = template;
        if (type === 'MCQ') {
            questionText += ` (A) Option 1  (B) Option 2  (C) Option 3  (D) Option 4`;
        }

        questions.push({
            id: i + 1,
            text: questionText,
            type: type,
            difficulty: difficultyLevel,
            marks: marksPerQuestion,
            subject: subject,
            topic: topic
        });
    }

    return questions;
}

// Get Question Templates
function getQuestionTemplates(subject, topic, difficulty) {
    const templates = {
        easy: [
            `What is the definition of ${topic} in ${subject}?`,
            `Explain the basic concept of ${topic}.`,
            `List the main characteristics of ${topic}.`,
            `Describe the importance of ${topic} in ${subject}.`,
            `What are the fundamental principles of ${topic}?`,
        ],
        medium: [
            `Analyze the relationship between ${topic} and its applications.`,
            `Compare and contrast different aspects of ${topic}.`,
            `Discuss the significance of ${topic} in modern ${subject}.`,
            `Evaluate the impact of ${topic} on contemporary issues.`,
            `Explain the correlation between ${topic} and other concepts.`,
        ],
        hard: [
            `Critically evaluate the theory of ${topic} and its limitations.`,
            `Synthesize information about ${topic} to propose new insights.`,
            `Analyze complex problems related to ${topic} and provide solutions.`,
            `Compare theoretical and practical applications of ${topic}.`,
            `Justify your position on controversial aspects of ${topic}.`,
        ]
    };

    const level = difficulty.toLowerCase();
    const questionList = templates[level] || templates.medium;
    return shuffleArray([...questionList]);
}

// Get Answer Space Text
function getAnswerSpaceText(type) {
    const spaces = {
        'MCQ': '[ ] (A)  [ ] (B)  [ ] (C)  [ ] (D)',
        'Short Answer': '________________________________________________________________________________________',
        'Long Answer': '________________________________________________________________________________________________________________________'
    };
    return spaces[type] || spaces['Short Answer'];
}

// Get Selected Question Types
function getSelectedQuestionTypes() {
    const checkboxes = document.querySelectorAll('input[name="questionTypes"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Shuffle Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Print Exam Paper
function printExamPaper() {
    window.print();
}

// Download Exam Paper
function downloadExamPaper() {
    const element = document.getElementById('examPaper');
    const opt = {
        margin: 10,
        filename: 'exam_paper.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    // If html2pdf library is not available, use simple method
    if (typeof html2pdf === 'undefined') {
        // Fallback: Create a simple text version
        const content = element.innerText;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exam_paper.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        alert('Exam paper downloaded as text file. For PDF download, please use the Print function with Print to PDF option.');
    } else {
        html2pdf().set(opt).from(element).save();
    }
}

// Create Another Exam Paper
function createAnother() {
    examPaperSection.style.display = 'none';
    examForm.reset();
    numQuestionsInput.value = 10;
    questionsValue.textContent = '10';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Save Exam Data to LocalStorage
function saveExamData(data) {
    try {
        let exams = JSON.parse(localStorage.getItem('generatedExams')) || [];
        exams.push(data);
        // Keep only last 10 exams
        if (exams.length > 10) {
            exams = exams.slice(-10);
        }
        localStorage.setItem('generatedExams', JSON.stringify(exams));
    } catch (error) {
        console.log('LocalStorage not available:', error);
    }
}

// Initialize
window.addEventListener('load', function() {
    console.log('ExamAI loaded successfully!');
});