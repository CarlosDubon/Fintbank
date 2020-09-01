import React, {useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Block, theme} from 'galio-framework';

const Card = (props) => {
    return (
        <View style={{
            ...props.style,
            ...styles.card,
        }}>
            <Block>
                {props.children}
            </Block>
        </View>
    );
};
const styles = StyleSheet.create({
    card:{
        display:"flex",
        paddingVertical:15,
        paddingHorizontal:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderRadius:theme.SIZES.CARD_BORDER_RADIUS*2,
        backgroundColor:theme.COLORS.WHITE,
    }
})
export default Card;
