import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import AlertScreen from './AlertScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="AlertScreen" component={AlertScreen} options={{ title: 'Publicar una alerta' }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
