import React from 'react';
import {Composition} from 'remotion';
import {SubmissionVideo} from './SubmissionVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AidAtlasSubmission"
        component={SubmissionVideo}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
