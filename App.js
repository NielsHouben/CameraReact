import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useEffect } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <Button
            title="Go to Jane's profile"
            onPress={() =>
                navigation.navigate('Profile', { name: 'Jane' })
            }
        />
    );
};
const ProfileScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const App = () => {
    //       useEffect(() => {
    //     // this code will run once
    //   }, [])
    console.log("Hello world! (GO GYM!) ");
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Text>GO GYM!</Text>
                <StatusBar style="auto" />
            </NavigationContainer>
        </View>
    );
};
export default App;
// export default MyStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

