import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Pressable, useEffect } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Button
                title="Go to Lorre's profile"
                onPress={() =>
                    navigation.navigate('Profile', { name: 'Lorre' })
                }
            />
            <Button
                title="Go to Lorre's canvas"
                onPress={() =>
                    navigation.navigate('Canvas')
                }
            />
            <Pressable style={styles.button} onPress={() => console.log("ooo")}>
                <Text style={styles.text}>{"Press Me!"}</Text>
            </Pressable>
        </View>
    );
};
const ProfileScreen = ({ navigation, route }) => {
    return (
        <View>
            <Text>This is {route.params.name}'s profile</Text>
            <Button
                title="wooo"
                style={styles.red}
                // color="#FF0020"
                onPress={() =>
                // navigation.navigate('Profile', { name: 'Lorre' })
                {
                    console.log("clickus", Math.random());
                }}
            />
            <Text>You've clicked {route.params.name} times</Text>
        </View>
    );
};
const CanvasScreen = ({ navigation }) => {
    return (
        <View>
        </View>
    );
};


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});


const App = () => {
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
export default App;

// const App = () => {
//     //       useEffect(() => {
//     //     // this code will run once
//     //   }, [])
//     console.log("Hello world! (GO GYM!) ");
//     return (
//         <View style={styles.container}>
//             <NavigationContainer>
//                 <Text>GO GYM!</Text>
//                 <StatusBar style="auto" />
//             </NavigationContainer>
//         </View>
//     );
// };
// export default App;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

