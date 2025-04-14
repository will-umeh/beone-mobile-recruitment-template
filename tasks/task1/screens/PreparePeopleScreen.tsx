import { fetchPeople, Person } from '@/tasks/task1/api/people';
import { GenericListScreen, GenericListScreenProps } from '@/tasks/task1/screens/GenericListScreen';
import { Text, View } from 'react-native';

const keyExtractor = (item: Person, index: number) => item.firstName + item.lastName + index;
const renderItem = function ({ item }: { item: Person }) {
    return (
        <View>
            <Text>
                {item.firstName} {item.lastName}
            </Text>
            <Text>{item.title}</Text>
        </View>
    );
};

export function PreparePeopleScreen({ filterBy = 'title', ...rest }: Pick<GenericListScreenProps<Person>, 'debounceTs' | 'filterBy'> = {}) {
    return <GenericListScreen keyExtractor={keyExtractor} fetcher={fetchPeople} renderItem={renderItem} filterBy={filterBy} {...rest} />;
}
