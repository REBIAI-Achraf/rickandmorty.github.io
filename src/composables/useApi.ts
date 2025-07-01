import { ref , computed } from 'vue';
import type { Character, ApiResponse, Episode } from '../types/character'; 

const BASE_URL = 'https://rickandmortyapi.com/api';

export function useApi() {
  const loading = ref(false); 
  const error = ref<string | null>(null); 

  const getCharacters = async (page: number, searchTerm = ''): Promise<ApiResponse> => {
    loading.value = true;
    error.value = null;
    try {
      let url = `${BASE_URL}/character/?page=${page}`;
      if (searchTerm.trim()) {
        url += `&name=${encodeURIComponent(searchTerm.trim())}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ,status: ${response.status}`);
      const data: ApiResponse = await response.json();
      return data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getCharacter = async (id: number): Promise<Character> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${BASE_URL}/character/${id}`);
      if (!response.ok) throw new Error(`HTTP error, status: ${response.status}`);
      const data: Character = await response.json();
      return data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getEpisodes = async (urls: string[]): Promise<Episode[]> => {
    if (urls.length === 0) return [];
    loading.value = true;
    error.value = null;
    try {
      const ids = urls.map(url => url.split('/').pop()).join(',');
      const response = await fetch(`${BASE_URL}/episode/${ids}`);
      if (!response.ok) throw new Error(`HTTP error, status: ${response.status}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      return [];
    } finally {
      loading.value = false;
    }
  };

  return {
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    getCharacters,
    getCharacter,
    getEpisodes,
  };
}