import * as Speech from 'expo-speech';

const speakText = (text, rate, pitch) => {
  try {
    Speech.speak(text, { language: 'zh-CN', rate, pitch });
  } catch (err) {
    console.log(err);
  }
};

export default speakText;
