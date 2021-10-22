
import React, { useState,useEffect } from 'react';
import { StyleSheet, Picker, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import RNPickerSelect from "react-native-picker-select";


const ulkeURL = "https://ezanvakti.herokuapp.com/ulkeler";
const sehirURL = "https://ezanvakti.herokuapp.com/sehirler/";
const ilceURL = "https://ezanvakti.herokuapp.com/ilceler/";

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

const App = () => {

  const [isLoadingCountry, setLoadingCountry] = useState(true);
  const [isLoadingCity, setLoadingCity] = useState(true);
  const [isLoadingDistrict, setLoadingDistrict] = useState(true);
  const [countryData, setCountryData] = useState([0]);
  const [cityData, setCityData] = useState([0]);
  const [districtData, setDistrictData] = useState([0]);
  const [districtDataDump, setDistrictDataDump] = useState([0]);
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
  })

  
    
  

  return (
    <SafeAreaView style={styles.container}>
      <Text>
                {countrySelected ?
                  `Seçilen ülke ${countrySelected}` :
                    "Lütfen ülke seçiniz"
                }
      </Text>
      {isLoadingCountry ? (<ActivityIndicator /> ) : ( 
      
       <RNPickerSelect
                onValueChange={(countrySelected) => setCountrySelected(countrySelected)}
                items={countryData.map(obj =>({
                  
                  label: obj.UlkeAdi,
                  value: obj.UlkeID,
                  
                }

                ))
                 }                         
       />
       )}
       <Text>
                {countrySelected ?
                  `Seçilen Şehir ${citySelected}` :
                    "Lütfen Şehir seçiniz"
                }
      </Text>
       {isLoadingCity ? (<ActivityIndicator /> ) : ( 
      
      <RNPickerSelect
               onValueChange={(citySelected) => setCitySelected(citySelected)}
               items={cityData.map(obj =>({
                 label: obj.SehirAdiEn,
                 value: obj.SehirID,
               }

               ))
                }                         
      />
      )}
      <Text>
                {countrySelected ?
                  `Seçilen ilçe ${districtSelected}` :
                    "Lütfen ilçe seçiniz"
                }
      </Text>
      {isLoadingDistrict ? (<ActivityIndicator /> ) : ( 
      
      <RNPickerSelect
               onValueChange={(districtSelected) => setDistrictSelected(districtSelected)}
               items={districtData.map(obj =>({
                 label: obj.IlceAdiEn,
                 value: obj.IlceID,
               }

               ))
                }                         
      />
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
});


export default App;