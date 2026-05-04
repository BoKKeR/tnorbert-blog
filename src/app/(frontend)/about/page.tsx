import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'About — deployonfri.day',
}

const skills = [
  { category: 'Infrastructure & DevOps', items: ['Kubernetes', 'Docker', 'Helm', 'Terraform', 'CI/CD pipelines', 'Self-hosting'] },
  { category: 'Backend & APIs', items: ['TypeScript', 'Node.js', 'OAuth2 / OIDC', 'REST', 'GraphQL', 'PostgreSQL'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Payload CMS'] },
  { category: 'Hobby & Hardware', items: ['Electronics prototyping', 'Arduino / ESP32', 'PCB design', '3D printing', 'Home automation'] },
]

const timeline = [
  {
    year: '2024 – present',
    title: 'Senior Software Engineer',
    org: 'Independent / Freelance',
    description:
      'Building and maintaining self-hosted infrastructure, writing about Kubernetes, OAuth2, and TypeScript on Fridays. Tinkering with electronics and personal projects on Saturdays.',
  },
  {
    year: '2021 – 2024',
    title: 'Platform Engineer',
    org: 'Tech Company',
    description:
      'Designed and operated Kubernetes clusters for production workloads. Implemented OAuth2/OIDC authentication flows and internal developer tooling.',
  },
  {
    year: '2018 – 2021',
    title: 'Full-Stack Developer',
    org: 'Software Studio',
    description:
      'Delivered web applications using React and Node.js. Introduced TypeScript across the team and championed automated testing practices.',
  },
  {
    year: '2014 – 2018',
    title: 'BSc Computer Science',
    org: 'University',
    description:
      'Graduated with honours. Final-year project: a distributed task scheduler with fault-tolerant consensus. First electronics experiments during this period.',
  },
]

const projects = [
  {
    name: 'deployonfri.day',
    description: 'This blog — a Payload CMS + Next.js 15 site with a mid-century modern redesign, Day/Night feed toggle, and Giscus comments.',
    tags: ['Next.js', 'Payload CMS', 'TypeScript'],
  },
  {
    name: 'k8s-homelab',
    description: 'A fully self-hosted Kubernetes cluster running on bare-metal hardware at home. Includes Argo CD, Longhorn storage, and Traefik ingress.',
    tags: ['Kubernetes', 'Self-hosting', 'DevOps'],
  },
  {
    name: 'oauth2-proxy-config',
    description: 'Opinionated OAuth2 Proxy configuration templates for common identity providers, with Helm chart and documentation.',
    tags: ['OAuth2', 'Kubernetes', 'Security'],
  },
  {
    name: 'esp32-sensor-hub',
    description: 'A weekend electronics project: an ESP32-based sensor hub that publishes temperature, humidity, and air quality data to Home Assistant via MQTT.',
    tags: ['Electronics', 'ESP32', 'Home Automation'],
  },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com', icon: '⌥' },
  { label: 'Mastodon', href: 'https://mastodon.social', icon: '🐘' },
  { label: 'RSS Feed', href: '/posts-sitemap.xml', icon: '⊕' },
  { label: 'Email', href: 'mailto:hello@deployonfri.day', icon: '✉' },
]

export default function AboutPage() {
  return (
    <main className="pt-16 pb-24">
      {/* Bio section */}
      <section aria-labelledby="bio-heading" className="container mb-16">
        <div className="max-w-[48rem] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            ← All posts
          </Link>

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Author photo placeholder */}
            <div
              className="shrink-0 w-32 h-32 rounded bg-primary/20 flex items-center justify-center text-primary text-4xl font-serif font-bold select-none"
              role="img"
              aria-label="Author photo placeholder"
            >
              D
            </div>

            <div className="prose dark:prose-invert">
              <h1 id="bio-heading" className="mt-0">
                About the Author
              </h1>
              <p className="lead">
                I'm a software engineer who ships technical posts on Fridays and hobby projects on Saturdays.
              </p>
              <p>
                By day I work with Kubernetes, OAuth2, TypeScript, and self-hosted infrastructure — the kind of
                problems that are genuinely interesting to solve and worth writing about. By weekend I'm at the
                workbench with a soldering iron, an ESP32, and a half-finished idea.
              </p>
              <p>
                This blog is my way of thinking out loud. Friday posts are technical deep-dives: cluster
                configurations, authentication flows, language features, and the occasional war story. Saturday
                posts are looser: electronics builds, personal projects, and whatever I'm currently obsessing over.
              </p>
              <p>
                I believe in self-hosting, open standards, and writing things down. If something took me a day to
                figure out, it should take you ten minutes to read.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CV / Achievements section */}
      <section aria-labelledby="cv-heading" className="container mb-16">
        <div className="max-w-[48rem] mx-auto">
          <div className="prose dark:prose-invert max-w-none mb-10">
            <h2 id="cv-heading">Experience &amp; Projects</h2>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
              Timeline
            </h3>
            <ol className="relative border-l border-border space-y-8 pl-6">
              {timeline.map((entry) => (
                <li key={entry.year} className="relative">
                  <span className="absolute -left-[1.625rem] top-1 w-3 h-3 rounded-sm bg-primary" aria-hidden="true" />
                  <time className="text-xs font-mono text-muted-foreground">{entry.year}</time>
                  <h4 className="font-serif font-bold text-foreground mt-0.5 mb-0.5">
                    {entry.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-1">{entry.org}</p>
                  <p className="text-sm text-foreground/80">{entry.description}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Skills */}
          <div className="mb-12">
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
              Skills
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((group) => (
                <div key={group.category} className="border border-border rounded p-4">
                  <dt className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                    {group.category}
                  </dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <li
                          key={skill}
                          className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Notable projects */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
              Notable Projects
            </h3>
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project.name} className="border border-border rounded p-4">
                  <article>
                    <h4 className="font-serif font-bold text-foreground mb-1">{project.name}</h4>
                    <p className="text-sm text-foreground/80 mb-3">{project.description}</p>
                    <ul className="flex flex-wrap gap-2" aria-label={`Tags for ${project.name}`}>
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact / social links */}
      <section aria-labelledby="contact-heading" className="container">
        <div className="max-w-[48rem] mx-auto">
          <div className="prose dark:prose-invert max-w-none mb-8">
            <h2 id="contact-heading">Get in Touch</h2>
            <p>
              The best way to reach me is by email or via GitHub. I'm also on Mastodon if you prefer the
              fediverse. If you found a post useful, a reply or a star on the relevant repo is always
              appreciated.
            </p>
          </div>

          <nav aria-label="Social and contact links">
            <ul className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded border border-border text-foreground hover:border-primary hover:text-primary transition-colors text-sm font-mono"
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span aria-hidden="true">{link.icon}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  )
}
