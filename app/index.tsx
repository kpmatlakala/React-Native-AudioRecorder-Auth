import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";

import Icons from "@/utils/Icons";

export default function LandingPage() {  
  const router = useRouter();

  const handleGuestAccess = () => {
    // Navigate as guest (e.g., to the recording page or home page with limited access)
    router.push("/(app)/recordings/index"); // Assuming you want to show limited features as a guest
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Text style={styles.logo}>🎙️</Text> */}
        <Text style={styles.logo}>
          <Icons name="microphone" size={86} color="#FF004D" />
        </Text>
        <Text style={styles.title}>Audio Recorder</Text> 
      </View> 

      <View style={{ padding:32,alignItems: "center", gap: 8 }}>
        <View style={{flexDirection:"row", alignItems:"center",  gap: 4,}}>
          <Pressable style={styles.loginGoogle}
            onPress={() => alert("Sign-in with Google is current unavailable")}>
            <Text style={styles.loginGoogleText}>
              <Icons name="google" size={26} color="black"/>         
            </Text>         
          </Pressable> 
          
          <Pressable style={styles.loginButton}
            onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.loginButtonText}>
              Login         
            </Text> 
            <Text>to access all features.</Text>
          </Pressable> 
        </View>     

        <Text> or  </Text>

        <Pressable style={styles.guestButton}
          onPress={handleGuestAccess}>
          <Text style={styles.guestButtonText}>
            Continue as Guest
          </Text>   
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    padding: 16,
    // backgroundColor: "#f9f9f9",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    marginBottom: -8,
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
  // Button Styles
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%", // Controls button width
  },

  loginGoogle:{
    backgroundColor: "#007bff",
    padding:10, 
    borderRadius: 4,
    // borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
  },
  loginGoogleText:{
    
  },
  // Login Button Style
  loginButton: {
    
    backgroundColor: "#FF004D",
    paddingVertical: 1,
    paddingHorizontal: 40,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "90%", // Full width of container
   
  },
  loginButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  
  // Guest Button Style
  guestButton: {
    backgroundColor: "grey", 
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "86%", // Full width of container
  },
  guestButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },

  // Optional Button Hover Effect (for web-like apps, but not applicable in React Native)
  buttonHover: {
    backgroundColor: "#0056b3", // Darker blue for hover effect
  },
});
