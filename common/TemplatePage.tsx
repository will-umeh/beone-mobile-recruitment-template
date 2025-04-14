import { FontAwesome } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { PropsWithChildren, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function TemplatePage({ name, children }: PropsWithChildren<{ name: string }>) {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: name,
            headerLeft: () => (
                <Pressable onPress={router.back} hitSlop={24}>
                    <FontAwesome name={'chevron-left'} size={20} />
                </Pressable>
            ),
        });
    }, [name, navigation]);

    return <View style={styles.container}>{!children ? <Text style={styles.text}>{name}</Text> : children}</View>;
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontWeight: 500,
        fontSize: 32,
        color: '#111',
    },
});
