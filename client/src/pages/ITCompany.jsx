import { Box, Stack, Heading, HStack, IconButton, Link, VStack, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

export default function ITCompany() {
    return (
        <Box
            bgImage="url('/backgrounds/it_bg.png')"
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgAttachment="fixed"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            px="60px"
            py="20px"
        >
                <HStack
                    height="12%"
                    width="100%"
                    display="flex" 
                    justifyItems="space-between"
                    >
                        <HStack >
                            <Box
                            bg="white"
                            px="50px"
                            py="20px"
                            borderRadius="3xl"
                            border="3px solid rgba(0, 26, 255, 0.29)"
                            boxShadow="0 4px 6px rgba(0, 0, 0, 0.42)"
                            minW="395px"
                            minH="80px"
                            display="flex"
                            justifyContent="center"
                            >
                                <Heading  fontSize="md">Панель управління</Heading>
                            </Box>
                            <Image src="group.png"></Image>
                        </HStack>
                    </HStack>
        
                    <HStack
                        height="80%"
                        width="100%"
                    >
                        <HStack
                        width="90%"
                        height="100%"
                        >

                        </HStack>
                        <VStack
                            height="100%"
                            width="10%"
                        >
                            <VStack 
                            bg="white"
                            height="450px"
                            width="100px"
                            borderRadius="3xl"
                            border="3px solid rgba(0, 26, 255, 0.29)"
                            boxShadow="0 4px 6px rgba(0, 0, 0, 0.42)"
                            py="20px"
                            >
                                <Heading  fontSize="md" textAlign="center"
                                style={{ writingMode: "vertical-lr", textOrientation: "upright" }}>Менеджмент</Heading>

                            </VStack>

                        </VStack>
                    </HStack>
                    <Stack
                        height="8%"
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        >
                        <Box 
                position="absolute" 
                bottom={4} 
                right={4} 
                bg="rgba(23, 22, 22, 0.6)" 
                p={4} 
                borderRadius="sm"
                display="flex"
                alignItems="center"
                gap="10px"
            >
                <Heading  fontSize="md" color="white">Коморка</Heading>
                    <Link as={RouterLink} to="/pantry">
                        <IconButton size="xl" bg="transparent">
                            <Image src="/buttonIcons/Button2.png"  boxSize="100%"/>
                         </IconButton>
                    </Link>
            </Box>
                    </Stack>
                </Box>
    );
}
