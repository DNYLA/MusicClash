import { Avatar } from '@chakra-ui/avatar';
import { Badge, Box, Flex, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import SongForm, { Track } from '../components/Form';
import SongCardConainer, { SongCard } from '../components/SongCard';

export default function FormPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [track, setTrack] = useState<Track>({
    name: '',
    artistName: '',
    url: '',
  });

  const handleSubmit = () => {
    setTracks([...tracks, track]);
  };

  const updatePosition = (index: number, amount: number) => {
    const newIndex = index + amount;
    const _tracks = [...tracks];

    //check if newIndex is out of bounds
    if (newIndex > tracks.length - 1 || newIndex < 0) {
      console.log('Invalid Amount');
      return;
    }

    _tracks.splice(index, 1);
    _tracks.splice(newIndex, 0, tracks[index]);
    setTracks(_tracks);
  };

  const handleDelete = (index: number) => {
    //Ask for Confirmation before deleting.
    setTracks(tracks.filter((t, i) => i !== index));
  };

  return (
    <div>
      <div>
        <SongCardConainer
          tracks={tracks}
          handleChange={updatePosition}
          deleteCallback={handleDelete}
        />
      </div>
      <SongForm handleSubmit={handleSubmit} track={track} setTrack={setTrack} />
    </div>
  );
}
