<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
    <div class="relative">
      <img 
        :src="character.image" 
        :alt="character.name"
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
      />
      
      <!-- Status badge -->
      <div class="absolute top-3 left-3">
        <span 
          class="px-2 py-1 text-xs font-semibold rounded-full"
          :class="statusClasses[character.status]"
        >
          {{ character.status }}
        </span>
      </div>

      <!-- Favorite button -->
      <button
        @click.stop="toggleFavorite(character)"
        class="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 group/heart"
        :class="{ 'text-red-500': isFavorite(character.id), 'text-gray-400': !isFavorite(character.id) }"
      >
        <heart-icon class="w-6 h-6 group-hover/heart:scale-125 transition-transform duration-300" />
      </button>
    </div>

    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-rick-green transition-colors duration-300">
        {{ character.name }}
      </h3>
      
      <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div class="flex items-center space-x-2">
          <span class="font-medium">Species:</span>
          <span>{{ character.species }}</span>
        </div>
        
        <div class="flex items-center space-x-2">
          <span class="font-medium">Gender:</span>
          <span>{{ character.gender }}</span>
        </div>
        
        <div class="flex items-center space-x-2">
          <span class="font-medium">Origin:</span>
          <span class="truncate">{{ character.origin.name }}</span>
        </div>
      </div>

      <router-link
        :to="`/character/${character.id}`"
        class="mt-4 block w-full bg-gradient-to-r from-rick-green to-portal-blue text-white text-center py-2 rounded-lg hover:from-portal-blue hover:to-rick-green transition-all duration-300 font-medium"
      >
        View Details
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/types/character';
import { useFavorites } from '@/composables/useFavorites';
import { HeartIcon } from '@heroicons/vue/24/solid';


defineProps<{
  character: Character;
}>();

const { toggleFavorite, isFavorite } = useFavorites();

const statusClasses = {
  Alive: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Dead: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  unknown: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};
</script>