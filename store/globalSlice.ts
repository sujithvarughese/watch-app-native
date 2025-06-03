import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
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

export type ModelDetails = {
  name: string,
  details: string,
  link: string,
  productionYear: string,
  reference: string,
  price: string
}

export type Props = {
  loading: boolean,
  images: string[],
  watchDetails: WatchDetails | null,
  modelDetails: ModelDetails | null,
};

const initialState: Props = {
  loading: false,
  images: [],
  watchDetails: null,
  modelDetails: null,
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(fetchWatchDetails.fulfilled, (state, action) => {
      state.watchDetails = action.payload
      state.loading = false
    })
    builder.addCase(fetchWatchDetails.rejected, (state, action) => {
      state.loading = false
      console.log("Failed to fetch response")
    })
    builder.addCase(fetchWatchDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchModelDetails.fulfilled, (state, action) => {
      state.modelDetails = action.payload
      state.loading = false
    })
    builder.addCase(fetchModelDetails.rejected, (state, action) => {
      state.loading = false
      console.log("Failed to fetch response")
    })
    builder.addCase(fetchModelDetails.pending, (state, action) => {
      state.loading = true
    })
  }
})

export const fetchWatchDetails = createAsyncThunk('global/fetchWatchDetails', async (payload: string[], { getState }) => {
  const formattedData = payload?.map(image => {
    return { type: "image_url", image_url: { url: image } }
  })
  try {
    const res = await openai.post("", {
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: process.env.EXPO_PUBLIC_AI_INSTRUCTIONS,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Is this watch authentic?" },
            ...formattedData
          ],
        },
      ],
    });
    return JSON.parse(res?.data?.choices[0].message.content);
  } catch (error) {
    console.log(error)
    throw new Error(error instanceof Error ? error.message : String(error));
  }
});

export const fetchModelDetails = createAsyncThunk('global/fetchModelDetails', async (payload: string, { getState }) => {
  try {
    const res = await openai.post("", {
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: process.env.EXPO_PUBLIC_MODEL_DETAIL_INSTRUCTIONS,
        },
        {
          role: "user",
          content: [
            { type: "text", text: payload },
          ],
        },
      ],
    });
    return JSON.parse(res?.data?.choices[0].message.content);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
});


export default globalSlice.reducer;
export const {} = globalSlice.actions;