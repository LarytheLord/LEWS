# LEWS - Lock-in Early Warning System

A comprehensive tool that detects when emerging animal-related technologies are approaching lock-in using early-warning signals inspired by historical patterns across 9 key dimensions.

## Overview

The Lock-in Early Warning System (LEWS) is designed to identify when animal-related technologies are approaching a "lock-in" point where they become difficult to change or reverse. The system uses historical patterns from technologies like factory farming to identify critical intervention windows for emerging technologies like insect farming, AI shrimp systems, and wildlife automation.

### 9 Key Lock-in Dimensions (Updated Variable Names)

The LEWS framework measures lock-in across 9 dimensions with simplified, intuitive variable names:

1. **Uncertainty**: How much uncertainty exists around the technology
2. **# Animals**: Scale of animals affected by the technology
3. **Can They Feel?**: Evidence for animal sentience/welfare considerations
4. **Suffering**: Intensity of potential suffering caused by the technology
5. **Growth**: Rate of growth and adoption of the technology
6. **Support**: Level of advocacy and support for the technology
7. **Path Dependence**: How entrenched the system becomes over time
8. **Regulatory Capture**: Degree of embedment in policy and regulation
9. **Infrastructure Hardening**: Physical infrastructure purpose-built for the system

## Features

- Interactive assessment tool with 9 lock-in dimension sliders (simple inputs → score)
- Real-time lock-in score calculation (0-100)
- Visual risk assessment with clear intervention windows
- Time until lock-in predictions based on trajectory analysis
- Historical trajectory comparison to chicken industrial farming baseline
- Multiple technology example presets (Battery Cages 🐔, AI Aquaculture 🦐, Insect Farms 🦗)
- Animated background visualization
- Detailed key metrics display (animals affected, suffering hours, intervention windows)

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Chart.js for data visualization
- OGL for 3D graphics
- Tailwind CSS for styling

## Project Structure

```
lews-mvp/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/             # API routes
│   │   │   ├── calculate/   # Score calculation endpoint
│   │   │   └── trajectory/  # Historical data endpoint
│   │   ├── components/      # React components
│   │   ├── page.js          # Main application page
│   │   └── layout.js        # Root layout
│   ├── data/                # Historical trajectory data
│   │   └── detailedTrajectories.js  # Technology data
│   └── app/                 # Additional app files
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lews-mvp
```

2. Install dependencies:
```bash
npm install
```

### Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create a production build:

```bash
npm run build
```

## UI Layout

```
┌───────────────────────────────────────────────────────────────┐
│ 🚨 LEWS – Lock-in Early Warning System                        │
│ A quick risk check for emerging animal-farming technologies.  │
├───────────────────────────────────────────────────────────────┤

   Choose a system:
      [ Battery Cages 🐔 ]   [ AI Aquaculture 🦐 ]   [ Insect Farms 🦗 ]

┌───────────────────────────────┐   		┌───────────────────────────┐
│          RISK INPUTS          │   │                           │
│     (simple inputs → score)   │   │    ASSESSMENT RESULTS     │
│                               │   │                           │
│ ❓ Uncertainty                 │   │   					🔥 Lock-in Risk Score    │
│ Low [════●══════════════════] High │ │         		72 / 100          │
│   ±30 points                  │   │                           │
│                               │   │   					⏰ Time Until Lock-in      │
│ 🔢 # Animals                  │   │      		  ~5–8 years          │
│ Low [══════●═══════════════] High│ │                           │
│   440B/yr • ↑ 8%/yr          │   │   🚨 Intervention Window     	│
│                               │   │         	ACT SOON            │
│ 🧠 Can They Feel?             │   │                           │
│  0% [══════●════════════════] 100%│ │   Range: 58 – 86            │
│   60% • Medium evidence       │   │   ███████████████░░░░░░░░   │
│                               │   │                           │
│ 💔 Suffering                  │   │   Key Metrics               │
│ Low [══════●═══════════════] High│ │  		 • 264B animals/year      │
│   4,701 hours lifetime pain   │   │   • 1.24T hours suffering    │
│                               │   │   • 0 orgs today            │
│ 📈 Growth                     │   │   • Lock-in ~5–8 years       │
│ Slow [══════●═══════════════] Fast│ │                           │
│   $400M • multi-country       │   │ [ View Trajectory ]         │
│                                │   │ [ Download ] [ Share ]      │
│ 🧩 Support                 │   └───────────────────────────┘
│ Strong [●════════════════════] Weak│
│   Near-zero advocacy          │
│                                │
│ 🔗 Path Dependence            │
│ Low [══════●═══════════════] High │
│   System becoming entrenched  │
└───────────────────────────────┘
```

## API Endpoints

- `POST /api/calculate` - Calculate lock-in score based on 9 inputs
- `GET /api/trajectory?tech=:techName&species=:speciesName` - Get historical trajectory data

## Data Sources

The system uses comprehensive data for multiple species:
- Chicken industrial farming (baseline for comparison)
- Fish industrial farming
- Insect industrial farming
- Shrimp industrial farming

Each species has detailed trajectory data showing evolution from early research to lock-in.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Uses OGL for WebGL graphics
- Chart.js for data visualization
- Next.js framework for the application
- Based on research from the LEWS team
- Updated UI based on LEWS Minimal UI (Updated) specifications