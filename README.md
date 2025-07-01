# Rick & Morty Character Browser

A modern Vue.js application for exploring characters from the Rick & Morty universe. Built with Vue 3, TypeScript, Tailwind CSS, and the Rick & Morty API.

##  Features

- **Character Exploration**: Browse through all Rick & Morty characters with pagination
- **Character Details**: View detailed information about each character including episodes
- **Favorites System**: Add/remove characters to favorites with local persistence
- **Search Functionality**: Search characters by name with real-time filtering
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, polished interface with smooth animations
- **TypeScript**: Full type safety throughout the application
- **Heroicons**: Beautiful SVG icons for UI elements (search, heart, navigation, etc.)

## Tech Stack

- **Frontend**: Vue 3 with Composition API
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Icons**: [Heroicons](https://heroicons.com/) via [@heroicons/vue](https://www.npmjs.com/package/@heroicons/vue)
- **Routing**: Vue Router 4
- **State Management**: Custom composables
- **Data Persistence**: localStorage
- **API**: Rick & Morty API
- **Build Tool**: Vite

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rick-morty-character-browser
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

##  Build for Production

```bash
npm run build
```
## Deployment

The application is deployed using GitHub Pages. 
Follow these steps to deploy:

 Configure vite.config.js: Update the base option with the repository name:

     export default defineConfig({
     base: '/<repository-name>/', // Replace <repository-name> with your repo name
     plugins: [vue()],
    });

Add Deployment Scripts: The necessary scripts are already in package.json:

     "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
    }

Deploy: Run the following commands:

    npm install
    npm run deploy

    Set Up GitHub Pages:

        Go to the repository settings on GitHub.

        Under Pages, ensure the branch is set to gh-pages.

The application will be accessible at: https://<username>.github.io/<repository-name>/

##  Usage

1. **Browse Characters**: Navigate through the character list using pagination
2. **Search**: Use the search bar to find specific characters
3. **View Details**: Click on any character card to view detailed information
4. **Add to Favorites**: Click the heart icon to add/remove characters from favorites
5. **View Favorites**: Navigate to the favorites page to see all saved characters
6. **Toggle Theme**: Use the theme toggle in the header to switch between light/dark modes

##  Design Features

- **Rick & Morty Theme**: Custom color palette inspired by the show
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Loading States**: Elegant loading spinners and skeletons
- **Error Handling**: User-friendly error messages with retry options

## Architecture

The application follows modern Vue.js best practices:

- **Composables**: Reusable logic for API calls, favorites, and theme management
- **Component-Based**: Modular, reusable components
- **Type Safety**: Comprehensive TypeScript interfaces and types
- **Separation of Concerns**: Clear separation between UI, logic, and data

## API

This application uses the [Rick & Morty API](https://rickandmortyapi.com/) to fetch character data.

## Bonus Features Implemented

-  Client-side search functionality
-  TypeScript strict mode
-  Dark mode 
-  Responsive design with mobile-first approach
-  Advanced animations and interactions
-  Error handling and retry mechanisms
-  Loading states and user feedback




## Acknowledgments

- [Rick & Morty API](https://rickandmortyapi.com/) for providing the data
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Vue.js](https://vuejs.org/) for the amazing framework
