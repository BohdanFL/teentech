
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    MenuContent,
    MenuItem,
    MenuItemCommand,
    MenuRoot,
    MenuTrigger,
  } from "@/components/ui/menu"

const CourseList = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };


  return (
    <div>
        <header className='bg-custom-blue h-20 p-60px flex items-center'>
            <MenuRoot>
                <MenuTrigger asChild>
                    <Button className="w-[56px] h-[40px] border border-gray-300 rounded-none" >
            
                    </Button>
                 </MenuTrigger>
                <MenuContent className='rounded-none'>
                    <MenuItem value="1" className='rounded-none'>
                    etwas
                    </MenuItem>
                <MenuItem value="2" className='rounded-none'>
                    idk
                </MenuItem>
                </MenuContent>
             </MenuRoot>
        </header>
    </div>
  );
}

export default CourseList;
