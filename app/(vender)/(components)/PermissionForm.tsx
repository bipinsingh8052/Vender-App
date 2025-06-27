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

export default function PermissionForm() {
  const { id, name } = useLocalSearchParams();
  const navigation = useNavigation();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: name || '',
  });

  // To ensure updated values when navigating back & forth
  useEffect(() => {
    if (name) {
      setFormData({ name });
    }
  }, [name]);

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name } = formData;

    if (!name.trim()) {
      Alert.alert("All fields are required");
      return;
    }

    const payload = { name };

    try {
      if (isEdit) {
        await axios.patch(`${BASE_URL}/vendor/permissions/${id}`, payload);
        ToastAndroid.showWithGravity('Updated successfully!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else {
        await axios.post(`${BASE_URL}/vendor/permissions`, payload);
        ToastAndroid.showWithGravity('Permission added successfully!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      ToastAndroid.showWithGravity('Server Error!', ToastAndroid.SHORT, ToastAndroid.CENTER);
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
            {isEdit ? "Edit Permission" : "Add Permission"}
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
            {/* Permission Name Input */}
            <Text style={{ marginBottom: 6, fontWeight: '600' }}>Permission</Text>
            <TextInput
              placeholder="e.g. Admin:update"
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 6,
                padding: 12,
                marginBottom: 16,
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
                {isEdit ? "Update Permission" : "Add Permission"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Toast />
    </>
  );
}
