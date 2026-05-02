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

/**
 * MultiSelectCheckbox component provides a dropdown selection menu where multiple options can be checked.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the select input.
 * @param {Array<{value: string, display: string}>} props.options - The list of options available for selection.
 * @param {Array<string>} props.value - The currently selected values.
 * @param {Function} props.onChange - Callback function triggered when selection changes.
 * @returns {JSX.Element} A Material UI FormControl containing a multi-select with checkboxes.
 */
export default function MultiSelectCheckbox({
    label,
    options,
    value,
    onChange,
}) {
    // Handles selecting or deselecting items.
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;


        // Ensure the value is always an array before passing it back
        onChange(typeof value === "string" ? value.split(",") : value);
    };

    return (
        // Form control container for the select input
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>{label}</InputLabel>

            <Select
                multiple // Allows multiple selections
                value={value} // The current value
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                // Displays the selected values as a comma-separated string
                renderValue={(selected) => options
                    .filter(opt => selected.includes(opt.value))
                    .map(opt => opt.display)
                    .join(", ")}
            >
                // Maps over the options and creates a menu item for each.
                {options.map((option) => {
                    const selected = value.includes(option.value);
                    const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

                    return (
                        // Menu item for each option, displays checkbox and label
                        <MenuItem key={option.value} value={option.value}>
                            {/* Checkbox for each option */}
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