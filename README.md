# LEWS - Lock-in Early Warning System

A comprehensive tool that detects when emerging animal-related technologies are approaching lock-in using early-warning signals inspired by historical patterns across 9 key dimensions.

## Overview

The Lock-in Early Warning System (LEWS) is designed to identify when animal-related technologies are approaching a "lock-in" point where they become difficult to change or reverse. The system uses historical patterns from technologies like factory farming to identify critical intervention windows for emerging technologies like insect farming, AI shrimp systems, and wildlife automation.

### 9 Key Lock-in Dimensions

The LEWS framework measures lock-in across 9 dimensions:

1. **Regulatory Capture**: How deeply embedded in policy and regulation
2. **Infrastructure Hardening**: Physical infrastructure purpose-built for the system
3. **Supply Chain Standardization**: How standardized and optimized the supply chains are
4. **Corporate Consolidation**: Degree of corporate control and concentration
5. **Path Dependency**: How interconnected and self-reinforcing the system is
6. **AI/Automation Embedding**: Integration of modern technology into the system
7. **International Expansion**: Global spread and harmonization of the system
8. **Slaughter/Processing Inertia**: Sunk costs in processing infrastructure
9. **Breeding/Genetics Lock-in**: Dependence on specialized genetic lines

## Features

- Interactive assessment tool with 9 lock-in dimension sliders
- Real-time lock-in score calculation (0-100)
- Development stage classification (Research → Scaling → Lock-in)
- Intervention window recommendations (Monitor/Act Soon/Act Now)
- Historical trajectory comparison to chicken industrial farming baseline
- 11 comprehensive technology example presets
- Animated background visualization

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

## API Endpoints

- `POST /api/calculate` - Calculate lock-in score based on 9 inputs
- `GET /api/trajectory?tech=:techName&species=:speciesName` - Get historical trajectory data

## Deployment

The application is ready for deployment on Vercel or similar platforms. The build system is configured for static export.

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