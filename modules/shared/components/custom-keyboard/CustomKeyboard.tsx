import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const englishLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ["Space"],
];

// Hindi keyboard layout
const hindiLayout = [
  ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ"],
  ["ऑ", "अं", "अः", "क", "ख", "ग", "घ", "च", "छ"],
  ["ज", "झ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ"],
  ["द", "ध", "न", "प", "फ", "ब", "भ", "म", "Backspace"],
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
  const [keyboardLayout, setKeyboardLayout] =
    useState<string[][]>(englishLayout);
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

  const handleKeyPress = (key: string) => {
    if (key === "Backspace") {
      onKeyPress(key);
    } else if (key === "Space") {
      onKeyPress(" ");
      setIsNewWord(true);
    } else {
      if (isNewWord) {
        onKeyPress(key.toUpperCase());
        setIsNewWord(false);
      } else {
        onKeyPress(key.toLowerCase());
      }
    }
  };

  return (
    <View style={styles.keyboard}>
      {keyboardLayout.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
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
              <Text style={styles.keyText}>
                {key === "Backspace" ? "⌫" : key === "Space" ? "⎵" : key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    backgroundColor: "#d5d6e0",
    padding: 5,
    // alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  key: {
    backgroundColor: "#ffffff",
    paddingVertical: 5,
    paddingHorizontal: 12,
    margin: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: {
    color: "#333",
    fontSize: 24,
  },
  backspaceKey: {
    backgroundColor: "#c0c4eb",
    width: 70,
  },
  spaceKey: {
    backgroundColor: "#ffffff",
    width: 160,
  },
});

export default CustomKeyboard;
