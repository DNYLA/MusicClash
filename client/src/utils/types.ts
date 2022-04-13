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
  TrackSet: TrackSet[];
};

export type TrackSet = {
  id: number;
  clashId: number;
  title: string;
  tracks: Track[];
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
}
