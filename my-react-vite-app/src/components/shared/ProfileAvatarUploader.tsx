import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

type ProfileAvatarUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

function ProfileAvatarUploader({
  fieldChange,
  mediaUrl,
}: ProfileAvatarUploaderProps) {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />
      <div className="flex items-center justify-center gap-4 cursor-pointer">
        <img
          src={fileUrl}
          alt="avatar"
          className="h-24 w-24 rounded-full object-cover object-top hover:opacity-50 transition duration-200 delay-75"
        />
        <p className="text-primary-600 small-regular md:base-semibold hover:opacity-50 transition duration-200 delay-75">
          Update profile photo
        </p>
      </div>
    </div>
  );
}

export default ProfileAvatarUploader;
