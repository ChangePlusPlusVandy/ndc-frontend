import React from 'react';
import { Button, Avatar, Text, Title, Container } from '@mantine/core';

function Greeting() {
    
    return (
        <Title order = {3} c = "black" fw = {400} size = {30}>
            Hello, <Text fw = {750} span c = "black" inherit> "Partner Name"</Text>
        </Title>
    ); 
}

export default Greeting;