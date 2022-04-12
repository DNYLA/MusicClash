export type CreateClash = {
  title: string;
  creatorId: number;
  sets: ClashSet[];
};

export type ClashSet = {
  title: string;
  tracks: Track[];
};

export type Track = {
  position: number;
  title: string;
  artist: string;
  length: string;
  youtubeUrl: string;
};
