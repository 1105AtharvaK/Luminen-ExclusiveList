import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Zap, Users, Timer, Crown, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const PROGRESS_STEP = 100;

const LuxuryHero = () => {
  const [waitlistCount, setWaitlistCount] = useState(0);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch count from Supabase
  const fetchCount = async () => {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });
    if (error) {
      console.error('Error fetching waitlist count:', error);
      return;
    }
    setWaitlistCount(count || 0);
  };

  useEffect(() => {
    let subscription: any;
    fetchCount();
    // Subscribe to real-time inserts
    subscription = supabase
      .channel('waitlist_progress')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'waitlist' }, (payload) => {
        fetchCount();
      })
      .subscribe();
    // Fallback polling every 5 seconds in case realtime fails
    pollingRef.current = setInterval(fetchCount, 5000);
    return () => {
      if (subscription) supabase.removeChannel(subscription);
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  // Calculate the current max (increments of 100)
  const getCurrentMax = () => {
    return Math.ceil(Math.max(waitlistCount, 1) / PROGRESS_STEP) * PROGRESS_STEP;
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-dark-gradient overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] bg-accent-orange/30 rounded-full blur-3xl opacity-80 animate-glow-pulse md:w-[35vw] md:h-[35vw]" style={{filter: 'blur(90px)'}}></div>
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Header Badge */}
        <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 bg-surface-elevated rounded-full shadow-glow animate-fade-in-delayed border border-accent">
          <Crown className="w-5 h-5 text-accent-orange mr-2 sm:mr-3" />
          <span className="text-xs sm:text-sm font-bold text-foreground tracking-wider uppercase">
            LUXURY EXCLUSIVE
          </span>
        </div>
        {/* Main Heading */}
        <h1 className="font-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-accent-gradient mb-6 sm:mb-8 animate-fade-up tracking-tight break-words">
          LUMINEN
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-text-secondary mb-8 sm:mb-12 font-light max-w-2xl sm:max-w-4xl mx-auto leading-relaxed animate-fade-up delay-200">
          ELEGANCE REDEFINED. LUXURY AMPLIFIED.
        </p>
        {/* Live Waitlist Counter */}
        <div className="w-full max-w-md sm:max-w-2xl mx-auto mb-8 sm:mb-12 animate-fade-up delay-300">
          <div className="bg-surface-elevated rounded-xl p-4 sm:p-8 shadow-dark border border-accent flex flex-col gap-4">
            <div className="flex items-center justify-center mb-2">
              <Timer className="w-5 h-5 text-accent-orange mr-2" />
              <span className="text-lg sm:text-xl text-foreground font-bold uppercase tracking-wide">EXCLUSIVE MEMBERS</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-3xl sm:text-4xl text-accent-orange font-serif font-bold">
                {waitlistCount}/{getCurrentMax()}
              </span>
            </div>
          </div>
        </div>
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-10 sm:mb-16 animate-fade-up delay-400">
          <Button 
            onClick={scrollToWaitlist}
            className="bg-accent-gradient text-background font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-xl hover-scale shadow-glow border-0 uppercase tracking-wide"
          >
            <Sparkles className="mr-2 w-5 h-5" />
            JOIN THE ELITE
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>
        </div>
        {/* Social Proof */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-70 animate-fade-in-delayed">
          <div className="flex items-center">
            <Users className="w-4 h-4 text-text-secondary mr-2" />
            <span className="text-xs sm:text-sm text-text-secondary font-medium uppercase tracking-wide">
              TRUSTED BY LUXURY CONNOISSEURS
            </span>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-text-secondary" />
      </div>
    </section>
  );
};

export default LuxuryHero;