# Architecture Portfolio - React + Vite

This is a modern, responsive architecture portfolio website built with React and Vite.

## 🚀 Features

- **React 18** with modern hooks and functional components
- **React Router** for seamless navigation
- **Vite** for lightning-fast development and optimized builds
- **PDF.js** integration for portfolio booklet viewer
- Responsive design with mobile navigation
- Image lightbox gallery
- Project filtering and categorization
- Smooth scrolling and animations

## 📁 Project Structure

```
website/
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── Lightbox.jsx
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx
│   │   └── ProjectDetailPage.jsx
│   ├── data/                # JSON data
│   │   └── projects.json
│   ├── styles/              # CSS files
│   │   ├── index.css
│   │   └── styles.css
│   ├── App.jsx              # Main app component with routing
│   └── main.jsx             # App entry point
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

## 🛠️ Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Run Development Server

```bash
npm run dev
```

The site will open automatically at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Migration Summary

### What Was Changed

1. **Converted to React Components**: All HTML sections are now modular React components
2. **React Router**: Implemented client-side routing for smooth navigation
3. **State Management**: Used React hooks (useState, useEffect, useRef) for all interactive features
4. **Modern Build Tool**: Vite provides instant HMR and optimized production builds
5. **Modular Architecture**: Clear component hierarchy with separation of concerns

### Components Created

- **Navbar**: Mobile-responsive navigation with active section highlighting
- **Hero**: Auto-playing image slider with controls
- **About**: Skills and biography section
- **Projects**: Filterable project grid with categories
- **Portfolio**: PDF viewer with page navigation
- **Contact**: Contact information display
- **Footer**: Site footer with navigation links
- **Lightbox**: Modal image viewer for project galleries
- **HomePage**: Combines all main sections
- **ProjectDetailPage**: Individual project display with gallery

### Features Preserved

✅ Mobile hamburger menu
✅ Hero slider with autoplay
✅ Smooth scrolling navigation
✅ Active section highlighting
✅ Project filtering by category
✅ PDF portfolio viewer
✅ Project detail pages
✅ Image lightbox gallery
✅ Previous/Next project navigation
✅ All original styling

## 🎨 Customization

### Adding Projects

Edit `src/data/projects.json` to add or modify projects.

### Styling

Main styles are in `src/styles/styles.css`.

### PDF Portfolio

Update the PDF URL in `src/components/Portfolio.jsx` to point to your portfolio PDF file.

## 📦 Dependencies

- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.21.0
- pdfjs-dist: ^3.11.174
- vite: ^5.0.8

## 🌐 Deployment

Build and deploy the `dist/` folder to any static hosting:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

---

**Migration completed! 🎉**
