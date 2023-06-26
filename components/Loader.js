import React from 'react'
import { SafeAreaView, StyleSheet, Image } from 'react-native';

import Colors from '../constants/Colors';
import { ActivityIndicator } from '@react-native-material/core';

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
        marginHorizontal: -55,
        height: '70%'
    },
})
