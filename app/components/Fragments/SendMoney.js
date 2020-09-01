import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity,FlatList} from 'react-native'
import {Block, Button, Input, Text} from "galio-framework";
import colors from "../../modules/colors";
import Icon from "react-native-vector-icons/Entypo";
import Card from "../Containers/Card";

const SendMoney = (props) => {
    const [money,setMoney] = useState(50)
    const [suggest,setSuggest] = useState([50,100,150,300])

    const renderItem=({item})=>(
        <TouchableOpacity
            onPress={()=>setMoney(item)}
            style={{marginHorizontal:8}}>
            <Block style={styles.button}>
                <Text bold color={colors.MUTED}> $ {item} </Text>
            </Block>
        </TouchableOpacity>
    )
    const emptyAvatar=(
        <Block style={styles.emptyAvatar}>

        </Block>
    )
    return (
        <Block flex={1}>
            <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />

            <Block style={{marginTop:24}}>
                <Text h4 bold center color={colors.BLACK}>Enviar dinero</Text>
                <Text h5 bold center color={colors.MUTED}>¿Que cantidad deseas enviar?</Text>
            </Block>
            <Block flex={1} style={styles.container} >
                <Block flex={1}>
                    <Block>
                        <Text center color={colors.MUTED} bold>Ajusta la cantidad que deseas enviar</Text>
                    </Block>
                    <Block row style={{marginTop: 32}}>
                        <Block flex={1} middle>
                            <TouchableOpacity
                                onPress={()=>setMoney(money-5)}
                            >
                                <Block style={styles.button}>
                                    <Icon name={"minus"} color={colors.MUTED} size={20} />
                                </Block>
                            </TouchableOpacity>
                        </Block>
                        <Block flex={2} middle>
                            <Text center size={72} color={colors.PRIMARY}>${money}</Text>
                        </Block>
                        <Block flex={1} middle>
                            <TouchableOpacity
                                onPress={()=>setMoney(money+5)}
                            >
                                <Block style={styles.button}>
                                    <Icon name={"plus"} color={colors.MUTED} size={20} />
                                </Block>
                            </TouchableOpacity>
                        </Block>
                    </Block>
                    <Block style={{marginTop: 24}} row center>
                        <FlatList
                            data={suggest}
                            renderItem={renderItem}
                            keyExtractor={item => item.toString()}
                            horizontal
                            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                        />
                    </Block>
                    <Block style={{marginTop: 16}}>
                        <Block>
                            <Text bold p color={colors.BLACK}>Destinatario:</Text>
                        </Block>
                        <Card style={{marginTop: 8,marginHorizontal:16}}>
                            <Block>
                                <Block row  middle>
                                    <Block>
                                        {emptyAvatar}
                                    </Block>
                                    <Block flex={1} style={{marginStart:8}}>
                                        <Input placeholder={"Ingrese el correo electronico"} borderless />
                                    </Block>
                                </Block>
                            </Block>
                        </Card>
                    </Block>
                </Block>
                <Block>
                    <Button color={colors.PRIMARY} round>Enviar</Button>
                </Block>
            </Block>
        </Block>
    );
}
const styles = StyleSheet.create({
    container:{
        marginTop:24,
        backgroundColor:"#fff",
        borderTopStartRadius:60,
        borderTopEndRadius:60,
        paddingVertical:24,
        paddingHorizontal:16
    },
    button:{
        backgroundColor: "#EEEEEE",
        padding:8,
        borderRadius:8
    },
    bkgd:{
        position:"absolute",
        top:0,
        left:0,
        width:200,
        height:200,
    },
    emptyAvatar:{
        width: 50,
        height: 50,
        borderRadius: 50/2,
        backgroundColor:colors.WHITE,
        borderColor:colors.MUTED,
        borderWidth:1,
        borderStyle:"dashed"
    }
})
export default SendMoney
