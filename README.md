# موقع Eng. Omar Elgendy (شرح مبسّط جدًا)

## التشغيل
1. ثبّت Node.js من https://nodejs.org (النسخة LTS).
2. افتح مجلد `omar-portfolio` في الـTerminal (في ويندوز: كليك يمين داخل المجلد ← Open in Terminal).
3. اكتب `npm install` وانتظر.
4. اكتب `npm run dev` وافتح الرابط الذي يظهر (مثل http://localhost:5173).

## التعديل
- **الاسم / الرقم / تيليجرام / العمر / المدينة / المشاريع:** ملف `src/data/profile.js` (الرقم بصيغة `201032853311` بدون +).
- **النصوص:** `src/i18n/ar.json` و `src/i18n/en.json`.
- **صورتك:** ضعها في `public/images` باسم `omar.jpg` (أو غيّر الاسم في profile.js).
- **إضافة مشروع:** انسخ سطر `ph(3)` في profile.js واكتب مكانه: `{title:{en:'..',ar:'..'},desc:{en:'..',ar:'..'},tech:['React'],github:'رابط',demo:'رابط',image:'images/p1.jpg'}` وضع صورته في public/images.
- **الألوان:** أول سطر في `src/styles/global.css` (المتغيرات --g و --b و --bg).
- **الروبوت:** مبني بالكود داخل `src/components/RobotScene.jsx` ولا يحتاج ملف robot.glb.

## النشر على GitHub Pages
1. أنشئ Repository جديد على github.com وارفع كل ملفات المشروع (بدون مجلد node_modules).
2. اكتب `npm run build` ← سيظهر مجلد `dist`.
3. Settings ← Pages ← اختر فرع `gh-pages` أو ارفع محتوى `dist`. الأسهل: ادخل vercel.com أو netlify.com، اربط الـRepository، واضغط Deploy.
