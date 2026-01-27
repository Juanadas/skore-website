import { Metadata } from 'next';
import Link from 'next/link';
import { Target, BookOpen, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About SKORE',
  description: 'Learn about our mission to bridge the gap between organizational science and practice.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Bridging the Gap Between Science and Practice
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              SKORE translates peer-reviewed organizational research into practical tools 
              that HR professionals, managers, and leaders can use Monday morning.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-secondary-900 mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-lg text-secondary-700">
                <p>
                  There's an enormous body of research on what makes organizations effective. 
                  Studies on employee engagement, performance management, team effectiveness, 
                  and organizational change.
                </p>
                <p>
                  The problem? This research mostly stays in academic journals. The gap between 
                  what we know from research and what gets implemented in organizations is vast.
                </p>
                <p className="font-semibold text-secondary-900">
                  We're closing that gap.
                </p>
                <p>
                  SKORE takes validated frameworks from organizational science and turns them 
                  into templates, assessments, and guides you can download and use immediately.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-blue-100 rounded-2xl p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-6">🎯</div>
                <p className="text-xl font-semibold text-secondary-900">
                  Evidence-Based<br />Practical Tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Our Principles
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Everything we create follows these core principles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 border-2 border-secondary-200">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Evidence-Based
              </h3>
              <p className="text-secondary-600">
                Every tool is grounded in peer-reviewed research and validated frameworks, 
                not management fads or personal opinions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-secondary-200">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Practical
              </h3>
              <p className="text-secondary-600">
                No theory without application. Download a template and use it Monday morning. 
                Every resource is designed for immediate implementation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-secondary-200">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Accessible
              </h3>
              <p className="text-secondary-600">
                All resources are free. No paywalls, no signup requirements. 
                We believe good tools should be available to everyone.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-secondary-200">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Clear
              </h3>
              <p className="text-secondary-600">
                No jargon. No unnecessary complexity. We explain what research says 
                in language practitioners can understand and use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Not Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              What We're Not
            </h2>
            <div className="space-y-4 text-lg text-secondary-700">
              <p>
                <strong className="text-secondary-900">We're not consultants.</strong>{' '}
                We don't sell services or implementation support. We provide tools 
                you can use yourself.
              </p>
              <p>
                <strong className="text-secondary-900">We're not academics.</strong>{' '}
                We translate research, we don't conduct it. Our job is to make 
                existing knowledge usable.
              </p>
              <p>
                <strong className="text-secondary-900">We're not gurus.</strong>{' '}
                We don't promote proprietary frameworks or "revolutionary" approaches. 
                We work with what the evidence shows.
              </p>
              <p>
                <strong className="text-secondary-900">We're not comprehensive.</strong>{' '}
                We focus on areas where strong research exists and practice needs improvement. 
                We'd rather go deep on a few topics than shallow on many.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-secondary-900 mb-8 text-center">
              Our Approach
            </h2>
            
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-8 border-2 border-secondary-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">
                      Identify the Research
                    </h3>
                    <p className="text-secondary-700">
                      We start with meta-analyses and systematic reviews—research that synthesizes 
                      findings across many studies to identify what consistently works.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border-2 border-secondary-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">
                      Translate to Practice
                    </h3>
                    <p className="text-secondary-700">
                      We convert academic frameworks into practical tools. This means stripping 
                      away jargon, adding clear instructions, and creating templates that work 
                      in real organizations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border-2 border-secondary-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">
                      Test and Refine
                    </h3>
                    <p className="text-secondary-700">
                      We use feedback from practitioners to improve our resources. If something 
                      isn't clear or isn't working, we revise it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border-2 border-secondary-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">
                      Share Freely
                    </h3>
                    <p className="text-secondary-700">
                      We make everything available for free. The research is publicly funded; 
                      the translations should be publicly available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Explore Our Resources?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Download free, evidence-based tools you can use immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resources">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-blue-50">
                Browse Resources
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Read the Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}