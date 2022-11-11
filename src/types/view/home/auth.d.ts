export interface AuthenticationForm {
  id: number
  unicode: string
  email_prefix: string
  domain: string
  appellation: string
  captcha?: string
}

export interface QueryOption {
  name: string
  unicode: string
  org_name: string
  org_unicode: string
  icon: string
  attestation_count: number
}

export interface AuthListObj {
  created_at: string

}
