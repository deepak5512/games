import Animate from "@/components/Animate";
import { Container } from "@/components/container";
import Gaming from "@/components/Gaming";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-start">
      <Container className="min-h-screen px-8 pt-20 md:pt-20 md:pb-10">
        <Animate classname="w-full flex flex-col flex-1">
          <Gaming />
        </Animate>
      </Container>
    </div>
  );
}
