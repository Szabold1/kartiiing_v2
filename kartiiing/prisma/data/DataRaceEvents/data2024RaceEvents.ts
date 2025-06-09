function get2024Fia() {
  return [
    {
      roundNumber: 1,
      championshipNameShort: "FIA",
      championshipSeries: "European Championship",
      circuitShortName: "Valencia",
      dateEnd: "2024-03-24",
      categoryNames: ["OK", "OK-J"],
      resultLinks: [
        {
          url: "https://www.fiakarting.com/event/2024-valencia/OK/results",
          category: "OK",
        },
        {
          url: "https://www.fiakarting.com/event/2024-valencia/OK-Junior/results",
          category: "OK-J",
        },
      ],
    },
  ];
}

export function get2024RaceEvents() {
  return [...get2024Fia()];
}
