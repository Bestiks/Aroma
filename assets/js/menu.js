document.addEventListener('DOMContentLoaded', function() {
    // Функциональность вкладок категорий
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Удаляем активный класс со всех вкладок
            categoryTabs.forEach(tab => tab.classList.remove('active'));
            
            // Добавляем активный класс на нажатую вкладку
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Показываем/скрываем элементы меню в зависимости от категории
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Функциональность корзины
    const cartIcon = document.querySelector('.cart-icon');
    const cartContainer = document.querySelector('.cart-container');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total span');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    let cart = [];
    
    // Открыть корзину
    cartIcon.addEventListener('click', function() {
        cartContainer.classList.add('open');
        cartOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    
    // Закрыть корзину
    function closeCart() {
        cartContainer.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
    
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Добавить в корзину
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('₽', ''));
            const itemImage = menuItem.querySelector('.menu-item-image img').src;
            
            // Проверяем, есть ли товар уже в корзине
            const existingItemIndex = cart.findIndex(item => item.name === itemName);
            
            if (existingItemIndex > -1) {
                // Увеличиваем количество, если товар уже в корзине
                cart[existingItemIndex].quantity++;
            } else {
                // Добавляем новый товар в корзину
                cart.push({
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: 1
                });
            }
            
            // Обновляем интерфейс корзины
            updateCart();
            
            // Показываем уведомление
            showNotification(`${itemName} добавлен в корзину!`);
        });
    });
    
    // Обновление интерфейса корзины
    function updateCart() {
        // Обновляем счетчик товаров
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Очищаем контейнер товаров корзины
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Ваша корзина пуста</div>';
        } else {
            // Добавляем товары в контейнер
            cart.forEach((item, index) => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                
                cartItemElement.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">${item.price.toFixed(0)} ₽</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-index="${index}">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn increase" data-index="${index}">+</button>
                            <button class="remove-item" data-index="${index}">Удалить</button>
                        </div>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            // Добавляем обработчики событий для кнопок количества и удаления
            document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                    } else {
                        cart.splice(index, 1);
                    }
                    updateCart();
                });
            });
            
            document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cart[index].quantity++;
                    updateCart();
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cart.splice(index, 1);
                    updateCart();
                });
            });
        }
        
        // Обновляем итоговую сумму
        const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartTotal.textContent = `${total.toFixed(0)} ₽`;
    }
    
    // Оформление заказа
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Ваша корзина пуста!');
            return;
        }
        
        alert('Спасибо за ваш заказ! Итоговая сумма: ' + cartTotal.textContent);
        cart = [];
        updateCart();
        closeCart();
    });
    
    // Показать уведомление
    function showNotification(message) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        
        // Добавляем стили уведомления
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '20px';
        notification.style.backgroundColor = '#e67e22';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // Добавляем в body
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Скрываем и удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Инициализация корзины
    updateCart();
});