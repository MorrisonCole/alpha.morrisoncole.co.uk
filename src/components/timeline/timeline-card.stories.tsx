import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimelineCard } from "./timeline-card";
import { Category } from "./timeline-data";
import unityBlackPic from "../../assets/timeline/unity-black.png?w=400;800&format=avif;webp;png&as=picture";
import tokyoPic from "../../assets/timeline/tokyo.jpg?w=400;800&format=avif;webp;jpg&as=picture";
import latentSignalPic from "../../assets/timeline/latent-signal.png?w=400;800&format=avif;webp;png&as=picture";

const meta: Meta<typeof TimelineCard> = {
  component: TimelineCard,
};

type Story = StoryObj<typeof TimelineCard>;

export const SoftwareEntry: Story = {
  args: {
    entry: {
      date: "2020 - Now",
      image: unityBlackPic,
      imageAlt: "Unity Logo",
      mainLink: "https://unity.com/",
      subtitle1: "Senior Software Engineer",
      subtitle2: "",
      text: "Building the core platform for cloud.unity.com 🛠️",
      title: "Unity",
      category: Category.Software,
    },
  },
};

export const LifeEntry: Story = {
  args: {
    entry: {
      date: "2019",
      image: tokyoPic,
      imageAlt: "Tokyo at night",
      mainLink: "https://goo.gl/maps/7FFdpXCeUU3koAAv9",
      subtitle1: "Moved",
      subtitle2: "",
      text: "Back to the metropolis.",
      title: "Tokyo",
      category: Category.Life,
    },
  },
};

export const MusicEntry: Story = {
  args: {
    entry: {
      date: "2018 - Now",
      image: latentSignalPic,
      imageAlt: "Latent Signal channel art",
      mainLink: "https://www.youtube.com/@latentsignal",
      subtitle1: "Performer, Songwriter, Mixing Engineer, Video Editor",
      subtitle2: "",
      text: "TL;DR I make music.",
      title: "Latent Signal",
      category: Category.Music,
    },
  },
};

export default meta;
