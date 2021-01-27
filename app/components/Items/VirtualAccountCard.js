import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native'
import { Block, Text } from "galio-framework";
import colors from "../../modules/colors";
import { useSelector } from 'react-redux';
import { color } from 'react-native-reanimated';

const VirtualAccountCard = (props) => {
    const name = useSelector(state => state.auth.name);

    return (
        <Block style={styles.container}>
            <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />
            <Image style={styles.bkgdBottom} source={require("../../modules/images/background-bottom-01.png")} />
            <Block flex={1}>
                <Block style={styles.textContainer}>
                    <Block style={{ marginTop: 25 }} row space={"between"}>
                        <Block>
                            <Text bold h4 color={colors.WHITE}>${props.saldo}</Text>
                        </Block>
                        <Block right>
                            <Text italic bold h5 color={colors.WHITE}>VISA</Text>
                        </Block>
                    </Block>
                    <Block row space={"between"} style={{marginTop:7}}>
                        <Text h6 color={colors.WHITE}>Credit Card-{props.cuenta3}</Text>
                    </Block>
                    <Block style={{ marginTop: 30,  width:Dimensions.get('window').width/1.8}}>
                        <Block row space={"between"} >
                            <Text bold h5 color={colors.WHITE} style={{backgroundColor: '#84e6e6', borderRadius:10, paddingHorizontal:4, paddingVertical:4}}>{props.cuenta}</Text>
                            <Text bold h5 color={colors.WHITE} style={{backgroundColor:'#84e6e6', borderRadius:10, paddingHorizontal:4, paddingVertical:4}}>{props.cuenta2}</Text>
                            <Text bold h5 color={colors.WHITE} style={{backgroundColor:'#84e6e6', borderRadius:10, paddingHorizontal:4, paddingVertical:4}}>{props.cuenta3}</Text>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: "hidden",
        height: 200,
        backgroundColor: "#82ccdd"
    },
    textContainer: {
        paddingVertical: 10,
        paddingHorizontal: 18
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
        height: 40,
        width: 50,

    }
})
export default VirtualAccountCard
