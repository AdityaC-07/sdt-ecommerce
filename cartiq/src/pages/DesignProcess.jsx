import { useState } from 'react'
import { ArrowRight, Smile, Meh, Frown, CheckCircle, Lightbulb, Users, Target, Zap, Shield, Scale } from 'lucide-react'
import Card from '../components/ui/Card'
import PageWrapper from '../components/layout/PageWrapper'
import SectionHeader from '../components/layout/SectionHeader'

const DesignProcess = () => {
  const [selectedPersona, setSelectedPersona] = useState(null)

  const personaDetails = {
    'Aarav Shah': {
      goals: 'Find budget-friendly tech for coding and ML projects',
      frustrations: 'Too many options, unclear specs, overwhelmed by choices',
      howCartIQHelps: 'Smart search filters by use case, need-based recommendations, student-focused tags',
    },
    'Priya Sharma': {
      goals: 'Research thoroughly before purchasing, avoid fake reviews',
      frustrations: 'Can\'t trust reviews, unclear which products are genuine',
      howCartIQHelps: 'Trust scores, review summaries, verified purchase badges',
    },
    'Rohan Mehta': {
      goals: 'Quick decision-making, efficient comparison',
      frustrations: 'Time-consuming to compare specs across multiple products',
      howCartIQHelps: 'Smart comparison tool, priority match scoring, explainable recommendations',
    },
    'Neha Gupta': {
      goals: 'Find deals, manage budget carefully',
      frustrations: 'Hidden costs, unclear pricing, confusing discounts',
      howCartIQHelps: 'Transparent pricing, coupon system, clear cost breakdown in cart',
    },
    'Mr. Sharma': {
      goals: 'Simple, accessible shopping experience',
      frustrations: 'Complex interfaces, small text, difficult navigation',
      howCartIQHelps: 'Senior mode with larger text, simplified checkout, help support',
    },
  }

  const journeySteps = [
    { step: 1, name: 'Browse Products', emotion: 'neutral', color: 'amber' },
    { step: 2, name: 'Search with Filters', emotion: 'frustrated', color: 'red' },
    { step: 3, name: 'Read Reviews', emotion: 'frustrated', color: 'red' },
    { step: 4, name: 'Compare Products', emotion: 'frustrated', color: 'red' },
    { step: 5, name: 'Check Trust', emotion: 'neutral', color: 'amber' },
    { step: 6, name: 'Add to Cart', emotion: 'neutral', color: 'amber' },
    { step: 7, name: 'View Cart', emotion: 'frustrated', color: 'red' },
    { step: 8, name: 'Checkout', emotion: 'neutral', color: 'amber' },
    { step: 9, name: 'Payment', emotion: 'neutral', color: 'amber' },
    { step: 10, name: 'Order Confirmed', emotion: 'happy', color: 'green' },
    { step: 11, name: 'Track Order', emotion: 'happy', color: 'green' },
    { step: 12, name: 'Receive Product', emotion: 'happy', color: 'green' },
  ]

  const designThinkingStages = [
    {
      stage: 'Empathize',
      activity: 'User interviews, empathy maps, persona development',
      feature: 'Persona-based UI modes (Student, Professional, Senior)',
    },
    {
      stage: 'Define',
      activity: 'POV statements, pain point identification',
      feature: 'Smart Search, Trust Score system',
    },
    {
      stage: 'Ideate',
      activity: 'SCAMPER, brainstorming solutions',
      feature: 'ExplainCard, Need-Based Search Engine',
    },
    {
      stage: 'Prototype',
      activity: 'Wireframes → functional UI',
      feature: 'This React application with all features',
    },
    {
      stage: 'Test',
      activity: 'Usability testing plan',
      feature: 'Senior Mode, Review Summarization (iterative improvements)',
    },
    {
      stage: 'Iterate',
      activity: 'Feedback loops and refinement',
      feature: 'Continuous improvement based on user feedback',
    },
  ]

  const innovations = [
    {
      title: 'Need-Based Search',
      icon: <Target className="w-8 h-8" />,
      problem: 'Information overload, too many choices',
      solution: 'Natural language parsing that matches products to user needs, not just keywords',
    },
    {
      title: 'Trust Score',
      icon: <Shield className="w-8 h-8" />,
      problem: 'Fake reviews, seller uncertainty',
      solution: 'Composite score based on review consistency, seller verification, and product completeness',
    },
    {
      title: 'Explainable Recommendations',
      icon: <Lightbulb className="w-8 h-8" />,
      problem: 'Blind algorithm distrust',
      solution: 'Shows exactly why a product is recommended with match reasons and priority scoring',
    },
    {
      title: 'Smart Comparison',
      icon: <Scale className="w-8 h-8" />,
      problem: 'Difficulty comparing products',
      solution: 'Side-by-side comparison with winner highlighting and priority match analysis',
    },
    {
      title: 'Senior Mode',
      icon: <Users className="w-8 h-8" />,
      problem: 'Accessibility for elderly users',
      solution: 'Larger text, simplified UI, 2-step checkout, help support overlay',
    },
    {
      title: 'Review Summarization',
      icon: <Zap className="w-8 h-8" />,
      problem: 'Reading thousands of reviews',
      solution: 'AI-powered pros/cons extraction and sentiment analysis',
    },
  ]

  return (
    <PageWrapper maxWidth="xl">
      <SectionHeader
        title="Design Thinking Journey"
        subtitle="How CartIQ was built with empathy and purpose"
      />

      {/* SECTION 1: The Problem Space */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl font-bold text-[#1E3A5F] mb-8">The Problem Space</h2>
        <Card className="p-8 mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500">
          <p className="text-lg text-gray-700 italic mb-4">
            "Online shopping has become overwhelming. Users face information overload, fake reviews,
            hidden costs, and confusing interfaces. We need a smarter, more trustworthy shopping experience."
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Information Overload', desc: 'Too many products, hard to find the right one' },
            { title: 'Fake Reviews', desc: 'Can\'t trust what buyers say about products' },
            { title: 'Hidden Costs', desc: 'Unclear pricing, surprise fees at checkout' },
          ].map((pain, index) => (
            <Card key={index} className="p-6 border-l-4 border-red-400">
              <h3 className="font-semibold text-xl text-[#1E3A5F] mb-2">{pain.title}</h3>
              <p className="text-gray-600">{pain.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 2: Our Personas */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl font-bold text-[#1E3A5F] mb-8">Our Personas</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {Object.keys(personaDetails).map((name) => (
            <button
              key={name}
              onClick={() => setSelectedPersona(selectedPersona === name ? null : name)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedPersona === name
                  ? 'border-[#1E3A5F] bg-[#1E3A5F] text-white'
                  : 'border-gray-200 hover:border-[#1E3A5F] bg-white'
              }`}
            >
              <p className="font-semibold text-sm">{name}</p>
            </button>
          ))}
        </div>

        {selectedPersona && (
          <Card className="p-6 bg-indigo-50 border border-indigo-200">
            <h3 className="font-semibold text-xl text-[#1E3A5F] mb-4">{selectedPersona}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-[#1E3A5F] mb-2">Goals</h4>
                <p className="text-gray-700">{personaDetails[selectedPersona].goals}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#1E3A5F] mb-2">Frustrations</h4>
                <p className="text-gray-700">{personaDetails[selectedPersona].frustrations}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#1E3A5F] mb-2">How CartIQ Helps</h4>
                <p className="text-gray-700">{personaDetails[selectedPersona].howCartIQHelps}</p>
              </div>
            </div>
          </Card>
        )}
      </section>

      {/* SECTION 3: User Journey Map */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl font-bold text-[#1E3A5F] mb-8">User Journey Map</h2>
        <Card className="p-6 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {journeySteps.map((step) => (
              <div key={step.step} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mb-2 ${
                    step.emotion === 'happy' ? 'bg-green-500' : step.emotion === 'frustrated' ? 'bg-red-500' : 'bg-amber-500'
                  }`}
                >
                  {step.step}
                </div>
                <div className="text-center mb-2">
                  {step.emotion === 'happy' ? <Smile className="w-6 h-6 text-green-500 mx-auto" /> : step.emotion === 'frustrated' ? <Frown className="w-6 h-6 text-red-500 mx-auto" /> : <Meh className="w-6 h-6 text-amber-500 mx-auto" />}
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 rotate-90 md:rotate-0" />
                <p className="text-xs text-center mt-2 font-medium w-24">{step.name}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <span>Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full" />
              <span>Neutral</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <span>Pain Point</span>
            </div>
          </div>
        </Card>
      </section>

      {/* SECTION 4: Design Thinking Alignment */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl font-bold text-[#1E3A5F] mb-8">Design Thinking Alignment</h2>
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#1E3A5F] text-white">
              <tr>
                <th className="px-6 py-4 text-left">Stage</th>
                <th className="px-6 py-4 text-left">Activity</th>
                <th className="px-6 py-4 text-left">CartIQ Feature Built</th>
              </tr>
            </thead>
            <tbody>
              {designThinkingStages.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 font-semibold text-[#1E3A5F]">{row.stage}</td>
                  <td className="px-6 py-4 text-gray-700">{row.activity}</td>
                  <td className="px-6 py-4 text-gray-700">{row.feature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* SECTION 5: Key Innovations */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl font-bold text-[#1E3A5F] mb-8">Key Innovations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovations.map((innovation, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                {innovation.icon}
              </div>
              <h3 className="font-semibold text-xl text-[#1E3A5F] mb-2 text-center">{innovation.title}</h3>
              <div className="bg-red-50 p-3 rounded-lg mb-3">
                <p className="text-sm font-medium text-red-700">Problem: {innovation.problem}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-green-700">Solution: {innovation.solution}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 6: Conclusion */}
      <section className="mb-16">
        <Card className="p-8 bg-gradient-to-r from-[#1E3A5F] to-[#2D5986] text-white text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-amber-400" />
          <h2 className="font-serif text-3xl font-bold mb-4">Designed with Empathy. Built with Purpose.</h2>
          <p className="text-lg text-gray-200 mb-6">
            CartIQ is not just another e-commerce platform. It's a thoughtful response to real user pain points,
            built using Design Thinking principles to create a shopping experience that truly serves people.
          </p>
          <p className="text-sm text-gray-300">
            © 2026 CartIQ — Software Design Thinking Mini-Project
          </p>
        </Card>
      </section>
    </PageWrapper>
  )
}

export default DesignProcess
