import React from "react";
import { Box, Button } from "@chakra-ui/react";

export default function Freelance({ onClose }) {
    return (
        <Box
            bgColor="#006792"
            width="100%"
            height="100%"
            py="16px"
        >
            <Button onClick={onClose}>Назад</Button>
        </Box>
    );
}
