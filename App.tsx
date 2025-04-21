import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import TelaInicial from './src/screens/TelaInicial';
import Jogadores from './src/screens/Jogadores';
import GerarPalavra from './src/screens/GerarPalavra';
import DistribuirCartas from './src/screens/DistribuirCartas';

// Define o tipo das rotas e seus parâmetros
export type RootStackParamList = {
  TelaInicial: undefined;
  Jogadores: undefined;
  GerarPalavra: undefined;
  DistribuirCartas: undefined;
};

// Tipamos o Stack Navigator com o tipo das rotas
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="Jogadores" component={Jogadores} />
        <Stack.Screen name="GerarPalavra" component={GerarPalavra} />
        <Stack.Screen name="DistribuirCartas" component={DistribuirCartas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
