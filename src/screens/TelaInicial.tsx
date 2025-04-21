import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Importa o tipo das rotas
import { Picker } from '@react-native-picker/picker';

// Tipamos as props da tela
type Props = StackScreenProps<RootStackParamList, 'TelaInicial'>;

const TelaInicial: React.FC<Props> = ({ navigation }) => {
  const [numJogadores, setNumJogadores] = useState<number>(3);

  const salvarQuantidade = async () => {
    try {
      await AsyncStorage.setItem('numJogadores', numJogadores.toString());
      navigation.navigate('Jogadores');
    } catch (e) {
      console.error('Erro ao salvar a quantidade de jogadores', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o Número de Jogadores</Text>
      <Picker
        selectedValue={numJogadores}
        style={styles.picker}
        onValueChange={(itemValue: number) => setNumJogadores(itemValue)}
      >
        {Array.from({ length: 18 }, (_, i) => i + 3).map((num) => (
          <Picker.Item key={num} label={num.toString()} value={num} />
        ))}
      </Picker>
      <Button title="Próximo" onPress={salvarQuantidade} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  picker: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
});

export default TelaInicial;
