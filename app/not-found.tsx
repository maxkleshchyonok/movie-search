"use client";
import styled from "@emotion/styled";
import Image from "next/image";
import LogoComponent from "@/components/logo/logo";
import notFoundImage from "@/assets/404.png";
import { Button, Title } from "@mantine/core";
import colors from "@/helpers/index";
import { useRouter } from "next/navigation";

const Container = styled("div")`
  display: flex;
`;

const LeftSide = styled("div")`
  width: 20%;
  padding: 1% 1%;
`;

const RightSide = styled("div")`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15% 15% 0 0;
`;

function NotFound() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  return (
    <Container>
      <LeftSide>
        <LogoComponent />
      </LeftSide>
      <RightSide>
        <Image src={notFoundImage} alt="404-image" />
        <Title order={3} sx={{ marginTop: "2%" }}>
          We can’t find the page you are looking for
        </Title>
        <Button
          onClick={handleClick}
          variant="filled"
          color={colors["purple-500"]}
          size="md"
          radius="md"
          sx={{ marginTop: "2%" }}
        >
          Go Home
        </Button>
      </RightSide>
    </Container>
  );
}

export default NotFound;
