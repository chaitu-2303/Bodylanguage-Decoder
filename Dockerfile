# Multi-stage Dockerfile for production deployment
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY api/package*.json ./api/
COPY web/package*.json ./web/
RUN cd api && npm ci --only=production
RUN cd web && npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/api/node_modules ./api/node_modules
COPY --from=deps /app/web/node_modules ./web/node_modules
COPY api ./api
COPY web ./web

# Build the application
RUN cd api && npm run build
RUN cd web && npm run build

# Production image, copy all the files and run
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/api/dist ./api/dist
COPY --from=builder --chown=nextjs:nodejs /app/web/dist ./web/dist
COPY --from=builder --chown=nextjs:nodejs /app/api/package*.json ./api/
COPY --from=builder --chown=nextjs:nodejs /app/web/package*.json ./web/

# Install production dependencies
RUN cd api && npm ci --only=production
RUN cd web && npm ci --only=production

USER nextjs

EXPOSE 5000

ENV PORT=5000

CMD ["node", "api/dist/index.js"]
