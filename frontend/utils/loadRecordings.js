import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

// Save updated recordings to AsyncStorage
export const saveRecordingsToStorage = async (recordings) => {
  try {
    await AsyncStorage.setItem('recordings', JSON.stringify(recordings));
    console.log('Recordings saved to AsyncStorage');
  } catch (error) {
    console.error('Error saving recordings to AsyncStorage:', error);
  }
};

// Load recordings from AsyncStorage
export const loadRecordings = async () => {
  try {
    let savedRecordings = [];

    if (Platform.OS === 'web') {
      const savedData = localStorage.getItem('recordings');
      if (savedData) {
        savedRecordings = JSON.parse(savedData);
      }
    } else {
      const recordingsJson = await AsyncStorage.getItem('recordings');
      if (recordingsJson) {
        savedRecordings = JSON.parse(recordingsJson);
      }
    }

    return savedRecordings;
  } catch (error) {
    console.error('Error loading recordings:', error);
    return [];
  }
};

// Check if the file exists in persistent storage
export const checkFileExistence = async (uri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    return fileInfo.exists;
  } catch (error) {
    console.error('Error checking file existence:', error);
    return false;
  }
};

// Handle orphaned files
export const checkForOrphanedFiles = async (storedRecordings) => {
  const updatedRecordings = await Promise.all(
    storedRecordings.map(async (recording) => {
      console.log('orphanCheck: ', recording);

      const persistentUri = getPersistentRecordingPath(recording.name + '.m4a');
      const fileExists = await checkFileExistence(persistentUri);
      console.log('?exist?', fileExists);

      if (!fileExists) {
        console.log(`Removing orphaned recording with ID: ${recording.id}`);
        return null; // Mark this recording for removal
      }
      return recording; // Return the recording if it's not orphaned
    })
  );

  const finalRecordings = updatedRecordings.filter((recording) => recording !== null);
  console.log('finalRecords: ', finalRecordings);
  await saveRecordingsToStorage(finalRecordings);
  return finalRecordings;
};

const getPersistentRecordingPath = (fileName) => {
  return FileSystem.documentDirectory + fileName;
};

// Save recording to persistent location
export const saveRecording = async (recording) => {
  const persistentPath = getPersistentRecordingPath(recording.name + '.m4a');
  try {
    await FileSystem.moveAsync({
      from: recording.uri,
      to: persistentPath,
    });
    console.log(`Recording saved to: ${persistentPath}`);
    return persistentPath; // Return the new persistent path
  } catch (error) {
    console.error('Error saving recording:', error);
    return null;
  }
};

// Log recordings with file status
export const logRecordingsWithFileStatus = async () => {
  try {
    const savedRecordingsJson = await AsyncStorage.getItem('recordings');
    const recordings = savedRecordingsJson ? JSON.parse(savedRecordingsJson) : [];

    for (const recording of recordings) {
      const fileExists = await checkFileExistence(recording.uri);

      console.log(`Recording ID: ${recording.id}`);
      console.log(`Recording URI: ${recording.uri}`);
      console.log(`File Exists: ${fileExists ? 'Yes' : 'No'}`);
    }
  } catch (error) {
    console.error('Error logging recordings with file status:', error);
  }
};

// Delete a recording by its ID
export const deleteRecordingById = async (id) => {
  try {
    const storedRecordings = await AsyncStorage.getItem('recordings');
    const recordingsList = storedRecordings ? JSON.parse(storedRecordings) : [];
    console.log(id, "to delete: ", recordingsList);

    let recordingFound = false;
    const updatedRecordingsList = [];

    for (const recording of recordingsList) {
      console.log("check for: ", id);

      if (recording.id === id) {
        console.log("found");

        recordingFound = true;

        // Ensure URI exists before deletion
        if (recording.uri) {
          const fileExists = await checkFileExistence(recording.uri);
          
          if (fileExists) {
            // Delete the file from file system
            await FileSystem.deleteAsync(recording.uri);
            console.log('File deleted from file system:', recording.uri);
          } else {
            console.error("File not found at URI:", recording.uri);
          }
        } else {
          console.error("Recording URI is missing");
        }
      } else {
        updatedRecordingsList.push(recording);
      }
    }

    if (!recordingFound) {
      console.error("Recording not found");
      return false;
    }

    console.log("updatedList after deletion: ", updatedRecordingsList);

    await AsyncStorage.setItem('recordings', JSON.stringify(updatedRecordingsList));
    setRecordings(updatedRecordingsList); // Update the UI

    return true;
  } catch (error) {
    console.error("Error deleting recording:", error);
    return false;
  }
};
