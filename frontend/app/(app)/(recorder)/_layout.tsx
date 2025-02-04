import React, { useContext, useState } from "react";
import { FlatList, View, StyleSheet, Text, TextInput } from "react-native";
import { Link, router } from "expo-router";

import { GestureHandlerRootView, Pressable } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Picker } from "@react-native-picker/picker";

import { useSession } from '@/context/AuthContext';
import { RecordingsContext } from "@/context/RecordingContext";
// import Settings from "@/app/settings";

// All Recordings Preview Component
const AllRecordingsPreview = () => {
    const { recordings } = useContext(RecordingsContext);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");  
  
    // Get today's date boundaries
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const todayEnd = todayStart + 24 * 60 * 60 * 1000;
  
    // Filtered recordings based on search query and selected filter
    const filteredRecordings = recordings.filter((item) => {
      const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
  
       // Determine if the recording matches the selected filter
      const matchesFilter = (() => 
        {
          if (selectedFilter === "all") return true;
  
          if (selectedFilter === "today") 
          {
            return item.id >= todayStart && item.id < todayEnd;
          }
  
          if (selectedFilter === "recent") 
          {
            const oneWeekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
            return item.id >= oneWeekAgo && item.id <= now.getTime();
          }
  
          if (selectedFilter === "favorites") 
          {
            return item.isFavorite; // Ensure your recordings have this property
          }
  
          return false;
        })();
  
        return matchesSearchQuery && matchesFilter;
      });

    // console.log("Recordings", recordings);      
  
    return (
      <View style={styles.previewContainer}>
        <View style={styles.previewHeader}>
          <Text style={styles.previewTitle}>📼 Recordings</Text>
  
          <View style={{flexDirection:"row", justifyContent: "space-between", width:"100%"}}>          
            <Picker
              selectedValue={selectedFilter}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedFilter(itemValue)}
            >
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Today" value="today" />
              <Picker.Item label="Recent" value="recent" />
              <Picker.Item label="Favorites" value="favorites" />
              
            </Picker>
  
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search by name" 
              placeholderTextColor="#aaa" 
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
        </View>
  
        {filteredRecordings.length > 0 ? (
          <FlatList
            data={[...filteredRecordings].reverse()} // Display all recordings
            renderItem={({ item }) => (
              <View style={styles.previewItem}>
                <Link href={`/playback/${item.id}`}
                  style={styles.itemLink}
                >
                  <View style={styles.itemLink}>
                    <View>
                      <Text style={styles.recordingName}>{item.name}</Text>
                      <Text style={styles.recordingDT}>
                      {
                        new Date(item.id).toLocaleString("en-GB", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).replace(",", " at")
                      }
                      </Text>
                    </View>
                    <Text style={styles.recordingDuration}>{item.duration}</Text>
                  </View>
                </Link>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.noRecordingsText}>
            No recordings available in storage.
          </Text>
        )}
      </View>
    );
  };
  
  // Main Drawer Layout
  export default function DrawerLayout() 
  {
    const {session, SignOut } = useSession();
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <Drawer
          drawerContent={() => (
            <>            
              <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:"center" }}> 
                <Text style={styles.backLink} onPress={()=> router.push("/")}> ↩ </Text>
                <Text style={{fontSize: 12}}>{ session?.email ? session.email : 'Audio Recorder'}</Text>

                <View style={{width:64, height:64, backgroundColor:"gray", borderRadius: 50, margin:8}}>
                  <Pressable style={{flex:1}} onPress={()=> router.push("/(app)/profile")}>
                    <Text style={{flex:1, textAlign:"center", fontSize:45, fontWeight:600, color:"white"}}>
                      { session?.email ? session.email.charAt(0).toUpperCase() : '🎶'}
                    </Text>
                  </Pressable>                  
                </View> 
              </View>  
  
              <AllRecordingsPreview /> 
  
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Link href="/(app)/settings" style={styles.backLink} > <Text>⚙️ Settings </Text></Link>   
              </View>          
            </>
          )}
  
          screenOptions={{
            headerShown: true, // Show header for better navigation
            title:"🎙️ Audio Recorder"
          }}
        >
          <Drawer.Screen
            name="index"
            options={{ drawerLabel: "🎙️ Audio Recorder" }}
          />
        </Drawer>
      </GestureHandlerRootView>
    );
  }
  
  // Styles
  const styles = StyleSheet.create({
    backLink:{
      padding: 16,
      backgroundColor:"#f9f9f9",
      fontSize: 21
    },
    previewContainer: {
      padding: 16,
      backgroundColor: "lightgrey",
      flex: 1,
    },
    previewHeader: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    previewTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    picker: {
      height: 50, 
      width: 128,
      fontSize: 16, 
      paddingHorizontal: 1, 
      // backgroundColor:"#fff",
    },
    searchInput: {
      flex: 1,
      marginLeft: -12,
      height: 50,
      borderBottomWidth: 1,
      
      borderBottomColor:"#fff",
      paddingHorizontal: 10,
      // backgroundColor: "#fff",
      color: "#333",
    },
    previewItem: {
      padding: 10,
      backgroundColor: "#fff",
      marginBottom: 8,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemLink: {
      display:"flex", 
      flexDirection:"row", 
      justifyContent:"space-between", 
      alignItems:"center",
      width:"100%",  
      padding:2,
    },
    recordingName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    recordingDT:{
      fontSize:12
    },
    recordingDuration: {
      fontSize: 14,
      color: "#666",
    },
    noRecordingsText: {
      fontSize: 16,
      color: "#999",
      textAlign: "center",
      marginTop: 16,
    },
  });