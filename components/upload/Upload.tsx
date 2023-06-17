"use client";

import { useMemo } from "react";

import { WithToast } from "@/components/feedback/WithToast";
import { calcTotalFilesSize } from "@/lib/files";

import { useUploadState } from "./useUploadState";
import { FilesChooser } from "./FilesChooser";
import { upload } from "./HandleUpload";
import { UploadProgress } from "./UploadProgress";
import { FilesExplorer } from "./FilesExplorer";
import { Commands } from "./Commands";

export const Upload = () => {
  const [state, dispatch] = useUploadState();
  const filesSize = useMemo(
    () => calcTotalFilesSize(state.files),
    [state.files]
  );

  return (
    <>
      {/* SHOW initial state to let user select files */}
      {!state.cid && (
        <FilesChooser
          onDrop={(acceptedFiles: File[]) => upload(acceptedFiles, dispatch)}
        />
      )}

      {/* After user have selected files we want to show progress based on state change */}
      {state.uploading && (
        <UploadProgress total={filesSize} progress={state.progress} />
      )}

      {/* After upload finished - show result */}
      {state.cid && !state.uploading && (
        <div className="flex flex-col w-2/3 lg:w-1/3">
          <FilesExplorer files={state.files} filesSize={filesSize} />
          <Commands link={state.link} dispatch={dispatch} />
        </div>
      )}

      {/* If files already present in the data storage - notify user */}
      {state.exists && (
        <WithToast
          title={`✅ uploaded already `}
          subtitle={"check the link!"}
          show
        />
      )}
    </>
  );
};
