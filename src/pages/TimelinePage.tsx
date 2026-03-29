import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "../components/layout";
import { TimelineIntro } from "../components/timeline/timeline-intro";
import { Timeline } from "../components/timeline/timeline";
import { FilterChip } from "../components/timeline/filter-chip";
import {
  Category,
  timelineEntries,
} from "../components/timeline/timeline-data";
import styles from "./TimelinePage.module.css";

const FILTERS: Record<string, Category[]> = {
  Everything: [Category.Software, Category.Life, Category.Music],
  Life: [Category.Life],
  Music: [Category.Music],
  Software: [Category.Software],
};

const FILTER_KEYS = ["Everything", "Life", "Music", "Software"] as const;

type FilterKey = (typeof FILTER_KEYS)[number];

export const TimelinePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("Everything");

  const filteredEntries = timelineEntries.filter((entry) =>
    FILTERS[activeFilter].includes(entry.category),
  );

  return (
    <Layout>
      <Helmet>
        <title>Morrison Cole</title>
        <meta
          name="description"
          content="Software engineer, ex-product manager, and musician living in Tokyo."
        />
        <link
          rel="preload"
          as="image"
          href={timelineEntries[0].image.img.src}
        />
      </Helmet>

      <TimelineIntro />

      <div className={styles.filters}>
        {FILTER_KEYS.map((key) => (
          <FilterChip
            key={key}
            label={key}
            active={activeFilter === key}
            onClick={() => setActiveFilter(key)}
          />
        ))}
      </div>

      <Timeline entries={filteredEntries} />
    </Layout>
  );
};
