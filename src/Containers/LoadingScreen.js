import React from "react";

export function LoadingScreen() {
  return <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }}>Loading the data {console.log("loading state")}</div>;
}
  