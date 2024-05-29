export function calculateSalary(user) {
  if (user.salary == null)
    return null

  const gross = user.salary
  let tax = gross * 0.185
  if (user.under25)
    tax += Math.max(0, (gross - 499_952) * 0.15)
  else
    tax += gross * 0.15
  if (user.personal)
    tax = Math.max(0, tax - 77_300)

  let net = gross - tax
  if (user.married && user.eligible)
    net += 5_000
  if (user.family && user.beneficiary > 0) {
    const amount = ({
      1: 10_000,
      2: 20_000,
    })[user.beneficiary] || 33_000
    net += amount * user.sustained
  }

  return Math.floor(net)
}