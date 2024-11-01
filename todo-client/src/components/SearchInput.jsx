import { TextField } from '@mui/material';

const SearchInput = ({ searchItem, setSearchItem }) => {

    return (
        <TextField
            label="Search To-Do"
            variant="outlined"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
        />
    )
}

export default SearchInput