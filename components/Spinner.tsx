"use client";
import React from "react";
import { ClipLoader } from "react-spinners";
const override = {
  display: "block",
  margin: "100px auto",
};
export default function Spinner({loading}: any) {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
}
