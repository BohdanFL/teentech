import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import DesktopMain from "./DesktopMain";
import Freelance from "./Freelance";
import Browser from "./Browser";
import Projects from "./Projects";

export default function Desktop({ onClose }) {
    const [activeComponent, setActiveComponent] = useState("main");

    return (
        <Box
            border="20px solid black"
            borderRadius="20px"
            width="1370px"
            height="610px"
        >
            {activeComponent === "main" && (
                <DesktopMain
                    onClose={onClose}
                    onFreelanceClick={() => setActiveComponent("freelance")}
                    onBrowserClick={() => setActiveComponent("browser")}
                    onProjectsClick={() => setActiveComponent("projects")}
                />
            )}
            {activeComponent === "freelance" && <Freelance onClose={() => setActiveComponent("main")} />}
            {activeComponent === "browser" && <Browser onClose={() => setActiveComponent("main")} />}
            {activeComponent === "projects" && <Projects onClose={() => setActiveComponent("main")} />}
        </Box>
    );
}
