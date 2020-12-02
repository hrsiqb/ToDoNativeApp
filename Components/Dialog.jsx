import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Input, Textarea } from 'native-base';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Dialog from "react-native-dialog";
import ms from '../styles'

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

function AddDialog(props) {
  const [toDo, setToDo] = useState('')

  const handleToDo = () => {
    if (toDo) {
      props.addToDo(toDo)
      setToDo('')
    }
  }
  return (
    <Dialog.Container visible={props.visible}>
      <TouchableOpacity style={[ms.pos_ab, ms.rit_0, ms.top_0, ms.jc_c, ms.ai_c, ms.w_30p, ms.h_30p]}
        onPress={props.closeDialog}>
        <FontAwesomeIcon icon={faTimes} size={15} />
      </TouchableOpacity>
      <Dialog.Title style={[ms.ta_c, ms.fw_b]}>Add ToDo</Dialog.Title>
      <Textarea rowSpan={5} bordered placeholder="To Do..." onChangeText={text => setToDo(text)} />
      <View style={[ms.fd_r, ms.jc_sa, s.mt3]}>
        <Dialog.Button label="Add" style={[ms.bc_grn, ms.bRad_50, ms.fc_w, ms.bRad_5, ms.w_100p]} onPress={handleToDo} />
        <Dialog.Button label="Cancel" style={[ms.bc_red, ms.bRad_50, ms.fc_w, ms.bRad_5, ms.w_100p]} onPress={props.closeDialog} />
      </View>
    </Dialog.Container>
  );
}

function ActionDialog(props) {
  return (
    <Dialog.Container visible={props.visible} >
      {/* {alert(props.key)} */}
      <TouchableOpacity style={[ms.pos_ab, ms.rit_0, ms.top_0, ms.jc_c, ms.ai_c, ms.w_30p, ms.h_30p]}
        onPress={props.closeDialog}>
        <FontAwesomeIcon icon={faTimes} size={15} />
      </TouchableOpacity>
      <Dialog.Title style={[ms.ta_c, ms.fw_b]}>Action</Dialog.Title>
      <View style={[ms.fd_r, ms.jc_c]}>
        <Dialog.Button label="Edit ToDo" style={[ms.bRad_50, ms.fc_w, ms.bRad_5, ms.w_100p, s.mr2,
        ms.bd_c_blu, ms.fc_blu, ms.bw_1]} onPress={() => props.action('edit', props.id)} />
        <Dialog.Button label="Delete ToDo" style={[ms.bRad_50, ms.fc_w, ms.bRad_5, ms.w_100p, ms.bd_c_red,
        ms.fc_red, ms.bw_1]} onPress={() => props.action('delete', props.id)} />
      </View>
      <View style={[s.m3, ms.bd_c_gry, ms.bbw_1, {}]}></View>
      <View>
        <Dialog.Button label="Delete All" style={[ms.bc_red, ms.bRad_50, ms.fc_w, ms.bRad_5, ms.w_200p]}
          onPress={() => props.action('delete all')} />
      </View>
    </Dialog.Container>
  );
}

function EditDialog(props) {
  const [toDo, setToDo] = useState('')

  const handleToDo = () => toDo && props.update(toDo, props.id)
  return (
    <Dialog.Container visible={props.visible}>
      <TouchableOpacity style={[ms.pos_ab, ms.rit_0, ms.top_0, ms.jc_c, ms.ai_c, ms.w_30p, ms.h_30p]}
        onPress={props.closeDialog}>
        <FontAwesomeIcon icon={faTimes} size={15} />
      </TouchableOpacity>
      <Dialog.Title style={[ms.ta_c, ms.fw_b]}>Edit ToDo</Dialog.Title>
      <Textarea rowSpan={5} bordered defaultValue={props.value} onChangeText={text => setToDo(text)} />
      <View style={[ms.fd_r, ms.jc_sa, s.mt3]}>
        <Dialog.Button label="Update" style={[ms.bc_grn, ms.bRad_50, ms.fc_w, ms.bRad_5, ms.w_100p]} onPress={handleToDo} />
        <Dialog.Button label="Cancel" style={[ms.bc_red, ms.bRad_50, ms.fc_w, ms.bRad_5, ms.w_100p]} onPress={props.closeDialog} />
      </View>
    </Dialog.Container>
  );
}
export { AddDialog, ActionDialog, EditDialog }