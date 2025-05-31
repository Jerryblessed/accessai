import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, Cog, Eye, KeyRound, Braces } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import AccessibilityControls from '../components/AccessibilityControls';
import FeatureCard from '../components/features/FeatureCard';
import AIAssistant from '../components/AIAssistant';
import VoiceCommandListener from '../components/accessibility/VoiceCommandListener';
import TextToSpeech from '../components/accessibility/TextToSpeech';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const { preferences } = usePreferences();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: preferences.reducedMotion ? 0.1 : 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: preferences.reducedMotion ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: preferences.reducedMotion ? 0.1 : 0.5 }
    }
  };
  
  const handleCommand = (command: string) => {
    console.log('Received voice command:', command);
  };
  
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${
      preferences.fontSize === 'large' ? 'text-lg' :
      preferences.fontSize === 'x-large' ? 'text-xl' : 'text-base'
    }`}>
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AccessAI</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <TextToSpeech 
                text="Welcome to AccessAI, an inclusive platform that uses artificial intelligence to make digital content accessible to everyone." 
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                icon={<Cog className="h-4 w-4" />}
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <section className="py-12 bg-gradient-to-b from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl font-extrabold mb-4"
                variants={itemVariants}
              >
                AI-Powered Accessibility
              </motion.h2>
              
              <motion.p 
                className="text-xl max-w-3xl mx-auto mb-8"
                variants={itemVariants}
              >
                Breaking barriers with intelligent, adaptive interfaces for everyone.
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => {}}
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                variants={itemVariants}
              >
                Accessibility Controls
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                variants={itemVariants}
              >
                Customize your experience to suit your needs.
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <AccessibilityControls />
            </motion.div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                variants={itemVariants}
              >
                Key Features
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                variants={itemVariants}
              >
                Explore how our AI enhances accessibility.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <FeatureCard 
                  title="Voice Commands" 
                  description="Control the interface with natural language commands."
                  icon={<Mic className="h-6 w-6" />}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <FeatureCard 
                  title="Text-to-Speech" 
                  description="Listen to content instead of reading it."
                  icon={<Volume2 className="h-6 w-6" />}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <FeatureCard 
                  title="Keyboard Navigation" 
                  description="Navigate the entire interface without a mouse."
                  icon={<KeyRound className="h-6 w-6" />}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <FeatureCard 
                  title="AI Assistance" 
                  description="Get intelligent help tailored to your needs."
                  icon={<Braces className="h-6 w-6" />}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <FeatureCard 
                  title="Visual Adaptations" 
                  description="Customize contrast, font size, and animations."
                  icon={<Eye className="h-6 w-6" />}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <FeatureCard 
                  title="Real-time Captioning" 
                  description="Automatic captions for audio and video content."
                  icon={<Cog className="h-6 w-6" />}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                variants={itemVariants}
              >
                Try the AI Assistant
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300"
                variants={itemVariants}
              >
                Experience how our AI can help you navigate and interact.
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <AIAssistant />
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold">AccessAI</p>
              <p className="text-gray-400">Breaking barriers with AI-powered accessibility</p>
            </div>
            
            <div>
              <p className="text-gray-400">&copy; 2025 AccessAI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      
      <VoiceCommandListener onCommand={handleCommand} />
    </div>
  );
};

export default Home;