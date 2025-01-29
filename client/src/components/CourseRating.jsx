"use client";

import { Button, Text, HStack } from "@chakra-ui/react";
import { Rating } from "@/components/ui/rating";

export default function CourseRating({ rate }) {
    return (
        <HStack gap="1">
            <Text fontSize="10px" fontWeight="bold">
                {rate.toFixed(1)}
            </Text>
            <Rating
                defaultValue={rate}
                size="sm"
                readOnly
                colorPalette="yellow"
            />
        </HStack>
    );
}
