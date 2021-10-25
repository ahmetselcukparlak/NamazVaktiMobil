import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import RNPickerSelect from "react-native-picker-select";

const ulkeURL = "https://ezanvakti.herokuapp.com/ulkeler";
const sehirURL = "https://ezanvakti.herokuapp.com/sehirler/";
const ilceURL = "https://ezanvakti.herokuapp.com/ilceler/";
const vakitURL = "https://ezanvakti.herokuapp.com/vakitler/";

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

const cityDataFetch = (countrySelected,setCityData,setLoadingCity) => {
  useEffect(() => {
    if (countrySelected != "") {
    
    fetch(sehirURL+countrySelected)
    .then((response) => response.json())
    .then((json) => setCityData(json))
    .then(setLoadingCity(false));
    
  }
  })
};

export default function KonumScreen ({ navigation }) {
    const [isLoadingCountry, setLoadingCountry] = useState(true);
    const [isLoadingCity, setLoadingCity] = useState(true);
    const [isLoadingDistrict, setLoadingDistrict] = useState(true);
    const [isLoadingSalaahData, setLoadingSalaahData] = useState(true);
    const [countryData, setCountryData] = useState([0]);
    const [cityData, setCityData] = useState([0]);
    const [districtData, setDistrictData] = useState([0]);
    const [salaahTimeData, setSalaahTimeData] = useState([0]);
    const [countrySelected, setCountrySelected] = useState(0);
    const [citySelected, setCitySelected] = useState(0);
    const [districtSelected, setDistrictSelected] = useState(0);
    const [countrySelectedDump, setCountrySelectedDump] = useState(0);
    const [citySelectedDump, setCitySelectedDump] = useState(0);
    const [districtSelectedDump, setDistrictSelectedDump] = useState(0);
    const [firstDataGet, setFirstDataGet] = useState(true);
  
    useEffect(() => {
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
        fetch(sehirURL+countrySelected)
        .then(setCitySelectedDump(0))
        .then(setCitySelected(0))
        .then(setDistrictData([0]))
      .then((response) => response.json())
      .then((json) => setCityData(json))
      .then(setCityData( cityData.slice(1) ))
      .then(setCountrySelectedDump(countrySelected))
      .then(setLoadingCity(false));
      }
      if(citySelected === undefined ||citySelected == null){
  
      }
      else if(citySelected != citySelectedDump){
        fetch(ilceURL+citySelected)
        .then(setLoadingDistrict(true))
      .then((response) => response.json())
      .then((json) => setDistrictData(json))
      .then(setDistrictData( districtData.slice(1) ))
      .then(setCitySelectedDump(citySelected))
      .then(setLoadingDistrict(false));
      }
      if(districtSelected === undefined ||districtSelected == null){
  
      }
      else if(districtSelected != districtSelectedDump){
        fetch(vakitURL+districtSelected)
        .then(setLoadingSalaahData(true))
      .then((response) => response.json())
      .then((json) => setSalaahTimeData(json))
      .then(setSalaahTimeData( salaahTimeData.slice(1) ))
      .then(setDistrictSelectedDump(districtSelected))
      .then(setLoadingSalaahData(false));
      }
    })
    return (
      <SafeAreaView style={styles.container}>
         <Text style={[styles.text,styles.largeText]}> Lütfen Ülke seçiniz</Text>
        {isLoadingCountry ? (<ActivityIndicator /> ) : ( 
        
         <RNPickerSelect
         style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        placeholder={placeholderUlke}
                  onValueChange={(countrySelected) => setCountrySelected(countrySelected)}
                  items={countryData.map(obj =>({
                    
                    label: obj.UlkeAdi,
                    value: obj.UlkeID,
                    
                  }
  
                  ))
                   }                         
         />
         )}
         {isLoadingCity ? (<ActivityIndicator /> ) : ( 
        <View>
          <Text style={[styles.text,styles.largeText]}> Lütfen Şehir seçiniz</Text>
          <RNPickerSelect
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={placeholderSehir}
                  onValueChange={(citySelected) => setCitySelected(citySelected)}
                  items={cityData.map(obj =>({
                    label: obj.SehirAdiEn,
                    value: obj.SehirID,
                  }
  
                  ))
                    }                         
          />
        </View>
        )}
        {isLoadingDistrict ? (<ActivityIndicator /> ) : ( 
        <View>
          <Text style={[styles.text,styles.largeText]}> Lütfen İlçe seçiniz</Text>
          <RNPickerSelect
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={placeholderIlce}
          onValueChange={(districtSelected) => setDistrictSelected(districtSelected)}
                  items={districtData.map(obj =>({
                    label: obj.IlceAdiEn,
                    value: obj.IlceID,
                  }
  
                  ))
                    }                         
          />
        </View>
        )}
  
      {isLoadingSalaahData ? (<ActivityIndicator /> ) : ( 
            <TouchableOpacity 
              style={[styles.btn,styles.btnPrimary,styles.btn300]} 
              onPress={() => navigation.navigate('Vakit', salaahTimeData)}>
                  <Text style={[styles.largeText,styles.textWhite]}>Kaydet</Text>
            </TouchableOpacity>
      )}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
    }
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
      color: 'black',
      paddingRight: 30,
    },
  });