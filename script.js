/* ============================================
   متقن - ملف الوظائف التفاعلية الرئيسي
   ============================================ */

// 1. التنقل بين الصفحات
function switchPage(pageId) {
    // إخفاء جميع الصفحات
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active'));
    
    // إظهار الصفحة المطلوبة
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // تمرير الشاشة إلى الأعلى
        window.scrollTo(0, 0);
    }
}

// 2. تفعيل عناصر التنقل السفلية
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع العناصر
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // إضافة الفئة النشطة للعنصر المضغوط
            this.classList.add('active');
            
            // التنقل للصفحة المناسبة
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                switchPage(pageId);
            }
        });
    });
}

// 3. إضافة تقييم جديد
function addReview(reviewData) {
    const reviewsContainer = document.getElementById('reviews-container');
    
    if (!reviewsContainer) return;
    
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.innerHTML = `
        <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">
                    ${reviewData.name.charAt(0)}
                </div>
                <span class="font-bold text-sm text-gray-800">${reviewData.name}</span>
            </div>
            <div class="stars text-xs">
                ${generateStars(reviewData.rating)}
            </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">"${reviewData.comment}"</p>
        <div class="text-[10px] text-gray-400 mt-3 text-left">خدمة: ${reviewData.service}</div>
    `;
    
    reviewsContainer.insertBefore(reviewCard, reviewsContainer.firstChild);
}

// 4. إنشاء النجوم
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// 5. التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 6. عرض رسالة التنبيه
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alert-container') || createAlertContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    alertContainer.appendChild(alert);
    
    // إزالة التنبيه بعد 5 ثوان
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// 7. إنشاء حاوية التنبيهات
function createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alert-container';
    container.style.position = 'fixed';
    container.style.top = '20px';
    container.style.right = '20px';
    container.style.zIndex = '1000';
    container.style.maxWidth = '400px';
    document.body.appendChild(container);
    return container;
}

// 8. معالجة نموذج الاتصال
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    
    // التحقق من البيانات
    if (!name || !email || !phone || !message) {
        showAlert('الرجاء ملء جميع الحقول', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showAlert('البريد الإلكتروني غير صحيح', 'error');
        return;
    }
    
    if (phone.length < 9) {
        showAlert('رقم الهاتف غير صحيح', 'error');
        return;
    }
    
    // إرسال البيانات عبر WhatsApp
    const whatsappMessage = encodeURIComponent(
        `الاسم: ${name}\nالبريد: ${email}\nالهاتف: ${phone}\nالرسالة: ${message}`
    );
    window.open(`https://wa.me/966500000000?text=${whatsappMessage}`);
    
    // إعادة تعيين النموذج
    form.reset();
    showAlert('تم إرسال رسالتك بنجاح! 🎉', 'success');
}

// 9. حفظ البيانات محلياً
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('خطأ في حفظ البيانات:', error);
        return false;
    }
}

// 10. استرجاع البيانات من التخزين المحلي
function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('خطأ في استرجاع البيانات:', error);
        return null;
    }
}

// 11. تحديث عدد التقييمات
function updateReviewCount() {
    const reviewCards = document.querySelectorAll('.review-card');
    const count = reviewCards.length;
    const countElement = document.getElementById('review-count');
    
    if (countElement) {
        countElement.textContent = count;
    }
}

// 12. تفعيل وظيفة البحث
function initSearch() {
    const searchInput = document.getElementById('search-input');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.service-card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// 13. حساب إجمالي السعر (للسلات)
function calculateTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;
    
    items.forEach(item => {
        const price = parseFloat(item.getAttribute('data-price')) || 0;
        const quantity = parseInt(item.querySelector('.quantity').value) || 1;
        total += price * quantity;
    });
    
    const totalElement = document.getElementById('total-price');
    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
    
    return total;
}

// 14. تشغيل الدالات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الموقع بنجاح ✅');
    
    // تهيئة جميع الوظائف
    initNavigation();
    initSearch();
    updateReviewCount();
    
    // معالجة نموذج الاتصال
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // تعيين الصفحة الافتراضية النشطة
    const homeNav = document.querySelector('[data-page="home-page"]');
    if (homeNav) {
        homeNav.classList.add('active');
    }
});

// 15. دالة مساعدة لتنسيق الأرقام
function formatCurrency(amount) {
    return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR'
    }).format(amount);
}

// 16. دالة لنسخ النص
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showAlert('تم النسخ بنجاح! ✓', 'success');
    }).catch(() => {
        showAlert('فشل النسخ، حاول مرة أخرى', 'error');
    });
}

// 17. مشاركة الصفحة
function shareService(title, description) {
    const text = `تحقق من ${title}: ${description}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'متقن',
            text: text,
            url: window.location.href
        });
    } else {
        copyToClipboard(text);
    }
}

// 18. تفعيل الوضع الليلي (Dark Mode)
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.getAttribute('data-theme') === 'dark';
    
    if (isDarkMode) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// حفظ تفضيل الوضع الليلي
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}

// 19. تحديث المحتوى الديناميكي من ملف JSON
async function loadDataFromJSON(filePath) {
    try {
        const response = await fetch(filePath);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
        return null;
    }
}

// 20. معالج الأخطاء العام
window.addEventListener('error', function(event) {
    console.error('خطأ عام:', event.error);
    showAlert('حدث خطأ ما، الرجاء محاولة لاحقاً', 'error');
});

// تصدير الدوال للاستخدام العام
window.Mutqin = {
    switchPage,
    addReview,
    showAlert,
    saveToLocalStorage,
    getFromLocalStorage,
    formatCurrency,
    copyToClipboard,
    shareService,
    toggleDarkMode,
    loadDataFromJSON
};
