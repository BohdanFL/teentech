import Navbar from "@/components/Navbar";
import CourseContent from "./pages/CourseContent";
import { Grid, GridItem } from "@chakra-ui/react";
import { SearchProvider } from "@/context/SearchContext"; // Імпортуємо SearchProvider

function App() {
    return (
        <SearchProvider>
            <Navbar />
            <Grid px="60px" templateColumns="repeat(6, 1fr)">
                <GridItem colSpan={6}>
                    <CourseContent />
                </GridItem>
            </Grid>
        </SearchProvider>
    );
}

export default App;
