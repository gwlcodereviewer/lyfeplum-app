import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export interface IUploadDetail {
  index: number;
  isInProgress: boolean;
  fileName: string;
  awsUrl: string;
  uri: string;
}

export interface IUploadState {
  uploadData: IUploadDetail[];
  uploadingComplete: boolean;
  uploadingStart: boolean;
  uploadingProgress: number;
}

const initialState: IUploadState = {
  uploadData: [],
  uploadingComplete: false,
  uploadingStart: false,
  uploadingProgress: 0,
};

export const uploadSlice = createSlice({
  name: 'upload state',
  initialState,
  reducers: {
    setUploadData: (state, action: PayloadAction<IUploadDetail[]>) => {
      state.uploadData = action.payload;
    },
    setUploadingComplete: (state, action: PayloadAction<boolean>) => {
      state.uploadingComplete = action.payload;
    },
    setUploadingStart: (state, action: PayloadAction<boolean>) => {
      state.uploadingStart = action.payload;
    },
    setUploadingProgress: (state, action: PayloadAction<number>) => {
      state.uploadingProgress = action.payload;
    },
  },
});

export const {
  setUploadData,
  setUploadingComplete,
  setUploadingStart,
  setUploadingProgress,
} = uploadSlice.actions;

export default uploadSlice.reducer;
