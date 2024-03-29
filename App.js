import { Camera, CameraType, onCameraReady } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

export default function App () {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [isCameraReady, setIsCameraReady] = useState(false);

    const camera = useRef();
    const TensorCamera = cameraWithTensors(Camera);



    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const onCameraReady = () => {
        // setIsCameraReady(true);
        console.log("camera is ready!");
        // camera.current.pausePreview();
        // takePic();
    };
    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        // console.log(camera.current.takePictureAsync(options));
        let newPhoto = await camera.current.takePictureAsync(options);
        console.log(newPhoto);
        // let img = cv.imread(imageSource);
    };
    function toggleCameraType () {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
        // console.log(camera.current);
    }
    // camera.current.onCameraReady(() => console.log("camera is ready"));
    return (
        <View style={styles.container} >
            <TensorCamera
                style={styles.camera}
                type={Camera.Constants.Type.back}
                onReady={() => { }}
                resizeHeight={200}
                resizeWidth={152}
                resizeDepth={3}
                autorender={true}
                cameraTextureHeight={textureDims.height}
                cameraTextureWidth={textureDims.width}
            />
        </View>
    );

    return (
        <View style={styles.container} >
            <Camera style={styles.camera} type={type} onCameraReady={onCameraReady} ref={camera}
            >
                {/* <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View> */}
                {/* <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={takePic}>
                        <Text style={styles.text}>Take a picture</Text>
                    </TouchableOpacity>
                </View> */}
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,

    },
    buttonContainer: {
        flex: 1,
        // "z-index": 12,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

