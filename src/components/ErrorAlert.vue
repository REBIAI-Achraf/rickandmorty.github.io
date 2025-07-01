<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
      <div class="flex">
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
            {{ title }}
          </h3>
          <div class="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>{{ message }}</p>
          </div>
          <div v-if="showRetry" class="mt-4">
            <button
              @click="$emit('retry')"
              class="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-4 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 transition-colors duration-300 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string;
  message: string;
  showRetry?: boolean;
}>(), {
  title: 'Error',
  showRetry: false,
});

defineEmits<{
  retry: [];
}>();
</script>