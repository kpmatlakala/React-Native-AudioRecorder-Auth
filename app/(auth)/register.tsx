import Icons from '@/utils/Icons';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function RegisterScreen() 
{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const params = useLocalSearchParams();
    console.log(params)
    const [error, setError] = useState(null);

    const handleRegister = () => {
        if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
        }
        // Handle the registration logic here
        console.log('Registered with:', email, password);
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

            <TextInput placeholderTextColor={"grey"}
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}        
                autoCapitalize="none"
            />
            {/* <Text style={styles.title}>Register</Text> */}
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
            <TextInput placeholderTextColor={"grey"}
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />          

            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}> Register </Text>
            </Pressable>
            <Text style={{color:"grey"}}> OR </Text>
            <Pressable style={styles.buttonGoogle}>
                <Text style={styles.buttonGoogleText}> Continue with Google </Text>
            </Pressable>

            <View style={styles.b_linksContainer}>

                <Text style={styles.infoText}>Already have an account? 
                  <Link href="/login"
                    style={styles.linkText}> Login here 
                  </Link>
                </Text>             

                <Text style={styles.tsNcs}>
                  By registering you agree to 
                  <Link href="/TsAndCs"
                    style={styles.tsNcsLink}> Terms & Conditions </Link> and 
                  <Link href="/PoPe"
                     style={styles.tsNcsLink}> Privacy Policy </Link> of the Audio Recorder App
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
    padding: 16,
    // backgroundColor: '#F5F5F5',
    backgroundColor: 'black',
  },
  header: {
    display: "flex",
    marginBottom: 16,
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
  input: {
    width: '92%',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 16,
    // backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    elevation: 1,
  },
  button: {
    width: '86%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff', //blue
    marginVertical: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    // color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonGoogle:{
    width: '86%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF004D', // pink like red
    marginVertical: 8,
    elevation: 3,
  },
  buttonGoogleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  b_linksContainer: {
    flexDirection: 'column',
    alignItems:"center",
    marginTop: 8,
  },
  infoText: {
    color: 'lightgrey',
    flexDirection: "row"
  },
  linkText: {
    color: '#007bff',
    fontWeight: 'bold',

  },
  tsNcs:{color: "grey", textAlign: "center", marginVertical: 16 },
  tsNcsLink:{ color:"#FF004D", fontWeight: "bold" }
});
