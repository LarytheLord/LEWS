// src/app/page.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import PrismaticBurst from './components/PrismaticBurst';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [inputs, setInputs] = useState({
    regulatoryCapture: 50,
    infrastructureHardening: 50,
    supplyChainStandardization: 50,
    corporateConsolidation: 50,
    pathDependency: 50,
    aiAutomationEmbedding: 50,
    internationalExpansion: 50,
    slaughterInertia: 50,
    breedingLockIn: 50
  });

  const [result, setResult] = useState(null);
  const [trajectories, setTrajectories] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTrajectoryData();
  }, []);

  useEffect(() => {
    if (trajectories) {
      calculateScore();
    }
  }, [inputs, trajectories]);

  const fetchTrajectoryData = async () => {
    try {
      const response = await fetch('/api/trajectory?tech=factoryFarming');
      const data = await response.json();
      setTrajectories({
        factoryFarming: data
      });
    } catch (error) {
      console.error('Error fetching trajectory data:', error);
    }
  };

  const calculateScore = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error calculating score:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSliderChange = useCallback((name, value) => {
    setInputs(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  }, []);

  const chartData = {
    labels: trajectories?.factoryFarming?.trajectory?.map(item => item.year) || [],
    datasets: [
      {
        label: 'Chicken Industrial Farming Baseline',
        data: trajectories?.factoryFarming?.trajectory?.map(item => item.score) || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.4
      },
      result && {
        label: 'Current Assessment',
        data: Array(trajectories?.factoryFarming?.trajectory?.length || 0).fill(null),
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
        // Add a point at the historical match year
        data: trajectories?.factoryFarming?.trajectory?.map(item => 
          item.year === result.historicalMatch.year ? result.score : null
        ) || []
      }
    ].filter(Boolean)
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Technology Trajectory Comparison',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Lock-in Score'
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      }
    }
  };

  const getStageColor = (stage) => {
    if (!stage) return 'gray';
    if (stage.includes('Research') || stage.includes('Commercialization')) return 'green';
    if (stage.includes('Scaling')) return 'yellow';
    if (stage.includes('Building')) return 'orange';
    return 'red';
  };

  const getInterventionColor = (window) => {
    if (!window) return 'gray';
    if (window === 'Monitor') return 'green';
    if (window === 'Act Soon') return 'yellow';
    return 'red';
  };

  // Lock-in dimensions with descriptions
  const lockInDimensions = {
    regulatoryCapture: { label: "Regulatory Capture", description: "How deeply the system is embedded in policy and regulation" },
    infrastructureHardening: { label: "Infrastructure Hardening", description: "Physical infrastructure purpose-built for the system" },
    supplyChainStandardization: { label: "Supply Chain Standardization", description: "How standardized and optimized the supply chains are" },
    corporateConsolidation: { label: "Corporate Consolidation", description: "Degree of corporate control and concentration" },
    pathDependency: { label: "Path Dependency", description: "How interconnected and self-reinforcing the system is" },
    aiAutomationEmbedding: { label: "AI/Automation Embedding", description: "Integration of modern technology into the system" },
    internationalExpansion: { label: "International Expansion", description: "Global spread and harmonization of the system" },
    slaughterInertia: { label: "Slaughter/Processing Inertia", description: "Sunk costs in processing infrastructure" },
    breedingLockIn: { label: "Breeding/Genetics Lock-in", description: "Dependence on specialized genetic lines" }
  };

  // More comprehensive preset examples
  const presetExamples = [
    {
      name: "Insect Farming 2024",
      values: {
        regulatoryCapture: 65,
        infrastructureHardening: 70,
        supplyChainStandardization: 60,
        corporateConsolidation: 75,
        pathDependency: 65,
        aiAutomationEmbedding: 45,
        internationalExpansion: 70,
        slaughterInertia: 60,
        breedingLockIn: 65
      }
    },
    {
      name: "AI Shrimp 2020",
      values: {
        regulatoryCapture: 15,
        infrastructureHardening: 20,
        supplyChainStandardization: 10,
        corporateConsolidation: 25,
        pathDependency: 15,
        aiAutomationEmbedding: 30,
        internationalExpansion: 15,
        slaughterInertia: 10,
        breedingLockIn: 12
      }
    },
    {
      name: "Wildlife AI 2018",
      values: {
        regulatoryCapture: 5,
        infrastructureHardening: 8,
        supplyChainStandardization: 3,
        corporateConsolidation: 10,
        pathDependency: 5,
        aiAutomationEmbedding: 15,
        internationalExpansion: 8,
        slaughterInertia: 3,
        breedingLockIn: 4
      }
    },
    {
      name: "Lab-Grown Meat 2024",
      values: {
        regulatoryCapture: 25,
        infrastructureHardening: 15,
        supplyChainStandardization: 10,
        corporateConsolidation: 30,
        pathDependency: 20,
        aiAutomationEmbedding: 10,
        internationalExpansion: 25,
        slaughterInertia: 5,
        breedingLockIn: 5
      }
    },
    {
      name: "Precision Fermentation 2025",
      values: {
        regulatoryCapture: 30,
        infrastructureHardening: 25,
        supplyChainStandardization: 20,
        corporateConsolidation: 40,
        pathDependency: 30,
        aiAutomationEmbedding: 25,
        internationalExpansion: 40,
        slaughterInertia: 10,
        breedingLockIn: 0
      }
    },
    {
      name: "Cultured Leather 2024",
      values: {
        regulatoryCapture: 20,
        infrastructureHardening: 10,
        supplyChainStandardization: 15,
        corporateConsolidation: 35,
        pathDependency: 25,
        aiAutomationEmbedding: 20,
        internationalExpansion: 20,
        slaughterInertia: 10,
        breedingLockIn: 0
      }
    },
    {
      name: "Automated Dairy 2023",
      values: {
        regulatoryCapture: 70,
        infrastructureHardening: 65,
        supplyChainStandardization: 75,
        corporateConsolidation: 70,
        pathDependency: 80,
        aiAutomationEmbedding: 35,
        internationalExpansion: 60,
        slaughterInertia: 65,
        breedingLockIn: 70
      }
    },
    {
      name: "Vertical Aquaculture 2024",
      values: {
        regulatoryCapture: 40,
        infrastructureHardening: 45,
        supplyChainStandardization: 35,
        corporateConsolidation: 50,
        pathDependency: 40,
        aiAutomationEmbedding: 45,
        internationalExpansion: 30,
        slaughterInertia: 20,
        breedingLockIn: 15
      }
    },
    {
      name: "Chicken Industry (Baseline)",
      values: {
        regulatoryCapture: 90,
        infrastructureHardening: 95,
        supplyChainStandardization: 90,
        corporateConsolidation: 85,
        pathDependency: 95,
        aiAutomationEmbedding: 60,
        internationalExpansion: 85,
        slaughterInertia: 90,
        breedingLockIn: 95
      }
    },
    {
      name: "Early Research Tech",
      values: {
        regulatoryCapture: 5,
        infrastructureHardening: 5,
        supplyChainStandardization: 5,
        corporateConsolidation: 10,
        pathDependency: 5,
        aiAutomationEmbedding: 5,
        internationalExpansion: 5,
        slaughterInertia: 2,
        breedingLockIn: 2
      }
    },
    {
      name: "Reset to Middle",
      values: {
        regulatoryCapture: 50,
        infrastructureHardening: 50,
        supplyChainStandardization: 50,
        corporateConsolidation: 50,
        pathDependency: 50,
        aiAutomationEmbedding: 50,
        internationalExpansion: 50,
        slaughterInertia: 50,
        breedingLockIn: 50
      }
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem 0', 
      position: 'relative', 
      overflow: 'hidden', 
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Prismatic Burst Background Effect */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0 
      }}>
        <PrismaticBurst 
          intensity={0.8}
          speed={0.15}
          animationType="rotate3d"
          colors={['#667eea', '#764ba2', '#ffffff']}
          distort={0.2}
          rayCount={8}
          mixBlendMode="screen"
        />
      </div>
      
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 1rem' 
      }}>
        <header style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '1rem' 
          }}>
            LEWS - Lock-in Early Warning System
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'white', 
            maxWidth: '48rem', 
            margin: '0 auto' 
          }}>
            A comprehensive tool that detects when emerging animal-related technologies are approaching lock-in 
            using early-warning signals inspired by historical patterns across 9 key dimensions.
          </p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '2rem', 
          marginBottom: '2rem' 
        }}>
          {/* Input Section - 9 Lock-in Dimensions */}
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.85)', 
            padding: '1.5rem', 
            borderRadius: '0.5rem', 
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)', 
            backdropFilter: 'blur(4px)', 
            border: '1px solid rgba(255, 255, 255, 0.3)',
            maxHeight: '700px',
            overflowY: 'auto'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '1.5rem', 
              color: '#1e293b',
              position: 'sticky',
              top: 0,
              background: 'rgba(255, 255, 255, 0.85)',
              padding: '0.5rem 0',
              zIndex: 20
            }}>
              Lock-in Assessment
            </h2>
            
            <div style={{ paddingBottom: '1rem' }}>
              {Object.entries(inputs).map(([key, value]) => (
                <div key={key} style={{ marginBottom: '1.2rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '0.5rem',
                    alignItems: 'center'
                  }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ 
                        fontWeight: '600', 
                        color: '#374151', 
                        display: 'block',
                        fontSize: '0.9rem'
                      }}>
                        {lockInDimensions[key]?.label || key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <small style={{ 
                        color: '#64748b', 
                        fontSize: '0.75rem',
                        display: 'block',
                        lineHeight: 1.3
                      }}>
                        {lockInDimensions[key]?.description}
                      </small>
                    </div>
                    <span style={{ 
                      color: '#6b7280', 
                      fontWeight: '600', 
                      fontSize: '1rem', 
                      minWidth: '40px', 
                      textAlign: 'right',
                      marginLeft: '1rem'
                    }}>
                      {value}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => handleSliderChange(key, e.target.value)}
                    style={{ 
                      width: '100%', 
                      height: '0.5rem', 
                      backgroundColor: '#e2e8f0', 
                      borderRadius: '0.5rem', 
                      appearance: 'none', 
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  />
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '0.7rem', 
                    color: '#9ca3af', 
                    marginTop: '0.25rem' 
                  }}>
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={calculateScore}
              disabled={loading}
              style={{ 
                width: '100%', 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                fontWeight: '600', 
                border: 'none', 
                cursor: loading ? 'not-allowed' : 'pointer', 
                opacity: loading ? 0.7 : 1, 
                fontSize: '1rem', 
                marginTop: '1rem',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#3b82f6')}
            >
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px'
                  }}></div>
                  Calculating Lock-in Score...
                </div>
              ) : 'Calculate Lock-in Score'}
            </button>
          </div>

          {/* Results Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Score Display */}
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.85)', 
              padding: '1.5rem', 
              borderRadius: '0.5rem', 
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)', 
              backdropFilter: 'blur(4px)', 
              border: '1px solid rgba(255, 255, 255, 0.3)' 
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                marginBottom: '1rem', 
                color: '#1e293b' 
              }}>
                Assessment Results
              </h2>
              
              {result && !loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '3rem', 
                      fontWeight: 'bold', 
                      color: '#1e293b',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {result.score}/100
                    </div>
                    <div style={{ 
                      marginTop: '0.5rem', 
                      fontSize: '0.875rem', 
                      color: '#64748b' 
                    }}>
                      Overall Lock-in Score
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <h3 style={{ fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Development Stage</h3>
                      <div 
                        style={{ 
                          fontSize: '1.125rem', 
                          fontWeight: '600', 
                          padding: '0.75rem', 
                          borderRadius: '0.5rem', 
                          textAlign: 'center',
                          backgroundColor: getStageColor(result.stage) === 'green' ? 'rgba(16, 185, 129, 0.2)' : 
                                          getStageColor(result.stage) === 'yellow' ? 'rgba(234, 179, 8, 0.2)' : 
                                          getStageColor(result.stage) === 'orange' ? 'rgba(249, 115, 22, 0.2)' : 
                                          'rgba(239, 68, 68, 0.2)',
                          color: getStageColor(result.stage) === 'green' ? '#065f46' : 
                                 getStageColor(result.stage) === 'yellow' ? '#713f12' : 
                                 getStageColor(result.stage) === 'orange' ? '#7c2d12' : 
                                 '#7f1d1d',
                          border: getStageColor(result.stage) === 'green' ? '1px solid rgba(16, 185, 129, 0.3)' : 
                                   getStageColor(result.stage) === 'yellow' ? '1px solid rgba(234, 179, 8, 0.3)' : 
                                   getStageColor(result.stage) === 'orange' ? '1px solid rgba(249, 115, 22, 0.3)' : 
                                   '1px solid rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        {result.stage}
                      </div>
                    </div>
                    
                    <div>
                      <h3 style={{ fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Intervention Window</h3>
                      <div 
                        style={{ 
                          fontSize: '1.125rem', 
                          fontWeight: '600', 
                          padding: '0.75rem', 
                          borderRadius: '0.5rem', 
                          textAlign: 'center',
                          backgroundColor: getInterventionColor(result.interventionWindow) === 'green' ? 'rgba(16, 185, 129, 0.2)' : 
                                          getInterventionColor(result.interventionWindow) === 'yellow' ? 'rgba(234, 179, 8, 0.2)' : 
                                          'rgba(239, 68, 68, 0.2)',
                          color: getInterventionColor(result.interventionWindow) === 'green' ? '#065f46' : 
                                 getInterventionColor(result.interventionWindow) === 'yellow' ? '#713f12' : 
                                 '#7f1d1d',
                          border: getInterventionColor(result.interventionWindow) === 'green' ? '1px solid rgba(16, 185, 129, 0.3)' : 
                                   getInterventionColor(result.interventionWindow) === 'yellow' ? '1px solid rgba(234, 179, 8, 0.3)' : 
                                   '1px solid rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        {result.interventionWindow}
                      </div>
                    </div>
                  </div>
                  
                  {result.historicalMatch.year && (
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                      <h3 style={{ fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Historical Comparison</h3>
                      <p style={{ color: '#1e293b', fontWeight: '500' }}>
                        Current score {result.score} ≈ Chicken industrial farming in <span style={{ fontWeight: '700', color: '#7c3aed' }}>{result.historicalMatch.year}</span>
                      </p>
                      <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                        This suggests the technology is at a similar development stage as chicken farming was in {result.historicalMatch.year}.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ 
                  color: '#94a3b8', 
                  textAlign: 'center', 
                  padding: '1rem', 
                  fontStyle: 'italic',
                  minHeight: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {loading ? 'Calculating assessment...' : 'Adjust the sliders to see assessment results'}
                </p>
              )}
            </div>

            {/* Example Presets - Scrollable grid */}
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.85)', 
              padding: '1.5rem', 
              borderRadius: '0.5rem', 
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)', 
              backdropFilter: 'blur(4px)', 
              border: '1px solid rgba(255, 255, 255, 0.3)',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem', 
                color: '#1e293b' 
              }}>
                Assessment Presets
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                gap: '0.5rem' 
              }}>
                {presetExamples.map((preset, index) => (
                  <button 
                    key={index}
                    onClick={() => setInputs(preset.values)}
                    style={{ 
                      backgroundColor: '#e2e8f0', 
                      color: '#334155', 
                      padding: '0.5rem', 
                      borderRadius: '0.5rem', 
                      border: '1px solid #cbd5e1', 
                      cursor: 'pointer', 
                      fontWeight: '500', 
                      transition: 'all 0.2s',
                      fontSize: '0.8rem',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#cbd5e1';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#e2e8f0';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trajectory Chart */}
        {trajectories && (
          <div style={{ 
            marginTop: '2rem', 
            backgroundColor: 'rgba(255, 255, 255, 0.85)', 
            padding: '1.5rem', 
            borderRadius: '0.5rem', 
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)', 
            backdropFilter: 'blur(4px)', 
            border: '1px solid rgba(255, 255, 255, 0.3)' 
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '1rem', 
              color: '#1e293b' 
            }}>
              Historical Trajectory Comparison
            </h2>
            <div style={{ height: '20rem' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#64748b', 
              marginTop: '1rem' 
            }}>
              This chart shows where the current technology stands compared to the historical trajectory of chicken industrial farming. 
              The red dot represents the current assessment score mapped to the historical timeline.
            </p>
          </div>
        )}
      </div>

      {/* Add CSS animation for loading spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}