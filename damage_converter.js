module.exports = function convertNumberToDiceFormula ({
  value,
  baseMod,
  diceSizes = [20]
}) {
  // Calculate random between range
  const randomRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  let finalModValue;
  if (Array.isArray(baseMod)) {
    finalModValue = randomRange(baseMod[0], baseMod[1]);
  } else {
    finalModValue = baseMod;
  }

  let finalValue;
  if (Array.isArray(value)) {
    finalValue = randomRange(value[0], value[1])
  } else {
    finalValue = value
  }

  console.log("Selected Base Mod = " + finalModValue)
  console.log("Selected Value = " + finalValue)

  const valueMinusMinMod = finalValue - finalModValue;

  function calculateDiceInfo (initialValue, diceSize) {
    const numberOfDices = Math.floor(initialValue / diceSize);
    const remainingMod = initialValue % diceSize;

    return {
      diceSize,
      numberOfDices,
      remainingMod,
    }
  }

  let diceInfos;
  if (Array.isArray(diceSizes)) {
    diceInfos = diceSizes.map(diceSize => {
      return calculateDiceInfo(valueMinusMinMod / diceSizes.length, diceSize)
    })
  } else {
    diceInfos = [calculateDiceInfo(valueMinusMinMod, diceSizes)]
  }

  console.log("Value Minus Min Mod = " + valueMinusMinMod)
  console.log(diceInfos)

  let result = '';
  result += diceInfos.map(diceInfo => (
    diceInfo['numberOfDices'] + `d${diceInfo['diceSize']}`
  )).join('+')

  const totalMod = Math.round(diceInfos.reduce(
    (total, diceInfo) => total += parseFloat(diceInfo.remainingMod),
    0
  ))

  if (totalMod > 0) {
    result += '+' + (totalMod + parseInt(finalModValue));
  }

  return result;
}
