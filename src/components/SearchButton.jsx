import React from 'react'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const SearchButton = () => {
    const [searchKey, setsearchKey] = useState('');
    const handleSearch = () => {
        console.log('hi');
    }

    const Search = () => setTimeout(() => {
        clearTimeout();
        handleSearch();
    }, 1000);
    
  return (
    <div>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        id="input-with-icon-textfield"
        placeholder='Search'
        type='search'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputAdornment>
            ),
          },
        }}
        variant="standard"
        value={searchKey}
        onChange={(e)=>setsearchKey(e.target.value)}
        onKeyDown={Search}
      />
    </Box>
    </div>
  )
}

export default SearchButton