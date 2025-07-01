<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Explore the <span class="text-rick-green">Rick & Morty</span> Universe
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Discover characters, add them to your favorites, and dive into the multiverse!
        </p>
        
        <!-- Search Bar -->
        <SearchBar @search="handleSearch" />
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-if="isLoading" message="Loading characters..." />

      <!-- Error State -->
      <ErrorAlert 
        v-else-if="error"
        :message="error"
        :show-retry="true"
        @retry="loadCharacters"
      />

      <!-- Characters Grid -->
      <div v-else-if="characters.length > 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <CharacterCard 
            v-for="character in characters" 
            :key="character.id" 
            :character="character"
          />
        </div>

        <!-- Pagination -->
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-count="totalCount"
          :has-prev="hasPrev"
          :has-next="hasNext"
          @prev="goToPrevPage"
          @next="goToNextPage"
          @go-to-page="goToPage"
        />
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-12">
        <div class="max-w-md mx-auto">
          <MagnifyingGlassIcon class="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No characters found</h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ searchQuery ? `No results for "${searchQuery}". Try a different search term.` : 'No characters available.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useApi } from '@/composables/useApi';
import type { Character, ApiResponse } from '@/types/character';
import CharacterCard from '@/components/CharacterCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import Pagination from '@/components/Pagination.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const { getCharacters, loading, error } = useApi();

const characters = ref<Character[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);
const searchQuery = ref('');
const apiInfo = ref<ApiResponse['info'] | null>(null);

const isLoading = computed(() => loading.value);
const hasPrev = computed(() => apiInfo.value?.prev !== null);
const hasNext = computed(() => apiInfo.value?.next !== null);

const loadCharacters = async () => {
  try {
    const response = await getCharacters(currentPage.value, searchQuery.value);
    characters.value = response.results;
    apiInfo.value = response.info;
    totalPages.value = response.info.pages;
    totalCount.value = response.info.count;
  } catch (err) {
    console.error('Failed to load characters:', err);
  }
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1;
  loadCharacters();
};

const goToPrevPage = () => {
  if (hasPrev.value) {
    currentPage.value--;
    loadCharacters();
  }
};

const goToNextPage = () => {
  if (hasNext.value) {
    currentPage.value++;
    loadCharacters();
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
  loadCharacters();
};

onMounted(() => {
  loadCharacters();
});

// Reset page when search changes
watch(searchQuery, () => {
  currentPage.value = 1;
});
</script>