import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native'
import {Block, Text} from "galio-framework";
import colors from "../../modules/colors";

const VirtualAccountCard = (props) => {
    return (
        <Block style={styles.container}>
            <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />
            <Image style={styles.bkgdBottom} source={require("../../modules/images/background-bottom-01.png")} />
            <Block flex={1}>
                <Block style={styles.textContainer}>
                    <Block row space={"between"}>
                        <Text color={colors.WHITE}>Balance</Text>
                        <Text bold h5 color={colors.WHITE}>Fintbank</Text>
                    </Block>
                    <Block>
                        <Text bold h4 color={colors.WHITE}>$350.00</Text>
                    </Block>
                    <Block style={{marginTop:8}} row>
                        <Block flex={1}>
                            <Text color={colors.WHITE}>No. Cuenta</Text>
                            <Text color={colors.WHITE} h5>{`5210\t1234\t456\t9000`}</Text>
                        </Block>
                        <Block right>
                            <Text color={colors.WHITE}>Creación</Text>
                            <Text color={colors.WHITE} bold>26/6/2020</Text>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
}
const styles = StyleSheet.create({
    container:{
        borderRadius:16,
        overflow:"hidden",
        height:150,
        backgroundColor:"#82ccdd"
    },
    textContainer:{
        paddingVertical:16,
        paddingHorizontal:12
    },
    bkgd:{
        position:"absolute",
        top:0,
        left:0,
        width:250,
        height:250,
    },
    bkgdBottom:{
        position:"absolute",
        bottom:0,
        right:0,
        width:300,
        height:300,
    }
})
export default VirtualAccountCard
