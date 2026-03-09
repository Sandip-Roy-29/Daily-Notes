import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, Bug, Github, Send, CheckCircle, AlertCircle } from "lucide-react";
import Button from "../components/ui/Button";
import { sendMessage } from "../api/contact.api";

export default function Contact() {
  const [type, setType] = useState("support");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      setError("");
      setSubmitted(false);

      await sendMessage({ type, subject, message });

      setSubmitted(true);
      setSubject("");
      setMessage("");
      setType("support");

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);

    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.response?.data?.message || "Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Contact & Support</h1>
          <p className="text-gray-400 text-lg">
            Need help? Found a bug? Have feedback? We're here to assist you.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          
          {/* Support */}
          <button
            onClick={() => setType("support")}
            className={`bg-gray-900 border rounded-xl p-6 text-left transition-all ${
              type === "support"
                ? "border-blue-500 ring-2 ring-blue-500/20"
                : "border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              type === "support"
                ? "bg-blue-600/20 border border-blue-600/30"
                : "bg-blue-600/10 border border-blue-600/20"
            }`}>
              <Mail size={24} className="text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Support</h3>
            <p className="text-sm text-gray-400">
              Get help with your account or features
            </p>
          </button>

          {/* Feedback */}
          <button
            onClick={() => setType("feedback")}
            className={`bg-gray-900 border rounded-xl p-6 text-left transition-all ${
              type === "feedback"
                ? "border-green-500 ring-2 ring-green-500/20"
                : "border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              type === "feedback"
                ? "bg-green-600/20 border border-green-600/30"
                : "bg-green-600/10 border border-green-600/20"
            }`}>
              <MessageSquare size={24} className="text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Feedback</h3>
            <p className="text-sm text-gray-400">
              Share your thoughts and ideas
            </p>
          </button>

          {/* Bug Report */}
          <button
            onClick={() => setType("bug")}
            className={`bg-gray-900 border rounded-xl p-6 text-left transition-all ${
              type === "bug"
                ? "border-red-500 ring-2 ring-red-500/20"
                : "border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              type === "bug"
                ? "bg-red-600/20 border border-red-600/30"
                : "bg-red-600/10 border border-red-600/20"
            }`}>
              <Bug size={24} className="text-red-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Bug Report</h3>
            <p className="text-sm text-gray-400">
              Report technical issues
            </p>
          </button>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

          {/* Success Message */}
          {submitted && (
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
              <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-400 font-medium mb-1">Message sent successfully!</p>
                <p className="text-green-300/80 text-sm">
                  We've received your message and will respond within 24-48 hours.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-medium mb-1">Failed to send message</p>
                <p className="text-red-300/80 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Category - Hidden but shown as badge */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Selected Category
              </label>
              <div className="flex gap-2">
                <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  type === "support"
                    ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                    : type === "feedback"
                    ? "bg-green-600/20 text-green-400 border border-green-600/30"
                    : "bg-red-600/20 text-red-400 border border-red-600/30"
                }`}>
                  {type === "support" ? "Support Request" : type === "feedback" ? "Feedback" : "Bug Report"}
                </span>
              </div>
              <input type="hidden" value={type} />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={
                  type === "support"
                    ? "e.g., Help with password reset"
                    : type === "feedback"
                    ? "e.g., Suggestion for new feature"
                    : "e.g., Error when creating note"
                }
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  type === "support"
                    ? "Describe your issue in detail..."
                    : type === "feedback"
                    ? "Share your thoughts and ideas..."
                    : "Please describe the bug, steps to reproduce, and what you expected to happen..."
                }
                rows={8}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                {type === "bug" && "💡 Tip: Include browser/device info and screenshots if possible"}
                {type === "feedback" && "💡 We read every piece of feedback and use it to improve Daily-Notes"}
                {type === "support" && "💡 Include as much detail as possible for faster assistance"}
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Alternative Contact Methods */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* GitHub Issues */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600/20 border border-purple-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Github size={24} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">Prefer GitHub?</h3>
                <p className="text-sm text-gray-400 mb-4">
                  You can open an issue or discussion on our GitHub repository.
                </p>
                <a
                  href="https://github.com/Sandip-Roy-29/Daily-Notes/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Open GitHub Issue
                  <ArrowLeft size={14} className="rotate-180" />
                </a>
              </div>
            </div>
          </div>

          {/* Direct Email */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail size={24} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">Email Us Directly</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Send an email to our support team.
                </p>
                <a
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors break-all"
                >
                  dailynotes24x7@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <CheckCircle size={18} className="text-green-400" />
            Response Time
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            We typically respond to all messages within <strong className="text-white">24-48 hours</strong> during business days. 
            For urgent issues, please include "URGENT" in the subject line. Bug reports are prioritized and 
            usually receive a response within <strong className="text-white">12 hours</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}