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
    const [xAxis, setXAxis] = useState(["Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab.", "Dom."])
    const [data, setData] = useState([0, 0, 0, 0])
    const [ingresos, setingresos] = useState('')
    const [egresos, setegresos] = useState('')
    const [opcion, setopcion] = useState(false)

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

    useEffect(() => {
        crearListas()
    }, [tarjeta])

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
                        <LineChart
                            data={{
                                labels: xAxis,
                                datasets: [
                                    {
                                        data: [
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
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
                        />
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
