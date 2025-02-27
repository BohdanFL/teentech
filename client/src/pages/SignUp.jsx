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
import { Avatar } from "@/components/ui/avatar";

import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { toaster } from "@/components/ui/toaster";

const SignUp = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
    } = useForm();
    const { signup, signInWithGoogle } = useAuth();

    const onSubmit = async ({ email, password, username }) => {
        await signup(email, password, username);
    };

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md">
                            <Field.Root
                                invalid={!!errors.username}
                                label="Username"
                                mb={3}>
                                <Field.Label>Username</Field.Label>
                                <Input
                                    type="text"
                                    placeholder="Enter your nickname"
                                    {...register("username", {
                                        required: "Username is required",
                                        minLength: {
                                            value: 3,
                                            message:
                                                "Username must be at least 3 characters long",
                                        },
                                    })}
                                />
                                <Field.ErrorText>
                                    {errors.username && errors.username.message}
                                </Field.ErrorText>
                            </Field.Root>
                            <Field.Root
                                invalid={!!errors.email}
                                label="Email"
                                mb={3}>
                                <Field.Label>Email</Field.Label>
                                <Input
                                    type="email"
                                    placeholder="me@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message:
                                                "Enter a valid email address",
                                        },
                                    })}
                                />
                                <Field.ErrorText>
                                    {errors.email && errors.email.message}
                                </Field.ErrorText>
                            </Field.Root>
                            <Field.Root
                                invalid={!!errors.password}
                                mb={3}
                                label="Password">
                                <Field.Label>Password</Field.Label>

                                <PasswordInput
                                    placeholder="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters long",
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
                                            message:
                                                "Password must contain at least one letter and one number",
                                        },
                                    })}
                                />
                                <Field.ErrorText>
                                    {errors.password && errors.password.message}
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
