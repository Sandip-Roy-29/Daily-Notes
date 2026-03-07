import { Link } from "react-router-dom";
import { FileText, Lock, Zap, Cloud, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-400">Simple. Powerful. Free forever.</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your thoughts,
            <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mt-2">
              organized effortlessly
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Daily-Notes is a simple, powerful note-taking app that helps you capture ideas, 
            organize your thoughts, and stay productive. No clutter, just your notes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link to="/auth">
              <Button 
                variant="primary" 
                className="px-8 py-3 text-lg w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Button>
            </Link>
            <a href="#features">
              <Button 
                variant="outline" 
                className="px-8 py-3 text-lg w-full sm:w-auto bg-transparent border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white"
              >
                Learn More
              </Button>
            </a>
          </div>

          <p className="text-sm text-gray-500">
            No credit card required • Free forever • Start in seconds
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to stay organized
          </h2>
          <p className="text-gray-400 text-lg">
            Powerful features in a simple, intuitive interface
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-gray-700 transition-colors group">
            <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors">
              <FileText className="text-blue-500" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Rich Notes
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Create detailed notes with multiple content blocks. Keep everything organized in one place.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-gray-700 transition-colors group">
            <div className="w-14 h-14 bg-green-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600/20 transition-colors">
              <Lock className="text-green-500" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Secure & Private
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Your notes are encrypted and protected. Only you have access to your personal thoughts.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-gray-700 transition-colors group">
            <div className="w-14 h-14 bg-purple-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600/20 transition-colors">
              <Zap className="text-purple-500" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Lightning Fast
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Create, edit, and search your notes instantly. No lag, no waiting, just pure productivity.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-gray-700 transition-colors group">
            <div className="w-14 h-14 bg-orange-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600/20 transition-colors">
              <Cloud className="text-orange-500" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Cloud Sync
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Access your notes from anywhere. Your data is safely stored in the cloud, always available.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-900/50 py-20 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple to use, powerful to master
            </h2>
            <p className="text-gray-400 text-lg">
              Get started in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-600/20">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Create an Account
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Sign up in seconds with just your email. No complex forms, no hassle.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-600/20">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Start Writing
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Create your first note and add content. It's as simple as typing.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-600/20">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Stay Organized
              </h3>
              <p className="text-gray-400 leading-relaxed">
                View, edit, and manage all your notes from one clean dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-white/10"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to get organized?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Daily-Notes with their thoughts and ideas.
            </p>
            <Link to="/auth">
              <Button 
                className=" hover:bg-blue-650 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl inline-flex items-center gap-2"
              >
                Start Taking Notes Now
                <ArrowRight size={20} />
              </Button>
            </Link>
            <p className="mt-6 text-blue-100 text-sm">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText size={18} className="text-white" />
                </div>
                <span className="text-white font-semibold text-lg">Daily-Notes</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your simple, powerful note-taking companion. Capture ideas, organize thoughts, and stay productive.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <Link to="/auth" className="text-gray-400 hover:text-white transition-colors">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/auth" className="text-gray-400 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; 2026 Daily-Notes. All rights reserved. Built with care for your productivity.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;