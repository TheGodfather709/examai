# 🤖 ExamAI - AI-Powered Exam Paper Generator

**Create professional, customized exam papers in seconds with real AI-powered question generation!**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=flat-square)](https://thegodfather709.github.io/examai/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-examai-black?style=flat-square)](https://github.com/TheGodfather709/examai)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## ✨ Features

### 🤖 **Real AI Integration**
- **Multi-Provider Support**: OpenAI GPT-3.5, Google Gemini, Hugging Face
- **Genuine Question Generation**: Not templates - real, unique questions from AI
- **Smart Prompts**: Context-aware prompts based on subject, topic, grade, and difficulty
- **MCQ Options**: AI generates realistic multiple-choice options
- **Graceful Fallback**: Uses templates if no API key

### 📝 **Professional Exam Papers**
- Customizable subjects, grades, and topics
- Multiple question types (MCQ, Short Answer, Long Answer)
- Automatic marks and time calculation
- Professional formatting with headers and instructions
- Automatic page breaks every 5 questions
- Difficulty badges and marks indicators

### 📱 **Fully Responsive**
- Desktop, tablet, and mobile optimized
- Hamburger menu for mobile navigation
- Touch-friendly interface
- Print and PDF download options

### 🎨 **Beautiful Design**
- Modern white & blue theme
- Smooth animations and transitions
- Clean, professional UI
- Intuitive form controls

---

## 🚀 Quick Start

### **Step 1: Get API Key (Choose One)**

**Option A: OpenAI (Recommended) ⭐**
- Visit: https://platform.openai.com/account/api-keys
- Create a new API key
- Cost: ~$0.002 per exam

**Option B: Google Gemini (Free)**
- Visit: https://ai.google.dev/
- Get free API key
- Cost: Free tier available

**Option C: Hugging Face (Open Source)**
- Visit: https://huggingface.co/settings/tokens
- Create access token
- Cost: Free with free tier

### **Step 2: Set API Key**
Open browser console (F12) and run:
```javascript
window.setAPIKey("your-api-key-here")
```

### **Step 3: Generate Exams!** 🎓
1. Visit: https://thegodfather709.github.io/examai/
2. Fill in exam details
3. Click "Generate Exam Paper"
4. Print or download!

---

## 📊 How It Works

```
┌─────────────────────────┐
│  User Input             │
│ (Subject, Topic, etc.)  │
└────────────┬────────────┘
             │
             ↓
┌─────────────────────────┐
│  Smart Prompt Builder   │
│  Creates detailed       │
│  context-aware prompt   │
└────────────┬────────────┘
             │
             ↓
┌─────────────────────────┐
│  AI API Call            │
│  (OpenAI/Gemini/HF)     │
└────────────┬────────────┘
             │
             ↓
┌─────────────────────────┐
│  Parse Response         │
│  Format Questions       │
└────────────┬────────────┘
             │
             ↓
┌─────────────────────────┐
│  Professional Exam      │
│  Paper Display          │
└─────────────────────────┘
```

---

## 🎯 AI Providers Comparison

| Feature | OpenAI | Google Gemini | Hugging Face |
|---------|--------|---------------|--------------|
| **Quality** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Speed** | Fast | Very Fast | Fast |
| **Cost** | ~$0.002/exam | Free | Free |
| **Free Tier** | ❌ | ✅ | ✅ |
| **Accuracy** | Best | Good | Good |
| **Setup** | Easy | Easy | Easy |

---

## 📖 Usage Guide

### Creating Your First Exam

1. **Fill the Form:**
   - Subject: Mathematics, Physics, History, etc.
   - Grade: Class 1-12, Bachelor, Master
   - Topic: Algebra, Photosynthesis, etc.
   - Questions: 1-50 (use slider)
   - Difficulty: Easy, Medium, Hard
   - Marks: 10-500
   - Question Types: Select MCQ, Short Answer, Long Answer

2. **Generate:**
   - Click "🪄 Generate Exam Paper"
   - Wait for AI generation (2-5 seconds)
   - See loading indicator: "🤖 Generating questions with AI..."

3. **Review:**
   - Scroll through generated questions
   - Check quality and accuracy
   - Review marks and difficulty

4. **Export:**
   - Click "Print" for printing
   - Click "Download PDF" to save
   - Click "Create Another" for new exam

---

## 💡 Tips for Best Results

### **Better Topic Specifications**
- ❌ Bad: "Science"
- ✅ Good: "Photosynthesis in Plants"
- ✅ Better: "Photosynthesis - Light Reactions and Calvin Cycle"

### **Question Type Mix**
- **Quick Assessment**: Mostly MCQ (70% MCQ, 30% Short Answer)
- **Detailed Assessment**: Balanced (40% MCQ, 40% Short, 20% Long)
- **Essay Exam**: Mostly Long Answer (20% MCQ, 30% Short, 50% Long)

### **Difficulty Distribution**
- **Easy**: Great for formative assessments
- **Medium**: Standard classroom exams
- **Hard**: For gifted students or competitive exams

---

## 🛠️ Project Structure

```
examai/
├── index.html           # Main HTML (form + display)
├── script.js            # JavaScript with AI integration
├── styles.css           # Responsive CSS (~1200 lines)
└── README.md           # This file
```

---

## 🔧 Installation

### **Option 1: Direct Use (No Installation)**
```bash
git clone https://github.com/TheGodfather709/examai.git
cd examai
# Open index.html in browser
```

### **Option 2: Deploy to GitHub Pages**
```bash
# Files automatically deployed to:
# https://thegodfather709.github.io/examai/
```

---

## 🔐 Security & Privacy

✅ **All processing happens locally in your browser**
- No data sent to servers (except API key to AI provider)
- Exams saved only to browser's LocalStorage
- Complete privacy of generated papers
- Clear browser data to remove history

---

## 🐛 Troubleshooting

### **Questions not generating?**
- ✅ Set API key: `window.setAPIKey("your-key")`
- ✅ Check internet connection
- ✅ Try a different provider
- ✅ Check API key validity

### **Wrong question type generated?**
- AI may format differently sometimes
- App intelligently detects and reformats
- Falls back to templates if needed

### **PDF download not working?**
- Use Print → Print to PDF option
- Try text file download (fallback)
- Check browser permissions

### **Console errors?**
- Open DevTools (F12)
- Check error message
- Verify API key format
- Try different provider

---

## 📚 Example Output

**Generated Exam Question (AI-powered):**

```
Q1: Explain the role of mitochondria in cellular respiration and 
    describe how ATP production differs between aerobic and anaerobic 
    conditions. [5 marks]

A) This is a generated MCQ question
B) With realistic options
C) From the selected provider
D) AI created, not template

Answer Space: _______________________________________________
```

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |
| Mobile Safari | ✅ |
| Chrome Mobile | ✅ |

---

## 📊 Statistics

- **Code Size**: ~45 KB (unminified)
- **Dependencies**: Zero (vanilla JS, HTML, CSS)
- **Page Load**: < 2 seconds
- **Exam Generation**: 2-5 seconds (with AI)
- **Mobile Optimized**: Yes
- **Responsive Breakpoints**: 3 (desktop, tablet, mobile)

---

## 🎓 Use Cases

### **Teachers**
- Create practice papers quickly
- Generate different question sets
- Customize by topic and difficulty
- Professional formatting for printing

### **Tutors**
- Personalized assignments
- Multiple versions for students
- Quick quiz generation
- Time-saving solution

### **Students**
- Practice for exams
- Self-assessment tools
- Mock tests at home
- Study material generation

### **Schools**
- Standardized exam papers
- Bulk generation capability
- Consistent quality
- Professional output

---

## 🚀 Roadmap

### **Completed** ✅
- [x] Real AI integration
- [x] Multi-provider support
- [x] Question generation
- [x] Professional formatting
- [x] Mobile responsive

### **Planned** 🎯
- [ ] Answer key generation
- [ ] Question difficulty analytics
- [ ] Bulk paper generation
- [ ] Custom branding
- [ ] Question bank storage
- [ ] User accounts & cloud sync
- [ ] Mobile app (iOS/Android)
- [ ] Multi-language support

---

## 🤝 Contributing

We love contributions! To contribute:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 License

MIT License - feel free to use for personal and commercial projects!

---

## 📞 Support & Contact

- **GitHub Issues**: Report bugs via GitHub Issues
- **Email**: support@examai.com
- **Location**: New Delhi, India

---

## 🌟 Show Your Support

⭐ Star this project if you find it helpful!
🐛 Report issues to help improve
💡 Suggest features for future releases

---

## 👨‍💻 Made With ❤️

**By: TheGodfather709**

*Making education accessible, one exam at a time!* 🎓📚

---

## 📄 Changelog

### **v1.1.0** - AI Integration (Current)
- ✨ Real AI question generation
- ✨ Multi-provider support
- 🐛 MCQ formatting improvements
- 📚 Complete documentation

### **v1.0.0** - Initial Release
- 🎉 Template-based questions
- 📱 Responsive design
- 📥 Print & download
- 🎨 Professional UI

---

**Happy exam generating! 🚀📚**
