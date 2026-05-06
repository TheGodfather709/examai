# 📚 ExamAI - Professional Exam Paper Generator

ExamAI is a modern, AI-powered web application designed to generate professional exam papers in seconds. Perfect for educators, schools, and tutors who want to create high-quality, customized examination papers with minimal effort.

## ✨ Features

### Core Functionality
- **AI-Powered Question Generation**: Advanced algorithms generate unique, relevant questions based on subject, topic, and difficulty level
- **Customizable Parameters**:
  - Subject name (Mathematics, Physics, History, etc.)
  - Class/Grade (Class 1-12, Bachelor, Master)
  - Topic selection
  - Number of questions (1-50)
  - Difficulty level (Easy, Medium, Hard)
  - Question types (MCQ, Short Answer, Long Answer)
  - Custom marks allocation

### Exam Paper Features
- **Professional Formatting**: School header with ExamAI branding
- **Detailed Information**: Subject, class, topic, date, marks, and time limit
- **Comprehensive Instructions**: Guidelines for students
- **Proper Numbering**: Sequential question numbering with difficulty badges
- **Marks Display**: Clear marks allocation for each question
- **Answer Spaces**: Designated areas for student responses
- **Page Breaks**: Automatic page breaks after every 5 questions
- **Print & Download**: Professional printing and PDF export options

### Design & Usability
- **Clean White & Blue Theme**: Professional color scheme (#1e3a8a primary, #3b82f6 secondary)
- **Fully Responsive**: Perfect display on desktop, tablet, and mobile devices
- **Modern UI**: Smooth animations, hover effects, and intuitive navigation
- **Sticky Navigation**: Easy access to all sections
- **Mobile Hamburger Menu**: Optimized mobile experience

### Additional Sections
- **Features Section**: Highlights key benefits with 6 feature cards
- **Pricing Section**:
  - Free Plan: 3 papers per day
  - Pro Plan: ₹99/month for unlimited papers
  - Enterprise: Custom pricing
- **Contact Section**: Email, phone, and location information
- **Footer**: Social media links and quick navigation

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No external dependencies required (uses vanilla JavaScript, HTML, CSS)

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd ExamAI
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No installation or build process required

### File Structure
```
ExamAI/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling (1000+ lines)
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 📖 Usage

### Creating an Exam Paper

1. **Fill in the Form**:
   - Enter the subject name (e.g., "Mathematics")
   - Select class/grade level
   - Enter the topic (e.g., "Algebra")
   - Use slider to select number of questions (1-50)
   - Choose difficulty level
   - Enter total marks
   - Select question types (MCQ, Short Answer, Long Answer)

2. **Generate Paper**:
   - Click the "Generate Exam Paper" button
   - The app generates a professional exam paper instantly

3. **View & Interact**:
   - Scroll through the generated paper
   - Review all questions, marks, and answer spaces

4. **Print or Download**:
   - Click "Print" to print the paper (opens print dialog)
   - Click "Download PDF" to save as PDF file
   - Click "Create Another" to generate a new paper

## 🎨 Design Highlights

### Color Scheme
- **Primary Blue**: #1e3a8a
- **Secondary Blue**: #3b82f6
- **Accent Orange**: #f59e0b
- **Success Green**: #10b981
- **Light Background**: #f8fafc
- **White**: #ffffff

### Typography
- Clean, professional sans-serif fonts
- Responsive font sizes
- Optimal line height for readability

### Animations
- Floating card animations in hero section
- Smooth scroll behavior
- Page transitions and hover effects
- Slide-in animation for exam papers

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Desktop**: Full layout with all features visible
- **Tablet** (768px and below): Optimized grid layouts, adjusted spacing
- **Mobile** (480px and below): Single column layout, simplified navigation

### Mobile Features
- Hamburger menu for navigation
- Optimized form layout
- Touch-friendly buttons and inputs
- Proper spacing and text sizes
- Scrollable exam paper

## 🔧 Customization

### Modify Question Templates
Edit `script.js` and update the `getQuestionTemplates()` function:
```javascript
const templates = {
    easy: [
        'Your custom question template here...',
        // Add more templates
    ],
    medium: [ /* ... */ ],
    hard: [ /* ... */ ]
};
```

### Change Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #1e3a8a;
    --secondary-color: #3b82f6;
    /* Change any color here */
}
```

### Adjust Pricing
Edit the pricing cards in `index.html`:
```html
<div class="price">₹99<span>/month</span></div>
```

## 💾 Local Storage

The application automatically saves:
- Generated exam papers (last 10 papers)
- Subject preferences
- User settings

Data is stored locally in browser using localStorage API.

## 🖨️ Print Optimization

The application includes print-specific CSS that:
- Hides navigation and unnecessary sections
- Optimizes layout for paper
- Ensures proper page breaks
- Removes shadows and unnecessary styling
- Maintains professional appearance when printed

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📚 Features in Detail

### Intelligent Question Generation
- Generates contextually relevant questions
- Adjusts complexity based on difficulty level
- Distributes marks evenly across questions
- Calculates time limit automatically (2 minutes per mark)

### Professional Exam Format
- Standard exam paper layout
- Clear section headers
- Difficulty indicators
- Answer space calculations
- Automatic page breaks

### User Experience
- Form validation
- Real-time slider value display
- Smooth transitions between sections
- Intuitive navigation
- Clear call-to-action buttons

## 🔐 Security & Privacy

- All processing happens locally in the browser
- No data sent to external servers
- No user tracking or analytics
- Complete privacy of generated papers

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Support

For issues, questions, or suggestions:
- Email: support@examai.com
- Phone: +91 9876 543 210
- Location: New Delhi, India

## 🎯 Roadmap

Future features planned:
- [ ] AI-enhanced question generation using ML models
- [ ] Automatic answer key generation
- [ ] Question bank database
- [ ] Multi-language support
- [ ] User authentication and cloud sync
- [ ] Bulk paper generation
- [ ] API for integration
- [ ] Mobile app (iOS/Android)
- [ ] Plagiarism detection
- [ ] Analytics and insights

## 🚀 Performance

- **Page Load**: < 2 seconds
- **Paper Generation**: < 1 second
- **Minimal JavaScript**: Vanilla JS, no heavy frameworks
- **Optimized CSS**: Efficient styling, minimal reflows
- **Zero External Dependencies**: Fast and reliable

## 📊 Statistics

- **HTML Lines**: ~400 lines
- **CSS Lines**: ~1000+ lines
- **JavaScript Lines**: ~350 lines
- **Total Code Size**: ~45 KB (unminified)
- **Features**: 15+ major features
- **Responsive Breakpoints**: 3 (desktop, tablet, mobile)

## 🌟 Highlights

✅ **No Installation Required** - Just open and use
✅ **Lightning Fast** - Generates papers in milliseconds
✅ **Professional Output** - Print-ready quality
✅ **Fully Responsive** - Works on all devices
✅ **Modern Design** - Clean, professional UI
✅ **Customizable** - Full control over paper format
✅ **Secure** - All processing local to browser
✅ **Free to Use** - Open source

---

**Made with ❤️ for educators and students**

*ExamAI - Making Education More Accessible*