import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function App() {
  const [serverState, setServerState] = React.useState("Loading...");
  const [messageText, setMessageText] = React.useState("");
  const [disableButton, setDisableButton] = React.useState(true);
  const [inputFieldEmpty, setInputFieldEmpty] = React.useState(true);
  const [serverMessages, setServerMessages] = React.useState([]);
  var ws = React.useRef(new WebSocket("ws://192.168.0.101:8080/")).current;

  React.useEffect(() => {
    const serverMessagesList = [];
    ws.onopen = () => {
      setServerState("Connected to the server");
      setDisableButton(false);
    };
    ws.onclose = (e) => {
      setServerState("Disconnected. Check internet or server.");
      setDisableButton(true);
    };
    ws.onerror = (e) => {
      setServerState(e.message);
    };
    ws.onmessage = (e) => {
      serverMessagesList.push(e.data);
      setServerMessages([...serverMessagesList]);
    };
  }, []);
  const submitMessage = () => {
    ws.send(messageText);
    setMessageText("");
    setInputFieldEmpty(true);
  };
  console.log(serverMessages);
  return (
    <View>
      <Text>{serverState}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingTop: 30,
    padding: 8,
  },
});
