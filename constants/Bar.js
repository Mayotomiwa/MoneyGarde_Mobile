import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import Colors from './Colors';

export default function Progress({ now, max, height }) {
    const [width, SetWidth] = useState(0);
    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const reactive = useRef(new Animated.Value(-1000)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [])
    useEffect(() => {
        reactive.setValue(-width + width * now / max);

    }, [now, width])

    return (
        <View
            onLayout={e => {
                const newWidth = e.nativeEvent.layout.width;

                SetWidth(newWidth);
            }}
            style={{
                height,
                backgroundColor: now >= max * 0.9 ? Colors.red : Colors.bar,
                borderRadius: height,
                overflow: 'hidden',

            }}>
            <Animated.View style={{
                height,
                width: '100%',
                backgroundColor: now >= max * 0.75 ? Colors.red : now >= max * 0.5 ? Colors.warning : Colors.garde,
                borderRadius: height,
                position: 'absolute',
                left: 0,
                top: 0,
                transform: [{
                    translateX: animatedValue,
                }]

            }} />
        </View>
    )
}
