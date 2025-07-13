# NewsPulse - Your Daily News Companion 📰

A modern, feature-rich news application built with React that provides real-time news from around the world with an excellent user experience.

## ✨ Features

### 🌙 Dark Mode
- Toggle between light and dark themes
- Persistent theme preference using localStorage
- Smooth transitions and animations
- Optimized color schemes for both modes

### 🔍 Advanced Search
- Real-time search functionality
- Search across all news categories
- Debounced search to optimize API calls
- Search results with infinite scroll
- Error handling for failed searches

### 📚 Bookmark System
- Save articles for later reading
- Persistent bookmarks using localStorage
- Search and filter bookmarks
- Sort bookmarks by date, title, or source
- Bulk clear all bookmarks

### 🌍 Multi-Country Support
- News from 8 different countries
- Easy country switching from navbar
- Country-specific news feeds
- Maintains user's country preference

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Progressive Web App features

### ⚡ Performance Features
- Infinite scroll pagination
- Lazy loading of images
- Optimized API calls
- Smooth animations and transitions
- Loading skeletons for better UX

### 🔗 Social Sharing
- Native sharing API support
- Fallback to clipboard copying
- Share articles on social media
- Custom share messages

### 📊 Reading Analytics
- Estimated reading time for articles
- Article metadata display
- Source attribution
- Publication date formatting

### 🎨 Modern UI/UX
- Clean, modern design
- Hover effects and animations
- Consistent color scheme
- Accessibility features
- Keyboard navigation support

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **Context API** - State management for theme and bookmarks
- **Bootstrap 5** - Responsive CSS framework
- **Font Awesome** - Icon library
- **NewsAPI** - News data source
- **LocalStorage** - Data persistence
- **CSS3** - Custom styling with CSS variables

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd newsapp
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## 🌐 Deployment to Netlify

### Method 1: Deploy from Git (Recommended)

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Initial commit with NewsPulse features"
git push origin main
```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Choose your GitHub repository
   - Set build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

### Method 2: Manual Deploy

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `build` folder to deploy
   - Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Environment Variables (Optional)
If you want to use your own NewsAPI key, add it to Netlify:
1. Go to Site Settings > Environment Variables
2. Add `REACT_APP_NEWS_API_KEY` with your API key

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation with search and theme toggle
│   ├── News.js            # Main news feed component
│   ├── NewsItem.js        # Individual news article card
│   ├── SearchResults.js   # Search functionality
│   ├── Bookmarks.js       # Bookmark management
│   └── Spinner.js         # Loading component
├── context/
│   ├── ThemeContext.js    # Dark/light mode state management
│   └── BookmarkContext.js # Bookmark state management
├── App.js                 # Main app component with routing
├── logo.svg               # Custom NewsPulse logo
└── index.css              # Global styles and CSS variables
```

## 🎯 Key Features for Resume

### Technical Skills Demonstrated
- **React Development**: Modern React patterns, hooks, and best practices
- **State Management**: Context API for global state management
- **API Integration**: RESTful API consumption with error handling
- **Responsive Design**: Mobile-first responsive web design
- **Performance Optimization**: Lazy loading, infinite scroll, debouncing
- **User Experience**: Dark mode, animations, accessibility features
- **Data Persistence**: LocalStorage for user preferences
- **Modern JavaScript**: ES6+ features, async/await, functional programming
- **Deployment**: Netlify deployment and CI/CD

### Soft Skills Demonstrated
- **Problem Solving**: Complex feature implementation
- **User-Centric Design**: Focus on user experience and accessibility
- **Code Organization**: Clean, maintainable code structure
- **Documentation**: Comprehensive README and code comments
- **Testing**: Error handling and edge case management

## 🔧 Customization

### Adding New Countries
Edit the `countries` array in `Navbar.js`:
```javascript
const countries = [
    { code: 'in', name: 'India' },
    { code: 'us', name: 'USA' },
    // Add more countries here
];
```

### Modifying Theme Colors
Update CSS variables in `index.css`:
```css
:root {
    --primary-color: #007bff;
    --background-color: #ffffff;
    /* Add more variables */
}
```

### API Configuration
Replace the API key in components that fetch news:
```javascript
const API_KEY = 'your-api-key-here';
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org/) for providing news data
- [Bootstrap](https://getbootstrap.com/) for the CSS framework
- [Font Awesome](https://fontawesome.com/) for icons
- [React](https://reactjs.org/) team for the amazing framework
- [Netlify](https://netlify.com/) for hosting and deployment

---

**Built with ❤️ using React**
