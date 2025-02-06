import React, { createContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '@/firebase/config'; // Firebase config

export const RecordingsContext = createContext({
  recordings: [],
  setRecordings: (updatedRecordings: any) => {},
  currentRecording: "",
  setCurrentRecording: (currentRecording: any) => {},
  fetchRecordings: async () => {},
  deleteRecording: (id: string) => {} 
  
});

export default function RecordingProvider({ children })
{
    const [recordings, setRecordings] = useState([]);
    const [currentRecording, setCurrentRecording] = useState("");
    const [audioFormat, setAudioFormat] = useState('m4a');  // Default to M4A    

    useEffect(() => {
        // const fetchRecordings = async () => {
        //   try 
        //   {
        //     const storedRecordings = await loadRecordings();
        //     if (storedRecordings) 
        //     {
        //       setRecordings(storedRecordings);
        //     }
        //   } 
        //   catch (error) { console.error("Error fetching recordings:", error); }
        // };
    
        fetchRecordings();
      }, []);

    const fetchRecordings = async () => {
      try 
      {
        const storedRecordings = await AsyncStorage.getItem('recordings');
        if (storedRecordings) 
        {
          setRecordings(JSON.parse(storedRecordings));
        }
      } 
      catch (error) { console.error('Error loading recordings:', error); }


      // Fetch from Firebase Firestore
      const userId = auth.currentUser?.uid;
      if (userId) 
      {
        const recordingsRef = doc(db, 'recordings', userId);
        const docSnap = await getDoc(recordingsRef);
        if (docSnap.exists()) 
        {
          // Sync Firestore recordings with local
          setRecordings(docSnap.data().recordings);
        }
      }
    };

    // Cloud backup for recording data
    const backupRecordingToCloud = async (recording: any) => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            try 
            {
              const recordingDocRef = doc(db, 'recordings', userId, recording.id);
              await setDoc(recordingDocRef, { ...recording, timestamp: Timestamp.fromMillis(recording.timestamp) });
            } 
            catch (error) { console.error('Error saving recording to cloud:', error); }
        }
    };

    const checkFileExistence = async (uri: string) => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        return fileInfo.exists;
      } catch (error) {
        console.error('Error checking file existence:', error);
        return false;
      }
    };

    const deleteRecording = async (id: string) => {
      try 
      {
        // Create a new array with all recordings except the one to be deleted
        const updatedRecordings:[] = [];
        
         // Use a for loop to manually filter out the recording with the given id
        for (let i = 0; i < recordings.length; i++) 
        {
          if (recordings[i].id == id) 
          {
              console.log(id,"id found")
          }
          else
          {
            updatedRecordings.push(recordings[i]);
          }
        }
 
        console.log("updated Recordings:", updatedRecordings.length, updatedRecordings );
        
        // Update the context state with the new list of recordings
        setRecordings(updatedRecordings);   
        // Save the updated list to AsyncStorage
        await AsyncStorage.setItem('recordings', JSON.stringify(updatedRecordings));

        // Optionally remove from Firestore
        const userId = auth.currentUser?.uid;
        if (userId) 
        {
          const recordingDocRef = doc(db, 'recordings', userId, id);
          await setDoc(recordingDocRef, { deleted: true });
        }
      } 
      catch (error) 
      {
        console.error("Error deleting recording:", error);
        return false;
      }
  };

    return (
        <RecordingsContext.Provider value={{ 
          recordings, setRecordings, 
          currentRecording, setCurrentRecording,
          fetchRecordings, deleteRecording }}>
            {children}
        </RecordingsContext.Provider>
    )

}