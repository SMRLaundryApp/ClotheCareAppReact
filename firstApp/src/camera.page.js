import React from 'react';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNFetchBlob } from 'react-native-fetch-blob';
import * as Permissions from 'expo-permissions';

import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import { addListener } from 'expo/build/Updates/Updates';

fetch('MY_API_URL', {
    method: 'POST',
    body: JSON.stringify({
      userId: '123'
    }),
})

const createFormData = (photo, body) => {
    const data = new FormData();
  
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
};

export default class CameraPage extends React.Component {
    camera = null;

    state = {
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

    handleUploadPhoto = () => {
        fetch("http://192.168.1.208:3000/api/upload", {
            method: "POST",
            body: createFormData(this.state.captures, { userId: "123" })
        })
        .then(response => response.json())
        .then (response => {
            console.log("upload succes", response);
            alert("Upload succes!");
            this.setState({ photo: null });
        })
        .catch(err => {
            console.log("upload error", err);
            alert("Upload failed!");
        });
    };

    

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Text style={styles.laundryText}>
                        Take a picture of the laundry label
                    </Text>
                </View>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                        ratio='4:3'
                    />
                </View>

                {captures.length > 0 && <Gallery captures={captures}/>}

                <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.buttonUpload} onPress={this.handleUploadPhoto}>
                        <Text style={styles.buttonUploadText}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        );
    };
};