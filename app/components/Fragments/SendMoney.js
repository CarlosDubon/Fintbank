import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, View, Alert } from 'react-native'
import { Block, Button, Input, Text } from "galio-framework";
import colors from "../../modules/colors";
import Icon from "react-native-vector-icons/Entypo";
import Card from "../Containers/Card";
import transaccion from '../../models/transaccion';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const SendMoney = (props) => {

    const navigation = useNavigation();
    const tarjeta = useSelector(state => state.auth.tarjeta);
    const [money, setMoney] = useState(50)
    const [suggest, setSuggest] = useState([50, 100, 150, 300])
    const [transacciones, setTransacciones] = useState([])
    const isAuth = useSelector(state => state.auth.token);

    const alerta=((mensaje) => {
            Alert.alert('¡Un error ocurrio!', mensaje, [{ text: 'Okay' }])
    })

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => setMoney(item)}
            style={{ marginHorizontal: 8 }}>
            <Block style={styles.button}>
                <Text bold color={colors.MUTED}> $ {item} </Text>
            </Block>
        </TouchableOpacity>
    )
    const emptyAvatar = (
        <Block style={styles.emptyAvatar}>

        </Block>
    )

    const createUI = () => (
        transacciones.map((el, i) => (
            <View key={i}>
                <Card style={{ marginTop: 8, marginHorizontal: 16 }}>
                    <Block>
                        <Block row middle>
                            <Block>
                                {emptyAvatar}
                            </Block>
                            <Block flex={1} style={{ marginStart: 8 }}>
                                <Input placeholder={"Ingrese la cuenta destino"} borderless onChangeText={text => handleChange(i, text, transacciones[i].monto)} value={transacciones[i]} />
                                <Input placeholder={"Monto"} borderless onChangeText={text => handleChange(i, transacciones[i].cuenta, text)} value={transacciones[i].monto} />

                            </Block>

                        </Block>
                    </Block>
                </Card>
            </View>
        ))

    );

    const handleChange = (i, texto, otro) => {
        let values = [...transacciones];
        const newTrasanccion = new transaccion();
        newTrasanccion.id = i;
        newTrasanccion.cuenta = texto;
        newTrasanccion.monto = otro;
        newTrasanccion.tipo = 1;
        newTrasanccion.concepto = 'Sueldo';

        values[i] = newTrasanccion;
        setTransacciones(values);
    }
    const addClick = () => {
        setTransacciones(prevState => ([...transacciones, '']))
        console.log(tarjeta)
    }
    const Send = async () => {
        console.log('LO QUE SE ENVIA')
        console.log(transacciones)
        let res;
        try {
            if (transacciones[1]) {
                console.log('VARIAS TRANSACCIONES')
                res = await fetch(`http://209.97.152.122:3001/account/transferenciaMultiple`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${isAuth}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            cuenta_remitente: tarjeta,
                            destinos: transacciones
                        })
                    });


            }
            else {
                console.log('SOLO UNA TRANSACCION')
                res = await fetch(`http://209.97.152.122:3001/account/transferencia`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${isAuth}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            cuenta_remitente: tarjeta,
                            cuenta_destino: transacciones[0].cuenta,
                            monto: transacciones[0].monto,
                            concepto: transacciones[0].concepto,
                        })
                    });
            }

            const resData = await res.json();
            console.log('todo bien con la transaccion')
            console.log(resData)
            if (resData.ok === true) {
                navigation.replace('Home');
            }
            else{
                alerta(resData.msg)
            }
        } catch (e) {
            console.log('fallo con las transaccion')
            console.log(e)
        }
    }

    return (
        <Block flex={1}>
            <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />
            <Block style={{ marginTop: 24 }}>
                <Text h4 bold center color={colors.BLACK}>Enviar dinero</Text>
            </Block>
            <Block flex={1} style={styles.container} >
                <Block flex={1}>
                    <Block style={{ marginTop: 16 }}>
                        <Block>
                            <Text bold p color={colors.BLACK}>{transacciones[1] ? "Destinatarios" : "Destinatario"}</Text>
                        </Block>
                    </Block>
                    <ScrollView>
                        {createUI()}
                    </ScrollView>
                </Block>
                <Block>
                    <Button color={colors.PRIMARY} style={{ marginBottom: 10 }} round onPress={addClick}>Agregar destinatario</Button>
                </Block>
                <Block>
                    <Button color={colors.PRIMARY} round onPress={Send}>Enviar</Button>
                </Block>
            </Block>
        </Block>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        backgroundColor: "#fff",
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        paddingVertical: 24,
        paddingHorizontal: 16
    },
    button: {
        backgroundColor: "#EEEEEE",
        padding: 8,
        borderRadius: 8
    },
    bkgd: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 200,
        height: 200,
    },
    emptyAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: colors.WHITE,
        borderColor: colors.MUTED,
        borderWidth: 1,
        borderStyle: "dashed",

    }
})
export default SendMoney
