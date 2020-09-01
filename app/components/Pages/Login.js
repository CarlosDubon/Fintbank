import React, {useState} from 'react';
import {StyleSheet,TouchableOpacity,Image} from 'react-native'
import {Block, Button, Input, Text, theme} from "galio-framework";
import colors from "../../modules/colors";

const Login = (props) => {
    return (
        <Block flex={1} style={{backgroundColor:colors.WHITE}}>
            <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />
            <Image style={styles.bkgdBottom} source={require("../../modules/images/background-bottom-01.png")} />
            <Block right >
                <TouchableOpacity
                    onPress={()=>props.navigation.navigate("SignUp")}
                    style={styles.signUpBtn}>
                    <Text color={colors.PRIMARY} bold p>Registrarse</Text>
                </TouchableOpacity>
            </Block>
            <Block flex={1} style={{marginHorizontal:24}}>
                <Block style={{marginTop:32}}>
                    <Block >
                        <Text h2 bold>Bienvenido,</Text>
                        <Text h4 bold color={colors.MUTED}>Inicia sesión para continuar</Text>
                    </Block>
                    <Block style={{marginTop:80}}>
                        <Block>
                            <Input placeholder={"Correo electrónico"} />
                        </Block>
                        <Block style={{marginTop:8}}>
                            <Input placeholder={"Contraseña"} password viewPass/>
                        </Block>
                        <Block right>
                            <TouchableOpacity>
                                <Text bold color={colors.PRIMARY}>¿Olvidaste tu contraseña?</Text>
                            </TouchableOpacity>
                        </Block>
                        <Block style={{marginTop:24}}>
                            <Button
                                color={colors.PRIMARY}
                                onPress={()=>props.navigation.navigate("Home")}
                                round>Iniciar sesión</Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
}
const styles = StyleSheet.create({
    signUpBtn:{
        padding:16
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
export default Login
