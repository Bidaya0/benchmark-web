export interface CorpObj {
  authentication: boolean
  update_time: string
  check_date: string
  relevance_bloc?: string
  relevance_corp?: string
  assert_count?: string
  cloud_percent?: string
  risk_count?: string
  financing: string
  financing_amount: string
  financing_time: string
  industry_name: string
  introduction: string
  investor: Array<string>
  logo: string
  name: string
  org_province: string
  project_name_list: Array<string>
  unicode: string
  web_site: Array<string>
  is_vip?: boolean
  bloc_intro?: {
    risk_num: number
    member_num: number
    bloc_name : string
  }
  supply_intro?: {
    risk_num: number
    member_num: number
  }
}

export interface OrgObj {
  logo: string
  name: string
  main_body: string
  relevance_org: number
  relevance_corp: number
  check_date: string
}

export interface DomainObj { }

export interface SubdomainObj {
}

export interface IpObj { }

export interface WebObj {
  application: any[]
}

export interface CertificateObj {
  update_time: string
  start_time: string
  end_time: string
}

export interface EmailObj { }

export interface CloudProductObj {
  update_time: string
}

export interface AppObj {
  app_version_time: string
}

export interface Breach {
  ModifiedDate: string
}
export interface RiskEmailObj {
  Breaches: Array<Breach>
}

export interface RiskPortObj {
  update_time: string
}

export interface RiskAppObj {
  create_time: string
}
export interface RiskNetDiskObj{
  create_time: string
  leak_time: string
}
export interface RiskSoftwareObj {
  vul_publish_time: string
  vul_update_date: string
}

export interface ViewPermission {
  auth: boolean
  free: boolean
  vip: boolean
}

export interface CodeRiskTableObj{
  create_time: string
  leak_time: string
  introduction: string
  processing: string
}
