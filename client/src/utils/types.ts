export type CreateClash = {
  title: string;
  sets: ClashSet[];
};

export type ClashSet = {
  title: string;
  tracks: Track[];
};

export type Track = {
  title: string;
  artist: string;
  length: string;
  youtubeUrl: string;
};
