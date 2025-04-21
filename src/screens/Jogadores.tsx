import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type Props = StackScreenProps<RootStackParamList, 'Jogadores'>;

const Jogadores: React.FC<Props> = ({ navigation }) => {
  const [numJogadores, setNumJogadores] = useState<number | null>(null);
  const [nomes, setNomes] = useState<string[]>([]);

  // Recupera o número de jogadores do AsyncStorage
  useEffect(() => {
    const recuperarNumJogadores = async () => {
      try {
        const valor = await AsyncStorage.getItem('numJogadores');
        if (valor !== null) {
          const numero = parseInt(valor, 10);
          setNumJogadores(numero);
          setNomes(Array(numero).fill('')); // Preenche o array de nomes
        }
      } catch (error) {
        console.error('Erro ao recuperar numJogadores:', error);
      }
    };

    recuperarNumJogadores();
  }, []);

  const handleChangeNome = (index: number, valor: string) => {
    const novosNomes = [...nomes];
    novosNomes[index] = valor;
    setNomes(novosNomes);
  };

  const checkRequiredFields = async () => {
    if (nomes.some((nome) => nome.trim() === '')) {
      alert('Todos os nomes devem ser preenchidos');
      return false;
    }
    return true;
  };

  const handleProximo = async () => {
    try {
      const nextStep = await checkRequiredFields();
      if (!nextStep) {
        return;
      }
      
      await AsyncStorage.setItem('nomesJogadores', JSON.stringify(nomes));
      navigation.navigate('GerarPalavra');
    } catch (error) {
      console.error('Erro ao salvar nomes:', error);
    }
  };

  // Exibe um loading enquanto o número de jogadores é carregado
  if (numJogadores === null) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Coloque o nome dos jogadores</Text>
      {nomes.map((_, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Jogador ${index + 1}`}
          value={nomes[index]}
          onChangeText={(valor) => handleChangeNome(index, valor)}
        />
      ))}
      <Button title="Próximo" onPress={handleProximo} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});

export default Jogadores;
