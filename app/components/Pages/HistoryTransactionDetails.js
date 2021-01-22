import React, {useState} from 'react';
import {StyleSheet, Dimensions, FlatList} from 'react-native'
import {Block, Text} from "galio-framework";
import SmallProfileDimiss from "../Items/SmallProfileDimiss";
import VirtualAccountCard from "../Items/VirtualAccountCard";
import PillButton from "../Items/PillButton";
import {LineChart} from "react-native-chart-kit";
import colors from "../../modules/colors";
import TransactionResumeItem from "../Items/TransactionResumeItem";

const HistoryTransactionDetails = (props) => {
    const [xAxis, setXAxis] = useState(["Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab.", "Dom."])
    const [data,setData] = useState([0,0,0,0])

    const renderItem = ({item}) => (<TransactionResumeItem data={item}/>)

    return (
        <Block flex={1}>
            <SmallProfileDimiss/>
            <Block flex={1}>
                <Block center>
                    <Text center h4 bold color={colors.BLACK}>Historial de transacciones</Text>
                </Block>
                <Block center style={{marginTop:16}}>
                    <PillButton button1Title={"Ingresos"} button2Title={"Egresos"} selected={1}/>
                </Block>
                <Block center style={{marginTop:16}}>
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
                        width={Dimensions.get("window").width - Dimensions.get("window").width/10}
                        height={200}
                        yAxisLabel={"$"}
                        bezier
                        chartConfig={{
                            backgroundColor: colors.WHITE,
                            backgroundGradientFrom: colors.WHITE,
                            backgroundGradientTo:  colors.WHITE,
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
                <Block style={{marginHorizontal:16}}>
                    <FlatList
                        data={props.route.params.data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Block>
            </Block>
        </Block>
    )
        ;
}
const styles = StyleSheet.create({})
export default HistoryTransactionDetails
