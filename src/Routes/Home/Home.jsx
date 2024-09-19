import { Box, Stack , Typography } from '@mui/material';
import { useContext , useState , useEffect , useRef } from "react";
import { useOutletContext } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { ThemeContext } from '../../Theme/ThemeContext';

function Home() {
    let { mode } = useContext(ThemeContext);
    return (
        <Stack
            height={'100vh'}
            justifyContent={'space-between'}
            sx={{
                '@media (max-width:767px)': {
                    background: mode == 'light' ? 'linear-gradient(#F9FAFA 60%, #EDE4FF)' : ''
                }
            }}
        >

            <Navbar />
        </Stack>
    )
}
export default Home;