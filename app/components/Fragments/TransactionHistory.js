import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native'
import { Block } from "galio-framework";
import Text from "galio-framework/src/Text";
import colors from "../../modules/colors";
import TransactionResumeItem from "../Items/TransactionResumeItem";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";


const TransactionHistory = (props) => {
    const navigation = useNavigation()
    const [data, setData] = useState([0, 1, 0])
    const renderItem = ({ item }) => (<TransactionResumeItem data={item} />)


    return (
        <Block flex={1}>


            {props.transacciones != null ?
                <Block row space={"between"}>

                    <Text bold color={colors.BLACK} h5>Últimas transacciones</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("HistoryTransactionDetails", { data: props.transacciones })}
                    >
                        <Icon size={20} name={"right"} />
                    </TouchableOpacity>
                </Block> :
                <View>
                </View>}


            <Block flex={1} style={{ marginTop: 16 }}>
                {
                    props.transacciones != null ?
                        <FlatList
                            data={props.transacciones}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        /> : <Text h6 bold center style={{ color: colors.INFO, marginTop: 20 }}>No hay transacciones </Text>
                }

            </Block>
        </Block >
    );
}
const styles = StyleSheet.create({})
export default TransactionHistory
