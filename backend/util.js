const calculateStats = (data) => {
  
  // Process each stage in the data to calculate stats
  const stages = data.map((item, index) => {
    // Get the next stage, or use the current stage if it's the last one
    const nextStage = index < data.length - 1 ? data[index + 1] : item;

    // Calculating how many moved to the next stage
    const movedToNext = nextStage.count || 0;
    // Calculating how many were lost in this stage
    const lost = item.count - movedToNext;
    // Calculating the win rate for this stage
    const winRate = item.count > 0 ? movedToNext / item.count : 0;

    // Calculating ACV  stats
    const movedToNextACV = nextStage.acv || 0; // ACV moved to the next stage
    const lostACV = item.acv - movedToNextACV; // ACV lost in this stage
    const winRateACV = item.acv > 0 ? movedToNextACV / item.acv : 0; // ACV win rate


    return {
      label: item.label,
      count: item.count, 
      acv: item.acv, 
      movedToNext, 
      lost, 
      winRate: Math.round(winRate * 100), // Win rate as a percentage
      lostACV, 
      movedToNextACV, 
      winRateACV: Math.round(winRateACV * 100), // ACV win rate as a percentage
    };
  });

  // Get the first and last stages to calculate overall stats
  const firstStage = data[0];
  const lastStage = data[data.length - 1];
  // Calculating the overall win rate
  const winRateOverall = firstStage.count > 0
    ? Math.round((lastStage.count / firstStage.count) * 100)
    : 0;
  // Calculating the overall ACV win rate
  const winRateACVOverall = firstStage.acv > 0
    ? Math.round((lastStage.acv / firstStage.acv) * 100)
    : 0;

  
  return {
    stages, // Stats for each stage
    winRateOverall, // Overall win rate
    winRateACVOverall, // Overall ACV win rate
  };
};

module.exports = { calculateStats };