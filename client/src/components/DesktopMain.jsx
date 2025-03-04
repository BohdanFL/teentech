import React from "react";
import { Box, Button, Heading, VStack, Link, IconButton } from "@chakra-ui/react";
import { RxExit } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";

export default function DesktopMain({ onClose, onFreelanceClick, onBrowserClick, onProjectsClick }) {
    return (
        <Box
            bgColor="#5AD05E"
            width="100%"
            height="100%"
            py="16px"
        >
            <VStack gap="25px" width="100px" mx="54px">
                <Link as={RouterLink} to="/vscode">
                    <VStack width="auto" height="auto">
                        <Button
                            bgColor="#2E39FF"
                            width="70px"
                            height="70px"
                            borderRadius="20px"
                        />
                        <Heading fontFamily="Press Start 2P">VSCODE</Heading>
                    </VStack>
                </Link>
                <Link onClick={onFreelanceClick}>
                    <VStack>
                        <Button bgColor="#00690C" width="70px" height="70px" borderRadius="20px" />
                        <Heading fontFamily="Press Start 2P">FREELANCE</Heading>
                    </VStack>
                </Link>
                <Link onClick={onBrowserClick}>
                    <VStack>
                        <Button bgColor="#E5FF00" width="70px" height="70px" borderRadius="20px" />
                        <Heading fontFamily="Press Start 2P">BROWSER</Heading>
                    </VStack>
                </Link>
                <Link onClick={onProjectsClick}>
                    <VStack>
                        <Button bgColor="#FF2E32" width="70px" height="70px" borderRadius="20px" />
                        <Heading fontFamily="Press Start 2P">PROJECTS</Heading>
                    </VStack>
                </Link>
            </VStack>
            <IconButton size="sm" bg="transparent" onClick={onClose}>
                <RxExit color="black" fontSize="40px" />
            </IconButton>
        </Box>
    );
}
