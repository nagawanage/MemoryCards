"use client";

import React from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function SignUp() {
  return (
    <Container maxWidth="lg">
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
          SignUp page
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Material UI - Next.js example using App Router in TypeScript
        </Typography>
        <Link href="/">Go to the main page</Link>
      </Box>
    </Container>
  );
}
