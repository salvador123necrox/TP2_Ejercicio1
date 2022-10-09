import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Form from './src/components/Form';
import Result from './src/components/Result';
import { useState } from 'react';

const tamanios = [
  {
      id: 1,
      label: 'Short 8 onz.',
      value: "1"
  },
  {
      id: 2,
      label: 'Tall 12 onz.',
      value: "1.5"
  },
  {
      id: 3,
      label: 'Grande 16 onz.',
      value: "2"
  }
]

const tiposCafe = [
  {
      id: 1,
      label: 'Mocha',
      value: '2'
  },
  {
      id: 2,
      label: 'Te chai',
      value: '2.5'
  },
  {
      id: 3,
      label: 'Americano',
      value: '1.5'
  },
  {
      id: 4,
      label: 'Frapper',
      value: '3'
  }
]

export default function App() {

  const [ data, setData ] = useState({
    tamanio: '',
    tipoCafe: '',
    tipoPago: '',
    tamanioText: '',
    tipoCafeText: '',
    cantidad: 0,
    total: 0,
    descuento: 0,
  });

  const [ errors, setErrors ] = useState('');

  const validateString = (value) => {
    if(value == '')
    {
      setErrors('Seleccionar valores validos');
      return false;
    }
    return true;
  }

  const validateCant = (value) => {
    if(value == 0)
    {
      setErrors('Ingrese una cantidad valida');
      return false;
    }
    return true;
  }
  
  const calcularTotal = () => {
    if( validateString(data.tamanio) && validateString(data.tipoCafe) && validateString(data.tipoPago) && validateCant(data.cantidad)) {
      let subtotal = (Number(data.tamanio) + Number(data.tipoCafe)) * Number(data.cantidad);
      let descuento = data.tipoPago == 'Efectivo' ? 0.15 : 0.05;
      const tamanioText = tamanios.find( (tamanio) => tamanio.value == data.tamanio ? tamanio.label : '' );
      console.log();
      let total = subtotal - ( subtotal*descuento );

      setData({ ...data, total: total, descuento: (descuento*100) });
    }
  }
  
  return (
    <>
      <StatusBar hidden={true} />
      <SafeAreaView>
        <View style={ styles.container }>
          <Text
            style = { styles.title }
          >StarBosco APP</Text>
          <Form data={ data } setData={ setData } tamanios = { tamanios } tiposCafe = { tiposCafe }/>
        </View>
        <Result data={data} />
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={ calcularTotal }
            style = { styles.button }
          >
            <Text style={ styles.buttonText }>Calcular</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'brown',
    height: 300,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    marginTop: 15,
  },
  button: {
    width: '70%',
    backgroundColor: 'brown',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
});
