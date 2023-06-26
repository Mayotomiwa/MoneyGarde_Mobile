import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Button, HStack, Text } from '@react-native-material/core';
import { useState, useEffect } from 'react';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Portal, Provider } from 'react-native-paper';

import Colors from '../constants/Colors';
import BudgetCard from '../components/BudgetCard';
import { useBudgets } from '../contexts/AppContexts';
import { UNCATEGORIZED_BUDGET_ID } from '../contexts/AppContexts';

import AddBudget from '../components/AddBudget';
import AddExpense from '../components/AddExpense';
import ViewExpenses from '../components/ViewExpenses';
import Uncategorized from '../components/Uncategorized';
import TotalCard from '../components/TotalCard';

export default function Home() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showExpense, setshowExpense] = useState(false)
    const [showAddExpenseModal, setshowAddExpenseModal] = useState(false);
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
    const [dataloaded, setDataLoaded] = useState(false);
    const { budgets, getBudgetExpenses } = useBudgets()

    function openAddExpenseModal(budgetId) {
        setshowAddExpenseModal(true)
        setshowExpense(budgetId)
    }
    function loaded() {
        if (budgets.length === 0) {
            setDataLoaded(false);
        } else {
            setDataLoaded(true);
        }
    }
    useEffect(() => {
        loaded();
    }, [budgets, dataloaded]);

    return (
        <Provider>
            <ScrollView style={styles.container}>
                <Text variant='h4' style={styles.name}>MoneyGrade</Text>
                <Text variant='h6' style={styles.subText}>Hi There <Icon name='hand-wave' style={styles.icon} /></Text>
                <HStack spacing={20}>
                    <Button variant="contained" title="Add Budget" style={styles.btn} onPress={() => setShowAddBudgetModal(true)} />
                    <Button variant='outlined' title="Add Expense" style={styles.btn2} color={Colors.garde} onPress={openAddExpenseModal} />
                </HStack>
                <View style={styles.bodyContainer}>
                    {!dataloaded ? (
                        <View style={styles.placeholderContainer}>
                            <Image source={require('../assets/images/noData.png')} style={styles.placeholderImage} />
                            <Text style={styles.dataText}>No budget available yet</Text>
                        </View>
                    ) : (
                        budgets.map(budget => {
                            const amount = getBudgetExpenses(budget.id).reduce(
                                (total, expense) => total + expense.amount, 0
                            )
                            return (
                                <BudgetCard
                                    key={budget.id}
                                    name={budget.name}
                                    amount={amount}
                                    max={budget.max}
                                    onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                                    onViewExpensesClick={() =>
                                        setViewExpensesModalBudgetId(budget.id)
                                    }
                                />
                            )
                        })
                    )}

                    <Uncategorized
                        onAddExpenseClick={openAddExpenseModal}
                        onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
                    />
                    <TotalCard />
                </View>
            </ScrollView>
            {showAddBudgetModal &&
                <Portal>
                    <AddBudget show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
                </Portal>}
            {showAddExpenseModal &&
                <Portal>
                    <AddExpense show={showAddExpenseModal} defaultBudgetId={showExpense} handleClose={() => setshowAddExpenseModal(false)} />
                </Portal>}
            {viewExpensesModalBudgetId &&
                <Portal>
                    <ViewExpenses budgetId={viewExpensesModalBudgetId} handleClose={setViewExpensesModalBudgetId} />
                </Portal>}
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 70,
    },
    name: {
        marginHorizontal: 20,
        fontStyle: 'italic',
        color: Colors.garde,
    },
    subText: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontStyle: 'italic',
        color: Colors.garde,
    },
    icon: {
        fontSize: 30,
        fontWeight: 'normal',
        textAlign: 'right',
        color: Colors.warning,
    },
    bodyContainer: {
        display: 'grid',
        gap: 5,
        alignItems: 'flex-start',
    },
    btn: {
        padding: 10,
        backgroundColor: Colors.garde,
        left: 30,
        top: 10,
        width: '40%',
        marginVertical: 20,
    },
    btn2: {
        padding: 10,
        borderColor: Colors.garde,
        borderWidth: 2,
        left: 30,
        top: 10,
        width: '42%',
        marginVertical: 20,
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        marginTop: 60,
        opacity: 0.4,
        width: 200,
        height: 200,
    },
    dataText: {
        marginTop: 20,
        fontSize: 25,
        opacity: 0.4
    }
});

