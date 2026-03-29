import unityBlackPic from "../../assets/timeline/unity-black.png?w=400;800&format=avif;webp;png&as=picture";
import unityWhitePic from "../../assets/timeline/unity-white.png?w=400;800&format=avif;webp;png&as=picture";
import tokyoPic from "../../assets/timeline/tokyo.jpg?w=400;800&format=avif;webp;jpg&as=picture";
import medmainPic from "../../assets/timeline/medmain.png?w=400;800&format=avif;webp;png&as=picture";
import kobePic from "../../assets/timeline/kobe.jpg?w=400;800&format=avif;webp;jpg&as=picture";
import latentSignalPic from "../../assets/timeline/latent-signal.png?w=400;800&format=avif;webp;png&as=picture";
import improbablePic from "../../assets/timeline/improbable.png?w=400;800&format=avif;webp;png&as=picture";
import shazamPic from "../../assets/timeline/shazam.png?w=400;800&format=avif;webp;png&as=picture";
import thirdnervePic from "../../assets/timeline/thirdnerve.png?w=400;800&format=avif;webp;png&as=picture";
import uclPic from "../../assets/timeline/ucl.jpg?w=400;800&format=avif;webp;jpg&as=picture";
import londonPic from "../../assets/timeline/london.jpg?w=400;800&format=avif;webp;jpg&as=picture";
import wcsPic from "../../assets/timeline/wcs.jpg?w=400;800&format=avif;webp;jpg&as=picture";
import falmouthPic from "../../assets/timeline/falmouth.jpg?w=400;800&format=avif;webp;jpg&as=picture";

export const Category = {
  Software: "Software",
  Life: "Life",
  Music: "Music",
} as const;

export type Category = (typeof Category)[keyof typeof Category];

export interface Picture {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
}

export interface TimelineEntry {
  date: string;
  image: Picture;
  imageDark?: Picture;
  imageAlt: string;
  mainLink: string;
  subtitle1: string;
  subtitle2: string;
  text: string;
  title: string;
  category: Category;
}

export const timelineEntries: TimelineEntry[] = [
  {
    date: "2020 - Now",
    image: unityBlackPic,
    imageDark: unityWhitePic,
    imageAlt: "Unity Logo",
    mainLink: "https://unity.com/",
    subtitle1: "Senior Software Engineer",
    subtitle2: "",
    text: "Building the core platform for cloud.unity.com 🛠️",
    title: "Unity",
    category: Category.Software,
  },
  {
    date: "2019",
    image: tokyoPic,
    imageAlt: "Tokyo at night",
    mainLink: "https://goo.gl/maps/7FFdpXCeUU3koAAv9",
    subtitle1: "Moved",
    subtitle2: "",
    text: "Back to the metropolis. Working and teaching in the software industry.",
    title: "Tokyo",
    category: Category.Life,
  },
  {
    date: "2019 - 2020",
    image: medmainPic,
    imageAlt: "Medmain logo",
    mainLink: "https://medmain.com/",
    subtitle1: "Software Engineer, Server",
    subtitle2: "",
    text: "Developed an AI-powered product to speed up medical diagnoses. Didn't do any AI things though.",
    title: "Medmain Inc.",
    category: Category.Software,
  },
  {
    date: "2019",
    image: kobePic,
    imageAlt: "Kobe cityscape",
    mainLink: "https://goo.gl/maps/hURywEujBbYCqqbA6",
    subtitle1: "Moved",
    subtitle2: "",
    text: "Studied Japanese, hiked (a lot), tried to figure out how to do basic stuff.",
    title: "Kobe, Hyogo",
    category: Category.Life,
  },
  {
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
  {
    date: "2015 - 2019",
    image: improbablePic,
    imageAlt: "Improbable logo",
    mainLink: "https://www.crunchbase.com/organization/improbable",
    subtitle1: "Software Engineer & Product Manager",
    subtitle2: "",
    text: "Improbable contacted me when they were an early-stage startup of around 40 people. The mission merged the gaming industry with challenging software and product problems, so I interviewed and the rest, as they say, is history. Improbable now stands at around 400 people. I was sad to leave after I had experienced so much there, but honestly scaling a startup is tiring (or at least, being part of a startup that scales is tiring).",
    title: "Improbable",
    category: Category.Software,
  },
  {
    date: "2013 - 2015",
    image: shazamPic,
    imageAlt: "Shazam logo",
    mainLink: "https://www.crunchbase.com/organization/shazam",
    subtitle1: "Junior Software Engineer",
    subtitle2: "(Aqc. by Apple, 2018)",
    text: "After interning here during the final year of my degree, I joined the Android team full-time.",
    title: "Shazam",
    category: Category.Software,
  },
  {
    date: "2013",
    image: thirdnervePic,
    imageAlt: "Third Nerve logo",
    mainLink: "https://steamcommunity.com/sharedfiles/filedetails/?id=92967778",
    subtitle1: "Founder",
    subtitle2: "",
    text: "I founded Third Nerve at UCL during a resurgence of independent games. We developed a multiplayer platformer that we took to game festivals around the UK and successfully got greenlit on Steam.",
    title: "Third Nerve",
    category: Category.Software,
  },
  {
    date: "2010 - 2014",
    image: uclPic,
    imageAlt: "UCL quad",
    mainLink: "https://www.ucl.ac.uk/",
    subtitle1: "BSc Computer Science",
    subtitle2: "First-class Honours",
    text: "Wanted to attend music college, but for some reason I decided at the last moment to get a degree in Computer Science. Graduated with 1st-class honours.",
    title: "University College London",
    category: Category.Software,
  },
  {
    date: "2010",
    image: londonPic,
    imageAlt: "London cityscape",
    mainLink: "https://goo.gl/maps/QoKpM98YJtjERNmY8",
    subtitle1: "Moved",
    subtitle2: "",
    text: "After a life in the countryside, the metropolis was attractive.",
    title: "London, UK",
    category: Category.Life,
  },
  {
    date: "2006 - 2010",
    image: wcsPic,
    imageAlt: "Wells Cathedral School alleyway",
    mainLink: "https://wells.cathedral.school/",
    subtitle1: "Specialist Musician",
    subtitle2: "3 A-Levels (A*-A), 6 GCSEs (A*-A)",
    text: "Joined as a trombonist with a full musical scholarship. Typical conservative/religious boarding school typed stuff... (and I wonder why I have to go to therapy).",
    title: "Wells Cathedral School",
    category: Category.Life,
  },
  {
    date: "1992",
    image: falmouthPic,
    imageAlt: "Falmouth townscape",
    mainLink: "https://goo.gl/maps/w7SRynhttGuu4Nst7",
    subtitle1: "Falmouth, Cornwall",
    subtitle2: "",
    text: "I never asked for this.",
    title: "Born",
    category: Category.Life,
  },
];
