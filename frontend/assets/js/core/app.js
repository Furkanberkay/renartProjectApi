console.log('app.js loaded');
// core/app.js
import { loadProducts } from './api.js';
import { setupResponsiveCarousel } from '../modules/carousel.js';
import { setupNavigation } from '../components/navbar.js';

export let products = [];
export let currentView = 'grid';
export let currentSlide = 0;
export let itemsPerSlide = 1;

// Uygulama başlatıcı
export function initApp() {
    document.addEventListener('DOMContentLoaded', function() {
        loadProducts();
        setupNavigation();
        window.addEventListener('resize', setupResponsiveCarousel);
    });
}

export function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
window.scrollToProducts = scrollToProducts;

initApp(); 