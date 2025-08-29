variable "environment" {
  description = "Environment name (prod or staging)"
  type        = string
  default     = "prod"
  validation {
    condition     = (var.environment == "prod" || var.environment == "staging")
    error_message = "The environment must be either 'prod' or 'staging'."
  }
}