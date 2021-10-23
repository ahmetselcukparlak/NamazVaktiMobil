import React,{Component} from 'react';
import {Button, View, Text} from 'react-native';
export default function VakitScreen({ route, navigation }){

    const timeData = route.params;

    //console.log(timeData);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Tarih: {timeData[0].MiladiTarihUzun}</Text>
             <Text>İmsak: {timeData[0].Imsak} Güneş: {timeData[0].Gunes} Öğle: {timeData[0].Ogle} İkindi: {timeData[0].Ikindi} Akşam: {timeData[0].Aksam} Yatsı: {timeData[0].Yatsi} </Text>
            <Button onPress={() => navigation.goBack()} title="Vakit Sayfasına Git" />
        </View>
    );
}