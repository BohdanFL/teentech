import { Box, Stack, Image, HStack, Text, IconButton, Link } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function VSCode() {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); 
    };
    return(
        <Box
            bg="#2E333D"
            width="100vw"
            height="100vh"
        >
            <Stack
                height="48px"
                bg="#24272E"
                px="14px"
                direction="row"
                alignItems="center" 
                justify="space-between"
            >
                <Image src="diamond.png" boxSize="30px" /> 
                <HStack spacing="10px" align="center">
                    <Image src="doggie.png" boxSize="30px" /> 
                    <Text color="white">VSCODE</Text>
                </HStack>
                <IconButton size="sm" bg="transparent" fontFamily='Poppins' onClick={handleBack}>
                    <IoMdClose />
                </IconButton>

            </Stack>
        </Box>
    );
}
