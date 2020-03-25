import { mapValues } from "lodash-es"
import { Graph } from "./Graph"
import Classical from "../specs/Classical"

function oppositeFacet(facet: "vertex" | "face") {
  return facet === "vertex" ? "face" : "vertex"
}

const mapping: Record<string, Classical["data"]["operation"]> = {
  rectified: "rectify",
  bevelled: "bevel",
  cantellated: "cantellate",
  snub: "snub",
}

export default function classicalGraph(g: Graph) {
  // operations on regular polyhedra
  for (const family of Classical.options.family) {
    const regulars = Classical.query.where({ family, operation: "regular" })

    const { rectified, bevelled, cantellated, snub } = mapValues(
      mapping,
      (operation) => Classical.query.where({ family, operation })[0],
    )

    for (const regular of regulars) {
      const dual = Classical.query.where({
        family,
        facet: regular.data.facet && oppositeFacet(regular.data.facet),
        operation: "regular",
      })[0]

      const truncated = Classical.query.where({
        family,
        facet: regular.data.facet,
        operation: "truncate",
      })[0]

      g.addEdge("dual", regular, dual)
      g.addEdge("truncate", regular, truncated)
      g.addEdge("rectify", regular, rectified)
      g.addEdge("expand", regular, cantellated)
      g.addEdge("snub", regular, snub)

      g.addEdge("expand", truncated, bevelled)
    }

    g.addEdge("truncate", rectified, bevelled)
    g.addEdge("twist", cantellated, snub)
  }
}
