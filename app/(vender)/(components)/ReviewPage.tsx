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
// import { BASE_URL } from './(components)/Config';
import { useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from './Config';
import Loader from './Loader';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Loader from './(components)/Loader';

const itemsPerPage = 8;

const TaxPage = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const[load,setload]=useState(true);
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([
    { label: 'Review Id', checked: true },
    { label: 'Comment', checked: true },
    { label: 'Customer Id', checked: true },
    { label: 'Rating', checked: true },
    { label: 'Actions', checked: true },
  ]);

  const toggleOption = (index) => {
    const updated = [...options];
    updated[index].checked = !updated[index].checked;
    setOptions(updated);
  };

const filteredData = data.filter(item => {
  const searchText = search.toLowerCase();
  return (
    item.rating?.toString().toLowerCase().includes(searchText) ||
    item.comment?.toLowerCase().includes(searchText) ||
    item.id?.toLowerCase().includes(searchText) ||
    item.customer?.email?.toLowerCase().includes(searchText) ||
    item.customer?.name?.toLowerCase().includes(searchText) ||
    item.product?.name?.toLowerCase().includes(searchText)
  );
});


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const Router = useRouter();
  const Navigation = useNavigation();

  const reload = async () => {
    setload(true);
    let api = `${BASE_URL}/vendor/review?page=1&limit=10`;
    try {
      const response = await axios.get(api);
      // console.log(response.data.data)
      setData(response.data.data);
      setload(false)
    } catch (error) {
      console.log(error);
      setload(true)
    }
  };

  const handleDelete = async (id) => {
    let api = `${BASE_URL}/vendor/review/${id}`;
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
          <Text style={{ color: 'white', fontSize: 18 }}>Review page</Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => { Router.push('/(vender)/(components)/ReviewForm') }}
          >
            <Text style={{ color: '#d32f2f', fontWeight: 'bold', marginRight: 4 }}>Add</Text>
            <AntDesign name="plus" size={14} color="#d32f2f" />
          </TouchableOpacity>
        </View>

        {/* Table */}
         {
        load?
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
          <Loader loading={load}/>
        </View>:
        <ScrollView style={{ padding: 10, backgroundColor: '#f4f4f4' }}>
          {/* Search Bar */}
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <TextInput
              placeholder="Search..."
              value={search}
              onChangeText={(text) => {
                setSearch(text);
                setPage(0);
              }}
              style={{
                flex: 1,
                height: 40,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
              }}
            />
            <View>
              <TouchableOpacity style={{ backgroundColor: "red", paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, gap: 10, marginLeft: 10, height: 40 }} onPress={() => setVisible(!visible)}>
                <Text style={{ color: "white" }}> View</Text>
                <AntDesign name='down' size={15} color={"white"} />
              </TouchableOpacity>

              {/* Dropdown for view options */}
              {visible && (
                <View
                  style={{
                    backgroundColor: '#444',
                    padding: 10,
                    borderRadius: 6,
                    position: 'absolute',
                    top: 50,
                    right: 0,
                    zIndex: 999,
                    width: 150,
                  }}
                >
                  <Text
                    style={{
                      color: '#bbb',
                      fontSize: 14,
                      marginBottom: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#555',
                      paddingBottom: 5,
                    }}
                  >
                    Toggle View
                  </Text>

                  {options.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => { toggleOption(index); setVisible(!visible); }}
                      style={{ paddingVertical: 6 }}
                    >
                      <Text style={{ color: '#fff' }}>
                        {item.checked ? '✓ ' : '   '}
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <ScrollView style={{ flex: 1 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <DataTable>
                {/* Header */}
                <DataTable.Header style={{ backgroundColor: '#f2f2f2' }}>
                  {options
                    .map((item, index) => ({ ...item, index }))
                    .filter(item => item.checked)
                    .map((item) => (
                      <DataTable.Title
                        key={item.index}
                        style={{
                          width: 200,
                          // flex:1,
                          alignItems: 'center',
                          justifyContent: 'start',
                        }}
                      >
                        <Text style={{ fontWeight: 'bold', color: 'black' }} numberOfLines={1} ellipsizeMode="tail">
                          {item.label}
                        </Text>
                      </DataTable.Title>
                    ))}
                </DataTable.Header>

                {/* Data Rows */}
                {paginatedData.map((rowItem) => (
                  <DataTable.Row key={rowItem.id}>
                    {options
                      .map((opt, i) => ({ ...opt, index: i }))
                      .filter(opt => opt.checked)
                      .map((opt) => (
                        <DataTable.Cell
                          key={opt.index}
                          style={{
                            width:200,
                            // flex: 1,
                            alignItems: 'center',
                            justifyContent: 'start',
                            gap:20
                          }}
                        >
                          {opt.index === 0 && <Text>{rowItem.id}</Text>}
                          {opt.index === 1 && <Text>{rowItem.comment}</Text>}
                          {opt.index === 2 && <Text>{rowItem.customerId}</Text>}
                          {opt.index === 3 && <Text style={{textAlign:"center" }} >{rowItem.rating}</Text>}
                          {opt.index === 4 && (
                            <View style={{ flexDirection: 'row', gap:5 }}>
                              <TouchableOpacity style={{justifyContent:"center", alignContent:"center"}} onPress={()=>{
                                Router.push({
                                  pathname:'/(vender)/(components)/ReviewView',params:{id:rowItem.id}})
                                }}>  
                                <Entypo name='eye' size={20} color={"green"}/>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => {
                                Router.push({
                                  pathname: '/(vender)/(components)/ReviewForm',
                                  params: {
                                    id: rowItem.id,
                                    comment: rowItem.comment,
                                    customerId: rowItem.customerId,
                                    rating: rowItem.rating,
                                  },
                                });
                              }}>
                                <IconButton icon="pencil" iconColor="blue" size={18} />
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => handleDelete(rowItem.id)}>
                                <IconButton icon="delete" iconColor="red" size={18} />
                              </TouchableOpacity>
                            </View>
                          )}
                        </DataTable.Cell>
                      ))}
                  </DataTable.Row>
                ))}
              </DataTable>
            </ScrollView>
          </ScrollView>

          {/* Pagination Controls */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
            <Button
              mode="outlined"
              onPress={() => {
                if (page > 0) {
                  setPage(page - 1);
                }
              }}
              disabled={page === 0}
              style={{ marginRight: 10 }}
            >
              Prev
            </Button>

            <Text style={{ marginRight: 10 }}>
              Page {page + 1} of {totalPages}
            </Text>

            <Button
              mode="contained"
              onPress={() => {
                if (page + 1 < totalPages) {
                  setPage(page + 1);
                }
              }}
              disabled={page + 1 >= totalPages}
            >
              Next
            </Button>
          </View>
        </ScrollView>
}
          <TouchableOpacity style={{
                backgroundColor: '#fce6e6',
                padding: 15,
                alignItems: 'center',
                marginTop: 20
              }} onPress={()=>{Router.push('/(vender)/(components)/ReviewForm')}}>
                <Text style={{ fontWeight: 'bold' }}>Create</Text>
              </TouchableOpacity>
      </View>
      
      <Toast />
    </>
  );
};

export default TaxPage;
