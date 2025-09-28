// Model loader utility for TensorFlow Lite models
let cropRecommendationModel = null;
let yieldPredictionModel = null;

// Load TensorFlow Lite models
export const loadModels = async () => {
  try {
    // Models are served from public/models directory
    const cropModelUrl = '/models/crop_recommendation_model.tflite';
    const yieldModelUrl = '/models/yield_prediction_model.tflite';
    
    // Note: TensorFlow Lite models need TensorFlow.js Lite runtime
    // This is a placeholder for model loading logic
    console.log('Models available at:', { cropModelUrl, yieldModelUrl });
    
    return {
      cropRecommendationModel: cropModelUrl,
      yieldPredictionModel: yieldModelUrl
    };
  } catch (error) {
    console.error('Error loading models:', error);
    return null;
  }
};

// Get crop recommendation model
export const getCropRecommendationModel = () => {
  return cropRecommendationModel;
};

// Get yield prediction model
export const getYieldPredictionModel = () => {
  return yieldPredictionModel;
};

// Initialize models (call this when app starts)
export const initializeModels = async () => {
  const models = await loadModels();
  if (models) {
    cropRecommendationModel = models.cropRecommendationModel;
    yieldPredictionModel = models.yieldPredictionModel;
  }
  return models;
};