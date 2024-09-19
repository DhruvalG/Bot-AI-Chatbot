import { Box, Stack, Typography } from '@mui/material';
import FirstChatCard from '../../Components/ChatCards/FirstChatCard/FirstChatCard';
import ChatTextInput from '../../Components/ChatCards/FirstChatCard/ChatTextInput';
import RestChatCard from '../../Components/ChatCards/RestChatCard/RestChatCard';
import FeedbackData from '../../Components/ChatCards/FirstChatCard/FeedbackData';
import { useEffect, useRef, useState } from 'react';
import data from '../../Data/aiSampleData.json'
import { useOutletContext } from "react-router-dom";
import Navbar from '../../Components/Navbar/Navbar';
import { ThemeContext } from '../../Theme/ThemeContext';
import { useContext } from 'react';

export default function Home() {

    let [showData, setShowData] = useState(false)
    let refList = useRef(null)
    let [textID, setTextID] = useState(1)
    let [textSelectID, setTextSelectID] = useState(null)
    let [skipToBottom, setskipToBottom] = useState(false)
    let { chatText, setChatText } = useOutletContext();
    let { mode } = useContext(ThemeContext)

    const resultGen = (input) => {

        const response = data.find(item => input.toLowerCase() == item.question.toLowerCase())

        let answer = "As an AI Language Model, I don’t have the details"

        if (response != undefined) {
            answer = response.response
        }

        setChatText(prev => ([...prev,
        {
            type: 'Human',
            text: input,
            time: new Date(),
            id: textID
        },
        {
            type: 'AI',
            text: answer,
            time: new Date(),
            id: textID + 1
        }
        ]))

        setTextID(prev => prev + 2)

    }

    useEffect(() => {
        refList.current?.lastElementChild?.scrollIntoView()
    }, [skipToBottom])

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

            {chatText.length == 0 && <FirstChatCard resultGen={resultGen} />}

            {chatText.length > 0 && (
                <Stack
                    height={1}
                    flexGrow={0}
                    p={{ xs: 2, md: 3 }}
                    spacing={{ xs: 2, md: 3 }}
                    sx={{
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '10px',
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
                            borderRadius: '8px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(151, 133, 186,0.4)',
                            borderRadius: '8px'
                        }
                    }}
                    ref={refList}
                >
                    {chatText.map((item, index) => (
                        <RestChatCard
                            details={item}
                            key={index}
                            updateChat={setChatText}
                            setSelectedChatId={setTextSelectID}
                            showFeedbackModal={() => setShowData(true)}
                        />
                    ))}
                </Stack>
            )}

            <ChatTextInput resultGen={resultGen} setScroll={setskipToBottom} chat={chatText} clearChat={() => setChatText([])} />

            <FeedbackData open={showData} updateChat={setChatText} chatId={textSelectID} handleClose={() => setShowData(false)} />
        </Stack>
    )
}