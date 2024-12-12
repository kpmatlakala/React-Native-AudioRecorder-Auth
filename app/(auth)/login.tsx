import { useSession } from '@/context/AuthContext';
import Icons from '@/utils/Icons';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';


export default function LoginScreen() {

  const { signIn, session } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    
    console.log("sess", session)
    
  }, [session])

  const handleLogin = () => {
    // Handle the login logic here
    console.log('Logged in with:', email, password);
    signIn();
    router.replace("/")
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.logo}>🎙️</Text> */}
        <Text style={styles.logo}>
          <Icons name="microphone" size={86} color="#FF004D" />
        </Text>
        <Text style={styles.title}>Audio Recorder</Text> 
      </View> 

      <View style={styles.h_btnContainer}>
        <Pressable style={styles.buttonGuest}      
          onPress={() => { router.push("/register"); } }>
          <Link href="/"
              style={styles.buttonGuestText}>Continue as Guest
          </Link>
        </Pressable>

        <Pressable style={styles.buttonGoogle}      
          onPress={() => { router.push("/register"); } }>
          <Link href="/register"
            style={styles.buttonGoogleText}>
              <Icons name="google" />
          </Link>
        </Pressable>
      </View>

      <Text style={{color:"grey", fontWeight:"bold"}}>OR</Text>

      <View></View>
      <TextInput placeholderTextColor={"grey"}
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput placeholderTextColor={"grey"}
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <View style={styles.registerContainer}>
        <Text style={styles.infoText}>Don't have an account?</Text>
        <Pressable onPress={() => console.log("Attempt  Register-Navigation")}>
          <Link href={{ pathname:"/register", params: {from: "login", redirectTo: "home"}}}
            style={styles.linkText}> Register Now</Link>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: '#F5F5F5',
    backgroundColor: "black",
  },
  header: {
    display: "flex",
    marginBottom: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 86,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color:"lightgrey",
    // color:"black",

  },  
  // title: {
  //   fontSize: 32,
  //   fontWeight: 'bold',
  //   marginBottom: 40,
  //   color: '#333',
  // },
  h_btnContainer:{ 
    flexDirection:"row", 
    width:"100%",    
    justifyContent: "space-around",
    gap:16
  },
  buttonGuest:{
    width:"64%",
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey', 
    elevation: 3,
  },
  buttonGuestText:
  {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  buttonGoogle:{
    width: 50,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF004D',
    marginBottom: 16,
    elevation: 3,
  },
  buttonGoogleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    width: '92%',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
    // backgroundColor: '#fff',
    fontSize: 16,
    color: '#ccc',
    fontWeight:"semibold",
    borderBottomWidth: 2,
    borderColor: '#ccc',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 1,
  },
  button: {
    width: '90%',
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    marginBottom: 16,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  infoText: {
    color: 'lightgrey',
  },
  linkText: {
    color: '#FF004D',
    fontWeight: 'bold',
  },
});
