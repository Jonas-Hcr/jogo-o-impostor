import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type Props = StackScreenProps<RootStackParamList, 'DistribuirCartas'>;

const DistribuirCartas: React.FC<Props> = ({ navigation }) => {
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [cartaVirada, setCartaVirada] = useState(false);
  const [cartas, setCartas] = useState<string[]>([]);
  const [jogadores, setJogadores] = useState<string[]>([]);
  const [numJogadores, setNumJogadores] = useState<number | null>(null);

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        const palavra = await AsyncStorage.getItem('palavraChave');
        if (!palavra) {
          return navigation.navigate('GerarPalavra');
        }

        const valor = await AsyncStorage.getItem('numJogadores');
        const nomes = await AsyncStorage.getItem('nomesJogadores');
        if (valor && nomes) {
          const numero = parseInt(valor, 10);
          setNumJogadores(numero);

          const listaJogadores = JSON.parse(nomes);
          const novasCartas = Array(numero - 1).fill(palavra);
          novasCartas.push('IMPOSTOR');
          setCartas(novasCartas.sort(() => Math.random() - 0.5));

          // Gerar índice aleatório para o primeiro jogador
          const indiceInicial = Math.floor(Math.random() * listaJogadores.length);
          
          // Reorganizar a lista de jogadores começando do índice aleatório
          const ordemJogadores = [
            ...listaJogadores.slice(indiceInicial),
            ...listaJogadores.slice(0, indiceInicial)
          ];
          setJogadores(ordemJogadores);
        } else {
          alert('Erro ao recuperar dados de jogadores');
          return navigation.navigate('GerarPalavra');
        }
      } catch (error) {
        console.error('Erro ao recuperar dados iniciais:', error);
        alert('Erro ao recuperar dados iniciais');
        return navigation.navigate('GerarPalavra');
      }
    };

    carregarDadosIniciais();
  }, []);

  const handleProximoJogador = async () => {
    setCartaVirada(false);
    if (currentPlayer < cartas.length - 1) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      setCurrentPlayer(0);
      await AsyncStorage.removeItem('palavraChave');
      navigation.navigate('GerarPalavra');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogador: {jogadores[currentPlayer]}</Text>
      <TouchableOpacity
        style={[styles.card, cartaVirada && styles.cardRevealed]}
        onPress={() => setCartaVirada(true)}
        disabled={cartaVirada}
      >
        <Text style={styles.cardText}>
          {cartaVirada ? cartas[currentPlayer] : 'Carta Virada'}
        </Text>
      </TouchableOpacity>
      {cartaVirada && (
        <Button title="OK" onPress={handleProximoJogador} />
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
  card: {
    width: 200,
    height: 300,
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardRevealed: {
    backgroundColor: '#f39c12',
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default DistribuirCartas;
