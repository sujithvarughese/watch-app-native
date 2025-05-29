import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import {openai} from "@/utilities/api";

export type Category = {
  category: string,
  rating: number,
  comments: string,
}

export type WatchDetails = {
  name: string,
  details: string,
  results: Category[]
}

export type Props = {
  loading: boolean,
  images: string[],
  watchDetails: WatchDetails | null,
};

const initialState: Props = {
  loading: false,
  images: [],
  watchDetails: null
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string>) => {
      if (state.profile.symptoms.includes(action.payload)) return
      state.profile.symptoms.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchHealthTip.fulfilled, (state, action) => {
      console.log(action.payload)
      state.results.healthTip = action.payload
      state.loading = false
    })
    builder.addCase(fetchHealthTip.rejected, (state, action) => {
      state.loading = false
      console.log("Failed to fetch response")
    })
    builder.addCase(fetchHealthTip.pending, (state, action) => {
      state.loading = true
    })
  }
})

export const fetchWatchDetails = createAsyncThunk('global/fetchWatchDetails', async  (payload) => {
  try {
    const response = await openai.post("", {
      model: "gpt-3.5-turbo-0125",
      max_tokens: 400,
      messages: [
        {
          role: "system",
          content: 'You are a helpful assistant designed to provide a random general tip about overall health in 2-3 sentences.'
        },
        {
          role: "user",
          content: `Please provide a general health tip for an adult. Keep the response between 2-3 sentences`
        }
      ]
    })
    return response.data.choices[0].message.content
  } catch (error) {
    console.log(error)
  }
})


export default globalSlice.reducer;
export const {

} = globalSlice.actions;