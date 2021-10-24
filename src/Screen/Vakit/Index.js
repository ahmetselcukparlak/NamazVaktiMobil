import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';


 

export default function VakitScreen({ route, navigation }) {
    const timeData = route.params;

    
  const [items, setItems] = React.useState([
    
    { name: 'IMSAK', code: '#34495e' },
    { name: 'GREEN SEA', code: '#16a085' },
    { name: 'NEPHRITIS', code: '#27ae60' },
    { name: 'BELIZE HOLE', code: '#2980b9' },
    { name: 'WISTERIA', code: '#8e44ad' },
    { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
    { name: 'SUN FLOWER', code: '#f1c40f' },
    { name: 'CARROT', code: '#e67e22' },
    { name: 'ALIZARIN', code: '#e74c3c' },
    
   
  ]);

  return (
    
   
    
    
  

    <SectionGrid



      itemDimension={110}
      
      sections={[
        {
          
          data: items.slice(0, 6),
          
        },
        
      ]}
      style={styles.gridView}

      
      renderItem={({ item, section, index ,timeData}) => (
        <View style={[styles.itemContainer, { backgroundColor: '#2c3e50' }]}>
          
          
          <Text style={styles.saat}>{timeData}</Text>
          <Text style={styles.vakit}></Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
      
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
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