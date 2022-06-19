export type CreateClash = {
  title: string;
  sets: CreateClashSet[];
};

export type CreateClashSet = {
  title: string;
  tracks: CreateTrack[];
};

export type CreateTrack = {
  title: string;
  artist: string;
  length: string;
  youtubeUrl: string;
};

export type Clash = {
  id: number;
  title: string;
  creatorId: number;
  createdAt: Date;
  updatedAt?: Date;
  bannerImg: string;
  thumbnail: string;
  TrackSet: TrackSet[];
};

export type TrackSet = {
  id: number;
  clashId: number;
  title: string;
  tracks: Track[];
  _count: { tracks: number };
};

export type Track = {
  position: number;
  title: string;
  artist: string;
  length: string;
  youtubeUrl: string;
  setId: number;
};

export interface SkelentonPageProps {
  isLoading: boolean;
  amount?: number;
}

export type ClashList = {
  popular: Clash[];
  new: Clash[];
};

export type Heardle = {
  id: number;
  artist: string;
  title?: string; //Hidden until guessed correctly
  url: string;
  date: string;
};
