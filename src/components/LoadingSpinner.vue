<template>
  <div class="flex items-center justify-center py-12">
    <div class="relative">
      <div class="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-rick-green rounded-full animate-spin"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-5 h-5 bg-gradient-to-r from-rick-green to-portal-blue rounded-full animate-pulse-slow"></div>
      </div>
    </div>
    <div class="ml-4 text-gray-600 dark:text-gray-400 font-medium">
      {{ message || 'Loading...' }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message?: string }>();
</script>
