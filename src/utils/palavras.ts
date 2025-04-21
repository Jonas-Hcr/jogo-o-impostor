import AsyncStorage from '@react-native-async-storage/async-storage';

const palavrasJogo = [
  // Países
  "Brasil", "Japão", "Canadá", "México", "Itália", "França", "Alemanha", "Espanha", "China", "Índia",
  "Austrália", "Egito", "Argentina", "Portugal", "Rússia", "Grécia", "Turquia", "Suíça", "Holanda", "Suécia",

  // Frutas
  "Maçã", "Banana", "Laranja", "Manga", "Melancia", "Abacaxi", "Uva", "Pera", "Cereja", "Morango",
  "Limão", "Abacate", "Kiwi", "Coco", "Mamão", "Ameixa", "Framboesa", "Tangerina", "Maracujá", "Pêssego",

  // Famosos
  "Beyoncé", "Michael Jackson", "Elvis Presley", "Madonna", "Angelina Jolie", "Brad Pitt", "Leonardo DiCaprio",
  "Rihanna", "Tom Cruise", "Johnny Depp", "Oprah", "Neymar", "Cristiano Ronaldo", "Messi", "Ayrton Senna",
  "Lady Gaga", "Shakira", "Justin Bieber", "Taylor Swift", "Will Smith",

  // Esportes
  "Futebol", "Basquete", "Vôlei", "Tênis", "Golfe", "Natação", "Ciclismo", "Boxe", "Rugby", "Handebol",
  "Surfe", "Skate", "Atletismo", "Ginástica", "Esgrima", "Hóquei", "Badminton", "Esqui", "Karate", "Jiu-Jitsu",

  // Objetos do dia a dia
  "Celular", "Relógio", "Computador", "Televisão", "Geladeira", "Micro-ondas", "Fogão", "Ventilador",
  "Carro", "Moto", "Bicicleta", "Cadeira", "Mesa", "Espelho", "Copo", "Chave", "Lâmpada", "Livro", "Caneta",

  // Animais
  "Cachorro", "Gato", "Elefante", "Tigre", "Leão", "Girafa", "Zebra", "Cavalo", "Papagaio", "Coelho",
  "Panda", "Tartaruga", "Jacaré", "Golfinho", "Peixe", "Rato", "Macaco", "Urso", "Camelo", "Cobra",

  // Cores
  "Azul", "Vermelho", "Verde", "Amarelo", "Roxo", "Laranja", "Rosa", "Branco", "Preto", "Cinza",

  // Elementos da Natureza
  "Sol", "Lua", "Estrela", "Nuvem", "Chuva", "Vento", "Fogo", "Terra", "Mar", "Montanha",

  // Profissões
  "Médico", "Professor", "Engenheiro", "Advogado", "Bombeiro", "Policial", "Cantor", "Ator", "Escritor", "Pintor",
  "Cozinheiro", "Arquiteto", "Jornalista", "Cientista", "Dentista", "Motorista", "Enfermeiro", "Biólogo", "Agricultor", "Designer",

  // Comidas
  "Pizza", "Hambúrguer", "Lasanha", "Chocolate", "Sorvete", "Sushi", "Batata Frita", "Frango", "Salada", "Pão",
  "Macarrão", "Bolo", "Panqueca", "Biscoito", "Torta", "Arroz", "Feijão", "Carne", "Ovo", "Queijo",

  // Lugares na cidade
  "Restaurante", "Supermercado", "Parque", "Praia", "Hospital", "Escola", "Museu", "Teatro", "Igreja", "Biblioteca",
  "Shopping", "Estádio", "Estação", "Farmácia", "Aeroporto", "Academia", "Hotel", "Café", "Cinema", "Banco"
];

export const selecionarPalavraAleatoria = async (): Promise<string | null> => {
  try {
    const palavrasUsadasStr = await AsyncStorage.getItem('palavrasUsadas');
    const palavrasUsadas = palavrasUsadasStr ? JSON.parse(palavrasUsadasStr) : [];

    const palavrasDisponiveis = palavrasJogo.filter(
      palavra => !palavrasUsadas.includes(palavra)
    );

    if (palavrasDisponiveis.length === 0) {
      alert('Todas as palavras foram usadas!');
      return null;
    }

    const palavraAleatoria =
      palavrasDisponiveis[Math.floor(Math.random() * palavrasDisponiveis.length)];

    palavrasUsadas.push(palavraAleatoria);
    await AsyncStorage.setItem('palavrasUsadas', JSON.stringify(palavrasUsadas));

    return palavraAleatoria;
  } catch (error) {
    console.error('Erro ao selecionar palavra aleatória:', error);
    return null;
  }
};
