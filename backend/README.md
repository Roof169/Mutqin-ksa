# 🛠️ Mutqin - Backend & Admin Dashboard

## نظرة عامة

نظام إدارة شامل لموقع متقن يشمل:
- **Backend API** مبني بـ Express.js و MongoDB
- **لوحة تحكم إدارية** HTML/CSS/JavaScript
- **CRUD Operations** للخدمات والتقييمات والرسائل

---

## 🏗️ البنية

```
backend/
├── server.js              # السيرفر الرئيسي
├── package.json           # Dependencies
├── .env.example           # متغيرات البيئة (عينة)
├── models/
│   ├── Service.js         # نموذج الخدمة
│   ├── Review.js          # نموذج التقييم
│   └── Contact.js         # نموذج الرسالة
└── routes/
    ├── services.js        # API endpoints للخدمات
    ├── reviews.js         # API endpoints للتقييمات
    └── contact.js         # API endpoints للرسائل

admin/
├── index.html             # لوحة التحكم
└── admin.js               # JavaScript منطق لوحة التحكم
```

---

## 🚀 البدء السريع

### 1️⃣ **تثبيت الـ Dependencies**

```bash
cd backend
npm install
```

### 2️⃣ **إعداد قاعدة البيانات**

تأكد من تشغيل MongoDB محليًا:

```bash
# على Linux/Mac
mongod

# على Windows (إذا كان MongoDB مثبت كخدمة)
net start MongoDB
```

أو استخدم MongoDB Atlas (سحابة):
- اشترك في: https://www.mongodb.com/cloud/atlas
- احصل على connection string
- أضف MONGODB_URI في `.env`

### 3️⃣ **إعداد متغيرات البيئة**

انسخ `.env.example` إلى `.env` وحدّث القيم:

```bash
cp .env.example .env
```

**محتوى `.env`:**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mutqin-db
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:3000,https://mutqin-ksa.netlify.app
```

### 4️⃣ **تشغيل السيرفر**

```bash
# عادي
npm start

# مع Hot Reload (التطوير)
npm run dev
```

**النتيجة:**
```
🌐 Server running on: http://localhost:5000
📚 API Documentation: http://localhost:5000/api
✅ MongoDB Connected Successfully
```

### 5️⃣ **فتح لوحة التحكم**

افتح المتصفح على:
```
file:///path/to/admin/index.html
```

أو استخدم خادم بسيط:
```bash
cd admin
python3 -m http.server 8000
# ثم افتح: http://localhost:8000
```

---

## 📡 API Endpoints

### **الخدمات** (`/api/services`)

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/` | جميع الخدمات |
| GET | `/:id` | خدمة واحدة |
| POST | `/` | إضافة خدمة جديدة |
| PUT | `/:id` | تعديل خدمة |
| DELETE | `/:id` | حذف خدمة |

مثال - إضافة خدمة:
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "استشارات مالية",
    "description": "استشارات متخصصة في التمويل",
    "price": 500,
    "category": "financial",
    "featured": true
  }'
```

### **التقييمات** (`/api/reviews`)

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/` | جميع التقييمات |
| POST | `/` | إضافة تقييم جديد |
| PATCH | `/:id/approve` | الموافقة على تقييم |
| DELETE | `/:id` | حذف تقييم |

### **الرسائل** (`/api/contact`)

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/` | جميع الرسائل |
| POST | `/` | إرسال رسالة جديدة |
| PATCH | `/:id/reply` | الرد على رسالة |
| DELETE | `/:id` | حذف رسالة |

---

## 🎯 اختبار الـ API

استخدم Postman أو curl:

```bash
# الحصول على جميع الخدمات
curl http://localhost:5000/api/services

# إضافة تقييم جديد
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "أحمد",
    "clientEmail": "ahmed@example.com",
    "rating": 5,
    "comment": "خدمة رائعة جداً شكراً لكم"
  }'

# الحصول على الرسائل الجديدة
curl "http://localhost:5000/api/contact?status=new"
```

---

## 🎨 لوحة التحكم الإدارية

### الميزات:
- ✅ إدارة الخدمات (إضافة/تعديل/حذف)
- ✅ مراجعة والموافقة على التقييمات
- ✅ إدارة الرسائل والرد عليها
- ✅ لوحة معلومات بالإحصائيات الحية
- ✅ عرض حالة الـ API في الوقت الفعلي

### الاستخدام:

1. افتح `admin/index.html`
2. انقر على الأقسام من الشريط الجانبي
3. استخدم الأزرار لتنفيذ العمليات:
   - ➕ **إضافة**: اضغط على "إضافة جديدة"
   - ✏️ **تعديل**: اضغط "تعديل"
   - ❌ **حذف**: اضغط "حذف" مع التأكيد
   - ✅ **موافقة**: للتقييمات المعلقة

---

## 🔐 الأمان (المستقبلي)

سيتم إضافة:
- ✨ JWT Authentication
- 🛡️ Role-Based Access Control
- 🔒 Password Hashing
- 📝 Request Validation
- ⏱️ Rate Limiting

---

## 🐛 استكشاف الأخطاء

### مشكلة: "Connection refused" عند الاتصال بـ MongoDB

**الحل:**
```bash
# تحقق من تشغيل MongoDB
mongosh  # أو mongo

# أو استخدم MongoDB Atlas (سحابة)
```

### مشكلة: "CORS Error" في لوحة التحكم

**الحل:** تأكد من أن `CORS_ORIGIN` يشمل عنوان لوحة التحكم في `.env`:
```
CORS_ORIGIN=http://localhost:8000,file://,https://yourdomain.com
```

### مشكلة: لا تظهر البيانات في لوحة التحكم

**التحقق:**
1. افتح Browser Console (F12)
2. تحقق من الأخطاء
3. تأكد من تشغيل السيرفر على المنفذ 5000
4. تحقق من قيمة `API_BASE_URL` في `admin.js`

---

## 📚 أوامر مفيدة

```bash
# تشغيل السيرفر في background
nohup npm start &

# عرض الـ logs الحية
tail -f server.log

# إعادة تشغيل النود
npm run dev

# حذف السجلات القديمة من قاعدة البيانات
# (في MongoDB console)
db.services.deleteMany({createdAt: {$lt: new Date("2024-01-01")}})
```

---

## 🚢 النشر على Heroku أو Vercel

### Heroku:
```bash
heroku login
heroku create mutqin-api
git push heroku main
heroku logs --tail
```

### Vercel:
```bash
vercel
# اختر API > Express
# حدّث `vercel.json` وملف السيرفر
```

---

## 📞 الدعم والمساعدة

- 📖 MongoDB Docs: https://docs.mongodb.com/
- ⚡ Express Docs: https://expressjs.com/
- 🔗 REST API Best Practices: https://restfulapi.net/

---

**آخر تحديث:** 7 فبراير 2026  
**الإصدار:** 1.0.0
