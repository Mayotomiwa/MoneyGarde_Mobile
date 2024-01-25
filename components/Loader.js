import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native';

import { ActivityIndicator } from '@react-native-material/core';
import Colors from '../constants/Colors';

const { width, height } = Dimensions.get('window')

export default function Loader() {
  return (
    <SafeAreaView style = {styles.container}>
        <Image source = {require('../assets/images/MoneyGardefull.png')} style = {styles.image}/>

        <ActivityIndicator size="large" color= {Colors.white}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.garde,
    },
    image: {
      width: width,
        height: '65%',
    },
})
