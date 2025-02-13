import TouchableScale from "@design-system/components/shared/touchable-scale";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const englishLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ["Space"],
];

// Hindi keyboard layout
const hindiLayout = [
  ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ"],
  ["ऑ", "अं", "अः", "क", "ख", "ग", "घ", "च", "छ", "ज"],
  ["झ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध"],
  ["न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व"],
  ["श", "ष", "स", "ह", "क्ष", "त्र", "Backspace"],
  ["Space"],
];

// Chinese keyboard layout (Simplified)
const chineseLayout = [
  ["你", "我", "他", "她", "是", "的", "在", "了", "不", "有"],
  ["个", "人", "大", "小", "天", "地", "好", "么", "们", "吗"],
  ["上", "下", "左", "右", "中", "一", "二", "三", "四", "Backspace"],
  ["Space"],
];

// Spanish keyboard layout
const spanishLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
  ["z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ["Space"],
];

// Italian keyboard layout
const italianLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ["Space"],
];

// Portuguese keyboard layout
const portugueseLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ç"],
  ["z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ["Space"],
];

// Russian keyboard layout
const russianLayout = [
  ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з"],
  ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж"],
  ["э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю"],
  ["Space"],
];

// French keyboard layout
const frenchLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "z", "e", "r", "t", "y", "u", "i", "o", "l"],
  ["é", "è", "ç", "à", "Backspace"],
  ["Space"],
];

// German keyboard layout
const germanLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
  ["z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ["Space"],
];

// Urdu keyboard layout
const urduLayout = [
  ["ا", "ب", "پ", "ت", "ٹ", "ج", "چ", "ح", "خ", "د"],
  ["ڈ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع"],
  ["غ", "ف", "ق", "ک", "گ", "ل", "م", "ن", "Backspace"],
  ["Space"],
];

interface CustomKeyboardProps {
  onKeyPress: (key: string) => void;
}

const CustomKeyboard: React.FC<CustomKeyboardProps> = ({ onKeyPress }) => {
  const currentLanguage = global?.currentSelectedLanguage ?? "English";
  const [keyboardLayout, setKeyboardLayout] = useState<string[][]>([]);
  const [isNewWord, setIsNewWord] = useState(true);

  useEffect(() => {
    switch (currentLanguage) {
      case "English":
        setKeyboardLayout(englishLayout);
        break;
      case "Hindi":
        setKeyboardLayout(hindiLayout);
        break;
      case "Chinese":
        setKeyboardLayout(chineseLayout);
        break;
      case "Spanish":
        setKeyboardLayout(spanishLayout);
        break;
      case "Italian":
        setKeyboardLayout(italianLayout);
        break;
      case "Portuguese":
        setKeyboardLayout(portugueseLayout);
        break;
      case "Russian":
        setKeyboardLayout(russianLayout);
        break;
      case "French":
        setKeyboardLayout(frenchLayout);
        break;
      case "German":
        setKeyboardLayout(germanLayout);
        break;
      case "Urdu":
        setKeyboardLayout(urduLayout);
        break;
      default:
        setKeyboardLayout(englishLayout);
        break;
    }
  }, [currentLanguage]);

  const getSpaceKeyText = (currentLanguage: string) => {
    switch (currentLanguage) {
      case "English":
        return "English"; // Space in Hindi
      case "Hindi":
        return "हिंदी"; // Space in Hindi
      case "Chinese":
        return "中國人"; // Space in Chinese
      case "Spanish":
        return "Espacio"; // Space in Spanish
      case "French":
        return "Espace"; // Space in French
      case "German":
        return "Leerzeichen"; // Space in German
      case "Italian":
        return "Spazio"; // Space in Italian
      case "Portuguese":
        return "Espaço"; // Space in Portuguese
      case "Russian":
        return "Пробел"; // Space in Russian
      case "Urdu":
        return "مسافت"; // Space in Urdu
    }
  };
  const handleKeyPress = (key: string) => {
    if (key === "Backspace") {
      onKeyPress(key);
    } else if (key === "Space") {
      onKeyPress(" ");
      setIsNewWord(true);
    } else {
      if (isNewWord) {
        onKeyPress(key.toUpperCase());
      }
    }
  };

  return (
    <View style={styles.keyboard}>
      {keyboardLayout.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <TouchableScale
              key={key}
              onPress={() => handleKeyPress(key)}
              style={[
                styles.key,
                key === "Backspace"
                  ? styles.backspaceKey
                  : key === "Space"
                  ? styles.spaceKey
                  : {},
              ]}
            >
               <Text
                style={[
                  styles.keyText,
                  key === "Space" ? styles.spaceKeyText : {}, // Apply different style for space key
                ]}
              >
                {key === "Backspace"
                  ? "⌫"
                  : key === "Space"
                  ? getSpaceKeyText(currentLanguage) // Display space text dynamically based on language
                  : key}
              </Text>
            </TouchableScale>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    padding: 10,
    backgroundColor: "#d5d6e0", // Light background for the keyboard
  },
  row: {
    flexDirection: "row", // Arrange keys horizontally
    justifyContent: "center", // Center keys in the row
    marginBottom: 10, // Space between rows
  },
  key: {
    width: 34, // Width of each key
    height: 50, // Height of each key
    backgroundColor: "#ffffff", // White background for keys
    justifyContent: "center",
    alignItems: "center",
    margin: 2, // Space between keys
    borderRadius: 8, // Rounded corners for keys
  },
  backspaceKey: {
    backgroundColor: "#babadb", // A different color for backspace key
    width: 50,
  },
  spaceKey: {
    width: 170, // Make space key wider
    backgroundColor: "#ffffff", // A different color for the space key
  },
  keyText: {
    fontSize: 22, // Font size for the key text
    color: "#333", // Dark color for text
  },
  spaceKeyText: {
    fontSize: 14, // Customize space key text style (if different from normal keys)
  },
});

export default CustomKeyboard;
