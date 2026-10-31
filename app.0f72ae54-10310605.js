(function () {
  'use strict';

  /* ================= language: Arabic / English ================= */
  var LANG = 'ar';
  try { LANG = localStorage.getItem('bekam-lang') === 'en' ? 'en' : 'ar'; } catch (e) {}
  var I18N = {"الوحدة دي؟": "is this unit?", "البيت ده؟": "is this home?", "ابحث باسم المطور": "Search by developer name", "مطور": "developers", "ابدأ هنا": "Start", "ميزانيتك": "Budget", "استلام فوري": "Ready to move", "تقسيط": "Installments", "بيع وحدتك": "Sell yours", "مستشار بكام": "Bekam advisor", "أقسام بكام": "Bekam sections", "معايا ميزانية": "I have a budget", "وريني اللي على قدها": "Show me what fits", "عايز منطقة معيّنة": "A specific area", "زايد، أكتوبر، الساحل…": "Zayed, October, the Coast…", "عايز أستلم على طول": "Move in now", "وحدات استلام فوري": "Ready-to-move units", "عايز تقسيط": "Installments", "أقل مقدم وأقل قسط": "Lowest down payment & installment", "حسب الميزانية": "By budget", "ميزانيتك كام؟": "What's your budget?", "اختار الرينج اللي يناسبك وشوف كام وحدة متاحة فيه دلوقتي.": "Pick your range and see how many units are available now.", "لحد 3 مليون": "Up to 3M", "لحد 10 مليون": "Up to 10M", "لحد 20 مليون": "Up to 20M", "وحدة للبيع": "units for sale", "حسب المنطقة": "By area", "عايز تسكن فين؟": "Where do you want to live?", "المناطق قدامك على الخريطة بعدد الوحدات. دوس على المنطقة تشوف وحداتها.": "The areas are on the map with their unit counts. Tap an area to see its units.", "المشروعات على الخريطة": "Projects on the map", "استلم على طول": "Move in now", "جاهزة للسكن النهارده": "Ready to live in today", "وحدات متشطبة وجاهزة للاستلام، من غير ما تستنى سنين.": "Finished units ready to move in — no waiting for years.", "كل وحدات الاستلام الفوري": "All ready-to-move units", "وحدة استلام فوري متاحة دلوقتي": "ready-to-move units available now", "شوفهم كلهم ←": "See them all →", "أرخص واحدة:": "Cheapest:", "أقل مقدم": "Lowest down payment", "ادفع على راحتك": "Pay at your pace", "وحدات ريسيل بمقدم وأقساط، مترتبة من أقل مقدم.": "Resale units with down payment and installments, sorted by lowest down payment.", "رتّب بأقل قسط": "Sort by lowest installment", "أقل مقدم متاح دلوقتي": "Lowest down payment available now", "عايز تأجّر؟": "Looking to rent?", "شقق وفيلات وشاليهات للإيجار، بالسعر الشهري.": "Apartments, villas and chalets for rent, with monthly prices.", "كل وحدات الإيجار": "All rental units", "عليها طلب": "In demand", "المشروعات اللي الكل بيسأل عليها": "The projects everyone asks about", "أكتر المشروعات اللي فيها وحدات متاحة عندنا دلوقتي.": "The projects with the most available units right now.", "كل المشروعات": "All projects", "أسماء تثق فيها": "Names you trust", "حسب عدد الوحدات المتاحة. دوس على أي مطور تشوف مشروعاته ووحداته.": "By number of available units. Tap a developer to see its projects and units.", "كل المطورين": "All developers", "لأصحاب الوحدات": "For owners", "ضيف وحدتك": "Add your unit", "الصور والسعر والتفاصيل في دقيقتين.": "Photos, price and details in two minutes.", "بنراجعها وننزّلها": "We review and publish it", "فريق بكام بيتأكد من البيانات وينشرها.": "The Bekam team checks the details and publishes it.", "بيوصلك المهتمين": "Buyers reach you", "عروض أسعار وطلبات معاينة على واتساب.": "Price offers and viewing requests on WhatsApp.", "مفيش وحدات دلوقتي.": "No units right now.", "الصفحة اللي قبل": "Previous page", "اسحب يمين وشمال تشوف الأقسام": "Swipe left and right to see the sections", "الصفحة اللي بعد": "Next page", "الرئيسية": "Home", "للبيع": "For sale", "للإيجار": "For rent", "المشروعات": "Projects", "المطورين": "Developers", "اعرض وحدتك": "List your unit", "تواصل": "Contact", "المفضلة": "Favorites", "الإشعارات": "Notifications", "تسجيل الدخول": "Log in", "تسجيل الخروج": "Log out", "حسابي": "My account", "وحداتي": "My units", "طلب خاص": "Special request", "تنبيهاتي": "My alerts", "المقارنة": "Compare", "شارك بكام مع صحابك": "Share Bekam with friends", "القائمة الرئيسية": "Main menu", "أهلاً": "Hi", "بكام": "Bekam", "بكام؟": "Bekam?", "بكام —": "Bekam —", "واتساب": "WhatsApp", "اتصال": "Call", "مكالمة": "Call", "قارن": "Compare", "في المقارنة": "In comparison", "قارن الوحدات": "Compare units", "امسح المقارنة": "Clear comparison", "دليلك لأسعار العقارات": "Your guide to property prices", "بكام؟ — دليلك لأسعار العقارات": "Bekam? — Your guide to property prices", "بكام — دليلك لأسعار العقارات": "Bekam — Your guide to property prices", "بكام — الوحدات": "Bekam — Units", "بكام — المفضلة": "Bekam — Favorites", "بكام — اعرض وحدتك": "Bekam — List your unit", "بكام — عدّل وحدتك": "Bekam — Edit your unit", "بكام — وحداتي": "Bekam — My units", "بكام — المطورين": "Bekam — Developers", "بكام — المشروعات": "Bekam — Projects", "بكام — طلب خاص": "Bekam — Special request", "بكام — الإشعارات": "Bekam — Notifications", "بكام — حسابي": "Bekam — My account", "بكام — قارن الوحدات": "Bekam — Compare units", "بكام — تنبيهاتي": "Bekam — My alerts", "كل وحدة عليها سؤال واحد:": "Every property has one question:", "أسعار حقيقية لوحدات ريسيل وإيجار في أهم كمبوندات مصر، ومستشار معاك لحد التعاقد.": "Real prices for resale and rental units in Egypt's top compounds, with an advisor by your side until you sign.", "وحدة ريسيل وإيجار في": "resale & rental units in", "مشروع لـ": "projects by", "مطور. أسعار حقيقية ومستشار معاك لحد التعاقد.": "developers. Real prices and an advisor with you until you sign.", "نوع البحث": "Search type", "المنطقة": "Area", "النوع": "Type", "لحد": "Up to", "ابحث": "Search", "كل المناطق": "All areas", "أي ميزانية": "Any budget", "5 مليون": "5M", "10 مليون": "10M", "20 مليون": "20M", "30 مليون": "30M", "كمان:": "More:", "خريطة المناطق: دوس على منطقة تشوف وحداتها": "Areas map: tap an area to see its units", "أرقام بكام": "Bekam in numbers", "وحدة متاحة": "available units", "وحدة للبيع": "units for sale", "وحدة للإيجار": "units for rent", "مطور": "developers", "عروض اليوم": "Today's offers", "عروض خاصة من المطورين وملاك الوحدات": "Special offers from developers and owners", "دوّر حسب المنطقة": "Browse by area", "عدد الوحدات المتاحة دلوقتي في كل منطقة": "Units available now in each area", "كل الوحدات ←": "All units →", "وحدات اتحدّثت قريب": "Recently updated units", "الأسعار من فريق بكام مباشرة": "Prices straight from the Bekam team", "شوف كل الوحدات": "See all units", "شوف كل الوحدات (": "See all units (", "أكبر المطورين عندنا": "Top developers", "حسب عدد الوحدات المتاحة": "By number of available units", "كل المطورين ←": "All developers →", "مشروعات عليها طلب": "Projects in demand", "كل المشروعات ←": "All projects →", "شوف بكام": "Watch Bekam", "بتدوّر على وحدة معيّنة ومش لاقيها؟": "Looking for something specific and can't find it?", "بالمواصفات والميزانية، وفريق بكام هيدوّرلك ويكلمك.": "with your specs and budget, and the Bekam team will search and call you.", "اعمل": "Make a", "اعمل طلب خاص": "Make a special request", "إزاي بنشتغل": "How it works", "مش لاقي اللي بتدوّر عليه؟": "Can't find what you're looking for?", "قولنا بكام معاك.": "Tell us your budget.", "سيب رقمك ومستشار بكام هيبعتلك الوحدات اللي تناسب ميزانيتك.": "Leave your number and a Bekam advisor will send you units that fit your budget.", "مول العرب — بوابة 5 — G11": "Mall of Arabia — Gate 5 — G11", "كلّموني": "Call me", "عندك وحدة للبيع أو الإيجار؟": "Have a unit for sale or rent?", "اعرضها ببلاش على بكام، وهتظهر على الموقع والأبلكيشن.": "List it free on Bekam — it shows on the website and the app.", "نزّل أبلكيشن بكام": "Get the Bekam app", "المفضلة، وإشعارات بالعروض الجديدة، واعرض وحدتك من موبايلك.": "Favorites, alerts for new offers, and list your unit from your phone.", "تصفّح": "Browse", "خدمات": "Services", "دليلك لأسعار العقارات: أسعار حقيقية لوحدات ريسيل وإيجار في أهم كمبوندات مصر. منصة من Triple A Properties.": "Your guide to property prices: real prices for resale and rental units in Egypt's top compounds. A Triple A Properties platform.", "فلتر بالمنطقة والنوع والميزانية وعدد الغرف.": "Filter by area, type, budget and bedrooms.", "بيراجع معاك السعر وخطة السداد وبيرتب المعاينة لحد التعاقد.": "Reviews the price and payment plan with you and arranges viewings until you sign.", "اسمك ورقمك بس، والطلب بيوصل لفريق بكام على طول.": "Just your name and number — the request goes straight to the Bekam team.", "مستشار بكام يكلمك": "A Bekam advisor calls you", "مشروع، مطور، أو منطقة": "Project, developer or area", "الكل": "All", "أي سعر": "Any price", "الغرف": "Beds", "أي عدد": "Any", "ترتيب": "Sort", "الأحدث": "Newest", "الأرخص الأول": "Lowest price", "الأغلى الأول": "Highest price", "الأكبر مساحة": "Largest", "الأعلى تقييم": "Top rated", "المتميز الأول": "Featured first", "أقل مقدم": "Lowest down payment", "أقل قسط": "Lowest installment", "فلاتر أكتر": "More filters", "مسح الفلاتر": "Clear filters", "نبّهني بالجديد": "Alert me of new units", "هنبعتلك إشعار أول ما تنزل وحدة جديدة بنفس الفلاتر": "We'll notify you as soon as a new unit matches these filters", "المساحة من (م²)": "Size from (m²)", "المساحة لحد (م²)": "Size up to (m²)", "الحمامات": "Bathrooms", "التشطيب": "Finishing", "الاستلام": "Delivery", "المطور": "Developer", "المشروع": "Project", "نوع الإعلان": "Listing type", "متميز و أكثر تميز": "Featured & premium", "متميز بس": "Featured only", "المقدم لحد (ج.م)": "Down payment up to (EGP)", "القسط الشهري لحد (ج.م)": "Monthly installment up to (EGP)", "مثلاً 2,000,000": "e.g. 2,000,000", "مثلاً 50,000": "e.g. 50,000", "المميزات": "Amenities", "طبّق الفلاتر": "Apply filters", "امسح": "Clear", "وحدات للبيع": "Units for sale", "وحدات للإيجار": "Units for rent", "اعرض أكتر": "Show more", "مفيش وحدات بالفلاتر دي. جرّب تشيل فلتر أو تكلّمنا ونلاقيلك.": "No units match these filters. Remove a filter or contact us and we'll find one.", "النتايج": "Results", "ريسيل": "For sale", "اتباعت": "Sold", "محجوزة": "On hold", "الدعم": "Support", "كلّم الدعم": "Contact support", "الـ CRM": "CRM", "إيجار": "Rent", "متميز": "Featured", "أكثر تميز": "Premium", "أضف للمفضلة": "Add to favorites", "صورة الوحدة قريب": "Photo coming soon", "الصورة مش متاحة": "Photo unavailable", "السعر عند الطلب": "Price on request", "غرف": "beds", "حمام": "baths", "م²": "m²", "ج.م": "EGP", "ج": "EGP", "ج / شهر": "EGP / month", "ج / م²": "EGP / m²", "ج/شهر": "EGP/mo", "/شهر": "/mo", "مقدم": "Down", "قسط ~": "Installment ~", "مليون": "M", "في": "in", "وحدة": "units", "مشروع": "projects", "من": "from", "· من": "· from", "· يبدأ من": "· from", "يبدأ من": "from", "مسار الصفحة": "Breadcrumb", "كل الصور (": "All photos (", "مشاركة": "Share", "ابعتها واتساب": "Send on WhatsApp", "انسخ اللينك": "Copy link", "اتنسخ اللينك": "Link copied", "انسخ:": "Copy:", "المساحة": "Size", "غرف النوم": "Bedrooms", "الدور": "Floor", "خطة السداد": "Payment plan", "المقدم / المدفوع": "Down payment / paid", "الباقي": "Remaining", "القسط ربع السنوي": "Quarterly installment", "الأرقام تقريبية، ومستشار بكام هيأكدها معاك.": "Figures are approximate; a Bekam advisor will confirm them with you.", "عن الوحدة": "About the unit", "عن مشروع": "About project", "وحدة متاحة في": "units available in", "منها في": "of them in", "السعر الإجمالي": "Total price", "الإيجار الشهري": "Monthly rent", "حوالي": "about", "ج.م للمتر": "EGP per m²", "الاسم": "Name", "اسمك بالكامل": "Your full name", "الموبايل": "Mobile", "تحب نكلمك إزاي": "How should we contact you", "اطلب تفاصيل أو معاينة": "Request details or a viewing", "أو كلّم فريق بكام:": "Or contact the Bekam team:", "وحدات قريبة في السعر": "Similar priced units", "الوحدة دي مش متاحة": "This unit is not available", "ممكن تكون اتباعت أو اتشالت.": "It may have been sold or removed.", "شوف وحدات تانية": "See other units", "أو كلّمنا على": "or call us on", "بنحمّل الوحدة…": "Loading unit…", "اتشافت": "Viewed", "مرة": "times", "التقييم": "Rating", "من 5": "of 5", "تقييم)": "ratings)", "لسه محدش قيّمها": "Not rated yet", "قيّم الوحدة": "Rate this unit", "تقييمك": "Your rating", "من 5. تقدر تغيّره.": "of 5. You can change it.", "دوس على النجوم.": "Tap the stars.", "سجّل دخول عشان تقيّم.": "Log in to rate.", "شكراً على تقييمك": "Thanks for rating", "سجّل دخول عشان تقيّم": "Log in to rate", "التقييم متسجلش، جرّب تاني": "Rating not saved, try again", "احسب القسط": "Installment calculator", "القسط المسجل للوحدة:": "Listed installment:", "ج كل 3 شهور (حوالي": "EGP every 3 months (about", "ج في الشهر).": "EGP a month).", "السعر (ج.م)": "Price (EGP)", "المقدم (ج.م)": "Down payment (EGP)", "عدد السنين:": "Years:", "القسط الشهري": "Monthly installment", "كل 3 شهور": "Every 3 months", "نسبة المقدم": "Down payment %", "حسبة تقريبية من غير فوايد. خطة السداد الفعلية بيأكدها مستشار بكام أو المطور.": "Rough estimate without interest. The actual payment plan is confirmed by a Bekam advisor or the developer.", "الموقع": "Location", "افتح في خرائط جوجل": "Open in Google Maps", "على الخريطة": "on the map", "كلّم": "Contact", "مباشرة": "directly", "مستشار بكام المسؤول عن الوحدة": "the Bekam advisor for this unit", "صاحب الإعلان": "the owner", "فريق بكام": "the Bekam team", "هتحتاج تسجّل دخول عشان الرقم يظهر": "You'll need to log in to see the number", "سجّل دخول الأول عشان تتواصل مباشرة": "Log in first to contact directly", "محاولات كتير، استنى شوية": "Too many attempts, wait a bit", "مقدرناش نجيب الرقم، كلّم فريق بكام على": "Couldn't get the number, call the Bekam team on", "أهلاً، شفت الوحدة دي على بكام وعايز أسأل عليها:": "Hi, I saw this unit on Bekam and want to ask about it:", "أهلاً بكام، عايز أسأل عن الوحدة دي:": "Hi Bekam, I'd like to ask about this unit:", "أهلاً بكام، عايز أعرف تفاصيل مشروع": "Hi Bekam, I'd like details about project", "اسأل على المشروع واتساب": "Ask about the project on WhatsApp", "ابعته واتساب": "Send on WhatsApp", "كل مشروعات": "All projects by", "عن المشروع": "About the project", "الوحدات المتاحة في": "Units available in", "وحدات متاحة": "Available units", "أقل سعر ريسيل": "Lowest resale price", "أعلى سعر": "Highest price", "مفيش وحدات متاحة دلوقتي.": "No units available right now.", "مفيش وحدات متاحة دلوقتي": "No units available right now", "وهنكلمك أول ما يتوفر.": "and we'll call you when one is available.", "المشروع ده مش موجود": "Project not found", "المطور ده مش موجود": "Developer not found", "مفيش مشروعات مسجلة.": "No projects listed.", "كل وحدات": "All units by", "ابحث باسم المطور": "Search by developer name", "ابحث باسم المشروع أو المطور": "Search by project or developer", "مفيش مطور بالاسم ده.": "No developer with that name.", "مفيش مشروع بالاسم ده.": "No project with that name.", "مشروع فيه وحدات متاحة": "projects with available units", "طريقة العرض": "View", "قايمة": "List", "خريطة": "Map", "مشروع على الخريطة. المشروعات اللي ملهاش موقع بتظهر في القايمة بس.": "projects on the map. Projects without a location only appear in the list.", "لسه مفيش مشروعات متحدد مكانها على الخريطة.": "No projects have a location on the map yet.", "افتح أي مشروع ودوس «حدّد موقع المشروع».": "Open any project and click “Set project location”.", "الخريطة مش راضية تحمّل دلوقتي.": "The map won't load right now.", "الخريطة مش راضية تحمّل.": "The map won't load.", "افتح المشروع": "Open project", "لفريق بكام:": "Bekam team:", "حدّد": "Set", "غيّر": "Change", "موقع المشروع": "project location", "الصق لينك من خرائط جوجل أو الإحداثيات (مثلاً 30.0123, 31.4567)، أو افتح الخريطة ودوس على مكان المشروع.": "Paste a Google Maps link or coordinates (e.g. 30.0123, 31.4567), or open the map and click the project's spot.", "احفظ": "Save", "اختار من الخريطة": "Pick on map", "امسح الموقع": "Remove location", "موقع المشروع اتحفظ": "Project location saved", "الموقع اتمسح": "Location removed", "الخاصية دي لفريق بكام بس.": "This is for the Bekam team only.", "محفظش، جرّب تاني.": "Not saved, try again.", "الموقع ده برّه مصر. اتأكد من الإحداثيات.": "That location is outside Egypt. Check the coordinates.", "مش عارف أقرا الموقع. الصق الإحداثيات زي 30.0123, 31.4567 أو لينك فيه @30.01,31.45": "Couldn't read the location. Paste coordinates like 30.0123, 31.4567 or a link containing @30.01,31.45", "لحد 3 وحدات جنب بعض. الأخضر هو الأحسن في كل سطر.": "Up to 3 units side by side. Green is the best in each row.", "مفيش وحدات في المقارنة": "No units to compare", "دوس «قارن» على أي وحدة، لحد 3 وحدات.": "Click “Compare” on any unit, up to 3 units.", "شوف الوحدات": "See units", "الوحدة": "Unit", "السعر": "Price", "سعر المتر": "Price per m²", "القسط الشهري تقريباً": "Approx. monthly installment", "التفاصيل": "Details", "شيلها": "Remove", "تقدر تضيف": "You can add", "كمان.": "more.", "اختار من الوحدات": "Pick from units", "مقدرناش نحمّل المقارنة.": "Couldn't load the comparison.", "أقصى حاجة 3 وحدات. شيل واحدة من المقارنة الأول.": "Maximum 3 units. Remove one from the comparison first.", "اتضافت. دوس «قارن الوحدات» تحت.": "Added. Click “Compare units” below.", "اتضافت للمقارنة. ضيف وحدة كمان.": "Added to comparison. Add one more.", "أول ما تنزل وحدة جديدة بنفس المواصفات، هيجيلك إشعار هنا وعلى أبلكيشن بكام. تعمل تنبيه من صفحة الوحدات: اختار الفلاتر ودوس «نبّهني بالجديد».": "When a new unit matches, you'll get a notification here and on the Bekam app. Create an alert from the units page: pick filters and click “Alert me of new units”.", "مفيش تنبيهات لسه": "No alerts yet", "روح للوحدات، اختار الفلاتر اللي تناسبك، ودوس «نبّهني بالجديد».": "Go to units, choose your filters and click “Alert me of new units”.", "الوحدات": "Units", "سجّل دخول عشان تشوف تنبيهاتك": "Log in to see your alerts", "مقدرناش نحمّل التنبيهات.": "Couldn't load alerts.", "التنبيه اتمسح": "Alert deleted", "مقدرناش نمسحه": "Couldn't delete it", "سجّل دخول عشان نبعتلك التنبيهات": "Log in to receive alerts", "تمام! هنبعتلك أول ما تنزل وحدة زي دي": "Done! We'll notify you when a unit like this is listed", "التنبيه ده موجود عندك بالفعل": "You already have this alert", "التنبيه متحفظش، جرّب تاني": "Alert not saved, try again", "قسط لحد": "installment up to", "مقدم لحد": "down payment up to", "لسه مضفتش وحدات للمفضلة. دوس على القلب في أي وحدة عشان تحفظها هنا.": "No favorites yet. Tap the heart on any unit to save it here.", "متزامنة مع حسابك على الأبلكيشن": "Synced with your app account", "محفوظة على الجهاز ده. سجّل دخول عشان تتحفظ في حسابك.": "Saved on this device. Log in to save them to your account.", "مقدرناش نحمّل المفضلة دلوقتي.": "Couldn't load favorites right now.", "اتحفظت في المفضلة. سجّل دخول عشان تلاقيها في الأبلكيشن كمان.": "Saved to favorites. Log in to find it in the app too.", "محفظتش في حسابك، جرّب تاني": "Not saved to your account, try again", "سجّل دخول عشان تشوف إشعاراتك": "Log in to see your notifications", "مفيش إشعارات لسه.": "No notifications yet.", "أقدم": "Older", "مقدرناش نحمّل الإشعارات.": "Couldn't load notifications.", "إشعار": "Notification", "بياناتي": "My details", "الاسم الأول": "First name", "اسم العيلة": "Last name", "الإيميل": "Email", "تغيير الباسوورد": "Change password", "الباسوورد الحالي": "Current password", "الباسوورد الجديد": "New password", "أكّد الباسوورد الجديد": "Confirm new password", "غيّر الباسوورد": "Change password", "مسح الحساب": "Delete account", "هيتقفل حسابك وهتتشال وحداتك والمفضلة. مش هتقدر تدخل بنفس البيانات تاني.": "Your account will be closed and your units and favorites removed. You won't be able to log in with the same details again.", "اكتب الباسوورد للتأكيد": "Enter your password to confirm", "امسح حسابي": "Delete my account", "متأكد؟ دوس تاني للمسح": "Sure? Click again to delete", "حسابك اتمسح": "Your account was deleted", "بياناتك اتحفظت": "Your details were saved", "الباسوورد اتغيّر": "Password changed", "الباسوورد الجديد لازم 6 حروف على الأقل.": "The new password must be at least 6 characters.", "الباسوورد الجديد مش زي التأكيد.": "The new password doesn't match the confirmation.", "اكتب الباسوورد.": "Enter your password.", "اكتب رقم موبايل صحيح.": "Enter a valid mobile number.", "حصلت مشكلة. جرّب تاني.": "Something went wrong. Try again.", "سجّل دخول الأول": "Log in first", "تسجيل الدخول أو حساب جديد": "Log in or create an account", "لحظة…": "One moment…", "أهلاً بيك في بكام": "Welcome to Bekam", "اعمل حساب في بكام": "Create a Bekam account", "دخول": "Log in", "حساب جديد": "New account", "نوع الدخول": "Sign-in type", "الموبايل أو الإيميل": "Mobile or email", "الباسوورد": "Password", "الباسوورد (6 حروف على الأقل)": "Password (at least 6 characters)", "نسيت الباسوورد؟ كلّمنا واتساب ونغيّرهولك": "Forgot your password? Message us on WhatsApp and we'll reset it", "نفس حسابك على أبلكيشن بكام": "Same account as the Bekam app", "اتسجّل خروجك": "You're logged out", "قفل": "Close", "الإيميل مش صحيح": "Invalid email", "الباسوورد لازم 6 حروف على الأقل": "Password must be at least 6 characters", "رقم الموبايل مش صحيح": "Invalid mobile number", "راجع البيانات": "Check your details", "محاولات كتير. استنى شوية وجرّب تاني.": "Too many attempts. Wait a bit and try again.", "فيه مشكلة في الاتصال. جرّب تاني.": "Connection problem. Try again.", "انتهت الجلسة. سجّل دخول تاني.": "Session expired. Log in again.", "البيانات غلط. اتأكد من الإيميل أو الموبايل والباسوورد.": "Wrong details. Check your email or mobile and password.", "رقم الموبايل أو الإيميل غلط": "Wrong mobile or email", "الإيميل ده عنده حساب. سجّل دخول بيه.": "This email already has an account. Log in with it.", "الرقم ده عنده حساب. سجّل دخول بيه.": "This number already has an account. Log in with it.", "الإيميل ده مستخدم في حساب تاني": "This email is used by another account", "الرقم ده مستخدم في حساب تاني": "This number is used by another account", "اكتب رقم موبايل مصري صحيح": "Enter a valid Egyptian mobile number", "الباسوورد الحالي غلط": "Current password is wrong", "الباسوورد غلط": "Wrong password", "الباسوورد الجديد لازم يكون مختلف عن القديم": "The new password must differ from the old one", "حسابات فريق العمل بتتقفل من الـ CRM": "Staff accounts are closed from the CRM", "لازم يفضل صورة واحدة على الأقل": "At least one photo must remain", "ارفع صورة واحدة على الأقل": "Upload at least one photo", "الصور لازم تكون JPG أو PNG": "Photos must be JPG or PNG", "كل صورة لازم تكون أقل من 10 ميجا": "Each photo must be under 10MB", "الميزانية": "Budget", "لحد 5 مليون": "Up to 5M", "5 — 10 مليون": "5 — 10M", "10 — 20 مليون": "10 — 20M", "أكتر من 20 مليون": "Over 20M", "طلبك وصل": "Request received", "مستشار بكام هيكلمك على": "A Bekam advisor will call you on", "في أقرب وقت.": "shortly.", "طلب جديد": "New request", "بنبعت…": "Sending…", "حاول تاني": "Try again", "اكتب رقم موبايل صحيح، 11 رقم.": "Enter a valid 11-digit mobile number.", "بعتّ طلبات كتير ورا بعض. استنى شوية أو كلّمنا على": "You sent several requests in a row. Wait a bit or call us on", "الطلب موصلش. جرّب تاني أو كلّمنا على": "The request didn't go through. Try again or call us on", "نسخة معاينة": "Preview copy", "الطلب ده متبعتش. لما الموقع يترفع على السيرفر، الطلبات هتروح للـ CRM على طول.": "This request wasn't sent. Once the site is live, requests go straight to the CRM.", "قولنا بتدوّر على إيه بالظبط، وفريق بكام هيدوّرلك في السوق ويكلمك بالاختيارات المناسبة.": "Tell us exactly what you're looking for and the Bekam team will search the market and call you with options.", "بتدوّر على إيه؟": "What are you looking for?", "نوع الطلب": "Request type", "شراء ريسيل": "Buy resale", "من المطور": "From developer", "نوع الوحدة": "Unit type", "مطور معيّن؟": "Specific developer?", "مشروع معيّن؟": "Specific project?", "عدد الغرف": "Bedrooms", "المساحة تقريباً (م²)": "Approx. size (m²)", "الميزانية لحد (ج.م)": "Budget up to (EGP)", "المقدم المتاح (ج.م)": "Available down payment (EGP)", "تفاصيل تانية": "Other details", "مثلاً: دور أرضي بجاردن، قريب من المدارس، أقساط على 5 سنين…": "e.g. ground floor with garden, near schools, 5-year installments…", "بياناتك": "Your details", "أنا": "I am", "عميل — بدوّر على وحدة أو عايز أبيع": "Client — buying or selling a unit", "بروكر": "Broker", "سيلز": "Sales", "اكتب رقم موبايل صحيح (مصري 01x أو دولي يبدأ بـ +)": "Enter a valid mobile (Egyptian 01x or international starting with +)", "الاسم *": "Name *", "الموبايل *": "Mobile *", "ابعت الطلب": "Send request", "أي نوع": "Any type", "أي منطقة": "Any area", "أي تشطيب": "Any finishing", "أي وقت": "Any time", "اكتب اسمك.": "Enter your name.", "قولنا على الأقل نوع الوحدة أو المنطقة أو الميزانية.": "Tell us at least the unit type, area or budget.", "فريق بكام هيدوّرلك ويكلمك بالاختيارات المناسبة في أقرب وقت.": "The Bekam team will search and call you with options shortly.", "بعتّ طلبات كتير. استنى شوية أو كلّمنا على": "You sent many requests. Wait a bit or call us on", "اعرض وحدتك على بكام": "List your unit on Bekam", "عدّل وحدتك": "Edit your unit", "الوحدة هتظهر على الموقع وعلى أبلكيشن بكام بعد ما فريق بكام يراجعها، وغالباً ده بياخد أقل من يوم عمل.": "Your unit will appear on the website and the Bekam app after the Bekam team reviews it — usually within one business day.", "بعد التعديل الوحدة بترجع لفريق بكام يراجعها قبل ما تظهر تاني.": "After editing, the unit goes back to the Bekam team for review before it shows again.", "عشان نعرف نوصل لك لما حد يسأل على وحدتك.": "So we can reach you when someone asks about your unit.", "نوع العرض": "Listing type", "نوع الوحدة *": "Unit type *", "المنطقة *": "Area *", "المشروع / الكمبوند": "Project / compound", "المساحة (م²) *": "Size (m²) *", "خارج مشروع": "— Not in a compound / not sure —", "— اختار المشروع —": "— Choose project —", "اختار": "Choose", "السعر الإجمالي (ج.م) *": "Total price (EGP) *", "الإيجار الشهري (ج.م) *": "Monthly rent (EGP) *", "المدفوع / المقدم (ج.م)": "Paid / down payment (EGP)", "القسط ربع السنوي (ج.م)": "Quarterly installment (EGP)", "الصور *": "Photos *", "(لحد 15 صورة، أول صورة هي الغلاف)": "(up to 15 photos; the first is the cover)", "اختار الصور أو اسحبها هنا": "Choose photos or drag them here", "JPG أو PNG": "JPG or PNG", "الغلاف": "Cover", "شيل صورة": "Remove photo", "الوصف": "Description", "مثلاً: فيو جاردن، قريب من الكلوب هاوس، الأقساط لحد 2029…": "e.g. garden view, near the club house, installments until 2029…", "ملاحظة لفريق بكام (مش هتظهر للناس)": "Note to the Bekam team (not shown publicly)", "تفاصيل إضافية": "Additional details", "ابعت الوحدة للمراجعة": "Submit for review", "احفظ التعديلات": "Save changes", "بنرفع الصور…": "Uploading photos…", "وحدتك وصلت": "Your unit was received", "اعرض وحدة تانية": "List another unit", "+ اعرض وحدة": "+ List a unit", "الوحدة اتنشرت على الموقع والأبلكيشن.": "The unit is live on the website and the app.", "فريق بكام هيراجعها، وأول ما تتقبل هتظهر على الموقع والأبلكيشن. تقدر تتابع حالتها من صفحة \"وحداتي\".": "The Bekam team will review it; once approved it shows on the website and app. Track it from \"My units\".", "ناقص:": "Missing:", "صورة واحدة على الأقل": "at least one photo", "أقصى عدد 15 صورة": "Maximum 15 photos", "الصور حجمها كبير. قلل العدد أو الحجم.": "Photos are too large. Reduce the number or size.", "عرضت وحدات كتير في وقت قصير. جرّب بعد ساعة.": "You listed many units in a short time. Try again in an hour.", "حصلت مشكلة. جرّب تاني أو كلّمنا على": "Something went wrong. Try again or call us on", "مقدرناش نحمّل الاختيارات. اعمل refresh.": "Couldn't load options. Refresh the page.", "بنحمّل بيانات الوحدة…": "Loading unit details…", "مقدرناش نحمّل الوحدة. ارجع لـ \"وحداتي\" وجرّب تاني.": "Couldn't load the unit. Go back to \"My units\" and try again.", "التعديلات اتحفظت": "Changes saved", "التعديلات اتحفظت، والوحدة رجعت للمراجعة": "Changes saved; the unit is back under review", "الوحدات اللي عرضتها من الموقع أو من الأبلكيشن": "Units you listed from the website or the app", "سجّل دخول عشان تشوف وحداتك.": "Log in to see your units.", "لسه معرضتش وحدات.": "You haven't listed any units yet.", "اعرض أول وحدة": "List your first unit", "بنحمّل…": "Loading…", "منشورة": "Live", "تحت المراجعة": "Under review", "مرفوضة": "Rejected", "مشالة": "Removed", "افتحها": "Open", "عدّل": "Edit", "امسحها": "Delete", "متأكد؟ دوس تاني": "Sure? Click again", "اتشالت": "Removed", "مقدرناش نشيلها، جرّب تاني": "Couldn't remove it, try again", "السبب:": "Reason:", "مقدرناش نحمّل وحداتك دلوقتي.": "Couldn't load your units right now.", "مقدرناش نحمّل الوحدات دلوقتي. جرّب تاني بعد شوية، أو كلّمنا على": "Couldn't load units right now. Try again shortly, or call us on", "مقدرناش نحمّل الوحدات دلوقتي. جرّب تاني، أو كلّمنا على": "Couldn't load units right now. Try again, or call us on", "مقدرناش نحمّل الوحدات.": "Couldn't load units.", "مقدرناش نحمّل المطورين دلوقتي.": "Couldn't load developers right now.", "مقدرناش نحمّل المشروعات دلوقتي.": "Couldn't load projects right now.", "صور الوحدة": "Unit photos", "الصورة اللي قبل": "Previous photo", "الصورة اللي بعد": "Next photo", "افتح صورة": "Open photo", "صورة": "Photo", "عرض": "Offer", "كلّمنا واتساب": "Message us on WhatsApp", "عرض خاص": "Special offer", "بكام؟ — أسعار حقيقية لوحدات ريسيل وإيجار في كل مشروعات مصر": "Bekam? — Real prices for resale and rental units across Egypt", "6 أكتوبر": "6 October", "الساحل الشمالي": "North Coast", "الشيخ زايد": "Sheikh Zayed", "زايد الجديدة": "New Zayed", "القاهرة الجديدة": "New Cairo", "رأس الحكمة": "Ras El Hikma", "السخنة": "Sokhna", "العين السخنة": "Ain Sokhna", "مدينة المستقبل": "Mostakbal City", "العاصمة الإدارية": "New Capital", "أخرى": "Other", "شقة": "Apartment", "شاليه": "Chalet", "دور أرضي": "Ground floor", "دور أرضي بجاردن": "Ground floor with garden", "دوبلكس": "Duplex", "بنتهاوس": "Penthouse", "تاون هاوس": "Townhouse", "تاون هاوس كورنر": "Townhouse corner", "توين هاوس": "Twin house", "فيلا": "Villa", "فيلا مستقلة": "Standalone villa", "استوديو": "Studio", "مكتب": "Office", "لوفت": "Loft", "كابينة": "Cabin", "سكاي هاوس": "Sky house", "بيتش هاوس": "Beach house", "عيادة": "Clinic", "دوبلكس علوي": "Upper duplex", "دوبلكس أرضي": "Ground duplex", "شاليه مستقل": "Standalone chalet", "شقة فندقية": "Serviced apartment", "شاليه فندقي": "Serviced chalet", "آي فيلا جاردن": "I Villa Garden", "آي فيلا روف": "I Villa Roof", "متشطب بالكامل": "Fully finished", "نص تشطيب": "Semi finished", "على المحارة": "Core and shell", "مفروش": "Furnished", "استلام فوري": "Ready to move", "خلال سنة": "Within 1 year", "خلال سنتين": "Within 2 years", "خلال 3 سنين": "Within 3 years", "أرضي": "Ground", "روف / بنتهاوس": "Roof / penthouse", "حمام سباحة خاص": "Private pool", "حمام سباحة": "Pool", "جاردن": "Garden", "غرفة مربية": "Nanny room", "روف": "Roof", "فيو بحر": "Sea view", "فيو لاجون": "Lagoon view", "جراج": "Garage", "أسانسير": "Elevator", "أمن": "Security", "كلوب هاوس": "Club house", "جيم": "Gym", "منطقة أطفال": "Kids area", "،": ",", "؟": "?", "بحث": "Search", "اعمل حساب": "Sign up", "حمّله من": "Get it on", "حمّل أبلكيشن بكام": "Get the Bekam app"};
  (function (x) { for (var k in x) I18N[k] = x[k]; })({"ملف PDF": "PDF file", "تواصل مع المالك": "Contact the owner", "بيانات المالك": "Owner details", "اسم المالك": "Owner name", "موبايل المالك": "Owner mobile", "آخر تواصل: النهارده": "Last contact: today", "آخر تواصل: إمبارح": "Last contact: yesterday", "بنجهّز الـ PDF…": "Preparing PDF…", "سجّل دخول الأول عشان تعمل PDF للوحدة": "Log in first to export this unit as PDF", "الـ PDF ماتعملش، جرّب تاني": "PDF failed, try again", "الـ PDF جاهز ✅": "PDF ready ✅", "شاركه (واتساب وغيره)": "Share (WhatsApp and more)", "نزّل الملف": "Download file", "صورة": "Image", "وحدات مختارة ليك": "units picked for you", "مختارة ليك": "Picked for you", "من": "by", "دوس على أي وحدة تشوف صورها وتفاصيلها وخطة السداد": "Tap any unit for photos, details and the payment plan", "كلّم": "Chat with", "فريق بكام": "Bekam team", "الوحدات دي مبقتش متاحة. كلّمنا ونبعتلك اختيارات جديدة.": "These units are no longer available. Message us for new picks.", "وحدة من اللي اتبعتت مبقتش متاحة": "of the units sent are no longer available", "اللينك ده مش شغال. اتأكد منه أو كلّمنا.": "This link does not work. Check it or message us.", "قدّم عرض سعر": "Make a price offer", "قول السعر اللي تقدر تدفعه، والعرض يوصل لصاحب الوحدة على واتساب": "Name your price — the offer goes to the lister on WhatsApp", "السعر المطلوب": "Asking price", "عرضك (إجمالي السعر)": "Your offer (total price)", "عرضك (الإيجار الشهري)": "Your offer (monthly rent)", "اسمك": "Your name", "رقم موبايلك": "Your mobile", "ملاحظة (اختياري)": "Note (optional)", "مثلاً: كاش، أو محتاج تقسيط على 3 سنين": "e.g. cash, or need 3 years to pay", "ابعت العرض": "Send offer", "بنبعت…": "Sending…", "قفل": "Close", "اكتب سعر صحيح": "Enter a valid price", "اكتب اسمك ورقمك": "Enter your name and mobile", "العرض اتسجّل ✅": "Offer saved ✅", "دوس الزرار عشان تبعته لصاحب الوحدة على واتساب": "Tap the button to send it to the lister on WhatsApp", "ابعت العرض على واتساب": "Send on WhatsApp", "العرض ماتبعتش، جرّب تاني": "Offer not sent, try again", "محاولات كتير، استنى شوية": "Too many tries, wait a bit", "باسم": "As", "بنجهّز الصورة…": "Preparing image…", "سجّل دخول الأول عشان تعمل صورة للوحدة": "Log in first to export this unit as an image", "الصورة ماتعملتش، جرّب تاني": "Image failed, try again", "الصورة جاهزة ✅": "Image ready ✅", "للتفاصيل الكاملة والوصف امسح الكود": "Scan for full details & description"});
  (function (x) { for (var k in x) I18N[k] = x[k]; })({"مقارنة": "Compare", "قارن الوحدات": "Compare units", "لحد 3 وحدات جنب بعض": "Up to 3 units side by side", "قارن المشروعات": "Compare projects", "الأسعار والمقدم والاستلام": "Prices, down payment & delivery", "إجمالي سعر الوحدة": "Total unit price", "المقدم": "Down payment", "القسط": "Installment", "شهري": "Monthly", "ربع سنوي": "Quarterly", "لحد كام؟": "Up to?", "الإيجار الشهري": "Monthly rent", "نوع الوحدة": "Unit type", "المنطقة": "Area", "الاستلام": "Delivery", "بعد سنة أو أكتر": "After 1 year+", "خلال سنة": "Within a year", "خلال سنتين": "Within 2 years", "خلال 3 سنين": "Within 3 years", "خلال 4 سنين": "Within 4 years", "رجوع": "Back", "كل الوحدات المتاحة": "All available units", "المقارنة": "Compare", "لحد 3 جنب بعض. الأخضر هو الأحسن في كل سطر.": "Up to 3 side by side. Green is the best in each row.", "المشروع": "Project", "وحدات متاحة": "Available units", "أقل سعر": "Lowest price", "متوسط سعر المتر": "Avg. price per m²", "أقل مقدم": "Lowest down payment", "أقل قسط شهري": "Lowest monthly installment", "أقل إيجار": "Lowest rent", "المساحات": "Sizes", "الأنواع": "Types", "وحدات المشروع": "Project units", "شيله": "Remove", "بيع": "sale", "مفيش مشروعات في المقارنة": "No projects to compare", "دوس «قارن» على أي مشروع، لحد 3 مشروعات.": "Click “Compare” on any project, up to 3 projects.", "شوف المشروعات": "See projects", "اختار من المشروعات": "Pick from projects", "+ قارن": "+ Compare", "✓ في المقارنة": "✓ In comparison", "قارن المشروع": "Compare project", "في المقارنة ✓": "In comparison ✓", "أقصى حاجة 3 مشروعات. شيل واحد من المقارنة الأول.": "Maximum 3 projects. Remove one first.", "اتضاف. دوس «قارن المشروعات» تحت.": "Added. Click “Compare projects” below.", "اتضاف للمقارنة. ضيف مشروع كمان.": "Added to comparison. Add one more project.", "مفيش وحدات": "no units", "وحدة واحدة": "1 unit", "وحدتين": "2 units", "وحدات استلام فوري 🔑": "Ready-to-move units 🔑", "🔑 استلام فوري بس": "🔑 Ready to move only", "🔑 استلام فوري": "🔑 Ready to move", "وحدة استلام فوري متاحة": "ready-to-move units available", "سنة التأسيس": "Founded", "المقر": "HQ", "الإدارة": "Leadership", "البورصة": "Stock exchange", "بيبني في": "Builds in", "سجل المطور": "Track record", "أشهر المشروعات": "Signature projects", "آخر أخبار": "Latest news about", "على الخريطة": "on the map", "متوسط سعر المتر": "Avg. price per m²", "الموقع الرسمي": "Official website", "01x xxxx xxxx  أو  +971…": "01x xxxx xxxx  or  +971…", "وحدات": "units", "نوع المقارنة": "Comparison type", "تمام! هنبعتلك أول ما تنزل وحدة زي دي، وأصحاب الوحدات المشابهة هيعرفوا إنك مهتم": "Done! We'll notify you when a unit like this is listed, and owners of similar units will know you're interested", "🔔 هنعملك تنبيه بالطلب ده، وأول ما تنزل وحدة مناسبة هيجيلك إشعار. وبإرسالك الطلب، اسمك ورقمك هيوصلوا لأصحاب الوحدات المشابهة عشان يتواصلوا معاك.": "🔔 We'll create an alert for this request and notify you as soon as a matching unit is listed. By sending it, your name and number are shared with owners of similar units so they can contact you.", "🔔 وعملنالك تنبيه: أول ما تنزل وحدة زي اللي طالبها هيجيلك إشعار على الموقع وأبلكيشن بكام.": "🔔 We also created an alert: you'll be notified on the website and the Bekam app as soon as a matching unit is listed.", "هنبعتلك إشعار أول ما تنزل وحدة جديدة بنفس الفلاتر، واسمك ورقمك هيوصلوا لأصحاب الوحدات المشابهة": "We'll notify you when a new unit matches these filters, and your name and number go to owners of similar units", "فيلا مستقلة": "Standalone villa", "توين هاوس": "Twin house", "تاون هاوس": "Townhouse", "قسط ربع سنوي لحد": "quarterly installment up to", "الإيجار لحد": "Rent up to", "الميزانية": "Budget", "أي وقت": "Any time"});
  var AR_RE = /[\u0600-\u06FF]/;
  var I18K = Object.keys(I18N).sort(function (a, b) { return b.length - a.length; });
  var B1 = '(^|[\\s(«"\'·:،.,/\\-—~+\\d])', B2 = '(?=$|[\\s)»"\'·:،.,?!؟/\\-—\\d<])';
  var I18R = I18K.map(function (k) { return new RegExp(B1 + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + B2, 'g'); });
  function tr(s) {
    if (LANG !== 'en' || !s || !AR_RE.test(s)) return s;
    var t = s.trim();
    if (I18N[t] !== undefined) return s.replace(t, I18N[t]);
    var out = s;
    for (var i = 0; i < I18K.length; i++) {
      if (out.indexOf(I18K[i]) < 0) continue;
      var v = I18N[I18K[i]];
      out = out.replace(I18R[i], function (m, p) { return p + v; });
      if (!AR_RE.test(out)) break;
    }
    return out;
  }
  function enc(s) { return encodeURIComponent(tr(String(s))); }
  function trNode(root) {
    if (LANG !== 'en' || !root) return;
    if (root.nodeType === 3) { if (AR_RE.test(root.nodeValue) && !(root.parentNode && root.parentNode.closest && root.parentNode.closest('[translate="no"],script,style'))) { var nv = tr(root.nodeValue); if (nv !== root.nodeValue) root.nodeValue = nv; } return; }
    if (root.nodeType !== 1 || root.closest('[translate="no"]')) return;
    var els = [root].concat(Array.prototype.slice.call(root.querySelectorAll('*')));
    els.forEach(function (el) {
      if (el.dataset && el.dataset.en !== undefined) { if (el.textContent !== el.dataset.en) el.textContent = el.dataset.en; return; }
      ['placeholder', 'aria-label', 'title', 'alt'].forEach(function (a) { var v = el.getAttribute && el.getAttribute(a); if (v && AR_RE.test(v)) { var tv = tr(v); if (tv !== v) el.setAttribute(a, tv); } });
    });
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n2, list = [];
    while ((n2 = w.nextNode())) if (AR_RE.test(n2.nodeValue)) list.push(n2);
    list.forEach(function (t) { if (!(t.parentNode && t.parentNode.closest('[translate="no"],script,style'))) { var nv = tr(t.nodeValue); if (nv !== t.nodeValue) t.nodeValue = nv; } });
  }
  if (LANG === 'en') {
    document.documentElement.lang = 'en'; document.documentElement.dir = 'ltr';
    var mo = new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === 'characterData') trNode(m.target);
        else m.addedNodes.forEach(function (nd) { trNode(nd); });
      });
    });
    document.addEventListener('DOMContentLoaded', function () {}, false);
    trNode(document.body);
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    var tt = document.querySelector('title');
    if (tt) { document.title = tr(document.title); new MutationObserver(function () { if (AR_RE.test(document.title)) { var nt = tr(document.title); if (nt !== document.title) document.title = nt; } }).observe(tt, { childList: true, characterData: true, subtree: true }); }
    document.querySelectorAll('img[data-en-src]').forEach(function (im) { im.src = im.dataset.enSrc; });
    document.documentElement.classList.remove('en-pending');
  }
  var API = (window.BEKAM_API || '/api/web');
  var PHONE = '0111 355 5557';

  var CITY_AR = {
    '6 October': '6 أكتوبر', 'North Coast': 'الساحل الشمالي', 'El Sheikh Zayed': 'الشيخ زايد', 'New Zayed': 'زايد الجديدة',
    'New Cairo': 'القاهرة الجديدة', 'Ras El Hikma': 'رأس الحكمة', 'Sokhna': 'السخنة', 'Ain Sokhna': 'العين السخنة',
    'Mostakbal city': 'مدينة المستقبل', 'New Capital': 'العاصمة الإدارية', 'Other': 'أخرى'
  };
  var TYPE_AR = {
    'Apartment': 'شقة', 'Chalet': 'شاليه', 'Ground Floor': 'دور أرضي بجاردن', 'Stand Alone': 'فيلا مستقلة', 'Twin House': 'توين هاوس',
    'Penthouse': 'بنتهاوس', 'Town house middle': 'تاون هاوس', 'Town house corner': 'تاون هاوس كورنر', 'Studio': 'استوديو',
    'I Villa Garden': 'آي فيلا جاردن', 'I Villa Roof': 'آي فيلا روف', 'Loft': 'لوفت', 'Duplex': 'دوبلكس', 'Cabin': 'كابينة',
    'Sky House': 'سكاي هاوس', 'Beach House': 'بيتش هاوس', 'Office': 'مكتب', 'Upper Duplex': 'دوبلكس علوي', 'Clinic': 'عيادة',
    'Stand Alone Chalet': 'شاليه مستقل', 'Ground Duplex': 'دوبلكس أرضي', 'Service Apartment': 'شقة فندقية', 'Service Chalet': 'شاليه فندقي'
  };
  var TYPE_FILTER = [['', 'الكل'], ['Apartment', 'شقة'], ['Chalet', 'شاليه'], ['Ground Floor', 'دور أرضي'], ['Duplex', 'دوبلكس'],
    ['Penthouse', 'بنتهاوس'], ['Town house', 'تاون هاوس'], ['Twin House', 'توين هاوس'], ['Stand Alone', 'فيلا مستقلة'], ['Studio', 'استوديو'], ['Office', 'مكتب']];
  var FIN_AR = { 'Fully Finished': 'متشطب بالكامل', 'Semi Finished': 'نص تشطيب', 'Core and Shell': 'على المحارة', 'Furnished': 'مفروش' };
  var DEL_AR = { 'Ready To Move': 'استلام فوري', 'up to 1 year': 'خلال سنة', 'up to 2 year': 'خلال سنتين', 'up to 3 year': 'خلال 3 سنين', 'up to 4 year': 'خلال 4 سنين', 'later': 'بعد سنة أو أكتر' };
  if (LANG === 'en') { CITY_AR = {}; TYPE_AR = {}; FIN_AR = {}; DEL_AR = {}; }
  var LEAD_AREAS = ['El Sheikh Zayed', '6 October', 'North Coast', 'New Zayed', 'New Cairo', 'Ras El Hikma', 'Other'];

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function n(x) { return Number(x || 0).toLocaleString('en-US'); }
  function city(c) { return CITY_AR[c] || c || ''; }
  function type(t) { return TYPE_AR[t] || t || 'وحدة'; }
  // Share links go through /bekam/u/{id} so WhatsApp & Facebook show the unit's photo, title and price
  function shareLink(kind, id) {
    if (window.MOCK) return location.href.split('#')[0] + '#' + (kind === 'u' ? 'unit-' : 'project-') + id;
    // real addresses (search engines index them; WhatsApp shows the preview card)
    // always the website address: tapegypt.com links open the Bekam app on phones
    var origin = /(^|\.)tapegypt\.com$/.test(location.hostname) ? 'https://bekam.tapegypt.com' : location.origin;
    return origin + location.pathname.replace(/[^\/]*$/, '') + (kind === 'u' ? 'unit/' : 'project/') + id;
  }
  function getJSON(url) { return api(url.replace(API, '')); }

  var WA = '201113555557';
  var liked = {};
  try { liked = JSON.parse(localStorage.getItem('bekam-liked') || '{}'); } catch (e) {}
  var auth = null;
  try { auth = JSON.parse(localStorage.getItem('bekam-auth') || 'null'); } catch (e) {}
  function saveLiked() { try { localStorage.setItem('bekam-liked', JSON.stringify(liked)); } catch (e) {} updateFavCount(); }
  function saveAuth() { try { auth ? localStorage.setItem('bekam-auth', JSON.stringify(auth)) : localStorage.removeItem('bekam-auth'); } catch (e) {} }
  function api(path, opts) {
    opts = opts || {};
    var h = { Accept: 'application/json' };
    if (opts.body) h['Content-Type'] = 'application/json';
    if (auth && auth.token) h.Authorization = 'Bearer ' + auth.token;
    return fetch(API + path, { method: opts.method || 'GET', headers: h, body: opts.body ? JSON.stringify(opts.body) : undefined })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (r.status === 401 && auth && path.indexOf('/auth/') !== 0) { auth = null; saveAuth(); renderAccount(); }
          if (!r.ok) { var e = new Error(j.message || ('HTTP ' + r.status)); e.status = r.status; e.data = j; throw e; }
          return j;
        });
      });
  }
  function toast(msg) { var t = $('toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(function () { t.hidden = true; }, 2600); }
  function updateFavCount() {
    var k = Object.keys(liked).filter(function (x) { return liked[x]; }).length;
    var c = $('favCount'); if (!c) return; c.textContent = k; c.hidden = !k;
  }
  function setLikedFromServer(ids) { liked = {}; (ids || []).forEach(function (i) { liked[i] = true; }); saveLiked(); document.querySelectorAll('[data-like]').forEach(function (b) { b.setAttribute('aria-pressed', !!liked[b.dataset.like]); }); }
  function renderAccount() {
    $('accLabel').textContent = auth && auth.user ? ('أهلاً ' + (auth.user.first_name || auth.user.name || '')) : 'تسجيل الدخول';
    $('accBtn').setAttribute('aria-haspopup', auth ? 'menu' : 'dialog');
    $('bellBtn').hidden = !auth; if (!auth) $('bellCount').hidden = true;
    var gb = document.querySelector('#reqBox .guest-only'); if (gb) gb.hidden = !!auth;
    document.querySelectorAll('[data-lead] form').forEach(prefill);
  }
  function prefill(form) {
    if (!auth || !auth.user) return;
    var n = form.querySelector('input[name=name]'), ph = form.querySelector('input[name=phone]');
    if (n && !n.value) n.value = auth.user.name || '';
    if (ph && !ph.value && auth.user.phone) ph.value = String(auth.user.phone).replace(/^\+20/, '0');
  }

  var heart = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';

  function img(src, alt, cls) {
    if (!src) return '<div class="ph ' + (cls || '') + '">صورة الوحدة قريب</div>';
    return '<img class="' + (cls || '') + '" src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" onerror="this.outerHTML=\'<div class=&quot;ph ' + (cls || '') + '&quot;>الصورة مش متاحة</div>\'">';
  }

  function priceLabel(u) {
    if (!u.price) return 'السعر عند الطلب';
    return n(u.price) + (u.category === 'Rent' ? ' ج / شهر' : ' ج.م');
  }

  function card(u) {
    var specs = [u.size ? u.size + ' م²' : '', u.bedrooms ? u.bedrooms + ' غرف' : '', u.bathrooms ? u.bathrooms + ' حمام' : '', DEL_AR[u.delivery] || u.delivery || ''].filter(Boolean).join(' · ');
    return '<article class="ucard' + (u.availability === 'sold' ? ' is-sold' : '') + '">' +
      '<div class="media"><a class="media-link" href="#unit-' + u.id + '" tabindex="-1" aria-hidden="true">' + img(u.photo, type(u.type) + ' في ' + (u.project || ''), 'cover') + '</a>' +
      '<span class="badge">' + (u.category === 'Rent' ? 'إيجار' : 'للبيع') + '</span>' + licBadge(u) +
      (u.delivery === 'Ready To Move' && u.category !== 'Rent' && u.availability !== 'sold' ? '<span class="ready-tag">🔑 استلام فوري</span>' : '') +
      '<button type="button" class="heart" aria-label="أضف للمفضلة" aria-pressed="' + (!!liked[u.id]) + '" data-like="' + u.id + '">' + heart + '</button>' +
      '<span class="price-chip">' + priceLabel(u) + '</span></div>' +
      '<div class="info"><a class="t" href="#unit-' + u.id + '">' + esc(type(u.type)) + (u.project ? ' في ' + esc(u.project) : '') + '</a>' +
      '<span class="m">' + esc([u.developer, city(u.city)].filter(Boolean).join(' · ')) + '</span>' +
      '<span class="s">' + esc(specs) + '</span>' + subLine(u) + cmpBtn(u.id) + '</div></article>';
  }

  function licBadge(u) {
    if (u.availability === 'sold') return '<span class="lic lic-sold">اتباعت</span>';
    if (u.availability === 'hold') return '<span class="lic lic-hold">محجوزة</span>';
    return u.license ? '<span class="lic">' + (u.license === 'premium' ? 'أكثر تميز' : 'متميز') + '</span>' : '';
  }
  function subLine(u) {
    var parts = [];
    if (u.category !== 'Rent' && u.price && u.size) parts.push(n(Math.round(u.price / u.size)) + ' ج / م²');
    if (u.category !== 'Rent' && u.down_payment && u.down_payment < u.price) parts.push('مقدم ' + short(u.down_payment));
    if (u.category !== 'Rent' && u.quarter_installment) parts.push('قسط ~' + short(Math.round(u.quarter_installment / 3)) + '/شهر');
    return parts.length ? '<span class="sub">' + parts.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</span>' : '';
  }
  function short(v) { return v >= 1e6 ? (Math.round(v / 1e5) / 10) + ' مليون' : n(v) + ' ج'; }
  function cleanDesc(t) {
    var seen = {}, out = [];
    String(t || '').replace(/\r/g, '').split('\n').forEach(function (l) {
      l = l.replace(/[*_#•]+/g, ' ').replace(/^[\s\-–—:.]+/, '').replace(/\s+/g, ' ').trim();
      if (l.length < 2) return;
      var k = l.toLowerCase(); if (seen[k]) return; seen[k] = 1; out.push(l);
    });
    return out.slice(0, 18);
  }
  function skeleton(k) { var s = ''; for (var i = 0; i < k; i++) s += '<div class="ucard"><div class="media"><div class="ph cover"></div></div><div class="info"><span class="sk"></span><span class="sk" style="width:60%"></span></div></div>'; return s; }

  /* ---------- HOME ---------- */
  var home = null;
  function loadHome() {
    loadOffers();
    $('featured').innerHTML = skeleton(6);
    return getJSON(API + '/home').then(function (d) {
      home = d;
      var s = d.stats || {};
      $('heroLead').textContent = n(s.units) + ' وحدة ريسيل وإيجار في ' + n(s.projects) + ' مشروع لـ ' + n(s.developers) + ' مطور. أسعار حقيقية ومستشار معاك لحد التعاقد.';
      $('stats').innerHTML = [[s.units, 'وحدة متاحة', '#units', 'all'], [s.resale, 'وحدة للبيع', '#units', 'Resale'], [s.rent, 'وحدة للإيجار', '#units', 'Rent'], [s.developers, 'مطور', '#developers', '']]
        .map(function (x) { return '<a class="stat" href="' + x[2] + '"' + (x[3] ? ' data-stat="' + x[3] + '"' : '') + '><b>' + n(x[0]) + '</b><span class="muted">' + x[1] + ' ←</span></a>'; }).join('');
      $('allBtn').textContent = 'شوف كل الوحدات (' + n(s.units) + ')';
      $('areas').innerHTML = (d.areas || []).filter(function (a) { return a.city && a.city !== 'Other'; }).map(function (a) {
        return '<a class="area" href="#units" data-city="' + esc(a.city) + '"><b>' + esc(city(a.city)) + '</b><span class="muted" style="font-size:14px">' + n(a.count) + ' وحدة</span></a>';
      }).join('');
      $('featured').innerHTML = (d.featured || []).slice(0, 9).map(card).join('');
      var f0 = (d.featured || []).find(function (u) { return u.photo; });
      deckHome(d);
      $('devs').innerHTML = (d.developers || []).map(function (v) {
        var ini = (v.name || '').replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase() || '؟';
        return '<a class="dev" href="#dev-' + v.id + '"><i>' + (v.photo ? '<img src="' + esc(v.photo) + '" alt="" loading="lazy" onerror="this.replaceWith(document.createTextNode(\'' + ini + '\'))">' : ini) + '</i><b style="font-size:16px">' + esc(v.name) + '</b><span class="muted" style="font-size:14px">' + n(v.count) + '</span></a>';
      }).join('');
      $('projs').innerHTML = (d.projects || []).slice(0, 8).map(function (p) {
        return '<a class="proj" href="#project-' + p.id + '">' + img(p.photo, p.name, 'cover abs') + pcmpChip(p.id) +
          '<span class="in"><b style="font-size:20px">' + esc(p.name) + '</b><span class="muted" style="font-size:15px">' + esc([p.developer, city(p.city)].filter(Boolean).join(' · ')) + '</span><span style="font-size:15px;color:var(--blue);font-weight:700">' + n(p.count) + ' وحدة متاحة</span></span></a>';
      }).join('');
      var opts = (d.areas || []).map(function (a) { return '<option value="' + esc(a.city) + '">' + esc(city(a.city)) + '</option>'; }).join('');
      $('hCity').innerHTML = '<option value="">المنطقة</option>' + opts;
      $('fCity').innerHTML = '<option value="">الكل</option>' + opts; syncFilterUI();
    }).catch(function () {
      $('featured').innerHTML = '<div class="note" style="grid-column:1/-1;padding:24px;border-radius:20px;background:var(--soft)">مقدرناش نحمّل الوحدات دلوقتي. جرّب تاني بعد شوية، أو كلّمنا على ' + PHONE + '.</div>';
    });
  }


  /* ---------- HOME as side-by-side pages over one map ---------- */
  // icons: Phosphor Fill (MIT) — solid rounded, chosen by Asser (option D)
  var DK_ICON = {"start": "<path d=\"M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z\"/>", "budget": "<path d=\"M216,64H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,56V184a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm-36,80a12,12,0,1,1,12-12A12,12,0,0,1,180,144Z\"/>", "area": "<path d=\"M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z\"/>", "ready": "<path d=\"M232,216H208V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V216H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-64,0H64V40H168Zm-40-84a12,12,0,1,1,12,12A12,12,0,0,1,128,132Z\"/>", "install": "<path d=\"M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM84,184a12,12,0,1,1,12-12A12,12,0,0,1,84,184Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,144Zm44,40a12,12,0,1,1,12-12A12,12,0,0,1,172,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,172,144Zm36-64H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z\"/>", "rent": "<path d=\"M216.57,39.43A80,80,0,0,0,83.91,120.78L28.69,176A15.86,15.86,0,0,0,24,187.31V216a16,16,0,0,0,16,16H72a8,8,0,0,0,8-8V208H96a8,8,0,0,0,8-8V184h16a8,8,0,0,0,5.66-2.34l9.56-9.57A79.73,79.73,0,0,0,160,176h.1A80,80,0,0,0,216.57,39.43ZM180,92a16,16,0,1,1,16-16A16,16,0,0,1,180,92Z\"/>", "proj": "<path d=\"M239.73,208H224V96a16,16,0,0,0-16-16H164a4,4,0,0,0-4,4V208H144V32.41a16.43,16.43,0,0,0-6.16-13,16,16,0,0,0-18.72-.69L39.12,72A16,16,0,0,0,32,85.34V208H16.27A8.18,8.18,0,0,0,8,215.47,8,8,0,0,0,16,224H240a8,8,0,0,0,8-8.53A8.18,8.18,0,0,0,239.73,208ZM76,184a8,8,0,0,1-8.53,8A8.18,8.18,0,0,1,60,183.72V168.27A8.19,8.19,0,0,1,67.47,160,8,8,0,0,1,76,168Zm0-56a8,8,0,0,1-8.53,8A8.19,8.19,0,0,1,60,127.72V112.27A8.19,8.19,0,0,1,67.47,104,8,8,0,0,1,76,112Zm40,56a8,8,0,0,1-8.53,8,8.18,8.18,0,0,1-7.47-8.26V168.27a8.19,8.19,0,0,1,7.47-8.26,8,8,0,0,1,8.53,8Zm0-56a8,8,0,0,1-8.53,8,8.19,8.19,0,0,1-7.47-8.26V112.27a8.19,8.19,0,0,1,7.47-8.26,8,8,0,0,1,8.53,8Z\"/>", "dev": "<path d=\"M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z\"/>", "sell": "<path d=\"M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63ZM84,96A12,12,0,1,1,96,84,12,12,0,0,1,84,96Z\"/>", "call": "<path d=\"M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24ZM84,140a12,12,0,1,1,12-12A12,12,0,0,1,84,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,172,140Z\"/>"};
  function dkSvg(k) { return '<svg class="dk-ico" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">' + (DK_ICON[k] || '') + '</svg>'; }
  var DK_PINS = {"6 October":[54.09,38.59],"El Sheikh Zayed":[54.43,36.92],"New Zayed":[53.56,35.8],"New Cairo":[58.1,37.29],"New Capital":[60.29,37.29],"Mostakbal city":[59.23,35.24],"North Coast":[38.27,20.44],"Ras El Hikma":[30.78,16.48],"Sokhna":[64.6,45.1],"Galala":[65.13,48.25],"Hurghada":[75.87,89.14],"El Gouna":[74.81,85.51]};
  var DK_SIDE = { '6 October': 'd', 'El Sheikh Zayed': 'l', 'Sheikh Zayed': 'l', 'New Zayed': 'u', 'New Cairo': 'r', 'New Capital': 'd', 'Mostakbal city': 'u', 'North Coast': 'u', 'Ras El Hikma': 'u', 'Sokhna': 'r', 'Ain Sokhna': 'r', 'Galala': 'r', 'Hurghada': 'l', 'El Gouna': 'l' };
  // what part of the map each page looks at: [x %, y %, zoom]
  var DK_CAM = { start: [55, 37, 1.25], budget: [53, 36, 1.0], area: [46, 31, 1.65], ready: [58.1, 37.3, 2.1], install: [54.2, 37.6, 2.1], rent: [38.3, 21, 1.7], proj: [59.6, 36.4, 2.0], dev: [63.5, 44, 1.6], sell: [55.5, 37.5, 1.5], call: [54.1, 38.6, 2.6] };
  var DK_CAM_M = { area: [56.5, 37.5, 1.5], start: [56, 37, 1.1], rent: [38.3, 20.5, 1.3] };
  var DK_BUD = [[3000000, 'لحد 3 مليون'], [5000000, 'لحد 5 مليون'], [10000000, 'لحد 10 مليون'], [20000000, 'لحد 20 مليون']];
  var dk = null;
  function initDeck() {
    var deck = $('dkDeck'); if (!deck || dk) return;
    var REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pages = [].slice.call(deck.querySelectorAll('.dk-pg')), tabs = $('dkTabs'), dots = $('dkDots');
    document.querySelectorAll('svg[data-ico]').forEach(function (s) { var k = s.getAttribute('data-ico'); s.outerHTML = '<i class="dk-tile k-' + k + '">' + dkSvg(k) + '</i>'; });
    pages.forEach(function (p, i) {
      p.classList.add('k-' + p.dataset.k);
      var b = document.createElement('button'); b.type = 'button'; b.className = 'dk-tab k-' + p.dataset.k; b.setAttribute('role', 'tab');
      b.innerHTML = '<i class="dk-tile">' + dkSvg(p.dataset.k) + '</i><span>' + esc(p.dataset.t) + '</span>'; b.onclick = function () { go(i); }; tabs.appendChild(b);
      var o = document.createElement('button'); o.type = 'button'; o.setAttribute('aria-label', p.dataset.t); o.onclick = function () { go(i); }; dots.appendChild(o);
      p.querySelectorAll('.dk-rv').forEach(function (e, k) { e.style.setProperty('--d', Math.min(0.9, 0.08 + k * 0.08).toFixed(2) + 's'); });
    });
    var num = document.createElement('span'); num.className = 'n'; dots.appendChild(num);
    var tabBtns = [].slice.call(tabs.children), dotBtns = [].slice.call(dots.querySelectorAll('button'));
    var layer = $('dkLayer'), bg = layer.parentNode, cur = -1;
    function setTop() {
      var h = document.querySelector('header'); var t = h ? Math.round(h.getBoundingClientRect().bottom) : 84;
      $('v-home').style.setProperty('--dk-top', Math.max(0, t) + 'px'); sizeMap();
    }
    function setActive(i) {
      if (i === cur || i < 0) return; cur = i;
      dkBoxes = null; dkCollideSoon(900);
      if (panX || panY) { panX = 0; panY = 0; layer.style.transition = 'transform .6s ease'; setTimeout(function () { layer.style.transition = ''; }, 650); place(); }
      pages.forEach(function (p, k) { p.classList.toggle('on', k === i); });
      $('v-home').setAttribute('data-pg', pages[i].dataset.k);
      tabBtns.forEach(function (t, k) { t.setAttribute('aria-selected', k === i); });
      dotBtns.forEach(function (t, k) { t.setAttribute('aria-current', k === i); });
      num.textContent = (i + 1) + ' / ' + pages.length;
      var t = tabBtns[i]; tabs.scrollTo({ left: t.offsetLeft - tabs.clientWidth / 2 + t.offsetWidth / 2, behavior: REDUCED ? 'auto' : 'smooth' });
      $('dkPrev').disabled = i === 0; $('dkNext').disabled = i === pages.length - 1;
      var q = $('dkQ'); if (q && pages[i].dataset.k === 'start') { q.classList.remove('play'); void q.offsetWidth; q.classList.add('play'); }
    }
    function go(i) {
      i = Math.max(0, Math.min(pages.length - 1, i));
      pages[i].scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', inline: 'start', block: 'nearest' });
      $('dkNext').classList.remove('hint'); setActive(i);
    }
    $('dkPrev').onclick = function () { go(cur - 1); };
    $('dkNext').onclick = function () { go(cur + 1); };
    deck.addEventListener('click', function (e) { var b = e.target.closest('[data-dkgo]'); if (b) { e.preventDefault(); go(pages.findIndex(function (p) { return p.dataset.k === b.dataset.dkgo; })); } });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && e.intersectionRatio > 0.6) setActive(pages.indexOf(e.target)); }); }, { root: deck, threshold: [0.6] });
      pages.forEach(function (p) { io.observe(p); });
    }
    window.addEventListener('keydown', function (e) {
      if (!$('v-home').classList.contains('on') || (e.target.closest && e.target.closest('input,select,textarea,[contenteditable]'))) return;
      var rtl = document.documentElement.dir !== 'ltr';
      if (e.key === 'ArrowLeft') go(cur + (rtl ? 1 : -1)); if (e.key === 'ArrowRight') go(cur + (rtl ? -1 : 1));
    });
    var lock = 0;
    deck.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      var p = pages[cur]; if (!p) return;
      if (p.scrollHeight > p.clientHeight + 4 && ((e.deltaY > 0 && p.scrollTop + p.clientHeight < p.scrollHeight - 2) || (e.deltaY < 0 && p.scrollTop > 2))) return;
      e.preventDefault(); if (Date.now() < lock || Math.abs(e.deltaY) < 8) return; lock = Date.now() + 750; go(cur + (e.deltaY > 0 ? 1 : -1));
    }, { passive: false });
    // the map glides between the places of the pages while you swipe
    var cams = pages.map(function (p) { return DK_CAM[p.dataset.k] || [55, 37, 1.2]; });
    var camsM = pages.map(function (p) { return DK_CAM_M[p.dataset.k] || DK_CAM[p.dataset.k] || [55, 37, 1.2]; });
    var RATIO = 3200 / 1500, BW = 0, BH = 0, VW = 0, VH = 0;
    function sizeMap() { VW = bg.clientWidth; VH = bg.clientHeight; if (!VW) return; BW = Math.max(VW * 1.05, VH * 1.05 * RATIO); BH = BW / RATIO; layer.style.width = BW + 'px'; layer.style.height = BH + 'px'; place(); }
    function camAt(f) {
      var c = VW < 900 ? camsM : cams, i = Math.max(0, Math.min(c.length - 1, Math.floor(f))), j = Math.min(c.length - 1, i + 1), t = f - i;
      t = t * t * (3 - 2 * t);
      return [0, 1, 2].map(function (k) { return c[i][k] + (c[j][k] - c[i][k]) * t; });
    }
    function place() {
      if (!BW) return;
      var f = deck.clientWidth ? Math.abs(deck.scrollLeft) / deck.clientWidth : 0;
      var m = VW < 900, c = camAt(f), z = Math.max(c[2] * (m ? 1.25 : 1), VW / BW, VH / BH);
      var rtl = document.documentElement.dir !== 'ltr';
      var fx = m ? 0.5 : (rtl ? 0.3 : 0.7), fy = m ? 0.74 : 0.5;
      var tx = Math.min(0, Math.max(VW - BW * z, VW * fx - c[0] / 100 * BW * z + panX)), ty = Math.min(0, Math.max(VH - BH * z, VH * fy - c[1] / 100 * BH * z + panY));
      layer.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0) scale(' + z.toFixed(4) + ')';
      layer.style.setProperty('--z', z.toFixed(4));
    }
    // drag the map from the empty spaces between the boxes (mouse: drag · phone: hold a moment, then drag)
    var panX = 0, panY = 0;
    var BUSY = 'a,button,input,select,textarea,label,[role=button],.ucard,.dk-bk,.dk-intent,.stat,.search,.dk-step,.dk-facts,.proj,.devcard,.area,.dk-chip,[data-lead],.dk-foot,.offers,.dk-search,.dk-tabs,.dk-arr,.dk-dots,form,h1,h2,p';
    var drag = null;
    function startPan(x, y) { drag.on = true; drag.x = x; drag.y = y; drag.px = panX; drag.py = panY; $('v-home').classList.add('dk-panning'); layer.style.transition = ''; if (navigator.vibrate) try { navigator.vibrate(12); } catch (e) {} }
    function endPan() { if (drag && drag.t) clearTimeout(drag.t); drag = null; $('v-home').classList.remove('dk-panning'); dkCollideSoon(60); }
    deck.addEventListener('pointerdown', function (e) {
      if (e.button > 0 || (e.target.closest && e.target.closest(BUSY))) return;
      drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, on: false, touch: e.pointerType !== 'mouse' };
      if (!drag.touch) { startPan(e.clientX, e.clientY); e.preventDefault(); }
      else drag.t = setTimeout(function () { if (drag && !drag.moved) startPan(drag.sx, drag.sy); }, 280);
    });
    window.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.on) { if (Math.abs(e.clientX - drag.sx) + Math.abs(e.clientY - drag.sy) > 8) { drag.moved = true; clearTimeout(drag.t); drag = null; } return; }
      e.preventDefault();
      panX = drag.px + (e.clientX - drag.x); panY = drag.py + (e.clientY - drag.y); place();
    }, { passive: false });
    window.addEventListener('pointerup', endPan); window.addEventListener('pointercancel', endPan);
    // while panning on a phone, stop the page from swiping
    deck.addEventListener('touchmove', function (e) { if (drag && drag.on) e.preventDefault(); }, { passive: false });
    deck.addEventListener('dblclick', function (e) { if (e.target.closest && e.target.closest(BUSY)) return; panX = 0; panY = 0; layer.style.transition = 'transform .6s ease'; place(); setTimeout(function () { layer.style.transition = ''; }, 650); });
    var raf = 0; deck.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; place(); }); dkCollideSoon(160); }, { passive: true });
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(setTop, 120); });
    dk = { go: go, setTop: setTop, pages: pages, cur: function () { return cur; } };
    setTop(); setActive(0);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setTop);
    window.addEventListener('load', setTop);
    if (window.ResizeObserver) { var hd = document.querySelector('header'); if (hd) new ResizeObserver(function () { setTop(); }).observe(hd); }
    var start = /^#p-(\w+)$/.exec(location.hash || '');
    if (start) { var si = pages.findIndex(function (p) { return p.dataset.k === start[1]; }); if (si > 0) setTimeout(function () { pages[si].scrollIntoView({ inline: 'start', block: 'nearest' }); setActive(si); }, 50); }
  }
  var DK_LABELS = [[55.94, 37.27, "city", "end", "القاهرة", "Cairo"], [46.0, 15.53, "city", "end", "الإسكندرية", "Alexandria"], [65.91, 38.6, "city", "end", "السويس", "Suez"], [63.78, 26.87, "city", "end", "الإسماعيلية", "Ismailia"], [64.0, 14.4, "city", "end", "بورسعيد", "Port Said"], [75.44, 88.47, "city", "end", "الغردقة", "Hurghada"], [25.72, 12.73, "city", "end", "مرسى مطروح", "Marsa Matrouh"], [52.97, 50.87, "city", "end", "الفيوم", "Fayoum"], [52.28, 73.13, "city", "end", "المنيا", "Minya"], [38.66, 22.53, "city", "end", "العلمين", "El Alamein"], [43.94, 2.87, "sea", "middle", "البحر المتوسط", "Mediterranean Sea"], [80.25, 81.87, "sea", "middle", "البحر الأحمر", "Red Sea"], [69.28, 58.07, "sea", "middle", "خليج السويس", "Gulf of Suez"]];
  // map names as page text (sharp Arabic on every phone) — hidden wherever they'd sit under the page's words or boxes
  function deckLabels() {
    var layer = $('dkLayer'); if (!layer || layer.querySelector('.dk-lbl')) return;
    var en = document.documentElement.lang === 'en';
    DK_LABELS.forEach(function (l) {
      var e = document.createElement('span');
      e.className = 'dk-lbl ' + l[2] + (l[3] === 'middle' ? ' mid' : '');
      e.style.left = l[0] + '%'; e.style.top = l[1] + '%';
      e.innerHTML = '<b data-ar="' + esc(l[4]) + '" data-en="' + esc(l[5]) + '">' + esc(en ? l[5] : l[4]) + '</b>';
      layer.appendChild(e);
    });
  }
  var dkBoxes = null, dkBoxPg = null;
  function dkGetBoxes(pg) {
    if (dkBoxes && dkBoxPg === pg) return dkBoxes;
    var out = [], VWp = innerWidth, VHp = innerHeight, big = VWp * VHp * 0.6;
    var push = function (r) { if (r.width && r.height && r.bottom > 0 && r.top < VHp && r.right > 0 && r.left < VWp && r.width * r.height < big) out.push(r); };
    pg.querySelectorAll('*').forEach(function (el) {
      var cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return;
      var paint = (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') || cs.backgroundImage !== 'none' || parseFloat(cs.borderTopWidth) > 0;
      var text = false;
      for (var n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && n.nodeValue.trim()) { text = true; break; }
      if (paint || text || /^(IMG|SVG|INPUT|SELECT|BUTTON|TEXTAREA|svg)$/.test(el.tagName)) push(el.getBoundingClientRect());
    });
    document.querySelectorAll('header, .dk-tabs, .dk-arr:not(:disabled), .dk-dots, .wa-float, .cmpbar').forEach(function (el) { push(el.getBoundingClientRect()); });
    dkBoxes = out; dkBoxPg = pg; return out;
  }
  function dkCollide() {
    var home = $('v-home'); if (!home || !home.classList.contains('on') || !dk) return;
    var pg = dk.pages[dk.cur()]; if (!pg) return;
    var boxes = dkGetBoxes(pg), M = 10, W0 = innerWidth, H0 = innerHeight;
    var over = function (q, list) { return list.some(function (b) { return q.left < b.right + M && q.right > b.left - M && q.top < b.bottom + M && q.bottom > b.top - M; }); };
    var shown = [];
    // pins first (they carry the numbers), then names that don't touch a pin or another name
    var els = [].slice.call($('dkLayer').querySelectorAll('.dk-pin')).concat([].slice.call($('dkLayer').querySelectorAll('.dk-lbl')));
    els.forEach(function (e) {
      var rs = [(e.querySelector('b') || e).getBoundingClientRect()]; var d = e.querySelector('i'); if (d) rs.push(d.getBoundingClientRect());
      var off = rs.some(function (q) { return q.left < 4 || q.right > W0 - 4 || q.top < 0 || q.bottom > H0; });
      var isPin = e.classList.contains('dk-pin');
      var hit = off || rs.some(function (q) { return over(q, boxes) || (!isPin && over(q, shown)); });
      e.classList.toggle('dk-hide', hit);
      if (!hit) rs.forEach(function (q) { shown.push(q); });
    });
  }
  document.addEventListener('scroll', function () { dkBoxes = null; dkCollideSoon(200); }, true);
  var dkColT; function dkCollideSoon(ms) { clearTimeout(dkColT); dkColT = setTimeout(dkCollide, ms || 120); }
  window.addEventListener('resize', function () { dkBoxes = null; dkCollideSoon(300); });
  setInterval(function () { if (!document.hidden) dkCollide(); }, 1200); // the map drifts slowly: keep names clear of the words
  function deckPins(areas) {
    var layer = $('dkLayer'); if (!layer) return;
    layer.querySelectorAll('.dk-pin').forEach(function (e) { e.remove(); });
    (areas || []).forEach(function (a) {
      var p = DK_PINS[a.city] || DK_PINS[{ 'Sheikh Zayed': 'El Sheikh Zayed', 'Ain Sokhna': 'Sokhna' }[a.city]]; if (!p || !a.count) return;
      var e = document.createElement('span');
      e.className = 'dk-pin s-' + (DK_SIDE[a.city] || 'u') + (a.count > 250 ? ' hot' : ''); e.style.left = p[0] + '%'; e.style.top = p[1] + '%';
      e.innerHTML = '<i></i><b>' + esc(city(a.city)) + '<small>' + n(a.count) + '</small></b>'; layer.appendChild(e);
    });
    deckLabels(); dkCollideSoon(400);
  }
  function dkList(qs, box, cls) {
    return getJSON(API + '/units?' + qs).then(function (d) { if (box) $(box).innerHTML = (d.data || []).map(card).join('') || '<div class="muted">مفيش وحدات دلوقتي.</div>'; return d; }).catch(function () { return { total: 0, data: [] }; });
  }
  function deckHome(d) {
    initDeck();
    deckPins(d.areas || []);
    // budget ranges (how many units up to each price)
    var ranges = DK_BUD.map(function (b) { return getJSON(API + '/units?category=Resale&per_page=1&max_price=' + b[0]).then(function (r) { return r.total || 0; }).catch(function () { return 0; }); });
    Promise.all(ranges).then(function (tot) {
      var mx = Math.max.apply(null, tot.concat([1]));
      $('dkBudget').innerHTML = DK_BUD.map(function (b, i) {
        return '<button type="button" class="dk-bk dk-rv" style="--d:' + (0.15 + i * 0.08) + 's" data-dkbud="' + b[0] + '"><span class="r">' + b[1] + '</span><span class="c">' + n(tot[i]) + ' وحدة للبيع</span><span class="bar"><i style="--w:' + Math.round(tot[i] / mx * 100) + '%"></i></span></button>';
      }).join('');
    });
    $('dkTypes').innerHTML = TYPE_FILTER.filter(function (t) { return t[0] && t[0] !== 'Office'; }).map(function (t) { return '<button type="button" class="dk-chip" data-dktype="' + esc(t[0]) + '">' + esc(t[1]) + '</button>'; }).join('');
    dkList('category=Resale&delivery=' + encodeURIComponent('Ready To Move') + '&per_page=6', 'dkReady').then(function (r) {
      $('dkReadyN').textContent = n(r.total); var ic = document.querySelector('[data-dkgo="ready"] small'); if (ic && r.total) ic.textContent = n(r.total) + ' وحدة استلام فوري متاحة'; var rq = $('uReadyN'); if (rq) rq.textContent = n(r.total);
      getJSON(API + '/units?category=Resale&delivery=' + encodeURIComponent('Ready To Move') + '&sort=price_asc&per_page=1').then(function (c) { var u = (c.data || [])[0]; $('dkReadyMin').innerHTML = u ? 'أرخص واحدة: <b>' + esc(priceLabel(u)) + '</b>' : ''; }).catch(function () {});
    });
    dkList('category=Resale&sort=down_asc&per_page=6', 'dkInst').then(function (r) {
      var u = (r.data || []).find(function (x) { return x.down_payment > 0; });
      $('dkInstDown').textContent = u ? n(u.down_payment) + ' ج.م' : '—';
      $('dkInstN').textContent = n(r.total) + ' وحدة للبيع';
    });
    dkList('category=Rent&per_page=8', 'dkRent');
    dkDevs();
  }
  function dkDevs() {
    var box = $('dkDevs'); if (!box) return;
    var draw = function () {
      var q = ($('dkDevQ').value || '').trim().toLowerCase();
      var rows = (devAll || []).filter(function (d) { return !q || String(d.name).toLowerCase().indexOf(q) >= 0; });
      $('dkDevN').textContent = n(rows.length) + ' مطور';
      box.innerHTML = rows.length ? rows.map(function (d) {
        return '<a class="devcard" href="#dev-' + d.id + '"><i>' + logo(d.photo, d.name) + '</i><span style="display:flex;flex-direction:column;gap:2px;min-width:0"><b>' + esc(d.name) + '</b><span class="muted" style="font-size:13px">' + n(d.units) + ' وحدة' + (d.projects ? ' · ' + n(d.projects) + ' مشروع' : '') + '</span></span></a>';
      }).join('') : '<div class="muted">مفيش مطور بالاسم ده.</div>';
    };
    if (!$('dkDevQ').dataset.on) { $('dkDevQ').dataset.on = '1'; var t; $('dkDevQ').addEventListener('input', function () { clearTimeout(t); t = setTimeout(draw, 150); }); }
    if (devAll) return draw();
    api('/developers').then(function (rows) { devAll = rows; draw(); }).catch(function () { box.innerHTML = '<div class="muted">مقدرناش نحمّل المطورين دلوقتي.</div>'; });
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-dkbud],[data-dktype],[data-dkunits]'); if (!t) return;
    e.preventDefault();
    resetFilters(t.dataset.dkunits === 'rent' ? 'Rent' : 'Resale');
    if (t.dataset.dkbud) f.max_price = t.dataset.dkbud;
    if (t.dataset.dktype) f.type = t.dataset.dktype;
    if (t.dataset.dkunits === 'ready') { f.delivery = 'Ready To Move'; f.label = 'استلام فوري'; }
    if (t.dataset.dkunits === 'install') f.sort = 'down_asc';
    if (t.dataset.dkunits === 'monthly') f.sort = 'monthly_asc';
    goUnits();
  });

  /* ---------- UNITS ---------- */
  var MORE = ['min_size', 'max_size', 'baths', 'finishing', 'delivery', 'license', 'services', 'max_down', 'max_monthly', 'max_quarter'];
  var f = blankF('Resale');
  function blankF(cat) { var o = { category: cat, city: '', type: '', max_price: '', beds: '', sort: '', q: '', developer_id: '', project_id: '', label: '' }; MORE.forEach(function (k) { o[k] = ''; }); return o; }
  var page = 1, lastPage = 1, loading = false;
  function syncFilterUI() {
    document.querySelectorAll('[data-ucat]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.ucat === f.category); });
    if ($('uReady')) $('uReady').setAttribute('aria-pressed', f.delivery === 'Ready To Move');
    $('fCity').value = f.city; $('fType').value = f.type; syncMore(); $('fMax').value = f.max_price; $('fBeds').value = f.beds; $('fSort').value = f.sort; $('fQ').value = f.q;
  }
  function loadUnits(reset) {
    if (loading) return; loading = true;
    if (reset) { page = 1; $('uGrid').innerHTML = skeleton(6); }
    var qs = ['page=' + page, 'per_page=12'];
    ['category', 'city', 'type', 'max_price', 'beds', 'sort', 'q', 'developer_id', 'project_id'].concat(MORE).forEach(function (k) { if (f[k]) qs.push(k + '=' + encodeURIComponent(f[k])); });
    getJSON(API + '/units?' + qs.join('&')).then(function (d) {
      lastPage = d.last_page || 1;
      var html = (d.data || []).map(card).join('');
      if (reset) $('uGrid').innerHTML = html; else $('uGrid').insertAdjacentHTML('beforeend', html);
      $('uEmpty').style.display = d.total ? 'none' : 'block';
      $('uMore').style.display = page < lastPage ? 'inline-flex' : 'none';
      var t = f.category === 'Rent' ? 'وحدات للإيجار' : f.category === 'Resale' ? 'وحدات للبيع' : 'كل الوحدات المتاحة';
      if (f.delivery === 'Ready To Move' && !f.label) t = 'وحدات استلام فوري 🔑';
      if (f.label) t += ' — ' + f.label; else if (f.city) t += ' في ' + city(f.city);
      $('uTitle').textContent = t;
      $('uSub').textContent = n(d.total) + ' وحدة';
    }).catch(function () {
      $('uGrid').innerHTML = ''; $('uEmpty').style.display = 'block';
      $('uEmpty').textContent = 'مقدرناش نحمّل الوحدات دلوقتي. جرّب تاني، أو كلّمنا على ' + PHONE + '.';
    }).then(function () { loading = false; });
  }

  /* ---------- UNIT ---------- */
  function loadUnit(id) {
    var box = $('unitBox');
    box.innerHTML = '<div style="padding:48px 0" class="muted">بنحمّل الوحدة…</div>';
    getJSON(API + '/units/' + id).then(function (u) {
      curUnit = u;
      var title = type(u.type) + (u.bedrooms ? ' ' + u.bedrooms + ' غرف' : '') + (u.project ? ' في ' + u.project : '');
      var allPhotos = (u.photos && u.photos.length ? u.photos : (u.photo ? [u.photo] : []));
      lbPhotos = allPhotos;
      var photos = allPhotos.slice(0, 5);
      // only the photos the unit has (no empty boxes); the layout follows the count
      var gN = Math.max(1, photos.length);
      var gal = '<div class="gal n' + gN + '">';
      for (var i = 0; i < gN; i++) gal += '<div class="' + (i === 0 ? 'main ' : '') + 'cell">' + (photos[i] ? '<button type="button" data-lbopen="' + i + '" aria-label="افتح صورة ' + (i + 1) + '">' + img(photos[i], 'صورة ' + (i + 1), 'cover') + '</button>' : '<div class="ph cover"></div>') + (i === gN - 1 && allPhotos.length > 1 ? '<button type="button" class="btn btn-line gal-more" data-lbopen="0" style="all:revert;position:absolute;bottom:14px;left:14px;min-height:44px;padding:0 18px;border-radius:999px;border:none;background:#fff;font-weight:700;cursor:pointer;font-family:inherit">كل الصور (' + allPhotos.length + ')</button>' : '') + '</div>';
      gal += '</div>';
      var shareUrl = shareLink('u', u.id);
      var waText = 'أهلاً بكام، عايز أسأل عن الوحدة دي: ' + title + ' — ' + priceLabel(u) + '\n' + shareUrl;
      var specs = [['المساحة', u.size ? u.size + ' م²' : '—'], ['غرف النوم', u.bedrooms || '—'], ['الحمامات', u.bathrooms || '—'], ['الدور', u.level || '—'], ['الاستلام', DEL_AR[u.delivery] || u.delivery || '—']];
      var pay = [];
      if (u.down_payment) pay.push(['المقدم / المدفوع', n(u.down_payment) + ' ج.م']);
      if (u.down_payment && u.price && u.price > u.down_payment) pay.push(['الباقي', n(u.price - u.down_payment) + ' ج.م']);
      if (u.quarter_installment) pay.push(['القسط ربع السنوي', n(u.quarter_installment) + ' ج.م']);
      var rt = u.rating || { avg: null, count: 0, mine: null };
      var extras = '<div style="display:flex;flex-wrap:wrap;gap:8px 18px;font-size:15px" class="muted"><span>اتشافت ' + n(u.views || 0) + ' مرة</span><span id="rateSum">' + rateText(rt) + '</span></div>';
      var amen = (u.services && u.services.length) ? '<section style="display:flex;flex-direction:column;gap:12px"><h2 style="font-weight:800;font-size:26px">المميزات</h2><div class="amen">' + u.services.map(function (x) { return '<span>' + (x.icon ? '<img src="' + esc(x.icon) + '" alt="" loading="lazy" onerror="this.remove()">' : '') + esc(SERV_AR[x.name] || x.name) + '</span>'; }).join('') + '</div></section>' : '';
      var rateBox = '<section style="display:flex;flex-direction:column;gap:10px;border:1px solid var(--line);border-radius:24px;padding:20px"><b style="font-size:19px">قيّم الوحدة</b><div class="stars" role="group" aria-label="تقييمك من 5">' + [1, 2, 3, 4, 5].map(function (i) { return '<button type="button" data-rate="' + i + '" data-rateunit="' + u.id + '" aria-label="' + i + ' من 5" aria-pressed="' + (rt.mine === i) + '">' + star(rt.mine && i <= rt.mine) + '</button>'; }).join('') + '</div><span class="muted" id="rateHint" style="font-size:14px">' + (auth ? (rt.mine ? 'تقييمك ' + rt.mine + ' من 5. تقدر تغيّره.' : 'دوس على النجوم.') : 'سجّل دخول عشان تقيّم.') + '</span></section>';
      if (auth) api('/units/' + u.id + '/visit', { method: 'POST' }).catch(function () {});
      var perM = (u.price && u.size && u.category !== 'Rent') ? 'حوالي ' + n(Math.round(u.price / u.size)) + ' ج.م للمتر' : '';
      box.innerHTML =
        '<nav aria-label="مسار الصفحة" style="display:flex;flex-wrap:wrap;gap:8px;font-size:15px;color:var(--mut);padding-bottom:18px"><a href="#home">الرئيسية</a><span aria-hidden="true">/</span><a href="#units" data-city="' + esc(u.city) + '">' + esc(city(u.city)) + '</a><span aria-hidden="true">/</span><span style="color:var(--ink)">' + (LANG === 'en' ? 'Unit ' : 'وحدة ') + u.id + '</span></nav>' +
        gal +
        '<div style="padding-top:32px;display:flex;flex-wrap:wrap;gap:32px;align-items:flex-start">' +
          '<div style="flex:999 1 560px;min-width:0;display:flex;flex-direction:column;gap:28px">' +
            '<div style="display:flex;flex-direction:column;gap:12px"><div style="display:flex;flex-wrap:wrap;gap:8px"><span class="tag" style="background:var(--soft);color:var(--mut2)">' + (u.category === 'Rent' ? 'إيجار' : 'ريسيل') + '</span>' + (u.finishing ? '<span class="tag" style="background:var(--pale);color:var(--blue-d)">' + esc(FIN_AR[u.finishing] || u.finishing) + '</span>' : '') + '</div>' +
            '<h1 style="font-weight:800;font-size:clamp(28px,4vw,40px);line-height:1.3">' + esc(title) + '</h1>' +
            '<span class="muted" style="font-size:17px">' + esc([u.developer, city(u.city)].filter(Boolean).join(' · ')) + '</span>' + extras +
            (u.availability !== 'sold' ? '<div class="offer-cta"><button type="button" class="btn btn-blue" data-offer="' + u.id + '"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>قدّم عرض سعر</button><span class="muted">قول السعر اللي تقدر تدفعه، والعرض يوصل لصاحب الوحدة على واتساب</span></div>' : '') +
            '<div class="share-row"><button type="button" class="btn btn-line" style="min-height:44px" data-share="' + esc(shareUrl) + '" data-sharetitle="' + esc(title) + '">مشاركة</button><a class="btn btn-line" style="min-height:44px" target="_blank" rel="noopener" href="https://wa.me/?text=' + enc(title + ' — ' + priceLabel(u) + '\n' + shareUrl) + '">ابعتها واتساب</a><button type="button" class="btn btn-line" style="min-height:44px" data-copy="' + esc(shareUrl) + '">انسخ اللينك</button><button type="button" class="btn btn-line" style="min-height:44px" data-pdf="' + u.id + '">ملف PDF</button><button type="button" class="btn btn-line" style="min-height:44px" data-img="' + u.id + '">صورة</button><button type="button" class="btn btn-line" style="min-height:44px" aria-pressed="' + (!!liked[u.id]) + '" data-like="' + u.id + '" aria-label="أضف للمفضلة">' + heart + '</button>' + cmpBtn(u.id).replace('class="cmp-btn"', 'class="cmp-btn" style="min-height:44px;margin:0;font-size:15px"') + '</div></div>' +
            '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px">' + specs.map(function (s) { return '<div class="spec"><span class="muted">' + s[0] + '</span><b>' + esc(s[1]) + '</b></div>'; }).join('') + '</div>' +
            (pay.length ? '<section style="display:flex;flex-direction:column;gap:14px"><h2 style="font-weight:800;font-size:26px">خطة السداد</h2><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">' + pay.map(function (p) { return '<div class="pay"><span class="muted">' + p[0] + '</span><b>' + p[1] + '</b></div>'; }).join('') + '</div><span class="note">الأرقام تقريبية، ومستشار بكام هيأكدها معاك.</span></section>' : '') + calcBox(u) +
            amen + (cleanDesc(u.description).length ? '<section style="display:flex;flex-direction:column;gap:12px"><h2 style="font-weight:800;font-size:26px">عن الوحدة</h2><ul class="desc" translate="no">' + cleanDesc(u.description).map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul></section>' : '') +
            (u.developer ? '<section style="border:1px solid var(--line);border-radius:24px;padding:20px;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between"><span style="display:flex;flex-direction:column;gap:2px"><a href="#dev-' + u.developer_id + '" style="font-size:18px;font-weight:800;color:var(--ink)">' + esc(u.developer) + '</a><span class="muted">' + n(u.developer_units) + ' وحدة متاحة' + (u.project ? ' · ' + n(u.project_units) + ' منها في ' + esc(u.project) : '') + '</span></span>' + (u.project_id ? '<a class="btn btn-line" href="#project-' + u.project_id + '" style="min-height:46px">عن مشروع ' + esc(u.project) + '</a>' : '') + '</section>' : '') + locBlock('unitLoc', u.project_location, null) + rateBox +
          '</div>' +
          '<aside class="lead" style="flex:1 1 340px;max-width:420px" aria-label="اطلب تواصل">' +
            '<div style="display:flex;flex-direction:column;gap:4px"><span class="muted">' + (u.category === 'Rent' ? 'الإيجار الشهري' : 'السعر الإجمالي') + '</span><b style="font-size:34px;font-weight:800">' + priceLabel(u) + '</b>' + (perM ? '<span class="muted">' + perM + '</span>' : '') + '</div>' +
            contactBlock(u) +
            '<div data-lead data-unit="' + u.id + '"><form style="display:flex;flex-direction:column;gap:12px">' +
              '<label class="field">الاسم<input name="name" required minlength="2" autocomplete="name" placeholder="اسمك بالكامل"></label>' +
              '<label class="field">الموبايل<input name="phone" required type="tel" autocomplete="tel" dir="ltr" placeholder="01x xxxx xxxx" style="text-align:right"></label>' +
              '<div class="seg" role="group" aria-label="تحب نكلمك إزاي"><button type="button" aria-pressed="true" data-way="مكالمة" style="flex:1">مكالمة</button><button type="button" aria-pressed="false" data-way="واتساب" style="flex:1">واتساب</button></div>' +
              '<input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="hp">' +
              '<button class="btn btn-blue" type="submit">اطلب تفاصيل أو معاينة</button>' +
              '<span class="muted" style="font-size:14px;text-align:center">أو كلّم فريق بكام: <a target="_blank" rel="noopener" href="https://wa.me/' + WA + '?text=' + enc(waText) + '">واتساب</a> · <a href="tel:+201113555557" dir="ltr">' + PHONE + '</a></span>' +
              '<span class="note err" style="text-align:center"></span>' +
            '</form></div>' +
          '</aside>' +
        '</div>' +
        (u.similar && u.similar.length ? '<section class="sec"><div class="sec-h"><h2>وحدات قريبة في السعر</h2></div><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">' + u.similar.map(card).join('') + '</div></section>' : '');
      bindLeads(box); bindCalc(); drawMinimaps(box);
      // get the PDF tools ready in the background, so «ملف PDF» starts right away
      if (auth) setTimeout(function () { loadPdfLibs().catch(function () { pdfLibs = null; }); }, 1500);
      box.querySelectorAll('[data-lead] form').forEach(prefill);
      document.title = 'بكام — ' + title;
    }).catch(function () {
      box.innerHTML = '<div style="padding:48px 0;display:flex;flex-direction:column;gap:12px"><h1 style="font-size:28px;font-weight:800">الوحدة دي مش متاحة</h1><p class="muted">ممكن تكون اتباعت أو اتشالت. <a href="#units">شوف وحدات تانية</a> أو كلّمنا على ' + PHONE + '.</p></div>';
    });
  }

  /* ---------- LEADS ---------- */
  function bindLeads(scope) {
    (scope || document).querySelectorAll('[data-lead]').forEach(function (box) {
      if (box.dataset.bound) return; box.dataset.bound = '1';
      var orig = box.innerHTML;
      function bind() {
        var form = box.querySelector('form'); if (!form) return;
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var fd = new FormData(form), err = form.querySelector('.err'), btn = form.querySelector('button[type=submit]');
          var phone = String(fd.get('phone') || '').replace(/[^\d+]/g, '');
          if (!/^\+?\d{10,14}$/.test(phone)) { err.textContent = 'اكتب رقم موبايل صحيح، 11 رقم.'; return; }
          var way = form.querySelector('[data-way][aria-pressed="true"]');
          var body = { name: fd.get('name'), phone: phone, area: fd.get('area') || null, budget: fd.get('budget') || null, website: fd.get('website') || '', unit_id: box.dataset.unit ? Number(box.dataset.unit) : null, contact_way: way ? way.dataset.way : null };
          btn.disabled = true; btn.textContent = 'بنبعت…'; err.textContent = '';
          api('/leads', { method: 'POST', body: body })
            .catch(function (e3) { throw new Error(e3.status === 429 ? 'rate' : 'http'); })
            .then(function (res) {
              var msg = res && res.preview
                ? '<b style="font-size:19px">نسخة معاينة</b><span style="line-height:1.8;color:var(--mut2)">الطلب ده متبعتش. لما الموقع يترفع على السيرفر، الطلبات هتروح للـ CRM على طول.</span>'
                : '<b style="font-size:19px">طلبك وصل</b><span style="line-height:1.8;color:var(--mut2)">مستشار بكام هيكلمك على ' + esc(phone) + ' في أقرب وقت.</span>';
              box.innerHTML = '<div class="ok" role="status">' + msg + '<button type="button" class="btn btn-line" style="align-self:flex-start;min-height:44px" data-again>طلب جديد</button></div>';
              box.querySelector('[data-again]').addEventListener('click', function () { box.innerHTML = orig; bind(); var f2 = box.querySelector('form'); if (f2) prefill(f2); });
            })
            .catch(function (e2) {
              btn.disabled = false; btn.textContent = 'حاول تاني';
              err.textContent = e2.message === 'rate' ? 'بعتّ طلبات كتير ورا بعض. استنى شوية أو كلّمنا على ' + PHONE + '.' : 'الطلب موصلش. جرّب تاني أو كلّمنا على ' + PHONE + '.';
            });
        });
      }
      bind();
    });
  }

  /* ---------- ROUTER ---------- */
  var jump = null;
  var VIEWS = ['home', 'units', 'unit', 'collection', 'favorites', 'sell', 'my-units', 'developers', 'dev', 'projects', 'project', 'request', 'notifications', 'account', 'compare', 'alerts'];
  var navDepth = -1;
  window.addEventListener('hashchange', function () { navDepth++; });
  function goBack() { if (navDepth > 0) { navDepth -= 2; history.back(); } else location.hash = 'home'; }
  function route() {
    var h = (location.hash || '#home').slice(1);
    var view = 'home', unitId = null;
    var m = /^unit-(\d+)$/.exec(h);
    var m2 = /^(dev|project|edit)-(\d+)$/.exec(h);
    var mc = /^c-([a-z0-9]{6,16})$/i.exec(h);
    if (m) { view = 'unit'; unitId = m[1]; }
    else if (m2) { view = m2[1] === 'edit' ? 'sell' : m2[1]; unitId = m2[2]; }
    else if (mc) { view = 'collection'; unitId = mc[1]; }
    else if (h === 'compare-projects') view = 'compare';
    else if (VIEWS.indexOf(h) >= 0) view = h;
    closeLightbox(true);
    VIEWS.forEach(function (v) { $('v-' + v).classList.toggle('on', v === view); });
    document.documentElement.classList.toggle('deck-on', view === 'home' && !!$('dkDeck'));
    $('backWrap').hidden = view === 'home'; setTimeout(alignQ, 60);
    if (view === 'home' && dk) setTimeout(dk.setTop, 30);
    document.querySelectorAll('[data-nav]').forEach(function (a) { a.removeAttribute('aria-current'); });
    var navKey = { home: 'home', sell: 'sell', developers: 'developers', dev: 'developers', projects: 'projects', project: 'projects' }[view] || (view === 'units' || view === 'unit' ? (f.category === 'Rent' ? 'rent' : 'sale') : '');
    var a = document.querySelector('[data-nav="' + navKey + '"]'); if (a) a.setAttribute('aria-current', 'page');
    if (view === 'units') { syncFilterUI(); loadUnits(true); document.title = 'بكام — الوحدات'; }
    if (view === 'unit') loadUnit(unitId);
    if (view === 'collection') loadCollection(unitId);
    if (view === 'favorites') { loadFavs(); document.title = 'بكام — المفضلة'; }
    if (view === 'sell') { showSell(m2 ? unitId : null); document.title = m2 ? 'بكام — عدّل وحدتك' : 'بكام — اعرض وحدتك'; }
    if (view === 'developers') { loadDevelopers(); document.title = 'بكام — المطورين'; }
    if (view === 'dev') loadDev(unitId);
    if (view === 'projects') { loadProjects(); document.title = 'بكام — المشروعات'; }
    if (view === 'project') loadProject(unitId);
    if (view === 'request') { showRequest(); document.title = 'بكام — طلب خاص'; }
    if (view === 'notifications') { loadNotifs(1); document.title = 'بكام — الإشعارات'; }
    if (view === 'account') { showAccount(); document.title = 'بكام — حسابي'; }
    if (view === 'compare') { if (location.hash === '#compare-projects') cmpMode = 'projects'; loadCompare(); }
    if (view === 'alerts') { loadAlerts(); document.title = 'بكام — تنبيهاتي'; }
    paintCmp();
    if (view !== 'notifications') refreshBell();
    if (view === 'my-units') { loadMine(); document.title = 'بكام — وحداتي'; }
    if (view === 'home') document.title = 'بكام؟ — دليلك لأسعار العقارات';
    if (jump) { var el = $(jump); jump = null; if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth' }); }, 60); }
    else window.scrollTo(0, 0);
  }
  function goUnits() { if (location.hash === '#units') route(); else location.hash = 'units'; }
  function resetFilters(cat) { f = blankF(cat || 'Resale'); }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('button,a'); if (!t) return;
    var d = t.dataset;
    if (d.like) { toggleLike(d.like); return; }
    if (d.lbopen !== undefined) { openLightbox(+d.lbopen); return; }
    if (d.lb) { stepLightbox(+d.lb); return; }
    if (d.lbclose !== undefined) { closeLightbox(); return; }
    if (d.copy) { copyText(d.copy); return; }
    if (d.pdf) { exportPdf(d.pdf, t); return; }
    if (d.img) { exportImg(d.img, t); return; }
    if (d.offer) { openOffer(curUnit); return; }
    if (d.share) { if (navigator.share) { navigator.share({ title: d.sharetitle, url: d.share }).catch(function () {}); } else copyText(d.share); return; }
    if (d.close !== undefined) { closeModal(); return; }
    if (d.acctab) { switchTab(d.acctab); return; }
    if (d.login !== undefined) { openModal('login'); return; }
    if (d.scat) { setSellCat(d.scat); return; }
    if (d.rmphoto !== undefined) { sellFiles.splice(+d.rmphoto, 1); renderThumbs(); return; }
    if (d.delunit) { delUnit(d.delunit, t); return; }
    if (d.ownerwa) { try { localStorage.setItem('bk_ownerwa_' + d.ownerwa, Date.now()); } catch (er) {} setTimeout(loadMine, 800); return; }
    if (d.rmold) { editRemove[d.rmold] = true; renderThumbs(); return; }
    if (d.rate) { rateUnit(d.rateunit, +d.rate); return; }
    if (d.rcat) { t.parentElement.querySelectorAll('[data-rcat]').forEach(function (b) { b.setAttribute('aria-pressed', b === t); }); return; }
    if (d.shareapp !== undefined) { shareApp(); return; }
    if (d.contact) { contactUnit(d.cunit, d.contact, t); return; }
    if (d.way) { t.parentElement.querySelectorAll('[data-way]').forEach(function (b) { b.setAttribute('aria-pressed', b === t); }); return; }
    if (d.hcat) { document.querySelectorAll('[data-hcat]').forEach(function (b) { b.setAttribute('aria-selected', b === t); }); return; }
    if (d.ucat) { f.category = d.ucat; syncFilterUI(); loadUnits(true); route(); return; }
    if (d.jump) { jump = d.jump; if (!location.hash || location.hash === '#home') { e.preventDefault(); route(); } return; }
    if (d.stat) { f = blankF(d.stat === 'all' ? '' : d.stat); e.preventDefault(); goUnits(); return; }
    if (d.cat) { resetFilters(d.cat); e.preventDefault(); goUnits(); return; }
    if (d.city !== undefined && t.getAttribute('href') === '#units') { resetFilters('Resale'); f.city = d.city; e.preventDefault(); goUnits(); return; }
    if (d.devready) { resetFilters('Resale'); f.developer_id = d.devready; f.delivery = 'Ready To Move'; f.label = d.devname + ' — استلام فوري'; e.preventDefault(); goUnits(); return; }
    if (d.dev) { resetFilters('Resale'); f.developer_id = d.dev; f.label = d.devname; e.preventDefault(); goUnits(); return; }
    if (d.proj) { resetFilters('Resale'); f.project_id = d.proj; f.label = d.projname; e.preventDefault(); goUnits(); return; }
  });

  $('moreBtn').addEventListener('click', function () { var p = $('morePanel'), open = p.hidden; p.hidden = !open; this.setAttribute('aria-expanded', open); if (open) fillMore(); });
  $('fDev').addEventListener('change', function () { fillFProj(this.value); });
  $('moreApply').addEventListener('click', function () {
    f.min_size = $('fMinSize').value; f.max_size = $('fMaxSize').value; f.max_down = $('fMaxDown').value.replace(/[^\d]/g, ''); f.max_monthly = $('fMaxMonthly').value.replace(/[^\d]/g, ''); f.baths = $('fBaths').value; f.finishing = $('fFin').value; f.delivery = $('fDel').value; f.license = $('fLic').value;
    f.services = Array.prototype.map.call($('fServ').querySelectorAll('input:checked'), function (c) { return c.value; }).join(',');
    if ($('fDev').value !== String(f.developer_id) || $('fProj').value !== String(f.project_id)) { f.developer_id = $('fDev').value; f.project_id = $('fProj').value; f.label = ''; }
    $('morePanel').hidden = true; $('moreBtn').setAttribute('aria-expanded', false); loadUnits(true); syncMore();
  });
  $('moreClear').addEventListener('click', function () { MORE.forEach(function (k) { f[k] = ''; }); f.developer_id = ''; f.project_id = ''; f.label = ''; syncMore(); loadUnits(true); });
  ['fCity', 'fType', 'fMax', 'fBeds', 'fSort'].forEach(function (id) {
    $(id).addEventListener('change', function () {
      var key = { fCity: 'city', fType: 'type', fMax: 'max_price', fBeds: 'beds', fSort: 'sort' }[id];
      f[key] = this.value; if (key === 'city') { f.developer_id = ''; f.project_id = ''; f.label = ''; }
      loadUnits(true);
    });
  });
  var qTimer; $('fQ').addEventListener('input', function () { var v = this.value; clearTimeout(qTimer); qTimer = setTimeout(function () { f.q = v.trim(); loadUnits(true); }, 350); });
  $('uMore').addEventListener('click', function () { if (page < lastPage) { page++; loadUnits(false); } });
  $('uReady').addEventListener('click', function () { f.delivery = f.delivery === 'Ready To Move' ? '' : 'Ready To Move'; syncFilterUI(); loadUnits(true); });
  $('uReset').addEventListener('click', function () { resetFilters(f.category); syncFilterUI(); loadUnits(true); });
  $('heroSearch').addEventListener('submit', function (e) {
    e.preventDefault();
    var cat = (document.querySelector('[data-hcat][aria-selected="true"]') || {}).dataset;
    resetFilters(cat && cat.hcat || 'Resale');
    f.city = $('hCity').value; f.type = $('hType').value; f.delivery = $('hDel').value;
    f.max_price = hNum('hPrice'); if (!hRent()) { f.max_down = hNum('hDown'); f[$('hMonthly').dataset.hk] = hNum('hMonthly'); }
    if ((f.max_monthly || f.max_quarter) && !f.max_price) f.sort = 'monthly_asc'; else if (f.max_down && !f.max_price) f.sort = 'down_asc';
    goUnits();
  });
  var H_BUD = {
    price: [['', 'المبلغ'], ['3000000', '3 مليون'], ['5000000', '5 مليون'], ['10000000', '10 مليون'], ['20000000', '20 مليون'], ['30000000', '30 مليون']],
    down: [['', 'المبلغ'], ['1000000', '1 مليون'], ['2000000', '2 مليون'], ['3000000', '3 مليون'], ['5000000', '5 مليون'], ['7000000', '7 مليون'], ['10000000', '10 مليون']],
    monthly: [['', 'المبلغ'], ['20000', '20 ألف'], ['40000', '40 ألف'], ['60000', '60 ألف'], ['100000', '100 ألف'], ['150000', '150 ألف']],
    rent: [['', 'الإيجار لحد'], ['20000', '20 ألف'], ['40000', '40 ألف'], ['70000', '70 ألف'], ['100000', '100 ألف'], ['200000', '200 ألف']]
  };
  function hNum(id) { return String($(id).value || '').replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); }).replace(/[^\d]/g, ''); }
  function hRent() { return ((document.querySelector('[data-hcat][aria-selected="true"]') || {}).dataset || {}).hcat === 'Rent'; }
  function hBud() {
    var rent = hRent();
    document.querySelectorAll('[data-hsale]').forEach(function (l) { l.hidden = rent; });
    $('hPrice').previousElementSibling.textContent = rent ? 'الإيجار الشهري' : 'إجمالي سعر الوحدة';
    $('heroSearch').classList.toggle('h-rent', rent);
    hCountSoon();
  }
  var hTimer, hSeq = 0;
  function hCountSoon() { clearTimeout(hTimer); hTimer = setTimeout(hCountNow, 350); }
  function hCountNow() {
    var q = ['per_page=1', 'category=' + (hRent() ? 'Rent' : 'Resale')];
    if ($('hCity').value) q.push('city=' + enc($('hCity').value));
    if ($('hType').value) q.push('type=' + enc($('hType').value));
    if ($('hDel').value) q.push('delivery=' + enc($('hDel').value));
    ['hPrice', 'hDown', 'hMonthly'].forEach(function (id) { var v = hNum(id); if (v && !(hRent() && id !== 'hPrice')) q.push($(id).dataset.hk + '=' + v); });
    var my = ++hSeq; $('hCount').textContent = '…';
    getJSON(API + '/units?' + q.join('&')).then(function (d) { if (my === hSeq) { var t = d.total || 0; $('hCount').textContent = t === 0 ? '(مفيش وحدات)' : t === 1 ? '(وحدة واحدة)' : t === 2 ? '(وحدتين)' : '(' + n(t) + (t <= 10 ? ' وحدات)' : ' وحدة)'); } }).catch(function () { if (my === hSeq) $('hCount').textContent = ''; });
  }
  ['hPrice', 'hDown', 'hMonthly'].forEach(function (id) { $(id).addEventListener('input', function () { var v = hNum(id); this.value = v ? Number(v).toLocaleString('en-US') : ''; hCountSoon(); }); });
  document.querySelectorAll('[data-hper]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault();
    document.querySelectorAll('[data-hper]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    $('hMonthly').dataset.hk = b.dataset.hper === 'q' ? 'max_quarter' : 'max_monthly'; hCountSoon(); }); });
  ['hCity', 'hType', 'hDel'].forEach(function (id) { $(id).addEventListener('change', hCountSoon); });
  document.querySelectorAll('[data-hcat]').forEach(function (b) { b.addEventListener('click', function () { setTimeout(hBud, 0); }); });
  hBud();
  $('backBtn').addEventListener('click', goBack);
  // keep «الوحدة دي» on the same baseline as «بكام» in the logo image (baseline sits at 55% of its height)
  function alignQ() {
    // the logo image: tall letters start at 2% of its height, baseline at 55% → its visual middle is ~33%
    var q = $('dkQ'), im = document.querySelector('.logo img'), ref = $('accBtn'); if (!im) return;
    im.style.transform = ''; if (q) q.style.transform = '';
    if (!im.offsetHeight) return;
    var r = im.getBoundingClientRect(), shift = 0;
    [ref, document.querySelector('.hdr .nav')].some(function (el) {
      if (!el || !el.offsetHeight) return false; var rb = el.getBoundingClientRect(), mid = rb.top + rb.height / 2;
      if (Math.abs(mid - (r.top + r.height / 2)) > 30) return false;
      shift = Math.round(mid - (r.top + r.height * 0.33)); im.style.transform = 'translateY(' + shift + 'px)'; return true; });
    if (!q || getComputedStyle(q).display === 'none') return;
    var probe = document.createElement('i'); probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
    q.appendChild(probe); var qb = probe.getBoundingClientRect().top; probe.remove();
    q.style.transform = 'translateY(' + Math.round(r.top + r.height * 0.552 + shift - qb) + 'px)';
  }
  window.addEventListener('resize', alignQ); window.addEventListener('load', alignQ); setTimeout(alignQ, 300); setTimeout(alignQ, 1500);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(alignQ);
  function hPh() { ['hCity', 'hType', 'hDel'].forEach(function (id) { var el = $(id); el.classList.toggle('ph-on', !el.value); }); }
  ['hCity', 'hType', 'hDel'].forEach(function (id) { $(id).addEventListener('change', hPh); }); setInterval(hPh, 1500); hPh();
  $('hCmpBtn').addEventListener('click', function (e) { e.stopPropagation(); var m = $('hCmpMenu'), open = m.hidden; m.hidden = !open; this.setAttribute('aria-expanded', open); });
  document.addEventListener('click', function (e) { if (!e.target.closest('.h-cmp')) { $('hCmpMenu').hidden = true; $('hCmpBtn').setAttribute('aria-expanded', 'false'); } });
  document.querySelectorAll('[data-cmpgo]').forEach(function (a) { a.addEventListener('click', function () { cmpMode = a.dataset.cmpgo; $('hCmpMenu').hidden = true; }); });

  var typeOpts = TYPE_FILTER.map(function (t) { return '<option value="' + t[0] + '">' + t[1] + '</option>'; }).join('');
  $('hType').innerHTML = '<option value=>نوع الوحدة</option>' + typeOpts.replace(/^<option value="">[^<]*<\/option>/, ''); $('fType').innerHTML = typeOpts;
  document.querySelectorAll('select[name=area]').forEach(function (s) { s.innerHTML = LEAD_AREAS.map(function (a) { return '<option value="' + a + '">' + city(a) + '</option>'; }).join(''); });

  /* ---------- FAVORITES ---------- */
  function toggleLike(id) {
    var now = !liked[id];
    liked[id] = now; if (!now) delete liked[id]; saveLiked();
    document.querySelectorAll('[data-like="' + id + '"]').forEach(function (b) { b.setAttribute('aria-pressed', now); });
    if (auth) api('/favorites/' + id, { method: 'POST' }).then(function (r) {
      if (r.liked !== now) { if (r.liked) liked[id] = true; else delete liked[id]; saveLiked(); document.querySelectorAll('[data-like="' + id + '"]').forEach(function (b) { b.setAttribute('aria-pressed', !!r.liked); }); }
    }).catch(function () { toast('محفظتش في حسابك، جرّب تاني'); });
    else if (now) toast('اتحفظت في المفضلة. سجّل دخول عشان تلاقيها في الأبلكيشن كمان.');
    if (location.hash === '#favorites' && !now) loadFavs();
  }
  /* units a salesman picked for a client: #c-<token> */
  function loadCollection(token) {
    var head = $('collHead'), grid = $('collGrid'), foot = $('collFoot');
    head.innerHTML = ''; foot.innerHTML = ''; grid.innerHTML = skeleton(6);
    api('/collections/' + token).then(function (d) {
      var s = d.sales || {};
      var units = d.units || [];
      var title = d.title || (n(units.length) + ' ' + tr('وحدات مختارة ليك'));
      document.title = 'بكام — ' + title;
      var wa = 'https://wa.me/' + (s.wa || '201113555557') + '?text=' + encodeURIComponent(pdfText('أهلاً' + (s.first_name ? ' ' + s.first_name : '') + '، شفت الوحدات اللي بعتهالي على بكام وعايز أعرف تفاصيل أكتر:\n', 'Hi' + (s.first_name ? ' ' + s.first_name : '') + ', I saw the units you sent me on Bekam and would like more details:\n') + location.origin + location.pathname.replace(/[^\/]*$/, '') + 'c/' + token);
      head.innerHTML =
        '<div class="coll-hero">' +
          '<div style="display:flex;flex-direction:column;gap:6px;min-width:0"><span class="coll-eyebrow">' + tr('مختارة ليك') + (s.name ? ' ' + tr('من') + ' ' + esc(s.name) : '') + '</span>' +
          '<h1>' + esc(title) + '</h1>' +
          '<span class="muted">' + tr('دوس على أي وحدة تشوف صورها وتفاصيلها وخطة السداد') + '</span></div>' +
          '<a class="btn btn-green" target="_blank" rel="noopener" href="' + esc(wa) + '"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>' + tr('كلّم') + ' ' + esc(s.first_name || tr('فريق بكام')) + '</a>' +
        '</div>';
      if (!units.length) {
        grid.innerHTML = '<div class="note" style="grid-column:1/-1">' + tr('الوحدات دي مبقتش متاحة. كلّمنا ونبعتلك اختيارات جديدة.') + '</div>';
        return;
      }
      grid.innerHTML = units.map(card).join('');
      if (d.gone) foot.innerHTML = '<p class="muted" style="padding-top:16px">' + n(d.gone) + ' ' + tr('وحدة من اللي اتبعتت مبقتش متاحة') + '</p>';
    }).catch(function () {
      grid.innerHTML = '<div class="note" style="grid-column:1/-1">' + tr('اللينك ده مش شغال. اتأكد منه أو كلّمنا.') + '</div>';
    });
  }

  function loadFavs() {
    var ids = Object.keys(liked).filter(function (k) { return liked[k]; });
    $('favSub').textContent = auth ? 'متزامنة مع حسابك على الأبلكيشن' : 'محفوظة على الجهاز ده. سجّل دخول عشان تتحفظ في حسابك.';
    if (!ids.length) { $('favGrid').innerHTML = ''; $('favEmpty').style.display = 'block'; return; }
    $('favEmpty').style.display = 'none'; $('favGrid').innerHTML = skeleton(Math.min(ids.length, 6));
    api('/units?per_page=48&ids=' + ids.join(',')).then(function (d) {
      $('favGrid').innerHTML = (d.data || []).map(card).join('');
      if (!(d.data || []).length) $('favEmpty').style.display = 'block';
    }).catch(function () { $('favGrid').innerHTML = '<div class="note">مقدرناش نحمّل المفضلة دلوقتي.</div>'; });
  }

  /* ---------- SHARE ---------- */
  function copyText(t) {
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { toast('اتنسخ اللينك'); })
      .catch(function () { window.prompt ? toast('انسخ: ' + t) : null; });
  }

  /* ---------- LIGHTBOX ---------- */
  var lbPhotos = [], lbIdx = 0, lbReturn = null;
  function openLightbox(i) {
    if (!lbPhotos.length) return;
    lbReturn = document.activeElement; lbIdx = i; showLb(); $('lightbox').hidden = false; document.body.style.overflow = 'hidden';
    $('lightbox').querySelector('[data-lbclose]').focus();
  }
  function showLb() { $('lbImg').src = lbPhotos[lbIdx]; $('lbImg').alt = 'صورة ' + (lbIdx + 1) + ' من ' + lbPhotos.length; $('lbCount').textContent = (lbIdx + 1) + ' / ' + lbPhotos.length; }
  function stepLightbox(dir) { lbIdx = (lbIdx + dir + lbPhotos.length) % lbPhotos.length; showLb(); }
  function closeLightbox(silent) { if ($('lightbox').hidden) return; $('lightbox').hidden = true; document.body.style.overflow = ''; if (!silent && lbReturn) lbReturn.focus(); }
  (function () {
    var x0 = null, lb = $('lightbox');
    lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) stepLightbox(dx > 0 ? -1 : 1); x0 = null; });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  })();

  /* ---------- ACCOUNT ---------- */
  var modalReturn = null;
  function openModal(tab) { modalReturn = document.activeElement; switchTab(tab || 'login'); $('accModal').hidden = false; setTimeout(function () { var f = $('accModal').querySelector('form:not([hidden]) input'); if (f) f.focus(); }, 30); }
  function closeModal() { $('accModal').hidden = true; if (modalReturn) modalReturn.focus(); }
  function switchTab(t) {
    document.querySelectorAll('[data-acctab]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.acctab === t); });
    $('loginForm').hidden = t !== 'login'; $('regForm').hidden = t !== 'register'; $('forgotForm').hidden = t !== 'forgot';
    $('accTitle').textContent = t === 'login' ? 'أهلاً بيك في بكام' : t === 'forgot' ? 'تغيير الباسوورد' : 'اعمل حساب في بكام';
    if (t === 'forgot') forgotStep(1);
  }
  function afterAuth(res) {
    auth = { token: res.token, user: res.user }; saveAuth();
    var local = Object.keys(liked).filter(function (k) { return liked[k]; }).map(Number);
    setLikedFromServer(res.favorites);
    if (local.length) api('/favorites/sync', { method: 'POST', body: { ids: local } }).then(function (m) { setLikedFromServer(m.favorites); }).catch(function () {});
    renderAccount(); closeModal(); toast('أهلاً ' + (res.user.first_name || ''));
    if (location.hash === '#favorites') loadFavs();
    if (location.hash === '#sell') showSell();
    if (location.hash === '#my-units') loadMine();
    if (/^#(account|notifications|request|alerts|project-\d+|unit-\d+|projects|edit-\d+)$/.test(location.hash)) route();
    refreshBell(true);
  }
  function authForm(id, path, collect) {
    var f = $(id);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = f.querySelector('.err'), btn = f.querySelector('button[type=submit]'), label = btn.textContent;
      err.textContent = ''; btn.disabled = true; btn.textContent = 'لحظة…';
      api(path, { method: 'POST', body: collect(new FormData(f)) }).then(function (r) { f.reset(); afterAuth(r); })
        .catch(function (x) {
          var msg = x.message;
          if (x.status === 422 && x.data && x.data.errors) { var k = Object.keys(x.data.errors)[0]; msg = ({ email: 'الإيميل مش صحيح', password: 'الباسوورد لازم 6 حروف على الأقل', phone: 'رقم الموبايل مش صحيح' })[k] || 'راجع البيانات'; }
          if (x.status === 429) msg = 'محاولات كتير. استنى شوية وجرّب تاني.';
          if (!x.status) msg = 'فيه مشكلة في الاتصال. جرّب تاني.';
          err.textContent = msg;
        })
        .then(function () { btn.disabled = false; btn.textContent = label; });
    });
  }
  authForm('loginForm', '/auth/login', function (fd) { return { login: fd.get('login'), password: fd.get('password') }; });
  authForm('regForm', '/auth/register', function (fd) { var o = {}; fd.forEach(function (v, k) { o[k] = v; }); return o; });
  /* «نسيت الباسوورد»: email → 6-digit code → new password (v54) */
  var fpStep = 1;
  function forgotStep(n) {
    var f = $('forgotForm'); fpStep = n;
    f.querySelectorAll('.fp-step1').forEach(function (x) { x.hidden = n !== 1; });
    f.querySelectorAll('.fp-step2').forEach(function (x) { x.hidden = n !== 2; });
    f.elements.email.required = n === 1; f.elements.code.required = n === 2; f.elements.password.required = n === 2;
    f.querySelector('button[type=submit]').textContent = n === 1 ? 'ابعتلي الكود' : 'غيّر الباسوورد';
    f.querySelector('.err').textContent = '';
  }
  $('forgotBtn').addEventListener('click', function () { var em = $('loginForm').elements.login.value; switchTab('forgot'); if (em.indexOf('@') > 0) $('forgotForm').elements.email.value = em; $('forgotForm').elements.email.focus(); });
  $('forgotBack').addEventListener('click', function () { switchTab('login'); });
  $('forgotForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = this, err = f.querySelector('.err'), btn = f.querySelector('button[type=submit]'), label = btn.textContent, em = f.elements.email.value.trim();
    err.textContent = ''; btn.disabled = true; btn.textContent = 'لحظة…';
    var req = fpStep === 1
      ? api('/password/forgot', { method: 'POST', body: { email: em } }).then(function (r) { forgotStep(2); f.querySelector('p.fp-step2').textContent = r.message || 'لو الإيميل ده عليه حساب، هيوصلك كود.'; f.elements.code.focus(); })
      : api('/password/reset', { method: 'POST', body: { email: em, code: f.elements.code.value.trim(), password: f.elements.password.value } }).then(function (r) {
          var login = em; f.reset(); switchTab('login'); $('loginForm').elements.login.value = login; $('loginForm').elements.password.focus();
          var ok = $('loginForm').querySelector('.err'); ok.textContent = r.message || 'الباسوورد اتغيّر. سجّل دخول.'; ok.style.color = '#1E7B4A';
          $('loginForm').addEventListener('submit', function () { ok.style.color = ''; }, { once: true });
        });
    req.catch(function (x) {
      var msg = x.message;
      if (x.status === 422 && x.data && x.data.errors) { var k = Object.keys(x.data.errors)[0]; msg = ({ email: 'الإيميل مش صحيح', code: 'الكود 6 أرقام', password: 'الباسوورد لازم 6 حروف على الأقل' })[k] || 'راجع البيانات'; }
      if (x.status === 429) msg = 'محاولات كتير. استنى 10 دقايق وجرّب تاني.';
      if (!x.status) msg = 'فيه مشكلة في الاتصال. جرّب تاني.';
      err.textContent = msg;
    }).then(function () { btn.disabled = false; if (btn.textContent === 'لحظة…') btn.textContent = label; });
  });
  $('accBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    if (!auth) return openModal('login');
    var m = $('accMenu'), r = this.getBoundingClientRect();
    var cl = $('crmLink'); if (cl) cl.hidden = !(auth && auth.user && auth.user.staff);
    var vw = document.documentElement.clientWidth;
    m.style.top = (r.bottom + window.scrollY + 8) + 'px'; m.style.left = 'auto'; m.style.right = (vw - r.right) + 'px';
    m.hidden = !m.hidden;
    // v56: keep the whole menu on screen (the account button sits at the left edge in Arabic)
    if (!m.hidden) { var mr = m.getBoundingClientRect(); if (mr.left < 8) m.style.right = Math.max(8, vw - mr.width - 8) + 'px'; }
  });
  document.addEventListener('click', function (e) { if (!$('accMenu').hidden && !e.target.closest('#accMenu')) $('accMenu').hidden = true; });
  $('accMenu').addEventListener('click', function () { setTimeout(function () { $('accMenu').hidden = true; }, 0); });
  $('logoutBtn').addEventListener('click', function () {
    var t = auth; if (t) api('/auth/logout', { method: 'POST' }).catch(function () {});
    auth = null; saveAuth(); liked = {}; saveLiked(); renderAccount();
    document.querySelectorAll('[data-like]').forEach(function (b) { b.setAttribute('aria-pressed', false); });
    toast('اتسجّل خروجك'); if (location.hash === '#favorites') loadFavs();
    if (/^#(sell|my-units|account|notifications|edit-\d+)$/.test(location.hash)) location.hash = 'home';
  });
  $('accModal').addEventListener('click', function (e) { if (e.target === this) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (!$('lightbox').hidden) closeLightbox(); else if (!$('accModal').hidden) closeModal(); else $('accMenu').hidden = true; }
    if (!$('lightbox').hidden && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) stepLightbox(e.key === 'ArrowLeft' ? 1 : -1);
  });
  /* ---------- SELL ---------- */
  var sellOpts = null, sellFiles = [], sellCat = 'Resale';
  var LEVELS = [['Ground Floor', 'أرضي']].concat(Array.from({ length: 20 }, function (_, i) { return [String(i + 1), 'الدور ' + (i + 1)]; })).concat([['Penthouse', 'روف / بنتهاوس']]);
  function opt(v, l) { return '<option value="' + esc(v) + '">' + esc(l) + '</option>'; }
  function setSellCat(c) {
    sellCat = c;
    document.querySelectorAll('[data-scat]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.scat === c); });
    $('sPriceLbl').textContent = c === 'Rent' ? 'الإيجار الشهري (ج.م) *' : 'السعر الإجمالي (ج.م) *';
    document.querySelectorAll('.rent-hide').forEach(function (el) { el.style.display = c === 'Rent' ? 'none' : ''; });
  }
  function showSell(id) {
    var logged = !!auth;
    if ((id || null) !== editId || id) setEditMode(id || null);
    $('sOwner').hidden = !(auth && auth.user && auth.user.staff);
    $('sellGate').style.display = logged ? 'none' : 'flex';
    $('sellForm').style.display = logged && $('sellDone').style.display !== 'flex' ? 'flex' : 'none';
    if (!logged) { $('sellDone').style.display = 'none'; return; }
    ensureSellOpts().then(function () { if (id) loadEdit(id); });
  }
  function ensureSellOpts() {
    if (sellOpts) return Promise.resolve(sellOpts);
    return getOpts().then(function (o) {
      sellOpts = o;
      $('sType').innerHTML = opt('', 'اختار') + o.types.map(function (t) { return opt(t, TYPE_AR[t] || t); }).join('');
      $('sCity').innerHTML = opt('', 'اختار') + o.cities.map(function (c) { return opt(c, city(c)); }).join('');
      $('sDev').innerHTML = opt('', 'خارج مشروع') + o.developers.map(function (d) { return opt(d.id, d.name); }).join('');
      fillProjects('');
      $('sLevel').innerHTML = opt('', '—') + LEVELS.map(function (l) { return opt(l[0], l[1]); }).join('');
      $('sFin').innerHTML = opt('', '—') + o.finishings.map(function (x) { return opt(x, FIN_AR[x] || x); }).join('');
      $('sDel').innerHTML = opt('', '—') + o.delivery.map(function (x) { return opt(x, DEL_AR[x] || x); }).join('');
      $('sServ').innerHTML = o.services.map(function (x) { return '<label><input type="checkbox" name="services" value="' + x.id + '">' + esc(x.name) + '</label>'; }).join('');
    }).catch(function () { $('sErr').textContent = 'مقدرناش نحمّل الاختيارات. اعمل refresh.'; });
  }
  var editId = null, editPhotos = [], editRemove = {};
  function setEditMode(id) {
    editId = id; editPhotos = []; editRemove = {}; sellFiles = [];
    $('sellForm').reset(); setSellCat('Resale'); renderThumbs(); $('sErr').textContent = '';
    if (id) { $('sellDone').style.display = 'none'; }
    $('sellTitle').textContent = id ? 'عدّل وحدتك' : 'اعرض وحدتك على بكام';
    $('sellIntro').textContent = id ? 'بعد التعديل الوحدة بترجع لفريق بكام يراجعها قبل ما تظهر تاني.' : 'الوحدة هتظهر على الموقع وعلى أبلكيشن بكام بعد ما فريق بكام يراجعها، وغالباً ده بياخد أقل من يوم عمل.';
    $('sSubmit').textContent = id ? 'احفظ التعديلات' : 'ابعت الوحدة للمراجعة';
  }
  function loadEdit(id) {
    var form = $('sellForm');
    $('sErr').textContent = 'بنحمّل بيانات الوحدة…';
    api('/my-units/' + id).then(function (u) {
      if (editId !== id) return;
      $('sErr').textContent = '';
      setSellCat(u.category === 'Rent' ? 'Rent' : 'Resale');
      ['type', 'city', 'level', 'finishing', 'delivery_date'].forEach(function (k) { var el = form.querySelector('[name="' + k + '"]'); if (el && u[k] && !el.querySelector('option[value="' + String(u[k]).replace(/"/g, '') + '"]')) el.insertAdjacentHTML('beforeend', opt(u[k], TYPE_AR[u[k]] || FIN_AR[u[k]] || DEL_AR[u[k]] || city(u[k]))); });
      var set = function (name, v) { var el = form.querySelector('[name="' + name + '"]'); if (el && v != null) el.value = el.hasAttribute('data-money') ? Number(v).toLocaleString('en-US') : v; };
      ['type', 'city', 'size', 'bedrooms', 'bathrooms', 'level', 'finishing', 'delivery_date', 'description', 'price', 'down_payment', 'quarter_installment'].forEach(function (k) { set(k, u[k]); });
      $('sDev').value = u.developer_id || ''; fillProjects($('sDev').value); $('sProj').value = u.project_id || '';
      (u.services || []).forEach(function (sid) { var c = form.querySelector('input[name=services][value="' + sid + '"]'); if (c) c.checked = true; });
      editPhotos = u.photos || []; renderThumbs();
      if (u.owner) { set('owner_name', u.owner.name); set('owner_phone', u.owner.phone); }
    }).catch(function () { $('sErr').textContent = 'مقدرناش نحمّل الوحدة. ارجع لـ "وحداتي" وجرّب تاني.'; });
  }
  function fillProjects(devId) {
    var list = sellOpts.projects.filter(function (p) { return !devId || String(p.developer_id) === String(devId); });
    $('sProj').innerHTML = opt('', devId ? '— اختار المشروع —' : 'خارج مشروع') + list.map(function (p) { return opt(p.id, p.name); }).join('');
  }
  $('sDev').addEventListener('change', function () { if (sellOpts) fillProjects(this.value); });
  document.querySelectorAll('[data-money]').forEach(function (inp) {
    inp.addEventListener('input', function () { var v = this.value.replace(/[^\d]/g, ''); this.value = v ? Number(v).toLocaleString('en-US') : ''; });
  });
  function compress(file) {
    return new Promise(function (res) {
      if (!window.createImageBitmap || file.size < 600 * 1024) return res(file);
      createImageBitmap(file).then(function (bmp) {
        var max = 2000, k = Math.min(1, max / Math.max(bmp.width, bmp.height));
        var c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
        c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
        c.toBlob(function (b) { res(b && b.size < file.size ? new File([b], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' }) : file); }, 'image/jpeg', 0.85);
      }).catch(function () { res(file); });
    });
  }
  function addFiles(list) {
    var files = Array.prototype.filter.call(list, function (f) { return /^image\/(jpeg|png|webp)$/.test(f.type); });
    var have = sellFiles.length + keptPhotos().length; if (have + files.length > 15) { toast('أقصى عدد 15 صورة'); files = files.slice(0, Math.max(0, 15 - have)); }
    Promise.all(files.map(compress)).then(function (out) { sellFiles = sellFiles.concat(out); renderThumbs(); });
  }
  function baseName(u) { return String(u).split('?')[0].split('/').pop(); }
  function keptPhotos() { return editPhotos.filter(function (p) { return !editRemove[baseName(p)]; }); }
  function renderThumbs() {
    var old = keptPhotos();
    $('thumbs').innerHTML = old.map(function (p, i) {
      return '<div class="thumb"><img src="' + esc(p) + '" alt="صورة ' + (i + 1) + '">' + (i === 0 ? '<span class="cover-tag">الغلاف</span>' : '') + '<button type="button" data-rmold="' + esc(baseName(p)) + '" aria-label="شيل صورة ' + (i + 1) + '">×</button></div>';
    }).join('') + sellFiles.map(function (f, i) {
      var u = URL.createObjectURL(f);
      return '<div class="thumb"><img src="' + u + '" alt="صورة ' + (old.length + i + 1) + '">' + (old.length + i === 0 ? '<span class="cover-tag">الغلاف</span>' : '') + '<button type="button" data-rmphoto="' + i + '" aria-label="شيل صورة ' + (i + 1) + '">×</button></div>';
    }).join('');
  }
  $('sFiles').addEventListener('change', function () { addFiles(this.files); this.value = ''; });
  ['dragenter', 'dragover'].forEach(function (ev) { $('drop').addEventListener(ev, function (e) { e.preventDefault(); this.classList.add('on'); }); });
  ['dragleave', 'drop'].forEach(function (ev) { $('drop').addEventListener(ev, function (e) { e.preventDefault(); this.classList.remove('on'); }); });
  $('drop').addEventListener('drop', function (e) { addFiles(e.dataTransfer.files); });
  $('sellForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = this, err = $('sErr'), btn = $('sSubmit'), fd = new FormData();
    var g = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? String(el.value).trim() : ''; };
    var money = function (n) { return g(n).replace(/[^\d]/g, ''); };
    var miss = [];
    if (!g('type')) miss.push('نوع الوحدة'); if (!g('city')) miss.push('المنطقة'); if (!g('size')) miss.push('المساحة'); if (!money('price')) miss.push('السعر'); if (!sellFiles.length && !keptPhotos().length) miss.push('صورة واحدة على الأقل');
    if (miss.length) { err.textContent = 'ناقص: ' + miss.join('، '); return; }
    fd.append('category', sellCat);
    ['type', 'city', 'project_id', 'size', 'bedrooms', 'bathrooms', 'level', 'finishing', 'delivery_date', 'description', 'note'].concat(auth && auth.user && auth.user.staff ? ['owner_name', 'owner_phone'] : []).forEach(function (n) { if (g(n)) fd.append(n, g(n)); });
    ['price', 'down_payment', 'quarter_installment'].forEach(function (n) { if (money(n) && !(sellCat === 'Rent' && n !== 'price')) fd.append(n, money(n)); });
    form.querySelectorAll('input[name=services]:checked').forEach(function (c) { fd.append('services[]', c.value); });
    sellFiles.forEach(function (f, i) { fd.append('images[]', f, f.name || ('photo' + i + '.jpg')); });
    if (editId) Object.keys(editRemove).forEach(function (k) { fd.append('remove[]', k); });
    var wasEdit = editId, submitLabel = btn.textContent;
    err.textContent = ''; btn.disabled = true; btn.textContent = 'بنرفع الصور…'; $('sProg').hidden = false;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', API + '/my-units' + (wasEdit ? '/' + wasEdit : ''));
    xhr.setRequestHeader('Accept', 'application/json');
    if (auth && auth.token) xhr.setRequestHeader('Authorization', 'Bearer ' + auth.token);
    xhr.upload.onprogress = function (ev) { if (ev.lengthComputable) $('sProg').firstElementChild.style.width = Math.round(ev.loaded / ev.total * 100) + '%'; };
    xhr.onload = function () {
      var j = {}; try { j = JSON.parse(xhr.responseText); } catch (x) {}
      btn.disabled = false; btn.textContent = submitLabel; $('sProg').hidden = true; $('sProg').firstElementChild.style.width = '0';
      if (wasEdit && xhr.status === 200) {
        toast(j.state === 'approved' ? 'التعديلات اتحفظت' : 'التعديلات اتحفظت، والوحدة رجعت للمراجعة');
        location.hash = 'my-units';
      } else if (xhr.status === 201) {
        form.reset(); sellFiles = []; renderThumbs(); setSellCat('Resale');
        $('sellDoneMsg').textContent = j.state === 'approved' ? 'الوحدة اتنشرت على الموقع والأبلكيشن.' : 'فريق بكام هيراجعها، وأول ما تتقبل هتظهر على الموقع والأبلكيشن. تقدر تتابع حالتها من صفحة "وحداتي".';
        form.style.display = 'none'; $('sellDone').style.display = 'flex'; window.scrollTo(0, 0);
      } else if (xhr.status === 401) { err.textContent = 'انتهت الجلسة. سجّل دخول تاني.'; auth = null; saveAuth(); renderAccount(); }
      else if (xhr.status === 413) err.textContent = 'الصور حجمها كبير. قلل العدد أو الحجم.';
      else if (xhr.status === 429) err.textContent = 'عرضت وحدات كتير في وقت قصير. جرّب بعد ساعة.';
      else if (j.errors) { var k = Object.keys(j.errors)[0]; err.textContent = j.errors[k][0]; }
      else if (j.message && xhr.status < 500) err.textContent = j.message;
      else err.textContent = 'حصلت مشكلة. جرّب تاني أو كلّمنا على ' + PHONE + '.';
    };
    xhr.onerror = function () { btn.disabled = false; btn.textContent = submitLabel; $('sProg').hidden = true; err.textContent = 'فيه مشكلة في الاتصال. جرّب تاني.'; };
    xhr.send(fd);
  });
  $('sellForm').addEventListener('input', function () { $('sErr').textContent = ''; });
  $('sellAgain').addEventListener('click', function () { $('sellDone').style.display = 'none'; $('sellForm').style.display = 'flex'; });

  /* ---------- MY UNITS ---------- */
  var STATE_AR = { approved: 'منشورة', pending: 'تحت المراجعة', rejected: 'مرفوضة', removed: 'مشالة' };
  function loadMine() {
    if (!auth) { $('myList').innerHTML = ''; $('myEmpty').style.display = 'block'; $('myEmpty').innerHTML = 'سجّل دخول عشان تشوف وحداتك. <button type="button" class="btn btn-blue" data-login style="min-height:44px;margin-top:10px">تسجيل الدخول</button>'; return; }
    $('myEmpty').innerHTML = 'لسه معرضتش وحدات. <a href="#sell">اعرض أول وحدة</a>';
    $('myList').innerHTML = '<div class="muted">بنحمّل…</div>';
    api('/my-units').then(function (rows) {
      $('myEmpty').style.display = rows.length ? 'none' : 'block';
      $('myList').innerHTML = rows.map(function (u) {
        return '<div class="myrow"><div class="th">' + (u.photo ? '<img src="' + esc(u.photo) + '" alt="" loading="lazy">' : '') + '</div>' +
          '<div style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:4px"><b>' + esc(type(u.type)) + (u.project ? ' في ' + esc(u.project) : ' — ' + esc(city(u.city))) + '</b>' +
          '<span class="muted" style="font-size:14px">' + [u.size ? u.size + ' م²' : '', u.bedrooms ? u.bedrooms + ' غرف' : '', priceLabel(u)].filter(Boolean).join(' · ') + '</span>' +
          (u.reason ? '<span class="note">السبب: ' + esc(u.reason) + '</span>' : '') + '</div>' +
          '<span class="state st-' + u.state + '">' + STATE_AR[u.state] + '</span>' +
          (u.state === 'approved' ? '<a class="btn btn-line" style="min-height:44px" href="#unit-' + u.id + '">افتحها</a>' : '') +
          (u.state !== 'removed' ? '<a class="btn btn-line" style="min-height:44px" href="#edit-' + u.id + '">عدّل</a>' : '') +
          (u.state !== 'removed' ? '<button type="button" class="btn btn-line" style="min-height:44px" data-delunit="' + u.id + '">' + (u.state === 'approved' ? 'شيلها' : 'امسحها') + '</button>' : '') +
          ownerWa(u) + '</div>';
      }).join('');
    }).catch(function () { $('myList').innerHTML = '<div class="note">مقدرناش نحمّل وحداتك دلوقتي.</div>'; });
  }
  /* staff: ask the owner on WhatsApp if the unit is still available / price changed */
  function waPhone(p) {
    p = String(p || '').replace(/\D/g, '');
    if (p.indexOf('00') === 0) p = p.slice(2);
    if (p.length === 11 && p.charAt(0) === '0') p = '2' + p;
    else if (p.length === 10 && p.charAt(0) === '1') p = '20' + p;
    return p.length >= 10 ? p : '';
  }
  function ownerMsg(u) {
    var me = auth && auth.user ? (auth.user.first_name || auth.user.name || '') : '';
    var nm = u.owner.name ? ' أستاذ ' + u.owner.name : '';
    var where = esc0(type(u.type)) + (u.project ? ' في ' + u.project : (u.city ? ' — ' + city(u.city) : ''));
    var plan = [u.down_payment ? 'مقدم ' + n(u.down_payment) + ' ج' : '', u.quarter_installment ? 'قسط ربع سنوي ' + n(u.quarter_installment) + ' ج' : ''].filter(Boolean).join('، ');
    return 'أهلاً' + nm + '، معاك ' + me + ' من بكام.\n' +
      'بخصوص وحدتك: ' + where + (u.size ? ' — ' + u.size + ' م²' : '') + '، معروضة عندنا بسعر ' + priceLabel(u) + (plan ? ' (' + plan + ')' : '') + '.\n' +
      'حبيت أتأكد إن الوحدة لسه متاحة، وهل في أي تعديل في السعر' + (u.category === 'Rent' ? '' : ' أو المقدم أو الأقساط') + '؟\nشكراً 🙏';
  }
  function esc0(x) { return String(x == null ? '' : x); }
  function ownerSeen(id) { try { return +localStorage.getItem('bk_ownerwa_' + id) || 0; } catch (e) { return 0; } }
  function ownerWa(u) {
    var p = u.owner && waPhone(u.owner.phone); if (!p || u.state === 'removed') return '';
    var t = ownerSeen(u.id), days = t ? Math.floor((Date.now() - t) / 864e5) : -1;
    var last = days < 0 ? '' : '<span class="muted owner-last">آخر تواصل: ' + (days === 0 ? 'النهارده' : days === 1 ? 'إمبارح' : 'من ' + days + ' يوم') + '</span>';
    return '<a class="btn btn-wa" style="min-height:44px" target="_blank" rel="noopener" data-ownerwa="' + u.id + '" href="https://wa.me/' + p + '?text=' + encodeURIComponent(ownerMsg(u)) + '">' +
      '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>' +
      'تواصل مع المالك</a>' + last;
  }
  var pendingDel = null;
  function delUnit(id, btn) {
    if (pendingDel !== id) { pendingDel = id; btn.textContent = 'متأكد؟ دوس تاني'; setTimeout(function () { if (pendingDel === id) { pendingDel = null; loadMine(); } }, 4000); return; }
    pendingDel = null; btn.disabled = true;
    api('/my-units/' + id, { method: 'DELETE' }).then(function () { toast('اتشالت'); loadMine(); }).catch(function () { toast('مقدرناش نشيلها، جرّب تاني'); btn.disabled = false; });
  }

  /* ================= v2.0 — app parity ================= */
  var SERV_AR = LANG === 'en' ? {} : { 'Private Swimming Pool': 'حمام سباحة خاص', 'Swimming Pool': 'حمام سباحة', 'Garden': 'جاردن', 'Nanny Room': 'غرفة مربية', 'Roof': 'روف', 'Sea View': 'فيو بحر', 'Lagoon View': 'فيو لاجون', 'Garage': 'جراج', 'Elevator': 'أسانسير', 'Security': 'أمن', 'Club House': 'كلوب هاوس', 'Gym': 'جيم', 'Kids Area': 'منطقة أطفال' };
  function star(on) { return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="' + (on ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/></svg>'; }
  function rateText(r) { return r && r.count ? 'التقييم ' + r.avg + ' من 5 (' + n(r.count) + ' تقييم)' : 'لسه محدش قيّمها'; }
  function rateUnit(id, v) {
    if (!auth) { toast('سجّل دخول عشان تقيّم'); openModal('login'); return; }
    api('/units/' + id + '/rate', { method: 'POST', body: { value: v } }).then(function (r) {
      document.querySelectorAll('[data-rateunit="' + id + '"]').forEach(function (b) { var i = +b.dataset.rate; b.innerHTML = star(i <= r.mine); b.setAttribute('aria-pressed', i === r.mine); });
      var s = $('rateSum'); if (s) s.textContent = rateText(r);
      var h = $('rateHint'); if (h) h.textContent = 'تقييمك ' + r.mine + ' من 5. تقدر تغيّره.';
      toast('شكراً على تقييمك');
    }).catch(function () { toast('التقييم متسجلش، جرّب تاني'); });
  }

  var optsP = null;
  function getOpts() { if (!optsP) optsP = api('/listing-options').catch(function (e) { optsP = null; throw e; }); return optsP; }

  /* ----- more filters ----- */
  var moreFilled = false;
  function fillMore() {
    if (moreFilled) return Promise.resolve();
    return getOpts().then(function (o) {
      moreFilled = true;
      $('fFin').innerHTML = opt('', 'الكل') + o.finishings.map(function (x) { return opt(x, FIN_AR[x] || x); }).join('');
      $('fDel').innerHTML = opt('', 'الكل') + o.delivery.map(function (x) { return opt(x, DEL_AR[x] || x); }).join('');
      $('fDev').innerHTML = opt('', 'الكل') + o.developers.map(function (d) { return opt(d.id, d.name); }).join('');
      $('fServ').innerHTML = o.services.map(function (x) { return '<label><input type="checkbox" value="' + x.id + '">' + esc(SERV_AR[x.name] || x.name) + '</label>'; }).join('');
      syncMore();
    }).catch(function () {});
  }
  function fillFProj(devId) {
    if (!moreFilled) return;
    getOpts().then(function (o) {
      $('fProj').innerHTML = opt('', 'الكل') + o.projects.filter(function (p) { return !devId || String(p.developer_id) === String(devId); }).map(function (p) { return opt(p.id, p.name); }).join('');
    });
  }
  function syncMore() {
    var k = MORE.filter(function (x) { return f[x]; }).length + (f.developer_id ? 1 : 0) + (f.project_id ? 1 : 0);
    $('moreCount').textContent = k; $('moreCount').hidden = !k;
    if (!moreFilled) return;
    $('fMinSize').value = f.min_size; $('fMaxSize').value = f.max_size; $('fMaxDown').value = f.max_down ? n(f.max_down) : ''; $('fMaxMonthly').value = f.max_monthly ? n(f.max_monthly) : ''; $('fBaths').value = f.baths; $('fFin').value = f.finishing; $('fDel').value = f.delivery; $('fLic').value = f.license;
    $('fDev').value = f.developer_id || '';
    getOpts().then(function (o) {
      $('fProj').innerHTML = opt('', 'الكل') + o.projects.filter(function (p) { return !f.developer_id || String(p.developer_id) === String(f.developer_id); }).map(function (p) { return opt(p.id, p.name); }).join('');
      $('fProj').value = f.project_id || '';
    });
    var sel = String(f.services || '').split(',');
    $('fServ').querySelectorAll('input').forEach(function (c) { c.checked = sel.indexOf(c.value) >= 0; });
  }

  /* ----- offers & video ----- */
  function loadOffers() {
    api('/offers').then(function (d) {
      var list = (d.offers || []).slice(0, 12);
      $('offersSec').hidden = !list.length;
      $('offers').innerHTML = list.map(function (o) {
        var href = o.kind === 'unit' ? '#unit-' + o.id : '#project-' + o.id;
        var sub = o.kind === 'unit' ? [type(o.type), city(o.city), o.price ? priceLabel(o) : ''].filter(Boolean).join(' · ') : (o.developer || '');
        return '<a class="offer" href="' + href + '"><img src="' + esc(o.photo) + '" alt="عرض ' + esc(o.project || '') + '" loading="lazy" onerror="this.closest(\'.offer\').remove()"><span><b>' + esc(o.project || 'عرض خاص') + '</b><span class="muted" style="font-size:14px">' + esc(sub) + '</span></span></a>';
      }).join('');
      if (d.video) { $('videoSec').hidden = false; $('homeVideo').src = d.video; }
    }).catch(function () {});
  }

  /* ----- developers ----- */
  function initials(name) { return (name || '').replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase() || '؟'; }
  function logo(photo, name) { return photo ? '<img src="' + esc(photo) + '" alt="" loading="lazy" onerror="this.replaceWith(document.createTextNode(\'' + initials(name) + '\'))">' : initials(name); }
  var devAll = null;
  function loadDevelopers() {
    if (devAll) return renderDevs();
    $('devGrid').innerHTML = '<div class="muted">بنحمّل…</div>';
    api('/developers').then(function (rows) { devAll = rows; renderDevs(); })
      .catch(function () { $('devGrid').innerHTML = '<div class="note">مقدرناش نحمّل المطورين دلوقتي.</div>'; });
  }
  function renderDevs() {
    var q = $('devQ').value.trim().toLowerCase();
    var rows = devAll.filter(function (d) { return !q || String(d.name).toLowerCase().indexOf(q) >= 0; });
    $('devSub').textContent = n(devAll.length) + ' مطور';
    $('devGrid').innerHTML = rows.length ? rows.map(function (d) {
      return '<a class="devcard" href="#dev-' + d.id + '"><i>' + logo(d.photo, d.name) + '</i><span style="display:flex;flex-direction:column;gap:2px;min-width:0"><b>' + esc(d.name) + '</b><span class="muted" style="font-size:14px">' + n(d.units) + ' وحدة · ' + n(d.projects) + ' مشروع</span></span></a>';
    }).join('') : '<div class="muted">مفيش مطور بالاسم ده.</div>';
  }
  $('devQ').addEventListener('input', function () { if (devAll) renderDevs(); });
  function projCard(p) {
    return '<a class="proj" href="#project-' + p.id + '">' + img(p.photo, p.name, 'cover abs') + pcmpChip(p.id) +
      '<span class="in"><b style="font-size:20px">' + esc(p.name) + '</b><span class="muted" style="font-size:15px">' + esc([p.developer, city(p.city)].filter(Boolean).join(' · ')) + '</span>' +
      '<span style="font-size:15px;color:var(--blue);font-weight:700">' + (p.units ? n(p.units) + ' وحدة متاحة' : 'مفيش وحدات متاحة دلوقتي') + (p.min_price ? ' · يبدأ من ' + short(p.min_price) : '') + '</span></span></a>';
  }
  /* ----- developer page: everything a client wants to know (our numbers + researched profile, refreshed daily) ----- */
  var AREA_LL = { '6 October': [29.96, 30.93], 'North Coast': [30.93, 28.80], 'El Sheikh Zayed': [30.045, 30.985], 'New Zayed': [30.10, 30.90],
    'New Cairo': [30.03, 31.47], 'The 5th Settlement': [30.01, 31.43], 'Ras El Hikma': [31.20, 27.86], 'Sokhna': [29.60, 32.32], 'Mostakbal city': [30.12, 31.68],
    'New Alamein': [30.83, 28.95], 'New Capital': [30.02, 31.76], 'Alexandria': [31.20, 29.92], 'El Shorouk': [30.14, 31.61], 'Sidi Abdel Rahman': [30.97, 28.72],
    'Marsa Matrouh': [31.35, 27.24], 'Mokattam': [30.02, 31.30], 'Cairo Alex Desert Road': [30.20, 30.70], 'Cairo-Suez Road': [30.10, 31.55] };
  function devFact(icon, label, val) { return val ? '<div class="dv-fact"><span aria-hidden="true">' + icon + '</span><small>' + label + '</small><b>' + esc(val) + '</b></div>' : ''; }
  function devTile(val, label, cls) { return val ? '<div class="dv-tile ' + (cls || '') + '"><b>' + val + '</b><small>' + label + '</small></div>' : ''; }
  function loadDev(id) {
    var box = $('devBox'); box.innerHTML = '<div class="muted" style="padding:40px 0">بنحمّل…</div>';
    api('/developers/' + id).then(function (d) {
      document.title = 'بكام — ' + d.name;
      var pr = d.profile || {}, st = d.stats || {}, en = LANG === 'en';
      var about = (en && pr.about_en) || pr.about_ar || (esc(d.name) + ' عندها ' + n(st.units || d.units) + ' وحدة متاحة على بكام في ' + n(st.projects_live || d.projects.length) + ' مشروع.');
      var cities = Object.keys(st.cities || {});
      var upd = pr.updated_at ? new Date(pr.updated_at.replace(' ', 'T')) : null;
      var updTxt = upd && !isNaN(upd) ? upd.toLocaleDateString(en ? 'en-GB' : 'ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
      var html = '<nav aria-label="مسار الصفحة" style="display:flex;gap:8px;font-size:15px;color:var(--mut);padding-bottom:18px"><a href="#home">الرئيسية</a><span aria-hidden="true">/</span><a href="#developers">المطورين</a></nav>' +
        '<section class="dv-hero">' +
          '<div class="dv-id"><span class="devcard dv-logo"><i>' + logo(d.photo, d.name) + '</i></span><div><h1>' + esc(d.name) + '</h1>' +
            '<span class="dv-sub">' + n(st.units || d.units) + ' وحدة متاحة · ' + n(st.projects_live || 0) + ' مشروع فيه وحدات' + (cities.length ? ' · ' + cities.slice(0, 3).map(city).join('، ') : '') + '</span></div></div>' +
          '<p class="dv-about">' + esc(about) + '</p>' +
          '<div class="dv-facts">' + devFact('🗓', 'سنة التأسيس', pr.founded) + devFact('📍', 'المقر', pr.hq) + devFact('👤', 'الإدارة', pr.leaders) + devFact('📈', 'البورصة', pr.listed) +
            (pr.regions && pr.regions.length ? devFact('🗺', 'بيبني في', pr.regions.join('، ')) : '') + '</div>' +
          '<div class="dv-cta">' + (d.units ? '<a class="btn btn-blue" href="#units" data-dev="' + d.id + '" data-devname="' + esc(d.name) + '">كل وحدات ' + esc(d.name) + ' (' + n(d.units) + ')</a>' : '') +
            (st.ready ? '<a class="btn dv-ready-btn" href="#units" data-devready="' + d.id + '" data-devname="' + esc(d.name) + '">🔑 ' + n(st.ready) + ' وحدة استلام فوري</a>' : '') +
            (pr.website ? '<a class="btn btn-line" target="_blank" rel="noopener" href="' + esc(pr.website) + '">الموقع الرسمي</a>' : '') + '</div>' +
        '</section>' +
        '<section class="dv-tiles">' + devTile(n(st.units), 'وحدة متاحة') + devTile(st.ready ? n(st.ready) : '', 'استلام فوري', 'green') + devTile(st.min_price ? short(st.min_price) : '', 'يبدأ من') +
          devTile(st.price_m2 ? n(st.price_m2) + ' ج' : '', 'متوسط سعر المتر') + devTile(st.min_down ? short(st.min_down) : '', 'أقل مقدم') + devTile(st.rent ? n(st.rent) : '', 'للإيجار') + '</section>' +
        '<section class="dv-grid">' +
          '<div class="dv-card dv-mapcard"><h2>مشروعات ' + esc(d.name) + ' على الخريطة</h2><div class="map" id="devMap"></div><p class="muted dv-small">الدواير = عدد الوحدات المتاحة في كل منطقة. دوس على أي منطقة تشوف وحداتها.</p></div>' +
          '<div class="dv-card"><h2>سجل المطور</h2>' +
            (pr.track && pr.track.length ? '<div class="dv-track">' + pr.track.map(function (t) { return '<div><b>' + esc(t.value) + '</b><span>' + esc(t.label) + '</span>' + (t.note ? '<small>' + esc(t.note) + '</small>' : '') + '</div>'; }).join('') + '</div>' : '') +
            (pr.highlights && pr.highlights.length ? '<ul class="dv-hl">' + pr.highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>' : '') +
            (pr.signature && pr.signature.length ? '<h3>أشهر المشروعات</h3><div class="dv-chips">' + pr.signature.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div>' : '') +
            (!pr.track && !pr.highlights ? '<p class="muted">بنجمّع معلومات المطور ده، وهتظهر هنا قريب.</p>' : '') +
          '</div>' +
        '</section>' +
        (pr.news && pr.news.length ? '<section class="dv-card dv-news"><h2>آخر أخبار ' + esc(d.name) + '</h2><ol>' + pr.news.map(function (x) {
          var dt = x.date ? new Date(x.date) : null;
          return '<li><time>' + (dt && !isNaN(dt) ? dt.toLocaleDateString(en ? 'en-GB' : 'ar-EG', { day: 'numeric', month: 'short', year: 'numeric' }) : esc(x.date)) + '</time><p>' + esc(x.title) + '</p>' +
            (x.url ? '<a target="_blank" rel="noopener" href="' + esc(x.url) + '">' + esc(x.source || 'المصدر') + ' ↗</a>' : (x.source ? '<small>' + esc(x.source) + '</small>' : '')) + '</li>'; }).join('') + '</ol></section>' : '') +
        '<h2 style="font-weight:800;font-size:26px;margin:28px 0 14px">المشروعات</h2>' +
        (function () {
          var live = d.projects.filter(function (p) { return p.units > 0; }), rest = d.projects.filter(function (p) { return !(p.units > 0); });
          var g = function (rows) { return '<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px">' + rows.map(function (p) { p.developer = d.name; return projCard(p); }).join('') + '</div>'; };
          if (!d.projects.length) return '<p class="muted">مفيش مشروعات مسجلة.</p>';
          return (live.length ? g(live) : '') + (rest.length ? '<details class="dv-more"><summary>مشروعات تانية لـ ' + esc(d.name) + ' مفيهاش وحدات متاحة دلوقتي (' + n(rest.length) + ')</summary>' +
            '<div class="dv-chips" style="margin-top:12px">' + rest.map(function (p) { return '<a href="#project-' + p.id + '"><span>' + esc(p.name) + '</span></a>'; }).join('') + '</div></details>' : '');
        })() +
        ((updTxt || (pr.sources && pr.sources.length)) ? '<p class="dv-src">' + (updTxt ? '🔄 آخر تحديث للمعلومات: ' + updTxt + '. المعلومات بتتحدّث كل يوم من مصادر عامة. ' : '') +
          (pr.sources && pr.sources.length ? 'المصادر: ' + pr.sources.map(function (x) { return '<a target="_blank" rel="noopener" href="' + esc(x.url) + '">' + esc(x.title || x.url) + '</a>'; }).join(' · ') : '') + '</p>' : '');
      box.innerHTML = html;
      // map: area circles sized by units, exact pins where the project has a location
      makeMap($('devMap'), EG, 7).then(function (m) {
        var L = window.L, b = [], mx = 1;
        cities.forEach(function (c) { mx = Math.max(mx, st.cities[c]); });
        cities.forEach(function (c) {
          var ll = AREA_LL[c]; if (!ll) return;
          var k = st.cities[c], r = 9 + 22 * Math.sqrt(k / mx);
          L.circleMarker(ll, { radius: r, color: '#06555C', weight: 2, fillColor: '#14A3AC', fillOpacity: .45 }).addTo(m)
            .bindTooltip('<b>' + esc(city(c)) + '</b> · ' + n(k) + ' وحدة', { direction: 'top', permanent: cities.length <= 5 })
            .on('click', function () { resetFilters('Resale'); f.developer_id = String(d.id); f.city = c; f.label = d.name; goUnits(); });
          b.push(ll);
        });
        d.projects.forEach(function (p) { if (p.lat != null) { L.marker([p.lat, p.lng], { icon: pin(L), title: p.name }).addTo(m).bindPopup('<b>' + esc(p.name) + '</b><br>' + n(p.units) + ' وحدة<br><a href="#project-' + p.id + '">افتح المشروع</a>'); b.push([p.lat, p.lng]); } });
        if (b.length > 1) m.fitBounds(b, { padding: [40, 40], maxZoom: 10 }); else if (b.length) m.setView(b[0], 10);
      }).catch(function () { var el = $('devMap'); if (el) el.innerHTML = '<div class="muted" style="padding:20px">الخريطة مش راضية تحمّل دلوقتي.</div>'; });
    }).catch(function () { box.innerHTML = '<div style="padding:40px 0"><h1 style="font-size:26px;font-weight:800">المطور ده مش موجود</h1><a href="#developers">كل المطورين</a></div>'; });
  }

  /* ----- projects ----- */
  var projAll = null, projShown = 24;
  function loadProjects() {
    projShown = 24;
    if (projAll) return projView === 'map' ? drawProjMap() : renderProjs();
    $('projGrid').innerHTML = skeleton(6);
    api('/projects?with_units=1').then(function (rows) { projAll = rows; if (projView === 'map') drawProjMap(); else renderProjs(); })
      .catch(function () { $('projGrid').innerHTML = '<div class="note">مقدرناش نحمّل المشروعات دلوقتي.</div>'; });
  }
  function renderProjs() {
    var q = $('projQ').value.trim().toLowerCase();
    var rows = projAll.filter(function (p) { return !q || (p.name + ' ' + (p.developer || '') + ' ' + city(p.city)).toLowerCase().indexOf(q) >= 0; });
    $('projSub').textContent = n(projAll.length) + ' مشروع فيه وحدات متاحة';
    $('projGrid').innerHTML = rows.length ? rows.slice(0, projShown).map(projCard).join('') : '<div class="muted">مفيش مشروع بالاسم ده.</div>';
    $('projMore').hidden = rows.length <= projShown;
  }
  var pqT; $('projQ').addEventListener('input', function () { clearTimeout(pqT); pqT = setTimeout(function () { if (projAll) { projShown = 24; if (projView === 'map') drawProjMap(); else renderProjs(); } }, 250); });
  $('projMore').addEventListener('click', function () { projShown += 24; renderProjs(); });

  var pu = { id: null, page: 1, last: 1 };
  function loadProject(id) {
    var box = $('projBox'); box.innerHTML = '<div class="muted" style="padding:40px 0">بنحمّل…</div>'; $('projUnits').innerHTML = ''; $('projUnitsMore').hidden = true;
    api('/projects/' + id).then(function (p) {
      document.title = 'بكام — ' + p.name;
      var desc = cleanDesc(p.description);
      var pLink = shareLink('p', p.id), wa = 'https://wa.me/' + WA + '?text=' + enc('أهلاً بكام، عايز أعرف تفاصيل مشروع ' + p.name + '\n' + pLink);
      box.innerHTML = '<nav aria-label="مسار الصفحة" style="display:flex;gap:8px;font-size:15px;color:var(--mut);padding-bottom:18px"><a href="#home">الرئيسية</a><span aria-hidden="true">/</span><a href="#projects">المشروعات</a></nav>' +
        '<div class="phero">' + (p.photo ? '<img class="bg" src="' + esc(p.photo) + '" alt="" onerror="this.remove()">' : '') + '<div class="in"><h1 style="font-weight:800;font-size:clamp(28px,4vw,42px)">' + esc(p.name) + '</h1><span style="font-size:17px">' + esc([p.developer, city(p.city)].filter(Boolean).join(' · ')) + '</span></div></div>' +
        '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-top:18px">' +
          [['وحدات متاحة', n(p.units)], ['أقل سعر ريسيل', p.min_price ? short(p.min_price) : '—'], ['أعلى سعر', p.max_price ? short(p.max_price) : '—']].map(function (s) { return '<div class="spec"><span class="muted">' + s[0] + '</span><b>' + s[1] + '</b></div>'; }).join('') + '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:18px"><a class="btn" style="background:#1F9D55;color:#fff" target="_blank" rel="noopener" href="' + wa + '">اسأل على المشروع واتساب</a>' +
          (p.developer_id ? '<a class="btn btn-line" href="#dev-' + p.developer_id + '">كل مشروعات ' + esc(p.developer) + '</a>' : '') +
          '<button type="button" class="btn btn-line pcmp-page" data-pcmp="' + p.id + '" aria-pressed="' + (pcmp.indexOf(+p.id) >= 0) + '">' + (pcmp.indexOf(+p.id) >= 0 ? 'في المقارنة ✓' : 'قارن المشروع') + '</button><button type="button" class="btn btn-line" data-share="' + esc(pLink) + '" data-sharetitle="' + esc(p.name) + '">مشاركة</button><a class="btn btn-line" target="_blank" rel="noopener" href="https://wa.me/?text=' + enc('مشروع ' + p.name + '\n' + pLink) + '">ابعته واتساب</a></div>' +
        (desc.length ? '<section style="margin-top:24px;display:flex;flex-direction:column;gap:12px"><h2 style="font-weight:800;font-size:26px">عن المشروع</h2><ul class="desc" translate="no">' + desc.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul></section>' : '') +
        locBlock('projLoc', p.lat != null ? { lat: p.lat, lng: p.lng } : null, p.id) +
        '<h2 style="font-weight:800;font-size:26px;margin-top:28px">الوحدات المتاحة في ' + esc(p.name) + '</h2>';
      pickLoc = p.lat != null ? { lat: p.lat, lng: p.lng } : null; drawMinimaps(box);
      pu = { id: id, page: 1, last: 1 }; loadProjUnits(true);
    }).catch(function () { box.innerHTML = '<div style="padding:40px 0"><h1 style="font-size:26px;font-weight:800">المشروع ده مش موجود</h1><a href="#projects">كل المشروعات</a></div>'; });
  }
  function loadProjUnits(reset) {
    if (reset) $('projUnits').innerHTML = skeleton(3);
    api('/units?per_page=12&page=' + pu.page + '&project_id=' + pu.id).then(function (d) {
      pu.last = d.last_page || 1;
      var html = (d.data || []).map(card).join('');
      if (reset) $('projUnits').innerHTML = html || '<div class="muted">مفيش وحدات متاحة دلوقتي. <a href="#request">اعمل طلب خاص</a> وهنكلمك أول ما يتوفر.</div>';
      else $('projUnits').insertAdjacentHTML('beforeend', html);
      $('projUnitsMore').hidden = pu.page >= pu.last;
    }).catch(function () { $('projUnits').innerHTML = '<div class="note">مقدرناش نحمّل الوحدات.</div>'; });
  }
  $('projUnitsMore').addEventListener('click', function () { pu.page++; loadProjUnits(false); });

  /* ----- special request ----- */
  var reqOrig = null;
  function showRequest() {
    var box = $('reqBox');
    if (reqOrig === null) reqOrig = box.innerHTML;
    var gb = box.querySelector('.guest-only'); if (gb) gb.hidden = !!auth;
    getOpts().then(function (o) {
      var t = box.querySelector('.optTypes'); if (!t || t.options.length) return;
      t.innerHTML = opt('', 'أي نوع') + o.types.map(function (x) { return opt(x, TYPE_AR[x] || x); }).join('');
      box.querySelector('.optCities').innerHTML = opt('', 'أي منطقة') + o.cities.map(function (x) { return opt(x, city(x)); }).join('');
      box.querySelector('.optFin').innerHTML = opt('', 'أي تشطيب') + o.finishings.map(function (x) { return opt(x, FIN_AR[x] || x); }).join('');
      box.querySelector('.optDel').innerHTML = opt('', 'أي وقت') + o.delivery.map(function (x) { return opt(x, DEL_AR[x] || x); }).join('');
    }).catch(function () {});
    bindReq();
  }
  function bindReq() {
    var box = $('reqBox'), form = $('reqForm');
    if (!form || form.dataset.bound) return; form.dataset.bound = '1';
    form.querySelectorAll('[data-money]').forEach(function (inp) { inp.addEventListener('input', function () { var v = this.value.replace(/[^\d]/g, ''); this.value = v ? Number(v).toLocaleString('en-US') : ''; }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form), err = form.querySelector('.err'), btn = form.querySelector('button[type=submit]');
      var cat = form.querySelector('[data-rcat][aria-pressed="true"]');
      var body = { category: cat ? cat.dataset.rcat : 'Resale', website: fd.get('website') || '' };
      ['type', 'city', 'developer_name', 'project_name', 'finishing', 'delivery_date', 'description'].forEach(function (k) { var v = String(fd.get(k) || '').trim(); if (v) body[k] = v; });
      ['bedrooms', 'size', 'price', 'down_payment'].forEach(function (k) { var v = String(fd.get(k) || '').replace(/[^\d]/g, ''); if (v) body[k] = Number(v); });
      if (!auth) {
        body.name = String(fd.get('name') || '').trim(); body.phone = String(fd.get('phone') || '').replace(/[^\d+]/g, '');
        if (body.name.length < 2) { err.textContent = 'اكتب اسمك.'; return; }
        if (!/^\+?\d{10,14}$/.test(body.phone)) { err.textContent = 'اكتب رقم موبايل صحيح، 11 رقم.'; return; }
      }
      if (!body.type && !body.city && !body.description && !body.price && !body.project_name) { err.textContent = 'قولنا على الأقل نوع الوحدة أو المنطقة أو الميزانية.'; return; }
      err.textContent = ''; btn.disabled = true; btn.textContent = 'بنبعت…';
      api('/requests', { method: 'POST', body: body }).then(function (r) {
        box.innerHTML = '<div class="ok" role="status"><b style="font-size:19px">طلبك وصل</b><span style="line-height:1.8;color:var(--mut2)">فريق بكام هيدوّرلك ويكلمك بالاختيارات المناسبة في أقرب وقت.</span>' + (r && r.alert ? '<span style="line-height:1.8;color:var(--mut2)">🔔 وعملنالك تنبيه: أول ما تنزل وحدة زي اللي طالبها هيجيلك إشعار على الموقع وأبلكيشن بكام. <a href="#alerts">تنبيهاتي</a></span>' : '') + '<button type="button" class="btn btn-line" style="align-self:flex-start;min-height:44px" id="reqAgain">طلب جديد</button></div>';
        $('reqAgain').addEventListener('click', function () { box.innerHTML = reqOrig; showRequest(); });
        window.scrollTo(0, 0);
      }).catch(function (x) {
        btn.disabled = false; btn.textContent = 'حاول تاني';
        err.textContent = x.status === 429 ? 'بعتّ طلبات كتير. استنى شوية أو كلّمنا على ' + PHONE + '.' : (x.status === 422 && x.data && x.data.message) ? x.data.message : 'الطلب موصلش. جرّب تاني أو كلّمنا على ' + PHONE + '.';
      });
    });
  }

  /* ----- notifications ----- */
  var bellAt = 0;
  function refreshBell(force) {
    if (!auth) return;
    if (!force && Date.now() - bellAt < 60000) return;
    bellAt = Date.now();
    api('/notifications').then(function (d) { var c = $('bellCount'); c.textContent = d.unread > 99 ? '99+' : d.unread; c.hidden = !d.unread; }).catch(function () {});
  }
  var notifPage = 1;
  function loadNotifs(page) {
    var list = $('notifList');
    if (!auth) { list.innerHTML = '<div class="ok" style="align-items:flex-start"><b style="font-size:19px">سجّل دخول عشان تشوف إشعاراتك</b><button type="button" class="btn btn-blue" data-login style="min-height:46px">تسجيل الدخول</button></div>'; $('notifMore').hidden = true; return; }
    notifPage = page;
    if (page === 1) list.innerHTML = '<div class="muted">بنحمّل…</div>';
    api('/notifications?page=' + page).then(function (d) {
      var html = (d.data || []).map(function (x) {
        var lead = x.lead_id || ((/\b(lead|meeting|request)\b[^#]*#(\d+)/i.exec(x.title || '') || [])[2]);
        var staff = auth && auth.user && auth.user.staff;
        var href = x.unit_id ? '#unit-' + x.unit_id : x.project_id ? '#project-' + x.project_id : x.developer_id ? '#dev-' + x.developer_id : (lead && staff ? 'https://dashboard.tapegypt.com/lead/' + lead : '');
        var inner = '<span style="flex:1;min-width:0" translate="no"><b>' + esc(x.title || tr('إشعار')) + '</b><span class="muted" style="font-size:15px;line-height:1.7">' + esc(x.description || '') + '</span></span><span class="muted" style="font-size:13px;white-space:nowrap">' + esc(String(x.created_at || '').slice(0, 10)) + '</span>';
        return href ? '<a class="notif' + (x.seen ? '' : ' unread') + '" href="' + href + '">' + inner + '</a>' : '<div class="notif' + (x.seen ? '' : ' unread') + '">' + inner + '</div>';
      }).join('');
      if (page === 1) list.innerHTML = html || '<div class="muted" style="padding:20px 0">مفيش إشعارات لسه.</div>';
      else list.insertAdjacentHTML('beforeend', html);
      $('notifMore').hidden = (d.page || 1) >= (d.last_page || 1);
      if (d.unread) api('/notifications/seen', { method: 'POST' }).then(function () { $('bellCount').hidden = true; }).catch(function () {});
    }).catch(function () { list.innerHTML = '<div class="note">مقدرناش نحمّل الإشعارات.</div>'; });
  }
  $('notifMore').addEventListener('click', function () { loadNotifs(notifPage + 1); });

  /* ----- account settings ----- */
  function showAccount() {
    $('accGate').hidden = !!auth; $('accForms').hidden = !auth;
    if (!auth) return;
    var u = auth.user || {}, pf = $('profForm');
    pf.first_name.value = u.first_name || ''; pf.last_name.value = u.last_name || ''; pf.email.value = u.email || ''; pf.phone.value = String(u.phone || '').replace(/^\+20/, '0');
    ['profForm', 'pwForm', 'delForm'].forEach(function (id) { var e = $(id).querySelector('.err'); if (e) e.textContent = ''; });
  }
  function errMsg(x) {
    if (x.status === 429) return 'محاولات كتير. استنى شوية وجرّب تاني.';
    if (x.data && x.data.errors) { var k = Object.keys(x.data.errors)[0]; return x.data.errors[k][0]; }
    if (x.data && x.data.message && x.status < 500) return x.data.message;
    return 'حصلت مشكلة. جرّب تاني.';
  }
  function busy(form, on, label) { var b = form.querySelector('button[type=submit]'); if (on) { b.dataset.l = b.textContent; b.textContent = 'لحظة…'; } else b.textContent = label || b.dataset.l; b.disabled = on; }
  $('profForm').addEventListener('submit', function (e) {
    e.preventDefault(); var fm = this, err = fm.querySelector('.err');
    var body = { first_name: fm.first_name.value.trim(), last_name: fm.last_name.value.trim(), email: fm.email.value.trim(), phone: fm.phone.value.replace(/[^\d+]/g, '') };
    if (!/^\+?\d{10,14}$/.test(body.phone)) { err.textContent = 'اكتب رقم موبايل صحيح.'; return; }
    err.textContent = ''; busy(fm, true);
    api('/profile', { method: 'PUT', body: body }).then(function (r) { auth.user = r.user; saveAuth(); renderAccount(); toast('بياناتك اتحفظت'); })
      .catch(function (x) { err.textContent = errMsg(x); }).then(function () { busy(fm, false); });
  });
  $('pwForm').addEventListener('submit', function (e) {
    e.preventDefault(); var fm = this, err = fm.querySelector('.err');
    if (fm.password.value.length < 6) { err.textContent = 'الباسوورد الجديد لازم 6 حروف على الأقل.'; return; }
    if (fm.password.value !== fm.password2.value) { err.textContent = 'الباسوورد الجديد مش زي التأكيد.'; return; }
    err.textContent = ''; busy(fm, true);
    api('/profile/password', { method: 'POST', body: { old_password: fm.old_password.value, password: fm.password.value, password_confirmation: fm.password2.value } })
      .then(function () { fm.reset(); toast('الباسوورد اتغيّر'); })
      .catch(function (x) { err.textContent = errMsg(x); }).then(function () { busy(fm, false); });
  });
  var delArmed = false;
  $('delForm').addEventListener('submit', function (e) {
    e.preventDefault(); var fm = this, err = fm.querySelector('.err'), btn = fm.querySelector('button[type=submit]');
    if (!fm.password.value) { err.textContent = 'اكتب الباسوورد.'; return; }
    if (!delArmed) { delArmed = true; btn.textContent = 'متأكد؟ دوس تاني للمسح'; setTimeout(function () { delArmed = false; btn.textContent = 'امسح حسابي'; }, 5000); return; }
    delArmed = false; err.textContent = ''; busy(fm, true);
    api('/profile', { method: 'DELETE', body: { password: fm.password.value } }).then(function () {
      fm.reset(); auth = null; saveAuth(); liked = {}; saveLiked(); renderAccount(); toast('حسابك اتمسح'); location.hash = 'home';
    }).catch(function (x) { err.textContent = errMsg(x); }).then(function () { busy(fm, false, 'امسح حسابي'); });
  });

  /* ----- share the app ----- */
  function shareApp() {
    var url = location.href.split('#')[0].replace(/^https?:\/\/(www\.)?tapegypt\.com\//, 'https://bekam.tapegypt.com/'), text = 'بكام؟ — أسعار حقيقية لوحدات ريسيل وإيجار في كل مشروعات مصر';
    if (navigator.share) navigator.share({ title: tr('بكام'), text: tr(text), url: url }).catch(function () {});
    else window.open('https://wa.me/?text=' + enc(text + '\n' + url), '_blank', 'noopener');
  }

  /* ================= v2.2 — compare, installments, alerts, map ================= */
  /* ----- compare ----- */
  var cmp = [];
  try { cmp = JSON.parse(localStorage.getItem('bekam-compare') || '[]').map(Number).filter(Boolean).slice(0, 3); } catch (e) {}
  function saveCmp() { try { localStorage.setItem('bekam-compare', JSON.stringify(cmp)); } catch (e) {} paintCmp(); }
  function paintCmp() {
    $('cmpCount').textContent = cmp.length + pcmp.length; $('cmpBar').hidden = (cmp.length + pcmp.length) < 1 || /^#compare/.test(location.hash);
    $('cmpBar').firstChild.textContent = cmp.length && pcmp.length ? 'المقارنة' : pcmp.length ? 'قارن المشروعات' : 'قارن الوحدات';
    document.querySelectorAll('[data-pcmp]').forEach(function (b) { var on = pcmp.indexOf(+b.dataset.pcmp) >= 0; b.setAttribute('aria-pressed', on); b.textContent = b.classList.contains('pcmp-page') ? (on ? 'في المقارنة ✓' : 'قارن المشروع') : (on ? '✓ في المقارنة' : '+ قارن'); });
    document.body.classList.toggle('has-cmp', !$('cmpBar').hidden);
    document.querySelectorAll('.cmp-btn[data-cmp]').forEach(function (b) { var on = cmp.indexOf(+b.dataset.cmp) >= 0; b.setAttribute('aria-pressed', on); b.lastChild.textContent = on ? ' في المقارنة' : ' قارن'; });
  }
  function cmpBtn(id) { return '<button type="button" class="cmp-btn" data-cmp="' + id + '" aria-pressed="' + (cmp.indexOf(+id) >= 0) + '"><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M7 4v16M17 4v16M3 8h8M13 16h8"/></svg> ' + (cmp.indexOf(+id) >= 0 ? 'في المقارنة' : 'قارن') + '</button>'; }
  function toggleCmp(id) {
    id = +id; var i = cmp.indexOf(id);
    if (i >= 0) cmp.splice(i, 1);
    else { if (cmp.length >= 3) { toast('أقصى حاجة 3 وحدات. شيل واحدة من المقارنة الأول.'); return; } cmp.push(id); toast(cmp.length > 1 ? 'اتضافت. دوس «قارن الوحدات» تحت.' : 'اتضافت للمقارنة. ضيف وحدة كمان.'); }
    saveCmp(); if (location.hash === '#compare') loadCompare();
  }
  var pcmp = [], cmpMode = 'units';
  try { pcmp = JSON.parse(localStorage.getItem('bekam-pcmp') || '[]').map(Number).filter(Boolean).slice(0, 3); } catch (e) {}
  function savePcmp() { try { localStorage.setItem('bekam-pcmp', JSON.stringify(pcmp)); } catch (e) {} paintCmp(); }
  function pcmpChip(id) { var on = pcmp.indexOf(+id) >= 0; return '<span class="pcmp" role="button" tabindex="0" data-pcmp="' + id + '" aria-pressed="' + on + '">' + (on ? '✓ في المقارنة' : '+ قارن') + '</span>'; }
  function togglePcmp(id) {
    id = +id; var i = pcmp.indexOf(id);
    if (i >= 0) pcmp.splice(i, 1);
    else { if (pcmp.length >= 3) { toast('أقصى حاجة 3 مشروعات. شيل واحد من المقارنة الأول.'); return; } pcmp.push(id); cmpMode = 'projects'; toast(pcmp.length > 1 ? 'اتضاف. دوس «قارن المشروعات» تحت.' : 'اتضاف للمقارنة. ضيف مشروع كمان.'); }
    savePcmp(); if (/^#compare/.test(location.hash)) loadCompare();
  }
  document.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('pcmp')) { e.preventDefault(); togglePcmp(e.target.dataset.pcmp); } });
  function cmpTabs() {
    return '<div class="seg" role="group" aria-label="نوع المقارنة" style="max-width:420px;margin-bottom:18px"><button type="button" style="flex:1" data-cmptab="units" aria-pressed="' + (cmpMode === 'units') + '">الوحدات (' + cmp.length + ')</button><button type="button" style="flex:1" data-cmptab="projects" aria-pressed="' + (cmpMode === 'projects') + '">المشروعات (' + pcmp.length + ')</button></div>';
  }
  function bestRows(rows, items) {
    return '<div class="cmpt-w" style="overflow-x:auto;border:1px solid var(--line);border-radius:20px"><table class="cmpt" style="--n:' + items.length + '"><tbody>' + rows.map(function (r) {
      var best = null;
      if (r[2] && items.length > 1) { var vals = items.map(r[2]).filter(function (v) { return v; }); if (vals.length > 1) best = r[3] === 'min' ? Math.min.apply(null, vals) : Math.max.apply(null, vals); }
      return '<tr><th scope="row">' + r[0] + '</th>' + items.map(function (u) { var b = best !== null && r[2](u) === best; return '<td' + (b ? ' class="best"' : '') + '>' + r[1](u) + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';
  }
  function loadProjCompare(box) {
    $('cmpTitle').textContent = 'قارن المشروعات'; document.title = 'بكام — قارن المشروعات';
    if (!pcmp.length) { box.innerHTML = cmpTabs() + '<div class="ok" style="align-items:flex-start"><b style="font-size:19px">مفيش مشروعات في المقارنة</b><span class="muted">دوس «قارن» على أي مشروع، لحد 3 مشروعات.</span><a class="btn btn-blue" href="#projects">شوف المشروعات</a></div>'; return; }
    box.innerHTML = cmpTabs() + '<div class="muted">بنحمّل…</div>';
    api('/projects-compare?ids=' + pcmp.join(',')).then(function (d) {
      var ps = pcmp.map(function (id) { return (d.rows || d.data || []).find(function (p) { return p.id === id; }); }).filter(Boolean);
      if (ps.length !== pcmp.length) { pcmp = ps.map(function (p) { return p.id; }); savePcmp(); }
      var mm = function (a, b, f) { return a && b && a !== b ? f(a) + ' – ' + f(b) : a ? f(a) : '—'; };
      var dl = function (p) { var o = p.delivery || {}, k = Object.keys(o); return k.length ? k.map(function (x) { return esc(DEL_AR[x] || x) + ' (' + o[x] + ')'; }).join('<br>') : '—'; };
      var rows = [
        ['', function (p) { return '<a href="#project-' + p.id + '">' + img(p.photo, p.name, '') + '</a>'; }],
        ['المشروع', function (p) { return '<a href="#project-' + p.id + '" style="font-weight:800;color:var(--ink)">' + esc(p.name) + '</a>'; }],
        ['المطور', function (p) { return p.developer_id ? '<a href="#dev-' + p.developer_id + '">' + esc(p.developer) + '</a>' : esc(p.developer || '—'); }],
        ['المنطقة', function (p) { return esc(city(p.city) || '—'); }],
        ['وحدات متاحة', function (p) { return n(p.units) + '<br><span class="muted" style="font-size:13px">' + n(p.sale) + ' بيع · ' + n(p.rent) + ' إيجار</span>'; }, function (p) { return p.units; }, 'max'],
        ['أقل سعر', function (p) { return p.min_price ? short(p.min_price) : '—'; }, function (p) { return p.min_price; }, 'min'],
        ['أعلى سعر', function (p) { return p.max_price ? short(p.max_price) : '—'; }],
        ['متوسط سعر المتر', function (p) { return p.price_m2 ? n(p.price_m2) + ' ج' : '—'; }, function (p) { return p.price_m2; }, 'min'],
        ['أقل مقدم', function (p) { return p.min_down ? n(p.min_down) + ' ج' : '—'; }, function (p) { return p.min_down; }, 'min'],
        ['أقل قسط شهري', function (p) { return p.min_monthly ? n(p.min_monthly) + ' ج' : '—'; }, function (p) { return p.min_monthly; }, 'min'],
        ['أقل إيجار', function (p) { return p.min_rent ? n(p.min_rent) + ' ج / شهر' : '—'; }, function (p) { return p.min_rent; }, 'min'],
        ['المساحات', function (p) { var z = p.size || []; return mm(z[0], z[1], function (v) { return n(v); }) + (z[0] ? ' م²' : ''); }],
        ['الأنواع', function (p) { return esc((p.types || []).join(LANG === 'en' ? ', ' : '، ') || '—'); }],
        ['استلام فوري', function (p) { return n(p.ready || 0) + ' وحدة'; }, function (p) { return p.ready; }, 'max'],
        ['الاستلام', dl],
        ['', function (p) { return '<div style="display:flex;flex-direction:column;gap:8px"><a class="btn btn-blue" style="min-height:42px" href="#project-' + p.id + '">وحدات المشروع</a><button type="button" class="btn btn-line" style="min-height:42px" data-pcmp="' + p.id + '">شيله</button></div>'; }]
      ];
      var html = cmpTabs() + bestRows(rows, ps);
      if (ps.length < 3) html += '<p class="muted" style="margin-top:14px">تقدر تضيف ' + (3 - ps.length) + ' كمان. <a href="#projects">اختار من المشروعات</a></p>';
      box.innerHTML = html;
    }).catch(function () { box.innerHTML = cmpTabs() + '<div class="note">مقدرناش نحمّل المقارنة.</div>'; });
  }
  function loadCompare() {
    var box = $('cmpBox'); paintCmp();
    if (cmpMode === 'units' && !cmp.length && pcmp.length) cmpMode = 'projects';
    if (cmpMode === 'projects') return loadProjCompare(box);
    $('cmpTitle').textContent = 'قارن الوحدات';
    if (!cmp.length) { box.innerHTML = cmpTabs() + '<div class="ok" style="align-items:flex-start"><b style="font-size:19px">مفيش وحدات في المقارنة</b><span class="muted">دوس «قارن» على أي وحدة، لحد 3 وحدات.</span><a class="btn btn-blue" href="#units">شوف الوحدات</a></div>'; return; }
    box.innerHTML = '<div class="muted">بنحمّل…</div>';
    api('/units?per_page=3&ids=' + cmp.join(',')).then(function (d) {
      var us = cmp.map(function (id) { return (d.data || []).find(function (u) { return u.id === id; }); }).filter(Boolean);
      if (us.length !== cmp.length) { cmp = us.map(function (u) { return u.id; }); saveCmp(); }
      var perM = function (u) { return u.category !== 'Rent' && u.price && u.size ? Math.round(u.price / u.size) : null; };
      var monthly = function (u) { return u.quarter_installment ? Math.round(u.quarter_installment / 3) : null; };
      var rows = [
        ['', function (u) { return '<a href="#unit-' + u.id + '">' + img(u.photo, type(u.type), '') + '</a>'; }],
        ['الوحدة', function (u) { return '<a href="#unit-' + u.id + '" style="font-weight:800;color:var(--ink)">' + esc(type(u.type)) + (u.project ? ' في ' + esc(u.project) : '') + '</a>'; }],
        ['السعر', function (u) { return priceLabel(u); }, function (u) { return u.price; }, 'min'],
        ['سعر المتر', function (u) { return perM(u) ? n(perM(u)) + ' ج' : '—'; }, perM, 'min'],
        ['المساحة', function (u) { return u.size ? u.size + ' م²' : '—'; }, function (u) { return u.size; }, 'max'],
        ['غرف النوم', function (u) { return u.bedrooms || '—'; }, function (u) { return +u.bedrooms || null; }, 'max'],
        ['الحمامات', function (u) { return u.bathrooms || '—'; }, function (u) { return +u.bathrooms || null; }, 'max'],
        ['المقدم / المدفوع', function (u) { return u.down_payment ? n(u.down_payment) + ' ج' : '—'; }, function (u) { return u.down_payment; }, 'min'],
        ['القسط الشهري تقريباً', function (u) { return monthly(u) ? n(monthly(u)) + ' ج' : '—'; }, monthly, 'min'],
        ['التشطيب', function (u) { return esc(FIN_AR[u.finishing] || u.finishing || '—'); }],
        ['الاستلام', function (u) { return esc(DEL_AR[u.delivery] || u.delivery || '—'); }],
        ['المطور', function (u) { return u.developer_id ? '<a href="#dev-' + u.developer_id + '">' + esc(u.developer) + '</a>' : '—'; }],
        ['المنطقة', function (u) { return esc(city(u.city) || '—'); }],
        ['', function (u) { return '<div style="display:flex;flex-direction:column;gap:8px"><a class="btn btn-blue" style="min-height:42px" href="#unit-' + u.id + '">التفاصيل</a><button type="button" class="btn btn-line" style="min-height:42px" data-cmp="' + u.id + '" aria-pressed="true"><span></span> شيلها</button></div>'; }]
      ];
      var html = cmpTabs() + bestRows(rows, us);
      if (us.length < 3) html += '<p class="muted" style="margin-top:14px">تقدر تضيف ' + (3 - us.length) + ' كمان. <a href="#units">اختار من الوحدات</a></p>';
      box.innerHTML = html;
    }).catch(function () { box.innerHTML = '<div class="note">مقدرناش نحمّل المقارنة.</div>'; });
  }

  /* ----- installment calculator ----- */
  function calcBox(u) {
    if (u.category === 'Rent' || !u.price) return '';
    var dp = u.down_payment && u.down_payment < u.price ? u.down_payment : Math.round(u.price * 0.1);
    var years = 5;
    if (u.quarter_installment && u.down_payment && u.price > u.down_payment) years = Math.min(12, Math.max(1, Math.round((u.price - u.down_payment) / (u.quarter_installment * 4))));
    return '<section class="calc" id="calc" data-price="' + u.price + '"><h2 style="font-weight:800;font-size:26px">احسب القسط</h2>' +
      (u.quarter_installment ? '<span class="note">القسط المسجل للوحدة: ' + n(u.quarter_installment) + ' ج كل 3 شهور (حوالي ' + n(Math.round(u.quarter_installment / 3)) + ' ج في الشهر).</span>' : '') +
      '<div class="g3"><label class="field">السعر (ج.م)<input id="cPrice" inputmode="numeric" data-money value="' + n(u.price) + '"></label>' +
      '<label class="field">المقدم (ج.م)<input id="cDown" inputmode="numeric" data-money value="' + n(dp) + '"></label>' +
      '<label class="field">عدد السنين: <b id="cYearsL">' + years + '</b><input id="cYears" type="range" min="1" max="12" value="' + years + '"></label></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:24px"><div><span class="muted">القسط الشهري</span><output id="cMonthly">—</output></div><div><span class="muted">كل 3 شهور</span><output id="cQuarter" style="font-size:22px">—</output></div><div><span class="muted">نسبة المقدم</span><output id="cPct" style="font-size:22px">—</output></div></div>' +
      '<span class="note">حسبة تقريبية من غير فوايد. خطة السداد الفعلية بيأكدها مستشار بكام أو المطور.</span></section>';
  }
  function bindCalc() {
    var box = $('calc'); if (!box) return;
    var num = function (id) { return Number(String($(id).value).replace(/[^\d]/g, '')) || 0; };
    function upd() {
      var p = num('cPrice'), d = Math.min(num('cDown'), p), y = +$('cYears').value;
      $('cYearsL').textContent = y;
      var rest = Math.max(0, p - d);
      $('cMonthly').textContent = p ? n(Math.round(rest / (y * 12))) + ' ج' : '—';
      $('cQuarter').textContent = p ? n(Math.round(rest / (y * 4))) + ' ج' : '—';
      $('cPct').textContent = p ? Math.round(d / p * 100) + '%' : '—';
    }
    ['cPrice', 'cDown'].forEach(function (id) { $(id).addEventListener('input', function () { var v = this.value.replace(/[^\d]/g, ''); this.value = v ? Number(v).toLocaleString('en-US') : ''; upd(); }); });
    $('cYears').addEventListener('input', upd); upd();
  }

  /* ----- alerts (saved searches) ----- */
  function describeF(x) {
    var p = [x.category === 'Rent' ? 'للإيجار' : 'للبيع'];
    if (x.type) p.push((TYPE_FILTER.find(function (t) { return t[0] === x.type; }) || [0, x.type])[1]);
    if (x.beds) p.push(x.beds + (x.beds >= 4 ? '+' : '') + ' غرف');
    if (x.label) p.push(x.label); else if (x.city) p.push('في ' + city(x.city));
    if (x.max_price) p.push('لحد ' + short(+x.max_price));
    if (x.max_down) p.push('مقدم لحد ' + short(+x.max_down));
    if (x.max_monthly) p.push('قسط لحد ' + n(x.max_monthly) + ' ج/شهر');
    if (x.max_quarter) p.push('قسط ربع سنوي لحد ' + n(x.max_quarter) + ' ج');
    if (x.min_size || x.max_size) p.push((x.min_size ? 'من ' + x.min_size : '') + (x.max_size ? ' لحد ' + x.max_size : '') + ' م²');
    if (x.finishing) p.push(FIN_AR[x.finishing] || x.finishing);
    if (x.delivery) p.push(DEL_AR[x.delivery] || x.delivery);
    if (x.q) p.push('«' + x.q + '»');
    return p.join(' · ').slice(0, 180);
  }
  $('alertBtn').addEventListener('click', function () {
    if (!auth) { toast('سجّل دخول عشان نبعتلك التنبيهات'); openModal('login'); return; }
    var filters = {}; Object.keys(f).forEach(function (k) { if (f[k] && k !== 'sort' && k !== 'label') filters[k] = String(f[k]); });
    var btn = this; btn.disabled = true;
    api('/alerts', { method: 'POST', body: { filters: filters, label: describeF(f) } }).then(function (r) {
      toast(r.duplicate ? 'التنبيه ده موجود عندك بالفعل' : 'تمام! هنبعتلك أول ما تنزل وحدة زي دي، وأصحاب الوحدات المشابهة هيعرفوا إنك مهتم');
    }).catch(function (x) { toast(x.status === 422 && x.data && x.data.message ? x.data.message : 'التنبيه متحفظش، جرّب تاني'); })
      .then(function () { btn.disabled = false; });
  });
  function loadAlerts() {
    var list = $('alertList');
    if (!auth) { list.innerHTML = '<div class="ok" style="align-items:flex-start"><b style="font-size:19px">سجّل دخول عشان تشوف تنبيهاتك</b><button type="button" class="btn btn-blue" data-login style="min-height:46px">تسجيل الدخول</button></div>'; return; }
    list.innerHTML = '<div class="muted">بنحمّل…</div>';
    api('/alerts').then(function (rows) {
      list.innerHTML = rows.length ? rows.map(function (a) {
        return '<div class="alertrow"><span style="display:flex;flex-direction:column;gap:2px;min-width:0;flex:1"><b>' + esc(a.label || describeF(a.filters)) + '</b><span class="muted" style="font-size:13px">من ' + esc(String(a.created_at || '').slice(0, 10)) + '</span></span>' +
          '<span style="display:flex;gap:8px"><button type="button" class="btn btn-line" style="min-height:42px" data-alertopen="' + a.id + '">شوف الوحدات</button><button type="button" class="btn btn-line" style="min-height:42px" data-alertdel="' + a.id + '">امسح</button></span></div>';
      }).join('') : '<div class="ok" style="align-items:flex-start"><b style="font-size:18px">مفيش تنبيهات لسه</b><span class="muted">روح للوحدات، اختار الفلاتر اللي تناسبك، ودوس «نبّهني بالجديد».</span><a class="btn btn-blue" href="#units">الوحدات</a></div>';
      alertCache = rows;
    }).catch(function () { list.innerHTML = '<div class="note">مقدرناش نحمّل التنبيهات.</div>'; });
  }
  var alertCache = [];
  function openAlert(id) {
    var a = alertCache.find(function (x) { return x.id === +id; }); if (!a) return;
    resetFilters(a.filters.category || 'Resale'); Object.keys(a.filters).forEach(function (k) { if (k in f) f[k] = a.filters[k]; });
    goUnits();
  }
  function delAlert(id, btn) {
    btn.disabled = true;
    api('/alerts/' + id, { method: 'DELETE' }).then(function () { toast('التنبيه اتمسح'); loadAlerts(); }).catch(function () { btn.disabled = false; toast('مقدرناش نمسحه'); });
  }

  /* ----- map (Leaflet + OpenStreetMap, loaded only when needed) ----- */
  var leafletP = null;
  function leaflet() {
    if (window.L) return Promise.resolve(window.L);
    if (leafletP) return leafletP;
    leafletP = new Promise(function (res, rej) {
      var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'assets/leaflet/leaflet.css'; document.head.appendChild(css);
      var s = document.createElement('script'); s.src = 'assets/leaflet/leaflet.js';
      // GoDaddy injects an AMD loader (define) on the page, which would hide Leaflet's global L
      var amd = window.define; try { window.define = undefined; } catch (e) {}
      s.onload = function () { try { window.define = amd; } catch (e) {} window.L ? res(window.L) : (leafletP = null, rej()); }; s.onerror = function () { try { window.define = amd; } catch (e) {} leafletP = null; rej(); }; document.head.appendChild(s);
    });
    return leafletP;
  }
  var EG = [30.03, 31.1];
  function makeMap(el, center, zoom) {
    return leaflet().then(function (L) {
      if (el._map) { el._map.remove(); el._map = null; }
      var m = L.map(el, { scrollWheelZoom: false }).setView(center || EG, zoom || 9);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap' }).addTo(m);
      el._map = m; setTimeout(function () { m.invalidateSize(); }, 80);
      return m;
    });
  }
  function pin(L) { return L.divIcon({ className: '', html: '<span style="display:block;width:22px;height:22px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#0D6E74;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35)"></span>', iconSize: [22, 22], iconAnchor: [11, 22], popupAnchor: [0, -20] }); }
  function gmaps(lat, lng) { return 'https://www.google.com/maps?q=' + lat + ',' + lng; }
  var projView = 'list';
  function setProjView(v) {
    projView = v;
    document.querySelectorAll('[data-pview]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.pview === v); });
    $('projMapBox').hidden = v !== 'map'; $('projGrid').hidden = v === 'map'; if (v === 'map') $('projMore').hidden = true;
    if (v === 'map') drawProjMap(); else if (projAll) renderProjs();
  }
  function drawProjMap() {
    if (!projAll) { setTimeout(drawProjMap, 300); return; }
    var q = $('projQ').value.trim().toLowerCase();
    var pts = projAll.filter(function (p) { return p.lat != null && p.lng != null && (!q || (p.name + ' ' + (p.developer || '')).toLowerCase().indexOf(q) >= 0); });
    $('projMapNote').textContent = pts.length ? n(pts.length) + ' مشروع على الخريطة. المشروعات اللي ملهاش موقع بتظهر في القايمة بس.' : 'لسه مفيش مشروعات متحدد مكانها على الخريطة.' + (auth && auth.user && auth.user.staff ? ' افتح أي مشروع ودوس «حدّد موقع المشروع».' : '');
    makeMap($('projMap')).then(function (m) {
      var L = window.L, b = [];
      pts.forEach(function (p) {
        L.marker([p.lat, p.lng], { icon: pin(L), title: p.name }).addTo(m)
          .bindPopup('<b style="font-size:15px">' + esc(p.name) + '</b><br>' + esc([p.developer, city(p.city)].filter(Boolean).join(' · ')) + '<br>' + n(p.units) + ' وحدة' + (p.min_price ? ' · من ' + short(p.min_price) : '') + '<br><a href="#project-' + p.id + '">افتح المشروع</a>');
        b.push([p.lat, p.lng]);
      });
      if (b.length > 1) m.fitBounds(b, { padding: [30, 30] }); else if (b.length) m.setView(b[0], 13);
    }).catch(function () { $('projMapNote').textContent = 'الخريطة مش راضية تحمّل دلوقتي.'; });
  }
  // small map on project / unit pages + staff pin editor
  function locBlock(id, loc, projectId) {
    var staff = auth && auth.user && auth.user.staff && projectId;
    if (!loc && !staff) return '';
    return '<section style="display:flex;flex-direction:column;gap:12px;margin-top:22px" id="' + id + '"><h2 style="font-weight:800;font-size:26px">الموقع</h2>' +
      (loc ? '<div class="map" data-minimap="' + loc.lat + ',' + loc.lng + '" style="height:320px"></div><a class="btn btn-line" style="align-self:flex-start;min-height:44px" target="_blank" rel="noopener" href="' + gmaps(loc.lat, loc.lng) + '">افتح في خرائط جوجل</a>' : '') +
      (staff ? '<div class="box" style="gap:10px;border-style:dashed"><b>لفريق بكام: ' + (loc ? 'غيّر' : 'حدّد') + ' موقع المشروع</b><span class="muted" style="font-size:14px">الصق لينك من خرائط جوجل أو الإحداثيات (مثلاً 30.0123, 31.4567)، أو افتح الخريطة ودوس على مكان المشروع.</span>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px"><input id="locIn" dir="ltr" placeholder="https://maps.google.com/... أو 30.01, 31.45" style="flex:1 1 260px;min-height:46px;border:1px solid var(--line);border-radius:12px;padding:0 12px;font:inherit"><button type="button" class="btn btn-blue" style="min-height:46px" data-locsave="' + projectId + '">احفظ</button><button type="button" class="btn btn-line" style="min-height:46px" data-locpick="' + projectId + '">اختار من الخريطة</button>' + (loc ? '<button type="button" class="btn btn-line" style="min-height:46px" data-locclear="' + projectId + '">امسح الموقع</button>' : '') + '</div><div id="locPick" class="map" style="height:360px" hidden></div><span class="note err" id="locErr"></span></div>' : '') +
      '</section>';
  }
  function drawMinimaps(scope) {
    (scope || document).querySelectorAll('[data-minimap]').forEach(function (el) {
      var c = el.dataset.minimap.split(',').map(Number);
      makeMap(el, c, 14).then(function (m) { window.L.marker(c, { icon: pin(window.L) }).addTo(m); }).catch(function () { el.innerHTML = '<div class="muted" style="padding:20px">الخريطة مش راضية تحمّل.</div>'; });
    });
  }
  function parseLoc(t) {
    t = String(t || '');
    var m = /@(-?\d+\.\d+),(-?\d+\.\d+)/.exec(t) || /[?&](?:q|query|ll)=(-?\d+\.\d+),\s*(-?\d+\.\d+)/.exec(t) || /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/.exec(t) || /^\s*(-?\d+\.\d+)\s*[, ]\s*(-?\d+\.\d+)\s*$/.exec(t);
    return m ? { lat: +m[1], lng: +m[2] } : null;
  }
  var pickLoc = null;
  function saveLoc(pid, loc) {
    var err = $('locErr');
    if (loc && !(loc.lat > 21 && loc.lat < 32.5 && loc.lng > 24 && loc.lng < 37)) { err.textContent = 'الموقع ده برّه مصر. اتأكد من الإحداثيات.'; return; }
    api('/projects/' + pid + '/location', { method: 'POST', body: loc || { lat: null, lng: null } }).then(function () {
      toast(loc ? 'موقع المشروع اتحفظ' : 'الموقع اتمسح'); projAll = null; loadProject(pid);
    }).catch(function (x) { err.textContent = x.status === 403 ? 'الخاصية دي لفريق بكام بس.' : 'محفظش، جرّب تاني.'; });
  }
  function startPick(pid) {
    var el = $('locPick'); el.hidden = false;
    makeMap(el, pickLoc ? [pickLoc.lat, pickLoc.lng] : EG, pickLoc ? 14 : 9).then(function (m) {
      var mk = pickLoc ? window.L.marker([pickLoc.lat, pickLoc.lng], { icon: pin(window.L), draggable: true }).addTo(m) : null;
      m.on('click', function (e) {
        pickLoc = { lat: +e.latlng.lat.toFixed(6), lng: +e.latlng.lng.toFixed(6) };
        if (mk) mk.setLatLng(e.latlng); else mk = window.L.marker(e.latlng, { icon: pin(window.L) }).addTo(m);
        $('locIn').value = pickLoc.lat + ', ' + pickLoc.lng;
      });
    });
  }

  document.addEventListener('click', function (e) {
    var pc = e.target.closest('[data-pcmp]'); if (pc) { e.preventDefault(); e.stopPropagation(); togglePcmp(pc.dataset.pcmp); return; }
    var t = e.target.closest('button,a'); if (!t) return;
    var d = t.dataset;
    if (d.cmp) { e.preventDefault(); toggleCmp(d.cmp); }
    else if (d.cmptab) { cmpMode = d.cmptab; loadCompare(); }
    else if (d.cmpclear !== undefined) { if (cmpMode === 'projects') { pcmp = []; savePcmp(); } else { cmp = []; saveCmp(); } loadCompare(); }
    else if (d.alertdel) delAlert(d.alertdel, t);
    else if (d.alertopen) openAlert(d.alertopen);
    else if (d.pview) setProjView(d.pview);
    else if (d.locsave) { var l = parseLoc($('locIn').value); if (!l) { $('locErr').textContent = 'مش عارف أقرا الموقع. الصق الإحداثيات زي 30.0123, 31.4567 أو لينك فيه @30.01,31.45'; return; } saveLoc(d.locsave, l); }
    else if (d.locclear) saveLoc(d.locclear, null);
    else if (d.locpick) startPick(d.locpick);
  });
  paintCmp();

  /* ----- home hero: map of areas instead of a photo ----- */
  // [lat, lng, label side]  — Greater Cairo areas are drawn on the map; coast areas become chips under it
  var AREA_GEO = {
    '6 October': [29.94, 30.93, 'b'], 'El Sheikh Zayed': [30.045, 30.985, 'r', 't'], 'Sheikh Zayed': [30.045, 30.985, 'r', 't'], 'New Zayed': [30.105, 30.86, 't', 'l'],
    'New Cairo': [30.025, 31.47, 'b'], 'New Capital': [30.02, 31.76, 'r'], 'Mostakbal city': [30.135, 31.62, 't']
  };
  function heroMap(areas) {
    var el = $('heroMap'); if (!el) return;
    var pts = areas.filter(function (a) { return AREA_GEO[a.city]; });
    var others = areas.filter(function (a) { return !AREA_GEO[a.city] && a.city && a.city !== 'Other'; });
    var chips = $('heroChips');
    if (chips) chips.innerHTML = others.length ? '<span>كمان:</span>' + others.map(function (a) { return '<a href="#units" data-city="' + esc(a.city) + '">' + esc(city(a.city)) + ' <b>' + n(a.count) + '</b></a>'; }).join('') : '';
    leaflet().then(function (L) {
      if (el._map) { el._map.remove(); el._map = null; }
      var mobile = window.innerWidth < 760;
      var m = L.map(el, { zoomControl: false, scrollWheelZoom: false, dragging: !mobile, tap: false, doubleClickZoom: false, boxZoom: false, keyboard: false });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 13, attribution: '&copy; OpenStreetMap' }).addTo(m);
      el._map = m;
      var max = Math.max.apply(null, pts.map(function (a) { return a.count; }).concat([1]));
      var b = [];
      pts.forEach(function (a) {
        var g = AREA_GEO[a.city], big = a.count / max > 0.3;
        L.marker([g[0], g[1]], { icon: L.divIcon({ className: '', iconSize: [0, 0], html: '<span class="area-pin side-' + (mobile && g[3] ? g[3] : g[2]) + (big ? ' big' : '') + '"><span class="dot"></span><span class="lbl"><b>' + esc(city(a.city)) + '</b> ' + n(a.count) + '</span></span>' }), title: city(a.city) + ': ' + a.count + ' وحدة' })
          .addTo(m).on('click', function () { resetFilters('Resale'); f.city = a.city; goUnits(); });
        b.push([g[0], g[1]]);
      });
      var fit = function () {
        var cardW = $('heroBg').querySelector('.hero-card').offsetWidth, h = el.offsetHeight;
        var opts = window.innerWidth < 760 ? { paddingTopLeft: [115, 105], paddingBottomRight: [45, Math.max(50, h - 300)] } : (LANG === 'en' ? { paddingTopLeft: [cardW + 120, 90], paddingBottomRight: [90, 120] } : { paddingTopLeft: [90, 90], paddingBottomRight: [cardW + 120, 120] });
        if (b.length > 1) m.fitBounds(b, opts); else m.setView([30.05, 31.2], 10);
      };
      fit(); setTimeout(function () { m.invalidateSize(); fit(); }, 150);
      var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { m.invalidateSize(); fit(); }, 200); });
    }).catch(function () {});
  }

  /* ----- area cards: each card's background is that area on the map ----- */
  var AREA_ALL = {
    '6 October': [29.95, 30.94, 12], 'El Sheikh Zayed': [30.04, 30.985, 12], 'Sheikh Zayed': [30.04, 30.985, 12], 'New Zayed': [30.1, 30.87, 12],
    'New Cairo': [30.02, 31.47, 12], 'New Capital': [30.02, 31.76, 12], 'Mostakbal city': [30.13, 31.62, 12], 'North Coast': [30.92, 28.85, 9],
    'Ras El Hikma': [31.13, 27.86, 11], 'Sokhna': [29.6, 32.33, 11], 'Ain Sokhna': [29.6, 32.33, 11], 'Galala': [29.43, 32.4, 11], 'Hurghada': [27.2, 33.82, 11], 'El Gouna': [27.4, 33.68, 12]
  };
  function areaMaps() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.amap[data-ll]:not([data-done])'));
    if (!els.length) return;
    var draw = function (el) {
      if (el.dataset.done) return; el.dataset.done = '1';
      var v = el.dataset.ll.split(',').map(Number), box = el.querySelector('.amap-in');
      leaflet().then(function (L) {
        var m = L.map(box, { zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, touchZoom: false, tap: false }).setView([v[0], v[1]], v[2]);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 14 }).addTo(m);
        L.marker([v[0], v[1]], { icon: pin(L), interactive: false }).addTo(m);
        setTimeout(function () { m.invalidateSize(); }, 120);
      }).catch(function () {});
    };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); draw(e.target); } }); }, { rootMargin: '200px' });
      els.forEach(function (el) { io.observe(el); });
    } else els.forEach(draw);
  }


  /* ----- direct contact with whoever listed the unit (same as the app: login, then call / WhatsApp) ----- */
  var waIcon = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>';
  var phIcon = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>';
  function contactBlock(u) {
    var who = u.poster ? (u.poster.staff ? 'مستشار بكام المسؤول عن الوحدة' : 'صاحب الإعلان' + (u.poster.name ? ' (' + esc(u.poster.name) + ')' : '')) : 'فريق بكام';
    return '<div class="direct"><span class="muted" style="font-size:14px">كلّم ' + who + ' مباشرة</span>' +
      '<div style="display:flex;gap:10px"><button type="button" class="btn" style="flex:1;background:#1F9D55;color:#fff" data-contact="whatsapp" data-cunit="' + u.id + '">' + waIcon + ' واتساب</button>' +
      '<button type="button" class="btn btn-ink" style="flex:1" data-contact="call" data-cunit="' + u.id + '">' + phIcon + ' اتصال</button></div>' +
      (auth ? '' : '<span class="muted" style="font-size:13px;text-align:center">هتحتاج تسجّل دخول عشان الرقم يظهر</span>') + '</div>';
  }
  function contactUnit(id, way, btn) {
    if (!auth) { toast('سجّل دخول الأول عشان تتواصل مباشرة'); openModal('login'); return; }
    var w = way === 'whatsapp' ? window.open('about:blank', '_blank') : null;
    btn.disabled = true;
    api('/units/' + id + '/contact', { method: 'POST', body: { way: way } }).then(function (r) {
      var local = r.phone.indexOf('20') === 0 ? '0' + r.phone.slice(2) : r.phone;
      if (way === 'whatsapp') {
        var t = (document.title || '').replace(/^بكام\s*—\s*/, '');
        var url = 'https://wa.me/' + r.phone + '?text=' + enc('أهلاً، شفت الوحدة دي على بكام وعايز أسأل عليها:\n' + t + '\n' + shareLink('u', id));
        if (w && !w.closed) w.location.href = url; else location.href = url;
      } else {
        btn.innerHTML = phIcon + ' <span dir="ltr">' + local + '</span>';
        location.href = 'tel:+' + r.phone;
      }
    }).catch(function (x) {
      if (w) try { w.close(); } catch (e) {}
      toast(x.status === 429 ? 'محاولات كتير، استنى شوية' : 'مقدرناش نجيب الرقم، كلّم فريق بكام على ' + PHONE);
    }).then(function () { btn.disabled = false; });
  }


  /* ----- language switch ----- */
  (function () {
    var b = $('langBtn'); if (!b) return;
    b.textContent = LANG === 'en' ? 'ع' : 'EN';
    b.setAttribute('aria-label', LANG === 'en' ? 'العربية' : 'English');
    b.setAttribute('translate', 'no');
    b.addEventListener('click', function () { try { localStorage.setItem('bekam-lang', LANG === 'en' ? 'ar' : 'en'); } catch (e) {} location.reload(); });
  })();

  if (auth) api('/me').then(function (m) { auth.user = m.user; saveAuth(); setLikedFromServer(m.favorites); renderAccount(); }).catch(function () {});
  renderAccount(); updateFavCount();

  /* ---------- UNIT PDF (share a unit as a PDF with the lister's name & number on top) ---------- */
  var curUnit = null;
  var pdfLibs = null;
  function loadScript(src) {
    return new Promise(function (ok, no) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
  }
  function loadPdfLibs() {
    if (!pdfLibs) pdfLibs = Promise.all([loadScript('assets/pdf/html2canvas.min.js'), loadScript('assets/pdf/jspdf.umd.min.js'), loadScript('assets/pdf/qrcode.js')]);
    return pdfLibs;
  }
  // resolve after ms even if p never settles (Safari can leave image/font promises pending)
  function pdfTimeout(p, ms) { return Promise.race([p, new Promise(function (ok) { setTimeout(ok, ms); })]); }
  // html2canvas clones the whole page and waits for every <img> in the clone with no timeout;
  // on iPhone Safari lazy images never load in that hidden copy, so it hangs. Clone only the PDF pages.
  function pdfSkip(holder) {
    return function (node) {
      if (!node || node.nodeType !== 1 || node === holder) return false;
      if (node.contains && node.contains(holder)) return false;
      if (holder.contains(node)) return false;
      var t = node.tagName;
      if (t === 'HEAD' || t === 'STYLE' || t === 'LINK' || t === 'META' || t === 'TITLE') return false;
      return node.parentNode === document.body || t === 'IMG' || t === 'IFRAME' || t === 'VIDEO';
    };
  }
  function pdfText(ar, en) { return LANG === 'en' ? en : ar; }
  function pdfPhone(p) { p = String(p || ''); return p.indexOf('20') === 0 ? '+20 ' + p.slice(2, 5) + ' ' + p.slice(5, 8) + ' ' + p.slice(8) : '+' + p; }
  function pdfAbs(src) { try { return new URL(src, location.href).href; } catch (e) { return src; } }
  function pdfDate() {
    try { return new Date().toLocaleDateString(LANG === 'en' ? 'en-GB' : 'ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return new Date().toISOString().slice(0, 10); }
  }

  function exportPdf(id, btn) {
    if (!auth) { toast(tr('سجّل دخول الأول عشان تعمل PDF للوحدة')); openModal('login'); return; }
    var u = curUnit;
    if (!u || String(u.id) !== String(id)) return;
    var old = btn.innerHTML;
    btn.disabled = true; btn.textContent = tr('بنجهّز الـ PDF…');
    Promise.all([api('/units/' + id + '/pdf', { method: 'POST' }), loadPdfLibs()]).then(function (r) {
      return Promise.race([buildUnitPdf(u, r[0]), new Promise(function (ok, no) { setTimeout(function () { no({ timeout: true }); }, 60000); })]);
    }).then(function (out) {
      pdfReady(out.blob, out.name);
    }).catch(function (x) {
      toast(tr(x && x.status === 429 ? 'محاولات كتير، استنى شوية' : 'الـ PDF ماتعملش، جرّب تاني'));
    }).then(function () { btn.disabled = false; btn.innerHTML = old; });
  }

  /* ----- price offer ("قدّم عرض سعر") ----- */
  function shortMoney(v) {
    if (!v) return '';
    if (v >= 1e6) return (Math.round(v / 1e4) / 100).toString() + pdfText(' مليون', ' million');
    if (v >= 1e3) return Math.round(v / 1e3) + pdfText(' ألف', 'K');
    return n(v);
  }
  function openOffer(u) {
    if (!u) return;
    var rent = u.category === 'Rent';
    var me = auth && auth.user ? auth.user : null;
    var meName = me ? ((me.first_name || '') + ' ' + (me.last_name || '')).trim() || me.name || '' : '';
    var mePhone = me && me.phone ? me.phone : '';
    var needName = !meName, needPhone = !mePhone;
    var tType = type(u.type);
    var headline = [u.project || city(u.city), tType, u.size ? u.size + ' ' + pdfText('م²', 'm²') : ''].filter(Boolean).join(' · ');
    var box = document.createElement('div');
    box.className = 'pdf-ready';
    box.innerHTML = '<form class="pdf-ready-card offer-card" novalidate>' +
      '<b>' + tr('قدّم عرض سعر') + '</b><span class="muted" dir="auto">' + esc(headline) + '</span>' +
      (u.price ? '<span class="offer-ask">' + tr('السعر المطلوب') + ': <b>' + n(u.price) + ' ' + (rent ? pdfText('ج.م / شهر', 'EGP / month') : pdfText('ج.م', 'EGP')) + '</b></span>' : '') +
      '<label class="field">' + tr(rent ? 'عرضك (الإيجار الشهري)' : 'عرضك (إجمالي السعر)') +
        '<input name="price" inputmode="numeric" autocomplete="off" dir="ltr" placeholder="' + (u.price ? n(u.price) : '') + '" required></label>' +
      '<span class="offer-hint" aria-live="polite"></span>' +
      (needName ? '<label class="field">' + tr('اسمك') + '<input name="name" autocomplete="name" minlength="2" required></label>' : '') +
      (needPhone ? '<label class="field">' + tr('رقم موبايلك') + '<input name="phone" type="tel" autocomplete="tel" dir="ltr" placeholder="01x xxxx xxxx" required></label>' : '') +
      (!needName && !needPhone ? '<span class="muted" style="font-size:14px">' + tr('باسم') + ': ' + esc(meName) + ' · <span dir="ltr">' + esc(mePhone) + '</span></span>' : '') +
      '<label class="field">' + tr('ملاحظة (اختياري)') + '<textarea name="note" rows="2" maxlength="500" placeholder="' + esc(tr('مثلاً: كاش، أو محتاج تقسيط على 3 سنين')) + '"></textarea></label>' +
      '<input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="hp">' +
      '<span class="note err"></span>' +
      '<button type="submit" class="btn btn-blue">' + tr('ابعت العرض') + '</button>' +
      '<button type="button" class="btn btn-line" data-offerclose>' + tr('قفل') + '</button></form>';
    document.body.appendChild(box);
    var f = box.querySelector('form'), pin = f.elements['price'], hint = box.querySelector('.offer-hint'), err = box.querySelector('.err');
    var val = function () { return parseInt(String(pin.value).replace(/[^\d]/g, ''), 10) || 0; };
    pin.addEventListener('input', function () {
      var v = val();
      pin.value = v ? n(v) : '';
      if (!v) { hint.textContent = ''; return; }
      var t = '= ' + shortMoney(v);
      if (u.price) {
        var p = Math.round((v - u.price) / u.price * 1000) / 10;
        t += ' · ' + (p === 0 ? pdfText('نفس السعر المطلوب', 'same as asking') : (p < 0 ? pdfText('أقل من المطلوب بـ ', 'below asking by ') + Math.abs(p) + '%' : pdfText('أعلى من المطلوب بـ ', 'above asking by ') + p + '%'));
      }
      hint.textContent = t;
    });
    var close = function () { box.remove(); };
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('[data-offerclose]')) close(); });
    setTimeout(function () { try { pin.focus(); } catch (e) {} }, 50);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      err.textContent = '';
      var price = val();
      if (price < 10000) { err.textContent = tr('اكتب سعر صحيح'); pin.focus(); return; }
      var name = needName ? f.elements['name'].value.trim() : meName;
      var phone = needPhone ? f.elements['phone'].value.trim() : mePhone;
      if (name.length < 2 || phone.replace(/\D/g, '').length < 8) { err.textContent = tr('اكتب اسمك ورقمك'); return; }
      var note = f.elements['note'].value.trim();
      var btn = f.querySelector('[type=submit]'); btn.disabled = true; btn.textContent = tr('بنبعت…');
      api('/units/' + u.id + '/offer', { method: 'POST', body: { price: price, name: name, phone: phone, note: note || null, website: f.elements['website'].value } }).then(function (r) {
        var link = shareLink('u', u.id);
        var owner = r.direct && r.owner ? r.owner.split(' ')[0] : pdfText('فريق بكام', 'Bekam team');
        var msg = pdfText('أهلاً' + (owner ? ' ' + owner : '') + '،\nأنا ' + (r.name || name) + '، وعايز أقدّم عرض سعر على الوحدة دي على بكام:\n', 'Hi' + (owner ? ' ' + owner : '') + ',\nI\'m ' + (r.name || name) + ' and I\'d like to make an offer on this unit on Bekam:\n') +
          '🏠 ' + headline + (u.developer ? ' — ' + u.developer : '') + '\n' +
          (u.price ? '💰 ' + pdfText('السعر المطلوب: ', 'Asking: ') + n(u.price) + ' ' + pdfText('ج.م', 'EGP') + '\n' : '') +
          '✅ ' + pdfText('عرضي: ', 'My offer: ') + n(price) + ' ' + pdfText('ج.م', 'EGP') + ' (' + shortMoney(price) + ')' + (rent ? pdfText(' في الشهر', ' a month') : '') + '\n' +
          (note ? '📝 ' + note + '\n' : '') +
          '📞 ' + pdfText('رقمي: ', 'My number: ') + (r.phone || phone) + '\n' +
          '🔗 ' + link;
        var wa = 'https://wa.me/' + r.wa + '?text=' + encodeURIComponent(msg);
        f.innerHTML = '<b>' + tr('العرض اتسجّل ✅') + '</b><span class="muted">' + tr('دوس الزرار عشان تبعته لصاحب الوحدة على واتساب') + '</span>' +
          '<a class="btn btn-green" href="' + esc(wa) + '" target="_blank" rel="noopener" data-offerclose>' + tr('ابعت العرض على واتساب') + '</a>' +
          '<button type="button" class="btn btn-line" data-offerclose>' + tr('قفل') + '</button>';
      }).catch(function (x) {
        btn.disabled = false; btn.textContent = tr('ابعت العرض');
        err.textContent = x && x.status === 429 ? tr('محاولات كتير، استنى شوية') : (x && x.status === 422 && x.data && x.data.message ? x.data.message : tr('العرض ماتبعتش، جرّب تاني'));
      });
    });
  }

  function exportImg(id, btn) {
    if (!auth) { toast(tr('سجّل دخول الأول عشان تعمل صورة للوحدة')); openModal('login'); return; }
    var u = curUnit;
    if (!u || String(u.id) !== String(id)) return;
    var old = btn.innerHTML;
    btn.disabled = true; btn.textContent = tr('بنجهّز الصورة…');
    Promise.all([api('/units/' + id + '/pdf', { method: 'POST' }), loadPdfLibs()]).then(function (r) {
      return Promise.race([buildUnitImage(u, r[0]), new Promise(function (ok, no) { setTimeout(function () { no({ timeout: true }); }, 60000); })]);
    }).then(function (out) {
      pdfReady(out.blob, out.name, tr('الصورة جاهزة ✅'));
    }).catch(function (x) {
      toast(tr(x && x.status === 429 ? 'محاولات كتير، استنى شوية' : 'الصورة ماتعملتش، جرّب تاني'));
    }).then(function () { btn.disabled = false; btn.innerHTML = old; });
  }

  // one 1080×1920 (9:16) image: fits WhatsApp chats and stories without heavy downscaling
  function buildUnitImage(u, who) {
    var en = LANG === 'en';
    var W = 1080, H = 1920, PAD = 56;
    var nPhotos = Math.min(4, (u.photos && u.photos.length) || (u.photo ? 1 : 0));
    var photos = [];
    for (var pi = 0; pi < nPhotos; pi++) photos.push(pdfAbs(API + '/units/' + u.id + '/pdf-photo/' + pi));
    var tType = type(u.type);
    var size = u.size ? u.size + ' ' + pdfText('م²', 'm²') : '';
    var headline = [u.project || city(u.city), tType, size].filter(Boolean).join(' · ');
    var fileName = [u.project || city(u.city), tType, u.size ? u.size + pdfText('م²', 'm2') : ''].filter(Boolean).join(' - ').replace(/[\\/:*?"<>|]+/g, '-');
    var link = shareLink('u', u.id);
    var qr = qrcode(0, 'M'); qr.addData(link); qr.make();
    var qrImg = qr.createDataURL(6, 2);
    var sticker = u.availability === 'sold' ? pdfText('اتباعت', 'SOLD') : (u.availability === 'hold' ? pdfText('محجوزة', 'ON HOLD') : '');
    var price = u.price ? n(u.price) + ' ' + (u.category === 'Rent' ? pdfText('ج.م / شهر', 'EGP / month') : pdfText('ج.م', 'EGP')) : pdfText('السعر عند الطلب', 'Price on request');
    var perM = (u.price && u.size && u.category !== 'Rent') ? n(Math.round(u.price / u.size)) + ' ' + pdfText('ج.م للمتر', 'EGP per m²') : '';
    var specs = [
      [pdfText('المساحة', 'Size'), size || '—'], [pdfText('غرف النوم', 'Bedrooms'), u.bedrooms || '—'], [pdfText('الحمامات', 'Bathrooms'), u.bathrooms || '—'],
      [pdfText('الدور', 'Floor'), u.level || '—'], [pdfText('التشطيب', 'Finishing'), FIN_AR[u.finishing] || u.finishing || '—'], [pdfText('الاستلام', 'Delivery'), DEL_AR[u.delivery] || u.delivery || '—'],
      [pdfText('المطور', 'Developer'), u.developer || '—'], [pdfText('المنطقة', 'Area'), city(u.city) || '—'], [pdfText('نوع العرض', 'Listing'), u.category === 'Rent' ? pdfText('إيجار', 'Rent') : pdfText('ريسيل', 'For sale')],
    ];
    var pay = [];
    if (u.category !== 'Rent') {
      if (u.down_payment) pay.push([pdfText('المقدم / المدفوع', 'Down payment / paid'), n(u.down_payment) + ' ' + pdfText('ج.م', 'EGP')]);
      if (u.down_payment && u.price > u.down_payment) pay.push([pdfText('الباقي', 'Remaining'), n(u.price - u.down_payment) + ' ' + pdfText('ج.م', 'EGP')]);
      if (u.quarter_installment) pay.push([pdfText('القسط ربع السنوي', 'Quarterly installment'), n(u.quarter_installment) + ' ' + pdfText('ج.م', 'EGP')]);
    }
    var wm = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="font-size:90px;font-weight:800;color:rgba(255,255,255,.35);transform:rotate(-18deg);text-shadow:0 2px 10px rgba(0,0,0,.25)">' + pdfText('بكام؟', 'Bekam') + '</span></div>';
    var box = function (src, h, big) {
      return '<div style="position:relative;flex:1;height:' + h + 'px;border-radius:' + (big ? 22 : 14) + 'px;overflow:hidden;background:#e9eef0 ' + (src ? "url('" + esc(src) + "') center/cover no-repeat" : '') + '">' + (src && big ? wm : '') + '</div>';
    };
    var thumbs = photos.slice(1);
    var hasPay = pay.length > 0, hasThumbs = thumbs.length > 0;
    var coverH = 600 + (hasPay ? 0 : 110) + (hasThumbs ? 0 : 190);
    var html =
      '<div style="display:flex;align-items:center;justify-content:space-between">' +
        '<img src="assets/logo-horizontal.png" style="height:64px;width:auto">' +
        '<span style="font-size:20px;color:#5B6B70">Ref #' + u.id + '</span>' +
      '</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:20px;border:3px solid #0B3B5C;border-radius:22px;padding:18px 24px;background:#F3F8FB">' +
        '<div style="display:flex;flex-direction:column;gap:6px;font-size:30px;color:#0B1F2A;min-width:0">' +
          '<span><b>' + pdfText('الاسم:', 'Name:') + '</b> ' + esc(who.name || pdfText('فريق بكام', 'Bekam team')) + '</span>' +
          '<span><b>' + pdfText('الرقم:', 'Number:') + '</b> <span dir="ltr">' + esc(pdfPhone(who.phone)) + '</span></span>' +
        '</div>' +
        '<div style="background:#1F9D55;color:#fff;border-radius:16px;padding:14px 22px;font-size:26px;font-weight:800;white-space:nowrap">' + pdfText('واتساب', 'WhatsApp') + '</div>' +
      '</div>' +
      '<div style="position:relative;display:flex">' + box(photos[0], coverH, true) + (sticker ? '<div style="position:absolute;top:24px;' + (en ? 'left' : 'right') + ':24px;background:' + (u.availability === 'sold' ? '#B42318' : '#B45309') + ';color:#fff;font-weight:800;font-size:32px;padding:10px 24px;border-radius:14px">' + sticker + '</div>' : '') + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:6px">' +
        '<b style="font-size:42px;line-height:1.25">' + esc(headline) + '</b>' +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:16px"><span style="font-size:24px;color:#5B6B70">' + esc([u.developer, city(u.city)].filter(Boolean).join(' · ')) + '</span>' + (perM ? '<span style="font-size:22px;color:#5B6B70;white-space:nowrap">' + esc(perM) + '</span>' : '') + '</div>' +
        '<b style="font-size:48px;color:#0B3B5C">' + esc(price) + '</b>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">' + specs.map(function (s) { return '<div style="background:#F3F6F7;border-radius:14px;padding:12px 16px;display:flex;flex-direction:column"><span style="font-size:19px;color:#5B6B70">' + esc(s[0]) + '</span><b style="font-size:26px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(s[1]) + '</b></div>'; }).join('') + '</div>' +
      (hasPay ? '<div style="border:2px solid #E1E7E9;border-radius:18px;padding:14px 20px;display:flex;flex-direction:column;gap:8px">' + pay.map(function (p) { return '<div style="display:flex;justify-content:space-between;font-size:26px"><span style="color:#5B6B70">' + esc(p[0]) + '</span><b>' + esc(p[1]) + '</b></div>'; }).join('') + '</div>' : '') +
      (hasThumbs ? '<div style="display:flex;gap:12px">' + thumbs.map(function (s) { return box(s, 190, false); }).join('') + '</div>' : '') +
      '<div style="margin-top:auto;display:flex;align-items:center;gap:22px;border-top:2px dashed #D4DDE0;padding-top:18px">' +
        '<img src="' + qrImg + '" style="width:150px;height:150px;image-rendering:pixelated">' +
        '<div style="display:flex;flex-direction:column;gap:6px;font-size:22px;min-width:0"><b style="font-size:28px">' + pdfText('للتفاصيل الكاملة والوصف امسح الكود', 'Scan for full details & description') + '</b><span dir="ltr" style="color:#0B3B5C">' + esc(link.replace(/^https?:\/\//, '')) + '</span><span style="color:#8A979B;font-size:18px">' + pdfText('الأسعار والبيانات قابلة للتغيير — اتأكد مع صاحب الوحدة.', 'Prices and details may change — confirm with the lister.') + '</span></div>' +
      '</div>';
    var holder = document.createElement('div');
    holder.setAttribute('translate', 'no');
    holder.style.cssText = 'position:fixed;left:-20000px;top:0;z-index:-1';
    holder.innerHTML = '<div class="img-page" style="width:' + W + 'px;height:' + H + 'px;background:#fff;box-sizing:border-box;padding:' + PAD + 'px;display:flex;flex-direction:column;gap:22px;overflow:hidden;font-family:\'GE Dinar One\',\'Tajawal\',system-ui,sans-serif;direction:' + (en ? 'ltr' : 'rtl') + ';color:#0B1F2A">' + html + '</div>';
    document.body.appendChild(holder);
    var waitImgs = Array.prototype.map.call(holder.querySelectorAll('img'), function (im) { return im.complete ? Promise.resolve() : new Promise(function (ok) { im.onload = im.onerror = ok; }); });
    var bgs = photos.map(function (s) { return new Promise(function (ok) { var i = new Image(); i.onload = i.onerror = ok; i.src = s; }); });
    var fontsReady = pdfTimeout(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(), 3000);
    var el = holder.firstChild;
    return pdfTimeout(Promise.all(waitImgs.concat(bgs)), 15000).then(function () { return fontsReady; }).then(function () {
      return window.html2canvas(el, { scale: 1, useCORS: true, backgroundColor: '#ffffff', logging: false, imageTimeout: 15000, ignoreElements: pdfSkip(holder) });
    }).then(function (cv) {
      return new Promise(function (ok, no) {
        var done = function (b) { b ? ok({ blob: b, name: fileName + '.jpg' }) : no(new Error('blob')); };
        if (cv.toBlob) cv.toBlob(done, 'image/jpeg', 0.88);
        else { var d = cv.toDataURL('image/jpeg', 0.88), bin = atob(d.split(',')[1]), arr = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i); done(new Blob([arr], { type: 'image/jpeg' })); }
      });
    }).then(function (out) { holder.remove(); return out; }, function (e) { holder.remove(); throw e; });
  }

  function buildUnitPdf(u, who) {
    var en = LANG === 'en';
    var dir = en ? 'ltr' : 'rtl';
    var W = 794, H = 1123, PAD = 40;
    // small server-made copies (cover 1280px, others 720px) instead of the original 3–6 MB photos
    var nPhotos = Math.min(7, (u.photos && u.photos.length) || (u.photo ? 1 : 0));
    var photos = [];
    for (var pi = 0; pi < nPhotos; pi++) photos.push(pdfAbs(API + '/units/' + u.id + '/pdf-photo/' + pi));
    var tType = type(u.type);
    var size = u.size ? u.size + ' ' + pdfText('م²', 'm²') : '';
    var headline = [u.project || city(u.city), tType, size].filter(Boolean).join(' · ');
    var fileName = [u.project || city(u.city), tType, u.size ? u.size + pdfText('م²', 'm2') : ''].filter(Boolean).join(' - ').replace(/[\\/:*?"<>|]+/g, '-');
    var link = shareLink('u', u.id);
    var waUrl = 'https://wa.me/' + who.phone + '?text=' + encodeURIComponent(pdfText('أهلاً، بخصوص الوحدة دي على بكام:\n', 'Hi, about this unit on Bekam:\n') + headline + '\n' + link);
    var qr = qrcode(0, 'M'); qr.addData(link); qr.make();
    var qrImg = qr.createDataURL(5, 2);
    var sticker = u.availability === 'sold' ? pdfText('اتباعت', 'SOLD') : (u.availability === 'hold' ? pdfText('محجوزة', 'ON HOLD') : '');
    var price = u.price ? n(u.price) + ' ' + (u.category === 'Rent' ? pdfText('ج.م / شهر', 'EGP / month') : pdfText('ج.م', 'EGP')) : pdfText('السعر عند الطلب', 'Price on request');
    var perM = (u.price && u.size && u.category !== 'Rent') ? n(Math.round(u.price / u.size)) + ' ' + pdfText('ج.م للمتر', 'EGP per m²') : '';
    var specs = [
      [pdfText('المساحة', 'Size'), size || '—'], [pdfText('غرف النوم', 'Bedrooms'), u.bedrooms || '—'], [pdfText('الحمامات', 'Bathrooms'), u.bathrooms || '—'],
      [pdfText('الدور', 'Floor'), u.level || '—'], [pdfText('التشطيب', 'Finishing'), FIN_AR[u.finishing] || u.finishing || '—'], [pdfText('الاستلام', 'Delivery'), DEL_AR[u.delivery] || u.delivery || '—'],
      [pdfText('المطور', 'Developer'), u.developer || '—'], [pdfText('المنطقة', 'Area'), city(u.city) || '—'], [pdfText('نوع العرض', 'Listing'), u.category === 'Rent' ? pdfText('إيجار', 'Rent') : pdfText('ريسيل', 'For sale')],
    ];
    var pay = [];
    if (u.category !== 'Rent') {
      if (u.down_payment) pay.push([pdfText('المقدم / المدفوع', 'Down payment / paid'), n(u.down_payment) + ' ' + pdfText('ج.م', 'EGP')]);
      if (u.down_payment && u.price > u.down_payment) pay.push([pdfText('الباقي', 'Remaining'), n(u.price - u.down_payment) + ' ' + pdfText('ج.م', 'EGP')]);
      if (u.quarter_installment) pay.push([pdfText('القسط ربع السنوي', 'Quarterly installment'), n(u.quarter_installment) + ' ' + pdfText('ج.م', 'EGP') + ' (' + pdfText('حوالي', 'about') + ' ' + n(Math.round(u.quarter_installment / 3)) + ' ' + pdfText('في الشهر', 'a month') + ')']);
    }
    var desc = (typeof cleanDesc === 'function' ? cleanDesc(u.description) : []).slice(0, 14);
    var font = "font-family:'GE Dinar One','Tajawal',system-ui,sans-serif;";
    var wm = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none"><span style="font-size:64px;font-weight:800;color:rgba(255,255,255,.35);transform:rotate(-18deg);text-shadow:0 2px 8px rgba(0,0,0,.25)">' + pdfText('بكام؟', 'Bekam') + '</span></div>';
    var photoBox = function (src, h, extra) {
      return '<div style="position:relative;height:' + h + 'px;border-radius:14px;overflow:hidden;background:#e9eef0 ' + (src ? "url('" + esc(src) + "') center/cover no-repeat" : '') + ';' + (extra || '') + '">' + (src ? wm : '') + '</div>';
    };
    var contact =
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:16px;border:2px solid #0B3B5C;border-radius:16px;padding:14px 18px;background:#F3F8FB">' +
        '<div style="display:flex;flex-direction:column;gap:4px;font-size:20px;color:#0B1F2A">' +
          '<span><b>' + pdfText('الاسم:', 'Name:') + '</b> ' + esc(who.name || pdfText('فريق بكام', 'Bekam team')) + '</span>' +
          '<span><b>' + pdfText('الرقم:', 'Number:') + '</b> <span dir="ltr">' + esc(pdfPhone(who.phone)) + '</span></span>' +
        '</div>' +
        '<div data-pdflink="wa" style="background:#1F9D55;color:#fff;border-radius:12px;padding:12px 18px;font-size:18px;font-weight:800;white-space:nowrap">' + pdfText('كلّمه واتساب', 'WhatsApp') + '</div>' +
      '</div>';
    var header =
      '<div style="display:flex;align-items:center;justify-content:space-between">' +
        '<img src="assets/logo-horizontal.png" style="height:44px;width:auto">' +
        '<span style="font-size:13px;color:#5B6B70">' + pdfText('اتعمل في', 'Created') + ' ' + esc(pdfDate()) + ' · Ref #' + u.id + '</span>' +
      '</div>';
    var footer = function (pageNo, total) {
      return '<div style="position:absolute;left:' + PAD + 'px;right:' + PAD + 'px;bottom:22px;display:flex;justify-content:space-between;font-size:12px;color:#8A979B;border-top:1px solid #E1E7E9;padding-top:8px">' +
        '<span>' + pdfText('الأسعار والبيانات قابلة للتغيير — اتأكد مع صاحب الوحدة.', 'Prices and details may change — confirm with the lister.') + '</span><span>' + pageNo + ' / ' + total + '</span></div>';
    };
    var extraPhotos = photos.slice(1, 7);
    var total = extraPhotos.length || desc.length ? 2 : 1;
    var page = function (inner, no) {
      return '<div class="pdf-page" style="position:relative;width:' + W + 'px;height:' + H + 'px;background:#fff;box-sizing:border-box;padding:' + PAD + 'px;display:flex;flex-direction:column;gap:16px;' + font + 'direction:' + dir + ';color:#0B1F2A">' + inner + footer(no, total) + '</div>';
    };
    var p1 =
      header + contact +
      '<div style="position:relative">' + photoBox(photos[0], 360) + (sticker ? '<div style="position:absolute;top:18px;' + (en ? 'left' : 'right') + ':18px;background:' + (u.availability === 'sold' ? '#B42318' : '#B45309') + ';color:#fff;font-weight:800;font-size:22px;padding:8px 18px;border-radius:10px">' + sticker + '</div>' : '') + '</div>' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px">' +
        '<div style="display:flex;flex-direction:column;gap:4px;min-width:0"><b style="font-size:28px;line-height:1.25">' + esc(headline) + '</b><span style="font-size:15px;color:#5B6B70">' + esc([u.developer, city(u.city)].filter(Boolean).join(' · ')) + '</span></div>' +
        '<div style="display:flex;flex-direction:column;align-items:' + (en ? 'flex-end' : 'flex-start') + ';white-space:nowrap"><b style="font-size:28px;color:#0B3B5C">' + esc(price) + '</b>' + (perM ? '<span style="font-size:13px;color:#5B6B70">' + esc(perM) + '</span>' : '') + '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">' + specs.map(function (s) { return '<div style="background:#F3F6F7;border-radius:10px;padding:8px 12px;display:flex;flex-direction:column"><span style="font-size:12px;color:#5B6B70">' + esc(s[0]) + '</span><b style="font-size:16px">' + esc(s[1]) + '</b></div>'; }).join('') + '</div>' +
      (pay.length ? '<div style="border:1px solid #E1E7E9;border-radius:12px;padding:10px 14px;display:flex;flex-direction:column;gap:6px"><b style="font-size:17px">' + pdfText('خطة السداد', 'Payment plan') + '</b>' + pay.map(function (p) { return '<div style="display:flex;justify-content:space-between;font-size:15px"><span style="color:#5B6B70">' + esc(p[0]) + '</span><b>' + esc(p[1]) + '</b></div>'; }).join('') + '</div>' : '') +
      '<div style="margin-top:auto;margin-bottom:30px;display:flex;align-items:center;gap:16px;border-top:1px dashed #D4DDE0;padding-top:12px">' +
        '<img data-pdflink="site" src="' + qrImg + '" style="width:112px;height:112px;image-rendering:pixelated">' +
        '<div style="display:flex;flex-direction:column;gap:4px;font-size:14px"><b style="font-size:16px">' + pdfText('امسح الكود وشوف الوحدة على بكام', 'Scan to see this unit on Bekam') + '</b><span data-pdflink="site" dir="ltr" style="color:#0B3B5C">' + esc(link) + '</span><span style="color:#5B6B70">' + pdfText('صور وأسعار محدّثة، وحاسبة القسط', 'Updated photos & prices, installment calculator') + '</span></div>' +
      '</div>';
    var pages = [page(p1, 1)];
    if (total === 2) {
      var grid = extraPhotos.length ? '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' + extraPhotos.map(function (s) { return photoBox(s, extraPhotos.length > 4 ? 200 : 250); }).join('') + '</div>' : '';
      desc = desc.slice(0, extraPhotos.length > 4 ? 9 : (extraPhotos.length > 2 ? 11 : 14));
      var d2 = desc.length ? '<div style="display:flex;flex-direction:column;gap:6px"><b style="font-size:18px">' + pdfText('عن الوحدة', 'About the unit') + '</b><div style="display:flex;flex-direction:column;gap:2px;font-size:14px;line-height:1.7" translate="no">' + desc.map(function (l) { return '<div dir="auto" style="unicode-bidi:plaintext">• ' + esc(l) + '</div>'; }).join('') + '</div></div>' : '';
      var mini = '<div style="display:flex;justify-content:space-between;align-items:center;font-size:15px;background:#F3F8FB;border-radius:12px;padding:10px 14px"><span><b>' + pdfText('الاسم:', 'Name:') + '</b> ' + esc(who.name || pdfText('فريق بكام', 'Bekam team')) + ' · <b>' + pdfText('الرقم:', 'Number:') + '</b> <span dir="ltr">' + esc(pdfPhone(who.phone)) + '</span></span><span style="color:#5B6B70">' + esc(headline) + '</span></div>';
      pages.push(page(header + mini + grid + d2, 2));
    }
    var holder = document.createElement('div');
    holder.setAttribute('translate', 'no');
    holder.style.cssText = 'position:fixed;left:-20000px;top:0;z-index:-1;display:flex;flex-direction:column;gap:20px';
    holder.innerHTML = pages.join('');
    document.body.appendChild(holder);
    var waitImgs = Array.prototype.map.call(holder.querySelectorAll('img'), function (im) { return im.complete ? Promise.resolve() : new Promise(function (ok) { im.onload = im.onerror = ok; }); });
    var bgs = photos.slice(0, 7).map(function (s) { return new Promise(function (ok) { var i = new Image(); i.onload = i.onerror = ok; i.src = s; }); });
    var fontsReady = pdfTimeout(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(), 3000);
    return pdfTimeout(Promise.all(waitImgs.concat(bgs)), 15000).then(function () { return fontsReady; }).then(function () {
      var pdf = new window.jspdf.jsPDF({ unit: 'pt', format: 'a4', compress: true });
      var k = 595.28 / W;
      var els = holder.querySelectorAll('.pdf-page');
      var chain = Promise.resolve();
      Array.prototype.forEach.call(els, function (el, i) {
        chain = chain.then(function () {
          return window.html2canvas(el, { scale: 1.75, useCORS: true, backgroundColor: '#ffffff', logging: false, imageTimeout: 15000, ignoreElements: pdfSkip(holder) }).then(function (cv) {
            if (i > 0) pdf.addPage();
            pdf.addImage(cv.toDataURL('image/jpeg', 0.8), 'JPEG', 0, 0, 595.28, 841.89, undefined, 'FAST');
            var pr = el.getBoundingClientRect();
            el.querySelectorAll('[data-pdflink]').forEach(function (a) {
              var r = a.getBoundingClientRect();
              pdf.link((r.left - pr.left) * k, (r.top - pr.top) * k, r.width * k, r.height * k, { url: a.dataset.pdflink === 'wa' ? waUrl : link });
            });
          });
        });
      });
      return chain.then(function () {
        pdf.setProperties({ title: headline, subject: 'Bekam unit #' + u.id, creator: 'bekam.tapegypt.com' });
        return { blob: pdf.output('blob'), name: fileName + '.pdf' };
      });
    }).then(function (out) { holder.remove(); return out; }, function (e) { holder.remove(); throw e; });
  }

  function pdfReady(blob, name, title) {
    var file = null;
    try { file = new File([blob], name, { type: blob.type || 'application/pdf' }); } catch (e) {}
    var canShare = !!(file && navigator.canShare && navigator.canShare({ files: [file] }));
    var url = URL.createObjectURL(blob);
    var box = document.createElement('div');
    box.className = 'pdf-ready';
    box.innerHTML = '<div class="pdf-ready-card" role="dialog" aria-label="PDF">' +
      '<b>' + (title || tr('الـ PDF جاهز ✅')) + '</b><span class="muted" dir="auto">' + esc(name) + '</span>' +
      (canShare ? '<button type="button" class="btn btn-blue" data-pdfdo="share">' + tr('شاركه (واتساب وغيره)') + '</button>' : '') +
      '<a class="btn btn-line" href="' + url + '" download="' + esc(name) + '" data-pdfdo="dl">' + tr('نزّل الملف') + '</a>' +
      '<button type="button" class="btn btn-line" data-pdfdo="close">' + tr('قفل') + '</button></div>';
    document.body.appendChild(box);
    var close = function () { box.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 60000); };
    box.addEventListener('click', function (e) {
      var t = e.target.closest('[data-pdfdo]');
      if (e.target === box) { close(); return; }
      if (!t) return;
      if (t.dataset.pdfdo === 'share') { navigator.share({ files: [file], title: name }).then(close).catch(function () {}); }
      else if (t.dataset.pdfdo === 'dl') { setTimeout(close, 400); }
      else close();
    });
  }

  window.addEventListener('hashchange', route);
  bindLeads(document);
  loadHome();
  route();
})();

/* Motion (design option 2): reveal on scroll, count-up numbers, developers strip. Content stays visible without JS. */
(function () {
  var REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCED || !('IntersectionObserver' in window)) return;
  var root = document.documentElement; root.classList.add('mo');
  var home = document.getElementById('v-home'); if (!home) return;
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (!en.isIntersecting) return;
      var t = en.target; t.classList.add('mo-in'); io.unobserve(t);
      setTimeout(function () { t.classList.add('mo-done'); }, 1800);
      if (t.dataset.count) count(t);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  var SEL = '.sec-h, #areas > *, #featured > *, #projs > *, #offers > *, .step, .contact-box > *, .sec-last > div, #stats > *';
  function tag() {
    var groups = {};
    home.querySelectorAll(SEL).forEach(function (el) {
      if (el.classList.contains('mo-rv') || el.classList.contains('sec-h') && el.dataset.mo) return;
      if (el.classList.contains('sec-h')) { el.dataset.mo = '1'; io.observe(el); return; }
      var p = el.parentNode, k = groups[p.id || p.className] = (groups[p.id || p.className] || 0) + 1;
      el.classList.add('mo-rv'); el.style.setProperty('--d', (Math.min(k - 1, 8) * 0.08) + 's');
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.9 && r.bottom > 0) { requestAnimationFrame(function () { el.classList.add('mo-in'); if (el.dataset.count) count(el); setTimeout(function () { el.classList.add('mo-done'); }, 1800); }); }
      else io.observe(el);
    });
    // numbers count up
    home.querySelectorAll('#stats .stat b').forEach(function (b) {
      if (b.dataset.count) return;
      var v = parseInt(String(b.textContent).replace(/[^\d]/g, ''), 10); if (!v) return;
      b.dataset.count = String(v); b.dataset.txt = b.textContent; b.textContent = '0';
      var host = b.closest('.stat'); host.dataset.count = '1'; host._num = b;
      if (host.classList.contains('mo-in')) count(host);
    });
    marquee();
  }
  function count(host) {
    var b = host._num || host.querySelector('b'); if (!b || b.dataset.done) return; b.dataset.done = '1';
    var to = +b.dataset.count, t0 = performance.now(), fmt = new Intl.NumberFormat('en-US');
    (function step(t) { var k = Math.min(1, (t - t0) / 1400); k = 1 - Math.pow(1 - k, 3);
      b.textContent = fmt.format(Math.round(to * k)); if (k < 1) requestAnimationFrame(step); else b.textContent = b.dataset.txt; })(t0);
  }
  function marquee() {
    var devs = document.getElementById('devs'); if (!devs || !devs.children.length || devs.querySelector('[aria-hidden="true"]')) return;
    if (!devs.parentNode.classList.contains('mo-mq')) { var wrap = document.createElement('div'); wrap.className = 'mo-mq'; devs.parentNode.insertBefore(wrap, devs); wrap.appendChild(devs); }
    [].slice.call(devs.children).forEach(function (c) { var k = c.cloneNode(true); k.setAttribute('aria-hidden', 'true'); k.tabIndex = -1; k.querySelectorAll('a,button').forEach(function (a) { a.tabIndex = -1; }); devs.appendChild(k); });
  }
  var pend; new MutationObserver(function () { clearTimeout(pend); pend = setTimeout(tag, 60); }).observe(home, { childList: true, subtree: true });
  tag();
})();
