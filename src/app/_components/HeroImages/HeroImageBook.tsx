import { Container, Overlay, Text, Title } from "@mantine/core";
import Image from "next/image";
import classes from "./HeroImages.module.css";

export function HeroImageBook() {
  return (
    <div className={classes.wrapper}>
      <Overlay className={classes.overlay} />
      <Image
        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZHNoYWtlJTIwYnVzaW5lc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=2070&q=60"
        alt="Background Image"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
      />

      <div className={classes.inner}>
        <Title className={classes.title}>
          <Text component="span" inherit className={classes.highlight}>
            Book Your Demo
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Looking to book a demo with us at Kiotapay? Here, we&apos;ve provided you
            with an outline of the different methods available to get in touch.
            We&apos;re excited about the prospect of showcasing our product through a
            demo and assisting you in understanding its capabilities better.
          </Text>
        </Container>
      </div>
    </div>
  );
}
