import React, { createContext, useContext, useState } from "react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, any>;
}

const defaultLanguage: Language = {
  code: "en",
  name: "English",
  nativeName: "English",
};

export const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: defaultLanguage,
  setLanguage: () => {},
  translations: {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [translations, setTranslations] = useState(languageData.en);

  const setLanguage = async (lang: Language) => {
    setCurrentLanguage(lang);
    setTranslations(languageData[lang.code] || languageData.en);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Language data
const languageData = {
  en: {
    hero: {
      title: "Empowering Farmers, Connecting Markets",
      description:
        "A smart platform that directly connects farmers with consumers and retailers, ensuring better prices and market access.",
      joinButton: "Join Now",
      learnButton: "Learn More",
    },
    about: {
      title: "About Us",
      description:
        "Kisan Mitra is a revolutionary platform designed to eliminate middlemen and provide farmers with direct access to buyers. Our AI-powered insights help optimize crop pricing and sales.",
      directConnections: {
        title: "Direct Connections",
        description:
          "We bridge the gap between farmers and buyers, ensuring fair trade and better returns.",
      },
      aiInsights: {
        title: "AI-Powered Insights",
        description:
          "Advanced analytics help farmers make informed decisions about pricing and market trends.",
      },
    },
    features: {
      title: "Key Features",
      subtitle: "Everything you need to grow your farming business",
      list: {
        marketAccess: {
          title: "Direct Market Access",
          description: "Sell directly to consumers and retailers.",
        },
        fairPricing: {
          title: "Fair Pricing",
          description: "AI-driven price recommendations.",
        },
        marketInsights: {
          title: "Real-Time Market Insights",
          description: "Get demand and price trends.",
        },
        secureTransactions: {
          title: "Secure Transactions",
          description: "Safe and transparent payments.",
        },
        logistics: {
          title: "Logistics Support",
          description: "Simplified transportation for your produce.",
        },
        aiRecommendations: {
          title: "AI-Powered Crop Recommendations",
          description:
            "Get insights on the best crops to grow based on market demand and soil conditions.",
        },
      },
    },
    nav: {
      home: "Home",
      about: "About Us",
      features: "Features",
      login: "Login",
      signup: "Sign Up",
    },
    footer: {
      about: "About Kisan Mitra",
      aboutText: "Empowering farmers and connecting them with markets.",
      quickLinks: "Quick Links",
      contact: "Contact Us",
      newsletter: "Newsletter",
      newsletterText: "Subscribe for updates and farming tips.",
      subscribe: "Subscribe",
      rights: "© 2023 Kisan Mitra. All rights reserved.",
    },
  },
  hi: {
    hero: {
      title: "किसानों को सशक्त बनाना, बाज़ारों को जोड़ना",
      description:
        "एक स्मार्ट प्लेटफ़ॉर्म जो किसानों को सीधे उपभोक्ताओं और खुदरा विक्रेताओं से जोड़ता है, बेहतर कीमतें और बाज़ार पहुंच सुनिश्चित करता है।",
      joinButton: "अभी जुड़ें",
      learnButton: "और जानें",
    },
    about: {
      title: "हमारे बारे में",
      description:
        "किसान मित्र एक क्रांतिकारी प्लेटफॉर्म है जो बिचौलियों को समाप्त करने और किसानों को खरीदारों तक सीधी पहुंच प्रदान करने के लिए डिज़ाइन किया गया है। हमारी AI-संचालित अंतर्दृष्टि फसल मूल्य निर्धारण और बिक्री को अनुकूलित करने में मदद करती है।",
      directConnections: {
        title: "सीधा संपर्क",
        description:
          "हम किसानों और खरीदारों के बीच की दूरी को कम करते हैं, निष्पक्ष व्यापार और बेहतर रिटर्न सुनिश्चित करते हैं।",
      },
      aiInsights: {
        title: "AI-संचालित अंतर्दृष्टि",
        description:
          "उन्नत विश्लेषण किसानों को मूल्य निर्धारण और बाजार के रुझानों के बारे में सूचित निर्णय लेने में मदद करते हैं।",
      },
    },
    features: {
      title: "मुख्य विशेषताएं",
      subtitle: "आपके कृषि व्यवसाय को बढ़ाने के लिए सब कुछ",
      list: {
        marketAccess: {
          title: "सीधी बाज़ार पहुंच",
          description: "उपभोक्ताओं और खुदरा विक्रेताओं को सीधे बेचें।",
        },
        fairPricing: {
          title: "उचित मूल्य निर्धारण",
          description: "AI-संचालित मूल्य सिफारिशें।",
        },
        marketInsights: {
          title: "रीयल-टाइम मार्केट इनसाइट्स",
          description: "मांग और कीमत के रुझान प्राप्त करें।",
        },
        secureTransactions: {
          title: "सुरक्षित लेनदेन",
          description: "सुरक्षित और पारदर्शी भुगतान।",
        },
        logistics: {
          title: "लॉजिस्टिक्स सहायता",
          description: "आपकी उपज के लिए सरल परिवहन।",
        },
        aiRecommendations: {
          title: "AI-संचालित फसल सिफारिशें",
          description:
            "बाजार की मांग और मिट्टी की स्थिति के आधार पर सर्वोत्तम फसलों के बारे में जानकारी प्राप्त करें।",
        },
      },
    },
  },
};
