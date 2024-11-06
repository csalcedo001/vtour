'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import logo from '@/public/logo.svg'

export default function LandingPage() {
  const [, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.5 })
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.5 })
  const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.5 })
  // const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    // Simulating a login check
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
    }
    checkLoginStatus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      console.log('Registered email:', email);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section')
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-screen h-screen bg-black text-white overflow-y-auto scrollbar-hide bg black">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-30 bg-black">
        <div className="flex items-center space-x-2 px-5">
          <Image src={logo} alt='vTour' width={60} />
          <span className="text-3xl font-medium text-white">vTour</span>
        </div>
        {/* {isLoggedIn ? (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <Button variant="outline" className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black">
            Join the Waitlist
          </Button>
        )} */}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen px-2 flex flex-col justify-center items-center relative overflow-hidden">
        <div className="bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/20 pointer-events-none"></div>
        <div className="text-center mb-8 z-10 px-10 mt-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
            The Open Source AI Onboarding Agent.
          </h1>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex space-x-2 mb-8">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow bg-blue-900/20 border-blue-400 text-white placeholder-blue-200/50"
            />
            <Button type="submit" className="bg-blue-500 hover:bg-blue-400 text-black font-semibold">Join the waitlist</Button>
          </form>
        </div>

        {/* Demo Video Section */}
        <div className="w-full max-w-2xl sm:max-w-4xl mx-auto aspect-video bg-blue-900/10 rounded-lg overflow-hidden border border-blue-400/30 z-10">
          <div className="relative pb-[62.5%] h-0">
            <iframe
              src="https://www.loom.com/embed/d5738901641940ffaf431c7756a98e99?sid=6d92a1ac-50f1-4f88-8b10-c6f2d25f6402"
              frameBorder="0"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
          {/* <video
            className="w-full h-full object-cover"
            controls
            poster="/placeholder.svg?height=720&width=1280"
          >
            <source src="https://www.loom.com/share/d5738901641940ffaf431c7756a98e99" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>

        <button onClick={scrollToContent} className="absolute bottom-8 animate-bounce text-blue-400 z-10">
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>

      {/* Scrolling Sections */}
      <div id="content-section">
        {/* <motion.section
          ref={ref4}
          initial={{ opacity: 0, y: 100 }}
          animate={inView4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-20 px-2 text-center relative overflow-hidden"
        >
          <div className="w-full max-w-4xl mx-auto aspect-video bg-blue-900/10 rounded-lg overflow-hidden border border-blue-400/30 mb-12 z-10">

            <div className="relative pb-[62.5%] h-0">
              <iframe
                src="https://www.loom.com/embed/d5738901641940ffaf431c7756a98e99?sid=6d92a1ac-50f1-4f88-8b10-c6f2d25f6402"
                frameBorder="0"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
            <video
              className="w-full h-full object-cover"
              controls
              poster="/placeholder.svg?height=720&width=1280"
            >
              <source src="/placeholder.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.section> */}

        <motion.section
          ref={ref1}
          initial={{ opacity: 0, y: 100 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold mb-4 text-blue-400">Revolutionize Your Onboarding</h2>
            <p className="max-w-2xl mx-auto text-blue-100">
              vTour uses cutting-edge AI to create personalized voice-guided tours for your product or service.
            </p>
          </div>
        </motion.section>

        <motion.section
          ref={ref2}
          initial={{ opacity: 0, y: 100 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold mb-4 text-blue-400">Engage Users Like Never Before</h2>
            <p className="max-w-2xl mx-auto text-blue-100">
              Our AI adapts to each user, providing a tailored experience that boosts engagement and retention.
            </p>
          </div>
        </motion.section>

        <motion.section
          ref={ref3}
          initial={{ opacity: 0, y: 100 }}
          animate={inView3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold mb-4 text-blue-400">Seamless Integration</h2>
            <p className="max-w-2xl mx-auto text-blue-100">
              Easily integrate vTour into your existing platforms and watch your user experience transform.
            </p>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-blue-900/10 py-10">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white">Our Story</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Team</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white">Features</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-blue-300">
            <p>&copy; 2024 vTour. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}