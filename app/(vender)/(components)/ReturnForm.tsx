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
import { Picker } from '@react-native-picker/picker';

export default function ReturnForm() {
  const { id, status, reason } = useLocalSearchParams();
  const navigation = useNavigation();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    reason: reason || '',
    status: status || '',
  });

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const { reason, status } = formData;

    if (!reason.trim() || !status) {
      Alert.alert('All fields are required');
      return;
    }

    const payload = { reason, status };

    try {
      if (isEdit) {
        await axios.patch(`${BASE_URL}/vendor/return/${id}`, payload);
        ToastAndroid.showWithGravity('Updated successfully!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else {
        await axios.post(`${BASE_URL}/vendor/return`, payload);
        ToastAndroid.showWithGravity('Refund added successfully!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      ToastAndroid.showWithGravity('Server Error!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginTop: 20 }}>
      {/* Header */}
      <View
        style={{
          height: 60,
          backgroundColor: '#d32f2f',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          {isEdit ? 'Edit Return' : 'Add Return'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 8,
            elevation: 3,
          }}
        >
          {/* Reason Input */}
          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Reason</Text>
          <TextInput
            placeholder="Enter refund reason"
            value={formData.reason}
            onChangeText={(text) => handleChange('reason', text)}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 6,
              padding: 12,
              marginBottom: 16,
            }}
          />

          {/* Status Picker */}
          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Status</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 6,
              marginBottom: 16,
            }}
          >
            <Picker
              selectedValue={formData.status}
              onValueChange={(value) => handleChange('status', value)}
            >
              <Picker.Item label="Select Status" value="" />
              <Picker.Item label="Pending" value="pending" />
              <Picker.Item label="Completed" value="completed" />
              <Picker.Item label="Processing" value="processing" />
              <Picker.Item label="re-solved" value="re-solved" />
            </Picker>
          </View>
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
              {isEdit ? 'Update Return' : 'Add Return'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}
