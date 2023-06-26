import * as React from 'react';
import { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import { Button, HStack, IconButton, Text } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Picker } from '@react-native-picker/picker';

import Colors from '../constants/Colors';
import { useBudgets } from '../contexts/AppContexts';
import { UNCATEGORIZED_BUDGET_ID } from '../contexts/AppContexts';

export default function AddBudget({ show, handleClose, defaultBudgetId }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [budgetId, setBudgetId] = useState('');


    const descriptionRef = useRef();
    const amountref = useRef()
    const budgetIdRef = useRef()

    const { addExpense, budgets } = useBudgets()


    function handleSubmit(e) {
        e.preventDefault();
        // console.log("description:", description);
        // console.log("amount:", amount);
        // console.log("budgetId:", budgetId);
        addExpense({
            description: description,
            amount: parseFloat(amount),
            budgetId: budgetId,

        });
        handleClose();
    }

    const containerStyle = { backgroundColor: 'white', padding: 20, height: "70%" };

    const handleDescriptionChangeText = (text) => {
        setDescription(text);
    }
    const handleAmountChangeText = (text) => {
        setAmount(text);
    };
    const handleIdChangeText = (text) => {
        setBudgetId(text);
    }
    return (
        <Provider>
            <Portal>
                <Modal visible={show} onDismiss={handleClose} contentContainerStyle={containerStyle}>
                    <ScrollView>
                        <HStack spacing={180}>
                            <Text variant='h5' color={Colors.garde} style={styles.header}>Add Expense</Text>
                            <IconButton
                                icon={props => <Icon style={styles.icon} name="close" {...props} />}
                                onPress={handleClose}
                            />
                        </HStack>
                        <View>
                            <Text variant='h6' color={Colors.garde} style={styles.text}>Name</Text>
                            <TextInput
                                value={description}
                                ref={descriptionRef}
                                onChangeText={handleDescriptionChangeText}
                                style={[styles.input, styles.inputContainer]}
                                placeholder="Enter your Budget name"
                            />
                            <Text variant='h6' color={Colors.garde} style={styles.text}>Maximum Spending</Text>
                            <TextInput
                                value={amount}
                                ref={amountref}
                                onChangeText={handleAmountChangeText}
                                style={[styles.input, styles.inputContainer]}
                                keyboardType="numeric"
                                placeholder="Enter a number"
                            />
                            <Text variant='h6' color={Colors.garde} style={styles.budgetText}>Budget</Text>
                            <Picker
                                selectedValue={budgetId}
                                onValueChange={handleIdChangeText}
                                ref={budgetIdRef}
                                mode="dropdown"
                                style={styles.pickerContainer}
                            >
                                <Picker.Item 
                                testID={UNCATEGORIZED_BUDGET_ID}
                                selectedValue ={defaultBudgetId}
                                label='Uncategorized'
                                />
                                {budgets.map(budget => (
                                    <Picker.Item
                                        label={budget.name}
                                        value={budget.id}
                                        key={budget.id}
                                        color={Colors.garde}
                                    />
                                ))}
                            </Picker>

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
    budgetText: {
        textAlign: 'left',
        fontStyle: 'italic',
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
    pickerContainer: {
        marginVertical: -60,
        paddingRight: 20,
    },
    input: {
        fontSize: 16,
        color: 'black',
        borderColor: Colors.garde,
    },
})
