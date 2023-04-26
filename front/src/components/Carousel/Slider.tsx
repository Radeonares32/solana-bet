/* eslint-disable jsx-a11y/alt-text */

import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

export const Slider = () => {
    
    return (
        <Carousel sx={{ minWidth: '50rem',m:0, minHeight: '14rem',background:'#0b141e' }}>
            <Item item={<Item />}/>
            <Item item={<Item />} />
        </Carousel>
    )
}

function Item(props: any) {
    return (
        <Paper sx={{ minHeight: '15rem',m:0,background:'#0b141e'  }}>
            <img style={{maxWidth:'60rem',maxHeight:'65rem'}} src='img/slider/2.png' />
        </Paper>
    )
}