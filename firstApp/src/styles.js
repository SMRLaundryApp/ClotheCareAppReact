
import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const laundryTextMarginTop = 50;

export default StyleSheet.create({
    laundryText: {
        margin: 20,
        marginTop: laundryTextMarginTop,
        alignSelf: 'center',
        fontSize: 20,
        color: '#444'
    },
    alignCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        height: winWidth / 3 * 4,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    bottomToolbar: {
        width: winWidth,
        position: 'absolute',
        height: 100,
        top: laundryTextMarginTop - 50 + winWidth / 3 * 4,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
    galleryContainer: { 
        bottom: 100 
    },
    galleryImageContainer: { 
        width: 75, 
        height: 75, 
        marginRight: 5 
    },
    galleryImage: { 
        width: 75, 
        height: 75 
    },
    buttonUpload: {
        backgroundColor: 'blue',
        margin: 10,
        padding: 10,
        borderRadius: 5,
        width: 100,
        bottom: - winWidth / 3 * 2,
    },
    buttonUploadText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#fff',
    },
});