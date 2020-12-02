import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ms from './styles'
import { AddDialog, ActionDialog, EditDialog } from "./Components/Dialog";
import ToDo from './Components/ToDo'
import ActionSheetComp from './Components/ActionSheet'

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

var colors = ["#7acbbd", "#ffb72b", "#855fc1", "#ea4986", "#ff8737"]
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thirsday", "Friday", "Saturday"]
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function App() {
  const [name, setName] = useState('haris')
  const [day, setDay] = useState('---')
  const [date, setDate] = useState('-----')
  const [time, setTime] = useState('---')
  const [dialogVisibility, setDialogVisibility] = useState(false)
  const [actionVisibility, setActionVisibility] = useState(false)
  const [editVisibility, setEditVisibility] = useState(false)
  const [actionKey, setActionKey] = useState()
  const [prevToDo, setPrevToDo] = useState()
  const [toDos, setToDos] = useState([])

  useEffect(() => {
    setInterval(() => {
      var dateTime = new Date()
      var formattedMinutes = dateTime.getMinutes()
      var formattedHours = dateTime.getHours()
      setDay(days[dateTime.getDay()])
      setDate(months[dateTime.getMonth()] + ' ' + dateTime.getDate() + ', ' + dateTime.getFullYear())
      if (formattedMinutes < 10)
        formattedMinutes = "0" + formattedMinutes
      if (formattedHours < 10)
        formattedHours = "0" + formattedHours

      setTime(formattedHours + ':' + formattedMinutes)
    }, 1000)
  }, [])
  addToDo = toDo => {
    setToDos([...toDos, toDo])
    closeDialog()
    toDos.map(data => console.log(data))
  }
  updateTodo = (newToDoVal, id) => {
    let newToDo = toDos
    newToDo.splice(id, 1, newToDoVal)
    setToDos(newToDo)
    closeDialog()
  }
  const action = (type, id) => {
    closeDialog()
    let newToDos = toDos
    switch (type) {
      case 'edit':
        setPrevToDo(toDos[id])
        setEditVisibility(true)
        break
      case 'delete':
        newToDos.splice(id, 1)
        setToDos(newToDos)
        break
      case 'delete all':
        newToDos.splice(0)
        setToDos(newToDos)
        break
      default:
        break
    }
  }

  closeDialog = () => {
    setDialogVisibility(false)
    setActionVisibility(false)
    setEditVisibility(false)
  }
  var colorInd = 0
  var toDoData = toDos.map((toDo, key) => {
    { colorInd < 4 ? colorInd++ : colorInd = 0 }
    // var ind = key
    return <ToDo toDo={toDo} ind={key} showActionSheet={key => {
      setActionVisibility(true)
      setActionKey(key)
    }} color={colors[colorInd]} />
  })
  return (
    <>
      <View style={[ms.bc_blu, ms.fl_1]}>
        <StatusBar hidden />
        <View style={[ms.fl_1, ms.bc_blu]}>
          {/*============== Greeting ==============*/}
          <View style={[ms.w_100, s.p3, s.pb0]}>
            <Text style={[ms.fs_20, ms.fc_w]}>hey {name},</Text>
            <Text style={[ms.fs_20, ms.fc_w, ms.fw_b]}>What's your plan?</Text>
          </View>
          {/*============== Date Time ==============*/}
          <View style={[ms.fl_1, ms.ai_c, ms.jc_c, ms.bc_blu]}>
            <Text style={[ms.fs_25, ms.fc_w]}>{day}</Text>
            <Text style={[ms.fs_25, ms.fc_w]}>{date}</Text>
            <Text style={[ms.fs_35, ms.fc_w]}>{time}</Text>
          </View>
        </View>
        {/*============== Main Body ==============*/}
        <View style={[ms.fl_2, ms.bc_w, ms.btlRad_30p, ms.btrRad_30p, ms.of_h, s.p2, s.pt0, s.pb0]}>
          {/*============== To Do's ==============*/}
          <ScrollView>{toDoData}</ScrollView>
          {/*============== Add Button ==============*/}
          <View style={[ms.fl_6, ms.w_100]}>
            <TouchableOpacity style={[ms.w_65p, ms.h_65p, ms.jc_c, ms.ai_c, ms.bc_blu, ms.bRad_50,
            ms.pos_ab, ms.bot_20, ms.rit_15]} onPress={() => setDialogVisibility(true)}>
              <FontAwesomeIcon icon={faPlus} color={'white'} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*============== Add Dialog ==============*/}
      <AddDialog visible={dialogVisibility} closeDialog={closeDialog} addToDo={toDo => addToDo(toDo)} />
      {/*============== Action Dialog ==============*/}
      <ActionDialog visible={actionVisibility} id={actionKey} closeDialog={closeDialog}
        action={(type, id) => action(type, id)} />
      <EditDialog visible={editVisibility} id={actionKey} closeDialog={closeDialog}
        value={prevToDo} update={(newToDo, id) => updateTodo(newToDo, id)} />

    </>
  );
}
