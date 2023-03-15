// Link de interés:
// https://firebase.google.com/docs/reference/js/firestore_
// Eventos: https://beta.reactjs.org/learn/responding-to-events
// HandleInputs: https://beta.reactjs.org/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form
// https://www.linkedin.com/pulse/passing-data-react-between-parent-child-functional-components-tay/?trk=pulse-article_more-articles_related-content-card
// https://chakra-ui.com/docs/styled-system/style-props
// mt -> margin-top; mr -> margin-right

import React, { useEffect, useState } from 'react'
import { Progress, Box, Button, Heading, Flex, FormControl, FormLabel, Input, GridItem, Select } from '@chakra-ui/react';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
// import ImageUpload from './ImageUpload'
 
const cantidadCampos = 7;
const incrementoPorcentual = 100 / cantidadCampos;

const ItemUpload = () => {

  const [coleccionDocs, setColeccionesDocs] = useState();
  //const [refereciaStorage, setReferenciaStorage] = useState();
  const [imagenesHerramientas, setImagenesHerramientas] = useState([]);

  // Este useEffect lo utilizo para listar todos los nombres de las imagenes disponibles para adjuntar al producto.
  useEffect(() => {
    const storage = getStorage();
    //console.log(storage);    
    const listRef = ref(storage, "/ImgHerramientas/");
    //console.log(listRef);

    // Aqui voy a listar todas las imagenes que estan cargadas en el storage de imagenes para articulos
    listAll(listRef)
      .then((res) => {
          const imagenesList = [];
          res.items.forEach((itemRef) => {
              // Primero armo el array con el nombre de los elementos
              // console.log(itemRef.name);
              imagenesList.push(itemRef.name);
          });
          setImagenesHerramientas(imagenesList);
      }).catch((error) => { console.log(error);});

    }, []);

  useEffect(() => {
    const db = getFirestore();
    // console.log(db);

    // https://firebase.google.com/docs/reference/js/firestore_.md#collection
    setColeccionesDocs(collection(db, "herramientasStock"));
    //console.log(coleccionDocs);      
  },[]);

  //#region EstadosCampos
  const [progress, setProgress] = useState(0);

  const [BanderaNombreHerramienta, setBanderaNombreHerramienta] = useState(false);
  const [NombreHerramienta, setNombreHerramienta] = useState("");

  const [BanderaMarcaHerramienta, setBanderaMarcaHerramienta] = useState(false);
  const [MarcaHerramienta, setMarcaHerramienta] = useState("");

  const [BanderaDescripcionHerramienta, setBanderaDescripcionHerramienta] = useState(false);
  const [DescripcionHerramienta, setDescripcionHerramienta] = useState("");

  const [BanderaStockHerramienta, setBanderaStockHerramienta] = useState(false);
  const [StockHerramienta, setStockHerramienta] = useState(); 

  const [BanderaCategoriaHerramienta, setBanderaCategoriaHerramienta] = useState(false);
  const [CategoriaHerramienta, setCategoriaHerramienta] = useState("");

  const [BanderaSubCategoriaHerramienta, setBanderaSubCategoriaHerramienta] = useState(false);
  const [SubCategoriaHerramienta, setSubCategoriaHerramienta] = useState("");

  const [DireccionImagenHerramienta, setDireccionImagenHerramienta] = useState("");
  //#endregion

  // Esta funcion sera la encargada de incrementar un contador de progreso para llenar la barra de carga de datos. Cuando este al 100% permitirá la carga en la base de datos.
  const handlerInput = (e) => {
    let nombreId;
    // Descomentar para debbuging 
    // console.log(e.target.id);

    nombreId = e.target.id;
    switch(nombreId){
      case "nombre-herramienta":
        if(!BanderaNombreHerramienta){
          if(e.target.value != ""){
            setProgress (progress + incrementoPorcentual);
          }
          setBanderaNombreHerramienta(true);
        }
        else{
          if (e.target.value == ""){
            setProgress (progress - incrementoPorcentual);
            setBanderaNombreHerramienta(false);
          }          
        }
        setNombreHerramienta(e.target.value);
        break;

      case "marca-herramienta":
        if(!BanderaMarcaHerramienta){
          if(e.target.value != ""){
            setProgress (progress + incrementoPorcentual);
          }
          setBanderaMarcaHerramienta(true);
        }
        else{
          if (e.target.value == ""){
            setProgress (progress - incrementoPorcentual);
            setBanderaMarcaHerramienta(false);
          }          
        }
        setMarcaHerramienta(e.target.value);
        break;

      case "descripcion-herramienta":
        if(!BanderaDescripcionHerramienta){
          if(e.target.value != ""){
            setProgress (progress + incrementoPorcentual);
          }
          setBanderaDescripcionHerramienta(true);
        }
        else{
          if (e.target.value == ""){
            setProgress (progress - incrementoPorcentual);
            setBanderaDescripcionHerramienta(false);
          }          
        }
        setDescripcionHerramienta(e.target.value);
        break;

      case "stock-herramienta":
        if(!BanderaStockHerramienta){
          if(e.target.value != ""){
            setProgress (progress + incrementoPorcentual);
          }
          setBanderaStockHerramienta(true);
        }
        else{
          if (e.target.value == ""){
            setProgress (progress - incrementoPorcentual);
            setBanderaStockHerramienta(false);
          }          
        }
        setStockHerramienta(e.target.value);
        break;

      case "categoria-herramienta":
        if(!BanderaCategoriaHerramienta){
          if(e.target.value != ""){
            setProgress (progress + incrementoPorcentual);
          }
          setBanderaCategoriaHerramienta(true);
        }
        else{
          if (e.target.value == ""){
            setProgress (progress - incrementoPorcentual);
            setBanderaCategoriaHerramienta(false);
          }          
        }
        setCategoriaHerramienta(e.target.value);
        break;

      case "subcategoria-herramienta":
        if(!BanderaSubCategoriaHerramienta){
          if(e.target.value != ""){
            setProgress (progress + incrementoPorcentual);
          }
          setBanderaSubCategoriaHerramienta(true);
        }
        else{
          if (e.target.value == ""){
            setProgress (progress - incrementoPorcentual);
            setBanderaSubCategoriaHerramienta(false);
          }          
        }
        setSubCategoriaHerramienta(e.target.value);
        break;
    }

    // No termino de comprender bien para que coloco el preventDefault
    e.preventDefault();
  };

  // Esta funcion sera la encargada de almacenar en el atributo de imagen, la direccion de acceso para ser utilizada en cada item.
  const handlerSeleccionImagen = (e) => {
    const storage = getStorage();
    //console.log(storage); 

    // En este caso no me hacen falta las banderas, porque no es un campo de texto que cambiará constantemente.
    if(e.target.value != ""){
      setProgress (progress + incrementoPorcentual);

      getDownloadURL(ref(storage, 'ImgHerramientas/' + e.target.value))
        .then((url) => {
          //console.log(url);
          setDireccionImagenHerramienta(url);
        })
        .catch((error) => console.log(error));

      // Descomentar para debugging
      //console.log(e.target.value);
    }
    else{
      setProgress (progress - incrementoPorcentual);
    }
  }
   
  // Esta funcion sera la encargada de subir la informacion a la base de datos y reiniciar los campos en el componente.
  const handlerFirestore = () => {
    // console.log(NombreHerramienta);
    // console.log(MarcaHerramienta);
    // console.log(DescripcionHerramienta);
    // console.log(StockHerramienta);
    // console.log(CategoriaHerramienta);
    // console.log(SubCategoriaHerramienta);
    // console.log(progress);

    const item =
    {
      "nombre": NombreHerramienta,
      "marca": MarcaHerramienta,
      "descripcion": DescripcionHerramienta,
      "stock": StockHerramienta,
      "categoria": CategoriaHerramienta,
      "subcategoria": SubCategoriaHerramienta,
      "imagen": DireccionImagenHerramienta,
    }

    // https://firebase.google.com/docs/reference/js/firestore_.md?hl=es-419#adddoc
    addDoc(coleccionDocs, item).then( () => {
        setNombreHerramienta("");
        setMarcaHerramienta("");
        setDescripcionHerramienta("");
        setStockHerramienta(0);
        setCategoriaHerramienta("");
        setSubCategoriaHerramienta("");
        setDireccionImagenHerramienta("");

        setBanderaNombreHerramienta(false);
        setBanderaMarcaHerramienta(false);
        setBanderaDescripcionHerramienta(false);
        setBanderaStockHerramienta(0);
        setBanderaCategoriaHerramienta(false);
        setBanderaSubCategoriaHerramienta(false);

        setProgress(0);

        // console.log("Pasé por aquí..."); 
      }
    ).catch((error) => console.log(error))
  }

  return (
      <div>
        <Box borderWidth="1px" rounded="lg" shadow="1px 1px 3px rgba(0,0,0,0.3)" maxWidth={800} p={6} m="10px auto" as="form">

            {/* Por el momento es el único formulario para dar de alta las herramientas que se pondrán a la venta */}
            <div id='formulario-principal-id'>
              {/* Esta la barra de progreso de completado de datos de cada uno de las herramientas a cargar */}
              <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated className='barra-progreso-personal'></Progress>

              <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" className='heading-personal'>
                Registro de nuevo producto
              </Heading>

              {/* Aqui se encuentran todos los campos por completar para el dado de alta de cada herramienta */}
              <Flex>
                <FormControl mr="5%">
                  <FormLabel htmlFor="nombre-herramienta" fontWeight={'normal'}>
                    Nombre de herramienta
                  </FormLabel>
                  <Input id="nombre-herramienta" placeholder="Herramienta" value={NombreHerramienta} onInput={handlerInput}/>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="marca-herramienta" fontWeight={'normal'}>
                    Marca
                  </FormLabel>
                  <Input id="marca-herramienta" placeholder="Marca" value={MarcaHerramienta} onInput={handlerInput}/>
                </FormControl>
              </Flex>

              <FormControl mt="1%">
                <FormLabel htmlFor="descripcion-herramienta" fontWeight={'normal'}>
                  Descripción
                </FormLabel>
                <Input id="descripcion-herramienta" type="text" value={DescripcionHerramienta} onInput={handlerInput}/>
              </FormControl>

              <Flex mt="1%">
                <FormControl mr="5%">
                  <FormLabel htmlFor="stock-herramienta" fontWeight={'normal'} mt="2%">
                    Cantidad stock
                  </FormLabel>
                  <Input id="stock-herramienta" placeholder="Stock" type="number" value={StockHerramienta} onInput={handlerInput}/>
                </FormControl>

                <FormControl mr="5%">
                  <FormLabel htmlFor="categoria-herramienta" fontWeight={'normal'} mt="2%">
                    Categoría
                  </FormLabel>
                  <Input id="categoria-herramienta" placeholder="Categoría" value={CategoriaHerramienta} onInput={handlerInput}/>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="subcategoria-herramienta" fontWeight={'normal'} mt="2%">
                    Subcategoría
                  </FormLabel>
                  <Input id="subcategoria-herramienta" placeholder="Subtegoría" value={SubCategoriaHerramienta} onInput={handlerInput}/>
                </FormControl>
              </Flex>              
            </div>

            {/* Boton de confirmacion de carga de datos. Aquí debo habilitar o verificar dependiendo que este, o no, toda la informacion */}
            <Flex w="100%" justifyContent="space-between" mt="5%" className='flex-personal'>
              <FormControl as={GridItem} colSpan={[6, 3]} className="form-imagen-personal">
                <FormLabel
                  htmlFor="country"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: 'gray.50',
                  }}>
                  Imagen de presentación
                </FormLabel>
                <Select
                  id="country"
                  name="country"
                  autoComplete="country"
                  placeholder="Seleccione una imagen"
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  className='select-personal'
                  onChange={handlerSeleccionImagen}>
                  {
                    imagenesHerramientas.map(
                      imagen => <option key={imagenesHerramientas.indexOf(imagen)}>{imagen}</option>
                    )
                  }
                </Select>
              </FormControl>              
              <Button
                  w="7rem"
                  colorScheme="teal"
                  variant="outline"
                  isDisabled={!(progress >= (cantidadCampos * incrementoPorcentual))}
                  onClick={handlerFirestore}
                  className='button-personal button-personal__submit'
              >
                Subir Datos
              </Button>
            </Flex>
        </Box>
      </div>
  );
}

export default ItemUpload