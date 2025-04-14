import { NavigationItem } from '@/common/NavigationItem';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export function MainPage() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.header}>List of tasks</Text>
                <NavigationItem text={'Task One'} icon={'code'} page={'/(task-one)/task-one'} />
                <NavigationItem text={'Task Two'} icon={'code'} page={'/(task-two)/task-two'} />
                <NavigationItem text={'Task Three'} icon={'code'} page={'/(task-three)/task-three'} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 12,
    },
    header: {
        fontWeight: 500,
        fontSize: 32,
        color: '#111',
        textAlign: 'center',
    },
});
