import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Block, Button, Input, Text } from "galio-framework";
import colors from "../../modules/colors";

import AwesomeAlert from 'react-native-awesome-alerts';

const SignUp = (props) => {
  const [email, setEmail] = useState('')
  const [dui, setDui] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [user, setUser] = useState('')
  const [error, seterror] = useState('')
  const [confirm, setconfirm] = useState(false)
  const [problem, setproblem] = useState(false)
  const [mensaje, setmensaje] = useState('')

  useEffect(() => {
    if (error) {
      setproblem(true)
    }


  }, [error]);

  const handleLogin = async () => {
    if (password === confirm_password) {
      if (email !== "" && password !== "" && nombre !== "" && dui !== "" && confirm_password !== "") {
        try {
          const res = await fetch(`http://209.97.152.122:3001/auth/register`,
            {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer Token',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                nombre_completo: nombre,
                usuario: user,
                correo: email,
                contrasena: password,
                documento_identidad: dui,
                telefono: telefono,
              })
            });
          const resData = await res.json();
          console.log(resData)
          if (resData.ok === false) {
            seterror(true)
            setmensaje('No se pudo crear el usuario')
            setproblem(true)
          }
          else {
            console.log('todo bien con el registro')
            console.log(resData)
            setmensaje(resData.msg)
            setconfirm(true)
            
          }
          seterror(false)



        } catch (e) {
          console.log(e)
          seterror(e)
        }
      } else {
        console.log("Campos vacíos", "Por favor ingrese sus datos.", "warning")
      }
    }

  }
  const nextPage = () => {
    props.navigation.replace("Login")
  }
  return (
    <Block flex={1}>
      <ScrollView>
        <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />
        <Block right >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Login")}
            style={styles.signUpBtn}>
            <Text color={colors.PRIMARY} bold p>Iniciar sesión</Text>
          </TouchableOpacity>
        </Block>
        <Block flex={1} style={{ marginHorizontal: 24 }}>
          <Block style={{ marginTop: 32 }} >
            <Block style={{ backgroundColor: "transparent" }}>
              <Text h2 bold>Crear cuenta,</Text>
              <Text h4 bold color={colors.MUTED}>Llena la información para continuar</Text>
            </Block>
            <Block style={{ marginTop: 32 }}>
              <Block>
                <Input material placeholder={"Nombre completo"} value={nombre} onChangeText={text => setNombre(text)} />
              </Block>
              <Block>
                <Input material placeholder={"Usuario"} value={user} onChangeText={text => setUser(text)} />
              </Block>
              <Block>
                <Input material placeholder={"Numero unico de identidad (DUI)"} value={dui} onChangeText={text => setDui(text)} />
              </Block>
              <Block>
                <Input material placeholder={"Correo electrónico"} value={email} onChangeText={text => setEmail(text)} />
              </Block>
              <Block style={{ marginTop: 8 }}>
                <Input material placeholder={"Contraseña"} password viewPass value={password} onChangeText={text => setPassword(text)} />
              </Block>
              <Block style={{ marginTop: 8 }}>
                <Input material placeholder={"Confirmar contraseña"} password viewPass value={confirm_password} onChangeText={text => setConfirmPassword(text)} />
              </Block>
              <Block>
                <Input material placeholder={"Telefono"} value={telefono} onChangeText={text => setTelefono(text)} />
              </Block>
              <Block style={{ marginTop: 24 }}>
                <Button
                  onPress={() => handleLogin()}
                  round>Registrarme</Button>
              </Block>
            </Block>
          </Block>
        </Block>
        <AwesomeAlert
          show={confirm}
          showProgress={false}
          title="¡Usuario creado!"
          message={mensaje}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={colors.PRIMARY}
          onConfirmPressed={() => {
            setconfirm(false)
            nextPage();
          }}
        />
        <AwesomeAlert
          show={problem}
          showProgress={false}
          title="¡Un error ocurrió!"
          message={mensaje}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"

          onConfirmPressed={() => {
            setproblem(false)
          }}
        />
      </ScrollView>
    </Block>
  );
}
const styles = StyleSheet.create({
  signUpBtn: {
    padding: 16
  },
  bkgd: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: 250,
  },

})
export default SignUp
