# Backend config for dev environment
# Usage: terraform init -backend-config=environments/dev.backend.hcl
bucket  = "safe-traveller-tfstate"
key     = "dev/terraform.tfstate"
region  = "ap-southeast-2"
encrypt = true
