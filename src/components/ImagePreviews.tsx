import Image from "next/image";
import { FunctionComponent } from "react";

type ImagePreviewsProps = {
  images: File[];
  height?: number;
  width?: number;
};

const ImagePreviews: FunctionComponent<ImagePreviewsProps> = ({
  images,
  height = 200,
  width = 200,
}) => {
  if (!images) return null;
  return images.map((file, index) => (
    <Image
      src={URL.createObjectURL(file)}
      alt={`attachment-${index}`}
      width={width}
      height={height}
      key={file.name}
      objectFit="contain"
    />
  ));
};

export default ImagePreviews;
