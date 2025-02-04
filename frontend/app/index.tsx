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
        <Text style={styles.logotitle}>Audio Recorder</Text>
      </View>

      <Text style={styles.title}>Welcome Back! </Text>
      <Text style={styles.subtitle}>
        Sign in to your account and start recording your next masterpiece. We’re excited to hear what you create!
      </Text>

      <View style={styles.content}>
        <Pressable
          style={styles.button}
          onPress={() => SignIn().then(() => router.push("/(app)/(recorder)"))}>
          <Text style={styles.buttonText}>Continue as Guest</Text>
        </Pressable>

        <Pressable
          style={styles.loginbutton}
          onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>      

      <Text style={{color: "white"}}>Don't have an account?
        <Text style={styles.signup} onPress={() => router.push("/(auth)/register")}>
          Signup
        </Text>  
      </Text>

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
  logotitle: {
    fontSize: 32,
    color: 'lightgrey',
  },
  content:{
    flexDirection:"row",
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 21,
    color: 'lightgrey',
  },
  subtitle: {
    fontSize: 12,
    color: 'lightgrey',
    width:"100%",
    paddingHorizontal: 64,
    marginBottom: 16,
    textAlign:"center"
  },
  button: {
    marginHorizontal: 8,
    marginBottom: 32,
    backgroundColor: '#3a86ff',
    padding: 8,
    borderRadius: 4,
  },
  loginbutton: {
    marginHorizontal: 8,
    marginBottom: 32,
    backgroundColor: '#FF004D',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 18,
  },
  signup: {
    fontSize: 16,
    color: '#3a86ff',
    fontWeight: 600,

  }
});