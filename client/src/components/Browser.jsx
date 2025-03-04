import React from "react";
import { Box, Button } from "@chakra-ui/react";

export default function Browser({ onClose }) {
    return (
        <Box
            bgColor="white"
            width="100%"
            height="100%"
            py="16px"
        >
            <Button onClick={onClose}>Назад</Button>
        </Box>
    );
}
