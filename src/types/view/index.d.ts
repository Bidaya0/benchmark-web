export interface Org { // 推荐组织
  unicode: string
  logo: string
  name: string
  main_body_name: string
  enterprises_count: number
  label: string
  assert_count: number
  assert_count_24: number
}

export interface Corp { // 首页 搜索公司
  addresses: Array<string>
  assert_count: number
  assert_count_24: number
  introduction: string
  logo: string
  name: string
  unicode: string
}

export interface SearchOption {
  Key: string
  Value: number
}

export interface RiskCorp {
  level_low_count: number,
  level_low_count_percent: number,
  level_mid_count: number,
  level_mid_count_percent: number,
  level_high_count: number,
  level_high_count_percent: number,
  level_severity_count: number
  level_severity_count_percent: number
  unicode: string
}

export interface NewRiskObj {
  vul_publish_time: string,
  cve: string,
  name: string,
  association_assets: number,
  affect_company: number
}
