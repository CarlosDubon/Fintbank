import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, FlatList, TouchableOpacity, SafeAreaView, View, ScrollView } from 'react-native'
import { Block, Text } from "galio-framework";
import SmallProfileDimiss from "../Items/SmallProfileDimiss";
import VirtualAccountCard from "../Items/VirtualAccountCard";
import PillButton from "../Items/PillButton";
import { LineChart } from "react-native-chart-kit";
import colors from "../../modules/colors";
import TransactionResumeItem from "../Items/TransactionResumeItem";

import { useSelector } from 'react-redux';

const HistoryTransactionDetails = (props) => {
    const tarjeta = useSelector(state => state.auth.tarjeta);
    const [data, setData] = useState([0, 0, 0, 0])
    const [ingresos, setingresos] = useState('')
    const [egresos, setegresos] = useState('')
    const [opcion, setopcion] = useState(false)
    const isAuth = useSelector(state => state.auth.token);
    const [valoresEgreso1, setvaloresEgreso1] = useState(0)
    const [valoresEgreso2, setvaloresEgreso2] = useState(0)
    const [valoresEgreso3, setvaloresEgreso3] = useState(0)
    const [valoresEgreso4, setvaloresEgreso4] = useState(0)
    const [valoresEgreso5, setvaloresEgreso5] = useState(0)
    const [valoresEgreso6, setvaloresEgreso6] = useState(0)
    const [valoresEgreso7, setvaloresEgreso7] = useState(0)

    const [valoresIngreso1, setvaloresIngreso1] = useState(0)
    const [valoresIngreso2, setvaloresIngreso2] = useState(0)
    const [valoresIngreso3, setvaloresIngreso3] = useState(0)
    const [valoresIngreso4, setvaloresIngreso4] = useState(0)
    const [valoresIngreso5, setvaloresIngreso5] = useState(0)
    const [valoresIngreso6, setvaloresIngreso6] = useState(0)
    const [valoresIngreso7, setvaloresIngreso7] = useState(0)

    const [valoresfecha1, setvaloresfecha1] = useState('')
    const [valoresfecha2, setvaloresfecha2] = useState('')
    const [valoresfecha3, setvaloresfecha3] = useState('')
    const [valoresfecha4, setvaloresfecha4] = useState('')
    const [valoresfecha5, setvaloresfecha5] = useState('')
    const [valoresfecha6, setvaloresfecha6] = useState('')
    const [valoresfecha7, setvaloresfecha7] = useState('')
    const [xAxis, setXAxis] = useState([valoresfecha1, valoresfecha2, valoresfecha3, valoresfecha4,valoresfecha5,valoresfecha6, valoresfecha7])
    

    const crearListas = () => {
        if (props.route.params.data !== null) {
            const trans = props.route.params.data.filter(item => item.transacciones[0].cuenta_remitente_id === tarjeta)
            setegresos(trans)
            const trans2 = props.route.params.data.filter(item => item.transacciones[0].cuenta_remitente_id !== tarjeta)
            setingresos(trans2)
        }
        console.log('LA DATA')
        console.log(props.route.params.data)




        console.log('INGRESOS Y EGRESOS')
        console.log(ingresos)
        console.log(egresos)
    }
    const datos = async () => {
        try {
            console.log(isAuth)
            const res = await fetch(`http://209.97.152.122:3001/transaction/byWeekAccount/${tarjeta}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${isAuth}`,
                    },

                });
            const resData = await res.json();
            if (resData.ok === true) {
                console.log('LO DE INGRESOS Y EGRESOS')
                console.log(resData)
                for (let index = 0; index < resData.data.length; index++) {
                    if(index===0){
                        setvaloresfecha1(resData.data[0].fecha.substr(5, 5))
                        setvaloresEgreso1(resData.data[0].egresos)
                        setvaloresIngreso1(resData.data[0].ingresos)
                    }
                    if(index===1){
                        setvaloresfecha2(resData.data[1].fecha.substr(5, 5))
                        setvaloresEgreso2(resData.data[1].egresos)
                        setvaloresIngreso2(resData.data[1].ingresos)
                    }
                    if(index===2){
                        setvaloresfecha3(resData.data[2].fecha.substr(5, 5))
                        setvaloresEgreso3(resData.data[2].egresos)
                        setvaloresIngreso3(resData.data[2].ingresos)
                    }
                    if(index===3){
                        setvaloresfecha4(resData.data[3].fecha.substr(5, 5))
                        setvaloresEgreso4(resData.data[3].egresos)
                        setvaloresIngreso4(resData.data[3].ingresos)
                    }
                    if(index===4){
                        setvaloresfecha5(resData.data[4].fecha.substr(5, 5))
                        setvaloresEgreso5(resData.data[4].egresos)
                        setvaloresIngreso5(resData.data[4].ingresos)
                    }
                    if(index===5){
                        setvaloresfecha6(resData.data[5].fecha.substr(5, 5))
                        setvaloresEgreso6(resData.data[5].egresos)
                        setvaloresIngreso6(resData.data[5].ingresos)
                    }
                    if(index===6){
                        setvaloresfecha7(resData.data[6].fecha.substr(5, 5))
                        setvaloresEgreso1(resData.data[6].egresos)
                        setvaloresIngreso7(resData.data[6].ingresos)
                    }  
                    
                }

                 }
                 


        } catch (e) {
            console.log('fallo')
            console.log(e)
        }
    }

    useEffect(() => {
        crearListas()
    }, [tarjeta])

    useEffect(() => {
        datos()
    }, [isAuth])

    useEffect(() => {
        setXAxis([valoresfecha1, valoresfecha2, valoresfecha3, valoresfecha4,valoresfecha5,valoresfecha6, valoresfecha7])
           
    }, [valoresfecha1,valoresfecha2,valoresfecha3, valoresfecha4, valoresfecha5, valoresfecha6, valoresfecha7])


    const renderItem = ({ item }) => (<TransactionResumeItem data={item} />)

    return (
        <View style={{ marginBottom: 10, flex: 1 }}>
            <ScrollView>
                <Block flex={0.9} >
                    <SmallProfileDimiss />
                    <Block flex={1} >
                        <Block center>
                            <Text center h4 bold color={colors.BLACK}>Historial de transacciones</Text>
                        </Block>
                        <Block center style={{ marginTop: 16, }}>
                            <Block row>
                                <TouchableOpacity onPress={() => setopcion(false)} style={[styles.btnLeft, opcion === false ? { backgroundColor: colors.PRIMARY } : { backgroundColor: colors.WHITE }]} >
                                    <Block>
                                        <Text color={opcion === false ? colors.WHITE : colors.PRIMARY}>Ingresos</Text>
                                    </Block>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setopcion(true)} style={[styles.btnRight, opcion === true ? { backgroundColor: colors.PRIMARY } : { backgroundColor: colors.WHITE }]} >
                                    <Block>
                                        <Text color={opcion === true ? colors.WHITE : colors.PRIMARY}>Egresos</Text>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                        </Block>
                        <Block center style={{ marginTop: 16, }}>
                            {opcion?
                            <LineChart
                            
                            data={{
                                labels: xAxis,
                                datasets: [
                                    {
                                        data: [
                                            valoresEgreso1,
                                            valoresEgreso2,
                                            valoresEgreso3,
                                            valoresEgreso4,
                                            valoresEgreso5,
                                            valoresEgreso6,
                                            valoresEgreso7
                                        ]
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width - Dimensions.get("window").width / 10}
                            height={200}
                            yAxisLabel={"$"}
                            bezier
                            chartConfig={{
                                backgroundColor: colors.WHITE,
                                backgroundGradientFrom: colors.WHITE,
                                backgroundGradientTo: colors.WHITE,
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => colors.PRIMARY,
                                labelColor: (opacity = 1) => colors.MUTED,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "1",
                                }
                            }}
                            style={{
                                borderRadius: 16,
                            }}
                            withInnerLines={false}
                            withOuterLines={false}
                        />: 
                        <LineChart
                            
                            data={{
                                labels: xAxis,
                                datasets: [
                                    {
                                        data: [
                                            
                                            valoresIngreso1,
                                            valoresIngreso2,
                                            valoresIngreso3,
                                            valoresIngreso4,
                                            valoresIngreso5,
                                            valoresIngreso6,
                                            valoresIngreso7
                                        ]
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width - Dimensions.get("window").width / 10}
                            height={200}
                            yAxisLabel={"$"}
                            bezier
                            chartConfig={{
                                backgroundColor: colors.WHITE,
                                backgroundGradientFrom: colors.WHITE,
                                backgroundGradientTo: colors.WHITE,
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => colors.PRIMARY,
                                labelColor: (opacity = 1) => colors.MUTED,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "1",
                                }
                            }}
                            style={{
                                borderRadius: 16,
                            }}
                            withInnerLines={false}
                            withOuterLines={false}
                        />}
                            
                        </Block>
                        <Block style={{ marginHorizontal: 16, }}>
                            {
                                opcion ? <FlatList
                                    data={egresos}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                    : <FlatList
                                        data={ingresos}
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                            }

                        </Block>
                    </Block>
                </Block>
            </ScrollView>
        </View>
    )
        ;
}
const styles = StyleSheet.create({
    btnLeft: {
        borderWidth: 1,
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderTopStartRadius: 16,
        borderBottomStartRadius: 16,
        borderColor: colors.PRIMARY,

    },
    btnRight: {
        borderWidth: 1,
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderTopEndRadius: 16,
        borderBottomEndRadius: 16,
        borderColor: colors.PRIMARY
    }
})
export default HistoryTransactionDetails
