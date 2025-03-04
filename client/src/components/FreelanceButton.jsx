import React from "react";
import { Image, Button } from "@chakra-ui/react";
;

export default function FreelanceButton({onClick}) {
    return (
        <Button width="246px" height="156px" position="relative" onClick={onClick}>
             <Image
                src="/buttonIcons/monitorFrame.png"
                position="absolute"
                top="0"
                left="0"
                width="100%" 
                height="100%" 
            />

            <Image
                src="/buttonIcons/Blankslate.png"
                position="absolute"
                top="0"
                left="0"
                width="95%"
                height="95%"
                objectFit="contain"
            />
        </Button>
    );
}