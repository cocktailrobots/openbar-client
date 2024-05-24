export function flOzToMl(flOz) {
  const ml = (flOz * 29.5735)
  const res = ml.toFixed(0)
  console.log("flOzToMl", flOz, ml, res)
  return res
}

export function mlToFlOz(ml) {
  const flOz = ml / 29.5735
  const res = flOz.toFixed(1)
  console.log("mlToFlOz", ml, flOz, res)
  return res
}