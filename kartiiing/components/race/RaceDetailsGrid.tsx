"use client";

import { IRaceEventDetail } from "@kartiiing/shared";
import dynamic from "next/dynamic";
import { Loader } from "@/components/shared/Loader";

const RaceDetailsMasonry = dynamic(
  () =>
    import("@/components/race/RaceDetailsMasonry").then(
      (mod) => mod.RaceDetailsMasonry,
    ),
  {
    ssr: false,
    loading: () => <Loader />,
  },
);

type Props = {
  race: IRaceEventDetail;
};

export function RaceDetailsGrid({ race }: Props) {
  return <RaceDetailsMasonry race={race} />;
}
