# 🌟 Sai Sri Harsha Guddati - Personal Portfolio & Blog

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Personal%20Website-00ff88?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Modern%20Design-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A modern, responsive personal portfolio and blog website showcasing my journey as a Software Development/AIML Engineer**

[🌐 Live Demo](https://saisriharsha.me) • [📧 Contact](mailto:saisriharshaguddati1@gmail.com) • [💼 Experience](/experience)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 **Modern Design**
- **Dark/Light Theme Toggle** with system preference detection
- **Glassmorphism Effects** with backdrop blur
- **Smooth Animations** and hover effects
- **Responsive Design** for all devices
- **Custom CSS Variables** for consistent theming

</td>
<td width="50%">

### 🚀 **Performance**
- **React 18** with modern hooks
- **Code Splitting** and lazy loading
- **SEO Optimized** with dynamic sitemap
- **Google Analytics** integration
- **Web Vitals** monitoring

</td>
</tr>
<tr>
<td width="50%">

### 📱 **User Experience**
- **Typewriter Effect** on homepage
- **Smooth Scrolling** navigation
- **Loading States** and error handling
- **Form Validation** with feedback
- **Mobile-First** approach

</td>
<td width="50%">

### 🛠 **Technical Features**
- **RESTful API** integration
- **Markdown Support** for blog posts
- **PDF Viewer** for resume
- **Contact Form** with backend
- **Portfolio Showcase** with pagination

</td>
</tr>
</table>

---

## 🏗️ Architecture

```mermaid
graph TB
    A[React Frontend] --> B[Azure Static Web Apps]
    A --> C[Backend API]
    C --> D[Database]
    A --> E[Google Analytics]
    A --> F[Google Tag Manager]
    
    subgraph "Frontend Components"
    G[Home Page]
    H[Blog System]
    I[Portfolio]
    J[Experience]
    K[Contact Form]
    L[Resume Viewer]
    end
    
    A --> G
    A --> H
    A --> I
    A --> J
    A --> K
    A --> L
```

---

## 🎯 Pages & Functionality

### 🏠 **Home Page**
- **Interactive Typewriter Effect** showcasing my roles
- **Professional Profile Image** with hover animations
- **Personal Bio Section** with engaging content
- **Gradient Text Effects** and modern typography

### 📝 **Blog System**
- **Dynamic Blog Posts** fetched from REST API
- **Markdown Rendering** with React-Markdown
- **Pagination** for better content organization
- **Individual Post Pages** with full content

### 💼 **Portfolio**
- **Project Showcase** with descriptions and links
- **Responsive Grid Layout** adapting to screen sizes
- **Hover Effects** and smooth transitions
- **Paginated Display** for optimal loading

### 🎯 **Experience**
- **Professional Timeline** with detailed descriptions
- **Interactive Cards** with hover effects
- **Skills Highlighting** and achievement metrics
- **Resume Integration** with PDF viewer

### 📞 **Contact**
- **Interactive Contact Form** with validation
- **Direct Email/Phone Links** with icons
- **Success Feedback** and error handling
- **Thank You Page** with navigation

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | Styling | Tools | Analytics |
|----------|---------|-------|-----------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | ![Google Analytics](https://img.shields.io/badge/Google%20Analytics-E37400?style=flat-square&logo=google-analytics&logoColor=white) |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | ![Responsive](https://img.shields.io/badge/Responsive-Design-00D9FF?style=flat-square) | ![NPM](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) | ![GTM](https://img.shields.io/badge/Google%20Tag%20Manager-246FDB?style=flat-square&logo=google-tag-manager&logoColor=white) |
| ![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | ![Animations](https://img.shields.io/badge/CSS-Animations-FF6B6B?style=flat-square) | ![Azure](https://img.shields.io/badge/Azure-0078D4?style=flat-square&logo=microsoft-azure&logoColor=white) | ![Web Vitals](https://img.shields.io/badge/Web-Vitals-4285F4?style=flat-square&logo=google&logoColor=white) |

</div>

### 📦 **Key Dependencies**

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^7.1.5",
  "react-markdown": "^9.0.3",
  "@react-pdf-viewer/core": "^3.12.0",
  "framer-motion": "^12.4.3",
  "axios": "^1.7.9",
  "react-ga4": "^2.1.0"
}
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/saisriharsha19/personal-website.git

# Navigate to project directory
cd personal-website

# Install dependencies
npm install

# Start development server
npm start
```

### 🌐 **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm start` | 🚀 Start development server at `http://localhost:3000` |
| `npm build` | 🏗️ Build for production |
| `npm test` | 🧪 Run test suite |
| `npm run eject` | ⚙️ Eject from Create React App |

---

## 🎨 Design System

### 🌈 **Color Palette**

```css
/* Primary Colors */
--primary: #00ff88;     /* Vibrant Green */
--secondary: #60efff;   /* Electric Blue */

/* Theme Colors */
--text-light: #f5f5f5;  /* Light Gray */
--text-dark: #0a0a0a;   /* Dark Gray */
--bg-light: #ffffff;    /* Pure White */
--bg-dark: #0a0a0a;     /* Deep Black */
```

### 🎭 **Theme System**
- **Automatic Detection** of system preferences
- **localStorage Persistence** for user choice
- **Smooth Transitions** between themes
- **CSS Custom Properties** for consistency

### 📱 **Responsive Breakpoints**

| Device | Breakpoint | Layout |
|--------|------------|--------|
| Mobile | `≤ 480px` | Single column, stacked navigation |
| Tablet | `≤ 768px` | Adapted grid, collapsible elements |
| Desktop | `> 768px` | Full grid layout, side navigation |

---

## 🔧 Configuration

### 📊 **Analytics Setup**

```javascript
// Google Analytics 4
const config = {
  measurementId: 'G-SBFHT4D8YE',
  streamId: '10246799672',
  debug: process.env.NODE_ENV === 'development'
};

// Google Tag Manager
const tagManagerArgs = {
  gtmId: 'GTM-K5B486R5'
};
```

### 🌐 **API Endpoints**

```javascript
const API_BASE = 'https://personalwebsitebackend-gthafrgadzc2argc.eastus2-01.azurewebsites.net';

// Blog API
GET /blog/          // Fetch all blog posts
GET /blog/:id       // Fetch specific post

// Portfolio API  
GET /portfolio/     // Fetch portfolio items

// Contact API
POST /contact/      // Submit contact form
```

---

## 📁 Project Structure

```
src/
├── 📄 App.js                 # Main application component
├── 🎨 App.css                # Global styles and theme system
├── 🌍 ThemeContext.js         # Theme management context
├── 📊 analytics.js            # Google Analytics configuration
├── 🧩 components/
│   ├── 🧭 Navbar.jsx          # Navigation component
│   └── 🦶 Footer.jsx          # Footer component
├── 📑 pages/
│   ├── 🏠 Home.jsx            # Homepage with typewriter effect
│   ├── 📝 Blog.jsx            # Blog listing page
│   ├── 📄 FullPost.jsx        # Individual blog post
│   ├── 💼 Portfolio.jsx       # Portfolio showcase
│   ├── 🎯 ExperiencePage.jsx  # Professional experience
│   ├── 📞 Contact.jsx         # Contact form
│   ├── 📄 Resume.jsx          # PDF resume viewer
│   ├── 🙏 ThankYouPage.jsx    # Form success page
│   └── 🌓 ThemeToggle.jsx     # Theme switcher
├── 🖼️ images/                # Static assets
└── 🔧 icons/                 # Social media icons
```

---

## 🌟 Highlights

### 💫 **Visual Effects**
- **Glassmorphism** design with backdrop filters
- **Gradient Text** effects for headings
- **Smooth Hover** animations and transforms
- **Loading Spinners** with custom styling
- **Typewriter Animation** on homepage

### 🎯 **User Experience**
- **Instant Navigation** with React Router
- **Error Boundaries** with user-friendly messages
- **Loading States** for all async operations
- **Form Validation** with real-time feedback
- **Accessibility** considerations throughout

### 📈 **Performance**
- **Lazy Loading** for components
- **Image Optimization** with proper sizing
- **Minimal Bundle Size** with code splitting
- **Fast Loading** with optimized assets
- **SEO Optimization** with meta tags

---

## 🤝 Contributing

I welcome contributions to improve this portfolio! Here's how you can help:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **💾 Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **📤 Push** to the branch (`git push origin feature/AmazingFeature`)
5. **🔄 Open** a Pull Request

---

## 📞 Contact & Connect

<div align="center">

### Let's Build Something Amazing Together! 🚀

[![Email](https://img.shields.io/badge/Email-saisriharshaguddati1%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:saisriharshaguddati1@gmail.com)
[![Phone](https://img.shields.io/badge/Phone-%2B1%20352%20665%208709-00ff88?style=for-the-badge&logo=phone&logoColor=white)](tel:+13526658709)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sai%20Sri%20Harsha%20Guddati-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sai-sri-harsha-guddati-552373180/)
[![Twitter](https://img.shields.io/badge/Twitter-@SriHarsha__19-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/SriHarsha_19)
[![GitHub](https://img.shields.io/badge/GitHub-saisriharsha19-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/saisriharsha19)

</div>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

### 🌟 **Made with ❤️ by Sai Sri Harsha Guddati** 🌟

**Currently pursuing MS in Computer Science at University of Florida**  
**Former R&D Software Engineer at Tata Consultancy Services**

![Profile Views](https://komarev.com/ghpvc/?username=saisriharsha19&color=00ff88&style=for-the-badge)
![Stars](https://img.shields.io/github/stars/saisriharsha19/personal-website?color=00ff88&style=for-the-badge)
![Forks](https://img.shields.io/github/forks/saisriharsha19/personal-website?color=60efff&style=for-the-badge)

*⭐ If you like this project, please consider giving it a star!*

</div>
