import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import CharacterDetail from '@/views/CharacterDetail.vue';
import Favorites from '@/views/Favorites.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/character/:id',
    name: 'CharacterDetail',
    component: CharacterDetail,
    props: true,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
  },
];

const router = createRouter({
  history: createWebHistory('/rickandmorty.github.io/'), 
  routes,
});

export default router;