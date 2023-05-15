'use client'

import React from 'react'
import {useReadLocalStorage} from 'usehooks-ts'

import Container from '@/components/Container'
import Grid from '@/components/Grid'
import GridPhoto from '@/components/GridPhoto'
import Header from '@/components/Header'
import {PhotoWithPage} from '@/lib/api'

export default function FavouritePhotos() {
  const favourites = useReadLocalStorage<PhotoWithPage[]>('favourites')

  return (
    <Container>
      <Header string="Favourite Photos" />
      <Grid>
        {favourites &&
          favourites.map(photo => (
            <GridPhoto key={photo.id} photo={photo} mode="favourite" />
          ))}
      </Grid>
    </Container>
  )
}
