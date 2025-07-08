// components/productCard.js
import { colorOptions } from '../core/config.js';
import { renderProducts } from '../modules/productView.js';

export function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    const starRating = (product.popularityScore * 5).toFixed(1);
    const fullStars = Math.floor(starRating);
    const hasHalfStar = starRating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(starRating);
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.images[product.selectedColor]}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-content">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)} USD</div>
            <div class="product-details">
                <span>Weight: ${product.weight}g</span>
            </div>
            <div class="color-picker">
                <h4>Available in:</h4>
                <div class="color-options">
                    ${Object.keys(colorOptions).map(color => `
                        <button class="color-option ${colorOptions[color].class} ${product.selectedColor === color ? 'active' : ''}" data-color="${color}"></button>
                    `).join('')}
                </div>
            </div>
            <div class="star-rating">
                <div class="stars">
                    ${Array(fullStars).fill('<i class=\"fas fa-star star\"></i>').join('')}
                    ${hasHalfStar ? '<i class=\"fas fa-star-half-alt star\"></i>' : ''}
                    ${Array(emptyStars).fill('<i class=\"far fa-star star empty\"></i>').join('')}
                </div>
                <span class="rating-text">${starRating}/5</span>
            </div>
        </div>
    `;
    card.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            product.selectedColor = option.dataset.color;
            renderProducts();
        });
    });
    return card;
} 