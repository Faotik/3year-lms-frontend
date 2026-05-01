//https://mui.com/material-ui/react-select/

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function MultiSelectCheckbox({
    label,
    options,
    value,
    onChange,
}) {
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        console.log(value);

        onChange(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>{label}</InputLabel>

            <Select
                multiple
                value={value}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                renderValue={(selected) => options
                    .filter(opt => selected.includes(opt.value))
                    .map(opt => opt.display)
                    .join(", ")}
            >
                {options.map((option) => {
                    const selected = value.includes(option.value);
                    const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

                    return (
                        <MenuItem key={option.value} value={option.value}>
                            <SelectionIcon
                                fontSize="small"
                                style={{ marginRight: 8, padding: 9, boxSizing: 'content-box' }}
                            />
                            <ListItemText primary={option.display} />
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}