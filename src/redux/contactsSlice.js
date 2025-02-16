import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import PersonList from '../PersonList.json'; // PersonList.json dosyasını içe aktar

const initialState = {
  items: PersonList.map(contact => ({
    ...contact,
    id: nanoid(), // Her kişiye otomatik olarak bir id ekle
  })),
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      state.items = state.items.filter(contact => contact.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase('persist/REHYDRATE', (state, action) => {
      if (action.payload?.contacts) {
        // Eğer local storage'da veri yoksa, initialState'i kullan
        if (action.payload.contacts.items.length === 0) {
          state.items = initialState.items;
        }
      }
    });
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const selectContacts = state => state.contacts.items;

export default contactsSlice.reducer;