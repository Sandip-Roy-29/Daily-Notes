import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Privacy() {
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
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: February 2026</p>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We collect the following information:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>
                <strong>Account Information:</strong> Username, email address
              </li>
              <li>
                <strong>Content:</strong> Notes and content you create
              </li>
              <li>
                <strong>Usage Data:</strong> Log data, device information, IP
                address
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Provide and maintain the Daily-Notes service</li>
              <li>Authenticate your account and prevent fraud</li>
              <li>Send important service updates</li>
              <li>Improve our service and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              3. Data Storage and Security
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Your data is stored securely in encrypted databases. We use
              industry-standard security measures to protect your information,
              including HTTPS encryption, secure password hashing, and regular
              security audits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              4. Data Sharing
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We do NOT sell your personal information. We may share data only
              in these cases:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              5. Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We use cookies for authentication and to remember your
              preferences. These are essential for the service to function
              properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              6. Your Rights
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Update or correct your information</li>
              <li>Delete your account and data</li>
              <li>Export your notes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              7. Data Retention
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your data as long as your account is active. When you
              delete your account, we permanently delete all your personal
              information and notes within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              8. Changes to Privacy Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this privacy policy from time to time. We will
              notify you of significant changes via email or through the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              9. Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If you have questions about this privacy policy or your data,
              please{" "}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
              >
                contact
              </Link>{" "}
              us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
