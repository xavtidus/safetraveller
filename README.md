# Safe Traveller

A practical demo Node.js single-page web application that models the concept of destination-based travel safety advisories, inspired by the Australian Government's [smarttraveller.gov.au](https://www.smarttraveller.gov.au) service.

> **Disclaimer** — This project is an independent technical demonstration built for learning and portfolio purposes. It is **not** affiliated with, endorsed by, or connected to the Australian Department of Foreign Affairs and Trade (DFAT), Smartraveller, or the Australian Government. All advisory data is **fictitious and for illustrative purposes only**. The Smartraveller name and service are the property of the Australian Government. No infringement of intellectual property or trademarks is intended.

## Purpose

Safe Traveller demonstrates how a modern React SPA can present travel safety information in a user-friendly way. It showcases:

- A four-tier advisory system (Normal → Do Not Travel) applied to 180+ cities
- Searchable, filterable destination listings with card and table views
- Detailed destination pages with risk assessments, safety tips, health info, transport guidance, and emergency contacts
- Responsive design that works across desktop, tablet, and mobile
- Material UI theming and component patterns.

All destination data and safety guidance is **mocked** — it does not reflect real-world conditions and must not be used for actual travel planning.

## Tech Stack

| Layer        | Technology                      |
| ------------ | ------------------------------- |
| Runtime      | Node.js 18+                     |
| Framework    | React 19                        |
| Build Tool   | Vite 8                          |
| UI Library   | Material UI 9 (with Emotion)    |
| Routing      | React Router 7                  |
| Language     | JavaScript (ES Modules)         |

## Prerequisites

- **Node.js** 18 or later — [download](https://nodejs.org/)
- **npm** (ships with Node.js)

## Getting Started

```bash
# 1. Clone the repository
git clone git@github.com:xavtidus/safetraveller.git
cd safetraveller

# 2. Install dependencies
cd webapp
npm install

# 3. Start the development server
npm run dev
```

Vite will start a local dev server (typically at `http://localhost:5173`). Changes to source files are reflected instantly via hot module replacement.

## Available Scripts

Run these from the `webapp/` directory:

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start the Vite development server with HMR       |
| `npm run build`     | Create an optimised production build in `dist/`   |
| `npm run preview`   | Serve the production build locally for testing    |
| `npm run lint`      | Run ESLint across the project                     |

## Project Structure

```
├── .github/workflows/   # GitHub Actions CI/CD pipeline
│   └── deploy.yml
├── infra/               # Terraform infrastructure-as-code
│   ├── environments/    # Per-environment variable and backend configs
│   │   ├── dev.tfvars
│   │   └── dev.backend.hcl
│   ├── providers.tf
│   ├── variables.tf
│   ├── s3.tf            # S3 bucket, OAI, bucket policy
│   ├── cloudfront.tf    # CloudFront distribution
│   └── outputs.tf
├── webapp/              # React SPA source
│   ├── public/
│   ├── src/
│   │   ├── components/  # Shared UI components (Layout, etc.)
│   │   ├── data/        # Mock destination data and advisory levels
│   │   ├── pages/       # Route-level page components
│   │   ├── utils/       # Helpers (gradient card styles, etc.)
│   │   ├── App.jsx      # Route definitions
│   │   ├── main.jsx     # Entry point
│   │   └── theme.js     # MUI theme configuration
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the SPA to AWS on every push to `main`, or via manual dispatch.

### Pipeline Steps

1. **Build** — installs dependencies, runs `npm run build`, and uploads the `dist/` artifact
2. **Deploy** — provisions infrastructure with Terraform, syncs the build to S3, and invalidates the CloudFront cache on `/*`

### GitLab CI/CD Variables

The repository also includes a GitLab pipeline in `.gitlab-ci.yml` that uses GitLab OIDC to assume the AWS deploy role without long-lived AWS keys.

Configure these GitLab CI/CD variables under **Settings → CI/CD → Variables**:

| Variable             | Value                                      |
| -------------------- | ------------------------------------------ |
| `AWS_ROLE_ARN`       | ARN of the IAM role GitLab should assume   |
| `AWS_DEFAULT_REGION` | `ap-southeast-2` (or your preferred region) |
| `TF_ENV`             | `dev` (or your Terraform environment name) |

`ROLE_ARN` is also supported as a legacy fallback, but `AWS_ROLE_ARN` is the canonical name used across the repo.

### AWS Architecture

| Resource    | Purpose                                                        |
| ----------- | -------------------------------------------------------------- |
| S3 Bucket   | Hosts the built SPA files (private, no public access)          |
| CloudFront  | CDN distribution with HTTPS, SPA routing (403/404 → index.html) |
| OAI         | Origin Access Identity granting CloudFront read-only S3 access |

### Prerequisites to Activate CI/CD

#### 1. Create a Terraform State Bucket

Create an S3 bucket to store Terraform remote state. The bucket name must match the value in `infra/environments/dev.backend.hcl` (default: `safe-traveller-tfstate`).

```bash
aws s3api create-bucket \
  --bucket safe-traveller-tfstate \
  --region ap-southeast-2 \
  --create-bucket-configuration LocationConstraint=ap-southeast-2

aws s3api put-bucket-versioning \
  --bucket safe-traveller-tfstate \
  --versioning-configuration Status=Enabled
```

#### 2. Configure OIDC Identity Provider for GitHub Actions

Create an IAM OIDC identity provider so GitHub Actions can authenticate with AWS without long-lived credentials.

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1 \
  --client-id-list sts.amazonaws.com
```

#### 3. Create an IAM Role for the Pipeline

Create an IAM role with a trust policy scoped to your repository, and attach permissions for S3, CloudFront, and Terraform operations.

**Trust policy** (`trust-policy.json`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:xavtidus/safetraveller:*"
        }
      }
    }
  ]
}
```

```bash
aws iam create-role \
  --role-name safe-traveller-deploy \
  --assume-role-policy-document file://trust-policy.json
```

Attach a policy granting the required permissions (S3, CloudFront, IAM for OAI, and Terraform state access). At minimum the role needs:

- `s3:*` on the site bucket and state bucket
- `cloudfront:*` on the distribution
- `iam:*` scoped to the OAI (Terraform manages this)

#### 4. Configure the GitHub Environment

In the repository settings, create a GitHub Environment named **dev** and add the following variables:

| Variable        | Value                                            |
| --------------- | ------------------------------------------------ |
| `AWS_ROLE_ARN`  | ARN of the IAM role created above                |
| `AWS_REGION`    | `ap-southeast-2` (or your preferred region)      |

Navigate to: **Settings → Environments → New environment → dev**

#### 5. Trigger the Pipeline

Push to `main` or run the workflow manually from the **Actions** tab. The pipeline will:

1. Build the SPA
2. Run `terraform init` / `plan` / `apply` to provision S3 + CloudFront
3. Sync the built assets to S3 with appropriate cache headers
4. Invalidate the CloudFront cache on `/*`
5. Output the site URL in the workflow summary

## Licence

This project is provided as-is for educational and demonstration purposes.
