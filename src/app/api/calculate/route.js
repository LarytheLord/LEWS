// src/app/api/calculate/route.js
import { detailedTrajectories } from '../../../data/detailedTrajectories';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const inputs = await request.json();
    
    // Calculate lock-in score based on 9 dimensions (LEWS framework)
    const {
      regulatoryCapture = 0,
      infrastructureHardening = 0,
      supplyChainStandardization = 0,
      corporateConsolidation = 0,
      pathDependency = 0,
      aiAutomationEmbedding = 0,
      internationalExpansion = 0,
      slaughterInertia = 0,
      breedingLockIn = 0
    } = inputs;

    // Simple weighted average (equal weights for MVP) across 9 dimensions
    const score = Math.round((regulatoryCapture + infrastructureHardening + supplyChainStandardization + 
                corporateConsolidation + pathDependency + aiAutomationEmbedding + 
                internationalExpansion + slaughterInertia + breedingLockIn) / 9);

    // Determine stage based on score
    let stage;
    if (score <= 25) stage = "Early Research";
    else if (score <= 45) stage = "Early Commercialization";
    else if (score <= 70) stage = "Scaling";
    else if (score <= 85) stage = "Infrastructure Building";
    else stage = "Lock-in/Regulatory Capture";

    // Determine intervention window based on score
    let interventionWindow;
    if (score <= 45) interventionWindow = "Monitor";
    else if (score <= 65) interventionWindow = "Act Soon";
    else interventionWindow = "Act Now";

    // Find closest historical match in factory farming trajectory (using chickens as baseline)
    const factoryFarmingData = detailedTrajectories.chickens.trajectories.factoryFarming || {
      trajectory: [
        { year: 1923, score: 5, stage: "Early Research" },
        { year: 1930, score: 12, stage: "Early Research" },
        { year: 1935, score: 22, stage: "Early Commercialization" },
        { year: 1940, score: 32, stage: "Early Commercialization" },
        { year: 1945, score: 45, stage: "Scaling" },
        { year: 1950, score: 60, stage: "Scaling" },
        { year: 1955, score: 72, stage: "Infrastructure Building" },
        { year: 1960, score: 92, stage: "Regulatory Capture" },
        { year: 1965, score: 97, stage: "Locked In" }
      ]
    };

    let closest = null;
    let minDiff = Infinity;

    for (const point of factoryFarmingData.trajectory) {
      const diff = Math.abs(point.score - score);
      if (diff < minDiff) {
        minDiff = diff;
        closest = point;
      }
    }

    const historicalMatch = closest || { year: null, score: null, stage: null };

    const result = {
      score,
      stage,
      interventionWindow,
      historicalMatch,
      message: `Current score ${score} indicates ${stage} phase with ${interventionWindow} window`,
      dimensions: {
        regulatoryCapture,
        infrastructureHardening,
        supplyChainStandardization,
        corporateConsolidation,
        pathDependency,
        aiAutomationEmbedding,
        internationalExpansion,
        slaughterInertia,
        breedingLockIn
      }
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in /calculate:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}