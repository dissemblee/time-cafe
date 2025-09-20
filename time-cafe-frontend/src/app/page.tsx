"use client";
import Image from "next/image";
import styles from "./page.module.css";
import RoomBuilder from "@/room-builder";

export default function Home() {

  return (
     <main className="h-screen">
      <RoomBuilder />
    </main>
  );
}
