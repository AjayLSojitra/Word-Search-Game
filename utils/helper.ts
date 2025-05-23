export const alphabets = () => {
  const currentLanguage = global?.currentSelectedLanguage ?? "English"; // Fallback to "English" if undefined

  switch (currentLanguage) {
    case "English":
      return [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
    case "Hindi":
      return [
        "क",
        "ख",
        "ग",
        "घ",
        "च",
        "छ",
        "ज",
        "झ",
        "ट",
        "ठ",
        "ड",
        "ढ",
        "ण",
        "त",
        "थ",
        "द",
        "ध",
        "न",
        "प",
        "फ",
        "ब",
        "भ",
        "म",
        "य",
        "र",
        "ल",
        "व",
        "श",
        "ष",
        "स",
        "ह",
        "क्ष",
        "ज्ञ",
      ];
    case "Chinese":
      return [
        "阿",
        "比",
        "西",
        "的",
        "伊",
        "艾",
        "吉",
        "哈",
        "杰",
        "开",
        "尔",
        "姆",
        "娜",
        "哦",
        "屁",
        "提",
        "优",
        "维",
        "达",
        "克",
      ];
    case "Spanish":
      return [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "Ñ",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
    case "Italian":
      return [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
    case "Portuguese":
      return [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "Á",
        "À",
        "Â",
        "É",
        "Ê",
        "Í",
        "Ó",
        "Ô",
        "Ú",
        "Ç",
      ];
    case "Russian":
      return [
        "А",
        "Б",
        "В",
        "Г",
        "Д",
        "Е",
        "Ё",
        "Ж",
        "З",
        "И",
        "Й",
        "К",
        "Л",
        "М",
        "Н",
        "О",
        "П",
        "Р",
        "С",
        "Т",
        "У",
        "Ф",
        "Х",
        "Ц",
        "Ч",
        "Ш",
        "Щ",
        "Ы",
        "Э",
        "Ю",
        "Я",
      ];
    case "French":
      return [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
    case "German":
      return [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "Ä",
        "Ö",
        "Ü",
        "ß",
      ];
    case "Urdu":
      return [
        "ا",
        "ب",
        "پ",
        "ت",
        "ٹ",
        "ث",
        "ج",
        "چ",
        "ح",
        "خ",
        "د",
        "ڈ",
        "ذ",
        "ر",
        "ڑ",
        "ز",
        "ژ",
        "س",
        "ش",
        "ص",
        "ض",
        "ط",
        "ظ",
        "ع",
        "غ",
        "ف",
        "ق",
        "ک",
        "گ",
        "ل",
        "م",
        "ن",
        "ں",
        "و",
        "ہ",
        "ھ",
        "ء",
        "ی",
        "ے",
      ];
  }
};
