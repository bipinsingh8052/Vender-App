import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, ScrollView, Alert, ToastAndroid
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { BASE_URL } from './Config';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';

export default function CouponForm() {
  const { id, code, description, discount, expiryDate, isActive } = useLocalSearchParams();
  const navigation = useNavigation();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discount: '',
    expiryDate: '',
    isActive: ''
  });

  useEffect(() => {
    if (isEdit) {
      setFormData({
        code: code || '',
        description: description || '',
        discount: discount ? String(discount) : '',
        expiryDate: expiryDate || '',
        isActive: isActive === 'true' || isActive === true ? true : false,
      });
    }
  }, [id]);

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const { code, description, discount, expiryDate, isActive } = formData;

    if (!code || !description || !discount || !expiryDate || isActive === '') {
      Alert.alert('All fields are required');
      return;
    }

    const payload = {
      code: code.trim(),
      description: description.trim(),
      discount: Number(discount),
      expiryDate: expiryDate.trim(),
      isActive: Boolean(isActive),
    };

    try {
      if (isEdit) {
        await axios.patch(`${BASE_URL}/vendor/coupon/${id}`, payload);
        ToastAndroid.showWithGravity('Updated successfully!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else {
        await axios.post(`${BASE_URL}/vendor/coupon`, payload);
        ToastAndroid.showWithGravity('Coupon added successfully!', ToastAndroid.SHORT, ToastAndroid.CENTER);
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
      <View style={{
        height: 60,
        backgroundColor: '#d32f2f',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          {isEdit ? 'Edit Coupon' : 'Add Coupon'}
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
          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Coupon Code</Text>
          <TextInput
            placeholder="Enter code"
            value={formData.code}
            onChangeText={(text) => handleChange('code', text)}
            style={{
              borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
              padding: 12, marginBottom: 16
            }}
          />

          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Description</Text>
          <TextInput
            placeholder="Enter description"
            value={formData.description}
            onChangeText={(text) => handleChange('description', text)}
            style={{
              borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
              padding: 12, marginBottom: 16
            }}
          />

          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Discount</Text>
          <TextInput
            placeholder="e.g. 250"
            value={formData.discount}
            onChangeText={(text) => handleChange('discount', text)}
            keyboardType="numeric"
            style={{
              borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
              padding: 12, marginBottom: 16
            }}
          />

          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Expiry Date</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            value={formData.expiryDate}
            onChangeText={(text) => handleChange('expiryDate', text)}
            style={{
              borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
              padding: 12, marginBottom: 16
            }}
          />

          <Text style={{ marginBottom: 6, fontWeight: '600' }}>Status</Text>
          <View style={{
            borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
            marginBottom: 16
          }}>
            <Picker
              selectedValue={formData.isActive}
              onValueChange={(value) => handleChange('isActive', value)}
            >
              <Picker.Item label="Select Status" value="" />
              <Picker.Item label="Active" value={true} />
              <Picker.Item label="Inactive" value={false} />
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
              {isEdit ? 'Update Coupon' : 'Add Coupon'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}
