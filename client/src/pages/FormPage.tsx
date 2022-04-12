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
  const [trackSets, setTrackSets] = useState<TrackSet>({
    setOne: [],
    setTwo: [],
  });

  const [track, setTrack] = useState<Track>({
    name: '',
    artistName: '',
    url: '',
  });

  const handleSubmit = (isFirstSet: boolean) => {
    //Validate Data

    if (isFirstSet)
      setTrackSets({ ...trackSets, setOne: [...trackSets.setOne, track] });
    else setTrackSets({ ...trackSets, setTwo: [...trackSets.setTwo, track] });
  };

  const handleSwitch = (index: number, isSetOne: boolean) => {
    const _setOne = [...trackSets.setOne];
    const _setTwo = [...trackSets.setTwo];

    if (isSetOne) {
      _setOne.splice(index, 1);
      _setTwo.push(trackSets.setOne[index]);
    } else {
      _setTwo.splice(index, 1);
      _setOne.push(trackSets.setTwo[index]);
    }

    setTrackSets({ setOne: _setOne, setTwo: _setTwo });
  };

  const handleSetOneSwitch = (index: number) => handleSwitch(index, true);
  const handleSetTwoSwitch = (index: number) => handleSwitch(index, false);

  const setTrackSetOne = (tracks: Track[]) =>
    setTrackSets({ ...trackSets, setOne: tracks });

  const setTrackSetTwo = (tracks: Track[]) =>
    setTrackSets({ ...trackSets, setTwo: tracks });

  const handleCreate = () => {
    //Call API EndPoint
  };

  const setId = (firstSet: boolean) => {
    return firstSet ? 'First' : 'Second';
  };

  return (
    <div>
      <HStack display="flex" alignItems="stretch">
        <SongCardConainer
          tracks={trackSets.setOne}
          setTracks={setTrackSetOne}
          handleSwitch={handleSetOneSwitch}
          setId={setId(true)}
        />
        <SongCardConainer
          tracks={trackSets.setTwo}
          setTracks={setTrackSetTwo}
          handleSwitch={handleSetTwoSwitch}
          setId={setId(false)}
        />
      </HStack>
      <SongForm
        handleSubmit={handleSubmit}
        handlePublish={handleCreate}
        track={track}
        setTrack={setTrack}
      />
    </div>
  );
}
