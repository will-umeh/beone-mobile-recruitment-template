import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

type NavigationItemProps = {
    text: string;
    icon: keyof (typeof FontAwesome)['glyphMap'];
    page: Parameters<typeof router.navigate>[0];
    size?: number;
};

export function NavigationItem({ text, page, icon, size = 20 }: NavigationItemProps) {
    return (
        <Pressable style={styles.row} onPress={() => router.navigate(page)}>
            <FontAwesome size={size} name={icon} />
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 12,
        marginLeft: 12,
        alignItems: 'center',
    },
    text: {
        fontWeight: 400,
        fontSize: 24,
        color: '#131313',
    },
});
