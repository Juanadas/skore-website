import type { BlogPost, Author } from '@/types';

// Authors
export const authors: Author[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Organizational Psychologist',
    bio: 'Sarah specializes in evidence-based approaches to employee engagement and organizational culture.',
    avatar: '/images/authors/sarah.jpg',
    social: {
      twitter: 'https://twitter.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarahchen',
    },
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Performance Consultant',
    bio: 'Michael helps organizations design performance systems that drive results and development.',
    avatar: '/images/authors/michael.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/mrodriguez',
    },
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    role: 'Change Management Specialist',
    bio: 'Emily researches and consults on successful organizational transformation initiatives.',
    avatar: '/images/authors/emily.jpg',
    social: {
      twitter: 'https://twitter.com/emilywatson',
      linkedin: 'https://linkedin.com/in/emilywatson',
    },
  },
];

// Blog posts
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Science Behind Employee Engagement: What Actually Works',
    slug: 'science-behind-employee-engagement',
    category: 'Employee Engagement',
    readTime: 8,
    excerpt: 'Moving beyond superficial perks to understand the psychological factors that truly drive employee engagement and organizational commitment.',
    content: `Employee engagement has become a buzzword in HR circles, but what does the research actually tell us about creating genuinely engaged workforces?

## The Problem with Surface-Level Solutions

Many organizations approach engagement with what I call "perks thinking" - free snacks, ping pong tables, and casual Fridays. While these might boost satisfaction momentarily, research consistently shows they don't create sustained engagement.

## What the Research Shows

Meta-analyses of hundreds of studies reveal three core psychological needs that drive engagement:

### 1. Autonomy
Employees need meaningful control over how they accomplish their work. This doesn't mean absence of structure, but rather the freedom to exercise judgment within clear boundaries.

### 2. Competence
People need to feel effective and see growth in their capabilities. This requires appropriate challenges, regular feedback, and developmental opportunities.

### 3. Relatedness
Humans are social beings. Quality relationships with colleagues and feeling part of something larger than oneself are fundamental to engagement.

## Practical Applications

Based on this research, here are evidence-based practices:

- **Job Crafting**: Allow employees to modify aspects of their roles to better align with their strengths and interests
- **Growth Conversations**: Regular discussions about development, not just performance evaluation
- **Psychological Safety**: Create environments where people can take interpersonal risks without fear
- **Meaningful Work**: Help employees connect their daily tasks to larger organizational purpose

## Measuring What Matters

Traditional engagement surveys often miss the mark. Instead of asking "Are you engaged?", measure the drivers: autonomy, competence, and relatedness. This gives you actionable insights rather than just a score.

## The Bottom Line

Real engagement comes from meeting fundamental psychological needs, not superficial benefits. Organizations that understand this distinction create workplaces where people thrive, not just show up.`,
    author: authors[0],
    publishedAt: new Date('2024-12-15'),
    tags: ['engagement', 'psychology', 'research', 'culture'],
    image: '/images/blog/engagement-science.jpg',
  },
  {
    id: '2',
    title: 'Why Most Performance Reviews Fail (And How to Fix Them)',
    slug: 'why-performance-reviews-fail',
    category: 'Performance Management',
    readTime: 6,
    excerpt: 'Performance reviews are universally disliked yet persist in most organizations. Here\'s what research tells us about making them actually useful.',
    content: `If you've ever dreaded performance review season, you're not alone. Studies show that both managers and employees find traditional performance reviews demotivating and ineffective.

## The Research Problem

Decades of research reveal fundamental flaws in traditional approaches:

- **Recency Bias**: Managers disproportionately weight recent events
- **Halo Effects**: One strong trait influences ratings across all dimensions
- **Forced Rankings**: Create competition instead of collaboration
- **Annual Frequency**: Too infrequent for meaningful feedback

## A Better Approach

Organizations with effective performance systems share common characteristics:

### Frequent Check-Ins
Research by Deloitte and others shows that replacing annual reviews with frequent (weekly or bi-weekly) check-ins leads to better outcomes. These conversations should be:
- Forward-looking rather than evaluative
- Focused on obstacles and support needed
- Brief (15-30 minutes)

### Separation of Feedback and Evaluation
When developmental feedback is tied to compensation decisions, people become defensive. Consider separating these conversations by several weeks.

### Focus on Strengths
Gallup's research shows that focusing on strengths leads to greater improvement than focusing on weaknesses. This doesn't mean ignoring problems, but rather building from what people do well.

## Implementation Guide

1. **Train managers** in giving effective feedback (specific, timely, actionable)
2. **Redesign the process** around frequent conversations, not annual events
3. **Measure effectiveness** through employee development, not just completion rates
4. **Create psychological safety** so people can discuss challenges honestly

## The Results

Organizations that implement these changes see:
- Higher employee engagement
- Better development of talent
- Improved manager-employee relationships
- More accurate performance differentiation

Performance reviews don't have to be painful. When designed around psychological research rather than administrative convenience, they become valuable developmental tools.`,
    author: authors[1],
    publishedAt: new Date('2024-12-10'),
    tags: ['performance', 'feedback', 'management', 'development'],
    image: '/images/blog/performance-reviews.jpg',
  },
  {
    id: '3',
    title: 'The Psychology of Successful Organizational Change',
    slug: 'psychology-of-organizational-change',
    category: 'Change Management',
    readTime: 10,
    excerpt: 'Why do 70% of change initiatives fail? Understanding the psychological factors behind resistance and buy-in can dramatically improve success rates.',
    content: `The statistic is sobering: approximately 70% of organizational change initiatives fail to achieve their objectives. But this doesn't have to be inevitable.

## Understanding Resistance

Resistance to change isn't irrational - it's deeply psychological. Research identifies several core factors:

### Loss Aversion
People weight potential losses about twice as heavily as equivalent gains. Change always involves some loss (familiar processes, comfortable routines, established relationships), making resistance natural.

### Cognitive Load
Change requires mental effort. During transitions, people are learning new systems while maintaining current operations, creating cognitive overload.

### Identity Threat
Many changes threaten professional identity. A new system that makes hard-won expertise obsolete creates genuine psychological threat.

## The Neuroscience of Change

Brain imaging studies reveal that uncertainty activates the same neural regions as physical pain. This explains why ambiguous change initiatives generate such strong negative reactions.

## Evidence-Based Approaches

### 1. Create Psychological Safety
Before announcing change, ensure people feel safe expressing concerns. Research shows psychological safety is the strongest predictor of change success.

### 2. Frame Change Appropriately
How change is framed matters enormously:
- **Loss Frame**: "If we don't change, we'll lose market share"
- **Gain Frame**: "This change will enable us to serve customers better"

Research shows gain frames work better for promoting approach behaviors.

### 3. Provide Autonomy Within Structure
Give people choice in how to implement change, while being clear about non-negotiable elements. This reduces reactance while maintaining direction.

### 4. Acknowledge Losses
Don't pretend change has no downsides. Acknowledging what people are losing builds trust and allows genuine mourning of the old way.

### 5. Create Early Wins
Small, visible successes build momentum and confidence. Design change processes to generate wins within the first 90 days.

## The Communication Strategy

Research on change communication emphasizes:
- **Frequency over perfection**: Communicate often, even when you don't have all answers
- **Two-way dialogue**: Town halls are necessary but insufficient; include small group discussions
- **Middle managers**: They're the critical link; invest heavily in their understanding and capability

## Measuring Success

Track both outcomes and psychological indicators:
- Change adoption rates
- Psychological safety levels
- Manager confidence
- Employee engagement during transition

## Conclusion

Successful change isn't about overcoming resistance through force or persuasion. It's about understanding the psychological dynamics at play and designing change processes that work with human nature, not against it.

The organizations that master this approach don't just achieve higher success rates - they build change capability that becomes a competitive advantage.`,
    author: authors[2],
    publishedAt: new Date('2024-12-05'),
    tags: ['change-management', 'psychology', 'transformation', 'leadership'],
    image: '/images/blog/organizational-change.jpg',
  },
  {
    id: '4',
    title: 'Building High-Performing Teams: What Google\'s Research Teaches Us',
    slug: 'building-high-performing-teams',
    category: 'Team Effectiveness',
    readTime: 7,
    excerpt: 'Google\'s Project Aristotle studied hundreds of teams to understand what makes them effective. The findings surprised everyone.',
    content: `When Google set out to understand what made their teams successful, they expected to find that the best teams had the smartest people. They were wrong.

## Project Aristotle's Surprising Findings

After studying 180 teams, Google found that who is on a team matters far less than how team members interact.

### The Five Key Dynamics

1. **Psychological Safety** (most important by far)
2. **Dependability**
3. **Structure and Clarity**
4. **Meaning**
5. **Impact**

## Why Psychological Safety Dominates

Psychological safety - the belief that you can take risks without being embarrassed or punished - emerged as overwhelmingly the most important factor.

Teams with high psychological safety:
- Share more information
- Admit mistakes faster
- Learn from failures
- Generate more creative solutions

## Creating Psychological Safety

Research by Amy Edmondson at Harvard shows specific behaviors that build safety:

### Leader Behaviors
- Frame work as learning problems, not execution problems
- Acknowledge your own fallibility
- Model curiosity through questions
- Create structure for voice (e.g., round-robin input)

### Team Norms
- Equal speaking time (most predictive single indicator)
- High social sensitivity (reading others' emotional states)
- Explicit discussion of team norms

## The Dependability Factor

Beyond safety, effective teams need dependability - the ability to count on each other to do quality work on time.

Building dependability:
- Clear role definitions
- Transparent work processes
- Regular progress check-ins
- Supportive accountability

## Structure and Clarity

Teams need clear goals, roles, and execution plans. This doesn't mean micromanagement, but rather:
- Specific, challenging goals
- Clear ownership of deliverables
- Transparent decision-making processes
- Defined success metrics

## Practical Applications

### For Team Leaders
1. Start meetings with check-ins that encourage vulnerability
2. Explicitly discuss what psychological safety means
3. Celebrate failed experiments that led to learning
4. Create rituals that build connection

### For Team Members
1. Give others the benefit of the doubt
2. Share mistakes and learning
3. Ask for help when you need it
4. Acknowledge others' contributions

### For Organizations
1. Train leaders in creating psychological safety
2. Measure team effectiveness beyond productivity
3. Reward learning behaviors, not just results
4. Design performance systems that support collaboration

## The Bottom Line

The most effective teams aren't filled with star performers who work independently. They're groups of people who've built trust, communicate openly, and feel safe taking interpersonal risks.

This isn't soft - it's the foundation of hard results.`,
    author: authors[0],
    publishedAt: new Date('2024-11-28'),
    tags: ['teams', 'collaboration', 'psychological-safety', 'effectiveness'],
    image: '/images/blog/high-performing-teams.jpg',
  },
];