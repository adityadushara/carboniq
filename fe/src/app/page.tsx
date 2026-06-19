import Link from "next/link"
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Shield, Users, Zap, TrendingDown, Target, FileText, CheckCircle2 } from "lucide-react"

export default async function LandingPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  if (props.searchParams) {
    const searchParams = await props.searchParams;
    if (searchParams?.code) {
      redirect(`/auth/callback?code=${searchParams.code}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="px-6 lg:px-14 py-4 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-xl">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">CarbonIQ</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</Link>
          <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Sign In</Link>
          <Button render={<Link href="/signup" />} nativeButton={false} className="rounded-md shadow-sm">
            Get Started
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* SECTION 1 — HERO */}
        <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
          
          <div className="container px-4 md:px-6 mx-auto text-center space-y-8 relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
              Track Your Carbon Footprint.<br className="hidden md:block" />
              Reduce Your Impact.<br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">
                Build Sustainable Habits.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              CarbonIQ helps you understand, track, and reduce your carbon footprint through AI-powered insights and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
              <Button size="lg" render={<Link href="/signup" />} nativeButton={false} className="rounded-md px-8 h-14 text-base shadow-lg hover:-translate-y-1 transition-all">
                Get Started
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/login" />} nativeButton={false} className="rounded-md px-8 h-14 text-base bg-background/50 hover:bg-secondary/50 transition-all">
                Sign In
              </Button>
            </div>
            
            {/* Dashboard Preview Mockup */}
            <div className="mt-16 relative max-w-5xl mx-auto rounded-xl border border-border/50 shadow-2xl bg-card overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              <div className="border-b border-border/50 bg-muted/50 p-3 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="p-8 grid grid-cols-3 gap-6 opacity-80 pointer-events-none">
                 <div className="col-span-3 border border-border/50 rounded-lg p-6 flex justify-between items-center bg-background">
                    <div>
                      <div className="h-6 w-48 bg-muted rounded mb-2"></div>
                      <div className="h-4 w-32 bg-muted/50 rounded"></div>
                    </div>
                    <div className="h-10 w-32 bg-primary/20 rounded"></div>
                 </div>
                 <div className="col-span-1 h-32 border border-border/50 rounded-lg p-4 bg-background">
                    <div className="h-4 w-24 bg-muted rounded mb-4"></div>
                    <div className="h-8 w-16 bg-primary/40 rounded"></div>
                 </div>
                 <div className="col-span-1 h-32 border border-border/50 rounded-lg p-4 bg-background">
                    <div className="h-4 w-24 bg-muted rounded mb-4"></div>
                    <div className="h-8 w-16 bg-blue-500/40 rounded"></div>
                 </div>
                 <div className="col-span-1 h-32 border border-border/50 rounded-lg p-4 bg-background">
                    <div className="h-4 w-24 bg-muted rounded mb-4"></div>
                    <div className="h-8 w-16 bg-emerald-500/40 rounded"></div>
                 </div>
                 <div className="col-span-2 h-64 border border-border/50 rounded-lg p-4 bg-background flex items-end gap-2">
                    {[40, 70, 45, 90, 65, 85, 30].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${h}%` }}></div>
                    ))}
                 </div>
                 <div className="col-span-1 h-64 border border-border/50 rounded-lg p-4 bg-background flex flex-col justify-between">
                    <div className="h-4 w-full bg-muted rounded"></div>
                    <div className="h-4 w-5/6 bg-muted rounded"></div>
                    <div className="h-4 w-4/6 bg-muted rounded"></div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — FEATURES */}
        <section id="features" className="py-24 bg-secondary/30 border-y border-border/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Powerful Climate Tech Features</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to take control of your environmental impact.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: TrendingDown, title: "Carbon Tracking", desc: "Instantly log your meals, transport, and energy use. Watch your footprint update in real-time." },
                { icon: Zap, title: "AI Sustainability Coach", desc: "Get personalized, actionable advice from an AI trained on modern climate science." },
                { icon: Target, title: "Smart Goals", desc: "Set dynamic reduction targets and track your progress daily towards net-zero." },
                { icon: FileText, title: "Carbon Reports", desc: "Generate professional monthly footprint reports to share with friends or employers." },
                { icon: Shield, title: "Forecasting", desc: "See where your emissions are heading next month based on your current habits." },
                { icon: Users, title: "Community Challenges", desc: "Join global eco-challenges and compete with friends on the public leaderboard." }
              ].map((f, i) => (
                <div key={i} className="bg-background border border-border/50 p-6 rounded-xl hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-5 text-primary group-hover:scale-110 transition-transform">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — HOW IT WORKS */}
        <section id="how-it-works" className="py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How CarbonIQ Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A seamless path to reducing your footprint.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10 -translate-y-1/2"></div>
              {[
                { step: "1", title: "Track Activities", desc: "Log your daily transport, meals, and energy." },
                { step: "2", title: "Analyze Impact", desc: "See your exact carbon footprint calculated instantly." },
                { step: "3", title: "Receive Insights", desc: "Get AI-powered tips tailored to your lifestyle." },
                { step: "4", title: "Reduce Emissions", desc: "Take action and watch your carbon score improve." }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center bg-background">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-6 shadow-lg ring-4 ring-background">
                    {s.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — BENEFITS */}
        <section className="py-24 bg-primary/5 border-y border-border/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why choose CarbonIQ?</h2>
                <div className="space-y-4">
                  {[
                    "Understand your true environmental impact",
                    "Build sustainable habits effortlessly",
                    "Track progress over time with beautiful charts",
                    "Get actionable AI-powered recommendations",
                    "Join a thriving sustainability community"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                      <span className="text-lg font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                <h3 className="text-2xl font-bold mb-4">"CarbonIQ changed how I live."</h3>
                <p className="text-muted-foreground text-lg italic mb-6">
                  "Before using this app, I had no idea how much carbon my daily commute and diet generated. The AI coach gave me practical swaps that reduced my footprint by 30% in two months without sacrificing my lifestyle."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary"></div>
                  <div>
                    <div className="font-semibold">Sarah Jenkins</div>
                    <div className="text-sm text-muted-foreground">Eco Warrior Level</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — FAQ */}
        <section id="faq" className="py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "What is CarbonIQ?", a: "CarbonIQ is an intelligent carbon footprint tracker that uses data and AI to help you understand and reduce your environmental impact." },
                { q: "How are emissions calculated?", a: "We use standardized global emissions factors combined with your specific inputs (like vehicle type, diet, and energy usage) to provide an accurate estimate." },
                { q: "Is my data secure?", a: "Yes. Your data is encrypted and securely stored. We never sell your personal activity data to third parties." },
                { q: "Do I need technical knowledge?", a: "Not at all. The platform is designed to be intuitive and easy to use for everyone, regardless of technical background." },
                { q: "Can I use it for free?", a: "Yes! CarbonIQ offers a powerful free tier that includes tracking, standard analytics, and community features." }
              ].map((faq, i) => (
                <details key={i} className="group border border-border/50 rounded-lg bg-card overflow-hidden">
                  <summary className="font-medium p-5 cursor-pointer list-none flex justify-between items-center hover:bg-secondary/50 transition-colors">
                    {faq.q}
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <div className="p-5 pt-0 text-muted-foreground text-sm border-t border-border/50 bg-secondary/10">
                    <p className="mt-4">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 — FINAL CTA */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Start Building a Greener Future Today</h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Join thousands of users who are taking control of their environmental impact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" render={<Link href="/signup" />} nativeButton={false} className="rounded-md px-10 h-14 text-lg font-semibold hover:scale-105 transition-all">
                Create Account
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/login" />} nativeButton={false} className="rounded-md px-10 h-14 text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-all">
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 9 — FOOTER */}
      <footer className="border-t border-border/50 py-12 bg-card">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl tracking-tight">CarbonIQ</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                The intelligent platform for tracking, understanding, and reducing your personal carbon footprint.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link></li>
                <li><Link href="/login" className="hover:text-primary transition-colors">Log In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} CarbonIQ Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-foreground transition-colors" aria-label="Twitter">Twitter</Link>
              <Link href="#" className="hover:text-foreground transition-colors" aria-label="LinkedIn">LinkedIn</Link>
              <Link href="#" className="hover:text-foreground transition-colors" aria-label="GitHub">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
