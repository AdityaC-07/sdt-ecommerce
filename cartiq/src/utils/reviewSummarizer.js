const reviewSummarizer = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return {
      pros: [],
      cons: [],
      sentiment: 'No reviews',
    }
  }

  const pros = []
  const cons = []
  const positiveKeywords = [
    'good',
    'great',
    'excellent',
    'amazing',
    'fast',
    'battery',
    'quality',
    'value',
    'best',
    'love',
    'recommend',
    'perfect',
    'awesome',
    'fantastic',
    'superb',
  ]
  const negativeKeywords = [
    'bad',
    'poor',
    'slow',
    'heavy',
    'expensive',
    'issue',
    'problem',
    'disappointed',
    'worst',
    'hate',
    'terrible',
    'broken',
    'defective',
    'slow',
    'lag',
  ]

  reviews.forEach((review) => {
    const text = review.body.toLowerCase()
    const rating = review.rating

    // Extract pros from positive reviews or positive sentiment
    if (rating >= 4) {
      positiveKeywords.forEach((keyword) => {
        if (text.includes(keyword) && !pros.includes(keyword)) {
          pros.push(keyword.charAt(0).toUpperCase() + keyword.slice(1))
        }
      })
    }

    // Extract cons from negative reviews or negative sentiment
    if (rating <= 2) {
      negativeKeywords.forEach((keyword) => {
        if (text.includes(keyword) && !cons.includes(keyword)) {
          cons.push(keyword.charAt(0).toUpperCase() + keyword.slice(1))
        }
      })
    }
  })

  // Determine overall sentiment
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  let sentiment = 'Mixed'
  if (avgRating >= 4) {
    sentiment = 'Mostly Positive'
  } else if (avgRating <= 2) {
    sentiment = 'Mostly Negative'
  }

  // Limit to top 5 pros and cons
  return {
    pros: pros.slice(0, 5),
    cons: cons.slice(0, 5),
    sentiment,
  }
}

export default reviewSummarizer
