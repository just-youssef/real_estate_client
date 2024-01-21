import { createSlice } from "@reduxjs/toolkit"

const darkModeSlice = createSlice({
    name: 'sider',
    initialState: { open: false },
    reducers: {
        toggleSiderState: (state) => {
            state.open = !state.open
        },
    },
})

// Extract and export each action creator by name
export const { toggleSiderState } = darkModeSlice.actions
// Export the reducer, either as a default or named export
export default darkModeSlice.reducer