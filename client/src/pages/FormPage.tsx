import { Avatar } from '@chakra-ui/avatar';
import { Badge, Box, Flex, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import SongForm, { Track } from '../components/Form';
import SongCardConainer, { SongCard } from '../components/SongCard';
import { HStack } from '@chakra-ui/layout';
export type TrackSet = {
  setOne: Track[];
  setTwo: Track[];
};

export default function FormPage() {
  const [trackSetOne, setTrackSetOne] = useState<Track[]>([]);
  const [trackSetTwo, setTrackSetTwo] = useState<Track[]>([]);
  const [trackSets, setTracksets] = useState<Track[][]>([]);
  const [track, setTrack] = useState<Track>({
    name: '',
    artistName: '',
    url: '',
  });

  const handleSubmit = (isFirstSet: boolean) => {
    if (isFirstSet) setTrackSetOne([...trackSetOne, track]);
    else setTrackSetTwo([...trackSetTwo, track]);
  };

  const handleSwitch = (index: number, isSetOne: boolean) => {
    const _tracksOne = [...trackSetOne];
    const _tracksTwo = [...trackSetTwo];

    if (isSetOne) {
      _tracksOne.splice(index, 1);
      _tracksTwo.push(trackSetOne[index]);
    } else {
      _tracksTwo.splice(index, 1);
      _tracksOne.push(trackSetTwo[index]);
    }

    setTrackSetOne(_tracksOne);
    setTrackSetTwo(_tracksTwo);
  };

  return (
    <div>
      <HStack display="flex" alignItems="stretch">
        <SongCardConainer
          trackSets={[trackSetOne, trackSetTwo]}
          tracks={trackSetOne}
          setTracks={setTrackSetOne}
          handleSwitch={handleSwitch}
        />
        <SongCardConainer
          trackSets={[trackSetOne, trackSetTwo]}
          tracks={trackSetTwo}
          setTracks={setTrackSetTwo}
          handleSwitch={handleSwitch}
          isSetOne={false}
        />
      </HStack>
      <SongForm handleSubmit={handleSubmit} track={track} setTrack={setTrack} />
    </div>
  );
}
