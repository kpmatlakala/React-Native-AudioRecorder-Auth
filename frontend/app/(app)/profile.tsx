import React, { useState } from 'react';
import { View, Text, Pressable, Image, TextInput, Alert, StyleSheet } from 'react-native';

import { useSession } from '@/context/AuthContext';
import { router } from 'expo-router';

// Dummy user data, replace with actual data fetching logic


const ProfilePage = () => {

  const { session, isLoading } = useSession();
  const [feedback, setFeedback] = useState('');

  const user = {
    email: session?.email,
    profileImage: null, // Set to URL if the user has a profile picture
  };

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    if (feedback.trim() === '') {
      Alert.alert('Error', 'Please provide some feedback or report an issue.');
    } else {
      Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
      setFeedback('');
    }
  };

  // Logout handler
  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing auth tokens)
    Alert.alert('Logged out', 'You have been logged out successfully.');
  };

  // Get user's profile image or use the first letter of email
  const getProfileImage = () => {
    if (user.profileImage) 
    {
      return <Image source={{ uri: user.profileImage }} style={styles.profileImage} />;
    } 
    else {
      const firstLetter = user.email.charAt(0).toUpperCase();
      return (
        <View style={styles.profileImage}>
          <Text style={styles.profileImageText}>{firstLetter}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {getProfileImage()}
        <Text style={styles.email}>{user.email}</Text>
        <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Update</Text>
      </Pressable>
      </View>

      {/* Settings (optional) */}
      

      {/* Settings (optional) */}
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Settings</Text>
      </Pressable>

      {/* Feedback Section */}
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackTitle}>Provide Feedback or Report an Issue:</Text>
        <TextInput
          style={styles.textInput}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Enter your feedback here"
          multiline
        />
        <Pressable style={styles.button} onPress={handleFeedbackSubmit}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </Pressable>
      </View>

      {/* User Privacy Link */}
      <Pressable onPress={() => router.push('/PrivacyPolicyAndTerms')}>
        <Text style={styles.privacyLink}>User Privacy (GDPR/CCPA/POPI)</Text>
      </Pressable>

      {/* Logout Button */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: '16%',
    backgroundColor: '#f9f9f9',
    justifyContent:'space-between',

  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImageText: {
    fontSize: 36,
    color: '#fff',
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  feedbackContainer: {
    marginTop: 20,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 100,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  privacyLink: {
    fontSize: 14,
    color: '#007bff',
    textAlign: 'center',
    marginVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default ProfilePage;
