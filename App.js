import { StatusBar } from 'expo-status-bar';

import {  Text} from 'react-native';
import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";


export default function App() {
    const [ country, setCountry ] = useState("");
    const [ city, setCity ] = useState("");
    const [ district, setDistrict ] = useState("");
    return (
        <View style={styles.container}>
            <Text>
                {country ?
                  `Seçilen ülke ${country}` :
                    "Lütfen ülke seçiniz"
                }
            </Text>
            <RNPickerSelect
                onValueChange={(country) => setCountry(country)}
                items={[
                    { label: "Amerika", value: "Amerika" },
                    { label: "İngiltere", value: "İngiltere" },
                    { label: "Çin", value: "Çin" },
                    { label: "Rusya", value: "Rusya" },
                    { label: "Türkiye", value: "Türkiye" },
                    { label: "Japonya", value: "Japonya" },
                ]}
            />
            <Text>
                {city ?
                  `Seçilen şehir ${city}` :
                    "Lütfen şehir seçiniz"
                }
            </Text>
            <RNPickerSelect
                onValueChange={(city) => setCity(city)}
                items={[
                    { label: "Washington", value: "Washington" },
                    { label: "Londra", value: "Londra" },
                    { label: "Pekin", value: "Pekin" },
                    { label: "Moskova", value: "Moskova" },
                    { label: "İstanbul", value: "İstanbul" },
                    { label: "Tokyo", value: "Tokyo" },
                ]}
            />
             <Text>
                {district ?
                  `Seçilen ilçe ${district}` :
                    "Lütfen ilçe seçiniz"
                }
            </Text>
            <RNPickerSelect
                onValueChange={(district) => setDistrict(district)}
                items={[
                    { label: "Ümraniye", value: "Ümraniye" },
                    { label: "Esenler", value: "Esenler" },
                    { label: "Bağcılar", value: "Bağcılar" },
                    { label: "Avcılar", value: "Avcılar" },
                    { label: "Beşiktaş", value: "Beşiktaş" },
                    { label: "Kadıköy", value: "Kadıköy" },
                ]}
            />
        </View>
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