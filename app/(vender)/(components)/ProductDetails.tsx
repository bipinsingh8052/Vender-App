import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, Image, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { BASE_URL } from '@/app/(vender)/(components)/Config';

export default function ProductDetails() {
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const navigation = useNavigation();

  const loading = async () => {
    try {
      await axios.get(`${BASE_URL}/vendor/product`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loading();
  }, []);

  const pickDefaultImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Required', 'Gallery access needed');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setDefaultImage(result.assets[0].uri);
    }
  };

  const pickProductImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Required', 'Gallery access needed');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map(img => img.uri);
      setProductImages(prev => [...prev, ...uris]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 20 }}>
      {/* Header */}
      <LinearGradient
        colors={['#ED2929', '#D12323', '#D92525', '#C33232']}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 15,
          paddingBottom: 10,
        }}
      >
        <View style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 5,
          paddingHorizontal: 10,
        }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add Product</Text>
          <TouchableOpacity style={{
            backgroundColor: 'white',
            borderRadius: 4,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}>
            <Text style={{ color: '#d32f2f', fontWeight: 'bold' }}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, width: '90%' }}>
          <TouchableOpacity style={{
            paddingHorizontal: 8,
            paddingVertical: 1,
            borderWidth: 1,
            borderColor: '#FF7575',
            borderRadius: 6,
            backgroundColor: '#B81414',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text style={{ color: 'white', fontSize: 10 }}>Standard</Text>
            <Icon name="arrow-drop-down" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{
            paddingHorizontal: 8,
            paddingVertical: 1,
            borderWidth: 1,
            borderColor: '#FF7575',
            borderRadius: 6,
            backgroundColor: '#B81414',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ color: 'white', fontSize: 10 }}>0 Issue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        {/* Name & Description */}
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} placeholder="Product name" maxLength={50} />
          <Text style={styles.count}>0/50</Text>

          <Text style={[styles.label, { marginTop: 15 }]}>Description</Text>
          <TextInput
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Description"
            multiline
            maxLength={500}
          />
          <Text style={styles.count}>0/500</Text>
        </View>

        {/* Price & Stock */}
        <View style={[styles.card, { flexDirection: 'row', gap: 10 }]}>
          <TextInput style={[styles.input, { flex: 1 }]} placeholder="MRP" keyboardType="numeric" />
          <TextInput style={[styles.input, { flex: 1 }]} placeholder="Stock" keyboardType="numeric" />
        </View>

        {/* Default Image */}
        <View style={styles.card}>
          <Text style={styles.label}>Default Image</Text>
          <Text style={{ fontSize: 12, color: '#777' }}>Only one image allowed</Text>
          <TouchableOpacity onPress={pickDefaultImage} style={styles.imageButton}>
            <Entypo name="plus" size={20} color="#d32f2f" />
            <Text style={{ color: '#d32f2f', marginLeft: 5 }}>Add Default Image</Text>
          </TouchableOpacity>
          {defaultImage && (
            <Image
              source={{ uri: defaultImage }}
              style={{ width: 80, height: 80, borderRadius: 6, marginTop: 10 }}
            />
          )}
        </View>

        {/* Product Images */}
        <View style={styles.card}>
          <Text style={styles.label}>Product Images</Text>
          <Text style={{ fontSize: 12, color: '#777' }}>Multiple allowed</Text>
          <TouchableOpacity onPress={pickProductImages} style={styles.imageButton}>
            <Entypo name="plus" size={20} color="#d32f2f" />
            <Text style={{ color: '#d32f2f', marginLeft: 5 }}>Add Gallery Images</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
            {productImages.map((uri, idx) => (
              <Image key={idx} source={{ uri }} style={{ width: 70, height: 70, borderRadius: 6 }} />
            ))}
          </View>
        </View>

        {/* Category & Color */}
        <View style={styles.card}>
          <Text style={styles.label}>Category</Text>
          <TextInput style={styles.input} placeholder="e.g. Shirts" />
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Color</Text>
          <TextInput style={styles.input} placeholder="Red, Blue, etc." />
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: '#d32f2f',
            paddingVertical: 12,
            borderRadius: 24,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  count: {
    fontSize: 10,
    color: '#999',
    textAlign: 'right',
    marginTop: 2,
  },
  imageButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
};
