import React, {useState} from 'react';
import {StyleSheet,TouchableOpacity} from 'react-native'
import {Block} from "galio-framework";
import {Image} from "react-native-paper/src/components/Avatar/Avatar";
import Text from "galio-framework/src/Text";
import colors from "../../modules/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Badge} from "react-native-paper";

const SmallProfile = (props) => {
    return (
        <Block style={styles.container} row>
            <Block>
                <Image size={50} source={{uri:'https://api.adorable.io/avatars/285/abott@adorable.png'}}/>
            </Block>
            <Block flex={1} middle left style={{marginStart:16}}>
                <Block>
                    <Text color={colors.BLACK} bold size={20}>Carlos Dubon</Text>
                </Block>
                <Block>
                    <Text color={colors.MUTED}>Cuenta corriente</Text>
                </Block>
            </Block>
            <Block>
                <TouchableOpacity>
                    <Block>
                        <Badge size={8} />
                        <Icon size={25} color={colors.BLACK} name={"bell-outline"} />
                    </Block>
                </TouchableOpacity>
            </Block>
        </Block>
    );
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:16,
        marginVertical:24
    }
})
export default SmallProfile
