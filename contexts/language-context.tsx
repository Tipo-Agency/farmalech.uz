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
      "FARMALECH — это динамично развивающаяся фармацевтическая компания, миссия которой — обеспечение населения доступными и эффективными лекарственными средствами. Мы используем передовые технологии и строгие стандарты качества на всех этапах производства.",
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
