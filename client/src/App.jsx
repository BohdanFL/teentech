import { Container } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CourseContent from "./pages/CourseContent";
import { Grid, GridItem } from "@chakra-ui/react";

import { SearchProvider } from "@/context/SearchContext"; // Імпортуємо SearchProvider

function App() {
    return (
        <SearchProvider>
            <Navbar />
            <Grid px="60px" templateColumns="repeat(6, 1fr)">
                <GridItem mr="24px" colSpan={{ base: 6, lg: 2, xl: 1 }}>
                    <Sidebar />
                </GridItem>

                <GridItem colSpan={{ base: 6, lg: 4, xl: 5 }}>
                    <CourseContent />
                </GridItem>
            </Grid>
        </SearchProvider>
    );
}

export default App;
