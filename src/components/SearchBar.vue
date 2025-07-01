<template>
  <div class="relative max-w-md mx-auto">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
    </div>
    <input
      v-model="searchQuery"
      @input="onInput"
      type="text"
      placeholder="Search characters..."
      class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rick-green focus:border-rick-green transition-all duration-300"
    />
    <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
      <button
        @click="clearSearch"
        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
      >
        <XMarkIcon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits<{
  search: [query: string];
}>();

const searchQuery = ref('');

const onInput = () => {
  emit('search', searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = '';
  emit('search', '');
};

watch(() => searchQuery.value, (newValue) => {
  if (!newValue) {
    emit('search', '');
  }
});
</script>