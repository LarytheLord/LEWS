// src/app/api/calculate/route.js
import { detailedTrajectories } from '../../../data/detailedTrajectories';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const inputs = await request.json();
    
    // Calculate lock-in score based on 7 dimensions from LEWS master document
    const {
      uncertainty = 0,
      animals = 0,
      canTheyFeel = 0,
      suffering = 0,
      growth = 0,
      support = 0,
      pathDependence = 0
    } = inputs;

    // Apply the formula from the LEWS master document:
    // risk_score = 0.30 * scale_norm + 0.20 * suffering_norm + 0.15 * sentience_norm + 
    //              0.20 * momentum_norm + 0.10 * advocacy_gap_norm + 0.05 * time_to_lockin_norm
    
    // For the 7 dimensions: animals (~population scale), suffering, canTheyFeel (~sentience), 
    // growth (~momentum), support (~advocacy gap), pathDependence, uncertainty
    const normalizedUncertainty = uncertainty / 100.0; // Convert to 0-1 range
    const normalizedAnimals = animals / 100.0;
    const normalizedCanTheyFeel = canTheyFeel / 100.0;
    const normalizedSuffering = suffering / 100.0;
    const normalizedGrowth = growth / 100.0;
    const normalizedSupport = support / 100.0;
    const normalizedPathDependence = pathDependence / 100.0;

    // Weighted calculation following the model from the master document
    const score = Math.round(
      0.30 * normalizedAnimals * 100 +      // animals (population scale)
      0.20 * normalizedSuffering * 100 +   // suffering
      0.15 * normalizedCanTheyFeel * 100 + // can they feel (sentience)
      0.20 * normalizedGrowth * 100 +      // growth (momentum)
      0.10 * (100 - normalizedSupport * 100) + // support (inverse of advocacy gap - less support = higher risk)
      0.05 * normalizedPathDependence * 100 // path dependence
    );

    // Apply uncertainty to create range
    const uncertaintyFactor = normalizedUncertainty * 0.5; // Max ±50% at highest uncertainty
    const lowerBound = Math.max(0, score - Math.round(score * uncertaintyFactor));
    const upperBound = Math.min(100, score + Math.round(score * uncertaintyFactor));

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

    // Calculate time until lock-in based on trajectory
    let timeUntilLockin = "Unknown";
    if (closest && closest.year) {
      const currentYear = new Date().getFullYear();
      const yearsToMatch = closest.year - currentYear + (score < closest.score ? 5 : -5); // Rough estimate
      if (yearsToMatch > 0) {
        timeUntilLockin = `~${yearsToMatch} years`;
      } else {
        timeUntilLockin = "Passed";
      }
    }

    // Calculate key metrics
    const totalAnimals = Math.round(normalizedAnimals * 1000); // Billions of animals
    const totalSuffering = Math.round(normalizedSuffering * normalizedAnimals * 10000) / 10; // Thousands of hours of suffering

    const result = {
      score,
      range: [lowerBound, upperBound],
      stage,
      interventionWindow,
      timeUntilLockin,
      historicalMatch,
      keyMetrics: {
        animalsAffected: `${totalAnimals}B animals/year`,
        sufferingHours: `${totalSuffering}T hours`,
        advocacyOrgs: Math.max(0, 100 - support), // Approximate advocacy level
        expectedLockIn: timeUntilLockin
      },
      message: `Current score ${score} (${lowerBound}-${upperBound}) indicates ${stage} phase with ${interventionWindow} window`,
      dimensions: {
        uncertainty,
        animals,
        canTheyFeel,
        suffering,
        growth,
        support,
        pathDependence
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