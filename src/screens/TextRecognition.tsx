import TextRecognition from '@react-native-ml-kit/text-recognition';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

export default function TextRecognitionScreen() {
  const [textDetected, setTextDetected] = React.useState<string>('');
  async function handleGetImage() {
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
      includeBase64: false,
    });

    return result?.assets?.[0]?.uri;
  }

  async function handleTextRecognition(imageCapturedUri: string) {
    const result = await TextRecognition.recognize(imageCapturedUri);
    setTextDetected(result.text);
  }

  async function handlePress() {
    const imageCaptured = await handleGetImage();
    if (imageCaptured) {
      await handleTextRecognition(imageCaptured);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Try TextRecognition</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Recognized Text:</Text>
      <Text style={styles.textRecognized}>{textDetected}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e202b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#7f0eb7',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginTop: 16,
    fontWeight: 'bold',
  },
  textRecognized: {
    fontSize: 16,
    color: '#fff',
    marginTop: 18,
    fontStyle: 'italic',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
