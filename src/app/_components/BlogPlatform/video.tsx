import { Card } from "@mantine/core";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

interface Props {
  src: string;
  title: string;
  thumbnails: string;
  poster: string;
  posteralt: string;
}

export default function Video(
  { src, title, thumbnails, poster, posteralt }: Props,
) {
  return (
    <Card
      m="auto"
      radius="md"
      withBorder
      shadow="xl"
      p={0}
    >
      <MediaPlayer title={title} src={src} aspectRatio="16/9">
        <MediaProvider />
        <DefaultVideoLayout
          thumbnails={thumbnails}
          icons={defaultLayoutIcons}
        />
        <Poster
          className="vds-poster"
          src={poster}
          alt={posteralt}
        />
      </MediaPlayer>
    </Card>
  );
}
