import { deleteRecordingById, loadRecordings } from "@/utils/loadRecordings";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react"

export const RecordingsContext = createContext({
  recordings: [],
  setRecordings: (updatedRecordings: any) => {},
  currentRecording: "",
  setCurrentRecording: (currentRecording: any) => {},
  deleteRecording: (id: string) => {} 
});

export default function RecordingProvider({ children })
{
    const [recordings, setRecordings] = useState([]);
    const [currentRecording, setCurrentRecording] = useState("");
    const [audioFormat, setAudioFormat] = useState('m4a');  // Default to M4A

    useEffect(() => {
        const fetchRecordings = async () => {
          try 
          {
            const storedRecordings = await loadRecordings();
            if (storedRecordings) 
            {
              setRecordings(storedRecordings);
            }
          } 
          catch (error) { console.error("Error fetching recordings:", error); }
        };
    
        fetchRecordings();
      }, []);

    const checkFileExistence = async (uri) => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        return fileInfo.exists;
      } catch (error) {
        console.error('Error checking file existence:', error);
        return false;
      }
    };

    const deleteRecording = async (id) => {
    try 
    {
      const success = await deleteRecordingById(id); // This function handles file system deletion

      if (success) 
      {
        // Remove the recording from AsyncStorage and state
        const storedRecordings = await loadRecordings();
        const updatedRecordings = storedRecordings.filter((recording) => recording.id !== id);
        await AsyncStorage.setItem('recordings', JSON.stringify(updatedRecordings));
        setRecordings(updatedRecordings); // Update the context state
      }
      
      return success;
    } 
    catch (error) 
    {
      console.error("Error deleting recording:", error);
      return false;
    }
  };

    return (
        <RecordingsContext.Provider value={{ recordings, setRecordings, currentRecording, setCurrentRecording, deleteRecording }}>
            {children}
        </RecordingsContext.Provider>
    )

}