# NASA Farm Navigator 🛰️🌾

A comprehensive agricultural platform that leverages NASA satellite data to provide farmers with intelligent farming decisions, crop recommendations, and yield predictions.

## Features

### 🌍 Multi-Language Support
- 15+ Indian languages including Hindi, Punjabi, Telugu, Marathi, Gujarati, Malayalam, Bengali, Tamil, Kannada, Odia, Assamese, Urdu, Sanskrit, and Sindhi
- Real-time language switching with i18next
- Voice assistance in multiple languages

### 🤖 AI-Powered Agriculture
- **Crop Recommendation Model**: TensorFlow Lite model for intelligent crop suggestions
- **Yield Prediction Model**: ML-based yield forecasting
- NASA POWER API integration for satellite data
- Smart farming decisions based on weather and soil data

### 📱 User Experience
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Voice assistant integration
- Progressive web app capabilities

### 🚀 Core Modules
- **Farm Management**: Add, edit, and monitor multiple farm plots
- **Crop Planning**: Get AI-powered planting recommendations
- **Weather Integration**: Real-time weather data from NASA
- **Market Prices**: Current crop market pricing
- **Government Schemes**: Access to agricultural schemes
- **Expert Consultation**: Connect with agricultural experts
- **Training Videos**: Educational content for farmers
- **Emergency Alerts**: Weather and pest alerts

## Tech Stack

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **i18next** for internationalization
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** authentication
- **bcrypt** for password hashing
- **Zod** for validation
- **NASA POWER API** integration

### AI/ML
- **TensorFlow Lite** models
- Crop recommendation system
- Yield prediction algorithms

## Project Structure

```
nasa3/
├── client/                 # React frontend
│   ├── public/
│   │   └── models/         # TensorFlow Lite models
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── context/        # React context providers
│   │   └── locales/        # Translation files
│   └── package.json
└── server/                 # Node.js backend
    ├── config/             # Database and environment config
    ├── controllers/        # Route handlers
    ├── models/             # MongoDB schemas
    ├── routes/             # API routes
    ├── services/           # Business logic
    ├── middleware/         # Express middleware
    ├── utils/              # Helper functions
    └── validators/         # Input validation schemas
```

## Installation

### Prerequisites
- Node.js 18+
- MongoDB
- NASA POWER API access

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd nasa3
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Environment Configuration**
```bash
# Create server/.env
MONGO_URI=mongodb://localhost:27017/nasa-farm
JWT_SECRET=your-jwt-secret
NASA_API_URL=https://power.larc.nasa.gov/api/temporal/daily
PORT=5000
```

4. **Start the application**
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Farm Management
- `GET /api/farm` - Get user farms
- `POST /api/farm` - Create new farm
- `PUT /api/farm/:id` - Update farm
- `DELETE /api/farm/:id` - Delete farm

### Decisions
- `GET /api/decision` - Get farming decisions
- `POST /api/decision` - Create decision

## ML Models

The application includes two TensorFlow Lite models:

1. **Crop Recommendation Model** (`crop_recommendation_model.tflite`)
   - Suggests optimal crops based on soil and weather conditions
   - Accessible via `/models/crop_recommendation_model.tflite`

2. **Yield Prediction Model** (`yield_prediction_model.tflite`)
   - Predicts crop yield based on historical and current data
   - Accessible via `/models/yield_prediction_model.tflite`

### Using Models in Components
```jsx
import { useModels } from '../hooks/useModels';

const YourComponent = () => {
  const { modelsLoaded, cropRecommendationModel, yieldPredictionModel } = useModels();
  
  if (modelsLoaded) {
    // Use models for predictions
  }
};
```

## Key Features Implementation

### Multi-Language Support
- Automatic language detection
- Real-time translation switching
- Voice assistance in native languages
- RTL support for Urdu

### NASA Data Integration
- Real-time weather data
- Soil moisture information
- Temperature and precipitation data
- Historical climate patterns

### Voice Assistant
- Text-to-speech in multiple languages
- Navigation assistance
- Form field announcements
- Accessibility compliance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ for farmers using NASA satellite data and modern web technologies.**