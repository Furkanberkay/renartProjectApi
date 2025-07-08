// core/api.js
import { showElement, hideElement } from './utils.js';
import { renderProducts } from '../modules/productView.js';
import { products } from './app.js';

export async function loadProducts() {
    console.log('loadProducts başladı');
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const productsContent = document.getElementById('products-content');
    const API_BASE_URL = '../api';
    try {
        showElement(loadingEl);
        hideElement(errorEl);
        hideElement(productsContent);
        const response = await fetch(`${API_BASE_URL}/products.php`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format received from API');
        }
        products.length = 0;
        data.forEach((product, index) => {
            products.push({ ...product, id: index + 1, selectedColor: 'yellow' });
        });
        hideElement(loadingEl);
        showElement(productsContent);
        console.log('API çağrısı sonrası products:', products);
        renderProducts();
        console.log('renderProducts çağrıldı');
    } catch (error) {
        console.error('Error loading products:', error);
        hideElement(loadingEl);
        showElement(errorEl);
        document.getElementById('error-message').textContent = error.message;
    }
} 