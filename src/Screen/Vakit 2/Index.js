import React,{Component,useState,useEffect} from 'react';
import {Button,StyleSheet, View, Text,SafeAreaView, ActivityIndicator,Alert,BackHandler } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const getCurrentDate=()=>{

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
 
  return date + '.' + month + '.' + year;//format: dd-mm-yyyy;
}


export default function VakitScreen({ route, navigation }){
    const [timeDataSQL, setTimeDataSQL] = useState([]);              //30 günlük sqlden cekilen bilgi
    const [timeDataCurrentDay, setTimeDataCurrentDay] = useState([]); //bugüne ait olan bilgi
    const [firstRun, setFirstRun] = useState(true);
    const [currentDayFound, setCurrentDayFound] = useState(false);   //sqlde bugüne ait bilgi yoksa false olarak kalir
    const [items, setItems] = useState([]);
    const [empty, setEmpty] = useState([]);
    const [dataWrited, setDataWrited] = useState(true);
    const [simulation, setSimulation] = useState(true);

    //const timeData = route.params;

    useEffect(() => {
        if(firstRun){
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM items',
            [],
            (tx, results) => {
              var temp = [];
              var temp2 = [];
              var dateTemp = getCurrentDate();
              for (let i = 0; i < results.rows.length; ++i){
                temp.push(results.rows.item(i));
                if(temp[i].miladitarihkisa == dateTemp){
                  temp2.push(results.rows.item(i));
                  setTimeDataCurrentDay(temp2);
                  setCurrentDayFound(true);
                }
                else if( i == results.rows.length && currentDayFound == false && simulation){
                  //i == results.rows.length && currentDayFound == false
                  // bu durumda 30 gunluk datanin tarihi eskimis yeni data cekilmeli
                  db.transaction(tx => {

                    tx.executeSql(
                      "delete from items;"
                    );
                    
                    //console.log("calisti");
                  });
                  setSimulation(false);
                  Alert.alert(
                    "UYARI",
                    "Uygulamanın güncellenmesi gerekmektedir. Lütfen yeniden başlatınız.",
                    [
                      { text: "KAPAT", onPress: () => {return BackHandler.exitApp(); }}
                    ]
                  );
                  
                  
                  //navigation.navigate('Konum');
                }
              }
                //console.log(results.rows.length);
                //console.log(results.rows.item(0));
                //console.log(timeDataSQL);
              setTimeDataSQL(temp);
              //console.log(timeDataSQL);
    
              if (results.rows.length >= 1) {
                setEmpty(false);
              } else {
                setEmpty(true)
              }
    
            }
          );
    
        });
        setFirstRun(false);
        
    }
    if(timeDataSQL === undefined ||timeDataSQL == null || timeDataSQL.length < 2){
  
    }
    else if(firstRun == false){
      //zaman karsilastirmasi
      setDataWrited(false);
      getCurrentDate();
    }
 

}, []);

    
   // console.log(timeDataSQL);
      //<Text>İmsak: {timeData[0].Imsak} Güneş: {timeData[0].Gunes} Öğle: {timeData[0].Ogle} İkindi: {timeData[0].Ikindi} Akşam: {timeData[0].Aksam} Yatsı: {timeData[0].Yatsi} </Text>
// <Text>İmsak:{timeDataSQL[0].imsak} Güneş:{timeDataSQL[0].gunes} Öğle:{timeDataSQL[0].ogle} İkindi:{timeDataSQL[0].ikindi} Akşam:{timeDataSQL[0].aksam} Yatsı:{timeDataSQL[0].yatsi}</Text>

    return (
        <SafeAreaView>
        {timeDataCurrentDay && timeDataCurrentDay.length && timeDataSQL && timeDataSQL.length? (<View>
              <Text>Telefondan alınan tarih: {getCurrentDate()}</Text>
              <Text>Gösterilen ezan vakitlerine ait tarih: {timeDataCurrentDay[0].miladitarihkisa}</Text>
              <Text>Ezan vakitleri son güncellenme tarihi: {timeDataSQL[0].miladitarihkisa}</Text>
              <Text>Veritabanı güncellenmesi gereken tarih: {timeDataSQL[timeDataSQL.length-1].miladitarihkisa}</Text>
              <Text>İmsak:{timeDataCurrentDay[0].imsak} Güneş:{timeDataCurrentDay[0].gunes} Öğle:{timeDataCurrentDay[0].ogle} İkindi:{timeDataCurrentDay[0].ikindi} Akşam:{timeDataCurrentDay[0].aksam} Yatsı:{timeDataCurrentDay[0].yatsi}</Text>
              <Text>District id: {timeDataSQL[0].district}</Text>
            </View> ) : ( <ActivityIndicator/>
            
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