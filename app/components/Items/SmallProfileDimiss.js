import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Block} from "galio-framework";
import {Image} from "react-native-paper/src/components/Avatar/Avatar";
import {Badge} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../modules/colors";

const SmallProfileDimiss = (props) => {
    return (
        <Block style={styles.container} row space={"between"}>
            <Block middle>
                <Image size={30} source={{uri:'https://api.adorable.io/avatars/285/abott@adorable.png'}}/>
            </Block>
            <Block middle>
                <TouchableOpacity>
                    <Block>
                        <Badge size={8} />
                        <Icon size={20} color={colors.BLACK} name={"bell-outline"} />
                    </Block>
                </TouchableOpacity>
            </Block>
        </Block>
    );
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:16,
        marginVertical:16
    }
})
export default SmallProfileDimiss
