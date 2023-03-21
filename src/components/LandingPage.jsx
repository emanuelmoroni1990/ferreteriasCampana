// Sección de Landing Page. REV. 21/03/2023 OK.
// Emanuel Moroni

import React, { useState } from 'react';
import Slider from 'react-slick';
import { Box, IconButton, useBreakpointValue, Stack, Heading, Text, Container } from '@chakra-ui/react';

// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 750,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const LandingPage = () => {
  // Todo esta sección es practicamente un copia del template de chakra ya que solo es un página de Landing. Lo que se modifica son los estilos y detalles finales.

  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(0);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: 'Herramientas profesionales',
      image:
        './src/img/carousel/carousel_1.jpg',
    },
    {
      title: 'Insumos nacionales e importados',
      image:
        './src/img/carousel/carousel_2.jpg',
    },
    {
      title: 'Asistencia al cliente',
      image:
        './src/img/carousel/carousel_3.jpg',
    },
  ];

  return (
    <Box
      position={'relative'}
      height={'450px'}
      width={'full'}
      overflow={'hidden'}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => 
          <Box
            key={index}
            height={'450px'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}>
            {/* This is the block you need to change, to customize the caption */}
            <Container size="container.lg" height="450px" position="relative">
              <Stack
                spacing={6}
                w={'full'}
                // maxW={'lg'}
                position="absolute"
                top="75%"
                transform="translate(0, -50%)">
                <Heading fontSize={{ base: 'md', md: '2xl', lg: '3xl' }} className='heading-personal'>
                  {card.title}
                </Heading>
              </Stack>
            </Container>
          </Box>
        )}
      </Slider>
    </Box>
  )
}

export default LandingPage;