import { IconEye, IconMessageCircle } from "@tabler/icons-react";
import {
  Avatar,
  Badge,
  Card,
  Center,
  Container,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import classes from "./BlogCard.module.css";
import Link from "next/link";
import articles from "data/articles";

const publication = articles.filter((_, i) => i < 6);

export function BlogCard() {

  return (
    <>
      <Group justify="center" mt="xl">
        <Container>
          <Badge
            size="lg"
            fullWidth
            mx="lg"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            LATEST ARTICLES
          </Badge>
        </Container>
      </Group>
      <Container py="xl">
        <SimpleGrid cols={{ base: 1, sm: 1, lg: 1 }}>
          {publication.map((article) => (
            <Card
              key={article.title}
              p="lg"
              shadow="lg"
              className={classes.card}
              radius="md"
              component={Link}
              href={`${article.url}`}
            >
              <div
                className={classes.image}
                style={{ backgroundImage: `url(${article.cover})` }}
              />
              <div className={classes.overlay} />

              <div className={classes.content}>
                <div>
                  <Text size="lg" className={classes.title} fw={500}>
                    {article.title}
                  </Text>
                  <Text size="sm" className={classes.description}>
                    {article.description}
                  </Text>

                  <Group justify="space-between" gap="xs">
                    <Group gap={0}>
                      <Avatar
                        size="sm"
                        variant="transparent"
                        color="var(--mantine-color-cyan-2)"
                      />
                      <Text
                        size="sm"
                        c="var(--mantine-color-cyan-2)"
                        className={classes.author}
                      >
                        {article.author}
                      </Text>
                    </Group>

                    <Group gap="lg">
                      <Text
                        size="sm"
                        c="var(--mantine-color-orange-2)"                        className={classes.date}
                      >
                        {article.date}
                      </Text>

                      <Center>
                        <IconEye
                          size={16}
                          stroke={1.5}
                          color="var(--mantine-color-cyan-2)"
                        />
                        <Text size="sm" className={classes.bodyText}>
                          {article.views}
                        </Text>
                      </Center>
                      <Center>
                        <IconMessageCircle
                          size={16}
                          stroke={1.5}
                          color="var(--mantine-color-teal-2)"
                        />
                        <Text size="sm" className={classes.bodyText}>
                          {article.comments}
                        </Text>
                      </Center>
                    </Group>
                  </Group>
                </div>
              </div>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
