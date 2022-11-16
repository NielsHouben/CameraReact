import { Camera, CameraType, onCameraReady } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import Canvas, { Image } from 'react-native-canvas';
import { Buffer } from "buffer";

export default function App () {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [isCameraReady, setIsCameraReady] = useState(false);

    const camera = useRef();
    const canvasRef = useRef(null);

    useEffect(() => {
        console.log("dslfk");
        if (canvasRef.current) {
            let ctx = canvasRef.current.getContext('2d');

            ctx.fillStyle = 'red';
            ctx.fillRect(20, 20, 100, 100);

        }
    }, [canvasRef]);


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

    const atob = str => Buffer.from(str, 'base64').toString('binary');

    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    const onCameraReady = () => {
        // setIsCameraReady(true);
        console.log("camera is ready!");
        camera.current.pausePreview();
        takePic();
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
        if (canvasRef.current) {
            let ctx = canvasRef.current.getContext('2d');
            // console.log(img);
            // image.src = newPhoto;

            console.log(canvasRef);
            const playerImage = new Image(canvasRef.current, 100, 100);

            // ctx.drawImage(b64toBlob(newPhoto.base64), 0, 0);
            ctx.drawImage(newPhoto.base64, 0, 0);
            ctx.fillStyle = 'green';
            ctx.fillRect(20, 20, 100, 100);
        }
    };
    function toggleCameraType () {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
        // console.log(camera.current);
    }
    // camera.current.onCameraReady(() => console.log("camera is ready"));

    return (
        <View style={styles.container} >
            <Camera style={styles.camera} type={type} onCameraReady={onCameraReady} ref={camera}
            >
                {/* <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={takePic}>
                        <Text style={styles.text}>Take a picture</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <View style={styles.canvasContainer}>
                <SafeAreaView>
                    <Canvas ref={canvasRef} style={styles.canvas} />
                </SafeAreaView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    canvasContainer: { flex: 1, left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'red', position: 'absolute', "z-index": 10 },
    canvas: { left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'grey', "z-index": 11 },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        // flex: 1,

    },
    buttonContainer: {
        // flex: 1,
        // "z-index": 12,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        // margin: 64,
    },
    button: {
        // flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

