import React from 'react';
import { useModels } from '../hooks/useModels';

// Optional component to show model loading status
const ModelStatus = () => {
  const { modelsLoaded, loading, error } = useModels();

  if (loading) {
    return <div className="text-sm text-gray-500">Loading models...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">Model error: {error}</div>;
  }

  if (modelsLoaded) {
    return <div className="text-sm text-green-500">✓ Models ready</div>;
  }

  return null;
};

export default ModelStatus;