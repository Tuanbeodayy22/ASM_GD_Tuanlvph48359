document.addEventListener("DOMContentLoaded", () => {
    // Danh sách các sản phẩm
    const products = [
        { id: 1, name: "Iphone 15 Pro Max 256G", price: 29500000, image: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-tu-nhien-1-1-750x500.jpg" },
        { id: 2, name: "Xiaomi Mi14", price: 19990000, image: "https://cdn.tgdd.vn/Products/Images/42/322526/xiaomi-14-trang-1-750x500.jpg" },
        { id: 3, name: "Samsung Galaxy Z Fold6 5G", price: 52990000, image: "https://cdn.tgdd.vn/Products/Images/42/326348/samsung-galaxy-z-fold6-xam-1-1-750x500.jpg" }
    ];

    // Danh sách sản phẩm cho Flash Sale
    const flashSaleProducts = [];

    // Mảng lưu trữ các sản phẩm đã được thêm vào giỏ hàng
    let cart = [];

    // Danh sách các hình ảnh cho slideshow
    const slideImages = [
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-iphone-16-pro-km-moi.jpg",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/dien-thoai-samsung-galaxy-s24-fe-home-27-9-2024.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/xiaomi-14T-series-home-mo-ban.jpg"
    ];

    // Các phần tử HTML
    const productList = document.getElementById('product-list');
    const flashSaleContainer = document.getElementById('flash-sale-products');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const slideImage = document.getElementById('slide-image');
    const countdownElement = document.getElementById("countdown");

    let currentSlide = 0;
    let flashSaleDuration = 10 * 60 * 1000; // 10 phút

    // Hàm hiển thị slideshow
    function displaySlideshow() {
        slideImage.src = slideImages[currentSlide];
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slideImages.length;
            slideImage.src = slideImages[currentSlide];
        }, 3000);
    }

    // Hàm hiển thị danh sách sản phẩm
    function displayProducts() {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Giá: ${product.price.toLocaleString()} VNĐ</p>
                <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    // Hàm hiển thị sản phẩm Flash Sale
    function displayFlashSaleProducts() {
        flashSaleProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Giá cũ: ${product.price.toLocaleString()} VNĐ</p>
                <p>Giá Flash Sale: ${product.salePrice.toLocaleString()} VNĐ</p>
                <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
            `;
            flashSaleContainer.appendChild(productDiv);
        });
    }

    // Đồng hồ đếm ngược Flash Sale
    function startFlashSaleCountdown() {
        const countdownEndTime = Date.now() + flashSaleDuration;
        const countdownInterval = setInterval(() => {
            const remainingTime = countdownEndTime - Date.now();
            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = "Flash Sale đã kết thúc!";
                flashSaleContainer.innerHTML = ''; // Xóa sản phẩm Flash Sale khi hết giờ
            } else {
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                countdownElement.textContent = `${minutes} phút ${seconds} giây`;
            }
        }, 1000);
    }

    // Hàm thêm sản phẩm vào giỏ hàng
    window.addToCart = function(productId) {
        const allProducts = [...products, ...flashSaleProducts];
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCart();
            alert(`${product.name} đã được thêm vào giỏ hàng!`);
        } else {
            console.error('Sản phẩm không tìm thấy!');
        }
    }

    // Hàm xóa sản phẩm khỏi giỏ hàng
    window.removeFromCart = function(index) {
        cart.splice(index, 1);  // Xóa sản phẩm theo index
        updateCart();  // Cập nhật lại giao diện giỏ hàng sau khi xóa
    }

    // Hàm cập nhật giỏ hàng
    function updateCart() {
        cartItems.innerHTML = ''; 
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - ${item.price.toLocaleString()} VNĐ <button onclick="removeFromCart(${index})">Xóa</button>`;
            cartItems.appendChild(li);
            total += item.price;
        });

        totalPriceElement.textContent = total.toLocaleString();
    }

    // Xử lý sự kiện khi nhấn nút "Thanh Toán"
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Cảm ơn bạn đã mua hàng! Tổng tiền là: ${totalPriceElement.textContent} VNĐ`);
            cart = [];
            updateCart();
        } else {
            alert('Giỏ hàng của bạn đang trống!');
        }
    });

    // Mở modal Đăng Nhập
    document.querySelector('.login-btn').addEventListener('click', () => {
        document.getElementById('login-modal').style.display = 'flex';
    });

    // Đóng modal Đăng Nhập khi nhấn nút X
    document.getElementById('close-login-btn').addEventListener('click', () => {
        document.getElementById('login-modal').style.display = 'none';
    });

    // Đóng modal Đăng Nhập khi nhấn ra ngoài modal
    window.addEventListener('click', (event) => {
        const loginModal = document.getElementById('login-modal');
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Mở modal giỏ hàng
    document.getElementById('open-cart-btn').addEventListener('click', () => {
        document.getElementById('cart-modal').style.display = 'flex';
        updateCart();  // Cập nhật giỏ hàng khi mở modal
    });

    // Đóng modal giỏ hàng
    document.getElementById('close-cart-btn').addEventListener('click', () => {
        document.getElementById('cart-modal').style.display = 'none';
    });

    // Đóng modal giỏ hàng khi nhấn ra ngoài modal
    window.addEventListener('click', (event) => {
        const cartModal = document.getElementById('cart-modal');
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Gọi các hàm hiển thị slideshow, sản phẩm và Flash Sale khi tải trang
    displaySlideshow();
    displayProducts();
    displayFlashSaleProducts();
    startFlashSaleCountdown();
});
