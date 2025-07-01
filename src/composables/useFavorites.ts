import { ref, computed, watch } from 'vue';
import type { Character } from '@/types/character';

const STORAGE_KEY = 'rick-morty-favorites';

const favorites = ref<Character[]>([]);

 const loadFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      favorites.value = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load favorites from the localStorage:', error);
  }
};

const saveFavorites = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
};

loadFavorites();

watch(favorites, saveFavorites, { deep: true });

export function useFavorites() {
  const addFavorite = (character: Character) => {
    if (!isFavorite(character.id)) {
      favorites.value.push(character);
    }
  };

  const removeFavorite = (characterId: number) => {
    const index = favorites.value.findIndex(char => char.id === characterId);
    if (index > -1) {
      favorites.value.splice(index, 1);
    }
  };

  const toggleFavorite = (character: Character) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  const isFavorite = (characterId: number): boolean => {
    return favorites.value.some(char => char.id === characterId);
  };

  const clearFavorites = () => {
    favorites.value = [];
  };

  return {
    favorites: computed(() => favorites.value),
    favoritesCount: computed(() => favorites.value.length),
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
}