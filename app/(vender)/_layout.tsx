import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack  screenOptions={{
        headerShown: false,  // Hides the header for all screens
      }}>
        <Stack.Screen name='index' />
    </Stack>
  )
}
