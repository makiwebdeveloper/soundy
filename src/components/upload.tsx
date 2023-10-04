"use client";

import { useMemo, useState } from "react";
import { AudioFileType } from "@/types/tracks.types";
import { TracksAudioUploader } from "@/components/uploaders";
import { UploadTrackForm, UploadAlbumForm } from "@/components/forms";

export default function Upload() {
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
    return <UploadTrackForm track={audioFiles[0]} cancel={cancel} />;
  } else {
    return <UploadAlbumForm audioFiles={audioFiles} cancel={cancel} />;
  }
}
