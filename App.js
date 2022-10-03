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
      <Text>Open up App.js to start working on your sexo!</Text>
      <Text style={styles.titulo}>A continuación, haremos un fetch de Supabase:</Text>
      {fetchError && (<Text>{fetchError}</Text>)}
          {datos && (
            <View className="datos">
              {datos.map(dato => (
                <Text key={dato.id} style={styles.fetch}>{dato.texto}</Text>
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
