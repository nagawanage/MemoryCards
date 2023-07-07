"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Copyright from "@/components/molecules/CopyRight/Copyright";
import Drawer from "@/components/organisms/Drawer/ClippedDrawer";
import InputText from "@/components/atoms/InputText";
import SubmitButton from "@/components/atoms/SubmitButton";
import Label from "@/components/atoms/Label";

const CreateWord = () => {
  console.log("[Word/Create.tsx]");

  // 単語
  const [word, setWord] = useState("");
  const onChangeWord = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };
  const resetWord = () => {
    setWord("");
  };
  // 意味
  const [meaning, setMeaning] = useState("");
  const onChangeMeaning = (e: ChangeEvent<HTMLInputElement>) => {
    setMeaning(e.target.value);
  };
  const resetMeaning = () => {
    setMeaning("");
  };
  // ヒント
  const [hint, setHint] = useState("");
  const onChangeHint = (e: ChangeEvent<HTMLInputElement>) => {
    setHint(e.target.value);
  };
  const resetHint = () => {
    setHint("");
  };
  // メモ
  const [note, setNote] = useState("");
  const onChangeNote = (e: ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };
  const resetNote = () => {
    setNote("");
  };

  // 登録
  const onClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const createData: any = {
      word,
      meaning,
      hint,
      note,
    };
    console.log({ createData });
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
            <SubmitButton text="登録" color="primary" onClick={onClickSubmit} />
          </Box>
        </Box>
        <Copyright />
      </Drawer>
    </Container>
  );
};

export default CreateWord;
