import { Container, Overlay, Text, Title } from "@mantine/core";
import Image from "next/image";
import classes from "./HeroImages.module.css";

export function HeroImageBlog() {
  return (
    <div className={classes.wrapper}>
      <Overlay className={classes.overlay} />

      <Image
        src="https://img.freepik.com/free-photo/technology-communication-icons-symbols-concept_53876-120314.jpg?w=2070&t=st=1693334685~exp=1693335285~hmac=eec9e39d79ff61320c90461bb895038f37693c07439a1b8559e82aff0c063d58"
        alt="Background Image"
        placeholder="blur"
        blurDataURL="L6CtOl.T00nm01MdxZcD]OVsxZt3"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
      />

      <div className={classes.inner}>
        <Title className={classes.title}>
          <Text component="span" inherit className={classes.highlight}>
            Explore Insights and Knowledge on Our Blog
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Immerse yourself in a world of valuable insights and information by
            exploring the Kiotapay Blog. Here, we share a diverse range of
            articles, tips, and updates that are designed to enrich your
            understanding of various topics. Whether it&apos;s industry trends,
            best practices, or innovative solutions, our blog is your go-to
            resource for staying informed and inspired.
          </Text>
        </Container>
      </div>
    </div>
  );
}
