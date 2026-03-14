"use client";

import { IRaceEventDetail } from "@kartiiing/shared-types";
import dynamic from "next/dynamic";
import Loader from "@/components/shared/Loader";

const RaceDetailsMasonry = dynamic(
  () => import("@/components/race/RaceDetailsMasonry"),
  {
    ssr: false,
    loading: () => <Loader />,
  },
);

type Props = {
  race: IRaceEventDetail;
};

export default function RaceDetailsGrid({ race }: Props) {
  return <RaceDetailsMasonry race={race} />;
}
