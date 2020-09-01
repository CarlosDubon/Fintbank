import React, {useState} from 'react';
import {StyleSheet} from 'react-native'
import {Block, Text} from "galio-framework";
import {Image} from "react-native-paper/src/components/Avatar/Avatar";
import colors from "../../modules/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TransactionResumeItem = ({data}) => {

    return (
        <Block style={styles.container} row>
            <Block>
                <Image size={40} source={{uri:'https://api.adorable.io/avatars/285/abott@adorable.png'}}/>
            </Block>
            <Block flex={2} middle left style={{marginStart:16}}>
                <Block>
                    <Text color={colors.BLACK} bold >Andy Landaverde</Text>
                </Block>
                <Block row middle>
                    <Icon color={data?colors.ERROR:colors.SUCCESS} name={data?"arrow-top-right":"arrow-bottom-left"} />
                    <Text color={colors.MUTED} >{data?"Retiro":"Ingreso"}</Text>
                </Block>
            </Block>
            <Block middle>
                <Text bold h5 color={colors.BLACK} >$100</Text>
                <Text  color={colors.MUTED} >26/6/2020</Text>
            </Block>
        </Block>
    );
}
const styles = StyleSheet.create({
    container:{
        paddingVertical:4,
        marginVertical:8
    }
})
export default TransactionResumeItem
