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

export default function ComplainForm() {
  const { id,  status,complaint } = useLocalSearchParams(); // Destructure parameters directly
  const navigation = useNavigation();

  const isEdit = !!id; // Check if we are in edit mode

  const [formData, setFormData] = useState({
    complaint: complaint || '',
    status: status || '',
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const { complaint,status } = formData;

    if ( !status || !complaint) {
      Alert.alert("All fields are required");
      return;
    }

    const payload = {
      complaint,
      status
    };

    try {
      if (isEdit) {
        let res=await axios.patch(`${BASE_URL}/vendor/complaint/${id}`, payload);
       ToastAndroid.showWithGravity(
  'Updated completed!',
  ToastAndroid.SHORT,
  ToastAndroid.CENTER // or ToastAndroid.TOP / BOTTOM
);
      } else {
        let res=await axios.post(`${BASE_URL}/vendor/complaint`, payload);
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
          {isEdit ? "Edit Complain" : "Add Complain"}
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
          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Complaint</Text>
          <TextInput
            placeholder="e.g. not deveilery"
            value={formData.complaint}
            onChangeText={(text) => handleChange('complaint', text)}
            style={{
              borderWidth: 1, borderColor: '#ccc',
              borderRadius: 6, padding: 12, marginBottom: 16,
            }}
          />

          {/* Amount Input */}
          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Status</Text>
          <TextInput
            placeholder="e.g. pending"
            value={formData.status}
            onChangeText={(text) => handleChange('status', text)}
            style={{
              borderWidth: 1, borderColor: '#ccc',
              borderRadius: 6, padding: 12, marginBottom: 16,
            }}
          />

          {/* State Input */}
          

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
              {isEdit ? "Update complain" : "Add Complain"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    <Toast/>
    </>
  );
}
