export interface OrgObj {
  logo: string
  name: string
  main_body: string
  relevance_org: number
  relevance_corp: number
  check_date: string
}

export interface CorpObj { }

export interface DomainObj { }

export interface SubdomainObj {
}

export interface IpObj { }

export interface WebObj {
}

export interface CertificateObj {
  start_time: string
  end_time: string
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
