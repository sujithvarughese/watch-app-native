import { Group, Text } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Resizer from "react-image-file-resizer";

type ImageUploadDropZoneProps = {
  images: string[],
  setImages: (images: string[]) => void,
}

const ImageUploadDropZone = ({ images, setImages, ...props }: ImageUploadDropZoneProps) => {

  const updateImages = async (file: File) => {
    if (images.length >= 5) return
    const resizedFile = await resizeFile(file) as string
    setImages([...images, resizedFile])
  }

  const resizeFile = (file: File) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "png",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "png"
      );
    });
  }

  return (
    <Dropzone
      onDrop={(files) => updateImages(files[files.length - 1])}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      maxFiles={5}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag watch images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach up to 5 files, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};

export default ImageUploadDropZone;