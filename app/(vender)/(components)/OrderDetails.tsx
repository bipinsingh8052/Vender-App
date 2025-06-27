import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { BASE_URL } from './Config';
import axios from 'axios';
import Loader from './Loader';

export default function OrderDetails() {
  const[data,setdata]=useState({})
  const[orderList,setOrderList]=useState({})
  const[load,setload]=useState(true)
   const { id} = useLocalSearchParams();
  const reload=async()=>{
    setload(true)
    const api=`${BASE_URL}/vendor/order/${id}`;
    try {
      const response=await axios.get(api)
      // console.log(response.data)
      setdata(response.data)
      // console.log(response.data.orderItems[0])
      setOrderList(response.data.orderItems[0])
      setload(false)
    } catch (error) {
      setload(true)
      console.log(error )
    }
  }


  const Navigation = useNavigation();
  useEffect(()=>{
    reload()
  },[])
   
    // console.log(id,"id")
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{
        height: 55,
        backgroundColor: '#e53935',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        marginTop:20
      }}>
        <TouchableOpacity onPress={()=>{ Navigation.goBack()}}>
          <AntDesign name="arrowleft" size={22} color="white" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Order Details</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* Header */}
      {
        load?
        <View style={{flex:1, justifyContent:"center", alignContent:"center"}}>
          <Loader loading={load}/>
        </View>:<ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Order ID */}
        <View style={{
          backgroundColor: '#f7f7f7',
          borderRadius: 6,
          padding: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
          elevation:1
        }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>Order id :</Text>
          <Text style={{ fontSize: 14, color: '#888' }}>{data?.id}</Text>
        </View>

        {/* Image */}
        <View style={{ alignItems: 'center', justifyContent:"center", marginBottom: 16,  flexDirection:"row"}}>
          <Image
           source={{ uri: orderList?.product?.defaultImage ?? 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=' }}

            style={{
              width: 200,
              height: 200,
              borderWidth:1,
              borderRadius: 100,
              resizeMode: 'contain'
            }}
          />
          <TouchableOpacity style={{
            flexDirection: 'row',
            backgroundColor: '#6a1b9a',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 20,
            marginTop: 10,
            position:"absolute",
            top:-10,
            right:0,
            alignItems: 'center'
          }}>
            <MaterialIcons name="file-download" size={16} color="#fff" />
            <Text style={{ color: '#fff', marginLeft: 4 }}>Invoice</Text>
          </TouchableOpacity>
        </View>

        {/* Subheading */}
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Text style={{ textAlign: 'center', color: '#888', marginBottom: 6, fontSize: 10 }}>
          {orderList?.product?.category}
        </Text>
         <Text style={{
            fontSize: 14,
            paddingVertical: 2,
            paddingHorizontal: 8,
            backgroundColor: '#fdecea',
            fontWeight:"700",
            color: '#d32f2f',
            borderRadius: 5
          }}>
            {data.status}
          </Text>
        </View>

        {/* Title + Status */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10
        }}>
          <Text style={{ fontSize: 20, fontWeight: '800', flex: 1 }}>
            {orderList?.product?.name}
          </Text>
         
        </View>

        {/* Product Details */}
        <View style={{
          backgroundColor: '#F8F8F8',
          borderRadius: 8,
          gap:5,
          padding: 10,
          marginBottom: 16
        }}>
            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                      <Text style={{ fontSize: 14, marginBottom: 4, color: '#333' }}>💰 Price : ₹{orderList?.product?.price}</Text>
                        <View style={{ flexDirection: 'row', alignItems:"center", justifyContent:"center", gap:10, marginTop: 4 }}>
                                    <Text style={{ color: '#ffb300', fontWeight: '800', fontSize:15 }}>⭐ 4.5</Text>
                                    <Text style={{ color: '#888', fontSize: 12 }}>{orderList?.product?.stock}  Sold</Text>
                                </View>
            </View>
            <View style={{borderWidth:0.2, borderColor:"#D5B6B6", width:"100%"}}></View>
          <Text style={{ fontSize: 14, marginBottom: 4, color: '#333' }}>📏 Size : 500gram</Text>
            <View style={{borderWidth:0.2, borderColor:"#D5B6B6", width:"100%"}}></View>
          <Text style={{ fontSize: 14, marginBottom: 4, color: '#333' }}>🔢 Qty : {orderList?.product?.quantity ?? 1}</Text>
          
        </View>

        {/* Address */}
        <Text style={{ fontWeight: '700', fontSize: 14, marginBottom: 4 }}>Place Address :</Text>
        <Text style={{ color: '#555', fontSize: 13, marginBottom: 14 }}>
          {data?.customer?.address}  {data?.customer?.city},{data?.customer?.state}
        </Text>

        {/* Order Info */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16,  backgroundColor:"#F8F8F8", paddingHorizontal:10, paddingVertical:10, borderRadius:10, elevation:1 }}>
          <Text style={{ fontWeight: '700', fontSize: 13 }}>
            Order No : <Text style={{ fontWeight: '400', color: '#000' }}>12345667</Text>
          </Text>
          <Text style={{ fontWeight: '700', fontSize: 13 }}>
            Order Id : <Text style={{ fontWeight: '400', color: '#000' }}>12345667</Text>
          </Text>
        </View>

        {/* Description */}
        <Text style={{ fontWeight: '700', fontSize: 14, marginBottom: 4 }}>Description :</Text>
        <Text style={{ color: '#555', fontSize: 13, marginBottom: 100 }}>{orderList?.product?.description} <Text style={{ color: 'blue' }}> See More</Text>
        </Text>
      </ScrollView>
        
        
      }
      

      

      {/* Accept Order Button */}
      <TouchableOpacity style={{
        backgroundColor: '#43a047',
        padding: 14,
        alignItems: 'center'
      }}>
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Accept Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
