import React, {useState} from 'react';
import {StyleSheet,TouchableOpacity} from 'react-native'
import {Block, Text} from "galio-framework";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import colors from "../../modules/colors";
import Card from "../Containers/Card";

const IconCardButton = ({icon,title,subtitle, nextPage}) => {
    return (
        <TouchableOpacity style={{marginTop:8}} onPress={nextPage}>
            <Card>
                <Block row>
                    <Block style={styles.containerIcon}>
                        <Icon name={icon} color={colors.PRIMARY} size={20} />
                    </Block>
                    <Block flex={1} middle left style={{marginStart:16}}>
                        <Block>
                            <Text color={colors.BLACK} bold>{title}</Text>
                        </Block>
                        <Block>
                            <Text color={colors.MUTED} size={12}>{subtitle}</Text>
                        </Block>
                    </Block>
                    <Block style={styles.containerIcon}>
                        <Entypo name={"chevron-right"} color={colors.BLACK} size={20}/>
                    </Block>
                </Block>
            </Card>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    containerIcon:{
        backgroundColor:colors.WHITE,
        padding:8,
        borderRadius:8
    }
})
export default IconCardButton
