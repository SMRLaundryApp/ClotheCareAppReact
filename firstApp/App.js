import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera'
import { AuthSession } from 'expo';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      {/* <Image source={{ uri:"https://i.imgur.com/TkIrScD.png"}} style={styles.logo} /> */}

      <Camera style={styles.cameraView} type={type} ratio='4:3'>

        <View style={styles.camera}>
          {/* <TouchableOpacity style={styles.buttonCameraFlip} onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.buttonCameraFlipText}>Flip</Text>
          </TouchableOpacity> */}
        </View>
      </Camera>

      <TouchableOpacity style={styles.buttonCameraFlip} onPress={() => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
          );
        }}>
        <Text style={styles.buttonCameraFlipText}>Flip</Text>
      </TouchableOpacity>

      <Text style={styles.instructions}>
        Test!!
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={styles.button}>
        <Text style={styles.buttonText}>Take a photo</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color:'#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  camera: {
    height: 640,
    width: 360,
    backgroundColor: 'transparent',
  },
  buttonCameraFlip: {
    backgroundColor: 'blue',
    marginLeft: 20,
    marginTop: 10,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 5,
    width: 80,
  },
  buttonCameraFlipText: {
    fontSize: 20,
    color: '#fff',
  },
  cameraView: {
    height: 400,
    width: 300,
    marginHorizontal: 30,
    marginTop: 50,
  }
});
