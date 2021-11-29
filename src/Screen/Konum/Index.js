import React, { useState,useEffect } from 'react';
import { ImageBackground,StyleSheet, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import * as SQLite from 'expo-sqlite';

const image = require('./konum.jpg');



const ulkeURL = "https://ezanvakti.herokuapp.com/ulkeler";
const sehirURL = "https://ezanvakti.herokuapp.com/sehirler/";
const ilceURL = "https://ezanvakti.herokuapp.com/ilceler/";
const vakitURL = "https://ezanvakti.herokuapp.com/vakitler/";

/*
const ulkeURL = "https://78ebb5ba-b073-47ac-994e-e8b6a596b8f4.mock.pstmn.io/erenx/ulkeler";
const sehirURL = "https://78ebb5ba-b073-47ac-994e-e8b6a596b8f4.mock.pstmn.io/erenx/sehirler/";
const ilceURL = "https://78ebb5ba-b073-47ac-994e-e8b6a596b8f4.mock.pstmn.io/erenx/ilceler/";
const vakitURL = "https://78ebb5ba-b073-47ac-994e-e8b6a596b8f4.mock.pstmn.io/erenx/vakitler/";
*/


const db = SQLite.openDatabase("db.db");

db.transaction(tx => {
  /*
  tx.executeSql(
    "drop table items;"
  );*/
  tx.executeSql(
    "create table if not exists items (id integer primary key not null, aksam text, ayinsekliurl text, gunes text, gunesbatis text, gunesdogus text, hicritarihkisa text, hicritarihuzun text, ikindi text, imsak text, miladitarihkisa text, miladitarihuzun text, ogle text, yatsi text, district integer, districtname text, cityname text, countryname text);"
  );
  //console.log("calisti");
});

const placeholderUlke = {
  label: 'Ülkeyi seçiniz...',
  value: null,
  color: '#9EA0A4',
};
const placeholderSehir = {
  label: 'İli seçiniz...',
  value: null,
  color: '#9EA0A4',
};
const placeholderIlce = {
  label: 'İlçeyi seçiniz...',
  value: null,
  color: '#9EA0A4',
};



export default function KonumScreen ({ navigation }) {
    const [sqlReady, setSqlReady] = useState(true);
    const [isLoadingCountry, setLoadingCountry] = useState(true);
    const [isLoadingCity, setLoadingCity] = useState(true);
    const [isLoadingDistrict, setLoadingDistrict] = useState(true);
    const [isLoadingSalaahData, setLoadingSalaahData] = useState(true);
    const [writeSQL, setWriteSQL] = useState(true);
    const [countryData, setCountryData] = useState([0]);
    const [cityData, setCityData] = useState([0]);
    const [districtData, setDistrictData] = useState([0]);
    const [countryNameData, setCountryNameData] = useState([""]);//
    const [cityNameData, setCityNameData] = useState([""]);
    const [districtNameData, setDistrictNameData] = useState([""]);//
    const [salaahTimeData, setSalaahTimeData] = useState([0]);
    const [countrySelected, setCountrySelected] = useState(0);
    const [citySelected, setCitySelected] = useState(0);
    const [districtSelected, setDistrictSelected] = useState(0);
    const [countrySelectedDump, setCountrySelectedDump] = useState(0);
    const [citySelectedDump, setCitySelectedDump] = useState(0);
    const [districtSelectedDump, setDistrictSelectedDump] = useState(0);
    const [firstDataGet, setFirstDataGet] = useState(true);
    const [params, setParams] = useState(true);
    const [goVakit, setGoVakit] = useState(false);
    var bos = [];
    
  
    useEffect(() => {
      if(sqlReady){
       
        db.transaction(tx => {tx.executeSql("select id from items",
        [],
        (tx, results) => { 
         // console.log(results.rows.length);
          if(results.rows.length > 10){
         // console.log(results.rows.item(0));
          navigation.navigate('Vakit');
        }
          });});
        setSqlReady(false);
      }
      if(firstDataGet){
      fetch(ulkeURL)
      .then(setCitySelectedDump(0))
      .then(setCitySelected(0))
      .then((response) => response.json())
      .then((json) => setCountryData(json))
      .then(setCountryData( countryData.slice(1) ))
      .then(setFirstDataGet(false))
      .then(setLoadingCountry(false));
      }
      if(countrySelected === undefined ||countrySelected == null){
  
      }
      else if(countrySelected != countrySelectedDump){
        countryData.map(obj => {
          if(obj.UlkeID == countrySelected){
            setCountryNameData(obj.UlkeAdiEn);
            //console.log(obj.UlkeAdiEn);
          }
        })
        setLoadingCity(true);
        fetch(sehirURL+countrySelected)
        .then(setCitySelectedDump(0))
        .then(setCitySelected(0))
        .then(setDistrictData([0]))
        .then(setLoadingSalaahData(true))
      .then((response) => response.json())
      .then((json) => setCityData(json))
      .then(setCityData( cityData.slice(1) ))
      .then(setCountrySelectedDump(countrySelected))
      .then(setLoadingCity(false));
      }
      if(citySelected === undefined ||citySelected == null){
  
      }
      else if(citySelected != citySelectedDump){
        cityData.map(obj => {
          if(obj.SehirID == citySelected){
            setCityNameData(obj.SehirAdiEn);
            console.log(obj.SehirAdiEn);
          }
        })

        fetch(ilceURL+citySelected)
        .then(setLoadingDistrict(true))
        .then(setLoadingSalaahData(true))
      .then((response) => response.json())
      .then((json) => setDistrictData(json))
      .then(setDistrictData( districtData.slice(1) ))
      .then(setCitySelectedDump(citySelected))
      .then(setLoadingDistrict(false));
      }
      if(districtSelected === undefined ||districtSelected == null){
  
      }
      else if(districtSelected != districtSelectedDump){
        districtData.map(obj => {
          if(obj.IlceID == districtSelected){
            setDistrictNameData(obj.IlceAdiEn);
            console.log(obj.IlceAdiEn);
          }
        })
      setSalaahTimeData(bos);
        fetch(vakitURL+districtSelected)
        .then(setLoadingSalaahData(true))
        .then(setWriteSQL(true))
      .then((response) => response.json())
      .then((json) => setSalaahTimeData(json))
      .then(setSalaahTimeData( salaahTimeData.slice(1) ))
      .then(setDistrictSelectedDump(districtSelected))
      .then(setLoadingSalaahData(false));
      //.then(setLoadingSalaahData(false));
      }
      if(salaahTimeData === undefined ||salaahTimeData == null || salaahTimeData.length < 2){
  
      }
      else if(writeSQL && goVakit){
        setGoVakit(false);
        db.transaction(tx => {
          tx.executeSql("delete from items");
        salaahTimeData.map( data =>(
          
          tx.executeSql("insert into items (aksam, ayinsekliurl, gunes, gunesbatis, gunesdogus, hicritarihkisa, hicritarihuzun, ikindi, imsak, miladitarihkisa, miladitarihuzun, ogle, yatsi, district, districtname, cityname, countryname) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",[data.Aksam, data.AyinSekliURL, data.Gunes, data.GunesBatis, data.GunesDogus, data.HicriTarihKisa, data.HicriTarihUzun, data.Ikindi,data.Imsak, data.MiladiTarihKisa, data.MiladiTarihUzun, data.Ogle, data.Yatsi, districtSelected, districtNameData, cityNameData, countryNameData]),null,null)
          );
      });
        
        console.log("SQL YAZILDI");
        setWriteSQL(false);
       // setLoadingSalaahData(false);
        navigation.navigate('Vakit',districtSelected);
      }
    


    })
    return (
     
    <View style={styles.containerPicker}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
       
      
        
        {isLoadingCountry ? (<View/> ) : ( 
        
         <RNPickerSelect
         style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        placeholder={placeholderUlke}
                  onValueChange={(countrySelected) => {setCountrySelected(countrySelected); if(countrySelected){console.log(countrySelected)}}}
                  items={countryData.map(obj =>({
                    
                    label: obj.UlkeAdi,
                    value: obj.UlkeID,
                    color: 'black',
                  }
  
                  ))
                   }                         
         />
         )}
         {isLoadingCity || countrySelected != countrySelectedDump ? (<View/>) : ( 
        <View style={styles.pickerContainer}>
         
          <RNPickerSelect
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={placeholderSehir}
                  onValueChange={(citySelected) => setCitySelected(citySelected)}
                  items={cityData.map(obj =>({
                    label: obj.SehirAdiEn,
                    value: obj.SehirID,
                    color: 'black',
                  }
  
                  ))
                    }                         
          />
        </View>
        )}
        {isLoadingDistrict || countrySelected != countrySelectedDump || citySelected != citySelectedDump? (<View/> ) : ( 
        <View>
           
          
          <RNPickerSelect
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={placeholderIlce}
          onValueChange={(districtSelected) => setDistrictSelected(districtSelected)}
                  items={districtData.map(obj =>({
                    label: obj.IlceAdiEn,
                    value: obj.IlceID,
                    color: 'black',
                  }
  
                  ))
                    }                         
          />
          
        </View>
        )}
  
      {isLoadingSalaahData ? (<View/> ) : ( 
            <TouchableOpacity 
              style={[styles.btn,styles.btnPrimary,styles.btn300]} 
              onPress={() => setGoVakit(true)}>
                  <Text style={[styles.largeText,styles.textWhite]}>Kaydet</Text>
            </TouchableOpacity>
      )}
      
     
      </View>
      </ImageBackground>
      </View>
    );
}

const styles = StyleSheet.create({
  
  containerPicker: {
    flex: 1,
    backgroundColor: "#000000c0",
   justifyContent:'center',
    
  },

    container: {
      flex: 1,
      alignItems:'center',
     justifyContent:'center',
     
      
    },
    image: {
      flex: 1,
      justifyContent: "center",
     
      
    },
    largeText:{
      fontSize:18
    },
    text:{
      color:'#333'
    },
    btn:{
      borderWidth:1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:4,
      borderColor:'transparent',
      paddingHorizontal:12,
      paddingVertical:6,
      fontWeight:'400',
      lineHeight:1.5
    },
    btnPrimary:{
      backgroundColor: '#007bff',
      borderColor: '#007bff'
    },
    btn300:{
      width:300,
      height:50,
    },
    btnText:{
      fontSize:16,
    },
    textWhite:{
      color: '#fff',
    },
    pickerContainer:{
      alignItems:'center',
  
    },

  });
  
  const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      marginTop:20,
      marginBottom:20,
      width:300,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: '#333',
      borderRadius: 8,
      color: 'white',
      paddingRight: 30,
      backgroundColor:'black',
      opacity:0.7,
      
    },
  });