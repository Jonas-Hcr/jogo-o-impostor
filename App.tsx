import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Animated } from 'react-native';

const App: React.FC = () => {
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [totalPlayers, setTotalPlayers] = useState<number>(8);
  const [flipped, setFlipped] = useState<boolean>(false);
  
  const flipAnim = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    if (!flipped) {
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => setFlipped(true));
    }
  };

  const nextPlayer = () => {
    if (currentPlayer < totalPlayers) {
      // Resetar o estado da carta antes de passar para o próximo jogador
      setFlipped(false);
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
      setCurrentPlayer(currentPlayer + 1);
    } else {
      alert('Todos os jogadores viram suas cartas!');
    }
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogador {currentPlayer}</Text>

      <TouchableOpacity onPress={flipCard} disabled={flipped}>
        <View>
          {!flipped ? (
            <Animated.View style={[styles.card, frontAnimatedStyle]}>
              <Text style={styles.cardText}>Toque para revelar</Text>
            </Animated.View>
          ) : (
            <Animated.View style={[styles.card, backAnimatedStyle]}>
              <Text style={styles.cardText}>Sua Palavra</Text>
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>

      {flipped && <Button title="OK" onPress={nextPlayer} />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    width: 200,
    height: 300,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    backfaceVisibility: 'hidden',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
