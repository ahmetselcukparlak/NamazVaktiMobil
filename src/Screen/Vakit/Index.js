import React,{Component,useState,useEffect} from 'react';
import {ImageBackground,Button,StyleSheet, View, Text,SafeAreaView, TouchableOpacity , ActivityIndicator,Alert,BackHandler } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import * as SQLite from 'expo-sqlite';
import CountDown from 'react-native-countdown-component';

const image = require('./background.jpg');
const db = SQLite.openDatabase("db.db");


const getCurrentDate=()=>{
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var number = parseInt(date);
  var numberMonth = parseInt(month);

  //Alert.alert(date + '-' + month + '-' + year);
 if(number < 10 && numberMonth > 9){
  return '0'+date + '.' + month + '.' + year;//format: dd-mm-yyyy;
 }
 else if(number < 10 && month < 10){
  return '0'+date + '.' + '0'+month + '.' + year;//format: dd-mm-yyyy;
 }
 else if(number > 9 && month < 10){
  return date + '.' + '0'+month + '.' + year;//format: dd-mm-yyyy;
 }
 else{
  return date + '.' + month + '.' + year;//format: dd-mm-yyyy;
 }
 
}


export default function VakitScreen({ route, navigation }){
    const [timeDataSQL, setTimeDataSQL] = useState([]);              //30 günlük sqlden cekilen bilgi
    const [timeDataCurrentDay, setTimeDataCurrentDay] = useState([]); //bugüne ait olan bilgi
    const [firstRun, setFirstRun] = useState(true);
    const [nextTime, setNextTime] = useState(false);
    const [firstRun2, setFirstRun2] = useState(true);
    const [dataIsReady, setDataIsReady] = useState(false);
    const [currentDayFound, setCurrentDayFound] = useState(false);   //sqlde bugüne ait bilgi yoksa false olarak kalir
    const [items2, setItems2] = useState([]);
    const [empty, setEmpty] = useState([]);
    const [dataWrited, setDataWrited] = useState(true);
    const [simulation, setSimulation] = useState(true);
    const [items, setItems] = useState([]);
    const [simdikiVakit,setSimdikiVakit] = useState("");
    const [sonrakiVakit,setSonrakiVakit] = useState("");
    var bos = [];
    var tru = true;
    var fals = false;

    useEffect(() => {
      
     if(route.params){
     console.log("efect 2");
     setDataIsReady(fals);
     setCurrentDayFound(fals);
     setFirstRun(tru);
     setSimulation(tru);
     setTimeDataCurrentDay(bos);
     setTimeDataSQL(bos);
     setItems2(bos);
     setFirstRun2(tru);
     }
     
 }, [route]);

    

    useEffect(() => {
      
        if(firstRun){
          console.log("worked...");
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
                  console.log(temp[i].miladitarihkisa);
                  temp2.push(results.rows.item(i));
                  setTimeDataCurrentDay(temp2);
                  setCurrentDayFound(true);
                }
                else if( i == results.rows.length-1 && !temp2.length){
                  console.log("silme basladi");
                  db.transaction(tx => {

                    tx.executeSql(
                      "delete from items;"
                    );
                  });
                  setSimulation(false);
                  Alert.alert(
                    "UYARI",
                    "Uygulamanın güncellenmesi gerekmektedir. Lütfen yeniden başlatınız.",
                    [
                      { text: "KAPAT", onPress: () => {return BackHandler.exitApp(); }}
                    ]
                  );
                }
              }
              setTimeDataSQL(temp);
    
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
 

}, [firstRun]);
const timeFunc = (time) =>{
  return time.split(':');
}

useEffect(() => {
  if(timeDataCurrentDay[0] == null || timeDataCurrentDay.length < 1){
    console.log("current day err");
  }
  else if (firstRun2){
    console.log("safe");
     var itemsTemp = [
        { name: 'İMSAK', vakit: timeDataCurrentDay[0].imsak },
        { name: 'GÜNEŞ', vakit: timeDataCurrentDay[0].gunes },
        { name: 'ÖĞLE', vakit: timeDataCurrentDay[0].ogle },
        { name: 'İKİNDİ', vakit: timeDataCurrentDay[0].ikindi },
        { name: 'AKŞAM', vakit: timeDataCurrentDay[0].aksam },
        { name: 'YATSI', vakit: timeDataCurrentDay[0].yatsi }
    ]
     
    const d = new Date();
    var nextTime = "";
    var imsakTime = timeFunc(timeDataCurrentDay[0].imsak);
    var gunesTime = timeFunc(timeDataCurrentDay[0].gunes);
    var ogleTime = timeFunc(timeDataCurrentDay[0].ogle);
    var ikindiTime = timeFunc(timeDataCurrentDay[0].ikindi);
    var aksamTime = timeFunc(timeDataCurrentDay[0].aksam);
    var yatsiTime = timeFunc(timeDataCurrentDay[0].yatsi);
    tempNow = (d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds()); 
    
    if(tempNow < ((+gunesTime[0]) * 60 * 60 + (+gunesTime[1]) * 60 + 1) && tempNow > ((+imsakTime[0]) * 60 * 60 + (+imsakTime[1]) * 60 + 1)){
      nextTime=gunesTime;
      setSimdikiVakit("IMSAK");
      setSonrakiVakit("Güneş");
    } 
    else if(tempNow < ((+ogleTime[0]) * 60 * 60 + (+ogleTime[1]) * 60 + 1) && tempNow > ((+gunesTime[0]) * 60 * 60 + (+gunesTime[1]) * 60 + 1)){
      nextTime=ogleTime;
      setSimdikiVakit("GÜNEŞ");
      setSonrakiVakit("Öğle");
    }
    else if(tempNow < ((+ikindiTime[0]) * 60 * 60 + (+ikindiTime[1]) * 60 + 1) && tempNow > ((+ogleTime[0]) * 60 * 60 + (+ogleTime[1]) * 60 + 1)){
      nextTime=ikindiTime;
      setSimdikiVakit("ÖĞLE");
      setSonrakiVakit("İkindi");
    }
    else if(tempNow< ((+aksamTime[0]) * 60 * 60 + (+aksamTime[1]) * 60 + 1) && tempNow > ((+ikindiTime[0]) * 60 * 60 + (+ikindiTime[1]) * 60 + 1)){
      nextTime=aksamTime;
      setSimdikiVakit("İKİNDİ");
      setSonrakiVakit("Akşam");
    }
    else if(tempNow< ((+yatsiTime[0]) * 60 * 60 + (+yatsiTime[1]) * 60 + 1) && tempNow > ((+aksamTime[0]) * 60 * 60 + (+aksamTime[1]) * 60 + 1)) 
    {
      nextTime=yatsiTime;
      setSimdikiVakit("AKŞAM");
      setSonrakiVakit("Yatsı");
    }
    else 
    {
      nextTime=imsakTime;
      setSimdikiVakit("YATSI");
      setSonrakiVakit("İmsak");
    }
    var secondCalc = d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds();
    var nextSeconds = (+nextTime[0]) * 60 * 60 + (+nextTime[1]) * 60 + 1 ; 
    var prevSeconds = secondCalc; 
    
    if(nextSeconds<prevSeconds){
      nextSeconds = nextSeconds + 86400;
    }
    
    var seconds = (Math.abs(nextSeconds-prevSeconds));
    setNextTime(seconds);
    console.log(seconds);

     setItems2(itemsTemp);
     setFirstRun2(false);
     setDataIsReady(true);
     console.log("data ready");
     
   }
});

const reSetter = () => {
 
  navigation.reset({
    index:0,
    routes:[{name:'Vakit'}],
  })
  
}

  

const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var day = new Date().getDay(); //Current day
    
    if(day == 0){day = 'Pazar'}
    else if(day == 1){day = 'Pazartesi'}
    else if(day == 2){day = 'Salı'}
    else if(day == 3){day = 'Çarşamba'}
    else if(day == 4){day = 'Perşembe'}
    else if(day == 5){day = 'Cuma'}
    else if(day == 6){day = 'Cumartesi'}

    if(month ==1){month = 'Ocak'};
    if(month ==2){month = 'Şubat'};
    if(month ==3){month = 'Mart'};
    if(month ==4){month = 'Nisan'};
    if(month ==5){month = 'Mayıs'};
    if(month ==6){month = 'Haziran'};
    if(month ==7){month = 'Temmuz'};
    if(month ==8){month = 'Ağustos'};
    if(month ==9){month = 'Eylül'};
    if(month ==10){month = 'Ekim'};
    if(month ==11){month = 'Kasım'};
    if(month ==12){month = 'Aralık'};
    
    

    if(min < 10) min = "0"+min;
    if(hours < 10) hours = "0"+hours;
    setCurrentDate(
      date+' '+month+' '+day+'\n'+hours+':'+min
    );
  }, []);

    
   // console.log(timeDataSQL);
      //<Text>İmsak: {timeData[0].Imsak} Güneş: {timeData[0].Gunes} Öğle: {timeData[0].Ogle} İkindi: {timeData[0].Ikindi} Akşam: {timeData[0].Aksam} Yatsı: {timeData[0].Yatsi} </Text>
// <Text>İmsak:{timeDataSQL[0].imsak} Güneş:{timeDataSQL[0].gunes} Öğle:{timeDataSQL[0].ogle} İkindi:{timeDataSQL[0].ikindi} Akşam:{timeDataSQL[0].aksam} Yatsı:{timeDataSQL[0].yatsi}</Text>

   //Future date - current date


    return (
      <View style={styles.container}>
        
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    
    
  
       
        {dataIsReady? (
        
        <View style={styles}>
          <View style={styles.ust}>
           <View style={styles.konum1}>
           <Text style={styles.konum1Text}>{timeDataCurrentDay[0].districtname},{timeDataCurrentDay[0].cityname},{timeDataCurrentDay[0].countryname}</Text>
          
        </View>

          <View style={styles.vakit1}>
          <Text style={styles.saatText}>
            {currentDate}
          </Text>
          <Text style={[styles.saatText,{fontSize:40}]}>
            {simdikiVakit}
          </Text>
         </View>
          
          </View>
            <Text style={styles.timerText}>{sonrakiVakit} Vaktine Kalan Süre</Text>
            <CountDown

            
         size={30}
         until={nextTime}
         onFinish={() => reSetter()}
         digitStyle={{backgroundColor: '#211F35', borderWidth: 2, borderColor: '#0A0909',borderRadius: 10, opacity:0.80}}
         digitTxtStyle={{color: '#FFFFFF'}}
         timeLabelStyle={{color: '#211F35', fontWeight: 'bold',}}
         separatorStyle={{color: '#0A0909'}}
         timeToShow={['H', 'M', 'S']}
         timeLabels={{h:'Saat', m: 'Dakika', s: 'Saniye'}}
         
      />
        <View/>
        <SectionGrid
            itemDimension={110}
            sections={[
                {
                data: items2.slice(0, 6),
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
       
    </View>
        
        
        ) : ( 
          <View style={{flex:1,alignItems: 'center',justifyContent: 'center',minWidth: "100%"}}>
          <Text>Lütfen Konumunuzu Giriniz...</Text>
          </View>
            )}
            
            </ImageBackground>
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
  vakit1:{
    backgroundColor:'#1A211F35',
    margin:10,
    borderWidth: 2, 
    borderColor: '#0A0909',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
},
gridView:{
  flex:1,
},
ust:{
  flex:1,
},
  konum1:{
      flex:0.5,
      color: 'white',
      textAlign:'center',
      marginTop:5,
      alignItems: 'center',
      justifyContent: 'center',
  },
  konum1Text:{
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    textAlign:'center',
}, 
timerText:{
  fontSize: 20,
  color: 'white',
  fontWeight: 'bold',
  textAlign:'center',
  margin:10,
  backgroundColor:'black',
  opacity:0.8,

}, 
saatText:{
  fontSize: 24,
  color: '#fff',
  fontWeight: 'bold',
  textAlign:'center',
},


  largeText:{
      fontSize:18
  },
  image: {
    flex: 1,
    justifyContent: "center",
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
      flex:0.3,
      justifyContent: 'flex-end',
      borderRadius: 10,
      padding: 10,
      height: 75,
      backgroundColor: '#211F35',
      borderWidth: 2, 
      borderColor: '#0A0909',
      opacity:0.85,
      
      alignItems: 'center',
      
    },
   
    
    saat: {
      fontSize: 15,
      color: '#fff',
      fontWeight: 'bold',
      textAlign:'center',
      
    },
    vakit: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#fff',
    },
    sectionHeader: {
      flex: 1,
      fontSize: 15,
      fontWeight: '600',
      alignItems: 'center',
      backgroundColor: '#24B6C3',
      color: 'white',
      padding: 10,
    },
  });