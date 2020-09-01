import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Block, Button, Input, Text} from "galio-framework";
import colors from "../../modules/colors";

const SignUp = (props) => {
    return (
        <Block flex={1}>
            <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />
            <Block right >
                <TouchableOpacity
                    onPress={()=>props.navigation.navigate("Login")}
                    style={styles.signUpBtn}>
                    <Text color={colors.PRIMARY} bold p>Iniciar sesión</Text>
                </TouchableOpacity>
            </Block>
            <Block flex={1} style={{marginHorizontal:24}}>
                <Block style={{marginTop:32}} >
                    <Block style={{backgroundColor:"transparent"}}>
                        <Text h2 bold>Crear cuenta,</Text>
                        <Text h4 bold color={colors.MUTED}>Llena la información para continuar</Text>
                    </Block>
                    <Block style={{marginTop:32}}>
                        <Block>
                            <Input material placeholder={"Nombre completo"} />
                        </Block>
                        <Block>
                            <Input material placeholder={"Numero unico de identidad (DUI)"} />
                        </Block>
                        <Block>
                            <Input material placeholder={"Correo electrónico"} />
                        </Block>
                        <Block style={{marginTop:8}}>
                            <Input material placeholder={"Contraseña"} password viewPass/>
                        </Block>
                        <Block style={{marginTop:8}}>
                            <Input material placeholder={"Confirmar contraseña"} password viewPass/>
                        </Block>
                        <Block style={{marginTop:24}}>
                            <Button
                                onPress={()=>props.navigation.navigate("Home")}
                                round>Registrarme</Button>
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

})
export default SignUp
