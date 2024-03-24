import React from "react"; 
import { Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface SearchProps {
    searchVal: string; 
    searchFunc: (event: any) => void; 
}

const SearchBar:React.FC<SearchProps> = ({searchVal, searchFunc}: SearchProps) => {
    return (
        <Autocomplete leftSection={<IconSearch></IconSearch>} data={[]} value={searchVal} onChange={searchFunc}></Autocomplete>
    )
}

export default SearchBar; 