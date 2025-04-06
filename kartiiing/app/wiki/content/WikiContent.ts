import { WikiContent } from "@/lib/types/WikiTypes";

const data = {
  pageTitle: "The Basics of Karting",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      paragraphs: [
        {
          type: "text",
          value:
            "First of all, what is a go-kart? A go-kart is a small, open-wheel vehicle designed for racing or recreational use. It is typically low to the ground, lightweight, and powered by a small engine. But I assume if you are here, you already knew that.",
        },
        {
          type: "text",
          value:
            "Karting is often misunderstood by those unfamiliar with the sport. For many, it brings to mind either bumper cars at an amusement park or rental karting sessions where people compete for fun with friends or colleagues. However, karting is a professional motorsport and serves as the foundation for most racing drivers' careers. Many Formula 1 champions, including Ayrton Senna, Michael Schumacher, Lewis Hamilton, and Max Verstappen, began their journey in karting before progressing to higher levels of motorsport.",
        },
        {
          type: "image",
          src: "/images/podium-kz-2013.jpg",
          alt: "Podium of the 2013 CIK-FIA World KZ Championship",
          caption:
            "Podium of the 2013 CIK-FIA World KZ Championship, with from left to right: Charles Leclerc (MCO), Max Verstappen (NLD) & Jordon Lennox-Lamb (GBR) (Photo CIK/KSP)",
        },
      ],
    },
    {
      id: "history",
      title: "A Brief History",
      paragraphs: [
        {
          type: "text",
          value:
            "The first go-kart was built in 1956 by Art Ingels and Lou Borelli in California, USA. It was a small vehicle with a tubular chassis powered by the West Bend engine of a lawnmower. What started as a simple homemade vehicle quickly gained popularity, leading to organized races and the establishment of karting as a competitive sport. Over the decades, karting evolved with advancements in technology, safety, and structured international competitions. Today, it is recognized as the starting point for many aspiring professional racers. Even though it was invented in California, modern karting has its true home in Italy, where many of the top manufacturers, teams, and championships are based.",
        },
        {
          type: "image",
          src: "/images/first_go_kart.jpg",
          alt: "Art Ingels and Lou Borelli with the very first go-kart",
          caption:
            "The first kart created in August 1956 in California (USA) by Art Ingels and Lou Borelli.",
        },
      ],
    },
    {
      id: "engine-types",
      title: "Engine Types and Categories",
      shortTitle: "Engine Types & Categories",
      paragraphs: [
        {
          type: "text",
          value:
            "There are various engine types used in karting, with well-known manufacturers including IAME, Rotax, Vortex, and TM Kart. The classification of categories can be complex due to numerous historical and current variations, but in general, we can differentiate between Shifter Karts and Direct Drive Karts. With Shifter Karts you can usually achieve higher top speeds, while with Direct Drive Karts you can have higher cornering speeds.",
        },
        {
          type: "text",
          value:
            "Additionally, we can separate categories into two main groups: CIK-FIA Regulated Categories and Non-FIA (Single-Make) Categories.",
        },
        {
          type: "sub-section",
          id: "cik-fia-categories",
          title: "CIK-FIA Regulated Categories",
          shortTitle: "FIA Categories",
          paragraphs: [
            {
              type: "text",
              value:
                "These categories follow technical regulations set by the FIA (International Automobile Federation) and allow multiple manufacturers to produce engines that comply with the same rules. These function similarly to Formula 1, where different brands compete within a controlled set of regulations.",
            },
            {
              type: "sub-section",
              id: "shifter",
              title: "Shifter Kart (Gearbox) Categories",
              shortTitle: "Shifter",
              paragraphs: [
                {
                  type: "text",
                  value:
                    "Shifter karts use a gearbox, allowing drivers to shift gears manually. These karts are generally faster and require more skill to drive compared to direct-drive karts. They have a top speed of ~160 km/h and accelerate from 0 to 100 km/h in ~3 seconds.",
                },
                {
                  type: "text-list",
                  value: [
                    "KZ2 – The most common shifter kart category. It features a 125cc, 2-stroke engine with a 6-speed gearbox and is used in FIA, and non FIA championships around the world. (Age ~15+)",
                    "KZ (formerly KZ1) – Shares the same specifications as KZ2 except for chassis and brakes which are open in KZ. It is used in FIA competitions and is where many factory drivers and top professionals race. (Age ~15+)",
                  ],
                },
                {
                  type: "image",
                  src: "/images/kz2.jpg",
                  alt: "KZ2 kart",
                  caption:
                    "David Vidales while shifting gears in a KZ2 (Photo FIA Karting/KSP) ",
                },
              ],
            },
            {
              type: "sub-section",
              id: "direct-drive",
              title: "Direct Drive (Single-Speed) Categories",
              shortTitle: "Direct Drive",
              paragraphs: [
                {
                  type: "text",
                  value:
                    "Direct drive karts do not have a gearbox, meaning they use a single-speed transmission. These karts are typically lighter and require a different driving style compared to shifter karts.",
                },
                {
                  type: "text-list",
                  value: [
                    "OK (Original Kart) – The top direct-drive category today. It uses a 125cc, 2-stroke engine, has no clutch, and must be push-started. It features a power valve system to optimize performance. Also known as OK Senior. (Age ~14+)",
                    "OK-Junior (OK-J, OKJ) – A lower-powered version of OK for younger drivers. (Age ~12-14)",
                    "OK-N (OK-National) – A cost-controlled version of OK, introduced in 2022, aimed at national-level karting with reduced expenses. (Age ~14+)",
                    "OK-N Junior (OKN-J) – The junior version of OK-N. (Age ~12-14)",
                    "Mini – A category for younger drivers, featuring restricted engines to limit power and introduce newcomers to competitive karting. It uses a 60cc engine and is used in national championships, as there are no international licenses under the age of 12. (Age ~8-12)",
                  ],
                },
                {
                  type: "image",
                  src: "/images/ok.jpg",
                  alt: "OK kart",
                  caption:
                    "Dennis Hauger while starting his OK with the help of his mechanic (Photo FIA Karting/KSP)",
                },
              ],
            },
            {
              type: "sub-section",
              id: "older-fia-categories",
              title: "Older FIA Categories",
              shortTitle: "Older Categories",
              paragraphs: [
                {
                  type: "text",
                  value:
                    "These categories are no longer used in FIA competitions, as they have been replaced by the newer ones above.",
                },
                {
                  type: "text-list",
                  value: [
                    "ICC (Intercontinental C) – The predecessor of KZ, used before 2007.",
                    "FA (Formula C) – An early 1990s shifter kart category.",
                    "KF (KF1, KF2, KF3) – Used before OK engines were introduced in 2016. These were 125cc direct-drive engines but had electric starters, centrifugal clutches, and battery-powered ignition, which made them heavy and expensive. KF1 was the top category, similar to KZ1 in the shifters world. KF2 was the senior category (like OK), and KF3 was the junior category (like OK-Junior).",
                    "ICA (Intercontinental A) & JICA (Junior ICA) – Popular in the 1990s and early 2000s, they were direct-drive categories before KF replaced them.",
                    "Formula A – A high-level direct-drive class used in the 1990s and early 2000s, often seen in world championship events.",
                    "Formula Super A – An elite category for top karting drivers, discontinued in the early 2000s.",
                  ],
                },
                {
                  type: "image",
                  src: "/images/formula-super-a.jpg",
                  alt: "Formula Super A",
                  caption:
                    "Jenson Button driving his Formula Super A in 1997 (Photo CIK/Caro)",
                },
              ],
            },
          ],
        },
        {
          type: "sub-section",
          id: "non-fia-categories",
          title: "Non-FIA (Single-Make) Categories",
          shortTitle: "Non-FIA Categories",
          paragraphs: [
            {
              type: "text",
              value:
                "Unlike FIA-regulated categories, single-make series require all drivers to use engines from a single manufacturer, ensuring a more equal setup (similarly to Formula 2, Formula 3, or Porsche Supercup). These single-make series are very similar to each other in terms of speed, but they are made by different manufacturers. All of these manufacturers are well-known, including Rotax, IAME, Vortex, and they offer many categories for every age group. Apart from the engine differences, they also use different tires. This format is popular in national and regional championships, but there are also some well-known international series.",
            },
            {
              type: "text-list",
              value: [
                "Rotax MAX – A well-known engine series produced by Rotax, using 125cc, 2-stroke engines and Mojo tires. It features the following categories: Micro, Mini, Junior, Senior, DD2, and DD2 Masters.",
                "IAME X30 – A popular category using IAME-produced engines, focusing on cost-effective competition. The most popular classes are: X30 Mini, X30 Junior, X30 Senior, X30 Super, and X30 Super Shifter.",
                "Vortex ROK – A series using Vortex ROK engines, with categories like Mini ROK, Junior ROK, Senior ROK, Super ROK, and Shifter ROK. It is a similar concept to Rotax MAX and IAME X30, but probably a little less popular.",
              ],
            },
            {
              type: "image",
              src: "/images/rotax.jpg",
              alt: "Rotax MAX karts",
              caption:
                "Karts from the Rotax MAX Challenge Grand Finals 2019 (Photo Rotax)",
            },
          ],
        },
      ],
    },
    {
      id: "championships",
      title: "Championships",
      paragraphs: [
        {
          type: "text",
          value:
            "In karting there are a lot of different championships, ranging from local and regional to national and international. Here are some of the more popular ones, which you can find on kartiiing.com:",
        },
        {
          type: "text-list",
          value: [
            "CIK-FIA Karting World Championship – A prestigious single-event championship held annually.",
            "CIK-FIA European Championship – A multi-round championship featuring the best drivers in Europe.",
            "CIK-FIA Academy Trophy – A championship for young drivers aged 12-14, designed to develop future talent.",
            "WSK (World Series Karting) – One of the most competitive European karting series, many of the same drivers you see in CIK-FIA events also compete here. Races are held in Italy, as Italy is the home to most of the manufacturers that produce karting related products.",
            "Champions of the Future – A high-level preparatory series for drivers competing in OK, OK-J, KZ, and KZ2.",
            "Rotax Euro Trophy – A premier international competition for Rotax-powered karts. You can call this the European championship for Rotax. Before 2018, it was known as the Rotax Max Euro Challenge.",
            "RMC (Rotax MAX Challenge) – A global karting series that includes national and regional championships. The Rotax MAX Challenge Grand Finals is the most prestigious event, where the best drivers from around the world compete. To participate in the Grand Finals, drivers must get a ticket by finishing in a top position in a Rotax championship. At the event, all participants in a category receive identical equipment, ensuring fair competition where driver skill (and luck) is the determining factor. Some international Rotax championships are the following: RMC Euro Trophy, RMC International Trophy, RMC BNL, RMC CEE. There are also many national championships.",
            "IAME Series – Similar to the Rotax MAX Challenge, but for IAME engines. IAME drivers also have a world final event, called IAME Warrior Final (IWF), where the best drivers from around the world compete. The concept is different from Rotax, as the IWF is an open event, meaning that anyone can participate, regardless of their performance in a national championship. Here you won't find identical equipment for all drivers, they can use their own equipment. IAME has many national and regional championships, but probably some of the strongest ones are the IAME Euro Series and the IAME Series Benelux. There are also many other national championships.",
            "Vortex ROK Cup – A series for Vortex ROK engines, with national and international championships. The Vortex ROK Cup Superfinal is the most prestigious event, where the best ROK drivers from around the world compete.",
          ],
        },
        {
          type: "image",
          src: "/images/fia-academy.jpg",
          alt: "CIK-FIA Karting Academy Trophy",
          caption:
            "Before the start of a CIK-FIA Academy Trophy race (Photo FIA Karting/KSP)",
        },
      ],
    },
    {
      id: "kart-components",
      title: "Kart Components",
      paragraphs: [
        {
          type: "text",
          value:
            "A go-kart consists of several components that work together to create a complete racing machine. Understanding these components is essential for drivers, mechanics, and engineers to optimize performance and ensure safety. Here are some of the key components found on a typical kart:",
        },
        {
          type: "text-list",
          value: [
            "Chassis – The frame of the kart that holds all other components together. Some of the most popular manufacturers are OTK (Tony Kart, Kosmic, Exprit, Redspeed), Birel ART, CRG, Kart Republic and Sodi.",
            "Axle – A metal rod that connects the rear wheels and provides stability and control. They are made in different stiffnesses to adjust the kart's handling.",
            "Wheels – The rubber tires mounted on rims that allow the kart to move and provide traction. They come in various compounds and sizes for different track conditions.",
            "Engine – The power unit that drives the kart. It can be 2-stroke or 4-stroke, depending on the category. The mentioned categories on this page use 2-stroke engines.",
            "Exhaust – The system that removes exhaust gases from the engine and affects performance.",
            "Bodywork – The plastic or fiberglass panels that cover the kart and protect the driver. They also have some aerodynamic effects, but this provides a minor advantage if any. In general, the faster you go, the more important aerodynamics become.",
            "Steering System – The mechanism that allows the driver to turn the front wheels.",
            "Brakes – The system that slows down the kart, usually consisting of disc brakes. Usually, only the rear wheels have brakes, but some karts also have front brakes.",
            "Seat – The component where the driver sits and is crucial for weight distribution and comfort. Seats are available in different sizes and stiffnesses. Stiffness can affect the kart's handling.",
            "Fuel Tank – The container that holds the fuel for the engine. It is located between the driver's legs.",
            "Safety Equipment – Helmets, suits, gloves, rib protectors and other gear that protect the driver. If you really don't know where to spend your money, just paint your helmet.",
          ],
        },
        {
          type: "image",
          src: "/images/tony-kart.jpg",
          alt: "Tony Kart",
          caption:
            "A 2025 Tony Kart chassis with a Vortex OK engine (Photo Tony Kart)",
        },
      ],
    },
  ],
} as WikiContent;

export default data;
