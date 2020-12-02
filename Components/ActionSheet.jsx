import React, { Component } from "react";
import { Text, View } from 'react-native';
import { Button, Root, ActionSheet } from "native-base";
import { faEdit } from '@fortawesome/free-solid-svg-icons'
var BUTTONS = [
    { text: "Edit To Do", icon: "faEdit", iconColor: "#2c8ef4" },
    { text: "Delete To Do", icon: "trash", iconColor: "#fa213b" },
    { text: "Delete All", icon: "trash", iconColor: "#fa213b" },
    { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;
export default function ActionSheetComp(props) {

    return (
        <Root>
            {alert('here')}
            <View>
                <Button
                    onPress={() =>
                        ActionSheet.show(
                            {
                                options: BUTTONS,
                                cancelButtonIndex: CANCEL_INDEX,
                                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                title: "Testing ActionSheet"
                            },
                            buttonIndex => {
                                alert(BUTTONS[buttonIndex])
                                // this.setState({ clicked: BUTTONS[buttonIndex] });
                            }
                        )
                    }
                >
                    <Text>Actionsheet</Text>
                </Button>
            </View>
        </Root>
    );
}