import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { BASE_URL } from './Config';
import axios from 'axios';
import Loader from './Loader';
import Toast from 'react-native-toast-message';



// const data = [
//   { id: '1', title: 'Cosmetics', price: '75', description: 'Add the description of this content' },
//   { id: '2', title: 'Cosmetics', price: '75', description: 'Add the description of this content' },
//   { id: '3', title: 'Cosmetics', price: '75', description: 'Add the description of this content' },
//   { id: '4', title: 'Cosmetics', price: '75', description: 'Add the description of this content' },
// ];




const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 20; // For two columns with padding
export default function ProductPage() {
  const[data,setdata]=useState<any>([]);
  const[load,setload]=useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const Router=useRouter();
  const navigation = useNavigation();


  const loading= async()=>{
    setload(true)
    let api=`${BASE_URL}/vendor/product`;
    try {
      const res=await  axios.get(api);
      // console.log(res.datar
      setdata(res.data.data)
      setload(false)
    } catch (error) {
      setload(true)
      console.log(error)
    }
  }
  useEffect(()=>{
    loading()
  },[])

  const HandleDeleted=async(id)=>{
    let api=`${BASE_URL}/vendor/product/${id}`;

    console.log(api)
      try {
        let res= await axios.delete(api);
        console.log(res)
      Toast.show({
                type: 'success', // 'success', 'error', 'info'
                text1: res.data.message,
                text2: "Successfully ", // Optional
                position: 'top', // 'top', 'bottom', 'center'
                visibilityTime: 4000, // Duration in milliseconds
                autoHide: true, // Automatically hide after visibilityTime
              });
      } catch (error) {
        console.log(error)
      }
   
  }

  const renderItem = ({ item }) => (

    <TouchableOpacity activeOpacity={1} onPress={()=>{Router.push("/(vender)/(components)/ProductDetails")}}>    <View style={{
      backgroundColor: '#fff',
      borderRadius: 10,
      elevation: 4,
      padding: 10,
      width: cardWidth,
      marginBottom: 15,
      
    }}>
      <Image
        source={{uri: item.defaultImage || 'https://psgpharma.ac.in/wp-content/uploads/2019/02/empty-img.jpg'}} // replace with your image
        style={{
          width: '100%',
          height: 120,
          borderRadius: 10
        }}
        resizeMode="cover"
      />
      <Text style={{
        marginTop: 8,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
      }}>{item.title}</Text>

      <Text style={{
        marginTop: 5,
        fontSize: 14
      }}>Price : {item.price} Rupee</Text>

      <Text style={{
        marginTop: 5,
        fontSize: 13
      }}>
        <Text style={{ fontWeight: 'bold' }}>Description: </Text>
        {item.description}
      </Text>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
      }}>
        <TouchableOpacity style={{
          backgroundColor: '#FFD54F',
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 5
        }} onPress={()=>{Router.push({ pathname: '/(vender)/(components)/ProductDetails', params: { item: JSON.stringify(item.id) } });
}}>
          <Text style={{
            color: '#000',
            fontWeight: '600'
          }}>✏️ Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          backgroundColor: '#EF5350',
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 5
        }}
        disabled
        onPress={()=>{HandleDeleted(item.id)}}> <Text style={{
            color: '#000',
            fontWeight: '600'
          }}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableOpacity>

  );





  return (
    <>
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop:30 }}>
      
      {/* Top Bar */}
      <LinearGradient
        colors={['#e53935', '#d32f2f']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Products</Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
            paddingHorizontal: 8,
            paddingVertical: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={()=>{Router.push('/(vender)/(components)/ProductDetails')}}
        >
          <Text style={{ color: '#d32f2f', fontWeight: 'bold', marginRight: 4 }}>Add</Text>
          <AntDesign name="plus" size={14} color="#d32f2f" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Content */}
      <View style={{
            flex: 1,
            width:"100%",
         justifyContent:"space-evenly",
         alignItems:"center"
      }}>
        {/* Placeholder Box Image */}
        <View style={{
   
      // padding: 5,
      marginTop:10,
      width:"100%",
     
      // backgroundColor: '#f1f1f1',
      // borderWidth:1,
    }}>
       
      {
      load? <Loader loading={load}/>:
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 40,  justifyContent:"space-between"}}
      />
      }
    </View>

        {/* Create Product Button */}
       
      </View>
       <TouchableOpacity
          style={{
            width:"100%",
            backgroundColor: '#d32f2f',
            paddingVertical: 10,
            paddingHorizontal: 25,
            borderTopRightRadius:6,
            borderTopLeftRadius:6,
            position:"absolute",
            height:40,
            bottom:10
          }}
           onPress={()=>{Router.push('/(vender)/(components)/ProductDetails')}}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16  ,textAlign:"center"}}>Create Product</Text>
        </TouchableOpacity>
    </View>
    <Toast/>
    </>
  );
}
