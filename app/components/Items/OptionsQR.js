import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Pressable, Touchable, TouchableOpacity, ScrollView , Alert} from 'react-native';

import { Block, Text, Input, Button } from "galio-framework";
import colors from '../../modules/colors';
import Card from '../Containers/Card';

import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { useNavigation } from '@react-navigation/native';

const OptionsQR = () => {
    const navigation = useNavigation();
    const [form, setform] = useState(false)
    const [monto, setmonto] = useState('')
    const [concepto, setconcepto] = useState('')
    const [qr, setqr] = useState('')
    const tarjeta = useSelector(state => state.auth.tarjeta);
    const [pago, setpago] = useState('')
    const [scaner, setscaner] = useState(false)

    const isAuth = useSelector(state => state.auth.token);

    const emptyAvatar = (
        <Block style={styles.emptyAvatar}>

        </Block>
    )
    const alerta = ((mensaje) => {
        Alert.alert('¡Un error ocurrio!', mensaje, [{ text: 'Okay' }])
    })

    const alertaOk = ((mensaje) => {
        Alert.alert('¡Transacción realizada con exito!', mensaje, [{ text: 'Okay' }])
    })
    const onSuccess =  (e) => {
        const res= e.data;
        const resData=  JSON.parse(res)
        setpago(resData)
        console.log(pago)
        console.log('MONTO')
        console.log(resData)
        console.log(resData[0].monto)
    };

    const generarqr = () => {
        setqr([{ cuenta_destino: tarjeta, monto: monto, concepto: concepto }])
    }

    const Send = async () => {
        console.log(pago.monto)
        
        let res;
        try {

            res = await fetch(`http://209.97.152.122:3001/account/transferencia`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${isAuth}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cuenta_remitente: tarjeta,
                        cuenta_destino: pago[0].cuenta_destino,
                        monto: pago[0].monto,
                        concepto: pago[0].concepto,
                    })
                });
            const resData = await res.json();
            console.log('todo bien con la transaccion')
            console.log(resData)
            if (resData.ok === true) {
                alertaOk('')
                navigation.replace('Home');
            }
            else {
                alerta(resData.msg)
            }
        } catch (e) {
            console.log('fallo con las transaccion')
            console.log(e)
        }
    }

    useEffect(() => {
        setqr('')
    }, [monto, concepto])
    return (
        <Block flex={1}>
            <ScrollView>
                <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />
                <Block style={{ marginTop: 24 }}>
                    <Text h5 bold center color={colors.BLACK}>Pagar/Cobrar por QR</Text>
                </Block>
                <Block style={styles.textContainer}>
                    <Block row space={"around"} >
                        <TouchableOpacity onPress={() => {
                            setform(true)
                            setscaner(false)
                            setpago('')
                        }}>
                            <View>
                                <Image style={styles.chip} source={require("../../../assets/images/qr.png")} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setscaner(true)
                            setform(false)
                            setqr(false)
                            setmonto('')
                            setconcepto('')
                        }}>
                            <View>
                                <Image style={styles.chip} source={require("../../../assets/images/qr.png")} />
                            </View>
                        </TouchableOpacity>
                    </Block>
                    <Block row space={"around"} >
                        <Text h6 bold center color={colors.BLACK}>Generar QR</Text>
                        <Text h6 bold center color={colors.BLACK}>Escanear QR</Text>

                    </Block>
                </Block>
                {form ? <View>
                    <Card style={{ marginTop: 8, marginHorizontal: 16 }}>
                        <Block>
                            <Block row middle>
                                <Block>
                                    {emptyAvatar}
                                </Block>
                                <Block flex={1} style={{ marginStart: 8 }}>
                                    <Input placeholder={"Concepto"} borderless onChangeText={text => setconcepto(text)} value={concepto} />
                                    <Input placeholder={"Monto"} borderless onChangeText={text => setmonto(text)} value={monto} />

                                </Block>

                            </Block>
                        </Block>
                    </Card>
                </View> : <View></View>}
                {concepto !== "" && monto !== "" ?
                    <Block style={styles.boton}>
                        <Button color={colors.PRIMARY} round onPress={() => generarqr()}>Generar QR</Button>
                    </Block> : <View></View>}

                {qr && concepto !== "" && monto !== "" ?
                    <View style={{ alignSelf: 'center', marginTop: 40 }}>
                        <QRCode
                            value={JSON.stringify(qr)}
                            size={200} />
                    </View> : <View></View>}

                {scaner ?

                    <QRCodeScanner
                        onRead={(e) => onSuccess(e)}
                        containerStyle={{ marginTop: 10 }}
                        cameraStyle={{ height: 300, marginTop: 20, width: 300, alignSelf: 'center', justifyContent: 'center' }}
                        reactivate={true}
                        reactivateTimeout={500}
                    />

                    : <View></View>}
                {pago !== '' ?
                    <View>
                        <Card style={{ marginTop: 88, marginHorizontal: 16 }}>
                            <Block>
                                <Block row middle>
                                    <Block>
                                        {emptyAvatar}
                                    </Block>
                                    <Block flex={1} style={{ marginStart: 8 }}>
                                        <Text h6 bold center >Cuenta destino: {pago[0].cuenta_destino}</Text>
                                        <Text h6 bold center>Monto: {pago[0].monto}</Text>
                                        <Text h6 bold center>Concepto: {pago[0].concepto}</Text>
                                    </Block>

                                </Block>
                            </Block>
                        </Card>
                        <Block style={styles.boton}>
                            <Button color={colors.PRIMARY} round onPress={() => Send()}>Realizar pago</Button>
                        </Block>
                    </View> : <View></View>}
            </ScrollView>
        </Block>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: "hidden",
        height: 240,
        backgroundColor: "#82ccdd"
    },
    textContainer: {
        paddingVertical: 26,
        paddingHorizontal: 52
    },
    bkgd: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 250,
        height: 250,
    },
    bkgdBottom: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 300,
        height: 300,
    },
    chip: {
        height: 90,
        width: 100,

    },
    emptyAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: colors.WHITE,
        borderColor: colors.MUTED,
        borderWidth: 1,
        borderStyle: "dashed",

    },
    boton: {
        marginHorizontal: 16,
        marginTop: 20

    }
})
export default OptionsQR;
