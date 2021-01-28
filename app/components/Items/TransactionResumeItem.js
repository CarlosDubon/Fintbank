import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { Block, Text } from "galio-framework";
import { Image } from "react-native-paper/src/components/Avatar/Avatar";
import colors from "../../modules/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from 'react-redux';
import Tooltip from 'rn-tooltip';

const TransactionResumeItem = ({ data }) => {
    const tarjeta = useSelector(state => state.auth.tarjeta);

    return (
        <Block>
            <Block style={styles.container} row>
                <Block>
                    <Image size={40} source={{ uri: 'https://api.adorable.io/avatars/285/abott@adorable.png' }} />
                </Block>
                <Block flex={2} middle left style={{ marginStart: 16 }}>
                    <Block>
                        <Text color={colors.BLACK} bold >{data.transacciones[0].cuenta_remitente_id === tarjeta ? data.transacciones[0].recibe.nombre_completo : (data.transacciones[0].remitente !== null ? data.transacciones[0].recibe.nombre_completo : 'Desconocido')}</Text>
                    </Block>
                    <Block row middle>
                        <Icon color={data.transacciones[0].cuenta_remitente_id === tarjeta ? colors.ERROR : colors.SUCCESS} name={data.transacciones[0].cuenta_remitente_id !== tarjeta ? "arrow-top-right" : "arrow-bottom-left"} />
                        <Text color={colors.MUTED} >{data.transacciones[0].cuenta_remitente_id === tarjeta ? "Retiro" : "Ingreso"}</Text>
                    </Block>
                    <Block style={{ borderRadius: 10, borderColor: 'blue', borderWidth: 1 }}>
                        <Tooltip height={60} popover={<Text style={{ color: colors.WHITE }}>{data.transacciones[0].concepto}</Text>}>
                            <Icon name={'information-variant'} color={colors.PRIMARY} size={20} />
                        </Tooltip>
                    </Block>


                </Block>
                <Block middle>
                    <Text bold h5 color={colors.BLACK} >${data.transacciones[0].monto}</Text>
                    <Text color={colors.MUTED} >{data.transacciones[0].created_at.substr(0, 10)}</Text>
                </Block>

            </Block>


        </Block>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 4,
        marginVertical: 8,
    }
})
export default TransactionResumeItem
