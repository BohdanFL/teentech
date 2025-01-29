import { Box, HStack, Input, IconButton } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IoMdSearch } from "react-icons/io";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { SearchContext } from "@/context/SearchContext";

export default function SearchButton() {
    const { searchTerm, setSearchTerm } = useContext(SearchContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit((data) => {
        setSearchTerm(data.searchQuery);
    });

    return (
        <form onSubmit={onSubmit}>
            <Field
                invalid={!!errors.searchQuery}
                errorText={errors.searchQuery?.message}>
                <HStack>
                    <Input
                        height="30px"
                        maxWidth="160px"
                        placeholder="Пошук"
                        variant="subtle"
                        mr="3"
                        textStyle="pixel"
                        color="gray.500"
                        {...register("searchQuery")}
                    />
                    <IconButton
                        variant="ghost"
                        color="white"
                        size="40px"
                        bg={{ _hover: "none" }}
                        type="submit">
                        <IoMdSearch size="40" />
                    </IconButton>
                </HStack>
            </Field>
        </form>
    );
}
