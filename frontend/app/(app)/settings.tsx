import React, { useState } from 'react';
import { View, Text, Switch, Pressable, StyleSheet, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [compressionType, setCompressionType] = useState('m4a'); // Default compression type
  const [backupFrequency, setBackupFrequency] = useState('weekly'); // Default backup frequency
  const [storageLimit, setStorageLimit] = useState('50MB'); // Example storage limit
  const [feedback, setFeedback] = useState('');
  
  // Handle notification toggle
  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);

  // Handle dark mode toggle
  const toggleDarkMode = () => setDarkModeEnabled(previousState => !previousState);

  // Handle compression type change
  const handleCompressionChange = (itemValue) => setCompressionType(itemValue);

  // Handle backup frequency change
  const handleBackupFrequencyChange = (itemValue) => setBackupFrequency(itemValue);

  // Handle storage limit change
  const handleStorageLimitChange = (text) => setStorageLimit(text);

  // Handle feedback submission
    const handleFeedbackSubmit = () => {
      if (feedback.trim() === '') {
        Alert.alert('Error', 'Please provide some feedback or report an issue.');
      } else {
        Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
        setFeedback('');
      }
    };;

  // Handle logging out
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel' },
      { text: 'Log out', onPress: () => console.log('Logged out') }
    ]);
  };

  return (
    <View style={styles.container}>  

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
        />
      </View>

      {/* Compression Type */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Compression </Text>
        <Picker
          selectedValue={compressionType}
          style={styles.picker}
          onValueChange={handleCompressionChange}
        >
          <Picker.Item label="m4a" value="m4a" />
          <Picker.Item label="MP3" value="MP3" />
          <Picker.Item label="WAV" value="WAV" />
          <Picker.Item label="AAC" value="AAC" />
        </Picker>
      </View>

      {/* Backup Frequency */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Backup Frequency</Text>
        <Picker
          selectedValue={backupFrequency}
          style={styles.picker}
          onValueChange={handleBackupFrequencyChange}
        >
          <Picker.Item label="Never" value="never" />
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
      </View>

      {/* Storage Limit */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Storage Limit</Text>
        <TextInput
          style={styles.input}
          value={storageLimit}
          onChangeText={handleStorageLimitChange}
          keyboardType="numeric"
        />
      </View>

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

      {/* Log Out */}
      {/* <Pressable style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginLeft: 10,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: 100,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    // backgroundColor: '#4CAF50',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  // buttonText: {
  //   color: 'white',
  //   fontSize: 18,
  // },
  logoutButton: {
    backgroundColor: '#f44336',
  },
});

export default Settings;
