// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useSession } from '@/context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { SignIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleLogin = () => {
    if (!email || !password) 
    {
      alert('All fields are required');
      return;
    }

    SignIn(email, password).then(() => router.push('/(app)/(recorder)'));
  };

  return (
    <View style={styles.container}>

      <View style={{position:"absolute", top:0, height: 26, flexDirection: "row",justifyContent:"space-between", width:"100%", padding: 36}}>
        <Pressable onPress={()=> router.push("/")}>
          <Text style={{color:"whitesmoke"}}>↩</Text>
        </Pressable>
        <Text style={{ color:"#3a86ff", fontWeight:600 }}>Skip</Text>
      </View>      

      <View style={styles.header}>
        <Text style={styles.logo}>🎙️</Text>
        <Text style={styles.logotitle}>Audio Recorder</Text>
      </View>

      <Text style={styles.title}>Welcome Back! </Text>
      <Text style={styles.subtitle}>
        Sign in to your account and start recording your next masterpiece. We’re excited to hear what you create!
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
      <Text style={styles.forgotPassword}>Forgot Password</Text>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Text style={{ color: "white" }}>
        Don't have an account?{" "}
        <Link href={"/(auth)/register"}>Signup</Link>
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
    fontSize: 28,
    color: 'lightgrey',
  },
  title: {
    fontSize: 18,
    color: 'lightgrey',
    fontWeight:700,
    textDecorationLine:"underline"
  },
  subtitle: {
    fontSize: 12,
    color: 'lightgrey',
    width:"100%",
    paddingHorizontal: 64,
    textAlign:"center"
  },
  input: {
    width: '80%',
    padding: 8,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  forgotPassword:{
    width:"100%",
    paddingHorizontal: "11%",
    color:"#3a86ff",
    textAlign:"right"
  },
  button: {
    width:"80%",
    backgroundColor: '#FF004D',
    padding: 8,
    borderRadius: 4,
    margin: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign:"center",
    fontWeight: 700
  },
  signup:{
    fontWeight: 700,
    color:"#3a86ff",
  }
});
