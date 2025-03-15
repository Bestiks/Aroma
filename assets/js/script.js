document.addEventListener('DOMContentLoaded', function() {
    // Переключение мобильного меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });
    
    // Закрытие мобильного меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target) && mobileNav.classList.contains('open')) {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Система рейтинга продуктов
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const addToCartBtn = card.querySelector('.btn-small');
        
        addToCartBtn.addEventListener('click', function() {
            const productName = card.querySelector('h3').textContent;
            alert(`${productName} добавлен в корзину!`);
        });
    });
    
    // Слайдер отзывов
    const reviewsSlider = document.querySelector('.reviews-slider');
    
    if (reviewsSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        reviewsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            reviewsSlider.classList.add('active');
            startX = e.pageX - reviewsSlider.offsetLeft;
            scrollLeft = reviewsSlider.scrollLeft;
        });
        
        reviewsSlider.addEventListener('mouseleave', () => {
            isDown = false;
            reviewsSlider.classList.remove('active');
        });
        
        reviewsSlider.addEventListener('mouseup', () => {
            isDown = false;
            reviewsSlider.classList.remove('active');
        });
        
        reviewsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - reviewsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            reviewsSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Автоматическая прокрутка отзывов
        let scrollAmount = 0;
        const scrollSpeed = 1;
        const scrollDelay = 30;
        
        function autoScroll() {
            reviewsSlider.scrollLeft += scrollSpeed;
            scrollAmount += scrollSpeed;
            
            // Сброс позиции прокрутки при достижении конца
            if (scrollAmount >= reviewsSlider.scrollWidth - reviewsSlider.clientWidth) {
                reviewsSlider.scrollLeft = 0;
                scrollAmount = 0;
            }
            
            setTimeout(autoScroll, scrollDelay);
        }
        
        // Запуск автоматической прокрутки после задержки
        setTimeout(autoScroll, 2000);
    }
    
    // Отправка формы подписки
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                alert(`Спасибо за подписку с адресом ${email}! Вы скоро получите наши обновления.`);
                emailInput.value = '';
            }
        });
    }
    
    // Плавная прокрутка для навигационных ссылок
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Применяется только к внутренним ссылкам
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Закрытие мобильного меню, если оно открыто
                    if (mobileNav.classList.contains('open')) {
                        hamburger.classList.remove('open');
                        mobileNav.classList.remove('open');
                        document.body.classList.remove('no-scroll');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Запасной вариант для видео в шапке
    const headerVideo = document.getElementById('header-video');
    
    if (headerVideo) {
        headerVideo.addEventListener('error', function() {
            const videoContainer = document.querySelector('.video-container');
            videoContainer.style.backgroundImage = 'url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1178&q=80")';
            videoContainer.style.backgroundSize = 'cover';
            videoContainer.style.backgroundPosition = 'center';
        });
    }
});