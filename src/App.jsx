import React, { useEffect, useState } from "react";
import { CheckCircle, Info, RefreshCw, Layers, Anchor, Image, Camera, Music, Type, Monitor, Clock, Gift, Book, MousePointer, MessageCircle, Text, Repeat, Hash, PenTool, Calendar, Users, Frame, BarChart, Repeat2, TrendingUp, Reply, Share2, ArrowLeft, Sparkles, Target } from "lucide-react";
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
    { id: "hook", title: "قلاب (Hook) در ۳ ثانیه اول", desc: "شروع ویدیوی شما باید چنان قوی باشد که کاربر را تا ۳ ثانیه اول نگه دارد — سوالی تحریک‌کننده، صحنه‌ی تعجب‌آور یا وعده‌ی ارزش فوری.", detailedDesc: "قلاب یا Hook مهم‌ترین بخش ویدیوی شماست. در ۳ ثانیه اول باید یک سوال جذاب بپرسید، یک صحنه تعجب‌آور نشان دهید یا وعده یک ارزش فوری بدهید. این کار باعث می‌شود کاربر اسکرول نکند و تا انتها بماند. مثال: 'می‌دونستی که ۹۰٪ مردم این اشتباه رو می‌کنن؟' یا 'این ترفند زندگی‌ام رو عوض کرد'.", weight: 9, icon: "Anchor" },
    { id: "cover", title: "کاور/thumbnail اختصاصی", desc: "کاوری حرفه‌ای با متن کوتاه که روی موبایل خوانا باشد و نرخ کلیک را افزایش دهد.", detailedDesc: "کاور یا thumbnail اولین چیزی است که کاربر می‌بیند. باید حرفه‌ای، واضح و جذاب باشد. متن روی کاور باید کوتاه (۲-۴ کلمه)، خوانا و کنجکاوی‌برانگیز باشد. از فونت‌های بزرگ و کنتراست بالا استفاده کن تا در فید اینستاگرام متمایز شود. رنگ‌های روشن و متضاد بهتر عمل می‌کنند.", weight: 6, icon: "Image" },
    { id: "first-frame", title: "فریم اول قوی (چشم‌گیر)", desc: "فریم اول باعث توقف اسکرول می‌شود — از تصویر یا تایپوگرافی واضح استفاده کن.", detailedDesc: "فریم اول ویدیو باید به قدری قوی باشد که کاربر را متوقف کند. از تصاویر واضح، تایپوگرافی بزرگ و خوانا، یا صحنه‌های جذاب استفاده کن. این فریم باید با کاور هماهنگ باشد و پیام اصلی را فوراً منتقل کند. اگر فریم اول ضعیف باشد، کاربر قبل از شروع ویدیو اسکرول می‌کند.", weight: 7, icon: "Camera" },
    { id: "audio", title: "صدا/موسیقی ترند با پیچش شخصی", desc: "موسیقی ترند سیگنال مثبت به الگوریتم می‌فرستد؛ یک ادیت یا پیچش خلاقانه باعث ماندگاری می‌شود.", detailedDesc: "استفاده از موسیقی‌های ترند به الگوریتم اینستاگرام سیگنال مثبت می‌دهد و شانس نمایش بیشتر را افزایش می‌دهد. اما فقط استفاده از موسیقی ترند کافی نیست — باید یک ادیت خلاقانه یا پیچش شخصی اضافه کنی. مثلاً تغییرات صوتی، افکت‌های صوتی، یا ترکیب چند موسیقی. این کار باعث می‌شود ویدیوی تو از بقیه متمایز شود.", weight: 8, icon: "Music" },
    { id: "captions", title: "زیرنویس/متن روی ویدیو", desc: "بسیاری ویدیوها را بی‌صدا تماشا می‌کنند — زیرنویس خوانا نرخ completion را بالا می‌برد.", detailedDesc: "بیش از ۸۰٪ کاربران ویدیوها را بدون صدا تماشا می‌کنند. بنابراین زیرنویس یا متن روی ویدیو حیاتی است. زیرنویس باید خوانا، با فونت بزرگ، کنتراست بالا و هماهنگ با ریتم ویدیو باشد. از انیمیشن‌های ساده برای جذابیت بیشتر استفاده کن. زیرنویس باید تمام محتوای مهم را پوشش دهد تا کاربر بدون صدا هم متوجه شود.", weight: 6, icon: "Type" },
    { id: "aspect", title: "ابعاد صحیح (9:16) و کیفیت بالا", desc: "رزولوشن حداقل 1080x1920 — عنصر اصلی را در مرکز کادربندی کن.", detailedDesc: "ابعاد صحیح برای Reels اینستاگرام 9:16 (عمودی) است. رزولوشن باید حداقل 1080x1920 پیکسل باشد تا کیفیت بالا حفظ شود. عنصر اصلی ویدیو باید در مرکز کادر قرار گیرد تا در موبایل به درستی نمایش داده شود. از کراپ کردن یا تغییر نسبت تصویر خودداری کن چون کیفیت را پایین می‌آورد.", weight: 5, icon: "Monitor" },
    { id: "length", title: "طول مناسب (موجز و موثر)", desc: "10-30 ثانیه معمولاً بهترین بازخورد را دارند؛ اگر نیاز به زمان بیشتری است، آن را با ساختار قوی پشتیبانی کن.", detailedDesc: "طول بهینه برای Reels معمولاً بین ۱۰ تا ۳۰ ثانیه است. ویدیوهای کوتاه‌تر نرخ completion بالاتری دارند که برای الگوریتم مهم است. اگر محتوای تو نیاز به زمان بیشتری دارد، باید ساختار قوی داشته باشد: شروع جذاب، میانه پر از ارزش، و پایان قوی. از صحنه‌های اضافی و کش دادن بی‌دلیل پرهیز کن.", weight: 5, icon: "Clock" },
    { id: "value", title: "ارزش مشخص (آموزشی/اطلاعی/سرگرمی)", desc: "ویدیو باید به وضوح یک ارزش بدهد — آموزشی، احساسی یا سرگرم‌کننده باشد.", detailedDesc: "هر ویدیو باید یک ارزش مشخص به کاربر بدهد. این ارزش می‌تواند آموزشی (یادگیری یک مهارت)، اطلاعاتی (آگاهی از یک موضوع)، احساسی (الهام یا انگیزه)، یا سرگرم‌کننده (خنده یا تفریح) باشد. کاربر باید بعد از تماشای ویدیو احساس کند چیزی به دست آورده است. ارزش باید از همان ابتدا واضح باشد.", weight: 8, icon: "Gift" },
    { id: "story", title: "ساختار داستانی (شروع-میانه-پایان)", desc: "حتی کلیپ کوتاه هم از یک ساختار ساده سود می‌برد: معرفی مشکل، نمایش/حل و یک پایان قوی.", detailedDesc: "حتی ویدیوهای کوتاه ۱۵ ثانیه‌ای هم باید ساختار داستانی داشته باشند. ساختار ساده: شروع (معرفی مشکل یا سوال)، میانه (نمایش راه‌حل یا پاسخ)، و پایان (نتیجه یا CTA). این ساختار باعث می‌شود کاربر تا انتها بماند و احساس رضایت کند. از صحنه‌های پراکنده و بدون ساختار پرهیز کن.", weight: 6, icon: "Book" },
    { id: "cta", title: "دعوت به اقدام (CTA) طبیعی", desc: "CTA باید ساده و مرتبط باشد: ذخیره، کامنت، یا دنبال‌کردن — طوری بیان شود که مزیت آن مشخص باشد.", detailedDesc: "دعوت به اقدام یا CTA باید طبیعی، ساده و مرتبط با محتوا باشد. به جای 'لایک کن' بگو 'ذخیره کن تا بعداً استفاده کنی'. به جای 'فالو کن' بگو 'برای ترفندهای بیشتر فالو کن'. CTA باید در انتهای ویدیو و به صورت واضح بیان شود. مزیت انجام CTA را نشان بده تا کاربر انگیزه داشته باشد.", weight: 6, icon: "MousePointer" },
    { id: "engage_early", title: "درخواست تعامل در ۳-۷ ثانیه اول", desc: "یک سوال یا درخواست سریع برای کامنت/اموجی که تعامل اولیه را افزایش می‌دهد.", detailedDesc: "درخواست تعامل در ۳ تا ۷ ثانیه اول ویدیو بسیار موثر است. یک سوال ساده بپرس: 'تو هم این تجربه رو داشتی؟' یا 'کدوم رو ترجیح می‌دی؟'. این کار باعث می‌شود کاربر در همان ابتدا کامنت بگذارد یا اموجی بفرستد. تعامل اولیه سیگنال مثبت به الگوریتم می‌دهد و شانس نمایش بیشتر را افزایش می‌دهد.", weight: 7, icon: "MessageCircle" },
    { id: "hook_text", title: "متن قلاب روی فریم‌های ابتدایی", desc: "متن کوتاه، بزرگ و خوانا که مسئله یا وعده را نشان می‌دهد — برای کاربرانی که صدا خاموش است حیاتی است.", detailedDesc: "متن قلاب روی فریم‌های ابتدایی برای کاربرانی که صدا خاموش است حیاتی است. این متن باید کوتاه (۵-۱۰ کلمه)، بزرگ، خوانا و با کنتراست بالا باشد. باید مسئله اصلی یا وعده ویدیو را نشان دهد. از انیمیشن‌های ساده برای جذب توجه استفاده کن. این متن باید در ۲-۳ ثانیه اول نمایش داده شود.", weight: 5, icon: "Text" },
    { id: "loop", title: "طراحی برای لوپ و بازپخش", desc: "پایان باز یا المان‌های گرافیکی که کاربر را ترغیب به بازدید دوباره می‌کنند را در نظر بگیر.", detailedDesc: "طراحی ویدیو برای لوپ و بازپخش باعث می‌شود کاربر چند بار آن را تماشا کند. پایان ویدیو باید به گونه‌ای باشد که به راحتی به ابتدا برگردد. از المان‌های گرافیکی، انیمیشن‌های چرخشی، یا صحنه‌های تکراری استفاده کن. هر بار که کاربر ویدیو را دوباره تماشا می‌کند، engagement افزایش می‌یابد که برای الگوریتم بسیار مثبت است.", weight: 5, icon: "Repeat" },
    { id: "hashtags", title: "هشتگ هوشمند (ترند + مرتبط)", desc: "ترکیب هشتگ‌های ترند و اختصاصی — از هشتگ‌های نامربوط پرهیز کن.", detailedDesc: "استفاده از هشتگ‌های هوشمند ترکیبی از هشتگ‌های ترند (برای دیده شدن) و هشتگ‌های اختصاصی (برای برندسازی) است. از ۵-۱۰ هشتگ مرتبط استفاده کن. هشتگ‌های ترند را بررسی کن و آن‌هایی که با محتوای تو مرتبط هستند را انتخاب کن. از هشتگ‌های نامربوط یا بیش از حد عمومی پرهیز کن چون ممکن است به مخاطب اشتباه برسد.", weight: 4, icon: "Hash" },
    { id: "caption_text", title: "کپشن جذاب و کوتاه", desc: "ابتدای کپشن باید کنجکاوی ایجاد کند؛ یک CTA کوتاه در انتها قرار بده.", detailedDesc: "کپشن ویدیو باید جذاب و کوتاه باشد. ابتدای کپشن باید کنجکاوی ایجاد کند و کاربر را ترغیب به خواندن ادامه کند. از سوال، آمار جالب، یا وعده یک ارزش استفاده کن. در انتهای کپشن یک CTA کوتاه قرار بده: 'نظرت چیه؟' یا 'ذخیره کن'. از کپشن‌های طولانی و خسته‌کننده پرهیز کن. کپشن باید مکمل ویدیو باشد، نه تکرار آن.", weight: 4, icon: "PenTool" },
    { id: "post_time", title: "زمان‌بندی مناسب انتشار", desc: "با آنالیتیکس مخاطبت بهترین زمان را بیاب؛ انتشار در زمان آنلاین بودن فالورها مهم است.", detailedDesc: "زمان‌بندی انتشار بسیار مهم است. با استفاده از Insights اینستاگرام، زمان‌هایی که بیشترین فالورهای تو آنلاین هستند را پیدا کن. معمولاً صبح‌ها (۸-۱۰ صبح)، ظهر (۱۲-۲ ظهر)، و عصرها (۶-۹ شب) بهترین زمان‌ها هستند. اما این برای هر اکانت متفاوت است. در زمان آنلاین بودن مخاطب پست کن تا engagement بالاتری داشته باشی.", weight: 3, icon: "Calendar" },
    { id: "thumbnail_text", title: "متن روی کاور که کنجکاوی ایجاد کند", desc: "۲-۴ کلمه که وعده یا سوالی مطرح می‌کند و در موبایل خوانا باشد.", detailedDesc: "متن روی کاور باید بسیار کوتاه (۲-۴ کلمه)، کنجکاوی‌برانگیز و خوانا باشد. این متن باید وعده یک ارزش بدهد یا سوالی مطرح کند. مثال: 'این ترفند رو نمی‌دونی' یا '۹۰٪ اشتباه می‌کنن'. فونت باید بزرگ، واضح و با کنتراست بالا باشد تا در فید اینستاگرام به راحتی دیده شود. از متن‌های طولانی یا پیچیده پرهیز کن.", weight: 3, icon: "Type" },
    { id: "collab", title: "همکاری/دعوت از افراد مرتبط", desc: "کالاب‌ها و منشن‌ها دسترسی و احتمال وایرال شدن را افزایش می‌دهند.", detailedDesc: "همکاری با افراد مرتبط یا منشن کردن آن‌ها در ویدیو باعث می‌شود محتوای تو به مخاطبان جدید برسد. کالاب‌ها (collaborations) یکی از بهترین راه‌های رشد هستند. با افراد مرتبط با حوزه کاری تو همکاری کن، آن‌ها را در ویدیو منشن کن، یا از محتوای مشترک استفاده کن. این کار دسترسی و احتمال وایرال شدن را به طور قابل توجهی افزایش می‌دهد.", weight: 4, icon: "Users" },
    { id: "thumbnail_frame", title: "فریم کاور در ادیت برای انتخاب بهتر", desc: "در ویرایش یک فریم اختصاصی برای کاور در نظر بگیر تا هنگام آپلود گزینه‌ای حرفه‌ای داشته باشی.", detailedDesc: "هنگام ویرایش ویدیو، یک فریم اختصاصی برای کاور در نظر بگیر. این فریم باید واضح، جذاب و نمایانگر محتوای ویدیو باشد. با این کار هنگام آپلود در اینستاگرام، گزینه‌ای حرفه‌ای برای کاور خواهی داشت. فریم کاور باید با متن روی آن هماهنگ باشد و در فید اینستاگرام متمایز شود.", weight: 2, icon: "Frame" },
    { id: "analytics", title: "بررسی آنالیتیکس و تست A/B", desc: "پس از انتشار retention، saves و shares را بررسی کن و بر اساس داده A/B تست انجام بده.", detailedDesc: "بعد از انتشار هر ویدیو، آنالیتیکس را بررسی کن. به retention rate (نرخ ماندگاری)، saves (ذخیره‌ها)، shares (اشتراک‌گذاری‌ها)، و comments (کامنت‌ها) توجه کن. این داده‌ها به تو می‌گویند چه چیزی کار می‌کند و چه چیزی نه. بر اساس این داده‌ها تست A/B انجام بده: کاورهای مختلف، کپشن‌های مختلف، یا زمان‌های انتشار مختلف را تست کن.", weight: 5, icon: "BarChart" },
    { id: "consistency", title: "ثبات در انتشار (تقویم محتوا)", desc: "ثبات نشان‌دهنده تعهد است؛ یک ریتم منطقی تعیین کن ولی کیفیت را قربانی نکن.", detailedDesc: "ثبات در انتشار بسیار مهم است. الگوریتم اینستاگرام به اکانت‌هایی که به طور منظم محتوا منتشر می‌کنند بیشتر توجه می‌کند. یک تقویم محتوا برای خودت تعیین کن (مثلاً ۳ بار در هفته) و به آن پایبند باش. اما هرگز کیفیت را قربانی کمیت نکن. بهتر است کمتر پست کنی اما با کیفیت بالا، تا اینکه هر روز پست کنی اما با کیفیت پایین.", weight: 4, icon: "Repeat2" },
    { id: "trend_twist", title: "ترند + زاویه اوریجینال", desc: "ترندها را دنبال کن اما با زاویه‌ای جدید تا از جمع متمایز شوی.", detailedDesc: "دنبال کردن ترندها خوب است، اما باید با زاویه‌ای جدید و اوریجینال باشد. به جای کپی کردن دقیق ترند، آن را با سبک و دیدگاه شخصی خودت ترکیب کن. یک زاویه جدید پیدا کن که دیگران ندیده‌اند. این کار باعث می‌شود محتوای تو از بقیه متمایز شود و بیشتر دیده شود. ترند + خلاقیت شخصی = موفقیت.", weight: 6, icon: "TrendingUp" },
    { id: "engage_reply", title: "پاسخ‌گویی به کامنت‌ها در ۱۲-۲۴ ساعت", desc: "تعامل اولیه با کامنت‌ها سیگنال مثبت به الگوریتم ارسال می‌کند.", detailedDesc: "پاسخ‌گویی سریع به کامنت‌ها (در ۱۲-۲۴ ساعت اول) بسیار مهم است. این کار به الگوریتم اینستاگرام نشان می‌دهد که تو فعال هستی و با مخاطبانت تعامل داری. هر کامنت را شخصی‌سازی کن و به صورت واقعی پاسخ بده. از پاسخ‌های کپی-پیست شده پرهیز کن. تعامل با کامنت‌ها باعث می‌شود ویدیوی تو بیشتر دیده شود و در فید کاربران بیشتر نمایش داده شود.", weight: 4, icon: "Reply" },
    { id: "crosspost", title: "اشتراک‌گذاری در استوری و پلتفرم‌های دیگر", desc: "استفاده از استوری و تیزرهای کراس‌پلتفرم سیگنال تعامل را تقویت می‌کند.", detailedDesc: "بعد از انتشار Reel، آن را در استوری خودت به اشتراک بگذار تا بیشتر دیده شود. همچنین می‌توانی تیزرهای کوتاه از Reel را در استوری قرار دهی تا کنجکاوی ایجاد کنی. استفاده از پلتفرم‌های دیگر (مثل TikTok، YouTube Shorts) نیز می‌تواند مفید باشد، اما محتوا را برای هر پلتفرم بهینه کن. این کار باعث می‌شود دسترسی و engagement افزایش یابد.", weight: 3, icon: "Share2" }
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
  const [showResults, setShowResults] = useState(false);
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
  function generateRecommendations() {
    const unchecked = ITEMS.filter(it => !checked[it.id])
      .sort((a, b) => b.weight - a.weight);
    
    const recommendations = [];
    
    // توصیه‌های بر اساس آیتم‌های انتخاب نشده با وزن بالا
    const highPriority = unchecked.filter(it => it.weight >= 7);
    if (highPriority.length > 0) {
      recommendations.push({
        type: "critical",
        title: "اولویت‌های مهم",
        items: highPriority.slice(0, 3).map(it => ({
          title: it.title,
          weight: it.weight,
          suggestion: getSuggestion(it.id)
        }))
      });
    }
    
    // توصیه‌های بر اساس دسته‌بندی
    const categories = {
      start: unchecked.filter(it => ["hook", "first-frame", "hook_text"].includes(it.id)),
      content: unchecked.filter(it => ["value", "story", "length"].includes(it.id)),
      engagement: unchecked.filter(it => ["engage_early", "cta", "engage_reply"].includes(it.id)),
      technical: unchecked.filter(it => ["audio", "captions", "aspect"].includes(it.id)),
      optimization: unchecked.filter(it => ["hashtags", "caption_text", "post_time", "analytics"].includes(it.id))
    };
    
    Object.entries(categories).forEach(([cat, items]) => {
      if (items.length > 0) {
        const catName = {
          start: "شروع ویدیو",
          content: "محتوای ویدیو",
          engagement: "تعامل با مخاطب",
          technical: "جنبه‌های فنی",
          optimization: "بهینه‌سازی"
        }[cat];
        
        recommendations.push({
          type: "category",
          title: catName,
          items: items.slice(0, 2).map(it => ({
            title: it.title,
            weight: it.weight,
            suggestion: getSuggestion(it.id)
          }))
        });
      }
    });
    
    return recommendations.slice(0, 4); // حداکثر ۴ دسته توصیه
  }
  
  function getSuggestion(id) {
    const suggestions = {
      hook: "یک سوال جذاب یا صحنه تعجب‌آور در ۳ ثانیه اول قرار بده. این مهم‌ترین بخش ویدیوی توست!",
      cover: "یک کاور حرفه‌ای با متن کوتاه و خوانا طراحی کن. این اولین چیزی است که کاربر می‌بیند.",
      "first-frame": "فریم اول را قوی و چشم‌گیر کن تا کاربر را متوقف کند.",
      audio: "از موسیقی ترند استفاده کن اما با یک پیچش خلاقانه شخصی.",
      captions: "زیرنویس واضح و خوانا اضافه کن. ۸۰٪ کاربران بدون صدا تماشا می‌کنند.",
      aspect: "مطمئن شو ابعاد 9:16 و کیفیت حداقل 1080x1920 است.",
      length: "طول ویدیو را بین ۱۰-۳۰ ثانیه نگه دار برای بهترین نتیجه.",
      value: "مطمئن شو ویدیو یک ارزش مشخص (آموزشی، احساسی یا سرگرم‌کننده) دارد.",
      story: "یک ساختار داستانی ساده داشته باش: شروع، میانه، پایان.",
      cta: "در انتها یک CTA طبیعی و واضح قرار بده.",
      engage_early: "در ۳-۷ ثانیه اول یک سوال بپرس تا تعامل اولیه ایجاد شود.",
      hook_text: "متن قلاب بزرگ و خوانا روی فریم‌های ابتدایی قرار بده.",
      loop: "ویدیو را طوری طراحی کن که برای بازپخش مناسب باشد.",
      hashtags: "از ۵-۱۰ هشتگ ترند و مرتبط استفاده کن.",
      caption_text: "کپشن جذاب و کوتاه بنویس که کنجکاوی ایجاد کند.",
      post_time: "در زمان آنلاین بودن بیشترین فالورهایت پست کن.",
      thumbnail_text: "متن کوتاه ۲-۴ کلمه‌ای روی کاور که کنجکاوی ایجاد کند.",
      collab: "با افراد مرتبط همکاری کن یا آن‌ها را منشن کن.",
      thumbnail_frame: "یک فریم اختصاصی برای کاور در ادیت در نظر بگیر.",
      analytics: "بعد از انتشار آنالیتیکس را بررسی کن و تست A/B انجام بده.",
      consistency: "یک تقویم محتوا تعیین کن و به آن پایبند باش.",
      trend_twist: "ترندها را دنبال کن اما با زاویه اوریجینال.",
      engage_reply: "به کامنت‌ها در ۱۲-۲۴ ساعت اول پاسخ بده.",
      crosspost: "ویدیو را در استوری به اشتراک بگذار و در پلتفرم‌های دیگر هم منتشر کن."
    };
    return suggestions[id] || "این مورد را بررسی و بهبود بده.";
  }
  
  if (showResults) {
    return <ResultsPage percent={percent} recommendations={generateRecommendations()} onBack={() => setShowResults(false)} />;
  }
  
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
                <button onClick={() => setShowResults(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:from-indigo-500 hover:to-purple-500 text-sm font-semibold transition-all">
                  <Target className="w-4 h-4" /> بررسی نهایی
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
          <div className="p-3 bg-indigo-800/30 rounded-md text-xs text-gray-200 border border-indigo-500/20">{item.detailedDesc || item.desc}</div>
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
function ResultsPage({ percent, recommendations, onBack }) {
  const getStatusText = () => {
    if (percent >= 80) return { text: "عالی! 🎉", desc: "ویدیوی تو آماده انتشار است. فقط چند نکته کوچک را بررسی کن.", color: "text-green-400" };
    if (percent >= 60) return { text: "خوب 👍", desc: "ویدیوی تو در مسیر درستی است. با رعایت توصیه‌ها می‌توانی آن را بهتر کنی.", color: "text-blue-400" };
    if (percent >= 40) return { text: "متوسط ⚠️", desc: "ویدیوی تو نیاز به بهبود دارد. توصیه‌های زیر را جدی بگیر.", color: "text-yellow-400" };
    return { text: "نیازمند تمرکز 🔴", desc: "ویدیوی تو نیاز به کار بیشتری دارد. توصیه‌های زیر را اولویت بده.", color: "text-red-400" };
  };
  
  const status = getStatusText();
  
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] pt-8 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-indigo-900/50 text-gray-200 rounded-lg shadow-sm hover:bg-indigo-800/50 text-sm border border-indigo-500/20">
          <ArrowLeft className="w-4 h-4" /> بازگشت به چک‌لیست
        </button>
        
        <div className="bg-gradient-to-br from-indigo-900/50 to-indigo-700/30 border border-indigo-500/20 rounded-2xl p-8 shadow-lg backdrop-blur-md mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-white mb-2">نتایج بررسی نهایی</h1>
              <p className="text-gray-300 mb-4">{status.desc}</p>
              <div className={`text-2xl font-bold ${status.color} flex items-center gap-2`}>
                <Sparkles className="w-6 h-6" />
                وضعیت: {status.text}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32">
                <ProgressRing percent={percent} size={128} stroke={8} />
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-300">امتیاز وایرال</div>
                <div className="text-3xl font-bold text-white">{percent}%</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-400" />
            توصیه‌های هوشمند برای بهبود محتوا
          </h2>
          
          {recommendations.length === 0 ? (
            <div className="bg-gradient-to-br from-green-900/50 to-green-700/30 border border-green-500/20 rounded-2xl p-6 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">تبریک! 🎉</h3>
              </div>
              <p className="text-gray-200">همه موارد مهم را رعایت کرده‌ای! ویدیوی تو آماده انتشار است.</p>
            </div>
          ) : (
            recommendations.map((rec, idx) => (
              <div key={idx} className="bg-gradient-to-br from-indigo-900/50 to-indigo-700/30 border border-indigo-500/20 rounded-2xl p-6 shadow-lg backdrop-blur-md">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  {rec.type === "critical" && <span className="text-red-400">🔴</span>}
                  {rec.type === "category" && <span className="text-blue-400">📋</span>}
                  {rec.title}
                </h3>
                <div className="space-y-4">
                  {rec.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-500/20">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-semibold text-white flex-1">{item.title}</h4>
                        <span className="text-xs bg-indigo-600/50 text-indigo-200 px-2 py-1 rounded">وزن: {item.weight}</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{item.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-8 bg-gradient-to-br from-purple-900/50 to-purple-700/30 border border-purple-500/20 rounded-2xl p-6 shadow-lg backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-purple-400" />
            نکته مهم
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            این توصیه‌ها بر اساس مواردی که انتخاب نکرده‌ای و وزن اهمیت آن‌ها تولید شده‌اند. 
            سعی کن اولویت‌های مهم (با وزن بالا) را ابتدا رعایت کنی. هرچه بیشتر این موارد را رعایت کنی، 
            شانس وایرال شدن ویدیوی تو بیشتر می‌شود.
          </p>
        </div>
      </div>
    </div>
  );
}