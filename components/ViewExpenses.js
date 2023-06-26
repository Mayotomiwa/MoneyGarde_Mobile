import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import { Button, HStack, IconButton, Stack, Text } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Colors from '../constants/Colors';
import { useBudgets } from '../contexts/AppContexts';
import { UNCATEGORIZED_BUDGET_ID } from '../contexts/AppContexts';
import { currencyFormatter } from '../utils/utils';

export default function ViewExpenses({ budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? {
        name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID
    } :
        budgets.find(b => b.id == budgetId)

    const expenses = getBudgetExpenses(budgetId)


    const containerStyle = { backgroundColor: 'white', padding: 10, height: "50%", innerWidth: '100%', outerWidth: '100%' };

    return (
        <Provider>
            <Portal>
                <Modal visible={budgetId != null} onDismiss={handleClose} contentContainerStyle={containerStyle}>
                    <ScrollView>
                        <HStack spacing={35} style = {{width: '100%'}}>
                            <Text variant='h5' color={Colors.garde} style={styles.header}>Expense-{budget?.name}</Text>
                            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                <Button variant='outlined' title='Delete' style={{
                                    padding: 5,
                                    borderColor: Colors.red,
                                    borderWidth: 2,
                                    marginHorizontal: -50,
                                    width: '30%',
                                }} color={Colors.red} onPress={() => {
                                    deleteBudget(budget)
                                    handleClose()
                                }} />
                            )}
                            <IconButton
                                icon={props => <Icon style={styles.icon} name="close" {...props} />}
                                onPress={() => handleClose()}
                            />
                        </HStack>
                        <View>
                            <Stack spacing={10}>
                                {expenses.map(expense => (
                                    <HStack spacing={30} key={expense.id} style={{ alignItems: 'baseline', width: '100%' }}>
                                        <View  style = {{width: '35%'}}>
                                            <Text variant='h6' color={Colors.garde}> {expense.description} </Text>
                                        </View>
                                        <View style = {{width: '35%'}}>
                                            <Text variant='h6' color={Colors.garde}>{currencyFormatter.format(expense.amount)}</Text>
                                        </View>
                                        <View>
                                            <IconButton
                                                icon={props => <Icon style={styles.icon2} name="delete" {...props} />}
                                                onPress={() => deleteExpense(expense)}
                                            />
                                        </View>

                                    </HStack>
                                ))}
                            </Stack>
                        </View>
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
    },
    icon2: {
        fontSize: 30,
        top: 10,
        marginVertical: -200,
        color: Colors.red,
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
        fontWeight: 'bold',
        width: '55%',
    },
})
