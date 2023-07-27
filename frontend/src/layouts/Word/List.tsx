"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

// import useStore from "@/store";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Copyright from "@/components/molecules/CopyRight/Copyright";
import Drawer from "@/components/organisms/Drawer/ClippedDrawer";
import Table from "@/components/organisms/Table/Table";
import { WordsPagedResponse, WordResponse } from "@/api_clients";
// import { WordsApiClient } from "@/api_clients/client";

const ROWS_PER_PAGE = 30;

const WordList = () => {
  // const router = useRouter();
  // const updateWord = useStore((state) => state.updateEditedWord);

  const [word, setWord] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const [data, setData] = useState([]);
  // スプレッドシート取得（ref: https://macoblog.com/google-spreadsheet-json/, https://qiita.com/sin164/items/2addcf88dda4844d5219）
  const [dataGoogle, setDataGoogle] = useState([]); // スプレッドシート

  const parseAndReturnArray = (props: Array<string | number>) => {
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
  // （仮）スプレッドシートから取得
  useEffect(() => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_DOC_ID}/values/sheet1?key=${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY}`;
    console.log({ url });

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const responseData = parseAndReturnArray(response.data.values);
        setDataGoogle(responseData);
        console.log({ responseData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const url = `http://0.0.0.0:8888/words?page=1&perPage=${ROWS_PER_PAGE}`;
    console.log({ url });

    const getWords = async () => {
      axios
        .get<Array<WordsPagedResponse>>(url)
        .then(async (res) => {
          setData(res.data.data);
          console.log("data: ", res.data.data);
        })
        .catch((error) => {
          // showMessage({ title: "ユーザー取得に失敗しました", status: "error" })
          console.error("Error fetching data:", error);
        });
    };

    getWords();
  }, []);

  return (
    <Container maxWidth="xl">
      <Drawer>
        {/* スプレッドシート */}
        <Box sx={{ width: "80%" }}>
          {dataGoogle.length ? (
            <Table
              title={"単語一覧（スプシ）"}
              rows={dataGoogle}
              rowsPerPageProps={ROWS_PER_PAGE}
            />
          ) : (
            ""
          )}
          <hr />
        </Box>

        {/* API */}
        <Box sx={{ width: "80%" }}>
          {data.length ? (
            <Table
              title={"単語一覧"}
              rows={data}
              rowsPerPageProps={ROWS_PER_PAGE}
            />
          ) : (
            ""
          )}
        </Box>
      </Drawer>
    </Container>
  );
};

export default WordList;
