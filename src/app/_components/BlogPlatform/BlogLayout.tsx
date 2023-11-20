import {
  Avatar,
  Badge,
  Button,
  Container,
  Divider,
  Group,
  Overlay,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import socials from "../../../../data/meta/socials.json";
import Image from "next/image";
import SeoContainer from "../SeoContainer/SeoContainer";
// import { FooterLinks } from "../FooterLinks/FooterLinks";
import classes from "./BlogLayout.module.css";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { ScrollAffix } from "./ScrollAffix";

export default async function BlogLayout(
  { props, children }: { props: BlogProps; children: React.ReactNode },
) {
  const session = await getServerAuthSession();

  return (
    <>
      <SeoContainer
        title={props.title}
        description={props.description}
        url={`https://dawchihliou.github.io/articles/${props.slug}`}
        image={`${socials.home}${props.cover}`}
        publishedAt={props.publishedAt}
      >
        <Paper>
          <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.85} zIndex={1} />

            <Image
              src={props.cover}
              alt={props.title}
              fill
              style={{ objectFit: "cover" }}
              quality={100}
            />

            <Container className={classes.inner} size="sm">
              <Group justify="space-between">
                <Button
                  variant="outline"
                  size="compact-sm"
                  leftSection={<IconArrowLeft size={14} />}
                  component={Link}
                  href="/blog"
                >
                  Back to Blog
                </Button>
                <Badge variant="light" radius="sm">
                  {props.category}
                </Badge>
              </Group>

              <Title className={classes.title}>
                <Text component="span" inherit className={classes.highlight}>
                  {props.title}
                </Text>
              </Title>

              <Container size={640}>
                <Text size="lg" className={classes.description}>
                  {props.description}
                </Text>
              </Container>
            </Container>
          </div>

          <Container py="xl" size="sm">
            <Group mb="sm" style={{ justifyContent: "space-between" }}>
              <Group>
                {session && (
                  <Avatar
                    src={session.user.image}
                    alt={session.user.name ?? "Avatar"}
                    radius="xl"
                  />
                )}

                <div>
                  <Text fz="sm">{props.author}</Text>
                  <Text fz="xs" c="dimmed">
                    Published on {props.publishedAt}
                  </Text>
                </div>
              </Group>

              <Text fz="sm" c="dimmed">
                {props.readingTime ? `${props.readingTime.text}` : ""}
              </Text>
            </Group>
            <Divider variant="dotted" />
            <Group>
              {props.tags.map((tag, index) => (
                <Text key={index} fz="sm" c="dimmed">
                  #{tag}
                </Text>
              ))}
            </Group>
            <Divider variant="dotted" />

            <div className="article-content">{children}</div>
          </Container>
        </Paper>
        <ScrollAffix />
      </SeoContainer>
    </>
  );
}
