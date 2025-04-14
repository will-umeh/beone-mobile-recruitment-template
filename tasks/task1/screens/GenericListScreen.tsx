import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SectionList, Text, TextInput, View, Alert } from 'react-native';

export type GenericListScreenProps = {
    fetcher: () => Promise<any[]>;
    renderItem: (item: any) => JSX.Element;
    keyExtractor: (item: any, index: number) => string;
    filterBy: string;
    debounceTs?: number;
};

type Data = { type: string } & Record<string, string | number>;

export function GenericListScreen(props: GenericListScreenProps) {
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

    return loading ? (
        <View>
            <Text>Loading...</Text>
        </View>
    ) : (
        <>
            <TextInput
                testID="searchInput"
                placeholder="Search"
                onChangeText={handleSetFilterValue}
                clearButtonMode="while-editing"
                value={filterValue}
            />
            <SectionList
                testID="mainList"
                sections={filteredData.reduce((acc: { title: string; data: any[] }[], item) => {
                    const section = acc.find(section => section.title === item.type);
                    if (section) {
                        section.data.push(item);
                    } else {
                        acc.push({ title: item.type, data: [item] });
                    }
                    return acc;
                }, [])}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                bounces={false}
                initialNumToRender={15}
                renderSectionHeader={({ section: { title } }) => <Text testID="sectionHeader">{title}</Text>}
            />
        </>
    );
}
