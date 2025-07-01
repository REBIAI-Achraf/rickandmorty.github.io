<template>
  <header class="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-gradient-to-r from-rick-green to-portal-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span class="text-white font-bold text-lg">R&M</span>
          </div>
          <h1 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-rick-green transition-colors duration-300">
            Rick & Morty
          </h1>
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="text-gray-700 dark:text-gray-300 hover:text-rick-green dark:hover:text-rick-green transition-colors duration-300 font-medium"
            active-class="text-rick-green"
          >
            Characters
          </router-link>
          <router-link 
            to="/favorites" 
            class="text-gray-700 dark:text-gray-300 hover:text-rick-green dark:hover:text-rick-green transition-colors duration-300 font-medium flex items-center space-x-2"
            active-class="text-rick-green"
          >
            <span>Favorites</span>
            <span 
              v-if="favoritesCount > 0"
              class="bg-rick-green text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center animate-pulse-slow"
            >
              {{ favoritesCount }}
            </span>
          </router-link>
        </nav>

        <!-- Theme Toggle & Mobile Menu -->
        <div class="flex items-center space-x-4">
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <SunIcon v-if="isDark" class="w-5 h-5 text-morty-yellow" />
            <MoonIcon v-else class="w-5 h-5 text-gray-700" />
          </button>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            <Bars3Icon class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t dark:border-gray-700">
        <div class="flex flex-col space-y-4">
          <router-link 
            to="/" 
            @click="mobileMenuOpen = false"
            class="text-gray-700 dark:text-gray-300 hover:text-rick-green dark:hover:text-rick-green transition-colors duration-300 font-medium"
            active-class="text-rick-green"
          >
            Characters
          </router-link>
          <router-link 
            to="/favorites" 
            @click="mobileMenuOpen = false"
            class="text-gray-700 dark:text-gray-300 hover:text-rick-green dark:hover:text-rick-green transition-colors duration-300 font-medium flex items-center space-x-2"
            active-class="text-rick-green"
          >
            <span>Favorites</span>
            <span 
              v-if="favoritesCount > 0"
              class="bg-rick-green text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
            >
              {{ favoritesCount }}
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFavorites } from '@/composables/useFavorites';
import { useTheme } from '@/composables/useTheme';
import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/vue/24/solid';

const { favoritesCount } = useFavorites();
const { isDark, toggleTheme } = useTheme();
const mobileMenuOpen = ref(false);
</script>