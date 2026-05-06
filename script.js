// DOM Elements
const examForm = document.getElementById('examForm');
const numQuestionsInput = document.getElementById('numQuestions');
const questionsValue = document.getElementById('questionsValue');
const examPaperSection = document.getElementById('examPaperSection');
const examPaper = document.getElementById('examPaper');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// API Configuration (Add your API key)
const API_CONFIG = {
    provider: 'gemini', // or 'gemini' or 'huggingface'
    apiKey: 'AIzaSyBge2mmJu7ndKa2rv1OnIjK0lp-kvfEK7M', // Set in browser console: window.setAPIKey('your-key')
    baseURL: {
        openai: 'https://api.openai.com/v1',
        gemini: 'https://generativelanguage.googleapis.com/v1beta',
        huggingface: 'https://api-inference.huggingface.co/v1'
    }
};

// Set API Key from user
window.setAPIKey = function(key) {
    API_CONFIG.apiKey = key;
    console.log('✅ API Key set successfully!');
    console.log('Provider:', API_CONFIG.provider);
};

// Set API Provider
window.setProvider = function(provider) {
    if (['openai', 'gemini', 'huggingface'].includes(provider)) {
        API_CONFIG.provider = provider;
        console.log('✅ Provider changed to:', provider);
    } else {
        console.log('❌ Invalid provider. Use: openai, gemini, or huggingface');
    }
};

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
async function generateExamPaper() {
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
    const timeLimit = Math.round(marks / 50 * 180);
    const marksPerQuestion = Math.floor(marks / numQuestions);

    // Check if API Key is set
    if (!API_CONFIG.apiKey) {
        console.warn('⚠️ No API Key set. Using template-based questions.');
        alert('⚠️ API Key not set!\n\nTo use AI:\n1. Get API key from OpenAI, Google Gemini, or Hugging Face\n2. Run in console: window.setAPIKey("your-key")\n\nFor now, using template questions.');
        generateWithTemplates(subject, grade, topic, numQuestions, difficulty, marks, questionTypes, timeLimit, marksPerQuestion);
        return;
    }

    // Show loading indicator
    examPaperSection.style.display = 'block';
    examPaper.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 48px; margin-bottom: 20px;">🤖</div>
            <p style="font-size: 18px; color: #1e3a8a; font-weight: bold;">Generating questions with AI...</p>
            <div style="margin-top: 20px;">
                <div style="width: 40px; height: 40px; margin: 0 auto; border: 4px solid #e5e7eb; border-top: 4px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>
            <p style="font-size: 14px; color: #6b7280; margin-top: 15px;">This may take 3-5 seconds...</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;

    try {
        // Generate questions using AI
        const questions = await generateQuestionsWithAI(
            numQuestions, 
            subject, 
            topic, 
            difficulty, 
            questionTypes, 
            marksPerQuestion,
            grade
        );

        // Create and display exam paper
        createExamPaper(subject, grade, topic, numQuestions, difficulty, marks, timeLimit, questions);
    } catch (error) {
        console.error('Error generating questions:', error);
        alert('❌ Error generating questions with AI:\n\n' + error.message + '\n\nUsing template questions instead.');
        generateWithTemplates(subject, grade, topic, numQuestions, difficulty, marks, questionTypes, timeLimit, marksPerQuestion);
    }
}

// Generate Questions Using AI
async function generateQuestionsWithAI(count, subject, topic, difficulty, types, marksPerQuestion, grade) {
    const prompt = buildPrompt(count, subject, topic, difficulty, types, grade);
    
    console.log('📤 Sending request to:', API_CONFIG.provider);
    console.log('📝 Prompt:', prompt.substring(0, 100) + '...');
    
    if (API_CONFIG.provider === 'openai') {
        return await generateWithOpenAI(prompt, count, subject, topic, difficulty, marksPerQuestion, types);
    } else if (API_CONFIG.provider === 'gemini') {
        return await generateWithGemini(prompt, count, subject, topic, difficulty, marksPerQuestion, types);
    } else if (API_CONFIG.provider === 'huggingface') {
        return await generateWithHuggingFace(prompt, count, subject, topic, difficulty, marksPerQuestion, types);
    }
}

// Build AI Prompt
function buildPrompt(count, subject, topic, difficulty, types, grade) {
    const typesList = types.join(', ');
    return `Generate exactly ${count} unique and high-quality exam questions for:
- Subject: ${subject}
- Topic: ${topic}
- Grade/Class: ${grade}
- Difficulty Level: ${difficulty}
- Question Types: ${typesList}

Requirements:
1. Each question should be unique and original
2. Make questions realistic and educational
3. Difficulty should match the specified level
4. Questions must be suitable for ${grade} students
5. Each question should test understanding, not just memorization

For MCQ questions, provide 4 options (A, B, C, D).

Return ONLY a JSON array in this exact format:
[
  {"text": "Question text here", "type": "MCQ", "options": ["A) Option1", "B) Option2", "C) Option3", "D) Option4"]},
  {"text": "Question text here", "type": "Short Answer"},
  {"text": "Question text here", "type": "Long Answer"}
]

IMPORTANT: Return ONLY the JSON array, no other text.`;
}

// OpenAI API Call
async function generateWithOpenAI(prompt, count, subject, topic, difficulty, marksPerQuestion, types) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 3000
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`OpenAI Error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('📥 Raw response:', content.substring(0, 200) + '...');
    
    try {
        const questionsData = JSON.parse(content);
        return questionsData.map((q, index) => ({
            id: index + 1,
            text: q.text,
            type: q.type || types[index % types.length],
            difficulty: difficulty,
            marks: marksPerQuestion,
            subject: subject,
            topic: topic,
            options: q.options || []
        }));
    } catch (e) {
        console.error('Parse error:', e);
        throw new Error('Failed to parse AI response. Received: ' + content.substring(0, 200));
    }
}
// Google Gemini API Call (Fixed Version)
async function generateWithGemini(prompt, count, subject, topic, difficulty, marksPerQuestion, types) {
    try {
       const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_CONFIG.apiKey}`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Gemini Error: ${error.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        
        if (!data.candidates || data.candidates.length === 0) {
            throw new Error('Gemini did not return any results. Check your API key.');
        }

        let content = data.candidates[0].content.parts[0].text;
        
        // Clean markdown backticks if AI adds them
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const questionsData = JSON.parse(content);
        return questionsData.map((q, index) => ({
            id: index + 1,
            text: q.text,
            type: q.type || types[index % types.length],
            difficulty: difficulty,
            marks: marksPerQuestion,
            subject: subject,
            topic: topic,
            options: q.options || []
        }));
    } catch (e) {
        console.error('Gemini Error:', e);
        throw e;
    }
}


// Hugging Face API Call
async function generateWithHuggingFace(prompt, count, subject, topic, difficulty, marksPerQuestion, types) {
    const response = await fetch('https://api-inference.huggingface.co/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mistralai/Mistral-7B-Instruct-v0.2',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 3000
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Hugging Face Error: ${error.error || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('📥 Raw response:', content.substring(0, 200) + '...');
    
    try {
        const questionsData = JSON.parse(content);
        return questionsData.map((q, index) => ({
            id: index + 1,
            text: q.text,
            type: q.type || types[index % types.length],
            difficulty: difficulty,
            marks: marksPerQuestion,
            subject: subject,
            topic: topic,
            options: q.options || []
        }));
    } catch (e) {
        console.error('Parse error:', e);
        throw new Error('Failed to parse AI response. Received: ' + content.substring(0, 200));
    }
}

// Fallback: Generate with Templates
function generateWithTemplates(subject, grade, topic, numQuestions, difficulty, marks, questionTypes, timeLimit, marksPerQuestion) {
    const questions = generateQuestions(numQuestions, subject, topic, difficulty, questionTypes, marksPerQuestion);
    createExamPaper(subject, grade, topic, numQuestions, difficulty, marks, timeLimit, questions);
}

// Create and Display Exam Paper
function createExamPaper(subject, grade, topic, numQuestions, difficulty, marks, timeLimit, questions) {
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
        let optionsHTML = '';
        
        if (question.options && question.options.length > 0) {
            optionsHTML = `<div class="mcq-options" style="background: #f0f4ff; padding: 12px; margin-top: 8px; border-radius: 6px; border-left: 3px solid #3b82f6;">
                ${question.options.join(' | ')}
            </div>`;
        }
        
        paperHTML += `
            <div class="question-section">
                <div class="question-header">
                    <div class="question-number">${index + 1}</div>
                    <div class="question-text">${question.text}</div>
                </div>
                ${optionsHTML}
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

        if ((index + 1) % 5 === 0 && index + 1 !== questions.length) {
            paperHTML += '<div class="page-break">--- Page Break ---</div>';
        }
    });

    paperHTML += `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #1e3a8a; text-align: center; color: #6b7280;">
            <p><strong>Generated by ExamAI</strong></p>
            <p style="font-size: 0.85rem;">Date: ${new Date().toLocaleDateString()}</p>
        </div>
    `;

    examPaper.innerHTML = paperHTML;
    examPaperSection.style.display = 'block';

    setTimeout(() => {
        examPaperSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Generate Questions (Template Fallback)
function generateQuestions(count, subject, topic, difficulty, types, marksPerQuestion) {
    const questions = [];
    const questionTemplates = getQuestionTemplates(subject, topic, difficulty);

    for (let i = 0; i < count; i++) {
        const type = types[i % types.length];
        const template = questionTemplates[i % questionTemplates.length];

        let options = null;
        if (type === 'MCQ') {
            options = ['A) Option 1', 'B) Option 2', 'C) Option 3', 'D) Option 4'];
        }

        questions.push({
            id: i + 1,
            text: template,
            type: type,
            difficulty: difficulty,
            marks: marksPerQuestion,
            subject: subject,
            topic: topic,
            options: options
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

    if (typeof html2pdf === 'undefined') {
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
    console.log('✅ ExamAI loaded successfully!');
    console.log('📖 To use AI:');
    console.log('1. Get API key from: OpenAI, Google Gemini, or Hugging Face');
    console.log('2. In console, run: window.setAPIKey("your-api-key")');
    console.log('3. Or switch provider: window.setProvider("gemini")');
});
