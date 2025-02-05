/recordings
  /{userId}
    /{recordingId}
      - fileName
      - uri
      - timestamp

/////////////////////

import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '@/firebase/config'; // Firebase config
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RecordingsContext = createContext({
  recordings: [],
  setRecordings: (updatedRecordings: any) => {},
  currentRecording: '',
  setCurrentRecording: (currentRecording: any) => {},
  fetchRecordings: async () => {},
  deleteRecording: (id: string) => {},
});

export function useRecordings() {
  const context = useContext(RecordingsContext);
  if (!context) {
    throw new Error('useRecordings must be used within a RecordingProvider');
  }
  return context;
}

export default function RecordingProvider({ children }) {
    const [recordings, setRecordings] = useState([]);
    const [currentRecording, setCurrentRecording] = useState('');

    // Cloud backup for recording data
    const backupRecordingToCloud = async (recording: any) => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            try {
                const recordingDocRef = doc(db, 'recordings', userId, recording.id);
                await setDoc(recordingDocRef, { ...recording, timestamp: Timestamp.fromMillis(recording.timestamp) });
            } catch (error) {
                console.error('Error saving recording to cloud:', error);
            }
        }
    };

    // Fetch recordings from AsyncStorage and cloud
    const fetchRecordings = async () => {
        try {
            const storedRecordings = await AsyncStorage.getItem('recordings');
            if (storedRecordings) {
                setRecordings(JSON.parse(storedRecordings));
            }
        } catch (error) {
            console.error('Error loading recordings:', error);
        }

        // Fetch from Firebase Firestore
        const userId = auth.currentUser?.uid;
        if (userId) {
            const recordingsRef = doc(db, 'recordings', userId);
            const docSnap = await getDoc(recordingsRef);
            if (docSnap.exists()) {
                // Sync Firestore recordings with local
                setRecordings(docSnap.data().recordings);
            }
        }
    };

    // Delete a recording
    const deleteRecording = async (id: string) => {
        try {
            const updatedRecordings = recordings.filter((recording) => recording.id !== id);
            setRecordings(updatedRecordings);
            await AsyncStorage.setItem('recordings', JSON.stringify(updatedRecordings));
            // Optionally remove from Firestore
            const userId = auth.currentUser?.uid;
            if (userId) {
                const recordingDocRef = doc(db, 'recordings', userId, id);
                await setDoc(recordingDocRef, { deleted: true });
            }
        } catch (error) {
            console.error('Error deleting recording:', error);
        }
    };

    return (
        <RecordingsContext.Provider value={{
          recordings, setRecordings,
          currentRecording, setCurrentRecording,
          fetchRecordings, deleteRecording
        }}>
            {children}
        </RecordingsContext.Provider>
    );
}
