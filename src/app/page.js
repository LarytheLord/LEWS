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
    uncertainty: 30, // Medium uncertainty
    animals: 50,
    canTheyFeel: 60, // Medium sentience evidence
    suffering: 45,
    growth: 55, // Medium to high growth
    support: 20, // Low support/strong advocacy gap
    pathDependence: 40
  });

  const [result, setResult] = useState(null);
  const [trajectories, setTrajectories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState('chickens'); // Default to chickens as baseline

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
      const response = await fetch('/api/trajectory?tech=factoryFarming&species=chickens');
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

  // Lock-in dimensions with descriptions according to UI document
  const lockInDimensions = {
    uncertainty: { 
      label: "Uncertainty", 
      icon: "❓",
      description: "How much uncertainty exists around the technology",
      formatValue: (val) => `±${val} points`
    },
    animals: { 
      label: "# Animals", 
      icon: "🔢", 
      description: "Scale of animals affected by the technology",
      formatValue: (val) => {
        const billions = (val * 4.4).toFixed(1); // Assuming scale factor
        return `${billions}B/yr • ↑ 8%/yr`;
      }
    },
    canTheyFeel: { 
      label: "Can They Feel?", 
      icon: "🧠", 
      description: "Evidence for animal sentience/welfare considerations",
      formatValue: (val) => `${val}% • Medium evidence`
    },
    suffering: { 
      label: "Suffering", 
      icon: "💔", 
      description: "Intensity of potential suffering caused by the technology",
      formatValue: (val) => `${(val * 100).toFixed(0)} hours lifetime pain`
    },
    growth: { 
      label: "Growth", 
      icon: "📈", 
      description: "Rate of growth and adoption of the technology",
      formatValue: (val) => `$${(val * 8).toFixed(0)}M • multi-country`
    },
    support: { 
      label: "Support", 
      icon: "🧩", 
      description: "Level of advocacy and support for the technology",
      formatValue: (val) => `Near-zero advocacy` // For low support values
    },
    pathDependence: { 
      label: "Path Dependence", 
      icon: "🔗", 
      description: "How entrenched the system becomes over time",
      formatValue: (val) => `System becoming entrenched`
    }
  };

  // System presets
  const systemPresets = [
    { id: 'chickens', name: 'Battery Cages 🐔', defaultValues: { animals: 90, growth: 85, support: 10, pathDependence: 95, uncertainty: 15, canTheyFeel: 95, suffering: 85 } },
    { id: 'shrimp', name: 'AI Aquaculture 🦐', defaultValues: { animals: 25, growth: 60, support: 15, pathDependence: 30, uncertainty: 40, canTheyFeel: 50, suffering: 60 } },
    { id: 'insects', name: 'Insect Farms 🦗', defaultValues: { animals: 70, growth: 70, support: 20, pathDependence: 40, uncertainty: 35, canTheyFeel: 45, suffering: 50 } }
  ];

  const selectSystem = (systemId) => {
    setSelectedSystem(systemId);
    const preset = systemPresets.find(p => p.id === systemId);
    if (preset) {
      setInputs(preset.defaultValues);
    }
  };

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
        {/* Main Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h1 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#1e293b', 
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <span style={{fontSize: '1.5em'}}>🚨</span> LEWS – Lock-in Early Warning System
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            color: '#64748b', 
            margin: 0 
          }}>
            A quick risk check for emerging animal-farming technologies.
          </p>
        </div>

        {/* System Selection */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {systemPresets.map(preset => (
            <button
              key={preset.id}
              onClick={() => selectSystem(preset.id)}
              style={{ 
                backgroundColor: selectedSystem === preset.id ? '#3b82f6' : '#e2e8f0',
                color: selectedSystem === preset.id ? 'white' : '#334155',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {preset.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Input Section - 7 Risk Inputs */}
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            padding: '1.5rem', 
            borderRadius: '0.5rem', 
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)', 
            backdropFilter: 'blur(4px)', 
            border: '1px solid rgba(255, 255, 255, 0.3)',
            maxHeight: '700px',
            overflowY: 'auto'
          }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              fontWeight: '600', 
              marginBottom: '1.5rem', 
              color: '#1e293b',
              textAlign: 'center'
            }}>
              RISK INPUTS
              <div style={{ fontSize: '0.8rem', fontWeight: '400', color: '#64748b', marginTop: '0.25rem' }}>
                (simple inputs → score)
              </div>
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
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{lockInDimensions[key]?.icon}</span>
                      <div>
                        <label style={{ 
                          fontWeight: '600', 
                          color: '#374151', 
                          display: 'block',
                          fontSize: '0.9rem'
                        }}>
                          {lockInDimensions[key]?.label}
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
                    </div>
                    <span style={{ 
                      color: '#6b7280', 
                      fontWeight: '600', 
                      fontSize: '0.9rem', 
                      minWidth: '60px', 
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
                  {key === 'uncertainty' && (
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#9ca3af', 
                      marginTop: '0.2rem',
                      textAlign: 'right'
                    }}>
                      {lockInDimensions[key]?.formatValue(value)}
                    </div>
                  )}
                  {(key === 'animals' || key === 'growth') && (
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#9ca3af', 
                      marginTop: '0.2rem',
                      textAlign: 'right'
                    }}>
                      {lockInDimensions[key]?.formatValue(value)}
                    </div>
                  )}
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
            {/* Assessment Results */}
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              padding: '1.5rem', 
              borderRadius: '0.5rem', 
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)', 
              backdropFilter: 'blur(4px)', 
              border: '1px solid rgba(255, 255, 255, 0.3)' 
            }}>
              <h2 style={{ 
                fontSize: '1.2rem', 
                fontWeight: '600', 
                marginBottom: '1.5rem', 
                color: '#1e293b',
                textAlign: 'center'
              }}>
                ASSESSMENT RESULTS
              </h2>
              
              {result && !loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {/* Lock-in Risk Score */}
                  <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: 'bold', 
                      color: '#dc2626',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {result.score}/100
                    </div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: '#64748b',
                      marginTop: '0.25rem'
                    }}>
                      Lock-in Risk Score
                    </div>
                  </div>

                  {/* Time Until Lock-in */}
                  <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                    <div style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      color: '#0f172a',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>⏰</span>
                      {result.timeUntilLockin}
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#64748b',
                      marginTop: '0.25rem'
                    }}>
                      Time Until Lock-in
                    </div>
                  </div>

                  {/* Intervention Window */}
                  <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                    <div 
                      style={{ 
                        fontSize: '1.3rem', 
                        fontWeight: 'bold', 
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: getInterventionColor(result.interventionWindow) === 'green' ? 'rgba(16, 185, 129, 0.2)' : 
                                        getInterventionColor(result.interventionWindow) === 'yellow' ? 'rgba(234, 179, 8, 0.2)' : 
                                        'rgba(239, 68, 68, 0.2)',
                        color: getInterventionColor(result.interventionWindow) === 'green' ? '#065f46' : 
                               getInterventionColor(result.interventionWindow) === 'yellow' ? '#713f12' : 
                               '#7f1d1d',
                        border: getInterventionColor(result.interventionWindow) === 'green' ? '1px solid rgba(16, 185, 129, 0.3)' : 
                                 getInterventionColor(result.interventionWindow) === 'yellow' ? '1px solid rgba(234, 179, 8, 0.3)' : 
                                 '1px solid rgba(239, 68, 68, 0.3)',
                        display: 'inline-block'
                      }}
                    >
                      {result.interventionWindow}
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#64748b',
                      marginTop: '0.25rem'
                    }}>
                      Intervention Window
                    </div>
                  </div>

                  {/* Range */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '1rem', 
                      fontWeight: '500', 
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Range: {result.range[0]} – {result.range[1]}
                    </div>
                    <div style={{ 
                      height: '10px', 
                      backgroundColor: '#e2e8f0', 
                      borderRadius: '5px',
                      overflow: 'hidden'
                    }}>
                      <div 
                        style={{ 
                          height: '100%', 
                          width: `${(result.score - result.range[0]) / (result.range[1] - result.range[0]) * 100}%`,
                          backgroundColor: '#3b82f6',
                          borderRadius: '5px'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div>
                    <h3 style={{ fontWeight: '500', color: '#374151', marginBottom: '0.5rem', textAlign: 'center' }}>Key Metrics</h3>
                    <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                      <div>• {result.keyMetrics.animalsAffected}</div>
                      <div>• {result.keyMetrics.sufferingHours} suffering</div>
                      <div>• {result.keyMetrics.advocacyOrgs} orgs today</div>
                      <div>• Lock-in ~{result.keyMetrics.expectedLockIn}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
                    <button style={{
                      backgroundColor: '#e2e8f0',
                      color: '#334155',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #cbd5e1',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      transition: 'background-color 0.2s'
                    }}>
                      View Trajectory
                    </button>
                    <button style={{
                      backgroundColor: '#e2e8f0',
                      color: '#334155',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #cbd5e1',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      transition: 'background-color 0.2s'
                    }}>
                      Download
                    </button>
                    <button style={{
                      backgroundColor: '#e2e8f0',
                      color: '#334155',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #cbd5e1',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      transition: 'background-color 0.2s'
                    }}>
                      Share
                    </button>
                  </div>
                </div>
              ) : (
                <p style={{ 
                  color: '#94a3b8', 
                  textAlign: 'center', 
                  padding: '1rem', 
                  fontStyle: 'italic',
                  minHeight: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {loading ? 'Calculating assessment...' : 'Adjust the sliders to see assessment results'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Trajectory Chart */}
        {trajectories && (
          <div style={{ 
            marginTop: '2rem', 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            padding: '1.5rem', 
            borderRadius: '0.5rem', 
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)', 
            backdropFilter: 'blur(4px)', 
            border: '1px solid rgba(255, 255, 255, 0.3)' 
          }}>
            <h2 style={{ 
              fontSize: '1.2rem', 
              fontWeight: '600', 
              marginBottom: '1rem', 
              color: '#1e293b',
              textAlign: 'center'
            }}>
              Historical Trajectory Comparison
            </h2>
            <div style={{ height: '20rem' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '1rem', textAlign: 'center' }}>
              This chart shows where the current technology stands compared to the historical trajectory of chicken industrial farming. 
              The red dot represents the current assessment score mapped to the historical timeline.
            </div>
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