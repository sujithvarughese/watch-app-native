import ImageUploadDropZone from "./ImageUploadDropZone";
import {useEffect, useState} from "react";
import {Button, Flex, Image} from "@mantine/core";
import useAuthenticateWatch from "../hooks/useAuthenticateWatch";
import {Carousel} from "@mantine/carousel";
import { WatchDetails } from "@/app/page";

const ImageUploadForm = ({ setWatchDetails }: { setWatchDetails: (watchDetails: WatchDetails) => void }) => {

  const [images, setImages] = useState<string[]>([])
  const { loading, error, response, fetchData } = useAuthenticateWatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      fetchData(images);
    } catch (err) {
      console.log(err)
      throw new Error(error || 'An error occurred');
    }
  }

  useEffect(() => {
    if (!response) {
      return
    }
    if (typeof response === "object" && response !== null && "name" in response && "details" in response && "results" in response) {
      setWatchDetails(response as WatchDetails)
    }
  }, [response]);

  return (
    <Flex direction="column" justify="center" align="center" p="xl">
      <ImageUploadDropZone images={images} setImages={setImages} />

      {images?.length === 1 && <Image src={images[images.length - 1]} alt="image" w={300} h={300} />}
      {images?.length > 1 &&
      <Carousel
        slideSize={images.length <= 2 ? { base: '100%', sm: '50%' } : { base: '100%', sm: '50%', md: '33.333333%' }}
        slideGap={{ base: 0, sm: 'md' }}
        height={300} controlsOffset="sm" controlSize={26} withControls withIndicators={false}
        maw={900}
        emblaOptions={{ loop: true, align: 'start', slidesToScroll: 3 }}>
        {images.map((image, index) =>
          <Carousel.Slide key={index}>
            <Image src={image} alt="image" w={300} h={300} />
          </Carousel.Slide>
        )}
      </Carousel>
      }
      <Flex gap={16}>
        <Button loading={loading} onClick={handleSubmit}>Submit</Button>
        <Button onClick={() => setImages([])}>Reset</Button>
      </Flex>
    </Flex>
  );
};

export default ImageUploadForm;

