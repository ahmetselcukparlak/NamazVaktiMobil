
import React, { useState,useEffect } from 'react';
import { StyleSheet, Picker, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import RNPickerSelect from "react-native-picker-select";


const ulkeURL = "https://ezanvakti.herokuapp.com/ulkeler";
const sehirURL = "https://ezanvakti.herokuapp.com/sehirler/";
const ilceURL = "https://ezanvakti.herokuapp.com/ilce/";


const App = () => {

  const [isLoadingCountry, setLoadingCountry] = useState(true);
  const [isLoadingCity, setLoadingCity] = useState(true);
  const [isLoadingDistrict, setLoadingDistrict] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [countrySelected, setCountrySelected] = useState([]);
  const [citySelected, setCitySelected] = useState([]);
  const [districtSelected, setDistrictSelected] = useState([]);

  useEffect(() => {
    fetch(ulkeURL)
    .then((response) => response.json())
    .then((json) => setCountryData(json))
    .then(setLoadingCountry(false));
  })

 
    
      useEffect(() => {
        if (countrySelected != "") {
        
        fetch(sehirURL+countrySelected)
        .then((response) => response.json())
        .then((json) => setCityData(json))
        .then(setLoadingCity(false));
        
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
      {isLoadingDistrict ? (<ActivityIndicator /> ) : ( 
      
      <RNPickerSelect
               onValueChange={(districtSelected) => setDistrictSelected(districtSelected)}
               items={districtData.map(obj =>({
                 label: obj.UlkeAdi,
                 value: obj.UlkeID,
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