import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProviderManager from '../provider/providerManager ';


export const getData = createAsyncThunk('blog/getData', async (data, thunkAPI) => {
  try{
    const res = await ProviderManager.getData('getData');
    return res;
  }catch(err){
      return err;
  };
});

export const contact = createAsyncThunk('blog/contact', async (data, thunkAPI) => {
  try{
    const res = await ProviderManager.getData('contact',data);
    return res;
  }catch(err){
      return err;
  }
});

export const getCountryDetails = createAsyncThunk('blog/getCountryDetails', async (data, thunkAPI) => {
  try{
    let objData = {dataCountry: data};
    const res = await ProviderManager.getData('getCountryDetails',objData);
    return res;
  }catch(err){
      return err;
  }
});

export const getInformationCountries = createAsyncThunk('blog/getInformationCountries', async (data, thunkAPI) => {
  try{
    let objData = {country: data};
    const res = await ProviderManager.getData('getInformationCountries',objData);
    return res;
  }catch(err){
      return err;
  }
});


const initialState = {
    data: [],
    indexScroll: '',
    dataCountry: '',
    tabsCountryRegion:['מידע על המדינה','אטרקציות מרכזיות','בתי מלון שביקרנו','תמונות מהטיול', 'סיפור הטיול שלנו', 'סרטונים'],
    tabsHotels:['לינק למלון','תמונות מהמלון','מידע חיוני על המלון'],
    isContainerActive: false,
};

const basePageSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // setIndexScroll: (state, action) => {
    //   state.indexScroll = action.payload;
    // },
    setIndexScroll: (state, action) => {
      return {
        ...state,
        indexScroll: action.payload,
      };
    },
    setChoosCountry: (state, action) => {
      state.dataCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
          state.data = action.payload;
      })
  }
});


export const { setIndexScroll, setChoosCountry } = basePageSlice.actions;
export default basePageSlice.reducer;