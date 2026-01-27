// src/lib/data/resources.ts
import type { Resource, CategoryId } from '@/types';

export const resources: Resource[] = [
  // ASSESSMENT TOOLS
  {
    id: 'res_001',
    title: 'Employee Engagement Survey Template',
    slug: 'employee-engagement-survey',
    category: 'assessment',
    type: 'Survey Template',
    description: 'Comprehensive 40-question survey based on validated organizational science research to measure employee engagement across 8 key dimensions.',
    detailedDescription: `This evidence-based employee engagement survey is designed using the Job Demands-Resources (JD-R) model and incorporates elements from Utrecht Work Engagement Scale (UWES). 

The survey measures engagement across 8 critical dimensions:
- Job Resources (autonomy, feedback, social support)
- Personal Resources (self-efficacy, optimism, resilience)
- Work Engagement (vigor, dedication, absorption)
- Job Demands (workload, emotional demands, role ambiguity)
- Organizational Support
- Career Development
- Work-Life Balance
- Leadership Quality

Perfect for HR professionals, managers, and organizational leaders looking to get actionable insights into their team's engagement levels.`,
    function: 'Measure employee engagement using scientifically validated questions',
    downloads: 2847,
    pages: 12,
    format: 'PDF',
    fileSize: '1.8 MB',
    filePath: '/downloads/assessment/employee-engagement-survey.pdf',
    previewImage: '/images/resources/employee-engagement-survey.jpg',
    includes: [
      '40 research-backed survey questions',
      'Question rationale and scoring guide',
      'Results interpretation framework',
      'Action planning template',
      'Benchmark data from 500+ organizations',
      'Digital survey template (Google Forms ready)',
    ],
    tags: ['engagement', 'survey', 'assessment', 'HR', 'organizational health'],
    featured: true,
    difficulty: 'Intermediate',
    timeToComplete: '45 minutes to deploy',
    relatedResources: ['res_002', 'res_007'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-10'),
  },
  {
    id: 'res_002',
    title: 'Organizational Culture Assessment',
    slug: 'organizational-culture-assessment',
    category: 'assessment',
    type: 'Assessment Tool',
    description: 'Diagnose your organizational culture using the Competing Values Framework. Identify cultural strengths and misalignments.',
    detailedDescription: `Based on Cameron and Quinn's Competing Values Framework (CVF), this assessment helps you understand your organization's current and preferred culture across four types:

- **Clan Culture**: Collaborative, people-focused, family-like
- **Adhocracy Culture**: Innovative, dynamic, entrepreneurial
- **Market Culture**: Results-driven, competitive, achievement-focused
- **Hierarchy Culture**: Structured, controlled, process-oriented

The assessment includes both "current state" and "desired state" questions to identify culture gaps and create targeted change initiatives.`,
    function: 'Identify and analyze organizational culture type and gaps',
    downloads: 1923,
    pages: 18,
    format: 'PDF',
    fileSize: '2.3 MB',
    filePath: '/downloads/assessment/organizational-culture-assessment.pdf',
    previewImage: '/images/resources/org-culture-assessment.jpg',
    includes: [
      'Complete CVF assessment instrument',
      'Scoring and plotting guide',
      'Culture type descriptions and implications',
      'Gap analysis framework',
      'Culture change roadmap template',
      'Case studies from 3 organizations',
    ],
    tags: ['culture', 'assessment', 'change management', 'organizational development'],
    featured: true,
    difficulty: 'Advanced',
    timeToComplete: '2-3 hours for full analysis',
    relatedResources: ['res_001', 'res_012'],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-11-15'),
  },
  {
    id: 'res_003',
    title: '360-Degree Feedback Framework',
    slug: '360-degree-feedback-framework',
    category: 'assessment',
    type: 'Assessment Tool',
    description: 'Complete framework for implementing multi-rater feedback, including question banks, process guides, and development planning tools.',
    detailedDescription: `A comprehensive guide to implementing 360-degree feedback that actually drives development. Based on research showing that 360 feedback works best when focused on development (not evaluation) and when paired with structured coaching.

Includes competency models mapped to:
- Leadership capabilities
- Managerial effectiveness
- Collaboration and influence
- Technical expertise
- Strategic thinking`,
    function: 'Gather comprehensive feedback from multiple perspectives',
    downloads: 1456,
    pages: 24,
    format: 'PDF',
    fileSize: '3.1 MB',
    filePath: '/downloads/assessment/360-feedback-framework.pdf',
    includes: [
      '120+ feedback questions across 12 competencies',
      'Rater selection guide',
      'Implementation timeline and checklist',
      'Report template and interpretation guide',
      'Development planning worksheets',
      'Common pitfalls and how to avoid them',
    ],
    tags: ['feedback', '360', 'leadership development', 'performance'],
    difficulty: 'Advanced',
    timeToComplete: '4-6 weeks to implement',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-12-01'),
  },

  // PERFORMANCE MANAGEMENT
  {
    id: 'res_004',
    title: 'OKR Implementation Guide',
    slug: 'okr-implementation-guide',
    category: 'performance',
    type: 'Framework',
    description: 'Step-by-step guide to implementing Objectives and Key Results (OKRs) with templates, examples, and common mistakes to avoid.',
    detailedDescription: `Learn how Google, Intel, and other high-performing organizations use OKRs to align teams and drive results. This guide goes beyond the basics to cover:

- How to write effective Objectives (ambitious, qualitative, inspiring)
- How to define measurable Key Results (specific, time-bound, challenging)
- The difference between committed and aspirational OKRs
- How to cascade OKRs across organizational levels
- The role of CFRs (Conversations, Feedback, Recognition)
- Quarterly planning and review processes`,
    function: 'Implement goal-setting framework for organizational alignment',
    downloads: 3421,
    pages: 28,
    format: 'PDF',
    fileSize: '2.7 MB',
    filePath: '/downloads/performance/okr-implementation-guide.pdf',
    previewImage: '/images/resources/okr-guide.jpg',
    includes: [
      'Complete OKR writing templates',
      '20+ real-world OKR examples',
      'Quarterly planning calendar',
      'Check-in and review frameworks',
      'Grading rubric and calibration guide',
      'Software selection criteria (if going digital)',
    ],
    tags: ['OKR', 'goals', 'performance', 'alignment', 'strategy'],
    featured: true,
    difficulty: 'Intermediate',
    timeToComplete: '2-3 weeks to pilot',
    relatedResources: ['res_005', 'res_006'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-12-18'),
  },
  {
    id: 'res_005',
    title: 'Performance Review Template Kit',
    slug: 'performance-review-template-kit',
    category: 'performance',
    type: 'Template',
    description: 'Modern performance review templates that emphasize development, avoid rating bias, and facilitate meaningful conversations.',
    detailedDescription: `Traditional performance reviews often fail because they focus on judgment rather than development. This kit provides alternative approaches:

- **Continuous Feedback Model**: Real-time, ongoing feedback
- **Developmental Review**: Future-focused, growth-oriented
- **Project-Based Review**: For agile/project teams
- **Peer-Based Review**: Incorporating 360-degree input

Each template includes specific questions designed to reduce bias, surface concrete examples, and create actionable development plans.`,
    function: 'Conduct effective, development-focused performance conversations',
    downloads: 2156,
    pages: 16,
    format: 'PDF',
    fileSize: '1.9 MB',
    filePath: '/downloads/performance/performance-review-templates.pdf',
    includes: [
      '4 different review templates',
      'Self-assessment worksheet',
      'Manager preparation guide',
      'Bias-reduction checklist',
      'Development plan template',
      'Difficult conversation scripts',
    ],
    tags: ['performance review', 'feedback', 'development', 'management'],
    difficulty: 'Beginner',
    timeToComplete: '1 hour per review',
    createdAt: new Date('2024-02-14'),
    updatedAt: new Date('2024-11-20'),
  },
  {
    id: 'res_006',
    title: 'Goal-Setting Framework & Worksheets',
    slug: 'goal-setting-framework',
    category: 'performance',
    type: 'Workbook',
    description: 'Evidence-based goal-setting process combining SMART criteria with goal-setting theory research for maximum effectiveness.',
    detailedDescription: `Based on Locke and Latham's goal-setting theory, this framework shows how to set goals that actually motivate and drive performance. Research shows that goals work best when they are:

- Specific and challenging (but not impossible)
- Committed to (not imposed)
- Paired with feedback
- Aligned with tasks of appropriate complexity

This workbook guides individuals and teams through the entire goal-setting process with practical exercises and real examples.`,
    function: 'Set effective goals that drive motivation and performance',
    downloads: 1834,
    pages: 14,
    format: 'PDF',
    fileSize: '1.6 MB',
    filePath: '/downloads/performance/goal-setting-framework.pdf',
    includes: [
      'Goal-setting theory overview',
      'SMART+ goal template (SMART + Alignment)',
      'Individual goal-setting worksheet',
      'Team goal alignment exercise',
      'Progress tracking template',
      'Quarterly review checklist',
    ],
    tags: ['goals', 'SMART', 'performance', 'motivation', 'planning'],
    difficulty: 'Beginner',
    timeToComplete: '30-45 minutes',
    relatedResources: ['res_004', 'res_005'],
    createdAt: new Date('2024-03-22'),
    updatedAt: new Date('2024-12-05'),
  },

  // ORGANIZATIONAL DESIGN
  {
    id: 'res_007',
    title: 'Team Design Canvas',
    slug: 'team-design-canvas',
    category: 'design',
    type: 'Template',
    description: 'Visual tool for designing high-performing teams. Define purpose, structure, processes, and success metrics on one page.',
    detailedDescription: `Based on research into team effectiveness (Hackman, Wageman, et al.), this canvas helps you design teams intentionally rather than by default. 

A well-designed team needs:
- **Clear Direction**: Shared purpose and goals
- **Strong Structure**: Right people, clear roles, appropriate size
- **Enabling Context**: Support, resources, and information
- **Team Processes**: How work gets done and decisions are made

The canvas provides a structured way to think through each element and create alignment from the start.`,
    function: 'Design team structure, roles, and operating principles',
    downloads: 1678,
    pages: 8,
    format: 'PDF',
    fileSize: '1.2 MB',
    filePath: '/downloads/design/team-design-canvas.pdf',
    includes: [
      'One-page team design canvas',
      'Facilitation guide for team workshops',
      'Role definition template',
      'Team charter template',
      'Success metrics framework',
      'Example: Product team design',
    ],
    tags: ['team design', 'org design', 'team charter', 'collaboration'],
    featured: true,
    difficulty: 'Intermediate',
    timeToComplete: '2-hour workshop',
    relatedResources: ['res_008', 'res_009'],
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-12-12'),
  },
  {
    id: 'res_008',
    title: 'Role Definition Toolkit',
    slug: 'role-definition-toolkit',
    category: 'design',
    type: 'Template',
    description: 'Create clear, comprehensive role definitions that attract the right talent and set clear expectations.',
    detailedDescription: `Poor role definitions lead to misaligned hiring, unclear expectations, and role conflict. This toolkit helps you create role definitions that:

- Clearly articulate the role's purpose and impact
- Define key responsibilities and decision rights
- Specify required competencies and experience
- Set clear success criteria
- Show career progression paths

Goes beyond traditional job descriptions to create true role clarity.`,
    function: 'Define roles clearly for recruitment and performance',
    downloads: 1432,
    pages: 12,
    format: 'PDF',
    fileSize: '1.4 MB',
    filePath: '/downloads/design/role-definition-toolkit.pdf',
    includes: [
      'Role definition template',
      'Competency framework',
      'RACI matrix guide',
      'Interview guide based on role definition',
      '10 example role definitions',
      'Role evolution planning worksheet',
    ],
    tags: ['job description', 'roles', 'recruitment', 'org design'],
    difficulty: 'Beginner',
    timeToComplete: '1-2 hours per role',
    createdAt: new Date('2024-04-18'),
    updatedAt: new Date('2024-11-28'),
  },

  // LEARNING & DEVELOPMENT
  {
    id: 'res_009',
    title: 'Individual Development Plan Template',
    slug: 'individual-development-plan',
    category: 'learning',
    type: 'Template',
    description: 'Structured approach to creating development plans that actually lead to growth, using the 70-20-10 model.',
    detailedDescription: `Research shows that most learning happens through experience (70%), relationships (20%), and formal training (10%). This IDP template ensures development plans reflect this reality.

The template helps individuals:
- Assess current skills and identify gaps
- Set specific development goals
- Create a balanced development plan (70-20-10)
- Identify stretch assignments and projects
- Find mentors and learning partners
- Track progress and adjust plans`,
    function: 'Create actionable individual development plans',
    downloads: 2234,
    pages: 10,
    format: 'PDF',
    fileSize: '1.5 MB',
    filePath: '/downloads/learning/individual-development-plan.pdf',
    includes: [
      'IDP template (fillable PDF)',
      'Skills assessment worksheet',
      '70-20-10 planning guide',
      'Development conversation guide',
      'Progress tracking template',
      'Development activity bank (100+ ideas)',
    ],
    tags: ['development', 'learning', 'career', 'growth', 'IDP'],
    featured: true,
    difficulty: 'Beginner',
    timeToComplete: '1-2 hours initial planning',
    relatedResources: ['res_005', 'res_010'],
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-12-08'),
  },
  {
    id: 'res_010',
    title: 'Onboarding Checklist & Guide',
    slug: 'onboarding-checklist-guide',
    category: 'learning',
    type: 'Checklist',
    description: '90-day onboarding program that sets new hires up for success with structured learning and relationship building.',
    detailedDescription: `Great onboarding reduces time-to-productivity and increases retention. Research shows that structured onboarding programs can improve new hire retention by 82% and productivity by 70%.

This guide covers:
- **Pre-Day 1**: Equipment, access, welcome package
- **Week 1**: Orientation, team intros, initial training
- **Month 1**: Core skills, key relationships, first projects
- **Month 2**: Increasing autonomy, deeper learning
- **Month 3**: Full productivity, 90-day review

Each phase includes specific milestones, check-ins, and success indicators.`,
    function: 'Onboard new employees effectively with structured program',
    downloads: 1867,
    pages: 16,
    format: 'PDF',
    fileSize: '2.0 MB',
    filePath: '/downloads/learning/onboarding-checklist-guide.pdf',
    includes: [
      '90-day onboarding timeline',
      'Pre-boarding checklist',
      'Week 1 schedule template',
      '30-60-90 day goals template',
      'Onboarding survey questions',
      'Manager onboarding guide',
    ],
    tags: ['onboarding', 'new hire', 'orientation', 'training'],
    difficulty: 'Intermediate',
    timeToComplete: '90-day program',
    createdAt: new Date('2024-05-24'),
    updatedAt: new Date('2024-11-30'),
  },

  // CHANGE MANAGEMENT
  {
    id: 'res_011',
    title: 'Change Readiness Assessment',
    slug: 'change-readiness-assessment',
    category: 'change',
    type: 'Assessment Tool',
    description: 'Evaluate organizational readiness for change across 7 dimensions before launching transformation initiatives.',
    detailedDescription: `70% of change initiatives fail due to lack of readiness, not lack of planning. This assessment helps you diagnose readiness across:

- **Leadership Alignment**: Are leaders united behind the change?
- **Change History**: What's the organization's track record?
- **Resource Availability**: Do we have capacity for change?
- **Culture**: Is the culture supportive or resistant?
- **Communication**: Are channels open and trusted?
- **Skills**: Do people have needed capabilities?
- **Stakeholder Buy-in**: Who supports, who opposes?

The assessment provides a readiness score and identifies specific barriers to address before launching change.`,
    function: 'Assess organizational readiness before major changes',
    downloads: 1543,
    pages: 14,
    format: 'PDF',
    fileSize: '1.8 MB',
    filePath: '/downloads/change/change-readiness-assessment.pdf',
    includes: [
      'Change readiness survey (35 questions)',
      'Scoring and interpretation guide',
      'Readiness dimension profiles',
      'Barrier identification framework',
      'Readiness-building action plan',
      'Stakeholder mapping template',
    ],
    tags: ['change management', 'readiness', 'transformation', 'assessment'],
    difficulty: 'Advanced',
    timeToComplete: '2-3 hours assessment',
    relatedResources: ['res_012', 'res_002'],
    createdAt: new Date('2024-06-12'),
    updatedAt: new Date('2024-12-03'),
  },
  {
    id: 'res_012',
    title: 'Change Communication Plan Template',
    slug: 'change-communication-plan',
    category: 'change',
    type: 'Template',
    description: 'Comprehensive communication planning framework for managing change initiatives with stakeholder-specific messaging.',
    detailedDescription: `Effective change communication is frequent, multi-channel, two-way, and tailored to different stakeholders. This template helps you:

- Map all stakeholder groups
- Identify their specific concerns and needs
- Craft tailored messages
- Choose appropriate channels
- Plan communication frequency
- Enable two-way dialogue
- Measure communication effectiveness

Based on Prosci's ADKAR model and Kotter's change communication research.`,
    function: 'Plan and execute change communication strategies',
    downloads: 1923,
    pages: 18,
    format: 'PDF',
    fileSize: '2.1 MB',
    filePath: '/downloads/change/change-communication-plan.pdf',
    includes: [
      'Communication plan template',
      'Stakeholder analysis matrix',
      'Message mapping framework',
      'Channel selection guide',
      'Communication calendar template',
      'Feedback mechanism design',
      '15 message templates',
    ],
    tags: ['change management', 'communication', 'stakeholders', 'messaging'],
    difficulty: 'Intermediate',
    timeToComplete: '4-6 hours planning',
    relatedResources: ['res_011'],
    createdAt: new Date('2024-06-28'),
    updatedAt: new Date('2024-12-15'),
  },
];

// Helper functions
export function getResourceById(id: string): Resource | undefined {
  return resources.find(r => r.id === id || r.slug === id);
}

export function getResourcesByCategory(category: Exclude<CategoryId, 'all'>): Resource[] {
  return resources.filter(r => r.category === category);
}

export function getFeaturedResources(): Resource[] {
  return resources.filter(r => r.featured).slice(0, 3);
}

export function getRelatedResources(resourceId: string): Resource[] {
  const resource = getResourceById(resourceId);
  if (!resource || !resource.relatedResources) return [];
  
  return resource.relatedResources
    .map(id => getResourceById(id))
    .filter((r): r is Resource => r !== undefined)
    .slice(0, 3);
}