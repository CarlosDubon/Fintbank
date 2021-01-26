import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native'
import { Block, Button } from "galio-framework";
import Text from "galio-framework/src/Text";
import colors from "../../modules/colors";
import { Image } from "react-native-paper/src/components/Avatar/Avatar";
import IconCardButton from "../Items/IconCardButton";

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

import * as authActions from '../../modules/store/actions/auth'
import { useNavigation } from '@react-navigation/native';

const Profile = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const name = useSelector(state => state.auth.name);
    const nextPage = () => {
        dispatch(authActions.logout());
        navigation.replace('Login')
    }
    return (
        <Block flex={1} style={{ backgroundColor: "#fff" }}>
            <ScrollView>
                <Block center style={{ marginTop: 24 }}>
                    <Text color={colors.MUTED} bold h5>Mi perfil</Text>
                </Block>
                <Block middle style={{ marginTop: 40 }}>
                    <Block>
                        <Image size={75} source={{ uri: 'https://api.adorable.io/avatars/285/abott@adorable.png' }} />
                    </Block>
                    <Block style={{ marginTop: 16 }} center>
                        <Block>
                            <Text color={colors.BLACK} bold size={24}>{name}</Text>
                        </Block>
                        <Block>
                            <Text color={colors.MUTED}>Cuenta corriente</Text>
                        </Block>
                    </Block>
                </Block>
                <Block center style={{ marginTop: 16 }}>
                    <Button color={colors.INFO} round>Mejorar cuenta</Button>
                </Block>
                <Block style={{ margin: 24 }}>
                    <Block>
                        <Text bold color={colors.MUTED}>General</Text>
                    </Block>
                    <Block style={{ marginTop: 16 }}>
                        <IconCardButton icon={"bell-ring"} title={"Notificaciones"} subtitle={"Configura tus notificaciones"} />
                        <IconCardButton icon={"security"} title={"Seguridad"} subtitle={"Opciones de seguridad"} />
                        <IconCardButton icon={"account-circle"} title={"Cuenta"} subtitle={"Edita tus datos"} />

                        <IconCardButton icon={"logout"} title={"Cerrar Sesion"} subtitle={""} nextPage={nextPage} />




                    </Block>
                </Block>
            </ScrollView>
        </Block>
    );
}
const styles = StyleSheet.create({

})
export default Profile
