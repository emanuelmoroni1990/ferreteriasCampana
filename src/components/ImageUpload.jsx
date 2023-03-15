// Links de interés:
// Manejo de archivos con JS: https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
// Firebase Storage: https://firebase.google.com/docs/storage/web/upload-files#web-version-9_1
// https://stackoverflow.com/questions/62050827/firebase-web-storage-list-api-get-item-name

import React from 'react'
import { getStorage, ref, uploadBytesResumable, listAll } from "firebase/storage";

const ImageUpload = () => {

    const handlerCargaImagen = (e) => {
        // Descomentar para debugging
        console.log(e.target.files);

        const metadata = {
            contentType: 'image/jpeg',
        };
        const storage = getStorage();
        //console.log(storage);    
        const storageRef = ref(storage, "/ImgHerramienta/" + e.target.files[0].name);
        console.log(storageRef);

        // Debo definir esto para que los archivos se almacenen como imagenes. https://firebase.google.com/docs/storage/web/upload-files#add_file_metadata

        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0], metadata);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }        
        );

        const listRef = ref(storage, "/ImgHerramientas/");

        // Find all the prefixes and items.
        listAll(listRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                console.log(itemRef.name)
            // All the items under listRef.
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

        e.preventDefault(); // prevent navigation to "#"
    }

    return (
        <input type="file" id="input" multiple onChange={handlerCargaImagen}/>
    )
}

export default ImageUpload;