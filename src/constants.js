import { 
  Headphones, Zap, Shield, Globe, Sparkles, Users, 
  Music, Star, Radio, Mic2, TrendingUp 
} from 'lucide-react'

// Asset imports would need to be handled carefully if moving files
// For now, I'll assume they are relative to src/
import szaCover from './assets/sza.jpeg'
import snoozeAudio from './assets/snooze.mp3'

export const TRACKS = [
  { id: 2, title: 'Snooze', artist: 'SZA', duration: '3:23', cover: szaCover, audio: snoozeAudio, liked: true, genre: 'R&B' },
]

export const FEATURES = [
  { icon: Headphones, title: 'Studio Quality', desc: 'Lossless Hi-Fi audio. Every breath, every string pluck exactly as the artist intended.', color: '#8B5CF6' },
  { icon: Zap, title: 'Instant Pulse', desc: 'Lightning-fast architecture. Songs start before you finish tapping the play button.', color: '#EC4899' },
  { icon: Shield, title: 'Secure Privacy', desc: 'Your data is yours. We encrypt everything — your listening habits stay private.', color: '#10B981' },
  { icon: Globe, title: 'Global Discovery', desc: 'Explore emerging artists from every corner of the world with our AI-powered radar.', color: '#F59E0B' },
  { icon: Sparkles, title: 'Smart Playlists', desc: 'ALFAL learns your taste and crafts playlists that feel like they were made just for you.', color: '#6366F1' },
  { icon: Users, title: 'Social Listening', desc: 'Share real-time playlists with friends. Music is always better together.', color: '#EC4899' },
]

export const STATS = [
  { value: '500K+', label: 'Active Listeners', icon: Users },
  { value: '50M+', label: 'Songs Available', icon: Music },
  { value: '190+', label: 'Countries', icon: Globe },
  { value: '4.9★', label: 'App Rating', icon: Star },
]

export const PLANS = [
  {
    name: 'Free',
    price: '0',
    desc: 'Perfect for casual listeners',
    features: ['Ad-supported streaming', 'Standard quality audio', 'Mobile only', 'Skip 6 times/hour'],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Premium',
    price: '49K',
    desc: 'For the true music lover',
    features: ['Ad-free listening', 'Lossless Hi-Fi audio', 'All devices', 'Unlimited skips', 'Offline downloads', 'AI Smart Playlists'],
    cta: 'Go Premium',
    popular: true,
  },
  {
    name: 'Family',
    price: '79K',
    desc: 'Up to 6 accounts',
    features: ['Everything in Premium', '6 individual accounts', 'Family Mix playlist', 'Parental controls', 'Shared queue', 'Priority support'],
    cta: 'Get Family Plan',
    popular: false,
  },
]
