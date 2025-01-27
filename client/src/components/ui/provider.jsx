"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
// Supports weights 300-700
import "@fontsource-variable/jura";
import { createSystem, defaultConfig } from "@chakra-ui/react";
import { defineTextStyles } from "@chakra-ui/react";

const textStyles = defineTextStyles({
    pixel: {
        description: "The button text style - used in buttons",
        value: {
            fontFamily: "Bulgaria Glorious",
            // fontWeight: "500",
            // fontSize: "16px",
            // lineHeight: "24",
            // letterSpacing: "0",
            // textDecoration: "None",
            // textTransform: "None",
        },
    },
});
const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                heading: { value: "Bulgaria Glorious" },
                body: { value: "Jura Variable" },
            },
        },
        textStyles,
    },
});

export function Provider(props) {
    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...props} forcedTheme="light" />
        </ChakraProvider>
    );
}
