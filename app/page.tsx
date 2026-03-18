'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plane, Shield, Clock, Users, Star, ChevronRight, Phone, Mail, MapPin } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">AD</span>
              </div>
              <span className="text-2xl font-bold">
                Aero<span className="text-blue-600">Desk</span>
              </span>
              <span className="ml-3 text-xs text-gray-500 font-light hidden lg:block">Organized Charter Platform</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">How It Works</Link>
              <Link href="#operators" className="text-gray-700 hover:text-blue-600 transition">Operators</Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Shield className="h-4 w-4 mr-2" />
                Trusted by 500+ aviation partners
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Fly Smarter.
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Stay Premium.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                India's most organized private aviation platform. Book charter flights, empty leg seats, and corporate travel with complete transparency.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">GST Compliant</p>
                    <p className="text-sm text-gray-500">Verified operators</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">24/7 Support</p>
                    <p className="text-sm text-gray-500">Always available</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">100+ Operators</p>
                    <p className="text-sm text-gray-500">Pan India network</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8">
                    Get Started
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline">
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-500 ml-2">Quick Search</span>
                </div>
                
                {/* Quick Search Widget */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500">From</label>
                      <input type="text" placeholder="Mumbai (BOM)" className="w-full p-3 border rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">To</label>
                      <input type="text" placeholder="Delhi (DEL)" className="w-full p-3 border rounded-lg text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500">Date</label>
                      <input type="date" className="w-full p-3 border rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Passengers</label>
                      <select className="w-full p-3 border rounded-lg text-sm">
                        <option>1 Passenger</option>
                        <option>2 Passengers</option>
                        <option>3 Passengers</option>
                        <option>4+ Passengers</option>
                      </select>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    Search Available Flights
                  </Button>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">500+</p>
                    <p className="text-xs text-gray-500">Aircraft</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">100+</p>
                    <p className="text-xs text-gray-500">Operators</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">10K+</p>
                    <p className="text-xs text-gray-500">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">A Comprehensive Aviation Ecosystem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All your charter needs, coordinated through one intelligent platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Plane className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flight Request & Lifecycle Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Create charter requests, specify flight and accommodation needs, and maintain visibility across the full request lifecycle.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Operator Quotation & Fleet Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Operators can respond to charter requests with structured quotations, manage fleet availability, and create empty-leg opportunities.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Corporate Travel Desk</h3>
              <p className="text-gray-600 leading-relaxed">
                Corporate Travel Desk users can create charter requests for employees, request jet seat allocations, and coordinate accommodation needs.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Available Jet Seat Allocation</h3>
              <p className="text-gray-600 leading-relaxed">
                Access seats on select private jet flights operating on predefined routes at discounted rates.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hotel Partner Accommodation</h3>
              <p className="text-gray-600 leading-relaxed">
                Hotels maintain inventory visibility, configure stay availability, and handle accommodation requests tied to charter activity.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Star className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Assisted Compliance Review</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-assisted logic evaluates workflow inputs and highlights potential inconsistencies for administrative review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How AeroDesk Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, transparent, and efficient - from request to departure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">1</div>
                <div className="absolute top-10 left-1/2 w-full h-0.5 bg-blue-200 hidden md:block" style={{ transform: 'translateX(50%)' }}></div>
              </div>
              <h3 className="text-xl font-bold mb-3">Create Request</h3>
              <p className="text-gray-600">Submit your charter requirements with flight details, passenger count, and special needs.</p>
            </div>

            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">2</div>
                <div className="absolute top-10 left-1/2 w-full h-0.5 bg-blue-200 hidden md:block" style={{ transform: 'translateX(50%)' }}></div>
              </div>
              <h3 className="text-xl font-bold mb-3">Receive Quotes</h3>
              <p className="text-gray-600">Operators bid on your request with competitive quotes and aircraft options.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-3">Fly Premium</h3>
              <p className="text-gray-600">Select the best quote, complete payment, and enjoy your private charter experience.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8">
                Start Your First Booking
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What our clients say about AeroDesk
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">"AeroDesk has transformed how we manage executive travel. The platform is intuitive and the support team is exceptional."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">RS</div>
                <div className="ml-3">
                  <p className="font-semibold">Rahul Sharma</p>
                  <p className="text-sm text-gray-500">VP Operations, Reliance Industries</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">"As an operator, AeroDesk helps us maximize fleet utilization. The empty leg feature alone has increased our revenue by 30%."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">AK</div>
                <div className="ml-3">
                  <p className="font-semibold">Ajay Kumar</p>
                  <p className="text-sm text-gray-500">Director, Delta Air Charter</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">"The corporate travel desk features are exactly what we needed. Multi-level approvals and budget tracking are game-changers."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">PM</div>
                <div className="ml-3">
                  <p className="font-semibold">Priya Menon</p>
                  <p className="text-sm text-gray-500">Travel Manager, Tata Motors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience Premium Travel?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join India's fastest growing private aviation platform today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Get Started Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-xl">AD</span>
                </div>
                <span className="text-2xl font-bold">AeroDesk</span>
              </div>
              <p className="text-gray-400 text-sm">
                India's most organized private aviation platform for charters, empty legs, and corporate travel.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition">How It Works</Link></li>
                <li><Link href="/operators" className="hover:text-white transition">For Operators</Link></li>
                <li><Link href="/corporate" className="hover:text-white transition">For Corporates</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/safety" className="hover:text-white transition">Safety Standards</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition">GST Compliance</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span>+91 9897 54038</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span>+91 22 2822 2202</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" />
                  <span>info@aerodesk.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5" />
                  <span>Mumbai, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 AeroDesk Aviation Infrastructure. NSOP Coordination Only. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
