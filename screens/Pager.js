import { Button, HStack } from '@react-native-material/core';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Loader from '../components/Loader';
import Colors from '../constants/Colors';
import { slides } from '../constants/Slider';

const { width, height } = Dimensions.get('window')

const Slide = ({ item }) => {
    return (
        <View style={styles.FlatList}>
            <Image source={item.image} style={{ height: '60%', width, resizeMode: 'contain' }} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
    )
}

export default function Pager({ navigation }) {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef();

    const handlePress = () => {
        setIsLoading(true);
        // Simulate a network request
        setTimeout(() => {
            setIsLoading(false);
            navigation.replace('Home');
        }, 3000);
    };

    const Btn = () => {
        return (
            <Button
                variant='Contained'
                title="Get Started"
                style={styles.btn2}
                color={Colors.garde}
                onPress={handlePress} />

        )
    }


    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };
    const goToPrevSlide = () => {
        const prevSlideIndex = currentSlideIndex - 1;
        if (prevSlideIndex != slides.reverse.length - 1) {
            const offset = prevSlideIndex * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };
    const skipSlides = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
    };
    const Footer = () => {
        return (
            <View style={styles.Footer}>
                <View style={styles.indicatorContainer}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                currentSlideIndex == index && {
                                    backgroundColor: Colors.white,
                                    width: 25,
                                },
                            ]}
                        />
                    ))}
                </View>
                {currentSlideIndex === slides.length - 1 ? <Btn /> :
                    <HStack spacing={'20%'} style={{marginVertical: 10}}>
                        <Button variant='outlined' title="Previous" style={styles.btnPrev} color={Colors.white} onPress={goToPrevSlide} />
                        <Button variant='outlined' title="Next" style={styles.btnNext} color={Colors.white} onPress={goToNextSlide} />
                    </HStack>}
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Button variant='text' title="Skip" style={styles.skip} color={Colors.white} onPress={skipSlides} />
                    <FlatList
                        ref={ref}
                        data={slides}
                        onMomentumScrollEnd={updateCurrentSlideIndex}
                        contentContainerStyle={{ height: height * 0.75 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        pagingEnabled
                        renderItem={({ item }) => <Slide item={item} />} />

                    <Footer />
                </>
            )}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.garde,
    },
    skip: {
        marginLeft: '70%',
        marginTop: '15%',
        bottom: 10,
        marginHorizontal: 10,
        textAlign: 'right',
        padding: 5,
    },
    FlatList: {
        alignItems: 'center',
    },
    header: {
        fontFamily: 'Helvetica Neue',
        fontStyle: 'italic',
        color: Colors.white,
        textAlign: 'center',
        top: 100,
        fontSize: 46,
    },
    title: {
        color: Colors.white,
        textAlign: 'center',
        bottom: 80,
        fontSize: 26,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    subtitle: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 15,
        bottom: 50,
        lineHeight: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    Footer: {
        height: height * 0.16,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: 'grey',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    btn: {
        marginHorizontal: 10,
        justifyContent: 'space-evenly',
        marginVertical: 20,
        padding: 5,
    },
    btnPrev: {
        justifyContent: 'space-evenly',
        marginVertical: 10,
        marginHorizontal: 5,
        width: '38%',
        padding: 5,
    },
    btnNext: {
        justifyContent: 'space-evenly',
        marginVertical: 10,
        marginHorizontal: 5,
        width: '38%',
        padding: 5,
    },
    btn2: {
        marginHorizontal: 15,
        marginVertical: 30,
        padding: 8,
        backgroundColor: Colors.white,
    },
});