// src/data/trajectories.js
export const trajectories = {
  factoryFarming: {
    technology: "Factory farming – battery cage egg production",
    description: "Historical baseline for industrial egg production using battery cages in the US/Europe.",
    trajectory: [
      {
        "year": 1923,
        "score": 5,
        "stage": "Early Research",
        "milestone": "Early patents and experimental cage systems discussed in poultry engineering.",
        "uncertainty": "high"
      },
      {
        "year": 1930,
        "score": 12,
        "stage": "Early Research",
        "milestone": "Small-scale trials of intensive housing and 'battery brooding' ideas.",
        "uncertainty": "high"
      },
      {
        "year": 1935,
        "score": 22,
        "stage": "Early Commercialization",
        "milestone": "Experiment station work and early commercial adoption in a few regions.",
        "uncertainty": "medium"
      },
      {
        "year": 1940,
        "score": 32,
        "stage": "Early Commercialization",
        "milestone": "Commercial producers begin scaling cage systems; industry interest grows.",
        "uncertainty": "medium"
      },
      {
        "year": 1945,
        "score": 45,
        "stage": "Scaling",
        "milestone": "Post-war expansion: more barns converted, companies specialize in cage equipment.",
        "uncertainty": "medium"
      },
      {
        "year": 1950,
        "score": 60,
        "stage": "Scaling",
        "milestone": "Battery cages become common in major egg-producing regions.",
        "uncertainty": "medium"
      },
      {
        "year": 1955,
        "score": 72,
        "stage": "Infrastructure Building",
        "milestone": "Large-scale capital investments, standardized cage designs, dedicated supply chains.",
        "uncertainty": "low"
      },
      {
        "year": 1960,
        "score": 92,
        "stage": "Regulatory Capture",
        "milestone": "Industrial systems dominate; policy, subsidies, and norms favour cage production.",
        "uncertainty": "low"
      },
      {
        "year": 1965,
        "score": 97,
        "stage": "Locked In",
        "milestone": "Battery cages are the default global template for egg production.",
        "uncertainty": "low"
      }
    ]
  },
  insectFarming: {
    technology: "Insect farming – feed and food",
    description: "Industrial production of insects (e.g. BSF, mealworms, crickets) for animal feed and human food.",
    trajectory: [
      {
        "year": 2010,
        "score": 10,
        "stage": "Early Research",
        "milestone": "Early R&D, small startups experimenting with mealworms and BSF larvae.",
        "uncertainty": "high"
      },
      {
        "year": 2015,
        "score": 25,
        "stage": "Early Commercialization",
        "milestone": "First commercial-scale plants open; insects marketed as sustainable protein.",
        "uncertainty": "medium"
      },
      {
        "year": 2020,
        "score": 45,
        "stage": "Scaling",
        "milestone": "Multiple companies across Europe and elsewhere; increasing VC investment.",
        "uncertainty": "medium"
      },
      {
        "year": 2022,
        "score": 55,
        "stage": "Scaling",
        "milestone": "EU and national-level approvals expand for feed; more species permitted.",
        "uncertainty": "medium"
      },
      {
        "year": 2024,
        "score": 65,
        "stage": "Infrastructure Building",
        "milestone": "Large factories operating in multiple countries; supply chains forming with major feed companies.",
        "uncertainty": "medium"
      },
      {
        "year": 2025,
        "score": 68,
        "stage": "Infrastructure Building",
        "milestone": "Industry consolidation, higher total investment, and growing political/industry support.",
        "uncertainty": "medium"
      }
    ]
  },
  aiShrimp: {
    technology: "AI shrimp aquaculture systems",
    description: "AI-driven shrimp farming tools (auto-feeding, biomass estimation, disease prediction, farm management software).",
    trajectory: [
      {
        "year": 2020,
        "score": 15,
        "stage": "Early Research",
        "milestone": "Pilot projects and early AI tools in shrimp ponds (e.g. basic sensors and dashboards).",
        "uncertainty": "high"
      },
      {
        "year": 2021,
        "score": 22,
        "stage": "Early Commercialization",
        "milestone": "Startups roll out commercial products in a small number of countries.",
        "uncertainty": "medium"
      },
      {
        "year": 2022,
        "score": 30,
        "stage": "Early Commercialization",
        "milestone": "VC funding grows; integration with feed and input suppliers begins.",
        "uncertainty": "medium"
      },
      {
        "year": 2023,
        "score": 36,
        "stage": "Scaling",
        "milestone": "Tens of thousands of ponds/farms onboard for some platforms; multiple countries.",
        "uncertainty": "medium"
      },
      {
        "year": 2024,
        "score": 42,
        "stage": "Scaling",
        "milestone": "Ecosystem of partners (financing, insurance, advisory) develops around AI platforms.",
        "uncertainty": "medium"
      }
    ]
  },
  wildlifeAI: {
    technology: "Wildlife automation & AI management",
    description: "Automated systems for detecting, tracking, and managing wild animals (e.g. drone contraception, culling, surveillance).",
    trajectory: [
      {
        "year": 2018,
        "score": 8,
        "stage": "Early Research",
        "milestone": "Early pilots using drones and computer vision to monitor wildlife populations.",
        "uncertainty": "high"
      },
      {
        "year": 2020,
        "score": 12,
        "stage": "Early Research",
        "milestone": "More research projects; small-scale deployments for invasive species management.",
        "uncertainty": "high"
      },
      {
        "year": 2022,
        "score": 18,
        "stage": "Early Commercialization",
        "milestone": "Government agencies begin trial contracts; NGOs test tools in limited areas.",
        "uncertainty": "medium"
      },
      {
        "year": 2024,
        "score": 24,
        "stage": "Early Commercialization",
        "milestone": "Multiple national or regional pilots; still fragmented but growing interest.",
        "uncertainty": "medium"
      }
    ]
  }
};