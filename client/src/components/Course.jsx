import { Heading, HStack, Image, Text, Stack, Box } from "@chakra-ui/react";
import React from "react";
import CourseRating from "./CourseRating";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineOutbound } from "react-icons/md";

export default function Course({ courseData }) {
    return (
        <HStack
            borderBottom="1px solid #72829F"
            alignItems="flex-start"
            pb="6"
            mb="4"
            gap="5">
            <Image maxWidth={340} height={140} src="/course_python.png" />
            <Stack maxWidth={510} gap={0} marginEnd="auto">
                <Heading size="md" mb={4}>
                    {courseData.title}
                </Heading>
                <Text fontSize="12px" mb={2}>
                    {courseData.description}
                </Text>
                <CourseRating rate={courseData.rating} />
                <HStack fontSize="12px" mt={3}>
                    <HStack gap={1} mr={3}>
                        <FaRegClock />
                        56 годин
                    </HStack>
                    <HStack gap={1}>
                        <MdOutlineOutbound />
                        Для {courseData.level}
                    </HStack>
                </HStack>
            </Stack>
            <Text fontSize={16} fontWeight="bold">
                {courseData.price
                    ? "$ " + (courseData.price - 0.01)
                    : "Безкоштовно"}
            </Text>
        </HStack>
    );
}
