import { Button, HStack, Text } from '@react-native-material/core';
import { StyleSheet, View } from 'react-native';
import { Card, Title } from 'react-native-paper';
import Progress from '../constants/Bar';
import Colors from '../constants/Colors';
import { currencyFormatter } from '../utils/utils';


export default function BudgetCard({ name, amount, max, onAddExpenseClick, onViewExpensesClick, hideButtons, Total }) {
    return (
        <Card style={styles.container}>
            <Card.Content>
                <Title>
                    <HStack spacing={50} style = {{width: '100%'}}>
                        <Text variant='h5' style={styles.name}>{name}</Text>
                        <Text style={{width: '60%'}}>
                            <Text variant='h6' style={styles.currency}>{currencyFormatter.format(amount)}</Text>
                            {max && <Text variant='body1' style={styles.currency2}> / {currencyFormatter.format(max)}</Text>}
                        </Text>
                    </HStack>
                </Title>
                <View style={!Total ? styles.ProgressBar : styles.ProgressBarTotal}>
                    {max && <Progress now={amount} max={max} height={20} />}
                </View>
            </Card.Content>
            <Card.Actions>
                {!hideButtons && <HStack spacing={10}>
                    <Button variant="contained" title="Add Expense" style={styles.btn} onPress={onAddExpenseClick} />
                    <Button variant='outlined' title="View Expense" style={styles.btn2} color={Colors.garde} onPress={onViewExpensesClick} />
                </HStack>}
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: Colors.AliceBlue,
        alignItems: 'center',
        alignItems: 'baseline',
        fontWeight: 'normal',
        padding: 10,
        height: 230,
        width: '100%',
        marginTop: 20,
    },
    name: {
        fontStyle: 'italic',
        color: Colors.garde,
        marginEnd: 10,
        width: '35%'
    },
    currency: {
        display: 'flex',
        alignItems: 'baseline',
        color: Colors.garde,
    },
    currency2: {
        marginStart: 10,
        fontSize: 15,
        color: Colors.grey,
        fontWeight: 'bold',
    },
    ProgressBar: {
        paddingTop: 30,
        width: '100%',
        justifyContent: 'center',
    },
    ProgressBarTotal: {
        paddingTop: 30,
        width: '100%',
        justifyContent: 'center',
    },
    btn: {
        padding: 8,
        backgroundColor: Colors.garde,
        left: 10,
        top: 15,
        width: '45%',
    },
    btn2: {
        padding: 8,
        borderColor: Colors.garde,
        borderWidth: 2,
        left: 10,
        top: 15,
        width: '45%',
    },
})


