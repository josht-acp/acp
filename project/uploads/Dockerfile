# ─── ACP Fee Billing Portal — Dockerfile ───────────────────
# Ascension Capital Partners t/a APEX Consulting Partners
# Node 20 LTS Alpine — minimal production image

FROM node:20-alpine

# Install build tools for better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# Create DB directory with correct permissions
RUN mkdir -p db && chown -R node:node /app

# Run as non-root
USER node

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
