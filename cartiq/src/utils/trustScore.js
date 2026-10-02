const computeTrustScore = (product) => {
  let score = 0

  // Review consistency (variance in ratings low = high score): 20 pts max
  if (product.reviewCount > 500 && product.rating > 4.0) {
    score += 20
  } else if (product.reviewCount >= 100) {
    score += 15
  } else if (product.reviewCount >= 10) {
    score += 10
  }

  // Seller verified badge: +15 pts
  if (product.seller.verified) {
    score += 15
  }

  // Seller rating > 4.5: +10 pts
  if (product.seller.rating > 4.5) {
    score += 10
  }

  // Return policy exists: +10 pts
  if (product.returnPolicy) {
    score += 10
  }

  // Verified purchase reviews > 70%: +15 pts
  const verifiedReviews = product.reviews.filter((r) => r.verified).length
  const verifiedRatio = product.reviews.length > 0 ? verifiedReviews / product.reviews.length : 0
  if (verifiedRatio > 0.7) {
    score += 15
  }

  // Product info completeness (all spec keys filled): +15 pts
  const specKeys = Object.keys(product.specs)
  const filledSpecs = specKeys.filter((key) => product.specs[key] && product.specs[key] !== '')
  if (filledSpecs.length >= specKeys.length && specKeys.length > 0) {
    score += 15
  }

  // Discount not too aggressive (not > 50% — red flag): +5 if <50%, 0 if >50%
  if (product.discount && product.discount < 50) {
    score += 5
  }

  // Cap at 100
  score = Math.min(100, score)

  // Add descriptive label
  let label = 'Moderate Trust'
  if (score >= 80) {
    label = 'High Trust'
  } else if (score < 60) {
    label = 'Lower Trust'
  }

  return { score, label }
}

export default computeTrustScore
