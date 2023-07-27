import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  searchResults: [],
  activeTab: 'characters',
  loading: false,
  currentPage: 1,
  loggedInUser: localStorage.getItem('loggedInUser') || '',
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
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
      localStorage.setItem('loggedInUser', action.payload);
    },
    clearLoggedInUser: (state) => {
      state.loggedInUser = '';
      localStorage.removeItem('loggedInUser');
    },
  },
});

export const {
  setSearchTerm,
  setSearchResults,
  setActiveTab,
  setLoading,
  setCurrentPage,
  setLoggedInUser,
  clearLoggedInUser,
} = encyclopediaSlice.actions;

export default encyclopediaSlice.reducer;
