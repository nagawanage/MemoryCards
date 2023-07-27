"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import useWordStore from "@/store/useWordStore";
import Copyright from "@/components/molecules/CopyRight/Copyright";
import Drawer from "@/components/organisms/Drawer/ClippedDrawer";
import InputText from "@/components/atoms/InputText";
import ClickableChips from "@/components/molecules/Chip/ClickableChips";
// import SubmitButton from "@/components/atoms/SubmitButton";
import Label from "@/components/atoms/Label";

import { WordsPagedResponse, WordResponse } from "@/api_clients";

const CreateWord = () => {
  console.log("[Word/Create.tsx]");

  // 単語帳グループ
  const { wordGroupIds, updateWordGroupIds, resetWordGroupIds } =
    useWordStore();
  const onChangeWordGroupIds = (e: ChangeEvent<HTMLInputElement>) => {
    updateWordGroupIds(e.target.value);
  };
  // 単語
  const { word, updateWord, resetWord } = useWordStore();
  const onChangeWord = (e: ChangeEvent<HTMLInputElement>) => {
    updateWord(e.target.value);
  };
  // 意味
  const { meaning, updateMeaning, resetMeaning } = useWordStore();
  const onChangeMeaning = (e: ChangeEvent<HTMLInputElement>) => {
    updateMeaning(e.target.value);
  };
  // ヒント
  const { hint, updateHint, resetHint } = useWordStore();
  const onChangeHint = (e: ChangeEvent<HTMLInputElement>) => {
    updateHint(e.target.value);
  };
  // メモ
  const { note, updateNote, resetNote } = useWordStore();
  const onChangeNote = (e: ChangeEvent<HTMLInputElement>) => {
    updateNote(e.target.value);
  };

  const postData = async (data): Promise<AxiosResponse> => {
    const url = `http://0.0.0.0:8888/words`;
    console.log({ url });
    const response = await axios.post(url, data);
    return response;
  };

  // 登録
  const onClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // const createData: any = {
    //   word,
    //   meaning,
    //   hint,
    //   note,
    // };

    // console.log("createData:", createData);

    const wordData = {
      userId: "1",
      categoryId: ["1"],
      groupId: ["1"],
      word,
      meaning,
      hint,
      note: { memo: note },
      // check1UpdatedAt: "2023-07-27T13:33:43.486Z",
      // check2UpdatedAt: "2023-07-27T13:33:43.486Z",
      // check3UpdatedAt: "2023-07-27T13:33:43.486Z",
    };

    // postData(createData)
    postData(wordData)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container maxWidth="xl">
      <Drawer>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* タイトル */}
          <Grid spacing={2} sx={{ my: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              単語登録
            </Typography>
          </Grid>

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            {/* 単語帳グループ */}
            <Grid
              container
              // direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              rowSpacing={8}
            >
              <Grid xs={2}>
                <Label>単語帳</Label>
              </Grid>
              <Grid xs={10}>
                <InputText
                  value={wordGroupIds}
                  onChange={onChangeWordGroupIds}
                  onClick={resetWordGroupIds}
                />
              </Grid>
            </Grid>

            {/* カテゴリ */}
            <Grid
              container
              // direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              rowSpacing={8}
            >
              <Grid xs={2}>
                <Label>カテゴリ</Label>
              </Grid>
              <Grid xs={10}>
                <ClickableChips />
              </Grid>
            </Grid>

            {/* 単語 */}
            <Grid
              container
              // direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              rowSpacing={8}
            >
              <Grid xs={2}>
                <Label>単語</Label>
              </Grid>
              <Grid xs={10}>
                <InputText
                  value={word}
                  onChange={onChangeWord}
                  onClick={resetWord}
                />
              </Grid>
            </Grid>

            {/* 意味 */}
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid xs={2}>
                <Label>意味</Label>
              </Grid>
              <Grid xs={10}>
                <InputText
                  multiline
                  value={meaning}
                  onChange={onChangeMeaning}
                  onClick={resetMeaning}
                />
              </Grid>
            </Grid>

            {/* ヒント */}
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid xs={2}>
                <Label>ヒント</Label>
              </Grid>
              <Grid xs={10}>
                <InputText
                  multiline
                  value={hint}
                  onChange={onChangeHint}
                  onClick={resetHint}
                />
              </Grid>
            </Grid>

            {/* メモ */}
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid xs={2}>
                <Label>メモ</Label>
              </Grid>
              <Grid xs={10}>
                <InputText
                  multiline
                  value={note}
                  onChange={onChangeNote}
                  onClick={resetNote}
                />
              </Grid>
            </Grid>
          </Box>

          {/* 登録 */}
          <Box
            sx={{
              my: 5,
            }}
          >
            {/* <SubmitButton text="登録" color="primary" onClick={onClickSubmit} /> */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onClickSubmit}
            >
              登録
            </Button>
          </Box>
        </Box>
        <Copyright />
      </Drawer>
    </Container>
  );
};

export default CreateWord;
