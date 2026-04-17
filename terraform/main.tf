terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  #Partial config of s3 backend
  backend "s3" {
    bucket       = ""
    key          = ""
    region       = ""
    use_lockfile = true
    encrypt      = true
  }

}

provider "aws" {
  region = var.region
} 



