"use client";

import React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";

import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { User } from "@/types/api/user";
import Copyright from "@/components/molecules/CopyRight/Copyright";
import Drawer from "@/components/organisms/Drawer/ClippedDrawer";

const Home = () => {
  console.log("[Home.tsx]");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = useCallback(() => {
    setLoading(true);
    console.log("getUsers ---");
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch(() =>
        // showMessage({ title: "ユーザー取得に失敗しました", status: "error" })
        console.log({ title: "ユーザー取得に失敗しました", status: "error" })
      );
    console.log({ users });
    // .finally(() => setLoading(false));
  }, []);

  const sayHello = useCallback(() => {
    console.log("hello");
  }, []);

  const doSomething = useCallback(() => {
    console.log("hello");
  }, []);

  const fetchApi = async (userId: string) => {
    console.log("fetchApi ---");
    // blogIdで取得
    const res = fetch(`https://jsonplaceholder.typicode.com/users`, {
      headers: new Headers({
        // apikey: process.env.apikey as string,
      }),
      //cache: 'no-store',
      cache: "force-cache",
    });
    // データがない場合はnotFoundページを表示
    //   if (!res.ok) {
    //     throw new Error('Failed to fetch data in server')
    //   }
    console.log({ res });
    return res; // 1件だけなので先頭でOK
  };
  // useEffect(() => {
  //   fetchApi("1");
  //   getUsers();
  // }, []);

  // 無限...
  // useEffect(() => {
  //   doSomething();
  // }, []);

  useEffect(() => {
    sayHello();
  }, []);

  return (
    <Container maxWidth="lg">
      <Drawer>
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            単語カードアプリ
          </Typography>
        </Box>
        <Copyright />
      </Drawer>
    </Container>
  );
};

export default Home;
