import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default function ToDo(props) {
    return (
        <TouchableOpacity key={props.ind} style={[s.p3, s.pt2, s.pb2, s.m1, ms.bRad_15, ms.as_fs, ms.w_m_50,
        { backgroundColor: props.color }]}
            activeOpacity={0.8}
            // delayLongPress={500}
            onLongPress={() => props.showActionSheet(props.ind)}
        >
            <Text style={[ms.fc_w, ms.fs_20]}>
                {props.toDo}
            </Text>
        </TouchableOpacity>
    )
}
