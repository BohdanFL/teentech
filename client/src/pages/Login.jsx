import {
    Box,
    Button,
    Heading,
    Input,
    Stack,
    Field,
    AvatarFallback,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";
import { Link as ChakraLink } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { Avatar } from "@/components/ui/avatar";

const Login = () => {
    return (
        <>
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center">
                <Avatar colorPalette="teal" variant="solid" size="2xl">
                    <AvatarFallback />
                </Avatar>
                <Heading color="teal.400">Welcome</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md">
                            <Field.Root label="email" mb={3}>
                                <Field.Label>Email</Field.Label>
                                <Input
                                    type="email"
                                    placeholder="me@example.com"
                                />
                                <Field.ErrorText>
                                    This is an error text
                                </Field.ErrorText>
                            </Field.Root>
                            <Field.Root mb={3} label="Password">
                                <Field.Label>Password</Field.Label>

                                <PasswordInput placeholder="password" />
                                <Field.ErrorText>
                                    This is an error text
                                </Field.ErrorText>
                                <Field.HelperText w="100%" textAlign="right">
                                    <ChakraLink asChild>
                                        <Link to="/forgot-password">
                                            forgot password?
                                        </Link>
                                    </ChakraLink>
                                </Field.HelperText>
                            </Field.Root>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorPalette="teal"
                                width="full">
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                New to us?{" "}
                <ChakraLink color="teal.500" asChild>
                    <Link to="/signup">Sign Up</Link>
                </ChakraLink>
            </Box>
        </>
    );
};

export default Login;
