import {
    Box,
    Button,
    Heading,
    Input,
    Stack,
    Field,
    AvatarFallback,
    HStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";
import { Link as ChakraLink } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";

import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const { signup, signInWithGoogle } = useAuth();

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
                    <form
                        onSubmit={handleSubmit(
                            ({ email, password, username }) => {
                                signup(email, password, username);
                            }
                        )}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md">
                            <Field.Root label="Username" mb={3}>
                                <Field.Label>Username</Field.Label>
                                <Input
                                    type="text"
                                    placeholder="enter your nickname"
                                    {...register("username", {
                                        required: true,
                                    })}
                                />
                                <Field.ErrorText>
                                    This is an error text
                                </Field.ErrorText>
                            </Field.Root>
                            <Field.Root label="Email" mb={3}>
                                <Field.Label>Email</Field.Label>
                                <Input
                                    type="email"
                                    placeholder="me@example.com"
                                    {...register("email", { required: true })}
                                />
                                <Field.ErrorText>
                                    This is an error text
                                </Field.ErrorText>
                            </Field.Root>
                            <Field.Root mb={3} label="Password">
                                <Field.Label>Password</Field.Label>

                                <PasswordInput
                                    placeholder="password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                <Field.ErrorText>
                                    This is an error text
                                </Field.ErrorText>
                            </Field.Root>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorPalette="teal"
                                width="full">
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>

            <HStack>
                <Button
                    borderRadius={10}
                    type="submit"
                    variant="solid"
                    colorPalette="teal"
                    onClick={() => {
                        signInWithGoogle();
                    }}>
                    Sign In With Google
                </Button>
                <Box>
                    Already have an account?{" "}
                    <ChakraLink color="teal.500" asChild>
                        <Link to="/">Login</Link>
                    </ChakraLink>
                </Box>
            </HStack>
        </>
    );
};

export default SignUp;
