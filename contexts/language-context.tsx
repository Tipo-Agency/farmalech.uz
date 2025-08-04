"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "ru" | "uz"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Переводы для интерфейса
const translations = {
  ru: {
    // Header
    "nav.about": "О компании",
    "nav.products": "Продукция",
    "nav.partnership": "Партнерство",
    "nav.contacts": "Контакты",
    "nav.menu": "Открыть меню",

    // Hero Section
    "hero.title": "FARMALECH: Инновации и забота о здоровье",
    "hero.description":
      "Мы разрабатываем и производим высококачественные фармацевтические препараты, чтобы улучшить качество жизни людей. Приглашаем к сотрудничеству дистрибьюторов и аптечные сети.",
    "hero.partner": "Стать партнером",
    "hero.products": "Наша продукция",
    "hero.image.alt": "Фармацевтические исследования и разработка лекарств",

    // About Section
    "about.title": "О компании FARMALECH",
    "about.description":
      "FARMALECH — это динамично развивающаяся фармацевтическая компания, миссия которой — обеспечение населения доступными и эффективными средствами. Мы используем передовые технологии и строгие стандарты качества на всех этапах производства.",
    "about.quality": "Высокое качество",
    "about.quality.desc": "Контроль на всех этапах производства.",
    "about.innovation": "Инновационные формулы",
    "about.innovation.desc": "Современные и эффективные препараты.",
    "about.partnership": "Надежное партнерство",
    "about.partnership.desc": "Выгодные условия для дистрибьюторов.",

    // Products Section
    "products.title": "Наша продукция",
    "products.description": "Ознакомьтесь с некоторыми из наших ключевых препаратов.",
    "products.more": "Подробнее",
    "products.catalog": "Смотреть весь каталог",

    // Partnership Section
    "partnership.title": "Станьте нашим партнером",
    "partnership.description":
      "Мы ищем надежных партнеров для долгосрочного и взаимовыгодного сотрудничества. Заполните форму, и наш менеджер свяжется с вами в ближайшее время.",
    "partnership.form.title": "Заявка на партнерство",
    "partnership.form.name": "Ваше имя",
    "partnership.form.name.placeholder": "Иван Иванов",
    "partnership.form.company": "Название компании",
    "partnership.form.company.placeholder": 'ООО "Фарм-Дистрибьюция"',
    "partnership.form.email": "Email",
    "partnership.form.email.placeholder": "partner@example.com",
    "partnership.form.phone": "Телефон",
    "partnership.form.phone.placeholder": "+998 90 123 45 67",
    "partnership.form.message": "Сообщение",
    "partnership.form.message.placeholder": "Расскажите немного о вашей компании и интересе к сотрудничеству",
    "partnership.form.submit": "Отправить заявку",

    // Footer
    "footer.description": "Инновационные решения для вашего здоровья.",
    "footer.navigation": "Навигация",
    "footer.contacts": "Контакты",
    "footer.address": "г. Ташкент, Сергелийский район, ул Нилюфар, 3 проезд 2.",
    "footer.phone": "Телефон: +998 99 037 33 00",
    "footer.email": "Email: info@farmalech.uz",
    "footer.rights": "Все права защищены.",

    // Products Page
    "products.page.title": "Каталог продукции",
    "products.page.description": "Полный спектр наших препаратов для вашего здоровья.",

    // Product Detail
    "product.composition": "Состав",
    "product.pharmacology": "Фармакологическое действие",
    "product.indications": "Показания к применению",
    "product.usage": "Способ применения и дозы",
    "product.contraindications": "Противопоказания",
    "product.overdose": "Передозировка",
    "product.releaseForm": "Форма выпуска",
    "product.storage": "Условия хранения",
    "product.manufacturer": "Производитель",

    // Contacts Page
    "contacts.title": "Свяжитесь с нами",
    "contacts.description": "Мы всегда готовы ответить на ваши вопросы и обсудить возможности сотрудничества.",
    "contacts.info.title": "Контактная информация",
    "contacts.info.address.title": "Адрес офиса",
    "contacts.info.address.value": "г. Ташкент, Сергелийский район, ул. Нилуфар, 3 проезд, 2",
    "contacts.info.phone.title": "Телефоны",
    "contacts.info.email.title": "Электронная почта",
    "contacts.info.hours.title": "Часы работы",
    "contacts.info.hours.weekdays": "Пн-Пт: 9:00 - 18:00",
    "contacts.info.hours.weekend": "Сб-Вс: Выходной",
    "contacts.map.placeholder": "Интерактивная карта",
    "contacts.form.title": "Отправить сообщение",
    "contacts.form.firstName": "Имя",
    "contacts.form.firstName.placeholder": "Введите ваше имя",
    "contacts.form.lastName": "Фамилия",
    "contacts.form.lastName.placeholder": "Введите вашу фамилию",
    "contacts.form.email": "Email",
    "contacts.form.email.placeholder": "your@email.com",
    "contacts.form.phone": "Телефон",
    "contacts.form.phone.placeholder": "+998 90 123 45 67",
    "contacts.form.company": "Компания",
    "contacts.form.company.placeholder": "Название вашей компании",
    "contacts.form.subject": "Тема",
    "contacts.form.subject.placeholder": "Тема вашего сообщения",
    "contacts.form.message": "Сообщение",
    "contacts.form.message.placeholder": "Расскажите подробнее о вашем вопросе или предложении...",
    "contacts.form.submit": "Отправить сообщение",
    "contacts.form.sending": "Отправка...",
    "contacts.form.success.title": "Сообщение отправлено!",
    "contacts.form.success.message": "Спасибо за ваше сообщение. Мы свяжемся с вами в ближайшее время.",

    // About Us Expanded Section
    "about.expanded.title": "О компании FARMALECH - Лидере фармацевтической индустрии Узбекистана",
    "about.expanded.subtitle": "Инновации, качество и доверие в каждом препарате",
    "about.expanded.main": "FARMALECH — ведущая фармацевтическая компания Узбекистана, специализирующаяся на производстве высококачественных лекарственных средств и биологически активных добавок. С момента основания мы придерживаемся принципов инновационного подхода к разработке препаратов, строгого контроля качества и ответственного отношения к здоровью наших потребителей.",
    "about.expanded.mission": "Наша миссия — обеспечение доступности эффективных фармацевтических решений для улучшения качества жизни людей в Центральной Азии.",
    "about.expanded.production": "Современное производство с соблюдением международных стандартов GMP",
    "about.expanded.research": "Собственная исследовательская лаборатория и отдел разработки",
    "about.expanded.quality": "Многоступенчатый контроль качества на всех этапах производства",
    "about.expanded.distribution": "Развитая дистрибьюторская сеть по всему Узбекистану",

    // FAQ Section
    "faq.title": "Часто задаваемые вопросы",
    "faq.subtitle": "Ответы на популярные вопросы о нашей продукции и услугах",
    "faq.question1": "Какие препараты производит FARMALECH?",
    "faq.answer1": "FARMALECH производит широкий спектр фармацевтических препаратов и БАДов, включая препараты для сердечно-сосудистой системы, желудочно-кишечного тракта, дыхательных путей, а также витаминно-минеральные комплексы. Вся продукция соответствует международным стандартам качества.",
    "faq.question2": "Как стать дистрибьютором FARMALECH?",
    "faq.answer2": "Для становления дистрибьютором необходимо заполнить заявку на партнерство на нашем сайте или связаться с нами по телефону +998 99 037 33 00. Мы рассматриваем предложения от аптечных сетей, оптовых поставщиков и региональных дистрибьюторов.",
    "faq.question3": "Соответствует ли продукция FARMALECH международным стандартам?",
    "faq.answer3": "Да, все наши препараты производятся в соответствии с требованиями GMP (Good Manufacturing Practice) и проходят строгий контроль качества. Производство сертифицировано по международным стандартам.",
    "faq.question4": "В каких регионах доступна продукция FARMALECH?",
    "faq.answer4": "Наша продукция доступна во всех регионах Узбекистана через сеть партнерских аптек и дистрибьюторов. Также мы работаем над расширением присутствия в странах Центральной Азии.",
    "faq.question5": "Предоставляет ли FARMALECH техническую поддержку?",
    "faq.answer5": "Да, мы предоставляем полную техническую поддержку нашим партнерам, включая обучение персонала, предоставление маркетинговых материалов и консультации по продвижению продукции.",
  },
  uz: {
    // Header
    "nav.about": "Kompaniya haqida",
    "nav.products": "Mahsulotlar",
    "nav.partnership": "Hamkorlik",
    "nav.contacts": "Kontaktlar",
    "nav.menu": "Menyuni ochish",

    // Hero Section
    "hero.title": "FARMALECH: Innovatsiyalar va salomatlik g'amxo'rligi",
    "hero.description":
      "Biz odamlarning hayot sifatini yaxshilash uchun yuqori sifatli farmatsevtik preparatlarni ishlab chiqamiz va ishlab chiqaramiz. Distribyutorlar va dorixona tarmoqlarini hamkorlikka taklif qilamiz.",
    "hero.partner": "Hamkor bo'lish",
    "hero.products": "Bizning mahsulotlarimiz",
    "hero.image.alt": "Farmatsevtik tadqiqotlar va dori vositalari ishlab chiqish",

    // About Section
    "about.title": "FARMALECH kompaniyasi haqida",
    "about.description":
      "FARMALECH - bu aholini arzon va samarali dori vositalari bilan ta'minlash missiyasiga ega bo'lgan jadal rivojlanayotgan farmatsevtik kompaniya. Biz ishlab chiqarishning barcha bosqichlarida ilg'or texnologiyalar va qat'iy sifat standartlaridan foydalanamiz.",
    "about.quality": "Yuqori sifat",
    "about.quality.desc": "Ishlab chiqarishning barcha bosqichlarida nazorat.",
    "about.innovation": "Innovatsion formulalar",
    "about.innovation.desc": "Zamonaviy va samarali preparatlar.",
    "about.partnership": "Ishonchli hamkorlik",
    "about.partnership.desc": "Distribyutorlar uchun foydali shartlar.",

    // Products Section
    "products.title": "Bizning mahsulotlarimiz",
    "products.description": "Bizning asosiy preparatlarimizdan ba'zilari bilan tanishing.",
    "products.more": "Batafsil",
    "products.catalog": "Butun katalogni ko'rish",

    // Partnership Section
    "partnership.title": "Bizning hamkorimiz bo'ling",
    "partnership.description":
      "Biz uzoq muddatli va o'zaro foydali hamkorlik uchun ishonchli hamkorlarni qidirmoqdamiz. Formani to'ldiring va bizning menejerimiz yaqin vaqt ichida siz bilan bog'lanadi.",
    "partnership.form.title": "Hamkorlik uchun ariza",
    "partnership.form.name": "Ismingiz",
    "partnership.form.name.placeholder": "Ivan Ivanov",
    "partnership.form.company": "Kompaniya nomi",
    "partnership.form.company.placeholder": 'MChJ "Farm-Distribyutsiya"',
    "partnership.form.email": "Email",
    "partnership.form.email.placeholder": "partner@example.com",
    "partnership.form.phone": "Telefon",
    "partnership.form.phone.placeholder": "+998 90 123 45 67",
    "partnership.form.message": "Xabar",
    "partnership.form.message.placeholder": "Kompaniyangiz va hamkorlikka qiziqishingiz haqida ozgina ma'lumot bering",
    "partnership.form.submit": "Ariza yuborish",

    // Footer
    "footer.description": "Salomatligingiz uchun innovatsion yechimlar.",
    "footer.navigation": "Navigatsiya",
    "footer.contacts": "Kontaktlar",
    "footer.address": "Manzil: Toshkent sh., Sergeli tumani, Nilufar ko'chasi, 3-o'tish, 2-uy.",
    "footer.phone": "Telefon: +998 99 037 33 00",
    "footer.email": "Email: info@farmalech.uz",
    "footer.rights": "Barcha huquqlar himoyalangan.",

    // Products Page
    "products.page.title": "Mahsulotlar katalogi",
    "products.page.description": "Salomatligingiz uchun preparatlarimizning to'liq spektri.",

    // Product Detail
    "product.composition": "Tarkibi",
    "product.pharmacology": "Farmakologik ta'sir",
    "product.indications": "Qo'llash ko'rsatmalari",
    "product.usage": "Qo'llash usuli va dozalar",
    "product.contraindications": "Qarshi ko'rsatmalar",
    "product.overdose": "Dozani oshirib yuborish",
    "product.releaseForm": "Chiqarish shakli",
    "product.storage": "Saqlash sharoitlari",
    "product.manufacturer": "Ishlab chiqaruvchi",

    // Contacts Page
    "contacts.title": "Biz bilan bog'laning",
    "contacts.description":
      "Biz har doim savollaringizga javob berishga va hamkorlik imkoniyatlarini muhokama qilishga tayyormiz.",
    "contacts.info.title": "Kontakt ma'lumotlari",
    "contacts.info.address.title": "Ofis manzili",
    "contacts.info.address.value": "Toshkent sh., Sergeli tumani, Nilufar ko'ch., 3-o'tish, 2",
    "contacts.info.phone.title": "Telefonlar",
    "contacts.info.email.title": "Elektron pochta",
    "contacts.info.hours.title": "Ish vaqti",
    "contacts.info.hours.weekdays": "Du-Ju: 9:00 - 18:00",
    "contacts.info.hours.weekend": "Sh-Ya: Dam olish kuni",
    "contacts.map.placeholder": "Interaktiv xarita",
    "contacts.form.title": "Xabar yuborish",
    "contacts.form.firstName": "Ism",
    "contacts.form.firstName.placeholder": "Ismingizni kiriting",
    "contacts.form.lastName": "Familiya",
    "contacts.form.lastName.placeholder": "Familiyangizni kiriting",
    "contacts.form.email": "Email",
    "contacts.form.email.placeholder": "sizning@email.com",
    "contacts.form.phone": "Telefon",
    "contacts.form.phone.placeholder": "+998 90 123 45 67",
    "contacts.form.company": "Kompaniya",
    "contacts.form.company.placeholder": "Kompaniyangiz nomi",
    "contacts.form.subject": "Mavzu",
    "contacts.form.subject.placeholder": "Xabaringizning mavzusi",
    "contacts.form.message": "Xabar",
    "contacts.form.message.placeholder": "Savolingiz yoki taklifingiz haqida batafsil ma'lumot bering...",
    "contacts.form.submit": "Xabar yuborish",
    "contacts.form.sending": "Yuborilmoqda...",
    "contacts.form.success.title": "Xabar yuborildi!",
    "contacts.form.success.message": "Xabaringiz uchun rahmat. Biz tez orada siz bilan bog'lanamiz.",

    // About Us Expanded Section
    "about.expanded.title": "FARMALECH kompaniyasi haqida - O'zbekiston farmatsevtika sohasining yetakchisi",
    "about.expanded.subtitle": "Har bir preparatda innovatsiya, sifat va ishonch",
    "about.expanded.main": "FARMALECH — O'zbekistonning yetakchi farmatsevtika kompaniyasi bo'lib, yuqori sifatli dori vositalari va biologik faol qo'shimchalar ishlab chiqarishga ixtisoslashgan. Tashkil etilgan kundan boshlab biz preparatlarni ishlab chiqishda innovatsion yondashuv, qat'iy sifat nazorati va iste'molchilarimiz salomatligiga mas'uliyatli munosabat tamoyillariga amal qilamiz.",
    "about.expanded.mission": "Bizning missiyamiz — Markaziy Osiyoda odamlarning hayot sifatini yaxshilash uchun samarali farmatsevtika yechimlarining mavjudligini ta'minlash.",
    "about.expanded.production": "Xalqaro GMP standartlariga muvofiq zamonaviy ishlab chiqarish",
    "about.expanded.research": "O'z tadqiqot laboratoriyasi va ishlab chiqish bo'limi",
    "about.expanded.quality": "Ishlab chiqarishning barcha bosqichlarida ko'p bosqichli sifat nazorati",
    "about.expanded.distribution": "Butun O'zbekiston bo'ylab rivojlangan distribyutor tarmog'i",

    // FAQ Section
    "faq.title": "Tez-tez beriladigan savollar",
    "faq.subtitle": "Mahsulotlarimiz va xizmatlarimiz haqida mashhur savollarga javoblar",
    "faq.question1": "FARMALECH qanday preparatlar ishlab chiqaradi?",
    "faq.answer1": "FARMALECH farmatsevtika preparatlari va BAQlarning keng spektrini ishlab chiqaradi, jumladan yurak-qon tomir tizimi, oshqozon-ichak trakti, nafas yo'llari uchun preparatlar, shuningdek vitamin-mineral komplekslari. Barcha mahsulotlar xalqaro sifat standartlariga javob beradi.",
    "faq.question2": "FARMALECH distribyutori qanday bo'lish mumkin?",
    "faq.answer2": "Distribyutor bo'lish uchun bizning saytimizda hamkorlik uchun ariza to'ldirish yoki +998 99 037 33 00 raqamiga qo'ng'iroq qilish kerak. Biz dorixona tarmoqlari, ulgurji yetkazib beruvchilar va mintaqaviy distribyutorlardan takliflarni ko'rib chiqamiz.",
    "faq.question3": "FARMALECH mahsulotlari xalqaro standartlarga muvofiqligi?",
    "faq.answer3": "Ha, bizning barcha preparatlarimiz GMP (Good Manufacturing Practice) talablariga muvofiq ishlab chiqariladi va qat'iy sifat nazoratidan o'tadi. Ishlab chiqarish xalqaro standartlar bo'yicha sertifikatlangan.",
    "faq.question4": "FARMALECH mahsulotlari qaysi hududlarda mavjud?",
    "faq.answer4": "Bizning mahsulotlarimiz hamkor dorixonalar va distribyutorlar tarmog'i orqali O'zbekistonning barcha hududlarida mavjud. Shuningdek, biz Markaziy Osiyo davlatlarida ham ishtirokimizni kengaytirishga ishlamoqdamiz.",
    "faq.question5": "FARMALECH texnik yordam beradimi?",
    "faq.answer5": "Ha, biz hamkorlarimizga to'liq texnik yordam beramiz, jumladan xodimlarni o'qitish, marketing materiallarini taqdim etish va mahsulotni targ'ib qilish bo'yicha maslahatlar.",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "ru" || savedLanguage === "uz")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
