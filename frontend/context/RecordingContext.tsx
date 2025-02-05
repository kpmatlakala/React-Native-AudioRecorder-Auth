import { deleteRecordingById, loadRecordings } from "@/utils/loadRecordings";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react"

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