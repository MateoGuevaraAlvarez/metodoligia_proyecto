import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./components/Hompagecomps/Homepage";
import { Planta } from "./components/Hompagecomps/planta";
import { InicioSesion } from "./components/InicioComps/InicioSesion";
const Stack = createNativeStackNavigator();
console.log("App.js is running");

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={InicioSesion}
                />
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
