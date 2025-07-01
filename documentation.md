# Rick & Morty Character Browser — Technical Documentation

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Core Functionalities](#core-functionalities)
4. [Data Flow](#data-flow)
5. [API Integration](#api-integration)
6. [State Management](#state-management)
7. [Theming](#theming)
8. [Favorites System](#favorites-system)
9. [Routing](#routing)
10. [Component Overview](#component-overview)
11. [TypeScript Types](#typescript-types)
12. [Build & Tooling](#build--tooling)

-------------

## Overview

This project is a Vue 3 application for browsing, searching, and favoriting characters from the Rick & Morty universe. It uses the [Rick & Morty API](https://rickandmortyapi.com/), TypeScript, Tailwind CSS, and Vite.

---

## Project Structure

```
project/
├── src/
│   ├── components/         # Reusable UI components
│   ├── composables/        # Custom hooks for logic (API, theme, favorites)
│   ├── router/             # Vue Router setup
│   ├── types/              # TypeScript interfaces
│   ├── views/              # Page-level components
│   ├── App.vue             # Root component
│   ├── main.ts             # App entry point
│   └── style.css           # Tailwind and custom styles
├── public/                 # Static assets
├── index.html              # HTML entry point
├── package.json            # Project metadata and scripts
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
└── ...                     # Other config files
```

---

## Core Functionalities

- **Character Browsing:** Paginated list of all characters.
- **Search:** Real-time filtering by character name.
- **Character Details:** Detailed view with episodes, status, and more.
- **Favorites:** Add/remove characters to a persistent favorites list.
- **Dark/Light Theme:** Toggleable, persisted theme.
- **Responsive Design:** Works on all screen sizes.
- **Error Handling:** User-friendly error messages and retry options.
- **Loading States:** Spinners and feedback during data fetches.

---

## Data Flow

### 1. Fetching Characters

- `Home.vue` calls `useApi().getCharacters(page, searchTerm)` on mount and when search/page changes.
- Results are stored in local `characters`, `apiInfo`, `totalPages`, and `totalCount` refs.

### 2. Search

- `SearchBar.vue` emits `search` event.
- `Home.vue` listens and updates `searchQuery`, triggering a new fetch.

### 3. Pagination

- `Pagination.vue` emits `prev`, `next`, or `goToPage`.
- `Home.vue` updates `currentPage` and fetches new data.

### 4. Character Details

- Route `/character/:id` loads `CharacterDetail.vue`.
- Calls `useApi().getCharacter(id)` and `getEpisodes(episodeUrls)`.

### 5. Favorites

- `useFavorites` composable manages favorites in localStorage.
- Components use `toggleFavorite`, `isFavorite`, and `favoritesCount`.

### 6. Theming

- `useTheme` composable manages dark/light mode, persisted in localStorage.

---

## API Integration

### Rick & Morty API

- **Base URL:** `https://rickandmortyapi.com/api`
- **Endpoints Used:**
  - `/character/?page=1&name=rick` — List characters (with pagination and search)
  - `/character/:id` — Single character details
  - `/episode/:ids` — Fetch episodes by IDs

### API Calls

- All API calls are wrapped in the `useApi` composable.
- Loading and error states are managed via refs and exposed as computed properties.

---

## State Management

- **Vue Refs:** Used for local state in components.
- **Composables:** `useApi`, `useFavorites`, and `useTheme` encapsulate logic and state.
- **Persistence:** Favorites and theme are stored in `localStorage`.

---

## Theming

- **Dark/Light Mode:** Controlled by `useTheme`.
- **Persistence:** Theme preference is saved in `localStorage`.
- **Tailwind CSS:** Used for all styling, with dark mode support.

---

## Favorites System

- **Storage:** Array of character objects in `localStorage` under key `rick-morty-favorites`.
- **API:** `useFavorites` provides methods to add, remove, toggle, and clear favorites, as well as check if a character is a favorite.

---

## Routing

- **Vue Router:** SPA navigation.
- **Routes:**
  - `/` — Home (character list)
  - `/character/:id` — Character detail
  - `/favorites` — Favorites list

---

## Component Overview

- **App.vue:** Root component, renders header and router view.
- **AppHeader.vue:** Navigation, theme toggle, and favorites count.
- **Home.vue:** Main character list, search, pagination.
- **CharacterCard.vue:** Displays a character summary and favorite button.
- **CharacterDetail.vue:** Detailed character info and episodes.
- **Favorites.vue:** List of favorited characters, clear all option.
- **SearchBar.vue:** Search input with clear button.
- **Pagination.vue:** Pagination controls.
- **LoadingSpinner.vue:** Animated loading indicator.
- **ErrorAlert.vue:** Error message with retry option.

---

## TypeScript Types

Located in `src/types/character.ts`:

```typescript
export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: { name: string; url: string; };
  location: { name: string; url: string; };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: { count: number; pages: number; next: string | null; prev: string | null; };
  results: Character[];
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
```

---

## Build & Tooling

- **Vite:** Fast dev/build tool.
- **Tailwind CSS:** Utility-first CSS framework.
- **TypeScript:** Strict typing.
- **Vue 3:** Composition API.
- **localStorage:** For theme and favorites persistence.

---

## Additional Notes

- **Error Handling:** All API calls are wrapped in try/catch, with error messages shown in the UI.
- **Loading States:** Managed via `loading` ref in `useApi`.
- **Responsive Design:** Tailwind breakpoints and utility classes.
- **Animations:** Tailwind and custom CSS for transitions and effects.

---

## References

- [Rick & Morty API Docs](https://rickandmortyapi.com/documentation)
- [Vue 3 Docs](https://vuejs.org/guide/introduction.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs/installation)
- [Vite Docs](https://vitejs.dev/guide/)

