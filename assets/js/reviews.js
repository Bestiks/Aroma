document.addEventListener('DOMContentLoaded', function() {
    // Функциональность фильтрации и сортировки отзывов
    const sortBySelect = document.getElementById('sort-by');
    const filterRatingSelect = document.getElementById('filter-rating');
    const reviewCards = document.querySelectorAll('.review-card');
    const reviewsGrid = document.querySelector('.reviews-grid');
    
    // Сортировка отзывов
    function sortReviews(sortBy) {
        const reviewsArray = Array.from(reviewCards);
        
        switch(sortBy) {
            case 'newest':
                reviewsArray.sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateB - dateA;
                });
                break;
            case 'highest':
                reviewsArray.sort((a, b) => {
                    const ratingA = parseInt(a.getAttribute('data-rating'));
                    const ratingB = parseInt(b.getAttribute('data-rating'));
                    return ratingB - ratingA;
                });
                break;
            case 'lowest':
                reviewsArray.sort((a, b) => {
                    const ratingA = parseInt(a.getAttribute('data-rating'));
                    const ratingB = parseInt(b.getAttribute('data-rating'));
                    return ratingA - ratingB;
                });
                break;
        }
        
        // Переприкрепляем отсортированные отзывы
        reviewsArray.forEach(review => {
            reviewsGrid.appendChild(review);
        });
    }
    
    // Фильтрация отзывов по рейтингу
    function filterReviews(rating) {
        reviewCards.forEach(card => {
            const cardRating = card.getAttribute('data-rating');
            
            if (rating === 'all' || cardRating === rating) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Обработчики событий для сортировки и фильтрации
    sortBySelect.addEventListener('change', function() {
        sortReviews(this.value);
    });
    
    filterRatingSelect.addEventListener('change', function() {
        filterReviews(this.value);
    });
    
    // Инициализация с сортировкой по умолчанию (новые)
    sortReviews('newest');
    
    // Функциональность лайков отзывов
    const likeBtns = document.querySelectorAll('.like-btn');
    
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const likeText = this.textContent;
            const likeCount = parseInt(likeText.match(/\d+/)[0]);
            
            if (this.classList.contains('active')) {
                this.innerHTML = `<i class="fas fa-thumbs-up"></i> Полезно (${likeCount + 1})`;
            } else {
                this.innerHTML = `<i class="far fa-thumbs-up"></i> Полезно (${likeCount - 1})`;
            }
        });
    });
    
    // Загрузка дополнительных отзывов
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // Имитация загрузки дополнительных отзывов
    loadMoreBtn.addEventListener('click', function() {
        // В реальном приложении здесь был бы запрос к серверу за дополнительными отзывами
        // Для этой демонстрации мы просто покажем сообщение
        this.textContent = 'Загрузка...';
        
        setTimeout(() => {
            this.textContent = 'Больше отзывов нет';
            this.disabled = true;
            this.style.backgroundColor = '#ccc';
            this.style.cursor = 'not-allowed';
        }, 1500);
    });
    
    // Выбор рейтинга в форме отзыва
    const ratingStars = document.querySelectorAll('.rating-select i');
    const ratingInput = document.getElementById('review-rating');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingInput.value = rating;
            
            // Обновление UI звезд
            ratingStars.forEach(s => {
                const starRating = s.getAttribute('data-rating');
                
                if (starRating <= rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
        
        // Эффект при наведении
        star.addEventListener('mouseenter', function() {
            const rating = this.getAttribute('data-rating');
            
            ratingStars.forEach(s => {
                const starRating = s.getAttribute('data-rating');
                
                if (starRating <= rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                }
            });
        });
        
        star.addEventListener('mouseleave', function() {
            const currentRating = ratingInput.value;
            
            ratingStars.forEach(s => {
                const starRating = s.getAttribute('data-rating');
                
                if (starRating <= currentRating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
    
    // Отправка формы отзыва
    const reviewForm = document.querySelector('.review-form');
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('review-name').value;
        const email = document.getElementById('review-email').value;
        const rating = document.getElementById('review-rating').value;
        const content = document.getElementById('review-content').value;
        
        if (rating === '0') {
            alert('Пожалуйста, выберите рейтинг');
            return;
        }
        
        // В реальном приложении здесь был бы запрос к серверу для сохранения отзыва
        // Для этой демонстрации мы просто покажем сообщение об успехе
        alert(`Спасибо за ваш отзыв, ${name}! Ваш отзыв был отправлен.`);
        
        // Сброс формы
        this.reset();
        ratingStars.forEach(s => {
            s.classList.remove('fas');
            s.classList.add('far');
        });
        ratingInput.value = '0';
    });
});