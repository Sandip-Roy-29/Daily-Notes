import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Terms() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link 
          to="/settings" 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Settings
        </Link>

        {/* Header */}
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: February 2026</p>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-6">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using Daily-Notes, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. User Accounts</h2>
            <p className="text-gray-300 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials 
              and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. User Content</h2>
            <p className="text-gray-300 leading-relaxed">
              You retain all rights to the content you create on Daily-Notes. We do not claim 
              ownership of your notes or personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Prohibited Activities</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the service</li>
              <li>Upload malicious code or viruses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Service Availability</h2>
            <p className="text-gray-300 leading-relaxed">
              We strive to keep Daily-Notes available 24/7, but we do not guarantee uninterrupted 
              access. We may perform maintenance or updates that temporarily affect availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Termination</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to terminate or suspend your account at any time for violations 
              of these terms or for any other reason at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update these terms from time to time. We will notify users of significant 
              changes via email or through the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Contact</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have questions about these terms, please contact us at support@daily-notes.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default Terms;