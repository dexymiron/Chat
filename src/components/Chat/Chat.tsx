    import React, { useContext, useState } from 'react';
    import { Avatar, Button, Container, Grid2, TextField } from '@mui/material';
    import { Context } from '../..';
    import { useAuthState } from 'react-firebase-hooks/auth';
    import { useCollectionData } from 'react-firebase-hooks/firestore';
    import { collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
    import Loader from '../Loader/Loader';

    const Chat = () => {
        const { auth, firestore } = useContext(Context);
        const [user] = useAuthState(auth);
        const [value, setValue] = useState('');

        const messagesRef = collection(firestore, 'messages');
        const q = query(messagesRef, orderBy('createdAt'));

        const [messages, loading, error] = useCollectionData(q, { idField: 'id' });
        

        const sendMessage = async () => {
            if (!value.trim()) return;
            try {
                await addDoc(messagesRef, {
                    text: value,
                    createdAt: serverTimestamp(),
                    uid: user?.uid,
                    displayName: user?.displayName,
                    photoURL: user?.photoURL,
                });
                setValue('');
            } catch (err) {
                console.error("Ошибка отправки сообщения: ", err);
            }
        };

        if (loading) {
            return <Loader />;
        }

        return (
            <Container>
                <Grid2
                    container
                    justifyContent={'center'}
                    style={{ height: '100%', marginTop: '20px' }}
                    spacing={2}
                >
                    <div style={{ width: '80%', height: '70vh', border: '1px solid grey', overflowY: 'auto' }}>
                        {messages && messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                style={{margin: '10px', 
                                        padding: '10px', 
                                        border: user?.uid === msg.uid ? '2px solid green' : '2px dashed red',
                                        marginLeft: user?.uid === msg.uid ? 'auto' : '10px',
                                        width: 'fit-content' }}>   
                                <Grid2 container spacing={1}>
                                        <Avatar src={msg.photoURL}/>
                                        <div>{msg.displayName}</div>
                                </Grid2>
                                <div style={{marginTop: '5px'}}>{msg.text}</div>      
                            </div>
                        ))}
                    </div>
                    <Grid2
                        container
                        direction={'column'}
                        alignItems={'flex-end'}
                        style={{ width: '80%' }}
                    >
                        <TextField
                            variant={'outlined'}
                            fullWidth
                            maxRows={2}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <Button onClick={sendMessage} variant={'outlined'}>Send</Button>
                    </Grid2>
                </Grid2>
            </Container>
        );
    };

    export default Chat;
