// utils/loadRecordings.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';



// Helper function to load recordings by ID from AsyncStorage
export const loadRecordingById = async (id) => {
  try {
    let savedRecordings = [];

    // Platform-specific storage
    if (Platform.OS === "web") {
      const savedData = localStorage.getItem("recordings");
      if (savedData) {
        savedRecordings = JSON.parse(savedData);
      }
    } else {
      // For mobile: AsyncStorage
      const recordingsJson = await AsyncStorage.getItem("recordings");
      if (recordingsJson) {
        savedRecordings = JSON.parse(recordingsJson);
      }
    }

    // Find the recording by id
    const recording = savedRecordings.find((rec) => rec.id.toString() === id.toString());

    if (!recording) {
      throw new Error("Recording not found");
    }

    return recording;
  } catch (error) {
    console.error("Error loading recording by ID:", error);
    return null; // Return null if an error occurs or if the recording is not found
  }
};

// Helper function to load saved recordings
export const loadRecordings = async () => {
  try {
    let savedRecordings = [];

    if (Platform.OS === "web") {
      // Web: Using localStorage
      const savedData = localStorage.getItem("recordings");
      if (savedData) {
        savedRecordings = JSON.parse(savedData); // Parse the saved JSON string to an array
      }
    } else {
      // Mobile: Using AsyncStorage
      const recordingsJson = await AsyncStorage.getItem("recordings");

      if (recordingsJson) {
        savedRecordings = JSON.parse(recordingsJson);
      }
    }

    return savedRecordings; // Return the loaded recordings
  } catch (error) {
    console.error("Error loading recordings:", error);
    return []; // Return empty array if an error occurs
  }
};

// Check if a file exists on the file system
export const checkFileExistence = async (uri, retries = 3) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
      return true;
    }
    throw new Error(`File not found at ${uri}`);
  } catch (error) {
    if (retries > 0) {
      console.warn(`File not found at ${uri}, retrying... (${retries} left)`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      return checkFileExistence(uri, retries - 1); // Retry
    } else {
      console.error(`Error checking file existence for ${uri}:`, error);
      return false;
    }
  }
};

// Helper function to log the recordings with their file existence status
export const logRecordingsWithFileStatus = async () => {
  try {
    // Load recordings from AsyncStorage
    const savedRecordingsJson = await AsyncStorage.getItem('recordings');
    const recordings = savedRecordingsJson ? JSON.parse(savedRecordingsJson) : [];

    // Check each recording for its file existence
    for (const recording of recordings) 
    {
      const fileExists = await checkFileExistence(recording.uri);

      console.log(`Recording ID: ${recording.id}`);
      console.log(`Recording URI: ${recording.uri}`);
      console.log(`File Exists: ${fileExists ? 'Yes' : 'No'}`);
    }
  } 
  catch (error) {
    console.error('Error logging recordings with file status:', error);
  }
};

// Function to delete a recording by its ID
export const deleteRecordingById = async (id) => {
  try {
    // Retrieve the existing list of recordings from AsyncStorage
    const storedRecordings = await AsyncStorage.getItem('recordings');
    const recordingsList = storedRecordings ? JSON.parse(storedRecordings) : [];
    console.log(id, "to delete: ", recordingsList);

    let recordingFound = false; // Flag to check if the recording was found
    const updatedRecordingsList = []; // New list to store recordings that are not deleted

    for (const recording of recordingsList) {
      console.log("check for: ", id);

      if (recording.id === id) {
        // If we found the recording to delete
        console.log("found");

        recordingFound = true;

        // Ensure the URI is available
        if (recording.uri) {
          // Check if the file exists before deleting
          const fileExists = await checkFileExistence(recording.uri);
          
          if (fileExists) {
            // Delete the file from the file system using the URI
            await FileSystem.deleteAsync(recording.uri);
            console.log('File deleted from file system:', recording.uri);
          } else {
            console.error("File not found at URI:", recording.uri);
          }
        } else {
          console.error("Recording URI is missing");
        }
        // Skip adding this recording to the new list since it's deleted
      } else {
        // Push the non-matching recordings into the updated list
        updatedRecordingsList.push(recording);
      }
    }

    // If no recording was found with the matching ID
    if (!recordingFound) {
      console.error("Recording not found");
      return false;
    }

    console.log("updatedList after deletion: ", updatedRecordingsList);

    // Save the updated list back to AsyncStorage
    await AsyncStorage.setItem('recordings', JSON.stringify(updatedRecordingsList));

    // Ensure UI is updated after deletion
    setRecordings(updatedRecordingsList);

    return true; // Return true on success

  } catch (error) {
    console.error("Error deleting recording:", error);
    return false; // Return false if an error occurs
  }
};

