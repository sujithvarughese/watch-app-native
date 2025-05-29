import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {openai} from "@/utilities/api";
import Resizer from "react-image-file-resizer";

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

  },
  extraReducers: builder => {
    builder.addCase(setImages.fulfilled, (state, action) => {
      console.log(action.payload)
      state.images = [...state.images, action.payload as string]
      state.loading = false
    })
    builder.addCase(setImages.rejected, (state, action) => {
      state.loading = false
      console.log("Failed to fetch response")
    })
    builder.addCase(setImages.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchWatchDetails.fulfilled, (state, action) => {
      console.log(action.payload)
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
  }
})

export const setImages = createAsyncThunk('global/setImages', async (payload: File, { getState }) => {
    const state = (getState() as { global: Props }).global
    if (state.images.length >= 5) return;
    return await resizeFile(payload)
  }
)
const resizeFile = (file: File) => {
  return new Promise<string>((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "png",
      100,
      0,
      (uri) => {
        resolve(uri as string);
      },
      "png"
    );
  });
};

export const fetchWatchDetails = createAsyncThunk('global/fetchWatchDetails', async (payload: { file: File }, { getState }) => {
  try {
    const state = (getState() as { global: Props }).global
    const formattedData  = state.images.map((image) => {
      return {
        type: "image_url",
        image_url: { url: image },
      }
    })
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
    console.error('OpenAI API error:', error);
  }
});


export default globalSlice.reducer;
export const {} = globalSlice.actions;