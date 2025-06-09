import { getCircuitByShortName } from "@/prisma/helpers";
import { prisma } from "@/lib/prisma";

export async function get2025RaceWeekends() {
  const campillos = await getCircuitByShortName(prisma, "Campillos");
  const portimao = await getCircuitByShortName(prisma, "Portimão");
  const valencia = await getCircuitByShortName(prisma, "Valencia");
  const viterbo = await getCircuitByShortName(prisma, "Viterbo");
  const sarno = await getCircuitByShortName(prisma, "Sarno");
  const mulsen = await getCircuitByShortName(prisma, "Mülsen");
  const rodby = await getCircuitByShortName(prisma, "Rødby");
  const kristianstad = await getCircuitByShortName(prisma, "Kristianstad");
  const cremona = await getCircuitByShortName(prisma, "Cremona");
  const franciacorta = await getCircuitByShortName(prisma, "Franciacorta");
  const laConca = await getCircuitByShortName(prisma, "La Conca");
  const lonato = await getCircuitByShortName(prisma, "Lonato");
  const wackersdorf = await getCircuitByShortName(prisma, "Wackersdorf");
  const trinec = await getCircuitByShortName(prisma, "Třinec");
  const genk = await getCircuitByShortName(prisma, "Genk");
  const zuera = await getCircuitByShortName(prisma, "Zuera");
  const mariembourg = await getCircuitByShortName(prisma, "Mariembourg");
  const wohlen = await getCircuitByShortName(prisma, "Wohlen");
  const castelletto = await getCircuitByShortName(
    prisma,
    "Castelletto di Branduzzo"
  );
  const vesoul = await getCircuitByShortName(prisma, "Vesoul");
  const levier = await getCircuitByShortName(prisma, "Lévier");

  return [
    {
      circuitId: laConca.id,
      dateStart: new Date("2025-01-22"),
      dateEnd: new Date("2025-01-26"),
    },
    {
      circuitId: sarno.id,
      dateStart: new Date("2025-02-05"),
      dateEnd: new Date("2025-02-09"),
    },
    {
      circuitId: lonato.id,
      dateStart: new Date("2025-02-08"),
      dateEnd: new Date("2025-02-09"),
    },
    {
      circuitId: valencia.id,
      dateStart: new Date("2025-02-12"),
      dateEnd: new Date("2025-02-16"),
    },
    {
      circuitId: cremona.id,
      dateStart: new Date("2025-02-14"),
      dateEnd: new Date("2025-02-16"),
    },
    {
      circuitId: lonato.id,
      dateStart: new Date("2025-02-19"),
      dateEnd: new Date("2025-02-23"),
    },
    {
      circuitId: franciacorta.id,
      dateStart: new Date("2025-03-05"),
      dateEnd: new Date("2025-03-09"),
    },
    {
      circuitId: viterbo.id,
      dateStart: new Date("2025-03-12"),
      dateEnd: new Date("2025-03-16"),
    },
    {
      circuitId: cremona.id,
      dateStart: new Date("2025-03-19"),
      dateEnd: new Date("2025-03-23"),
    },
    {
      circuitId: franciacorta.id,
      dateStart: new Date("2025-03-23"),
      dateEnd: new Date("2025-03-23"),
    },
    {
      circuitId: viterbo.id,
      dateStart: new Date("2025-03-28"),
      dateEnd: new Date("2025-03-30"),
    },
    {
      circuitId: campillos.id,
      dateStart: new Date("2025-04-03"),
      dateEnd: new Date("2025-04-06"),
    },
    {
      circuitId: wohlen.id,
      dateStart: new Date("2025-04-21"),
      dateEnd: new Date("2025-04-21"),
    },
    {
      circuitId: wackersdorf.id,
      dateStart: new Date("2025-04-25"),
      dateEnd: new Date("2025-04-27"),
    },
    {
      circuitId: portimao.id,
      dateStart: new Date("2025-05-01"),
      dateEnd: new Date("2025-05-04"),
    },
    {
      circuitId: viterbo.id,
      dateStart: new Date("2025-05-13"),
      dateEnd: new Date("2025-05-17"),
    },
    {
      circuitId: valencia.id,
      dateStart: new Date("2025-05-15"),
      dateEnd: new Date("2025-05-18"),
    },
    {
      circuitId: castelletto.id,
      dateStart: new Date("2025-05-18"),
      dateEnd: new Date("2025-05-18"),
    },
    {
      circuitId: zuera.id,
      dateStart: new Date("2025-05-21"),
      dateEnd: new Date("2025-05-25"),
    },
    {
      circuitId: viterbo.id,
      dateStart: new Date("2025-06-05"),
      dateEnd: new Date("2025-06-08"),
    },
    {
      circuitId: trinec.id,
      dateStart: new Date("2025-06-06"),
      dateEnd: new Date("2025-06-08"),
    },
    {
      circuitId: sarno.id,
      dateStart: new Date("2025-06-19"),
      dateEnd: new Date("2025-06-22"),
    },
    {
      circuitId: vesoul.id,
      dateStart: new Date("2025-06-22"),
      dateEnd: new Date("2025-06-22"),
    },
    {
      circuitId: wackersdorf.id,
      dateStart: new Date("2025-06-25"),
      dateEnd: new Date("2025-06-29"),
    },
    {
      circuitId: genk.id,
      dateStart: new Date("2025-06-27"),
      dateEnd: new Date("2025-06-29"),
    },
    {
      circuitId: cremona.id,
      dateStart: new Date("2025-07-01"),
      dateEnd: new Date("2025-07-05"),
    },
    {
      circuitId: mulsen.id,
      dateStart: new Date("2025-07-17"),
      dateEnd: new Date("2025-07-20"),
    },
    {
      circuitId: rodby.id,
      dateStart: new Date("2025-07-31"),
      dateEnd: new Date("2025-08-03"),
    },
    {
      circuitId: levier.id,
      dateStart: new Date("2025-08-10"),
      dateEnd: new Date("2025-08-10"),
    },
    {
      circuitId: mariembourg.id,
      dateStart: new Date("2025-08-27"),
      dateEnd: new Date("2025-08-31"),
    },
    {
      circuitId: sarno.id,
      dateStart: new Date("2025-09-05"),
      dateEnd: new Date("2025-09-07"),
    },
    {
      circuitId: kristianstad.id,
      dateStart: new Date("2025-09-11"),
      dateEnd: new Date("2025-09-14"),
    },
    {
      circuitId: cremona.id,
      dateStart: new Date("2025-09-25"),
      dateEnd: new Date("2025-09-28"),
    },
    {
      circuitId: wohlen.id,
      dateStart: new Date("2025-10-11"),
      dateEnd: new Date("2025-10-11"),
    },
    {
      circuitId: franciacorta.id,
      dateStart: new Date("2025-10-09"),
      dateEnd: new Date("2025-10-12"),
    },
    {
      circuitId: lonato.id,
      dateStart: new Date("2025-10-14"),
      dateEnd: new Date("2025-10-18"),
    },
    {
      circuitId: franciacorta.id,
      dateStart: new Date("2025-10-22"),
      dateEnd: new Date("2025-10-26"),
    },
    {
      circuitId: cremona.id,
      dateStart: new Date("2025-11-05"),
      dateEnd: new Date("2025-11-09"),
    },
    {
      circuitId: lonato.id,
      dateStart: new Date("2025-11-19"),
      dateEnd: new Date("2025-11-23"),
    },
    {
      circuitId: franciacorta.id,
      dateStart: new Date("2025-11-30"),
      dateEnd: new Date("2025-12-01"),
    },
  ];
}
