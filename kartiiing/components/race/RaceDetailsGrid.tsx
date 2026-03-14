"use client";

import { IRaceEventDetail } from "@kartiiing/shared-types";
import dynamic from "next/dynamic";

const RaceDetailsMasonry = dynamic(
  () => import("@/components/race/RaceDetailsMasonry"),
  {
    ssr: false,
  },
);

type Props = {
  race: IRaceEventDetail;
};

export default function RaceDetailsGrid({ race }: Props) {
  return <RaceDetailsMasonry race={race} />;
}
