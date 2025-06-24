import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
    save: localStorage.getItem('save') ? JSON.parse(localStorage.getItem('save')) : []
}

export const saveSlice = createSlice({
    name: 'save',
    initialState,
    reducers: {
        addToSave: (state, action) => {

            const saveNote = action.payload;

            if (!saveNote.title || !saveNote.content || saveNote.title.trim() === "" || saveNote.content.trim() === "") {
                toast.error("Title and Content are required!");
                return;
            }
            // Check if the item already exists in the state.save array
            const exists = state.save.some(item => item.title === saveNote.title);

            if (!exists) {
                state.save.push(saveNote);
                localStorage.setItem("save", JSON.stringify(state.save));
                toast.success("Successfully Created");
            } else {
                toast.error("Item already exists");
            }

        },
        updateToSave: (state, action) => {

            const saveNote = action.payload;

            if (!saveNote.title || !saveNote.content || saveNote.title.trim() === "" || saveNote.content.trim() === "") {
                toast.error("Title and Content are required!");
                return;
            }
            const index = state.save.findIndex(item => item._id === saveNote._id);
            if (index >= 0) {
                state.save[index] = saveNote;
                localStorage.setItem("save", JSON.stringify(state.save));
                toast.success("Updated Sucessfully");
            }
        },
        removeFromSave: (state, action) => {
            const saveId = action.payload;


            const index = state.save.findIndex((item) => item._id === saveId);
            if (index >= 0) {
                state.save.splice(index, 1);
                localStorage.setItem("save", JSON.stringify(state.save));
                toast.success("Deleted Sucessfully");
            }
        },
        resetAllSave: (state, action) => {
            state.save = [];
            localStorage.removeItem("save");
        },
    },
})


export const { addToSave, updateToSave, removeFromSave, resetAllSave } = saveSlice.actions

export default saveSlice.reducer