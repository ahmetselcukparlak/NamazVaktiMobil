import React,{Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { SectionGrid } from 'react-native-super-grid';

export default function VakitScreen({ route, navigation }){
    const timeData = route.params;
    if(timeData){
        const [items, setItems] = React.useState([
            { name: 'İMSAK', vakit: timeData[0].Imsak },
            { name: 'GÜNEŞ', vakit: timeData[0].Gunes },
            { name: 'ÖĞLE', vakit: timeData[0].Ogle },
            { name: 'İKİNDİ', vakit: timeData[0].Ikindi },
            { name: 'AKŞAM', vakit: timeData[0].Aksam },
            { name: 'YATSI', vakit: timeData[0].Yatsi }
        ]);
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <Text>Öğle</Text>
                    <Text>Timer</Text>
                </View>
                <SectionGrid
                    itemDimension={110}
                    sections={[
                        {
                        data: items.slice(0, 6),
                        },
                    ]}
                    style={styles.gridView}
                    renderItem={({ item, section, index ,timeData}) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.saat}>{item.name}</Text>
                            <Text style={styles.vakit}>{item.vakit}</Text>
                        </View>
                    )}
                />
                <View style={{flex:1}}>
                    <Text>Ayet</Text>
                </View>
            </View>
          );
    }
    else{
        return (
            <View style={styles.container}>
                <Text style={{marginBottom:20,fontSize:24}}>Önce Konumunuzu Ekleyiniz</Text>
                <TouchableOpacity 
                  style={[styles.btn,styles.btnPrimary,styles.btn300]} 
                  onPress={() => navigation.navigate('Konum')}>
                      <Text style={[styles.largeText,styles.textWhite]}>Konum Sayfasına Dön</Text>
                </TouchableOpacity>
            </View>
        );
    }
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
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 75,
    backgroundColor: '#2c3e50',
    alignItems: 'center'
  },
  saat: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textAlign:'center',
    borderBottomWidth:1,
    paddingBottom:5,
    borderColor:'#fff'
  },
  vakit: {
    fontWeight: '600',
    fontSize: 20,
    height: 100,
  },
  saat: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    textAlign:'center',
  },
  vakit: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
    padding: 10,
  },
});
