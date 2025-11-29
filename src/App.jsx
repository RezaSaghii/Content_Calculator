import React, { useEffect, useState } from "react";
import { CheckCircle, Info, RefreshCw, Link2, Layers, Anchor, Image, Camera, Music, Type, Monitor, Clock, Gift, Book, MousePointer, MessageCircle, Text, Repeat, Hash, PenTool, Calendar, Users, Frame, BarChart, Repeat2, TrendingUp, Reply, Share2 } from "lucide-react";
// Reels Checklist React Component — RTL & Modern
// Notes:
// - Tailwind CSS required (recommended: Vite + Tailwind).
// - Place this file in your src/components and import <ReelsChecklist /> in App.jsx.
// - State persists to localStorage (key: "reels_checklist_v1").
// - The top-level container is RTL-compatible via dir="rtl".
// - Updated with modern dark theme, professional styling, and icons for each item.
// - Viral score is now a fixed bottom bar for constant visibility without obstructing content (added padding-bottom to main container).
const ICON_MAP = {
  Anchor, Image, Camera, Music, Type, Monitor, Clock, Gift, Book, MousePointer, MessageCircle, Text, Repeat, Hash, PenTool, Calendar, Users, Frame, BarChart, Repeat2, TrendingUp, Reply, Share2
};
export default function ReelsChecklist() {
  const ITEMS = [
    { id: "hook", title: "قلاب (Hook) در ۳ ثانیه اول", desc: "شروع ویدیوی شما باید چنان قوی باشد که کاربر را تا ۳ ثانیه اول نگه دارد — سوالی تحریک‌کننده، صحنه‌ی تعجب‌آور یا وعده‌ی ارزش فوری.", weight: 9, icon: "Anchor" },
    { id: "cover", title: "کاور/thumbnail اختصاصی", desc: "کاوری حرفه‌ای با متن کوتاه که روی موبایل خوانا باشد و نرخ کلیک را افزایش دهد.", weight: 6, icon: "Image" },
    { id: "first-frame", title: "فریم اول قوی (چشم‌گیر)", desc: "فریم اول باعث توقف اسکرول می‌شود — از تصویر یا تایپوگرافی واضح استفاده کن.", weight: 7, icon: "Camera" },
    { id: "audio", title: "صدا/موسیقی ترند با پیچش شخصی", desc: "موسیقی ترند سیگنال مثبت به الگوریتم می‌فرستد؛ یک ادیت یا پیچش خلاقانه باعث ماندگاری می‌شود.", weight: 8, icon: "Music" },
    { id: "captions", title: "زیرنویس/متن روی ویدیو", desc: "بسیاری ویدیوها را بی‌صدا تماشا می‌کنند — زیرنویس خوانا نرخ completion را بالا می‌برد.", weight: 6, icon: "Type" },
    { id: "aspect", title: "ابعاد صحیح (9:16) و کیفیت بالا", desc: "رزولوشن حداقل 1080x1920 — عنصر اصلی را در مرکز کادربندی کن.", weight: 5, icon: "Monitor" },
    { id: "length", title: "طول مناسب (موجز و موثر)", desc: "10-30 ثانیه معمولاً بهترین بازخورد را دارند؛ اگر نیاز به زمان بیشتری است، آن را با ساختار قوی پشتیبانی کن.", weight: 5, icon: "Clock" },
    { id: "value", title: "ارزش مشخص (آموزشی/اطلاعی/سرگرمی)", desc: "ویدیو باید به وضوح یک ارزش بدهد — آموزشی، احساسی یا سرگرم‌کننده باشد.", weight: 8, icon: "Gift" },
    { id: "story", title: "ساختار داستانی (شروع-میانه-پایان)", desc: "حتی کلیپ کوتاه هم از یک ساختار ساده سود می‌برد: معرفی مشکل، نمایش/حل و یک پایان قوی.", weight: 6, icon: "Book" },
    { id: "cta", title: "دعوت به اقدام (CTA) طبیعی", desc: "CTA باید ساده و مرتبط باشد: ذخیره، کامنت، یا دنبال‌کردن — طوری بیان شود که مزیت آن مشخص باشد.", weight: 6, icon: "MousePointer" },
    { id: "engage_early", title: "درخواست تعامل در ۳-۷ ثانیه اول", desc: "یک سوال یا درخواست سریع برای کامنت/اموجی که تعامل اولیه را افزایش می‌دهد.", weight: 7, icon: "MessageCircle" },
    { id: "hook_text", title: "متن قلاب روی فریم‌های ابتدایی", desc: "متن کوتاه، بزرگ و خوانا که مسئله یا وعده را نشان می‌دهد — برای کاربرانی که صدا خاموش است حیاتی است.", weight: 5, icon: "Text" },
    { id: "loop", title: "طراحی برای لوپ و بازپخش", desc: "پایان باز یا المان‌های گرافیکی که کاربر را ترغیب به بازدید دوباره می‌کنند را در نظر بگیر.", weight: 5, icon: "Repeat" },
    { id: "hashtags", title: "هشتگ هوشمند (ترند + مرتبط)", desc: "ترکیب هشتگ‌های ترند و اختصاصی — از هشتگ‌های نامربوط پرهیز کن.", weight: 4, icon: "Hash" },
    { id: "caption_text", title: "کپشن جذاب و کوتاه", desc: "ابتدای کپشن باید کنجکاوی ایجاد کند؛ یک CTA کوتاه در انتها قرار بده.", weight: 4, icon: "PenTool" },
    { id: "post_time", title: "زمان‌بندی مناسب انتشار", desc: "با آنالیتیکس مخاطبت بهترین زمان را بیاب؛ انتشار در زمان آنلاین بودن فالورها مهم است.", weight: 3, icon: "Calendar" },
    { id: "thumbnail_text", title: "متن روی کاور که کنجکاوی ایجاد کند", desc: "۲-۴ کلمه که وعده یا سوالی مطرح می‌کند و در موبایل خوانا باشد.", weight: 3, icon: "Type" },
    { id: "collab", title: "همکاری/دعوت از افراد مرتبط", desc: "کالاب‌ها و منشن‌ها دسترسی و احتمال وایرال شدن را افزایش می‌دهند.", weight: 4, icon: "Users" },
    { id: "thumbnail_frame", title: "فریم کاور در ادیت برای انتخاب بهتر", desc: "در ویرایش یک فریم اختصاصی برای کاور در نظر بگیر تا هنگام آپلود گزینه‌ای حرفه‌ای داشته باشی.", weight: 2, icon: "Frame" },
    { id: "analytics", title: "بررسی آنالیتیکس و تست A/B", desc: "پس از انتشار retention، saves و shares را بررسی کن و بر اساس داده A/B تست انجام بده.", weight: 5, icon: "BarChart" },
    { id: "consistency", title: "ثبات در انتشار (تقویم محتوا)", desc: "ثبات نشان‌دهنده تعهد است؛ یک ریتم منطقی تعیین کن ولی کیفیت را قربانی نکن.", weight: 4, icon: "Repeat2" },
    { id: "trend_twist", title: "ترند + زاویه اوریجینال", desc: "ترندها را دنبال کن اما با زاویه‌ای جدید تا از جمع متمایز شوی.", weight: 6, icon: "TrendingUp" },
    { id: "engage_reply", title: "پاسخ‌گویی به کامنت‌ها در ۱۲-۲۴ ساعت", desc: "تعامل اولیه با کامنت‌ها سیگنال مثبت به الگوریتم ارسال می‌کند.", weight: 4, icon: "Reply" },
    { id: "crosspost", title: "اشتراک‌گذاری در استوری و پلتفرم‌های دیگر", desc: "استفاده از استوری و تیزرهای کراس‌پلتفرم سیگنال تعامل را تقویت می‌کند.", weight: 3, icon: "Share2" }
  ];
  const STORAGE_KEY = "reels_checklist_v1";
  const [checked, setChecked] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });
  const totalWeight = ITEMS.reduce((s, it) => s + it.weight, 0);
  const checkedWeight = ITEMS.reduce((s, it) => s + (checked[it.id] ? it.weight : 0), 0);
  const percent = Math.round((checkedWeight / totalWeight) * 100);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch (e) {}
  }, [checked]);
  function toggle(id) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }
  function reset() { setChecked({}); }
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] pt-8 pb-28 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">چک‌لیست تولید محتوا — Reels (اینستاگرام)</h1>
            <p className="mt-1 text-sm text-gray-300">کامل، قابل شخصی‌سازی و بهینه برای موبایل — درصد وایرال بر اساس وزن هر مورد محاسبه می‌شود.</p>
          </div>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-4">
            {ITEMS.map(it => (
              <ChecklistCard key={it.id} item={it} checked={!!checked[it.id]} onToggle={() => toggle(it.id)} />
            ))}
            <div className="flex items-center justify-between gap-3 mt-4">
              <div className="flex items-center gap-2">
                <button onClick={reset} className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-900/50 text-gray-200 rounded-lg shadow-sm hover:bg-indigo-800/50 text-sm border border-indigo-500/20">
                  <RefreshCw className="w-4 h-4" /> ریست همه
                </button>
                <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg shadow hover:opacity-95 text-sm">
                  <Link2 className="w-4 h-4" /> کپی لینک صفحه
                </button>
              </div>
              <div className="text-sm text-gray-400">وضعیت در مرورگر (localStorage) ذخیره می‌شود</div>
            </div>
          </section>
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="bg-gradient-to-br from-indigo-900/50 to-indigo-700/30 border border-indigo-500/20 rounded-2xl p-4 shadow-lg backdrop-blur-md">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2"><Info className="w-4 h-4 text-indigo-400" /> نکات سریع قبل از انتشار</h4>
                <ul className="mt-3 text-sm text-gray-300 space-y-2">
                  <li>• ۳ ثانیه اول قوی باشد.</li>
                  <li>• زیرنویس و متن روی ویدیو واضح باشد.</li>
                  <li>• از موسیقی ترند با پیچش شخصی استفاده کن.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/50 to-indigo-700/30 border border-indigo-500/20 rounded-2xl p-4 shadow-lg backdrop-blur-md text-sm text-gray-200">
                <h5 className="font-semibold mb-2 text-white">نکته دربارهٔ درصد</h5>
                <p className="text-xs text-gray-400">این درصد یک برآورد وزنی است — برای تصمیمات محتوا از آن به عنوان راهنما استفاده کن، نه قطعیت.</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-300/10 rounded-2xl p-4 shadow-lg backdrop-blur-md">
                <h5 className="text-sm font-semibold text-indigo-100">افزودنی‌های پیشنهادی</h5>
                <ul className="mt-2 text-sm text-indigo-200 space-y-1">
                  <li>• تست A/B روی کاور و کپشن</li>
                  <li>• استفاده از شخصی‌سازی صدای برند</li>
                  <li>• برنامه‌ریزی تقویم محتوا</li>
                </ul>
              </div>
            </div>
          </aside>
        </main>
        <footer className="mt-8 text-center text-xs text-gray-400">طراحی مدرن و ریسپانسیو — مناسب موبایل، تبلت و دسکتاپ.</footer>
      </div>
      {/* Fixed Bottom Bar for Viral Score */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-br from-indigo-900/50 to-indigo-700/30 border-t border-indigo-500/20 shadow-lg backdrop-blur-md h-20">
        <div className="max-w-5xl mx-auto h-full flex items-center justify-between px-4 gap-4">
          <div className="flex items-center gap-4">
            <Layers className="w-5 h-5 text-indigo-400" />
            <div className="text-sm text-gray-300">امتیاز وایرال:</div>
            <div className="text-xl font-bold text-white">{percent}%</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16">
              <ProgressRing percent={percent} size={64} stroke={6} />
            </div>
            <div className="text-sm text-gray-300">تفسیر: <span className="font-medium text-white">{percent > 75 ? 'خیلی خوب' : percent > 45 ? 'متوسط' : 'نیازمند تمرکز'}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ChecklistCard({ item, checked, onToggle }) {
  const [open, setOpen] = useState(false);
  const IconComponent = ICON_MAP[item.icon];
  return (
    <article className={`bg-gradient-to-br from-indigo-900/50 to-indigo-700/30 border border-indigo-500/20 rounded-2xl p-4 shadow-lg backdrop-blur-md flex flex-col gap-4`}>
      <div className="flex items-start gap-3 w-full">
        <label className="flex items-center gap-3 cursor-pointer w-full" onClick={onToggle}>
          <input type="checkbox" checked={checked} onChange={() => {}} className="w-5 h-5 rounded-md border-gray-600 text-indigo-400 focus:ring-0 bg-indigo-900/50" aria-label={item.title} />
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <IconComponent className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              </div>
              <div className="text-xs text-gray-300">وزن: <span className="font-medium text-white">{item.weight}</span></div>
            </div>
            <p className="mt-1 text-xs text-gray-300 line-clamp-2">{item.desc}</p>
          </div>
        </label>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={(e) => { e.stopPropagation(); setOpen(s => !s); }} className="px-3 py-1 text-xs bg-indigo-600/50 text-indigo-200 rounded-md hover:bg-indigo-500/50">{open ? 'پنهان' : 'توضیحات'}</button>
      </div>
      {open && (
        <div className="w-full">
          <div className="p-3 bg-indigo-800/30 rounded-md text-xs text-gray-200 border border-indigo-500/20">{item.desc}</div>
        </div>
      )}
    </article>
  );
}
function ProgressRing({ percent = 0, size = 72, stroke = 7 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="g1" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#312e81" strokeWidth={stroke} fill="transparent" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="url(#g1)" strokeWidth={stroke} strokeLinecap="round" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} />
      </g>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={size * 0.22} fontWeight={700} fill="#ffffff">{percent}%</text>
    </svg>
  );
}