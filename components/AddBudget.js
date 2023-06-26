import * as React from 'react';
import { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import { Button, HStack, IconButton, Text } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Colors from '../constants/Colors';
import { useBudgets } from '../contexts/AppContexts';

export default function AddBudget({ show, handleClose }) {
    const [name, setName] = useState('');
    const [max, setMax] = useState('');
    const nameRef = useRef()
    const maxRef = useRef()

    const { addBudget } = useBudgets()

    function handleSubmit(e) {
        e.preventDefault();
        // console.log("name:", name);
        // console.log("max:", max);
        addBudget({
            name: name,
            max: parseFloat(max),
        });
        handleClose();
    }

    const containerStyle = { backgroundColor: 'white', padding: 20, height: "70%", width: "100%"};

    const handleNameChangeText = (text) => {
        setName(text);
    }
    const handleNumChangeText = (text) => {
        setMax(text);
    };
    return (
        <Provider>
            <Portal>
                <Modal visible={show} onDismiss={handleClose} contentContainerStyle={containerStyle}>
                    <ScrollView>
                        <HStack spacing={180}>
                            <Text variant='h5' color={Colors.garde} style={styles.header}>Add Budget</Text>
                            <IconButton
                                icon={props => <Icon style={styles.icon} name="close" {...props} />}
                                onPress={handleClose}
                            />
                        </HStack>
                        <View>
                            <Text variant='h6' color={Colors.garde} style={styles.text}>Name</Text>
                            <TextInput
                                value={name}
                                ref={nameRef}
                                onChangeText={handleNameChangeText}
                                style={[styles.input, styles.inputContainer]}
                                placeholder="Enter your name"
                            />
                            <Text variant='h6' color={Colors.garde} style={styles.text}>Maximum Spending</Text>
                            <TextInput
                                value={max}
                                ref={maxRef}
                                onChangeText={handleNumChangeText}
                                style={[styles.input, styles.inputContainer]}
                                keyboardType="numeric"
                                placeholder="Enter a number"
                            />
                        </View>
                        <Button
                            variant='contained'
                            title='Add'
                            titleStyle={{ fontStyle: 'italic' }}
                            style={styles.btn} color={Colors.garde}
                            onPress={handleSubmit} />
                    </ScrollView>
                </Modal>
            </Portal>
        </Provider>
    );
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 40,
        fontWeight: 'normal',
        textAlign: 'right',
        color: Colors.garde,
        marginBottom: 10,
    },
    btn: {
        marginHorizontal: 20,
        marginVertical: 50,
        padding: 8,
        backgroundColor: Colors.garde,
    },
    btn2: {
        marginTop: 90,
        padding: 8,
        backgroundColor: Colors.garde,
    },
    text: {
        top: 20,
        fontStyle: 'italic',
        textAlign: 'left'
    },
    header: {
        textAlign: 'left',
        fontStyle: 'italic',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        height: 55,
        width: '90%',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        marginVertical: 30,
        padding: 10,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: Colors.garde,
    },
    input: {
        fontSize: 16,
        color: 'black',
        borderColor: Colors.garde,
    },
})
