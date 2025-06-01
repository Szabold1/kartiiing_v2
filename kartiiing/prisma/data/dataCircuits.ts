import { PrismaClient } from "@prisma/client";
import { getCountryByCode } from "../helpers";

async function getCircuitsSpain(prisma: PrismaClient) {
  const spain = await getCountryByCode(prisma, "ES");
  return [
    {
      nameShort: "Campillos",
      nameLong: "KartCenter Campillos",
      length: 1580,
      websiteLink: "https://kartingcampillos.com",
      latitude: 37.038807,
      longitude: -4.914103,
      countryId: spain.id,
    },
    {
      nameShort: "Valencia",
      nameLong: "Kartodromo Internacional Lucas Guerrero",
      length: 1428,
      websiteLink: "https://kartodromovalencia.com",
      latitude: 39.508082,
      longitude: -0.747138,
      countryId: spain.id,
    },
    {
      nameShort: "Aragón",
      nameLong: "MotorLand Aragón",
      length: 1671,
      websiteLink: "https://www.motorlandaragon.com",
      latitude: 41.076612,
      longitude: -0.188066,
      countryId: spain.id,
    },
    {
      nameShort: "Zuera",
      nameLong: "Circuito Internacional de Zuera",
      length: 1699,
      websiteLink: "https://circuitointernacionaldezuera.es",
      latitude: 41.827155,
      longitude: -0.812462,
      countryId: spain.id,
    },
    {
      nameShort: "Oviedo",
      nameLong: "Museo y Circuito Fernando Alonso",
      length: 1390,
      websiteLink: "https://www.museoycircuitofernandoalonso.com",
      latitude: 43.43007,
      longitude: -5.833998,
      countryId: spain.id,
    },
  ];
}

async function getCircuitsBelgium(prisma: PrismaClient) {
  const belgium = await getCountryByCode(prisma, "BE");
  return [
    {
      nameShort: "Genk",
      nameLong: "Karting Genk",
      length: 1360,
      websiteLink: "https://www.kartinggenk.be",
      latitude: 50.987527,
      longitude: 5.564259,
      countryId: belgium.id,
    },
    {
      nameShort: "Mariembourg",
      nameLong: "Karting des Fagnes",
      length: 1366,
      websiteLink: "https://kartingdesfagnes.be",
      latitude: 50.093459,
      longitude: 4.500435,
      countryId: belgium.id,
    },
    {
      nameShort: "Stavelot",
      nameLong: "RACB Karting Spa-Francorchamps",
      length: 1092,
      websiteLink: "https://www.francorchamps-karting.be",
      latitude: 50.432217,
      longitude: 5.962838,
      countryId: belgium.id,
    },
  ];
}

async function getCircuitsGermany(prisma: PrismaClient) {
  const germany = await getCountryByCode(prisma, "DE");
  return [
    {
      nameShort: "Wackersdorf",
      nameLong: "Prokart Raceland",
      length: 1190,
      websiteLink: "https://www.prokart-raceland.com",
      latitude: 49.326048,
      longitude: 12.215282,
      countryId: germany.id,
    },
    {
      nameShort: "Kerpen",
      nameLong: "Kart-Club Kerpen",
      length: 1107,
      websiteLink: "https://www.kart-club-kerpen.de",
      latitude: 50.88819,
      longitude: 6.614112,
      countryId: germany.id,
    },
    {
      nameShort: "Ampfing",
      nameLong: "Kartbahn Ampfing",
      length: 1063,
      websiteLink: "https://www.kartshop-ampfing.de",
      latitude: 48.245851,
      longitude: 12.443331,
      countryId: germany.id,
    },
    {
      nameShort: "Mülsen",
      nameLong: "Motorsportarena Mülsen",
      length: 1315,
      websiteLink: "https://arena-e.de",
      latitude: 50.779925,
      longitude: 12.544623,
      countryId: germany.id,
    },
    {
      nameShort: "Belleben",
      nameLong: "Motodrom Belleben",
      length: 980,
      websiteLink: "https://www.motodrom-belleben.net",
      latitude: 51.68388,
      longitude: 11.639207,
      countryId: germany.id,
    },
  ];
}

async function getCircuitsItaly(prisma: PrismaClient) {
  const italy = await getCountryByCode(prisma, "IT");
  return [
    {
      nameShort: "Franciacorta",
      nameLong: "Franciacorta Karting Track",
      length: 1300,
      websiteLink: "https://www.franciacortakartingtrack.com",
      latitude: 45.515831,
      longitude: 10.004017,
      countryId: italy.id,
    },
  ];
}

async function getCircuitsPortugal(prisma: PrismaClient) {
  const portugal = await getCountryByCode(prisma, "PT");
  return [
    {
      nameShort: "Portimão",
      nameLong: "Kartódromo Internacional do Algarve",
      length: 1531,
      websiteLink: "https://autodromodoalgarve.com",
      latitude: 37.233886,
      longitude: -8.635683,
      countryId: portugal.id,
    },
  ];
}

export async function getCircuitsData(prisma: PrismaClient) {
  const circuitsSpain = await getCircuitsSpain(prisma);
  const circuitsBelgium = await getCircuitsBelgium(prisma);
  const circuitsGermany = await getCircuitsGermany(prisma);
  const circuitsItaly = await getCircuitsItaly(prisma);
  const circuitsPortugal = await getCircuitsPortugal(prisma);
  return [
    ...circuitsSpain,
    ...circuitsBelgium,
    ...circuitsGermany,
    ...circuitsItaly,
    ...circuitsPortugal,
  ];
}
