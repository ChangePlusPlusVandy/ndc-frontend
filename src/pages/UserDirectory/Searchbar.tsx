import React from "react"; 
import { Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface SearchProps {
    searchVal: string; 
    searchFunc: (event: any) => void;
    classes: string;  
}

const SearchBar:React.FC<SearchProps> = ({searchVal, searchFunc, classes}: SearchProps) => {
    return (
        <Autocomplete 
            variant="unstyled"
            leftSection={<IconSearch></IconSearch>} 
            placeholder="Search"
            data={[]} 
            value={searchVal} 
            onChange={searchFunc}
            className={classes}
            />
    )
}

export default SearchBar; 