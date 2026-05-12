import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2Icon,
  XCircleIcon,
  PenToolIcon,
  GlobeIcon,
  ScaleIcon } from
'lucide-react';
export const GuidelinesPage: React.FC = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0
      }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <ScaleIcon size={32} />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-4">
          ⚖️ Guidance
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">
          Learn how to express yourself responsibly, respect others, and become
          a thoughtful digital citizen.
        </p>
      </div>

      {/* Do's and Don'ts of Expression */}
      <div className="mb-12">
        <h2 className="font-serif text-3xl font-bold text-text dark:text-text-dark mb-8 text-center">
          Do's and Don'ts of Expression
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Do's */}
          <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-sm border border-green-100 dark:border-green-900/30">
            <h3 className="font-serif text-2xl font-bold text-green-800 mb-6 flex items-center">
              <CheckCircle2Icon className="mr-3 text-green-500" size={28} />
              Do's of Expression
            </h3>
            <ul className="space-y-4">
              {[
              'Express yourself openly, honestly, and with purpose',
              'Use facts and evidence to support your opinions',
              'Ask questions freely to learn and grow',
              'Share diverse perspectives and personal experiences',
              'Be kind, empathetic, and considerate of others',
              'Listen actively to differing viewpoints before responding',
              'Acknowledge when you are wrong or misinformed',
              'Use inclusive language that welcomes all people',
              'Report concerns if you feel unsafe or witness harm'].
              map((item, idx) =>
              <li key={idx} className="flex items-start">
                  <div className="mt-1.5 mr-3 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-base">{item}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-sm border border-red-100 dark:border-red-900/30">
            <h3 className="font-serif text-2xl font-bold text-red-800 mb-6 flex items-center">
              <XCircleIcon className="mr-3 text-red-500" size={28} />
              Don'ts of Expression
            </h3>
            <ul className="space-y-4">
              {[
              'Use hate speech, slurs, or discriminatory language',
              'Engage in harassment, bullying, or intimidation',
              "Share personal information — yours or others'",
              'Post spam, misleading content, or misinformation',
              'Use threats, violent language, or incite harm',
              'Attack individuals instead of critiquing their ideas',
              "Dismiss or mock someone's lived experience",
              'Use sarcasm or irony to disguise harmful intent',
              'Spread rumors or unverified claims as truth'].
              map((item, idx) =>
              <li key={idx} className="flex items-start">
                  <div className="mt-1.5 mr-3 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-base">{item}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Responsible Posting Tips */}
      <div className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-border-dark">
        <h2 className="font-serif text-2xl font-bold text-text dark:text-text-dark mb-8 flex items-center">
          <PenToolIcon className="mr-3 text-primary" size={28} />
          Responsible Posting Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/70 dark:bg-surface-dark/70 p-6 rounded-2xl">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              Think before you type
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Take a moment to reflect before posting. Ask yourself: Is this
              true? Is it helpful? Is it kind? Would I say this in person?
            </p>
          </div>
          <div className="bg-white/70 dark:bg-surface-dark/70 p-6 rounded-2xl">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              Verify before you share
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Check your sources before sharing information. Misinformation
              spreads quickly — be part of the solution, not the problem.
            </p>
          </div>
          <div className="bg-white/70 dark:bg-surface-dark/70 p-6 rounded-2xl">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Respect privacy</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Never share someone else's personal details, photos, or private
              conversations without their explicit consent.
            </p>
          </div>
          <div className="bg-white/70 dark:bg-surface-dark/70 p-6 rounded-2xl">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              Assume good intentions
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Give people the benefit of the doubt. Tone is hard to read online
              — ask for clarification before reacting.
            </p>
          </div>
          <div className="bg-white/70 dark:bg-surface-dark/70 p-6 rounded-2xl">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              Use constructive language
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Frame disagreements as opportunities for learning. Say "I see it
              differently because…" instead of "You're wrong."
            </p>
          </div>
          <div className="bg-white/70 dark:bg-surface-dark/70 p-6 rounded-2xl">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              Know when to step away
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              If a conversation becomes heated, it's okay to take a break.
              Protecting your mental health is responsible posting too.
            </p>
          </div>
        </div>
      </div>

      {/* Digital Citizenship */}
      <div className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-border-dark">
        <h2 className="font-serif text-2xl font-bold text-text dark:text-text-dark mb-4 flex items-center">
          <GlobeIcon className="mr-3 text-blue-600" size={28} />
          Digital Citizenship
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
          Being a digital citizen means using technology responsibly, ethically,
          and safely. Just as we have rights and responsibilities in the
          physical world, the same applies online.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50/50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg">🛡️ Be Safe</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Protect your personal information</li>
              <li>• Use strong, unique passwords</li>
              <li>• Enable two-factor authentication</li>
              <li>• Recognize and avoid phishing attempts</li>
            </ul>
          </div>
          <div className="bg-green-50/50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800/30">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg">
              🤝 Be Respectful
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Treat others as you want to be treated</li>
              <li>• Stand up against cyberbullying</li>
              <li>• Respect intellectual property and credit creators</li>
              <li>• Value diverse opinions and cultures</li>
            </ul>
          </div>
          <div className="bg-purple-50/50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800/30">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg">
              🧠 Be Informed
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Think critically about what you read online</li>
              <li>• Understand your digital footprint</li>
              <li>• Know your digital rights</li>
              <li>• Stay updated on online safety practices</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium italic">
            "A good digital citizen contributes positively to the online
            community, respects others' rights, and uses technology to make the
            world a better place."
          </p>
        </div>
      </div>
    </motion.div>);

};