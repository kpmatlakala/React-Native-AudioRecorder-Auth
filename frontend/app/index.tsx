// LandingPage.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/AuthContext';

export default function LandingPage() {
  const router = useRouter();
  const { SignIn } = useSession();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🎙️</Text>
        <Text style={styles.title}>Audio Recorder</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => SignIn().then(() => router.push('/(app)'))}>
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logo: {
    fontSize: 86,
  },
  title: {
    fontSize: 28,
    color: 'lightgrey',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#FF004D',
    padding: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});