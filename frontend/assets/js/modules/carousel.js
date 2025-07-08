// modules/carousel.js
import { products, currentSlide, itemsPerSlide } from '../core/app.js';
import { renderProducts } from './productView.js';

let carouselContainer = null;
let carouselTrack = null;
let currentSlideIndex = 0;
let totalSlides = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

export function setupResponsiveCarousel() {
    // Grid'i carousel'e çevir
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    // Eğer zaten carousel yapısı varsa, tekrar oluşturma
    if (productsGrid.classList.contains('carousel-container')) return;

    // Grid'i carousel container'a çevir
    productsGrid.className = 'carousel-container';
    
    // Carousel wrapper oluştur
    const carouselWrapper = document.createElement('div');
    carouselWrapper.className = 'carousel-wrapper';
    
    // Carousel track oluştur
    const track = document.createElement('div');
    track.className = 'carousel-track';
    
    // Mevcut ürünleri track'e taşı
    while (productsGrid.firstChild) {
        const item = productsGrid.firstChild;
        item.className = 'carousel-item';
        track.appendChild(item);
    }
    
    carouselWrapper.appendChild(track);
    productsGrid.appendChild(carouselWrapper);
    
    // Ok butonları ekle
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn prev-btn';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.addEventListener('click', prevSlide);
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn next-btn';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.addEventListener('click', nextSlide);
    
    productsGrid.appendChild(prevBtn);
    productsGrid.appendChild(nextBtn);
    
    // Carousel referanslarını sakla
    carouselContainer = productsGrid;
    carouselTrack = track;
    
    // Swipe desteği ekle
    setupSwipeSupport();
    
    // Responsive ayarları
    updateCarouselSettings();
    
    // İlk render
    updateCarousel();
}

function setupSwipeSupport() {
    if (!carouselTrack) return;
    
    // Touch events
    carouselTrack.addEventListener('touchstart', touchStart);
    carouselTrack.addEventListener('touchmove', touchMove);
    carouselTrack.addEventListener('touchend', touchEnd);
    
    // Mouse events (desktop için)
    carouselTrack.addEventListener('mousedown', touchStart);
    carouselTrack.addEventListener('mousemove', touchMove);
    carouselTrack.addEventListener('mouseup', touchEnd);
    carouselTrack.addEventListener('mouseleave', touchEnd);
    
    // Prevent context menu
    carouselTrack.addEventListener('contextmenu', e => e.preventDefault());
}

function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    carouselTrack.style.cursor = 'grabbing';
    carouselTrack.style.userSelect = 'none';
}

function touchMove(event) {
    if (!isDragging) return;
    
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    const moveX = prevTranslate + diff;
    
    // Sınırları kontrol et
    const maxTranslate = 0;
    const minTranslate = -(totalSlides - itemsPerSlide) * (100 / itemsPerSlide);
    
    if (moveX > maxTranslate || moveX < minTranslate) return;
    
    currentTranslate = moveX;
    setSliderPosition(currentTranslate);
}

function touchEnd() {
    isDragging = false;
    carouselTrack.style.cursor = 'grab';
    carouselTrack.style.userSelect = '';
    
    const movedBy = currentTranslate - prevTranslate;
    
    // Eğer yeterince hareket ettiyse slide değiştir
    if (Math.abs(movedBy) > 100) {
        if (movedBy < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    } else {
        // Geri dön
        setSliderPosition(prevTranslate);
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function setSliderPosition(position) {
    carouselTrack.style.transform = `translateX(${position}%)`;
}

function updateCarouselSettings() {
    const width = window.innerWidth;
    
    if (width > 1200) {
        itemsPerSlide = 4;
    } else if (width > 900) {
        itemsPerSlide = 3;
    } else if (width > 600) {
        itemsPerSlide = 2;
    } else {
        itemsPerSlide = 1;
    }
    
    totalSlides = Math.ceil(products.length / itemsPerSlide);
}

export function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updateCarousel();
    }
}

export function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateCarousel();
    }
}

export function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
        currentSlideIndex = slideIndex;
        updateCarousel();
    }
}

export function updateCarousel() {
    if (!carouselTrack) return;
    
    const translateX = -(currentSlideIndex * (100 / itemsPerSlide));
    currentTranslate = translateX;
    prevTranslate = translateX;
    
    setSliderPosition(translateX);
    updateCarouselButtons();
}

export function updateCarouselButtons() {
    if (!carouselContainer) return;
    
    const prevBtn = carouselContainer.querySelector('.prev-btn');
    const nextBtn = carouselContainer.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlideIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlideIndex >= totalSlides - 1;
    }
}

// RenderProducts çağrıldığında carousel'i güncelle
export function refreshCarousel() {
    if (carouselContainer) {
        setupResponsiveCarousel();
    }
} 