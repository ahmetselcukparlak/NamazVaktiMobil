import React,{Component} from 'react';
import {Button, View} from 'react-native';
export default function VakitScreen({ navigation }){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Vakit Sayfasına Git" />
        </View>
    );
}