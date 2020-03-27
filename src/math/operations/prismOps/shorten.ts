import { Polyhedron } from "math/polyhedra"
import { Twist } from "types"
import {
  antiprismHeight,
  getChirality,
  isGyroelongatedBiCupola,
  getAdjustInformation,
  getScaledPrismVertices,
} from "./prismUtils"
import makeOperation from "../makeOperation"

function doShorten(polyhedron: Polyhedron, options: Options) {
  const adjustInfo = getAdjustInformation(polyhedron)
  const { boundary } = adjustInfo
  const isAntiprism = boundary.adjacentFaces()[0].numSides === 3
  const { twist = isAntiprism ? "left" : undefined } = options

  const n = boundary.numSides
  const scale = polyhedron.edgeLength() * (twist ? antiprismHeight(n) : 1)

  const endVertices = getScaledPrismVertices(adjustInfo, -scale, twist)

  return {
    animationData: {
      start: polyhedron,
      endVertices,
    },
  }
}

interface Options {
  twist?: Twist
}
export const shorten = makeOperation<Options>("shorten", {
  apply: doShorten,
  optionTypes: ["twist"],
  resultsFilter(polyhedron, { twist }, resultSpecs) {
    if (!resultSpecs.isCapstone()) {
      throw new Error()
    }
    if (!isGyroelongatedBiCupola(polyhedron)) return true
    const chirality = getChirality(polyhedron)
    const gyrate = twist === chirality ? "ortho" : "gyro"
    return resultSpecs.data.gyrate === gyrate
  },

  allOptionCombos(polyhedron) {
    if (isGyroelongatedBiCupola(polyhedron)) {
      return [{ twist: "left" }, { twist: "right" }]
    }
    return [{}]
  },
})
