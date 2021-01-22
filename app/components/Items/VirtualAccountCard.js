import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native'
import { Block, Text } from "galio-framework";
import colors from "../../modules/colors";
import { useSelector } from 'react-redux';

const VirtualAccountCard = (props) => {
    const name = useSelector(state => state.auth.name);

    return (
        <Block style={styles.container}>
            <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />
            <Image style={styles.bkgdBottom} source={require("../../modules/images/background-bottom-01.png")} />
            <Block flex={1}>
                <Block style={styles.textContainer}>
                    <Block row space={"between"} >
                        <Image style={styles.chip} source={require("../../../assets/images/tarjeta.png")} />
                        <Text h6 color={colors.WHITE}>{props.saldo}</Text>
                    </Block>
                    <Block style={{ marginTop: 15, marginRight:30 }}>
                        <Block row space={"between"}>
                        <Text bold h5 color={colors.WHITE}>{props.cuenta}</Text>
                        <Text bold h5 color={colors.WHITE}>{props.cuenta2}</Text>
                        <Text bold h5 color={colors.WHITE}>{props.cuenta3}</Text>
                        </Block>
                        
                    </Block>
                    <Block style={{ marginTop: 15 }}>
                        <Text h6 color={colors.WHITE}>Creación</Text>
                        <Text h6 color={colors.WHITE} bold>{props.fecha}</Text>
                    </Block>

                    <Block style={{ marginTop: 15 }} row space={"between"}>
                        <Block>
                            <Text bold h5 color={colors.WHITE}>{name}</Text>
                        </Block>
                        <Block right>
                            <Text bold h5 color={colors.WHITE}>VISA</Text>
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
        height: 240,
        backgroundColor: "#82ccdd"
    },
    textContainer: {
        paddingVertical: 26,
        paddingHorizontal: 12
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
