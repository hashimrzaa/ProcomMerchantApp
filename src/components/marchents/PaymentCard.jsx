import React from 'react'
import { Box, Typography } from '@mui/material'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const PaymentCard = ({ title, amount, records, borderCOlor, bgColor, chipColor }) => {
    return (
        <>
            <Box sx={{ width: '200px', padding: '20px', border: `1px solid ${borderCOlor}`, borderRadius: "7px", backgroundColor: bgColor }}>
                <Typography variant='subtitle2'> {title} </Typography>

                <Typography variant='h6' sx={{ marginY: '10px' }}> {amount} PKR </Typography>

                <Box >
                    {/* <Typography variant='body2'> {records} Records </Typography> */}
                    <Stack direction="row" spacing={1}>
                        <Chip label={`${records} records`} variant="outlined" color={chipColor} />
                    </Stack>
                </Box>

            </Box>
        </>
    )
}

export default PaymentCard
