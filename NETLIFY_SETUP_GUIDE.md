# 🚀 دليل نشر Netlify - خطوة بخطوة

## ⏱️ الوقت المتوقع: 10 دقائق

---

## 📋 الخطوة 1: إنشاء حساب Netlify

**ليس لديك حساب Netlify؟**

1. افتح: https://app.netlify.com/signup
2. اختر **GitHub** (الأسهل)
3. اضغط **Authorize netlify**
4. اختر **Save**

**✅ تم!**

---

## 🔑 الخطوة 2: الحصول على Access Token

### أولاً - الـ NETLIFY_AUTH_TOKEN:

1. افتح: https://app.netlify.com/user/applications#personal-access-tokens
2. اضغط **New access token**
3. اكتب الاسم: `GitHub Actions`
4. اضغط **Generate token**
5. **انسخ التوكن الذي ظهر** ⚠️ (لن تراه مرة أخرى!)

**احفظه مؤقتاً في ملف نصي أو ورقة!**

---

## 📍 الخطوة 3: الحصول على NETLIFY_SITE_ID (اختياري)

هناك 3 طرق:

### الطريقة 1 - GitHub Integration (الأسهل):
1. افتح: https://app.netlify.com/
2. اضغط **Add new site** → **Import an existing project**
3. اختر **GitHub**
4. وافق على الصلاحيات
5. اختر Repository: `Roof169/Mutqin-ksa`
6. اضغط **Deploy site**
7. انتظر النشر (2-3 دقائق)
8. اذهب **Site settings** → **General**
9. انسخ **Site ID** (يبدأ بـ XXXX-XXXX)

### الطريقة 2 - من Netlify CLI:
```bash
npm install -g netlify-cli
netlify login
cd /workspaces/Mutqin-ksa
netlify sites list
```

### الطريقة 3 - من Dashboard:
- افتح https://app.netlify.com
- اختر موقعك
- اضغط **Site settings**
- ابحث عن **Site ID**

**ملاحظة:** NETLIFY_SITE_ID اختياري - يمكن تركه فارغاً والنشر سيعمل!

---

## 🔐 الخطوة 4: إضافة GitHub Secrets

### افتح Settings:
https://github.com/Roof169/Mutqin-ksa/settings/secrets/actions

### أضف أول Secret:
- **Name:** `NETLIFY_AUTH_TOKEN`
- **Value:** [الـ token الذي نسخته من Netlify]
- اضغط **Add secret**

### أضف ثاني Secret (اختياري):
- **Name:** `NETLIFY_SITE_ID`
- **Value:** [الـ Site ID من Netlify]
- اضغط **Add secret**

**✅ خلصنا الإعداد الأساسي!**

---

## ✨ الخطوة 5: اختبر النشر

### جرّب الدفع الأول:
```bash
cd /workspaces/Mutqin-ksa
git status
git add -A
git commit -m "🎉 setup: تفعيل Netlify deployment"
git push origin main
```

### تابع النشر:
افتح: https://github.com/Roof169/Mutqin-ksa/actions
- شوف **Deploy to Netlify** في القائمة
- اضغط عليها
- شاهد التقدم بالوقت الفعلي ✨

### الموقع الحي:
بعد النشر الناجح، الموقع سيكون على:
```
https://mutqin-ksa.netlify.app
```

---

## 🎯 بعد الآن:

كل مرة تعمل `git push`:
1. ✅ GitHub Actions يستقبل الـ push
2. 🚀 Netlify workflow يشتغل تلقائياً
3. 📦 الموقع ينتشر مباشرة
4. ✨ التغييرات الجديدة تظهر على الويب!

---

## 🐛 حل المشاكل:

### المشكلة: Workflow فشل
**الحل:**
- شيك أن الـ token صحيح (بدون مسافات زيادة)
- جرّب GitHub Secrets page مرة قانية
- تأكد من اسم الـ secret صحيح: `NETLIFY_AUTH_TOKEN`

### المشكلة: موقع Netlify ما يتحدّث
**الحل:**
- روح: https://app.netlify.com/teams/default/deploys
- شوف آخر deployment
- شيك error logs

### المشكلة: ما فيش NETLIFY_SITE_ID
**الحل:**
- ما هو مشكلة! Netlify سيكتشفه تلقائياً
- النشر سيعمل بدونه

---

## 📚 المراجع:
- Netlify Docs: https://docs.netlify.com/
- GitHub Actions: https://github.com/Roof169/Mutqin-ksa/actions
- Netlify Dashboard: https://app.netlify.com

---

**🎉 تهانينا! موقعك الآن جاهز للنشر التلقائي!**
