import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, ScrollView, Alert,
  ToastAndroid
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { BASE_URL } from './Config';
import Toast from 'react-native-toast-message';

export default function SellingForm() { // Destructure parameters directly
  const navigation = useNavigation();

  const isEdit = !!id; // Check if we are in edit mode

  const [formData, setFormData] = useState({
    unPaid: 'false', // Convert rate to string for input
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const { unPaid } = formData;

    if (!unPaid) {
      Alert.alert("All fields are required");
      return;
    }

    const payload = {unPaid
    };

    try {
      if (isEdit) {
        let res=await axios.patch(`${BASE_URL}/vendor/selling`, payload);
       ToastAndroid.showWithGravity(
  'Updated completed!',
  ToastAndroid.SHORT,
  ToastAndroid.CENTER // or ToastAndroid.TOP / BOTTOM
);
      } else {
        let res=await axios.post(`${BASE_URL}/vendor/selling`, payload);
       ToastAndroid.showWithGravity(
  'Successfully add the data',
  ToastAndroid.SHORT,
  ToastAndroid.CENTER // or ToastAndroid.TOP / BOTTOM
);
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
    ToastAndroid.showWithGravity(
  'server Error!',
  ToastAndroid.SHORT,
  ToastAndroid.CENTER // or ToastAndroid.TOP / BOTTOM
);
    }
  };

  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginTop: 20 }}>
      {/* Header */}
      <View style={{
        height: 60, backgroundColor: '#d32f2f',
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingHorizontal: 10
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          {isEdit ? "Edit Selling Page" : "Add Selling Page"}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 8,
          elevation: 3,
        }}>
          {/* Country Input */}
          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Country</Text>
          <TextInput
            placeholder="e.g. India"
            value={formData.unPaid}
            onChangeText={(text) => handleChange('country', text)}
            style={{
              borderWidth: 1, borderColor: '#ccc',
              borderRadius: 6, padding: 12, marginBottom: 16,
            }}
          />

         

       

          {/* Tax Type Input */}
     
        </View>

        {/* Submit Button */}
        <View style={{ marginTop: 32, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: '#f44336',
              paddingVertical: 14,
              paddingHorizontal: 32,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              {isEdit ? "Update Selling" : "Add Selling"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    <Toast/>
    </>
  );
}
