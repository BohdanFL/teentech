import { Container, HStack, Box } from "@chakra-ui/react";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "@/components/Logo";
import SearchButton from "@/components/SearchButton";

export default function Navbar() {
    return (
        <Box mb="40px" py="3" bg="#425372" color="white">
            <Container px="16">
                <HStack justifyContent="space-between">
                    <GiHamburgerMenu size={40} />
                    <Logo />
                    <SearchButton />
                </HStack>
            </Container>
        </Box>
    );
}
