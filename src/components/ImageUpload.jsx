// Sección de carga de imagen. REV. 21/03/2023 OK
// Emanuel Moroni

import '../styles/style.css'
import React from 'react'
import { useToast } from '@chakra-ui/react'
import { getStorage, ref, uploadBytesResumable, listAll } from "firebase/storage";

const ImageUpload = () => {

    const toast = useToast();    

    const handlerCargaImagen = (e) => {
        // Descomentar para debugging
        console.log(e.target.files);

        const metadata = {
            contentType: 'image/jpeg',
        };
        const storage = getStorage();
        //console.log(storage);    
        const storageRef = ref(storage, "/ImgHerramientas/" + e.target.files[0].name);
        console.log(storageRef);

        // Debo definir esto para que los archivos se almacenen como imagenes. https://firebase.google.com/docs/storage/web/upload-files#add_file_metadata

        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0], metadata);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                toast({
                    title: 'Cargando...',
                    description: progress + '%',
                    status: 'info',
                    duration: 500,
                    isClosable: true,
                })

                if(progress == 100){
                    toast({
                        title: 'Imagen cargada',
                        description: progress + '%',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                }

                // console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            }, 
            (error) => { console.log(error) }        
        );

        e.preventDefault(); // prevent navigation to "#"
    }

    return (
        <div className='input-personal'>
            <input type="file" id="input" multiple onChange={handlerCargaImagen}/>
        </div>        
    )
}

export default ImageUpload;