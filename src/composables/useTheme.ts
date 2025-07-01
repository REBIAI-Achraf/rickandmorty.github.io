import { ref, computed, watch } from 'vue';

const STORAGE_KEY = 'rick-morty-theme';

const isDark = ref(false);

const loadTheme = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      isDark.value = JSON.parse(stored);
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  } catch (error) {
    console.error('Failed to load theme from localStorage:', error);
    isDark.value = false;
  }
};

const saveTheme = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isDark.value));
  } catch (error) {
    console.error('Failed to save theme to localStorage:', error);
  }
};

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

loadTheme();
applyTheme();

watch(isDark, () => {
  saveTheme();
  applyTheme();
});

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  return {
    isDark: computed(() => isDark.value),
    toggleTheme,
  };
}