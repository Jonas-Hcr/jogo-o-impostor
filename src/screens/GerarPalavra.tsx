import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../App';
import { selecionarPalavraAleatoria } from '../utils/palavras';

type Props = StackScreenProps<RootStackParamList, 'GerarPalavra'>;

const GerarPalavra: React.FC<Props> = ({ navigation }) => {
  const [palavraGerada, setPalavraGerada] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const verificarPalavra = async () => {
        const palavraSalva = await AsyncStorage.getItem('palavraChave');
        if (palavraSalva) {
          setPalavraGerada(palavraSalva);
        } else {
          setPalavraGerada(null);
        }
      };

      verificarPalavra();
    }, [])
  );

  const gerarPalavra = async () => {
    const palavra = await selecionarPalavraAleatoria();
    if (palavra) {
      setPalavraGerada(palavra);
      await AsyncStorage.setItem('palavraChave', palavra);
    } else {
      alert('Nenhuma palavra disponível!');
    }
  };

  return (
    <View style={styles.container}>
      {!palavraGerada && (
        <View style={styles.resultContainer}>
          <Text style={styles.title}>Clique para gerar a palavra-chave</Text>
          <Button title="GERAR PALAVRA-CHAVE" onPress={gerarPalavra} />
        </View>
      )}
      {palavraGerada && (
        <View style={styles.resultContainer}>
          <Text style={styles.title}>Vamos iniciar o jogo!</Text>
          <Button
            title="Iniciar Distribuição"
            onPress={() => navigation.navigate('DistribuirCartas')}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    marginBottom: 15,
  },
});

export default GerarPalavra;

