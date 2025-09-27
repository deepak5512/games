import { Container } from "@/components/container";
import Games from "@/components/games";
import Heading from "@/components/heading";
import Subheading from "@/components/subheading";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-start">
      <Container className="min-h-screen px-8 pt-20 md:pt-20 md:pb-10">
        <div className="flex flex-col-reverse md:flex-row md:items-center">
          {" "}
          <Heading className="align-middle leading-none">
            Choose a Game to Play
          </Heading>
        </div>
        <Subheading>
          Select from a variety of engaging games to challenge your mind and
          have fun!
        </Subheading>
        <Games />
      </Container>
    </div>
  );
}
