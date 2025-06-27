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

export default function TaxForm() {
  const { id, country, state, type, rate } = useLocalSearchParams(); // Destructure parameters directly
  const navigation = useNavigation();

  const isEdit = !!id; // Check if we are in edit mode

  const [formData, setFormData] = useState({
    country: country || '',
    state: state || '',
    type: type || '',
    amount: rate ? String(rate) : '' // Convert rate to string for input
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const { country, state, type, amount } = formData;

    if (!country || !state || !type || !amount) {
      Alert.alert("All fields are required");
      return;
    }

    const payload = {
      country,
      state,
      type,
      rate: parseFloat(amount),
    };

    try {
      if (isEdit) {
        let res=await axios.patch(`${BASE_URL}/vendor/taxrule/${id}`, payload);
       ToastAndroid.showWithGravity(
  'Updated completed!',
  ToastAndroid.SHORT,
  ToastAndroid.CENTER // or ToastAndroid.TOP / BOTTOM
);
      } else {
        let res=await axios.post(`${BASE_URL}/vendor/taxrule`, payload);
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
          {isEdit ? "Edit Tax Rule" : "Add Tax Rule"}
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
            value={formData.country}
            onChangeText={(text) => handleChange('country', text)}
            style={{
              borderWidth: 1, borderColor: '#ccc',
              borderRadius: 6, padding: 12, marginBottom: 16,
            }}
          />

          {/* Amount Input */}
          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Amount</Text>
          <TextInput
            placeholder="e.g. 50"
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={(text) => handleChange('amount', text)}
            style={{
              borderWidth: 1, borderColor: '#ccc',
              borderRadius: 6, padding: 12, marginBottom: 16,
            }}
          />

          {/* State Input */}
          <Text style={{ marginBottom: 6, fontWeight: '600' }}>State</Text>
          <TextInput
            placeholder="e.g. Uttar Pradesh"
            value={formData.state}
            onChangeText={(text) => handleChange('state', text)}
            style={{
              borderWidth: 1, borderColor: '#ccc',
              borderRadius: 6, padding: 12, marginBottom: 16,
            }}
          />

          {/* Tax Type Input */}
          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Tax Type</Text>
          <TextInput
            placeholder="e.g. VAT"
            value={formData.type}
            onChangeText={(text) => handleChange('type', text)}
            style={{
              borderWidth: 1, borderColor: '#ccc',
              borderRadius: 6, padding: 12, marginBottom: 16,
            }}
          />
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
              {isEdit ? "Update Tax" : "Add Tax"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    <Toast/>
    </>
  );
}
