import React from "react";
import { VscGlobe } from "react-icons/vsc";
import { Box, Center, Heading, HStack } from "@chakra-ui/react";
import { PiGlobeBold } from "react-icons/pi";

export default function Logo() {
    return (
        <HStack>
            <Center mr={3} p={1} bg="#EDF9F9" color="white">
                <PiGlobeBold color="black" size={47} />
            </Center>
            <Heading fontWeight="normal" size="2xl">
                TeenTech
            </Heading>
        </HStack>
    );
}
