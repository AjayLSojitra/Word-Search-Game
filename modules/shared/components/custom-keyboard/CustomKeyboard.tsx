import TouchableScale from "@design-system/components/shared/touchable-scale";
import { DeviceType, deviceType } from "expo-device";
import React, { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";

const layouts: { [key: string]: string[][] } = {
  English: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "Backspace"],
    ["Space"],
  ],
  Hindi: [
    ["ा", "ि", "ी", "ु", "ू", "े", "ै", "ो", "ौ", "ं"],
    ["अ", "आ", "इ", "उ", "ए", "ऑ", "अं", "़", "्", "ॉ"],
    ["क", "ख", "ग", "घ", "च", "छ", "ज", "झ", "ट", "ठ"],
    ["ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ"],
    ["ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स"],
    ["ह", "क्ष", "ज्ञ", "Space", "Backspace"],
  ],
  Chinese: [
    ["阿", "比", "西", "的", "伊", "艾", "吉", "哈", "杰", "开"],
    ["域", "拉", "际", "年", "空", "门", "天", "界", "光", "辰"],
    ["宇", "星", "尔", "姆", "娜", "哦", "屁", "提", "优"],
    ["维", "达", "Space", "克", "瓜", "Backspace"],
  ],
  Spanish: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["Ç", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
    ["Á", "É", "Í", "Ó", "Ú", "Space"],
  ],
  Italian: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "Backspace"],
    ["Space"],
  ],
  Portuguese: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
    ["Í", "Z", "X", "C", "V", "B", "N", "M", "Á", "É"],
    ["Ó", "Ú", "À", "Ê", "Õ", "Ô", "Í", "Ã", "Backspace"],
    ["Space"],
  ],
  Russian: [
    ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З"],
    ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж"],
    ["Э", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю"],
    ["Ё", "Ъ", "Space", "Backspace"],
  ],
  French: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "É"],
    ["Z", "X", "C", "V", "B", "N", "M", "Ç", "À", "Ê"],
    ["Space", "Backspace"],
  ],
  German: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö"],
    ["Z", "X", "C", "V", "B", "N", "M", "Ä", "Ü", "ß"],
    ["Space", "Backspace"],
  ],
  Urdu: [
    ["ا", "ب", "پ", "ت", "ٹ", "ج", "چ", "ح", "خ", "د"],
    ["ڈ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع"],
    ["غ", "ف", "ق", "ک", "گ", "ل", "م", "ن", "Backspace"],
    ["و", "ہ", "ء", "ی", "یٔ", "Space"],
  ],
};

interface CustomKeyboardProps {
  onKeyPress: (key: string) => void;
}

const CustomKeyboard: React.FC<CustomKeyboardProps> = ({ onKeyPress }) => {
  const currentLanguage = global?.currentSelectedLanguage ?? "English";
  const [keyboardLayout] = useState<string[][]>(
    layouts[currentLanguage] || layouts.English
  );
  const [isNewWord, setIsNewWord] = useState(true);
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  const getSpaceKeyText = (currentLanguage: string) => {
    switch (currentLanguage) {
      case "English":
        return "Space"; // Space in Hindi
      case "Hindi":
        return "अंतरिक्ष"; // Space in Hindi
      case "Chinese":
        return "空间"; // Space in Chinese
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
  const handleKeyPress = (key) => {
    if (key === "Backspace") {
      onKeyPress(key); // Call backspace function
    } else if (key === "Space") {
      onKeyPress(" "); // Add space to input
      setIsNewWord(true); // After space, treat it as a new word if needed
    } else {
      if (isNewWord) {
        onKeyPress(key); // Add key press to the input
      }
    }
  };

  const { width: screenWidth } = useWindowDimensions();
  const keyWidth = (screenWidth - 58) / 10;
  return (
    <View
      style={{
        padding: isPhoneDevice ? 10 : 15,
        backgroundColor: "#d5d6e0", // Light background for the keyboard
        marginTop: isPhoneDevice ? 20 : 30,
      }}
    >
      {keyboardLayout.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flexDirection: "row", // Arrange keys horizontally
            justifyContent: "center", // Center keys in the row
            marginBottom: isPhoneDevice ? 2 : 3, // Space between rows
          }}
        >
          {row.map((key) => (
            <TouchableScale
              key={key}
              onPress={() => handleKeyPress(key)}
              style={[
                {
                  height: isPhoneDevice ? 45 : 69, // Height of each key
                  backgroundColor: "#ffffff", // White background for keys
                  justifyContent: "center",
                  alignItems: "center",
                  margin: isPhoneDevice ? 2 : 3, // Space between keys
                  borderRadius: 8, // Rounded corners for keys
                },
                {
                  width:
                    key === "Space" ? (isPhoneDevice ? 170 : 255) : keyWidth,
                },
                key === "Backspace"
                  ? {
                      backgroundColor: "#babadb", // A different color for backspace key
                      width: isPhoneDevice ? 50 : 75,
                    }
                  : key === "Space"
                  ? {
                      width: isPhoneDevice ? 170 : 255, // Make space key wider
                      backgroundColor: "#ffffff", // A different color for the space key
                    }
                  : {},
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: isPhoneDevice ? 22 : 33, // Font size for the key text
                    color: "#333", // Dark color for text
                  },
                  key === "Space"
                    ? {
                        fontSize: isPhoneDevice ? 14 : 21, // Customize space key text style (if different from normal keys)
                      }
                    : {}, // Apply different style for space key
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

export default CustomKeyboard;
