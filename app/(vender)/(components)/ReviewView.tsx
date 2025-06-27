import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, ScrollView, Alert,
  ToastAndroid
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
// import { BASE_URL } from './Config';
import Toast from 'react-native-toast-message';
import { BASE_URL } from './Config';
import Loader from './Loader';

export default function TaxView() {
    const {id}=useLocalSearchParams();
    const [data,setdata]=useState({});
    const[load,setload]=useState(true)
    // console.log(id,"id")
  const navigation = useNavigation();
  


  const reload=async()=>{
    setload(true)
    const api=`${BASE_URL}/vendor/review/${id}`
    try {
        let res= await  axios.get(api);
        console.log(res.data[0])
        setdata(res.data[0])
        setload(false)
    } catch (error) {
        console.log(error)
        setload(false)
    }
  }
useEffect(()=>{
    reload()
},[])



 

  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginTop: 20 }}>
      {/* Header */}
      <View style={{
        height: 60, backgroundColor: '#d32f2f',
        flexDirection: 'row', alignItems: 'center',
       
        justifyContent: 'space-between', paddingHorizontal: 10
      }}>
        <TouchableOpacity 
        onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Review Detail
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {
        load?<View style={{flex:1, justifyContent:"center", alignContent:"center"}}>
            <Loader loading={load}/>
        </View>:<ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 8,
          elevation: 3,
          gap:30
        }}>
          {/* Country Input */}
          <View>
            <Text style={{ marginBottom: 6, fontWeight: '600',  fontSize:20}}>Review Id 
          </Text>
          <Text style={{paddingLeft:80}}>{data?.id} </Text>
          </View>
          
         

          {/* Amount Input */}
          <View>
          <Text style={{ marginBottom: 6, fontWeight: '600', fontSize:20 }}>Comment </Text>
         <Text style={{paddingLeft:80}}> {data?.comment}</Text>
</View>
          {/* State Input */}
          <View>
<Text style={{ marginBottom: 6, fontWeight: '600' }}>Product Id</Text>
<Text style={{paddingLeft:80}}> {data?.productId}</Text>
          </View>
          
          

          {/* Tax Type Input */}
          <View> <Text style={{ marginBottom: 6, fontWeight: '600' }}>Customer Id</Text>
          <Text style={{paddingLeft:80}}>{data?.customerId}</Text>
          </View>
          
          <View> <Text style={{ marginBottom: 6, fontWeight: '600' }}>Rating</Text>
          <Text style={{paddingLeft:80}}>{data?.rating}</Text>
          </View>
        </View>

        {/* Submit Button */}
        <View style={{ marginTop: 32, alignItems: 'center' }}>
                  <TouchableOpacity
                    // onPress={handleSubmit}
                    style={{
                      backgroundColor: '#f44336',
                      paddingVertical: 14,
                      paddingHorizontal: 32,
                      borderRadius: 8,
                    }}
                     onPress={() => navigation.goBack()}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      Go back
                    </Text>
                  </TouchableOpacity>
                </View>
      </ScrollView>
      }
    </SafeAreaView>
    <Toast/>
    </>
  );
}
