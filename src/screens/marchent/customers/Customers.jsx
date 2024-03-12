import React from 'react'
import { Box, Typography } from '@mui/material'
import TableHead from '../../../components/marchents/customerTable/TableHead'
import TableBody from '../../../components/marchents/customerTable/TableBody'

const Customers = () => {
  return (
    <>
      <Box>
        <Typography variant='h5' sx={{ marginBottom: "50px" }}> Customers </Typography>


        {/* --Table-- */}

        {/* Table Head */}
        <TableHead />

        {/* Table Body */}
        <TableBody />

      </Box>
    </>
  )
}

export default Customers