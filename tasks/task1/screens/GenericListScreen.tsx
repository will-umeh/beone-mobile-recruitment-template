import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SectionList, Text, TextInput, View, Alert, ListRenderItem, StyleSheet } from 'react-native';

export type GenericListScreenProps<T> = {
    fetcher: () => Promise<T[]>;
    renderItem: ListRenderItem<T>;
    keyExtractor: (item: T, index: number) => string;
    filterBy: string;
    debounceTs?: number;
};

type Data = { type: string } & Record<string, string | number>;

export function GenericListScreen<T extends { type: string }>(props: GenericListScreenProps<T>) {
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterValue, setFilterValue] = useState<string>('');

    const { fetcher, renderItem, keyExtractor, filterBy, debounceTs = 500 } = props;

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetcher();
            setData(response);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, [fetcher]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSetFilterValue = debounce(
        useCallback((value: string) => {
            setFilterValue(value);
        }, []),
        debounceTs,
    );

    const filteredData = useMemo(() => {
        if (!filterValue) return data;
        return data.filter(item => item[filterBy].toString().toLowerCase().includes(filterValue.toLowerCase()));
    }, [data, filterValue, filterBy]);

    if (error) {
        Alert.alert('Error', error);
        return null;
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <TextInput
                        style={styles.textInput}
                        testID="searchInput"
                        placeholder={`Search by ${filterBy}`}
                        onChangeText={handleSetFilterValue}
                        clearButtonMode="while-editing"
                    />
                    <SectionList
                        testID="mainList"
                        ListEmptyComponent={() => <Text testID="sectionEmptyState">No data found</Text>}
                        sections={filteredData.reduce((acc: { title: string; data: any[] }[], item) => {
                            const section = acc.find(section => section.title === item.type);
                            if (section) {
                                section.data.push(item);
                            } else {
                                acc.push({ title: item.type, data: [item] });
                            }
                            return acc;
                        }, [])}
                        SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
                        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        initialNumToRender={15}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.sectionTitle} testID="sectionHeader">
                                {title}
                            </Text>
                        )}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flex: 1,
        padding: 16,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '500',
    },
});
