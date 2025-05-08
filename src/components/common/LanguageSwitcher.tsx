import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
];

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <Select
      value={currentLanguage.code}
      onValueChange={(value) => {
        const selectedLang = languages.find((lang) => lang.code === value);
        if (selectedLang) setLanguage(selectedLang);
      }}
    >
      <SelectTrigger className="w-[220px] bg-transparent">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 flex-shrink-0" />
          <SelectValue placeholder="Select language" className="truncate" />
        </div>
      </SelectTrigger>
      <SelectContent className="min-w-[250px]">
        <SelectGroup>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex justify-center w-full">
                <span className="truncate">{lang.nativeName}</span>
                <span className="text-gray-500 text-sm ml-2 flex-shrink-0">
                  ({lang.name})
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
