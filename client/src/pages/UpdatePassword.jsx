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
    console.log(errors);
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
                        })}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md">
                            <Field.Root
                                invalid={!!errors.newPassword}
                                mb={3}
                                label="New Password">
                                <Field.Label>New Password</Field.Label>

                                <PasswordInput
                                    placeholder="New password"
                                    {...register("newPassword", {
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
                                    {errors.newPassword &&
                                        errors.newPassword.message}
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
                                        required:
                                            "Confirm Password is required",
                                        validate: (value) =>
                                            value === watch("newPassword") ||
                                            "The passwords do not match",
                                    })}
                                />
                                <Field.ErrorText>
                                    {errors.confirmPassword &&
                                        errors.confirmPassword.message}
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
