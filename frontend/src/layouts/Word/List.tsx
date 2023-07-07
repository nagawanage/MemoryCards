"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import useStore from "@/store";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Copyright from "@/components/molecules/CopyRight/Copyright";
import Drawer from "@/components/organisms/Drawer/ClippedDrawer";
import Table from "@/components/organisms/Table/Table";

import axios from "axios";

const WordList = () => {
  // const router = useRouter();
  // const updateWord = useStore((state) => state.updateEditedWord);

  const [word, setWord] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  // スプレッドシート取得（ref: https://macoblog.com/google-spreadsheet-json/, https://qiita.com/sin164/items/2addcf88dda4844d5219）
  const [data, setData] = useState([]);

  const returnJsonFromArray = (props: Array<string | number>) => {
    // 1行目: header、2行目以降: データ
    const [header, ...rows] = props;
    return rows.map((row: Array<string | number>) =>
      // キーと値のペアを作成
      row.reduce(
        (
          acc: { [key: string]: string | number },
          cell: string | number,
          i: number
        ) => ({ ...acc, [header[i]]: cell }),
        {}
      )
    );
  };
  useEffect(() => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_DOC_ID}/values/sheet1?key=${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY}`;
    console.log({ url });

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const responseData = returnJsonFromArray(response.data.values);
        setData(responseData);
        console.log({ responseData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Drawer>
        <Box sx={{ width: "80%" }}>
          {data.length ? <Table rows={data} /> : ""}
        </Box>
      </Drawer>
    </Container>
  );
};

export default WordList;
