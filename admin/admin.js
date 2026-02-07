// ============================================
// Admin Dashboard - JavaScript
// ============================================

const API_BASE_URL = 'http://localhost:5000/api';

// ============================================
// DOM Elements
// ============================================
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  loadDashboard();
  setupEventListeners();
  loadServices();
  loadReviews();
  loadMessages();
  checkAPIStatus();
});

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('[onclick]')) return;
      const section = item.dataset.section;
      showSection(section);
      
      // Update active nav item
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Service Form
  document.getElementById('service-form').addEventListener('submit', saveService);
}

// ============================================
// Section Navigation
// ============================================
function showSection(sectionName) {
  sections.forEach(section => section.classList.add('hidden'));
  const section = document.getElementById(`${sectionName}-section`);
  if (section) section.classList.remove('hidden');
}

// ============================================
// Dashboard
// ============================================
async function loadDashboard() {
  try {
    const [services, reviews, messages] = await Promise.all([
      fetch(`${API_BASE_URL}/services`).then(r => r.json()),
      fetch(`${API_BASE_URL}/reviews?approved=false`).then(r => r.json()),
      fetch(`${API_BASE_URL}/contact?status=new`).then(r => r.json())
    ]);

    document.getElementById('totalServices').textContent = services.data?.length || 0;
    document.getElementById('pendingReviews').textContent = reviews.data?.length || 0;
    document.getElementById('newMessages').textContent = messages.data?.length || 0;
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

// ============================================
// Services Management
// ============================================
async function loadServices() {
  try {
    const response = await fetch(`${API_BASE_URL}/services`);
    const result = await response.json();
    const tbody = document.getElementById('services-table');

    if (!result.success || !result.data || result.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center">لا توجد خدمات</td></tr>';
      return;
    }

    tbody.innerHTML = result.data.map(service => `
      <tr>
        <td>
          <button class="btn-primary mr-2" onclick="editService('${service._id}')">تعديل</button>
          <button class="btn-danger" onclick="deleteService('${service._id}')">حذف</button>
        </td>
        <td>${service.category}</td>
        <td>${service.price} ر.س</td>
        <td>${service.name}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading services:', error);
    document.getElementById('services-table').innerHTML = '<tr><td colspan="4" class="text-center text-red-500">خطأ في التحميل</td></tr>';
  }
}

function openServiceModal() {
  document.getElementById('service-id').value = '';
  document.getElementById('service-form').reset();
  openModal('service-modal');
}

function editService(id) {
  // Implementation for editing existing service
  openServiceModal();
}

async function saveService(e) {
  e.preventDefault();
  
  const id = document.getElementById('service-id').value;
  const data = {
    name: document.getElementById('service-name').value,
    description: document.getElementById('service-description').value,
    price: parseFloat(document.getElementById('service-price').value),
    category: document.getElementById('service-category').value,
    featured: document.getElementById('service-featured').checked
  };

  try {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/services/${id}` : `${API_BASE_URL}/services`;
    
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (result.success) {
      showAlert('تم حفظ الخدمة بنجاح', 'success');
      closeModal('service-modal');
      loadServices();
      loadDashboard();
    } else {
      showAlert(result.message || 'خطأ في حفظ الخدمة', 'error');
    }
  } catch (error) {
    showAlert('خطأ: ' + error.message, 'error');
  }
}

async function deleteService(id) {
  if (!confirm('هل تريد حذف هذه الخدمة؟')) return;
  
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, { method: 'DELETE' });
    const result = await response.json();
    
    if (result.success) {
      showAlert('تم حذف الخدمة بنجاح', 'success');
      loadServices();
      loadDashboard();
    } else {
      showAlert(result.message || 'خطأ في الحذف', 'error');
    }
  } catch (error) {
    showAlert('خطأ: ' + error.message, 'error');
  }
}

// ============================================
// Reviews Management
// ============================================
async function loadReviews() {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    const result = await response.json();
    const tbody = document.getElementById('reviews-table');

    if (!result.success || !result.data || result.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center">لا توجد تقييمات</td></tr>';
      return;
    }

    tbody.innerHTML = result.data.map(review => `
      <tr>
        <td>
          ${!review.isApproved ? `<button class="btn-primary mr-2" onclick="approveReview('${review._id}')">موافقة</button>` : ''}
          <button class="btn-danger" onclick="deleteReview('${review._id}')">حذف</button>
        </td>
        <td>${'⭐'.repeat(review.rating)}</td>
        <td>${review.clientEmail}</td>
        <td>${review.clientName}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
}

async function approveReview(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}/approve`, { method: 'PATCH' });
    const result = await response.json();
    
    if (result.success) {
      showAlert('تمت الموافقة على التقييم', 'success');
      loadReviews();
    } else {
      showAlert(result.message || 'خطأ', 'error');
    }
  } catch (error) {
    showAlert('خطأ: ' + error.message, 'error');
  }
}

async function deleteReview(id) {
  if (!confirm('حذف هذا التقييم؟')) return;
  
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, { method: 'DELETE' });
    const result = await response.json();
    
    if (result.success) {
      showAlert('تم الحذف', 'success');
      loadReviews();
    } else {
      showAlert(result.message, 'error');
    }
  } catch (error) {
    showAlert('خطأ: ' + error.message, 'error');
  }
}

// ============================================
// Messages Management
// ============================================
async function loadMessages() {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`);
    const result = await response.json();
    const tbody = document.getElementById('messages-table');

    if (!result.success || !result.data || result.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center">لا توجد رسائل</td></tr>';
      return;
    }

    tbody.innerHTML = result.data.map(msg => `
      <tr>
        <td>
          <button class="btn-primary mr-2" onclick="replyMessage('${msg._id}')">رد</button>
          <button class="btn-danger" onclick="deleteMessage('${msg._id}')">حذف</button>
        </td>
        <td><span class="bg-blue-100 px-2 py-1 rounded text-sm">${msg.status}</span></td>
        <td>${msg.subject}</td>
        <td>${msg.email}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

function replyMessage(id) {
  const reply = prompt('أدخل الرد:');
  if (!reply) return;
  
  fetch(`${API_BASE_URL}/contact/${id}/reply`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ adminReply: reply })
  })
    .then(r => r.json())
    .then(result => {
      if (result.success) {
        showAlert('تم الرد بنجاح', 'success');
        loadMessages();
      } else {
        showAlert(result.message, 'error');
      }
    })
    .catch(err => showAlert('خطأ: ' + err.message, 'error'));
}

async function deleteMessage(id) {
  if (!confirm('حذف هذه الرسالة؟')) return;
  
  try {
    const response = await fetch(`${API_BASE_URL}/contact/${id}`, { method: 'DELETE' });
    const result = await response.json();
    
    if (result.success) {
      showAlert('تم الحذف', 'success');
      loadMessages();
    }
  } catch (error) {
    showAlert('خطأ: ' + error.message, 'error');
  }
}

// ============================================
// Utilities
// ============================================
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

function showAlert(message, type) {
  const container = document.getElementById('alertContainer');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  container.appendChild(alert);
  
  setTimeout(() => alert.remove(), 3000);
}

async function checkAPIStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    const result = await response.json();
    
    if (result.success) {
      document.getElementById('apiStatus').textContent = '✅ متصل';
      document.getElementById('apiStatus').className = 'text-xl font-bold text-green-600';
    }
  } catch (error) {
    document.getElementById('apiStatus').textContent = '❌ غير متصل';
    document.getElementById('apiStatus').className = 'text-xl font-bold text-red-600';
  }
}

function logout() {
  if (confirm('هل تريد تسجيل الخروج؟')) {
    alert('تسجيل خروج - سيتم إعادة التوجيه قريباً');
    // في المستقبل: window.location.href = '/';
  }
}

// Refresh data every 30 seconds
setInterval(() => {
  loadDashboard();
  checkAPIStatus();
}, 30000);
