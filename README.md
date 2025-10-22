# NASA Farm Navigator 🛰️🌾

A comprehensive agricultural platform that leverages NASA satellite data to provide farmers with intelligent farming decisions, crop recommendations, and yield predictions.

## 🚀 Live Demo

- **Frontend**: https://3e6d24f5.nasa-farm-navigator.pages.dev
- **Backend API**: https://nasa-farm-navigator.phulchandkr7715.workers.dev

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
- **Cloudflare Workers** with Hono framework
- **Cloudflare D1** database
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
farm-navigator/
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
├── src/                    # Cloudflare Workers backend
│   ├── routes/             # API routes
│   └── index.js            # Worker entry point
├── migrations/             # Database migrations
└── wrangler.toml          # Cloudflare configuration
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- Cloudflare account
- Wrangler CLI

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/phulchand1023/farm-navigator.git
cd farm-navigator
```

2. **Install dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

3. **Environment Configuration**
```bash
# Copy environment examples
cp .env.example .env
cp client/.env.example client/.env

# Edit .env files with your configuration
```

4. **Database Setup**
```bash
# Create D1 database
wrangler d1 create nasa-farm-db

# Apply migrations
wrangler d1 migrations apply nasa-farm-db --remote
```

5. **Start Development**
```bash
# Start backend (Cloudflare Workers)
wrangler dev

# Start frontend (in another terminal)
cd client
npm run dev
```

### Deployment

1. **Deploy Backend**
```bash
wrangler deploy
```

2. **Deploy Frontend**
```bash
cd client
npm run build
wrangler pages deploy dist --project-name=nasa-farm-navigator
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
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the repository.

## Acknowledgments

- NASA POWER API for satellite data
- Cloudflare for hosting infrastructure
- TensorFlow team for ML models
- React and Vite communities

---

**Built with ❤️ for farmers worldwide**