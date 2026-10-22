import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bem-vindo ao ReservasLabs</Text>

      <View style={styles.cardsContainer}>
        
        {/* Card Laboratórios / Reservas */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Laboratórios</Text>
          <Text style={styles.cardDescription}>Consulte os laboratórios disponíveis e faça reservas.</Text>
          <Link href="/reservar" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Card Login */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Autenticação</Text>
          <Text style={styles.cardDescription}>Faça login ou crie sua conta no sistema.</Text>
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Entrar / Login</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Card Cadastro */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Novo Usuário</Text>
          <Text style={styles.cardDescription}>Cadastre uma nova conta de acesso.</Text>
          <Link href="/cadastro" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f7f6',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    maxWidth: 360,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 8,
  },
  cardDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});