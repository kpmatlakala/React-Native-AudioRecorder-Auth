// app/logout.tsx

import { View, Text, Pressable } from 'react-native'
import React from 'react'

const logout = () => {
  return (
    <View>
      <Text>Are you sure you want to logout?</Text>
      <Pressable>Yes</Pressable>
      <Pressable>No</Pressable>
    </View>
  )
}

export default logout