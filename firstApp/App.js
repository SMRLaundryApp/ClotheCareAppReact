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
    <View style={styles.container}>
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

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonCameraFlip} onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
            );
          }}>
          <Text style={styles.buttonCameraFlipText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonTakePhoto} onPress={() => {
            // ref={ref => {
            //   this.camera = ref;
            // }}
            // takePicture = async () => {
            //   if (this.camera) {
            //     let photo = await this.camera.takePictureAsync();
            //   }
            // }
          }}>
          <Text style={styles.buttonTakePhotoText}>Take a photo</Text>
        </TouchableOpacity>
      </View>

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
    alignContent: 'center',
    justifyContent: 'center',
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
    // alignSelf: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: 80,
  },
  buttonCameraFlipText: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center'
  },
  cameraView: {
    height: 400,
    width: 300,
    marginHorizontal: 30,
  },
  buttons: {
    // alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonTakePhotoText: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#fff'
  },
  buttonTakePhoto: {
    backgroundColor: 'purple',
    // alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 5, 
    width: 200,
  }
});
