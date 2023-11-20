import { ActionIcon, Container, Group, Image, rem, Text } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import image from "./kiota.png";
import classes from "./FooterLinks.module.css";
import attributes from "./attributes.json";
import { useRouter } from "next/navigation";

interface FooterLinksProps {
  data?: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

export function FooterLinks({
  data = attributes.props.data,
}: FooterLinksProps) {
  const router = useRouter();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => {
          event.preventDefault();
          void router.push(link.link);
        }}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image
            width={120}
            height={40}
            fit="contain"
            src={image.src}
            alt="Kiotapay"
          />
          <Text size="xs" c="dimmed" className={classes.description}>
            Kiotapay is an end-to-end property management software for
            automating billing, collections, payments, expense management, sales
            and other real estate records
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2023 kiotapay.com. All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            component="a"
            target="_blank"
            href="https://twitter.com/kiotapay"
            size="lg"
            color="gray"
            variant="subtle"
          >
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            component="a"
            target="_blank"
            href="https://www.youtube.com/channel/UC4oUDSz_XOScdOkkF82MDxA"
            size="lg"
            color="gray"
            variant="subtle"
          >
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            component="a"
            target="_blank"
            href="https://instagram.com/kiotapay"
            size="lg"
            color="gray"
            variant="subtle"
          >
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            component="a"
            target="_blank"
            href="https://web.facebook.com/Kiotapay/"
            size="lg"
            color="gray"
            variant="subtle"
          >
            <IconBrandFacebook
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            component="a"
            target="_blank"
            href="https://ke.linkedin.com/company/kiotapay"
            size="lg"
            color="gray"
            variant="subtle"
          >
            <IconBrandLinkedin
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
