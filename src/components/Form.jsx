import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react';
import {Picker} from '@react-native-picker/picker';

const Form = ({ data, setData, tamanios, tiposCafe }) => {

    const setValues = (key, value) => {
        setData({ ...data, [key]: value });
    }

    return (
        <View style={ styles.container }>
            <Picker
                style ={ styles.picker }
                onValueChange={(value, index) => {
                    setData({ ...data, ['tamanioText']:  tamanios[index-1].label, ['tamanio']: value});
                }}
                selectedValue = { data.tamanio }
            >
                <Picker.Item label='Seleccionar tamaño de café' value='' style={{ color: '#828282' }} />
                {
                    tamanios.map( (tamanio, index) => <Picker.Item key={index} label={tamanio.label} value={tamanio.value} /> )
                }
            </Picker>
            <Picker
                style ={ styles.picker }
                onValueChange={(value, index) => {
                    setData({ ...data, ['tipoCafeText']:  tiposCafe[index-1].label, ['tipoCafe']: value});
                }}
                selectedValue = { data.tipoCafe }
            >
                <Picker.Item label='Seleccionar tipo de café' value='' style={{ color: '#828282' }} />
                {
                    tiposCafe.map( (tipo, index) => <Picker.Item key={index} label={tipo.label} value={tipo.value} /> )
                }
            </Picker>

            <View style={{ flexDirection:'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
                <Picker
                    style ={ styles.picketPay }
                    onValueChange={(value) => {
                        setValues('tipoPago', value);
                    }}
                    selectedValue = { data.tipoPago }
                >
                    <Picker.Item label='Tipo de pago' value='' style={{ color: '#828282' }} />
                    <Picker.Item label="Efectivo" value="Efectivo" />
                    <Picker.Item label="Tarjeta de Crédito" value="Tarjeta de credito" />
                </Picker>

                <TextInput
                    style={ styles.input }
                    placeholder='0'
                    keyboardType='numeric'
                    onChangeText={(value) => { setValues('cantidad', Number(value) ) }}
                    value={ data.cantidad }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '7%',
        marginTop: 20,
    },
    picker: {
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    picketPay: {
        width: '70%',
        backgroundColor: '#fff',
    },
    input: {
        width: '20%',
        backgroundColor: '#fff',
        borderColor: 'grey', 
        color: '#000',
        textAlign: 'center',
    }
});

export default Form