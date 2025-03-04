import { Box, Stack, Heading, HStack, IconButton, Link, Button, Image, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FreelanceButton from "@/components/FreelanceButton";
import Desktop from "@/components/Desktop";

export default function Pantry() {
    const [showDesktop, setShowDesktop] = useState(false);

    useEffect(() => {
        const storedShowDesktop = sessionStorage.getItem("showDesktop");
        if (storedShowDesktop === "true") {
            setShowDesktop(true);
        }
    }, []);

    const desktopClick = () => {
        console.log("Button clicked");
        setShowDesktop(true);
        sessionStorage.setItem("showDesktop", "true");
    };

    const closeDesktop = () => {
        setShowDesktop(false);
        sessionStorage.setItem("showDesktop", "false");
    };

    return (
        <Box position="relative">
            <Box
                bgImage="url('/backgrounds/pantry_bg.png')"
                bgSize="cover"
                height="100vh"
                width="100vw"
                px="46px"
            >

                <HStack
                    height="11%"
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                >
                    <HStack gap="24px">
                        <Box
                            bg="rgba(0, 0, 0, 0.74)"
                            borderRadius="3xl"
                            px="50px"
                            py="20px"
                        >
                            <Heading color="white" fontSize="lg">Грошики</Heading>
                        </Box>
                        <Box
                            bg="rgba(0, 0, 0, 0.74)"
                            borderRadius="3xl"
                            px="50px"
                            py="20px"
                        >
                            <Heading color="white" fontSize="lg">Діамантики</Heading>
                        </Box>
                    </HStack>
                    <HStack>
                        <Heading fontSize="lg" color="white"> Профіль </Heading>
                        <Link as={RouterLink} to="/user-profile">
                            <IconButton bg="transparent" size="xl">
                                <Image src="/buttonIcons/Icon-Button.png" boxSize="100%" />
                            </IconButton>
                        </Link>
                    </HStack>
                </HStack>

                <HStack
                    height="81%"
                    width="100%"
                >
                    <HStack
                        height="100%"
                        width="51%"
                    >
                    </HStack>

                    <VStack
                        height="100%"
                        width="49%"
                        justifyContent="flex-end"
                        alignItems="flex-start"
                    >
                        <FreelanceButton onClick={desktopClick} />
                    </VStack>

                </HStack>
                <Stack
                    height="8%"
                    width="100%"
                >
                    <Stack direction="row" spacing={4} align="center">
                        <Link as={RouterLink} to="/it-company">
                            <IconButton size="xl" bg="transparent">
                                <Image src="/buttonIcons/Button.png" boxSize="100%" />
                            </IconButton>
                        </Link>

                        <Heading fontSize="xl" color="white">Компанія</Heading>
                    </Stack>
                </Stack>

            </Box>
            {showDesktop && (
                <Box
                    position="fixed"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    zIndex="100"
                >
                    <Desktop onClose={closeDesktop} />
                </Box>
            )}

        </Box>
    );
}
