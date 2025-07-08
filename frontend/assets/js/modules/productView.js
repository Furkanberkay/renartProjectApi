// modules/productView.js
import { products } from '../core/app.js';
import { createProductCard } from '../components/productCard.js';

function getSortAndFilterValues() {
    const sort = document.getElementById('sort-select')?.value || 'price-asc';
    const minPrice = parseFloat(document.getElementById('min-price')?.value) || -Infinity;
    const maxPrice = parseFloat(document.getElementById('max-price')?.value) || Infinity;
    const minPop = parseFloat(document.getElementById('min-popularity')?.value) || 0;
    const maxPop = parseFloat(document.getElementById('max-popularity')?.value) || 5;
    return { sort, minPrice, maxPrice, minPop, maxPop };
}

export function renderProducts() {
    const { sort, minPrice, maxPrice, minPop, maxPop } = getSortAndFilterValues();
    let filtered = products.filter(p =>
        p.price >= minPrice && p.price <= maxPrice &&
        (p.popularityScore * 5) >= minPop && (p.popularityScore * 5) <= maxPop
    );
    switch (sort) {
        case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
        case 'popularity-asc': filtered.sort((a, b) => a.popularityScore - b.popularityScore); break;
        case 'popularity-desc': filtered.sort((a, b) => b.popularityScore - a.popularityScore); break;
        case 'name-asc': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'name-desc': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
    }
    const gridContainer = document.getElementById('products-grid');
    gridContainer.innerHTML = '';
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        gridContainer.appendChild(productCard);
    });
}

// Event listeners for filter/sort controls
document.addEventListener('DOMContentLoaded', () => {
    const controls = [
        'sort-select', 'min-price', 'max-price', 'min-popularity', 'max-popularity', 'clear-filters'
    ];
    controls.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === 'clear-filters') {
                el.addEventListener('click', () => {
                    document.getElementById('sort-select').value = 'price-asc';
                    document.getElementById('min-price').value = '';
                    document.getElementById('max-price').value = '';
                    document.getElementById('min-popularity').value = '';
                    document.getElementById('max-popularity').value = '';
                    renderProducts();
                });
            } else {
                el.addEventListener('input', renderProducts);
            }
        }
    });
}); 