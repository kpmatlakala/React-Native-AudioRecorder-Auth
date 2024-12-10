import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
// import { AuthContext } from "@/context/AuthContext";
import { RecordingsContext } from "@/context/RecordingsContext";
import Icons from "@/components/Icons";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { recordings } = useContext(RecordingsContext);
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎙️ Audio Recording App</Text>
        {user ? (
          <Text style={styles.welcome}>Welcome, {user.username}!</Text>
        ) : (
          <Text style={styles.prompt}>
            <Link href="/(auth)/login" style={styles.link}>Login</Link> or{" "}
            <Link href="/(auth)/register" style={styles.link}>Register</Link> to access all features.
          </Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/(app)/recordings/record")}
        >
          <Icons name="microphone" size={40} color="white" />
          <Text style={styles.actionText}>Record</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/(app)/recordings/index")}
        >
          <Icons name="music" size={40} color="white" />
          <Text style={styles.actionText}>My Recordings</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Recordings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Recordings</Text>
        {recordings.length > 0 ? (
          recordings.slice(0, 3).map((rec) => (
            <TouchableOpacity
              key={rec.id}
              onPress={() => router.push(`/playback/${rec.id}`)}
              style={styles.recordingItem}
            >
              <View>
                <Text style={styles.recordingName}>{rec.name}</Text>
                <Text style={styles.recordingTime}>
                  Recorded @{" "}
                  {new Date(rec.id).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <Text style={styles.recordingDuration}>{rec.duration}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRecordings}>No recordings yet!</Text>
        )}
      </View>

      {/* Navigation Links */}
      {user && (
        <View style={styles.navLinks}>
          <Link href="/(app)/profile" style={styles.link}>
            View Profile
          </Link>
          <Link href="/(app)/settings" style={styles.link}>
            App Settings
          </Link>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  welcome: {
    fontSize: 18,
    color: "#666",
  },
  prompt: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    marginTop: 8,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recordingItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recordingName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recordingTime: {
    fontSize: 14,
    color: "#666",
  },
  recordingDuration: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  noRecordings: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  navLinks: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
