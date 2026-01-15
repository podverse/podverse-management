# podverse-management

Administrative management interface for Podverse.

## Overview

Podverse Management is a Next.js web application providing administrative tools for the Podverse support team. It connects to the Podverse Management API for backend operations.

## Development Setup

### Prerequisites

- Node.js v22+
- npm
- Podverse Management API running on port 1999

### Installation

```bash
npm install
```

### Configuration

Environment files are located in the `env/` directory:
- `local.env` - Local development
- `alpha.env` - Alpha environment
- `beta.env` - Beta environment
- `production.env` - Production environment

### Running

Development mode with hot reload (port 3999):
```bash
npm run dev:watch
```

Or standard dev mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Docker

Build the Docker image:
```bash
docker build -t podverse-management .
```

Build with alpha configuration:
```bash
docker build -f Dockerfile.build.alpha -t podverse-management-deploy .
```

## Environment Variables

Key configuration:
- `NEXT_PUBLIC_API_HOST` - Management API host
- `NEXT_PUBLIC_API_PORT` - Management API port (default: 1999)
- `NEXT_PUBLIC_WEB_DOMAIN` - Web domain (default: localhost:3999)

## License

AGPLv3
