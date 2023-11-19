import { Container, Overlay, Text, Title } from "@mantine/core";
import Image from "next/image";
import classes from "./HeroImages.module.css";

export function HeroImageContact() {
  return (
    <div className={classes.wrapper}>
      <Overlay className={classes.overlay} />
      <Image
        src="https://img.freepik.com/free-photo/cheerful-woman-using-laptop-smartphone_74855-3220.jpg?w=2070&t=st=1693333559~exp=1693334159~hmac=336b29784ed93c72da5535e2214db9ee578c88ee02552c004bb4c6eb3b7c70b3"
        alt="Background Image"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
      />

      <div className={classes.inner}>
        <Title className={classes.title}>
          <Text component="span" inherit className={classes.highlight}>
            Contact Us
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Want to reach someone at Kiotapay? Below, you’ll find an overview of
            various ways to reach us. We look forward to exploring real-estate
            opportunities with you.
          </Text>
        </Container>
      </div>
    </div>
  );
}
