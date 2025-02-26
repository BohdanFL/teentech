import {
    Box,
    Button,
    Heading,
    Input,
    Stack,
    Field,
    AvatarFallback,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { PasswordInput } from "@/components/ui/password-input";
import { Avatar } from "@/components/ui/avatar";

import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

const UpdatePassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const { updatePassword } = useAuth();
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
                <Heading color="teal.400">Create New Password</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form
                        onSubmit={handleSubmit(async ({ newPassword }) => {
                            await updatePassword(newPassword);
                            navigate("/");
                        })}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md">
                            <Field.Root
                                invalid={!!errors.password}
                                mb={3}
                                label="New Password">
                                <Field.Label>New Password</Field.Label>

                                <PasswordInput
                                    placeholder="New password"
                                    {...register("newPassword", {
                                        required: "You must specify a password",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must have at least 8 characters",
                                        },
                                    })}
                                />
                                <Field.ErrorText>
                                    {errors.newPassword && (
                                        <p>{errors.newPassword.message}</p>
                                    )}
                                </Field.ErrorText>
                            </Field.Root>
                            <Field.Root
                                invalid={!!errors.confirmPassword}
                                mb={3}
                                label="Confirm Password">
                                <Field.Label>Confrim Password</Field.Label>
                                <PasswordInput
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword", {
                                        validate: (value) => {
                                            value === watch("password") ||
                                                "The passwords do not match";
                                        },
                                    })}
                                />
                                <Field.ErrorText>
                                    {errors.confirmPassword && (
                                        <p>{errors.confirmPassword.message}</p>
                                    )}
                                </Field.ErrorText>
                            </Field.Root>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorPalette="teal"
                                width="full">
                                Reset Password
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </>
    );
};

export default UpdatePassword;
