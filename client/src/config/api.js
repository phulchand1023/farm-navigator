const API_BASE_URL = import.meta.env.PROD 
  ? 'https://nasa-farm-navigator.phulchandkr7715.workers.dev'
  : 'http://localhost:8787'

export { API_BASE_URL }