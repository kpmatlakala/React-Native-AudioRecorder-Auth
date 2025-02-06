import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';

const PrivacyPolicyAndTerms = () => {
  
  const handleContactSupport = () => {
    Alert.alert("Contact Support", "Please contact us at support@rnLesson3.com.");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Effective Date:</Text> [06/02/2025]
        </Text>
        <Text style={styles.text}>
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our Audio Recording App ("App"). By using the App, you agree to the terms outlined in this Privacy Policy.
        </Text>
        
        <Text style={styles.bold}>1. Information We Collect</Text>
        <Text style={styles.text}>- Personal Information: When you create an account or log in, we collect personal details such as your name, email address, and other profile information you provide.</Text>
        <Text style={styles.text}>- Audio Data: We collect the audio recordings that you create using the App, which are stored either locally or in the cloud (if cloud integration is enabled).</Text>
        <Text style={styles.text}>- Device Information: We may collect information about your device, such as operating system, IP address, device model, and app version to enhance performance and user experience.</Text>

        <Text style={styles.bold}>2. How We Use Your Information</Text>
        <Text style={styles.text}>- Authentication: We use your personal information to create and manage your account, provide login access, and authenticate users for secure routes within the app.</Text>
        <Text style={styles.text}>- Voice Recordings: Your audio recordings may be saved locally or uploaded to cloud services (e.g., Google Drive, Dropbox) if you enable cloud backup.</Text>

        <Text style={styles.bold}>3. Cloud Storage and Syncing</Text>
        <Text style={styles.text}>If you choose to enable cloud storage (e.g., Google Drive, Dropbox), your voice recordings will be uploaded and stored in the cloud for backup purposes.</Text>

        <Text style={styles.bold}>4. User Rights and Data Access</Text>
        <Text style={styles.text}>- Accessing Your Data: You can view and update your personal information and voice recordings at any time within the app.</Text>
        <Text style={styles.text}>- Deletion of Data: You can request the deletion of your account and associated data by contacting us.</Text>
        
        <Text style={styles.bold}>5. Security</Text>
        <Text style={styles.text}>We implement industry-standard encryption and security protocols to protect your personal information, voice recordings, and app usage data.</Text>

        <Text style={styles.bold}>6. Privacy Regulations</Text>
        <Text style={styles.text}>We comply with the GDPR, CCPA, and POPI, among other privacy regulations.</Text>

        <Text style={styles.bold}>7. Updates to This Privacy Policy</Text>
        <Text style={styles.text}>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</Text>

        <Text style={styles.bold}>8. Contact Us</Text>
        <Pressable onPress={handleContactSupport}>
          <Text style={styles.link}>Contact Support</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Terms of Use</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Effective Date:</Text> [06/02/2025]
        </Text>

        <Text style={styles.bold}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>By accessing or using the App, you agree to comply with and be bound by these Terms and all applicable laws and regulations.</Text>

        <Text style={styles.bold}>2. Account Creation and Security</Text>
        <Text style={styles.text}>You must create an account to access certain features of the App. You agree to provide accurate, complete, and up-to-date information during registration.</Text>

        <Text style={styles.bold}>3. User Responsibilities</Text>
        <Text style={styles.text}>- You agree not to use the App for illegal purposes or violate any laws or regulations.</Text>
        <Text style={styles.text}>- You agree not to upload, share, or transmit any content that is offensive, illegal, or infringes on others' rights.</Text>

        <Text style={styles.bold}>4. Cloud Storage and Syncing</Text>
        <Text style={styles.text}>The App integrates with third-party cloud storage services (e.g., Google Drive, Dropbox) to back up and sync your voice recordings.</Text>

        <Text style={styles.bold}>5. User Feedback</Text>
        <Text style={styles.text}>By providing feedback or reporting issues within the App, you grant us a non-exclusive, royalty-free license to use and implement your suggestions.</Text>

        <Text style={styles.bold}>6. Privacy and Data Collection</Text>
        <Text style={styles.text}>Your use of the App is governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.</Text>

        <Text style={styles.bold}>7. Termination of Use</Text>
        <Text style={styles.text}>We may suspend or terminate your access to the App if you violate these Terms or engage in conduct that is harmful to other users.</Text>

        <Text style={styles.bold}>8. Limitation of Liability</Text>
        <Text style={styles.text}>We are not liable for any damages arising from your use of the App, including loss of data or recordings.</Text>

        <Text style={styles.bold}>9. Governing Law</Text>
        <Text style={styles.text}>These Terms will be governed by and construed in accordance with the laws of [Your Jurisdiction].</Text>

        <Text style={styles.bold}>10. Contact Us</Text>
        <Pressable onPress={handleContactSupport}>
          <Text style={styles.link}>Contact Support</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom:8,
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginBottom: 32,
    backgroundColor: "lightgrey",
    padding:8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default PrivacyPolicyAndTerms;
