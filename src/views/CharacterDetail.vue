<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <button
        @click="$router.go(-1)"
        class="mb-6 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
      >
        <ArrowLeftIcon class="w-5 h-5 mr-2" />
        Back
      </button>

      <!-- Loading State -->
      <LoadingSpinner v-if="isLoading" message="Loading character details..." />

      <!-- Error State -->
      <ErrorAlert 
        v-else-if="error"
        :message="error"
        :show-retry="true"
        @retry="loadCharacter"
      />

      <!-- Character Details -->
      <div v-else-if="character" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div class="md:flex">
          <!-- Character Image -->
          <div class="md:flex-shrink-0 relative">
            <img 
              :src="character.image" 
              :alt="character.name"
              class="h-64 w-full object-cover md:h-full md:w-64"
            />
            
            <!-- Favorite Button -->
            <button
              @click="toggleFavorite(character)"
              class="absolute top-4 right-4 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 group"
              :class="{ 'text-red-500': isFavorite(character.id), 'text-gray-400': !isFavorite(character.id) }"
            >
              <svg class="w-6 h-6 group-hover:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
            </button>

            <!-- Status Badge -->
            <div class="absolute top-4 left-4">
              <span 
                class="px-3 py-1 text-sm font-semibold rounded-full"
                :class="statusClasses[character.status]"
              >
                {{ character.status }}
              </span>
            </div>
          </div>

          <!-- Character Info -->
          <div class="p-8 flex-1">
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ character.name }}</h1>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="space-y-4">
                <div>
                  <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Species</h3>
                  <p class="mt-1 text-lg text-gray-900 dark:text-white">{{ character.species }}</p>
                </div>
                
                <div>
                  <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Gender</h3>
                  <p class="mt-1 text-lg text-gray-900 dark:text-white">{{ character.gender }}</p>
                </div>
                
                <div v-if="character.type">
                  <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Type</h3>
                  <p class="mt-1 text-lg text-gray-900 dark:text-white">{{ character.type }}</p>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Origin</h3>
                  <p class="mt-1 text-lg text-gray-900 dark:text-white">{{ character.origin.name }}</p>
                </div>
                
                <div>
                  <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</h3>
                  <p class="mt-1 text-lg text-gray-900 dark:text-white">{{ character.location.name }}</p>
                </div>
                
                <div>
                  <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Episodes</h3>
                  <p class="mt-1 text-lg text-gray-900 dark:text-white">{{ character.episode.length }} episodes</p>
                </div>
              </div>
            </div>

            <!-- Episodes -->
            <div v-if="episodes.length > 0">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Featured Episodes</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="episode in episodes.slice(0, 6)" 
                  :key="episode.id"
                  class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-medium text-gray-900 dark:text-white">{{ episode.name }}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{ episode.episode }}</p>
                    </div>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ episode.air_date }}</span>
                  </div>
                </div>
              </div>
              
              <div v-if="character.episode.length > 6" class="mt-4 text-center">
                <p class="text-gray-600 dark:text-gray-400">
                  And {{ character.episode.length - 6 }} more episodes...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '@/composables/useApi';
import { useFavorites } from '@/composables/useFavorites';
import type { Character, Episode } from '@/types/character';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';

const route = useRoute();
const { getCharacter, getEpisodes, loading, error } = useApi();
const { toggleFavorite, isFavorite } = useFavorites();

const character = ref<Character | null>(null);
const episodes = ref<Episode[]>([]);

const isLoading = computed(() => loading.value);

const statusClasses = {
  Alive: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Dead: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  unknown: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

const loadCharacter = async () => {
  try {
    const characterId = Number(route.params.id);
    const characterData = await getCharacter(characterId);
    character.value = characterData;
    
    // Load episodes
    if (characterData.episode.length > 0) {
      const episodeData = await getEpisodes(characterData.episode);
      episodes.value = Array.isArray(episodeData) ? episodeData : [episodeData];
    }
  } catch (err) {
    console.error('Failed to load character:', err);
  }
};

onMounted(() => {
  loadCharacter();
});
</script>