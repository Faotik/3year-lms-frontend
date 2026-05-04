import React, { createContext, useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/**
 * Context to provide the color mode (light/dark) and a function to toggle it.
 */
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

/**
 * Provider component that manages the theme state and provides it to the application.
 * It initializes the theme from user preferences stored in localStorage and keeps them in sync.
 */
export const ColorModeProvider = ({ children }) => {
    // Initialize theme mode from user preferences or default to 'light'
    const [mode, setMode] = useState(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            return storedUser?.preferences?.theme || 'light';
        } catch (error) {
            console.error("Error reading user preferences from localStorage:", error);
            return 'light';
        }
    });

    // Provide the toggle function via useMemo to avoid unnecessary re-renders
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    
                    // Synchronize with localStorage user object
                    try {
                        const storedUser = JSON.parse(localStorage.getItem('user'));
                        if (storedUser) {
                            storedUser.preferences = {
                                ...storedUser.preferences,
                                theme: newMode,
                            };
                            localStorage.setItem('user', JSON.stringify(storedUser));
                        }
                    } catch (error) {
                        console.error("Error updating user preferences in localStorage:", error);
                    }
                    
                    return newMode;
                });
            },
        }),
        []
    );

    // Update the data-theme attribute on the root element for custom CSS compatibility
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);

    // Create the MUI theme object based on the current mode
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                              // Light mode colors (matching index.css variables)
                              background: {
                                  default: '#f3f7ff',
                                  paper: '#ffffff',
                              },
                              divider: 'rgba(0, 0, 0, 0.12)',
                          }
                        : {
                              // Dark mode colors (matching index.css variables)
                              background: {
                                  default: '#161616',
                                  paper: '#1e1e1e',
                              },
                              divider: 'rgba(255, 255, 255, 0.12)',
                          }),
                },
                components: {
                    MuiAppBar: {
                        styleOverrides: {
                            root: {
                                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
