export interface CorpObj {
  logo: string
  name: string
  industry_name: string
  introduction: string
  web_site: Array<string>
  check_date: string
}

export interface DomainObj { }

export interface SubdomainObj {
}

export interface IpObj { }

export interface CertificateObj {
  start_time: string
  end_time: string
}
export interface WebObj {
  application: any[]
}

export interface EmailObj { }

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

export interface RiskSoftwareObj {
  vul_publish_time: string
  vul_update_date: string
}

export interface ViewPermission {
  auth: boolean
  free: boolean
  vip: boolean
}
