import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Pressable, Touchable, TouchableOpacity } from 'react-native';

import { Block, Text, Input, Button } from "galio-framework";
import colors from '../../modules/colors';
import Card from '../Containers/Card';

import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';

const OptionsQR = () => {
    const [form, setform] = useState(false)
    const [monto, setmonto] = useState('')
    const [concepto, setconcepto] = useState('')
    const [qr, setqr] = useState('')
    const tarjeta = useSelector(state => state.auth.tarjeta);

    const emptyAvatar = (
        <Block style={styles.emptyAvatar}>

        </Block>
    )

    const generarqr = () => {
        setqr({cuenta_destino: tarjeta, monto: monto, concepto: concepto })
    }

    useEffect(() => {
        setqr('')
    }, [monto, concepto])
    return (
        <Block flex={1}>
            <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />
            <Block style={{ marginTop: 24 }}>
                <Text h5 bold center color={colors.BLACK}>Pagar/Cobrar por QR</Text>
            </Block>
            <Block style={styles.textContainer}>
                <Block row space={"around"} >
                    <TouchableOpacity onPress={() => setform(true)}>
                        <View>
                            <Image style={styles.chip} source={require("../../../assets/images/qr.png")} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('jaja2')}>
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

            {qr && concepto !== "" && monto !== ""?
                <View style={{  alignSelf:'center', marginTop:40}}>
                    <QRCode
                        value={JSON.stringify(qr)}
                        size={200} />
                </View>:<View></View>}

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
