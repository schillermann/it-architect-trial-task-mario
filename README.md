# Planning AWS infrastructure
## Core AWS Components

### Frontend shop

1. Amazon S3 – Hosts the static shop web app (SPA or simple HTML/JS).
2. Amazon CloudFront – CDN in front of the S3 website for performance + HTTPS.
3. Shop authenticates with AWS Cognito via OAuth2

### Serverless API

1. Amazon API Gateway (HTTP API)
  - Single route, e.g. POST /available-products
  - Protected by OAuth2/JWT authorizer Cognito
2. AWS Lambda AvailableProductsHandler
  - Implements all logic for:
    - Getting available products for a user.
    - Sending orders to the external system (order entry API (OEA)).

### Batch CSV ingestion

1. Amazon S3 (batch bucket) – Stores incoming CSV files from the other system.
2. AWS Lambda: BatchOrderProcessor
  - Triggered by S3 ObjectCreated events.
  - Parses CSV.
  - For each order row, reuses the same logic / endpoint used by the shop to send orders to the external order entry API (OEA)

### External Order Entry API (OEA)
1. Uses OAuth2 client credentials


