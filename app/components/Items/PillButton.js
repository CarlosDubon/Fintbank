import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Block, Text} from "galio-framework";
import colors from "../../modules/colors";

const PillButton =
    ({
         button1Title,
         button2Title,
         selected
     }) => {
        return (
            <Block row>
                <TouchableOpacity style={[styles.btnLeft,selected===1?{backgroundColor:colors.PRIMARY}:{backgroundColor:colors.WHITE}]} >
                    <Block>
                        <Text color={selected===1?colors.WHITE:colors.PRIMARY}>{button1Title}</Text>
                    </Block>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnRight,selected===2?{backgroundColor:colors.PRIMARY}:{backgroundColor:colors.WHITE}]} >
                    <Block>
                        <Text color={selected===2?colors.WHITE:colors.PRIMARY}>{button2Title}</Text>
                    </Block>
                </TouchableOpacity>
            </Block>
        );
    }
const styles = StyleSheet.create({
    btnLeft:{
        borderWidth:1,
        paddingHorizontal:24,
        paddingVertical:8,
        borderTopStartRadius:16,
        borderBottomStartRadius:16,
        borderColor:colors.PRIMARY
    },
    btnRight:{
        borderWidth:1,
        paddingHorizontal:24,
        paddingVertical:8,
        borderTopEndRadius:16,
        borderBottomEndRadius:16,
        borderColor:colors.PRIMARY
    }
})
export default PillButton
