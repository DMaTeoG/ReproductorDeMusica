export interface YouTubeVideo {
    id: string;
    title: string;
    artist: string;
    thumbnail: string;
  }
  
  export interface YouTubeAPIResponse {
    items: {
      id: { videoId: string };
      snippet: {
        title: string;
        channelTitle: string;
        thumbnails: { default: { url: string } };
      };
    }[];
  }
  
  export interface GeniusAPIResponse {
    response: {
      hits: {
        result: {
          full_title: string;
          primary_artist: { name: string };
          url: string;
        };
      }[];
    };
  }
  export interface GeniusSong {
    title: string;
    artist: string;
    lyricsUrl?: string; 
    lyrics?: string; // Para almacenar letras de Lyrics.ovh
  }
  
  // Nueva interfaz para Lyrics.ovh
  export interface LyricsAPIResponse {
    lyrics: string;
  }
  