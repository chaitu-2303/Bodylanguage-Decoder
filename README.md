# I did the front end part

# Body Language Decoder

A comprehensive body language analysis platform built with modern web technologies.

## Project Structure

```
body-language-decoder/
├── docker-compose.yml          # Docker orchestration
├── .env.example               # Environment variables template
├── README.md                  # Project documentation
├── reverse-proxy/             # Nginx reverse proxy configuration
│   ├── nginx.conf            # Nginx configuration
│   └── ssl/                  # SSL certificates directory
├── api/                      # TypeScript API backend
│   ├── package.json          # API dependencies
│   ├── tsconfig.json         # TypeScript configuration
│   ├── prisma/               # Database schema and migrations
│   │   └── schema.prisma    # Prisma schema definition
│   └── src/                  # Source code
│       ├── index.ts          # Application entry point
│       ├── lib/              # Shared libraries
│       │   ├── prisma.ts     # Prisma client configuration
│       │   └── logger.ts     # Winston logger setup
│       ├── middleware/       # Express middleware
│       │   └── security.ts   # Security and error handling
│       ├── routes/           # API route handlers
│       │   ├── observations.ts  # Observation CRUD operations
│       │   └── insights.ts   # Insight management
│       └── validation/       # Input validation schemas
│           └── observation.ts # Observation validation
└── web/                      # React frontend
    ├── index.html           # HTML entry point
    ├── package.json         # Frontend dependencies
    ├── vite.config.ts       # Vite configuration
    ├── tailwind.config.js   # Tailwind CSS configuration
    ├── postcss.config.js    # PostCSS configuration
    └── src/                 # Source code
        ├── main.tsx         # Application entry point
        ├── App.tsx          # Main application component
        ├── index.css        # Global styles
        ├── pages/           # Page components
        │   ├── Dashboard.tsx    # Main dashboard
        │   ├── NewObservation.tsx # Create new observation
        │   └── History.tsx      # Observation history
        ├── components/      # Reusable components
        │   ├── ObservationForm.tsx # Observation input form
        │   └── ObservationCard.tsx # Observation display card
        └── api/             # API client utilities
            └── client.ts    # Axios client configuration
```

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- PostgreSQL (or use Docker services)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd body-language-decoder
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the services**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Web interface: http://localhost:3000
   - API documentation: http://localhost:5000/api
   - Prisma Studio: http://localhost:5555 (run `npm run db:studio` in api directory)

### Development Setup

#### API Development
```bash
cd api
npm install
npm run dev
```

#### Web Development
```bash
cd web
npm install
npm run dev
```

### API Endpoints

- **GET /api/observations** - List all observations
- **POST /api/observations** - Create new observation
- **GET /api/observations/:id** - Get specific observation
- **PUT /api/observations/:id** - Update observation
- **DELETE /api/observations/:id** - Delete observation
- **GET /api/insights** - List all insights
- **POST /api/insights** - Create new insight

### Database Schema

The application uses PostgreSQL with Prisma ORM. The schema includes:

- **Observation**: Stores body language observations
- **Insight**: Stores analysis insights linked to observations

### Security Features

- HTTPS enforcement
- Rate limiting
- Security headers
- Input validation
- Error handling
- CORS configuration

### Deployment

The application is designed for easy deployment with Docker. SSL certificates can be placed in `reverse-proxy/ssl/` for HTTPS support.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details
