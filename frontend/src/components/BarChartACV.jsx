import React from 'react';

const BarChartACV = ({ stages = [], winRateACVOverall = 0 }) => {
  // console.log(" stages:", stages); 

  const maxWinRate = Math.max(...stages.map(stage => stage.winRateACV)) || 1; //calculate max win rate 

  return (
    <div className="p-4 mb-8 border border-gray-300 rounded-lg">
      <h6 className="text-lg font-semibold mb-4">Win Rate by ACV</h6>
      <div className="flex flex-col gap-2">
        {stages.map((stage, index) => (
          <div key={index} className="group relative">
            <div className="flex items-center bg-gray-200 rounded overflow-hidden h-8">
              <div
                className="flex items-center justify-center text-white text-xs h-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${(stage.winRateACV / maxWinRate) * 100}%`,
                  backgroundColor: '#4caf50',
                }}
              >
                {stage.label}
              </div>
            </div>
            <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
              Win Rate: {stage.winRateACV}%
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-sm">
          Total ACV Win Rate: <strong>{winRateACVOverall}%</strong>
        </p>
      </div>
    </div>
  );
};

export default BarChartACV;