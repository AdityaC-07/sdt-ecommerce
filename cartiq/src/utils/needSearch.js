const matchProductsToNeed = (needQuery, products) => {
  if (!needQuery) return products.map((p) => ({ ...p, matchScore: 0, matchReasons: [] }))

  const query = needQuery.toLowerCase()
  let results = [...products]

  // Parse budget
  const budgetMatch = query.match(/(?:₹|under|below|within|less than)\s*(\d+)/i)
  const budget = budgetMatch ? parseInt(budgetMatch[1]) : null

  // Parse category keywords
  const categoryKeywords = {
    laptop: 'Laptops',
    headphones: 'Headphones',
    phone: 'Smartphones',
    smartphone: 'Smartphones',
    camera: 'Cameras',
    watch: 'Smartwatches',
    smartwatch: 'Smartwatches',
  }

  let detectedCategory = null
  for (const [keyword, category] of Object.entries(categoryKeywords)) {
    if (query.includes(keyword)) {
      detectedCategory = category
      break
    }
  }

  // Filter by category
  if (detectedCategory) {
    results = results.filter((p) => p.category === detectedCategory)
  }

  // Filter by budget
  if (budget) {
    results = results.filter((p) => p.price <= budget)
  }

  // Score each product
  const scoredResults = results.map((product) => {
    let score = 0
    const reasons = []

    // Tag match (+15 per matching tag)
    const matchingTags = product.tags.filter((tag) =>
      query.includes(tag.toLowerCase())
    )
    score += matchingTags.length * 15
    if (matchingTags.length > 0) {
      reasons.push(`Tagged for ${matchingTags.join(' and ')}`)
    }

    // Budget fit
    if (budget) {
      const budgetRatio = product.price / budget
      if (budgetRatio <= 0.8) {
        score += 20
        reasons.push('Well within your budget')
      } else if (budgetRatio <= 1.0) {
        score += 15
        reasons.push('Within your budget')
      }
    }

    // Rating contribution
    score += (product.rating / 5) * 20
    if (product.rating >= 4.5) {
      reasons.push(`${product.rating}★ rating`)
    }

    // Trust score contribution
    score += (product.trustScore / 100) * 15
    if (product.trustScore >= 90) {
      reasons.push('High trust score')
    }

    // Priority keyword bonuses
    if (query.includes('battery') && product.specs.Battery) {
      score += 10
      reasons.push(`${product.specs.Battery} battery life`)
    }
    if (query.includes('light') || query.includes('weight')) {
      if (product.specs.Weight) {
        score += 10
        reasons.push(`Lightweight (${product.specs.Weight})`)
      }
    }
    if (query.includes('ram') && product.specs.RAM) {
      score += 10
      reasons.push(`${product.specs.RAM} RAM`)
    }

    return {
      ...product,
      matchScore: Math.min(100, Math.round(score)),
      matchReasons: reasons.slice(0, 4), // Limit to top 4 reasons
    }
  })

  // Sort by match score descending
  scoredResults.sort((a, b) => b.matchScore - a.matchScore)

  return scoredResults
}

export default matchProductsToNeed
