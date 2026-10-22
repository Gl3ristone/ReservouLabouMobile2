import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function CadastroScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [chaveAdm, setChaveAdm] = useState('');
  const router = useRouter();

  const handleCadastro = () => {
    if (!usuario.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o usuário e a senha.');
      return;
    }

    // Cadastro simulado funcionando de verdade
    Alert.alert('Sucesso! 🎉', `Conta criada para o usuário: ${usuario}`, [
      { text: 'Fazer Login', onPress: () => router.back() }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Criar Nova Conta</Text>

        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          placeholderTextColor="#999"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.label}>Chave de administrador (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite somente se for ADM"
          placeholderTextColor="#999"
          secureTextEntry
          value={chaveAdm}
          onChangeText={setChaveAdm}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkContainer} onPress={() => router.back()}>
          <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f7f6', padding: 20 },
  box: { backgroundColor: '#fff', padding: 25, borderRadius: 10, width: '100%', maxWidth: 350, elevation: 3 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#007bff' },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12, marginBottom: 15, backgroundColor: '#f9f9f9', fontSize: 14 },
  button: { backgroundColor: '#28a745', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkContainer: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#007bff', fontWeight: '600', fontSize: 14 },
});