import React from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Users, CheckCircle, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { caseStudies as enCaseStudies } from '@/data/EN/caseStudies.json'
import { caseStudies as frCaseStudies } from '@/data/FR/caseStudies.json'
import { Metadata, ResolvingMetadata } from 'next'

interface CaseStudyPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  // Generate params for both languages
  const enParams = enCaseStudies.map(study => ({ id: study.id.toString() }))
  const frParams = frCaseStudies.map(study => ({ id: study.id.toString() }))
  return [...enParams, ...frParams]
}

export async function generateMetadata(
  { params }: CaseStudyPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = parseInt(params.id)
  const caseStudy = enCaseStudies.find(study => study.id === id) || frCaseStudies.find(study => study.id === id)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${caseStudy.title} - Case Study`,
    description: caseStudy.challenge,
    openGraph: {
      title: `${caseStudy.title} | Logibyte`,
      description: caseStudy.challenge,
      images: [
        {
          url: `https://www.logibyte.ca${caseStudy.imageUrl}`,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
        ...previousImages,
      ],
    },
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const id = parseInt(params.id)
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const lang = pathname.startsWith('/fr') ? 'fr' : 'en'
  const caseStudies = lang === 'fr' ? frCaseStudies : enCaseStudies
  const caseStudy = caseStudies.find(study => study.id === id)

  if (!caseStudy) {
    notFound()
  }

  const text = {
    en: {
      backToCaseStudies: 'Back to Case Studies',
      client: 'Client:',
      challenge: 'The Challenge',
      solution: 'Our Solution',
      results: 'Results & Impact',
      projectDetails: 'Project Details',
      industry: 'Industry',
      duration: 'Duration',
      teamSize: 'Team Size',
      technologiesUsed: 'Technologies Used',
      readyToStart: 'Ready to Start Your Project?',
      discussResults: "Let's discuss how we can help you achieve similar results.",
      getStarted: 'Get Started',
      caseStudiesLink: '/case-studies',
      contactLink: '/contact',
    },
    fr: {
      backToCaseStudies: 'Retour aux Études de Cas',
      client: 'Client :',
      challenge: 'Le Défi',
      solution: 'Notre Solution',
      results: 'Résultats et Impact',
      projectDetails: 'Détails du Projet',
      industry: 'Industrie',
      duration: 'Durée',
      teamSize: 'Taille de l\'Équipe',
      technologiesUsed: 'Technologies Utilisées',
      readyToStart: 'Prêt à Commencer Votre Projet ?',
      discussResults: 'Discutons de la façon dont nous pouvons vous aider à obtenir des résultats similaires.',
      getStarted: 'Commencer',
      caseStudiesLink: '/fr/case-studies',
      contactLink: '/fr/contact',
    },
  }[lang]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={caseStudy.imageUrl}
            alt={caseStudy.title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-pink-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link 
              href={text.caseStudiesLink} 
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {text.backToCaseStudies}
            </Link>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <div className="flex flex-wrap gap-2 mb-6">
                {caseStudy.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-medium text-blue-200 bg-blue-900/50 rounded-full border border-blue-300/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {caseStudy.title}
              </h1>
              
              <p className="text-xl text-gray-200 mb-6">
                <strong>{text.client}</strong> {caseStudy.client}
              </p>
              
              <div className="flex flex-wrap gap-6 text-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{caseStudy.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{caseStudy.teamSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Challenge */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {text.challenge}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {text.solution}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {text.results}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Details */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {text.projectDetails}
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{text.industry}</dt>
                      <dd className="text-gray-900 dark:text-white">{caseStudy.industry}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{text.duration}</dt>
                      <dd className="text-gray-900 dark:text-white">{caseStudy.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{text.teamSize}</dt>
                      <dd className="text-gray-900 dark:text-white">{caseStudy.teamSize}</dd>
                    </div>
                  </dl>
                </div>

                {/* Technologies */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {text.technologiesUsed}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {text.readyToStart}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {text.discussResults}
                  </p>
                  <Link
                    href={text.contactLink}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {text.getStarted}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 