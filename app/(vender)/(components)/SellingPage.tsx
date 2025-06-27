import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from './Config';
import Loader from './Loader';

const itemsPerPage = 5;

const SellingPage = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(true);
  const[productdata,setproductdata]=useState([])
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([
    { label: 'Total Sold Product', checked: true },
    { label: 'Product Revenue', checked: true },
    { label: 'Actions', checked: true },
  ]);

  const toggleOption = (index) => {
    const updated = [...options];
    updated[index].checked = !updated[index].checked;
    setOptions(updated);
  };

  const Router = useRouter();
  const Navigation = useNavigation();

  const reload = async () => {
    setLoad(true);
    let api = `${BASE_URL}/vendor/selling`;
    try {
      const response = await axios.get(api);
      console.log('API Response:', response.data); // Log the response

      setproductdata(response.data.productStats)
      setData(response.data); // Adjust according to your API response structure
      setLoad(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      setLoad(true);
    }
  };

  const handleDelete = async (id) => {
    let api = `${BASE_URL}/vendor/selling/${id}`;
    try {
      const res = await axios.delete(api);
      Toast.show({
        type: 'success',
        text1: res.data.message,
        text2: "Deleted Successfully",
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
      });
      reload(); // Reload data after deletion
    } catch (error) {
      console.log(error);
    }
  };

  // Use useFocusEffect to reload data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, [])
  );

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#f1f1f1', paddingTop: 10, paddingBottom: 10 }}>
        {/* Header */}
        <View style={{
          backgroundColor: 'red',
          padding: 15,
          paddingTop: 35,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: "space-between"
        }}>
          <TouchableOpacity onPress={() => Navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18 }}>Selling Report</Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            disabled
            // onPress={() => { Router.push('/(vender)/(components)/ReturnForm') }}
          >
            <Text style={{ color: '#d32f2f', fontWeight: 'bold', marginRight: 4 }}>Add</Text>
            <AntDesign name="plus" size={14} color="#d32f2f" />
          </TouchableOpacity>
        </View>

        {/* Table */}
        {
          load ?
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Loader loading={load} />
            </View> :
            <ScrollView style={{ padding: 10, backgroundColor: '#f4f4f4' }}>
              {/* Search Bar */}
           

              <ScrollView style={{ flex: 1 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <DataTable>
                    {/* Header */}
                    <DataTable.Header style={{ backgroundColor: '#f2f2f2' }}>
                      
                          <DataTable.Title
                           
                            style={{
                              width: 200,
                              alignItems: 'center',
                              justifyContent: 'start',
                            }}
                          >
                            <Text style={{ fontWeight: 'bold', color: 'black' }} numberOfLines={1} ellipsizeMode="tail">
                             Total Sold Product
                            </Text>
                          </DataTable.Title>
                           <DataTable.Title
                           
                            style={{
                              width: 200,
                              alignItems: 'center',
                              justifyContent: 'start',
                            }}
                          >
                            <Text style={{ fontWeight: 'bold', color: 'black' }} numberOfLines={1} ellipsizeMode="tail">
                             Product Revenue
                            </Text>
                          </DataTable.Title>
                        
                           <DataTable.Title
                           
                            style={{
                              width: 200,
                              alignItems: 'center',
                              justifyContent: 'start',
                            }}
                          >
                            <Text style={{ fontWeight: 'bold', color: 'black' }} numberOfLines={1} ellipsizeMode="tail">
                             Action
                            </Text>
                          </DataTable.Title>
                        
                    </DataTable.Header>

                    {/* Data Rows */}
                   
                      <DataTable.Row >
                        
                            <DataTable.Cell
                              style={{
                                width: 200,
                                alignItems: 'center',
                                justifyContent: 'start',
                              }}
                            >
                           
                           <Text>{data.totalProductsSold}</Text>
                            </DataTable.Cell>
                             <DataTable.Cell
                              style={{
                                width: 200,
                                alignItems: 'center',
                                justifyContent: 'start',
                              }}
                            >
                           
                           <Text>{data.totalRevenue}</Text>
                            </DataTable.Cell>
                             <DataTable.Cell
                              style={{
                                width: 200,
                                alignItems: 'center',
                                justifyContent: 'start',
                              }}
                            >
                             <View style={{ flexDirection: 'row', gap:5 }}>
                                                         <TouchableOpacity style={{justifyContent:"center", alignContent:"center"}} onPress={()=>{
                                                           Router.push({
                                                             pathname:'/(vender)/(components)/SellingView'})
                                                           }}>  
                                                           <Entypo name='eye' size={20} color={"green"}/>
                                                         </TouchableOpacity>
                                                         <TouchableOpacity disabled onPress={() => {
                                                           Router.push({
                                                             pathname: '/(vender)/(components)/SellingForm'
                                                           });
                                                           console.log("bipins")
                                                         }}>
                                                           <IconButton icon="pencil" iconColor="blue" size={18} />
                                                         </TouchableOpacity>
                                                         <TouchableOpacity onPress={() => handleDelete(data?.id)} disabled>
                                                           <IconButton icon="delete" iconColor="red" size={18} />
                                                         </TouchableOpacity>
                                                       </View>
                            </DataTable.Cell>
                        
                      </DataTable.Row>
                  
                  </DataTable>
                </ScrollView>
              </ScrollView>

             
            </ScrollView>
        }
        <TouchableOpacity style={{
          backgroundColor: '#fce6e6',
          padding: 15,
          alignItems: 'center',
          marginTop: 20
        }} 
        // onPress={() => { Router.push('/(vender)/(components)/ReturnForm') }}
        disabled
        >
          <Text style={{ fontWeight: 'bold' }}>Create</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </>
  );
};

export default SellingPage;
