// src/app/api/trajectory/route.js
import { detailedTrajectories } from '../../../data/detailedTrajectories';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tech = searchParams.get('tech') || 'factoryFarming';
  const species = searchParams.get('species') || 'chickens';
  
  const speciesData = detailedTrajectories[species];
  
  if (!speciesData) {
    return new Response(JSON.stringify({ error: `Species data not found for ${species}` }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const trajectoryData = speciesData.trajectories[tech];
  
  if (!trajectoryData) {
    return new Response(JSON.stringify({ error: `Trajectory data not found for ${tech} in ${species}` }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify(trajectoryData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}