import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from './Config';
import Loader from './Loader';
import { useNavigation, useRouter } from 'expo-router';

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // ✅ search state

  const Navigation = useNavigation();
  const Router = useRouter();

  const reload = async () => {
    setLoad(true);
    try {
      const response = await axios.get(`${BASE_URL}/vendor/order`);
      setData(response.data.data);
      setLoad(false);
    } catch (error) {
      setLoad(true);
      console.log(error);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const filteredOrders = data.filter((item) => {
    const statusMatch =
      activeTab === 'ALL' ||
      item?.status?.toLowerCase() === activeTab.toLowerCase();

    const query = searchQuery.toLowerCase();
    const searchMatch =
      item?.title?.toLowerCase().includes(query) ||
      item?.id?.toString().includes(query) ||
      item?.customer?.name?.toLowerCase().includes(query) ||
      item?.customer?.address?.toLowerCase().includes(query) ||
      item?.status?.toLowerCase().includes(query) ||
      item?.netTotal?.toString().includes(query);

    return statusMatch && (!searchQuery || searchMatch);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View
        style={{
          height: 55,
          backgroundColor: '#e53935',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          marginTop: 20,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity onPress={() => Navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} color="white" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
          Order's
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          paddingHorizontal: 12,
          gap: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#f3f3f3',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 8,
            paddingHorizontal: 10,
            height: 40,
          }}
        >
          <AntDesign name="search1" size={16} color="#aaa" />
          <TextInput
            style={{ marginLeft: 8, fontSize: 14, flex: 1, color: '#000' }}
            placeholder="Search order..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            padding: 8,
          }}
        >
          <MaterialIcons name="sort" size={18} color="#e53935" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
          paddingHorizontal: 12,
        }}
      >
        {['ALL', 'Pending', 'Processing', 'Completed'].map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => {
              setActiveTab(label);
              setSearchQuery(''); // ✅ clear search on tab change
            }}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              borderRadius: 20,
              backgroundColor:
                activeTab === label ? '#e53935' : '#f0f0f0',
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: activeTab === label ? '#fff' : '#555',
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      {load ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Loader loading={load} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 12 }}>
          {filteredOrders.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                marginBottom: 14,
                elevation: 2,
                padding: 10,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  Router.push({
                    pathname: '/OrderDetails',
                    params: { id: item?.id },
                  })
                }
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                    backgroundColor: '#DCEAF1',
                    borderRadius: 5,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 13,
                      color: '#444',
                    }}
                  >
                    ID: {item.id}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#8385FF',
                      padding: 4,
                      borderRadius: 2,
                    }}
                  >
                    <AntDesign name="download" size={18} color="white" />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'flex-start',
                  }}
                >
                  <Image
                    source={{
                      uri: item?.image
                        ? item.image
                        : 'https://cdn-icons-png.flaticon.com/512/8136/8136031.png',
                    }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 6,
                      resizeMode: 'contain',
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          fontWeight: '700',
                          fontSize: 14,
                          flex: 1,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          paddingVertical: 2,
                          paddingHorizontal: 8,
                          borderRadius: 14,
                          overflow: 'hidden',
                          backgroundColor:
                            item.status === 'Pending'
                              ? '#fdecea'
                              : item.status === 'Completed'
                              ? '#e2f7e1'
                              : '#fffbe5',
                          color:
                            item.status === 'Pending'
                              ? '#d32f2f'
                              : item.status === 'Completed'
                              ? '#2e7d32'
                              : '#f9a825',
                        }}
                      >
                        {item.status}
                      </Text>
                    </View>

                    <Text style={{ fontSize: 12.5, color: '#444', marginTop: 2 }}>
                      💰 Price : {item.netTotal}
                    </Text>
                    <Text style={{ fontSize: 12.5, color: '#444', marginTop: 2 }}>
                      🔢 Qty : {item.qty ?? 2}
                    </Text>
                    <Text style={{ fontSize: 12.5, color: '#444', marginTop: 2 }}>
                      📏 Size : {item.size ?? 2}
                    </Text>
                    <Text style={{ fontSize: 12.5, color: '#444', marginTop: 2 }}>
                      📍 Address : {item?.customer?.address}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontSize: 12, color: '#777' }}>
                    Order Date :{' '}
                    {new Date(item.createdAt).toLocaleDateString('en-IN')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#1565c0',
                      fontWeight: '500',
                    }}
                  >
                    {item?.customer?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
