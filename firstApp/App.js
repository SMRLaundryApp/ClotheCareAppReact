import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
// import { ImagePicker } from 'react-native-image-picker';

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
      <Text style={styles.instructions}>
        Take a picture of the laundry label
      </Text>

      <Camera style={styles.cameraView} type={type} ratio='4:3'>
        <View style={styles.camera}></View>
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
            // Put something here to save a picture to a server for the image recognition
          }}>
          <Text style={styles.buttonTakePhotoText}>Take a photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


// const [hasPermission, setHasPermission] = useState(null);
// const [type, setType] = useState(Camera.Constants.Type.back);

// export default class App extends ReactDOM {

//   async useEffect() {
//     var status = await Camera.requestPermissionsAsync();
//     if (hasPermission === null) {
//       return <View />;
//     }
//     if (hasPermission === false) {
//       return <Text>No access to camera</Text>;
//     }
//   }

//   takePicture() {
//     this.camera
//     .capture()
//     .then(data => this.saveImage(data.path))
//     .catch(err => console.error('capture picture error', err));
//   }
  
//   render(){ 
//         return (
//           <View style={styles.container}>
//             <Text style={styles.instructions}>
//               Take a picture of the laundry label
//             </Text>
//             <Camera ref={cam => {this.camera = cam}} style={styles.cameraView} type={type} ratio='4:3'>
//               <View style={styles.camera}></View>
//             </Camera>

//             <View style={styles.buttons}>
//               <TouchableOpacity style={styles.buttonCameraFlip} onPress={() => {
//                 setType(
//                   type === Camera.Constants.Type.back
//                     ? Camera.Constants.Type.front
//                     : Camera.Constants.Type.back
//                   );
//                 }}>
//                 <Text style={styles.buttonCameraFlipText}>Flip</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.buttonTakePhoto} onPress={cam.takePicture.bind(cam)}>
//                 <Text style={styles.buttonTakePhotoText}>Take a photo</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         );

//       }
//     }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  instructions: {
    alignSelf: 'center',
    color:'#666',
    fontSize: 20,
    margin: 15,
  },
  camera: {
    backgroundColor: 'transparent',
  },
  buttonCameraFlip: {
    backgroundColor: 'blue',
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
    alignSelf: 'center',
    height: 400,
    width: 300,
    margin: 10,
  },
  buttons: {
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
    padding: 10,
    margin: 10,
    borderRadius: 5, 
    width: 200,
  }
});
