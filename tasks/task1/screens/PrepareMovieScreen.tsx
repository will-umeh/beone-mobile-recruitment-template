import { fetchMovies, Movie } from '@/tasks/task1/api/movies';
import { GenericListScreen, GenericListScreenProps } from '@/tasks/task1/screens/GenericListScreen';
import { Text } from 'react-native';

const keyExtractor = (item: Movie) => item.title;
const renderItem = function ({ item }: { item: Movie }) {
    return <Text style={{ fontSize: 16 }}>{item.title}</Text>;
};

export function PrepareMovieScreen({ filterBy = 'title', ...rest }: Partial<Pick<GenericListScreenProps<Movie>, 'debounceTs' | 'filterBy'>> = {}) {
    return <GenericListScreen keyExtractor={keyExtractor} fetcher={fetchMovies} renderItem={renderItem} filterBy={filterBy} {...rest} />;
}
