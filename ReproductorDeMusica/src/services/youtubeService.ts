import axios from "axios";
import { YouTubeVideo, YouTubeAPIResponse } from "../types";

const YOUTUBE_API_KEY = "AIzaSyCXPxY6fzhWR-p7RWUCtLRRRmcGZls9LuU";
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export async function searchYouTube(query: string): Promise<YouTubeVideo[]> {
  try {
    const response = await axios.get<YouTubeAPIResponse>(BASE_URL, {
      params: {
        part: "snippet",
        maxResults: 5,
        q: query,
        key: YOUTUBE_API_KEY,
        type: "video",
      },
    });

    return response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
  } catch (error) {
    console.error("Error al buscar en YouTube:", error);
    return [];
  }
}
