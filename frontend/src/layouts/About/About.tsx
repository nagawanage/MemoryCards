"use client";

import React from "react";
import Link from "next/link";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Copyright from "@/components/molecules/CopyRight/Copyright";
import Drawer from "@/components/organisms/Drawer/ClippedDrawer";

export default function About() {
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
            About page
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Material UI - Next.js example using App Router in TypeScript
          </Typography>
          <Link href="/">Go to the main page</Link>
          <Copyright />
        </Box>
      </Drawer>
    </Container>
  );
}
