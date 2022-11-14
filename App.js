import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import supabase from './config/supabaseClient';
import { useState, useEffect } from 'react';
import 'react-native-url-polyfill/auto';

export default function App() {

  //console.log(supabase);
  const [fetchError, setFetchError] = useState(null);
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      const { data, error } = await supabase
        .from('prueba')
        .select()

        if(error){
          setFetchError('Error al conseguir datos');
          setDatos(null);
          console.log(error);
        }
        if(data){
          setDatos(data);
          setFetchError(null);
        }
    }

    fetchDatos();
  }, []);

  console.log(datos);
  console.log(fetchError);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{"Tabla Prueba:"}</Text>
      {fetchError && (<Text>{fetchError}</Text>)}
          {datos && (
            <View className="datos" style={styles.fetch}>
              {datos.map(dato => (
                <Text key={dato.id}>
                  {"Id " + dato.id + ": " + dato.texto}
                  </Text>
              ))}
            </View>
          )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:  {
    color: 'blue',
    fontSize: '24',
  },
  fetch:  {
    color: 'green',
    fontSize: '24',
    fontStyle: 'italic',
    fontWeight: 'bold',
  }
});
