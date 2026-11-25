# THE WORLD IN ONE DAY — Tuesday 24 November 2026 in one image

[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/xszee/news-image-20261124-main/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/xszee/news-image-20261124-main/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

A one-day newspaper front page summing up the world's news of
**Tuesday 24 November 2026**, built for the
[make.fun news-image-20261124 bounty](https://make.fun/bounty/news-image-20261124).

## The front page

- **Lead — Huang is back.** Nvidia reinstates founder and CEO Jensen Huang
  after former US President Donald Trump's intervention breaks a
  months-long standoff; shares rise sharply in after-hours trading.
- **Fourteen nations affirm ICJ genocide ruling against Myanmar.** The UK,
  Spain, Canada, Australia and ten others back the International Court of
  Justice's ruling that Myanmar's military committed genocide against the
  Rohingya.
- **China launches Shenzhou-24 with first Pakistani astronaut to space
  station.** The crew heads to the Tiangong space station, a milestone for
  Sino-Pakistani cooperation in space.
- **UN chief calls for global AI safety rules within a year.** Secretary-
  General António Guterres urges countries to agree binding rules within
  12 months, warning the risks of unchecked AI "are too great to ignore".
- **Nepal hit by 5.6 magnitude earthquake near China border.** Tremors
  felt across the region, raising fresh concerns for mountain communities.

All stories were reported on Tuesday 24 November 2026
(sources: AP, Reuters, AFP, BBC, Medium/All Voices News).

## How it was made

The front page was composed by the entrant in ChatGPT from a researched
prompt listing the day's real headlines; `main.ts` only validates the
image (whole PNG or JPEG, at most 1 MiB, exactly 1024×1024) and copies it
to the output directory as `entry.png`, so both grader runs produce
byte-identical output.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
