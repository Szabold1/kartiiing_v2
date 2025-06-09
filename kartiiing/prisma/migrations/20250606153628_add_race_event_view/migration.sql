CREATE OR REPLACE VIEW race_event_view AS
SELECT
  re.id AS id,

  rw."dateStart" AS date_start,
  rw."dateEnd" AS date_end,

  c.id AS circuit_id,
  c."nameShort" AS circuit_name,
  c."nameLong" AS circuit_name_long,

  co.code AS country_code,
  co.name AS country_name,

  ch."nameShort" AS championship_name,
  ch."nameLong" AS championship_name_long,
  ch."nameSeries" AS championship_series,
  re."roundNumber" AS round_number,

  cat.name AS category_name,
  et.name AS engine_type_name,

  rl.url AS result_link_url,
  rl.category AS result_link_category,

  ll.url AS live_link_url,
  ll.type AS live_link_type

FROM race_events re
JOIN race_weekends rw ON re."raceWeekendId" = rw.id
JOIN circuits c ON rw."circuitId" = c.id
JOIN countries co ON c."countryId" = co.id
JOIN championships ch ON re."championshipId" = ch.id

LEFT JOIN "_RaceEventCategories" rc ON rc."B" = re.id
LEFT JOIN categories cat ON rc."A" = cat.id
LEFT JOIN engine_types et ON cat."engineTypeId" = et.id

LEFT JOIN result_links rl ON rl."raceEventId" = re.id
LEFT JOIN live_links ll ON ll."raceEventId" = re.id;
