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
            
            <Pressable style={styles.buttonGoogle}>
                <Text style={styles.buttonGoogleText}>Continue with Google</Text>
            </Pressable>

            {/* <Text style={styles.title}>Register</Text> */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}        
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>
            <View style={styles.loginContainer}>
                <Text style={styles.infoText}>Already have an account?</Text>
                <Pressable onPress={() => console.log("Attempt  Login-Navigation")}>
                <Link href="/login"
                style={styles.linkText}>Login here</Link>
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
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    elevation: 1,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'wheat',
    marginBottom: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    // color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonGoogle:{
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom: 20,
    elevation: 3,
  },
  buttonGoogleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  infoText: {
    color: '#333',
  },
  linkText: {
    color: 'lightblue',
    fontWeight: 'bold',
  },
});
