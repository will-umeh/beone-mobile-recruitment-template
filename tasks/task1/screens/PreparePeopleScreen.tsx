import { fetchPeople, Person } from '@/tasks/task1/api/people';
import { GenericListScreen, GenericListScreenProps } from '@/tasks/task1/screens/GenericListScreen';
import { Text, View, StyleSheet } from 'react-native';

const keyExtractor = (item: Person, index: number) => item.firstName + item.lastName + index;

const renderItem = function ({ item }: { item: Person }) {
    return (
        <View style={styles.section}>
            <Text style={styles.bodyText}>
                <Text style={styles.boldText}>Name:</Text> {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.bodyText}>
                <Text style={styles.boldText}>Title:</Text> {item.title}
            </Text>
        </View>
    );
};

export function PreparePeopleScreen({ filterBy = 'title', ...rest }: Partial<Pick<GenericListScreenProps<Person>, 'debounceTs' | 'filterBy'>> = {}) {
    return <GenericListScreen keyExtractor={keyExtractor} fetcher={fetchPeople} renderItem={renderItem} filterBy={filterBy} {...rest} />;
}

const styles = StyleSheet.create({
    section: {
        padding: 16,
        backgroundColor: '#ccc',
        borderRadius: 8,
    },
    bodyText: {
        fontSize: 16,
    },
    boldText: {
        fontWeight: 'bold',
    },
});
