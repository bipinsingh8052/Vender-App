import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';


export default function Navbar() {
  return (
 <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'black',
        borderRadius: 30,
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 20,
        position: 'absolute',
        bottom: 20,
        left: 0,
        zIndex:99,
        right: 0,
        alignSelf: 'center',
      }}
    >
      <TouchableOpacity>
        <Feather name="home" size={21} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="apps" size={21} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          borderRadius: 50,
          padding: 10,
        }}
      >
        <Feather name="plus" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="archive" size={21} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="headphones" size={21} color="white" />
      </TouchableOpacity>
    </View>
  )
}
