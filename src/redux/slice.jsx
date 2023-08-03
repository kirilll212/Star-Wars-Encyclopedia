import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  searchResults: [],
  activeTab: 'characters',
  loading: false,
  currentPage: 1,
};

const encyclopediaSlice = createSlice({
  name: 'encyclopedia',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.searchTerm = '';
      state.searchResults = [];
      state.currentPage = 1;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setSearchResults,
  setActiveTab,
  setLoading,
  setCurrentPage,
} = encyclopediaSlice.actions;

export default encyclopediaSlice.reducer;
