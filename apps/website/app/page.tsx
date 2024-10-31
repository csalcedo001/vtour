'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Play } from 'lucide-react'

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  const [ref1, inView1] = useInView({ triggerOnce: true })
  const [ref2, inView2] = useInView({ triggerOnce: true })
  const [ref3, inView3] = useInView({ triggerOnce: true })

  useEffect(() => {
    // Simulating a login check
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
    }
    checkLoginStatus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle waitlist registration here
    console.log('Registered email:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Mic className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">vTour</span>
        </div>
        {isLoggedIn ? (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <Button variant="outline">Join the Waitlist</Button>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">The Voice Onboarding Agent</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex space-x-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow"
          />
          <Button type="submit">Register</Button>
        </form>
      </section>

      {/* Scrolling Sections */}
      <motion.section
        ref={ref1}
        initial={{ opacity: 0, y: 50 }}
        animate={inView1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="py-20 text-center"
      >
        <h2 className="text-3xl font-semibold mb-4">Revolutionize Your Onboarding</h2>
        <p className="max-w-2xl mx-auto text-gray-400">
          vTour uses cutting-edge AI to create personalized voice-guided tours for your product or service.
        </p>
      </motion.section>

      <motion.section
        ref={ref2}
        initial={{ opacity: 0, y: 50 }}
        animate={inView2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="py-20 text-center bg-gray-800"
      >
        <h2 className="text-3xl font-semibold mb-4">Engage Users Like Never Before</h2>
        <p className="max-w-2xl mx-auto text-gray-400">
          Our AI adapts to each user, providing a tailored experience that boosts engagement and retention.
        </p>
      </motion.section>

      <motion.section
        ref={ref3}
        initial={{ opacity: 0, y: 50 }}
        animate={inView3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="py-20 text-center"
      >
        <h2 className="text-3xl font-semibold mb-4">Seamless Integration</h2>
        <p className="max-w-2xl mx-auto text-gray-400">
          Easily integrate vTour into your existing platforms and watch your user experience transform.
        </p>
      </motion.section>

      {/* Video Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto aspect-video bg-gray-800 flex items-center justify-center rounded-lg overflow-hidden">
          <Button variant="outline" size="lg" className="flex items-center space-x-2">
            <Play className="h-6 w-6" />
            <span>Watch Demo</span>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Our Story</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 vTour. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}