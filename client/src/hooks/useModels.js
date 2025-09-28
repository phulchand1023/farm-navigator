import { useState, useEffect } from 'react';
import { initializeModels, getCropRecommendationModel, getYieldPredictionModel } from '../utils/modelLoader';

// Custom hook for accessing ML models
export const useModels = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoading(true);
        const models = await initializeModels();
        if (models) {
          setModelsLoaded(true);
        } else {
          setError('Failed to load models');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadModels();
  }, []);

  return {
    modelsLoaded,
    loading,
    error,
    cropRecommendationModel: getCropRecommendationModel(),
    yieldPredictionModel: getYieldPredictionModel()
  };
};