import { useContext } from "react"
import { ThemeContext } from "../../Theme/ThemeContext"
import { Typography, Box, Stack, Button, useMediaQuery } from '@mui/material'
import icon from '../../Assets/newchat.png'
import { Link } from 'react-router-dom'
import editIcon from '../../Assets/edit.png';
import CloseIcon from '@mui/icons-material/Close';

function SidePanel({ setChatText, closeMenu }) {

    let { mode, setMode } = useContext(ThemeContext)
    let isMobile = useMediaQuery('(max-width:800px)')

    let handleMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light')
    }

    return (
        <Box >


            {isMobile && (
                <Button
                    endIcon={<CloseIcon />}
                    sx={{
                        width: 1,
                        justifyContent: 'flex-end',
                        color: mode === 'light' ? 'primary.dark' :'text.primary'
                    }}
                    onClick={closeMenu}
                >
                    Close
                </Button>
            )}

            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <Stack
                    onClick={() => {
                        setChatText([])
                        closeMenu()
                    }}
                    sx={{
                        bgcolor: 'primary.main',
                        '&:hover ': {
                            bgcolor: 'primary.bg'
                        }
                    }}
                    direction={'row'}
                    spacing={1}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    py={2}
                    px={{xs:2, md:3}}
                >
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <Box
                            component={'img'}
                            src={icon}
                            height={42}
                            width={42}
                            borderRadius={2}
                            boxShadow={4}
                            flexShrink={0}
                        />
                        <Typography
                            variant={'heading'}
                            fontSize={{xs:16, md:20}}
                            color={'text.primary'}
                        >
                            New Chat
                        </Typography>
                    </Stack>

                    <Box
                            component={'img'}
                            src={editIcon}
                            height={32}
                            width={32}
                            flexShrink={0}
                        />

                </Stack>
            </Link>

            <Box p={{xs:2, md:3}}>
                <Link to={'/history'}>
                    <Button
                        variant="contained" sx={{ width: 1 }}
                        onClick={closeMenu}
                    >
                        Past Conversations
                    </Button>
                </Link>
            </Box>

        </Box>
    )
}

export default SidePanel;