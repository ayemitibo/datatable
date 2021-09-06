import { data } from '/@src/datasets/deals_dataset.json'
import {
  Holding,
  Industry,
  ClientIssuer,
  Agent,
  Source,
  DealType,
  Analyst,
  Asset,
} from '/@src/@types'

const {
  Holdings: holdings,
  Industries: industries,
  ClientIssuers: issuers,
  Agents: agents,
  Sources: sources,
  DealTypes: dealTypes,
  Analysts: analysts,
  Assets: assets,
} = data as {
  Holdings: Holding[]
  Industries: Industry[]
  ClientIssuers: ClientIssuer[]
  Agents: Agent[]
  Sources: Source[]
  DealTypes: DealType[]
  Analysts: Analyst[]
  Assets: Asset[]
}

const industriesMap: Record<string | number, string> = Object.create(null)
const issuersMap: Record<string | number, string> = Object.create(null)
const agentsMap: Record<string | number, string> = Object.create(null)
const sourcesMap: Record<string | number, string> = Object.create(null)
const dealTypesMap: Record<string | number, string> = Object.create(null)
const analystsMap: Record<string | number, string> = Object.create(null)
const assetsMap: Record<string | number, string> = Object.create(null)

industries.forEach(({ Id, IndustryName }) => {
  industriesMap[Id] = IndustryName
})

issuers.forEach(({ IssuerId, IssuerName }) => {
  issuersMap[IssuerId] = IssuerName
})

agents.forEach(({ Id, CompanyName }) => {
  agentsMap[Id] = CompanyName
})

sources.forEach(({ Id, SourceName }) => {
  sourcesMap[Id] = SourceName
})

dealTypes.forEach(({ Id, TypeName }) => {
  dealTypesMap[Id] = TypeName
})

analysts.forEach(({ UserId, FullName }) => {
  analystsMap[UserId] = FullName
})

assets.forEach(({ Id, AssetName }) => {
  assetsMap[Id] = AssetName
})

export const useGetDealData = () => {
  return {
    holdings,
    industriesMap,
    issuersMap,
    agentsMap,
    sourcesMap,
    dealTypesMap,
    analystsMap,
    assetsMap,
  }
}
