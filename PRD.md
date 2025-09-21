# Detailed AI Coder Prompt: Arabic Songs Lyrics App

## Project Overview
Create a mobile-optimized React web application for displaying Arabic song lyrics. The app will be accessed via QR code by approximately 100 users and deployed on Netlify's free tier.

## Technical Requirements

### Core Technologies
- **Framework**: React (using Create React App)
- **Styling**: CSS Modules or Styled Components
- **Deployment**: Netlify
- **Target Users**: 100 concurrent users
- **Primary Access**: Mobile devices via QR code

### Arabic Language Support
- Implement RTL (Right-to-Left) text support
- Use Arabic-friendly web fonts (Google Fonts: Cairo, Noto Sans Arabic, or Amiri)
- Ensure proper UTF-8 encoding for Arabic characters
- Test Arabic text rendering across different mobile browsers

## Step-by-Step Development Plan

### Phase 1: Project Setup
1. **Initialize React Project**
   ```bash
   npx create-react-app arabic-songs-app
   cd arabic-songs-app
   ```

2. **Install Dependencies**
   ```bash
   npm install react-router-dom
   npm install styled-components (optional)
   ```

3. **Project Structure Setup**
   ```
   src/
   ├── components/
   │   ├── SongList.js
   │   ├── SongLyrics.js
   │   ├── Header.js
   │   └── SearchBar.js
   ├── data/
   │   └── songs.js
   ├── styles/
   │   ├── global.css
   │   └── components/
   ├── App.js
   └── index.js
   ```

### Phase 2: Data Structure Design
4. **Create Songs Data Structure** (`src/data/songs.js`)
   ```javascript
   export const songs = [
     {
       id: 1,
       title: "Song Title in Arabic",
       artist: "Artist Name",
       lyrics: "Full lyrics content...",
       category: "genre/category" // optional
     },
     // ... 27 songs total
   ];
   ```

### Phase 3: Core Components Development

5. **Main App Component** (`src/App.js`)
   - Set up React Router for navigation
   - Implement RTL layout
   - Add global Arabic font styling
   - Create responsive mobile-first design

6. **Header Component** (`src/components/Header.js`)
   - App title in Arabic
   - Mobile-optimized navigation
   - RTL-compatible layout

7. **Song List Component** (`src/components/SongList.js`)
   - Display all 27 songs as clickable buttons/cards
   - Mobile-friendly touch targets (minimum 44px)
   - Grid or list layout optimized for Arabic text
   - Each button shows song title and artist

8. **Search Component** (`src/components/SearchBar.js`)
   - Arabic text search functionality
   - Filter songs by title or artist
   - Mobile keyboard optimization
   - RTL text input support

9. **Song Lyrics Component** (`src/components/SongLyrics.js`)
   - Display full lyrics in readable format
   - Back button to return to song list
   - Scroll optimization for long lyrics
   - Share functionality (optional)

### Phase 4: Styling & Mobile Optimization

10. **Global Styles** (`src/styles/global.css`)
    ```css
    /* RTL support */
    html[dir="rtl"] {
      direction: rtl;
      text-align: right;
    }
    
    /* Arabic font loading */
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');
    
    /* Mobile-first responsive design */
    /* Touch-friendly button sizes */
    /* Dark/light theme considerations */
    ```

11. **Component-Specific Styles**
    - Mobile-optimized button sizes (minimum 44px height)
    - Arabic text line-height optimization
    - Responsive grid for song selection
    - Smooth animations for navigation

### Phase 5: Advanced Features

12. **Performance Optimization**
    - Implement lazy loading for lyrics
    - Add loading states
    - Optimize for slow mobile connections
    - Minimize bundle size

13. **User Experience Enhancements**
    - Add song categories/filtering
    - Implement favorites functionality (localStorage)
    - Add recently viewed songs
    - Keyboard navigation support

14. **Accessibility Features**
    - Screen reader support for Arabic content
    - High contrast mode
    - Focus management for navigation
    - ARIA labels in Arabic

### Phase 6: Testing & Deployment

15. **Cross-Device Testing**
    - Test on various mobile browsers (Safari, Chrome, Firefox)
    - Verify Arabic text rendering
    - Test QR code scanning workflow
    - Performance testing with 100 concurrent users

16. **Build & Deployment Preparation**
    ```bash
    npm run build
    ```
    - Optimize build size
    - Test production build locally
    - Prepare for Netlify deployment

17. **Netlify Deployment**
    - Connect GitHub repository to Netlify
    - Configure build settings
    - Set up custom domain (optional)
    - Test deployed app via QR code

## Technical Specifications

### Mobile Optimization Requirements
- **Viewport**: Mobile-first responsive design
- **Touch Targets**: Minimum 44px for buttons
- **Font Size**: Minimum 16px to prevent zoom on iOS
- **Performance**: First Contentful Paint < 2 seconds
- **Bundle Size**: Keep under 1MB total

### Arabic Text Requirements
- **Font Loading**: Implement font-display: swap
- **Text Direction**: Proper RTL implementation
- **Line Height**: Optimized for Arabic text (1.6-1.8)
- **Character Support**: Full Arabic Unicode range

### Data Management
- Store all songs in a single JavaScript file initially
- Consider moving to JSON file if data grows
- Implement efficient search algorithms
- Cache frequently accessed lyrics

## Error Handling & Edge Cases
- Handle missing lyrics gracefully
- Implement offline detection
- Add error boundaries for React components
- Graceful degradation for older browsers

## Future Considerations
- PWA capabilities for offline access
- Audio playback integration
- User-generated playlists
- Admin panel for song management

## Deliverables Checklist
- [ ] Fully functional React application
- [ ] 27 Arabic songs with complete lyrics
- [ ] Mobile-optimized interface
- [ ] Search and filtering functionality
- [ ] Production-ready build
- [ ] Deployment documentation
- [ ] QR code testing confirmation

## Success Criteria
- App loads in under 3 seconds on 3G connection
- All Arabic text displays correctly on mobile devices
- Users can easily navigate between songs
- App handles 100 concurrent users without issues
- QR code scanning leads directly to functional app