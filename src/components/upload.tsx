"use client";

import { useMemo, useState } from "react";
import { AudioFileType } from "@/types/tracks.types";
import { TracksAudioUploader } from "@/components/uploaders";
import { UploadTrackForm, UploadAlbumForm } from "@/components/forms";

interface Props {
  profileId: number;
}

export default function Upload({ profileId }: Props) {
  const [audioFiles, setAudioFiles] = useState<AudioFileType[]>([]);
  const type = useMemo(
    () =>
      audioFiles.length > 1
        ? "album"
        : audioFiles.length === 1
        ? "track"
        : null,
    [audioFiles]
  );

  function cancel() {
    setAudioFiles([]);
  }

  if (audioFiles.length === 0 || type === null) {
    return <TracksAudioUploader setAudioFiles={setAudioFiles} />;
  }

  if (type === "track") {
    return (
      <UploadTrackForm
        track={audioFiles[0]}
        cancel={cancel}
        profileId={profileId}
      />
    );
  } else {
    return (
      <UploadAlbumForm
        audioFiles={audioFiles}
        cancel={cancel}
        profileId={profileId}
      />
    );
  }
}
