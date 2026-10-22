import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ReservarScreen() {
  const router = useRouter();

  const [dataReserva, setDataReserva] = useState('');
  const [qtdPessoas, setQtdPessoas] = useState('1');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [labSelecionado] = useState('Laboratório de Informática 01');

  const [equipamentos, setEquipamentos] = useState([
    { id: '1', nome: 'Projetor Multimídia', estoque: 5, quantidadeDesejada: 0 },
    { id: '2', nome: 'Notebook i5', estoque: 10, quantidadeDesejada: 0 },
    { id: '3', nome: 'Extensão Elétrica', estoque: 8, quantidadeDesejada: 0 },
  ]);

  const atualizarQtdEquipamento = (id: string, valorStr: string) => {
    const valor = parseInt(valorStr) || 0;
    
    setEquipamentos(prev => 
      prev.map(eq => {
        if (eq.id === id) {
          if (valor > eq.estoque) {
            Alert.alert('Estoque Insuficiente', `O limite máximo para ${eq.nome} é ${eq.estoque}.`);
            return { ...eq, quantidadeDesejada: eq.estoque };
          }
          return { ...eq, quantidadeDesejada: valor < 0 ? 0 : valor };
        }
        return eq;
      })
    );
  };

  const handleConfirmarReserva = () => {
    if (!dataReserva || !horaEntrada || !horaSaida) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha a data e os horários da reserva.');
      return;
    }

    const resumoEquipamentos = equipamentos
      .filter(eq => eq.quantidadeDesejada > 0)
      .map(eq => `${eq.quantidadeDesejada}x ${eq.nome}`)
      .join(', ') || 'Nenhum equipamento selecionado';

    Alert.alert(
      'Reserva Efetuada com Sucesso! 🎉',
      `Lab: ${labSelecionado}\nData: ${dataReserva} (${horaEntrada} às ${horaSaida})\nPessoas: ${qtdPessoas}\nEquipamentos: ${resumoEquipamentos}`,
      [{ text: 'OK', onPress: () => router.replace('/') }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardFull}>
        <Text style={styles.cardTitle}>Reservar Laboratório e Equipamentos</Text>

        <View style={styles.reservationForm}>
          <Text style={styles.label}>Laboratório Selecionado</Text>
          <View style={styles.selectBox}>
            <Text style={styles.selectText}>{labSelecionado}</Text>
          </View>

          <Text style={styles.label}>Data da Reserva (Ex: 2026-10-30)</Text>
          <TextInput
            style={styles.input}
            placeholder="AAAA-MM-DD"
            placeholderTextColor="#999"
            value={dataReserva}
            onChangeText={setDataReserva}
          />

          <Text style={styles.label}>Quantidade de Pessoas</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={qtdPessoas}
            onChangeText={setQtdPessoas}
          />

          <View style={styles.rowInputs}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Horário de Início</Text>
              <TextInput
                style={styles.input}
                placeholder="08:00"
                placeholderTextColor="#999"
                value={horaEntrada}
                onChangeText={setHoraEntrada}
              />
            </View>

            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Horário de Término</Text>
              <TextInput
                style={styles.input}
                placeholder="10:00"
                placeholderTextColor="#999"
                value={horaSaida}
                onChangeText={setHoraSaida}
              />
            </View>
          </View>

          <View style={styles.equipmentsSection}>
            <Text style={styles.equipmentsTitle}>Solicitar Equipamentos Necessários</Text>

            {equipamentos.map((item) => (
              <View key={item.id} style={styles.equipmentRow}>
                <View style={styles.equipmentInfo}>
                  <Text style={styles.equipmentName}>{item.nome}</Text>
                  <Text style={styles.equipmentStock}>Estoque disponível: {item.estoque}</Text>
                </View>

                <TextInput
                  style={styles.equipmentInput}
                  keyboardType="numeric"
                  value={item.quantidadeDesejada.toString()}
                  onChangeText={(val) => atualizarQtdEquipamento(item.id, val)}
                />
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.btnSubmit} onPress={handleConfirmarReserva}>
            <Text style={styles.btnSubmitText}>Confirmar Reserva</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f4f7f6', padding: 15 },
  cardFull: { backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  reservationForm: { width: '100%' },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 10, fontSize: 14, color: '#333' },
  rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInputContainer: { width: '48%' },
  selectBox: { backgroundColor: '#e9ecef', borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12 },
  selectText: { color: '#333', fontSize: 14, fontWeight: 'bold' },
  equipmentsSection: { marginTop: 25, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 15 },
  equipmentsTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  equipmentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 10, borderRadius: 6, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  equipmentInfo: { flex: 1 },
  equipmentName: { fontWeight: 'bold', color: '#333', fontSize: 14 },
  equipmentStock: { color: '#666', fontSize: 12 },
  equipmentInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 4, width: 60, padding: 6, textAlign: 'center', fontSize: 14, fontWeight: 'bold' },
  btnSubmit: { backgroundColor: '#28a745', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 25 },
  btnSubmitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});