import { Container, background } from "@chakra-ui/react";
import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";
import LogoutButton from "./LogoutButton.jsx";

function Header() {
  const user = useRecoilValue(userAtom);

  return (
    <>
      <Container>
        <Flex justifyContent={"space-evenly"}>
          <Link to={"/"}>
            <Flex w={"full"} justifyContent={"center"}>
              <Button
                mx={"auto"}
                background={"black"}
                color={"skyblue"}
                size={"lg"}
              >
                Home Page MovieLand
              </Button>
            </Flex>
          </Link>
          <Link to={"/playlists"}>
            <Flex w={"full"} justifyContent={"center"}>
              <Button
                mx={"auto"}
                background={"black"}
                color={"skyblue"}
                size={"lg"}
              >
                MY Playlists Page
              </Button>
            </Flex>
          </Link>
        </Flex>

        {user && <LogoutButton />}
      </Container>
    </>
  );
}

export default Header;
