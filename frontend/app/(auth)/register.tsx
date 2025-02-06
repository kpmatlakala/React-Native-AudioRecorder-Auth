import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useSession } from '@/context/AuthContext';

export default function SignUpScreen() {
  const { SignUp } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTnCAgreed, setIsTnCAgreed] = useState(false);
  const [isPoPAgreed, setIsPoPAgreed] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      alert('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!isTnCAgreed || !isPoPAgreed) {
      alert('You must agree to the terms and conditions and privacy policy');
      return;
    }

    SignUp(email, password).then(() => router.push('/(app)/(recorder)'));
  };

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 0, height: 26, flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 36 }}>
        <Pressable onPress={() => router.push("/")}>
          <Text style={{ color: 'whitesmoke' }}>↩</Text>
        </Pressable>
        <Text style={{ color: '#3a86ff', fontWeight: 600 }}>Skip</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.logo}>🎙️</Text>
        <Text style={styles.logotitle}>Audio Recorder</Text>
      </View>

      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>
        Sign up and start recording your next masterpiece. We're excited to have you!
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Text style={{ color: 'white' }}>Already have an account?
        <Text style={styles.login} onPress={() => router.push('/login')}> Login</Text>
      </Text>

      <View style={styles.checkboxContainer}>        
                  
        <Text style={styles.tsNcs}> By registering to this Audio Recorder App, you agree to the 
          <Link href={"/PrivacyPolicyAndTerms"} >
            <Text style={styles.checkboxText}> Terms and Conditions </Text> 
              and the 
            <Text style={styles.checkboxText}> Privacy Policy </Text>
          </Link> of the app.
        </Text>
        
      </View>
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
    fontSize: 28,
    color: 'lightgrey',
  },
  title: {
    fontSize: 18,
    color: 'lightgrey',
    fontWeight: 700,
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: 12,
    color: 'lightgrey',
    width: '100%',
    paddingHorizontal: 64,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 8,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  checkboxContainer: {
    marginVertical: 16,
    width: '80%',
    alignItems: 'flex-start',
  },
  
  tsNcs: {
    color: 'white',
    textAlign:"center",
    marginTop: 32
  },
  checkboxText: {
    color: '#3a86ff',
    textDecorationLine:"underline",
   },
  button: {
    width: '80%',
    backgroundColor: '#FF004D',
    padding: 8,
    borderRadius: 4,
    margin: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 700,
  },
  login: {
    fontWeight: 700,
    color: '#3a86ff',
  },
});
