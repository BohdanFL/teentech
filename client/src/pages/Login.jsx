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
import { Link, useNavigate } from "react-router";
import { Link as ChakraLink } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { Avatar } from "@/components/ui/avatar";

import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { login, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

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
                        onSubmit={handleSubmit(async (data) => {
                            console.log(data);
                            await login(data.email, data.password);
                            navigate("/pantry");
                        })}>
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
                                <Field.HelperText w="100%" textAlign="right">
                                    <ChakraLink asChild>
                                        <Link to="/reset-password">
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
                    New to us?{" "}
                    <ChakraLink color="teal.500" asChild>
                        <Link to="/signup">Sign Up</Link>
                    </ChakraLink>
                </Box>
            </HStack>
        </>
    );
};

export default Login;
