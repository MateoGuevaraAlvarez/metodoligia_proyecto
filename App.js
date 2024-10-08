import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./components/Hompagecomps/Homepage";  
import { Planta } from "./components/Hompagecomps/planta"; 
const Stack = createNativeStackNavigator();
console.log("App.js is running");

const App = () => {
    return (
        <NavigationContainer>  
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomePage}
                />
                <Stack.Screen
                    name="Plant"
                    component={Planta}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
