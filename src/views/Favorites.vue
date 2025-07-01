<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Your <span class="text-rick-green">Favorite</span> Characters
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-4">
          {{ favoritesCount }} character{{ favoritesCount !== 1 ? 's' : '' }} saved
        </p>
        
        <button
          v-if="favoritesCount > 0"
          @click="showClearConfirm = true"
          class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300 font-medium"
        >
          Clear all favorites
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="favoritesCount === 0" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <HeartIcon class="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No favorites yet</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Start exploring characters and add them to your favorites by clicking the heart icon.
          </p>
          <router-link
            to="/"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-rick-green to-portal-blue hover:from-portal-blue hover:to-rick-green transition-all duration-300"
          >
            Explore Characters
          </router-link>
        </div>
      </div>

      <!-- Favorites Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CharacterCard 
          v-for="character in favorites" 
          :key="character.id" 
          :character="character"
        />
      </div>

      <!-- Clear Confirmation Modal -->
      <div v-if="showClearConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Clear all favorites?</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            This action cannot be undone. All {{ favoritesCount }} favorite characters will be removed.
          </p>
          <div class="flex space-x-4">
            <button
              @click="confirmClearFavorites"
              class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 font-medium"
            >
              Clear All
            </button>
            <button
              @click="showClearConfirm = false"
              class="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFavorites } from '@/composables/useFavorites';
import CharacterCard from '@/components/CharacterCard.vue';
import { HeartIcon } from '@heroicons/vue/24/solid';

const { favorites, favoritesCount, clearFavorites } = useFavorites();
const showClearConfirm = ref(false);

const confirmClearFavorites = () => {
  clearFavorites();
  showClearConfirm.value = false;
};
</script>