import React from "react";
import { Box, Button, Image } from "@chakra-ui/react";

export default function Projects({ onClose }) {
    return (
        <Box
            bgColor="yellow"
            width="100%"
            height="100%"
            py="16px"
        >
            {/*<Image src="projects.png" />*/}
            <Button onClick={onClose}>Назад</Button>
        </Box>
    );
}
