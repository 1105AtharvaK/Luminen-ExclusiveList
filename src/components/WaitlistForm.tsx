import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Mail, Phone, Lock, Sparkles, Crown, Diamond } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
// import emailjs from 'emailjs-com'; // Uncomment after EmailJS setup

interface WaitlistFormProps {
  onJoin?: () => void;
  isSubmitted?: boolean;
  joined?: boolean;
}

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendSmsOtp = async (phone: string, otp: string) => {
  // TODO: Integrate with a real SMS API (e.g., free SMS gateway or your backend)
  // For now, just alert for demo purposes
  alert(`Demo SMS to ${phone}: Your OTP is ${otp}`);
  // In production, replace this with actual SMS sending logic
};

const WaitlistForm = ({ onJoin, isSubmitted: isSubmittedProp, joined }: WaitlistFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    countryCode: "+1",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.countryCode) {
      toast({ title: "Enter your phone number", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const payload = {
      email: formData.email,
      password: formData.password,
      phone: formData.countryCode + formData.phone,
    };
    const { error } = await supabase
      .from('waitlist')
      .insert([payload]);
    if (error) {
      toast({ title: "Error joining waitlist", description: error.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }
    setIsSubmitted(true);
    setIsLoading(false);
    if (onJoin) onJoin();
    toast({ title: "Welcome to Luminen", description: "You've successfully joined our exclusive elite." });
  };

  if (joined || isSubmittedProp || isSubmitted) {
    return (
      <section id="waitlist" className="py-24 px-6 bg-dark-gradient">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-surface-elevated rounded-xl p-12 shadow-dark border border-accent">
            <div className="w-20 h-20 bg-accent-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
              <CheckCircle className="w-10 h-10 text-background" />
            </div>
            
            <h2 className="font-luxury text-4xl font-bold text-accent-gradient mb-4 uppercase tracking-tight">
              WELCOME TO LUMINEN
            </h2>
            
            <p className="text-lg text-text-secondary mb-8 leading-relaxed font-light">
              YOU'RE NOW PART OF AN EXCLUSIVE ELITE WHO WILL BE THE FIRST TO EXPERIENCE OUR LUXURY COLLECTION.
            </p>
            
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center text-text-secondary">
                <Diamond className="w-5 h-5 text-accent-orange mr-3" />
                <span className="font-medium uppercase tracking-wide">EARLY ACCESS TO THE FULL COLLECTION</span>
              </div>
              <div className="flex items-center text-text-secondary">
                <Crown className="w-5 h-5 text-accent-blue mr-3" />
                <span className="font-medium uppercase tracking-wide">EXCLUSIVE MEMBER PRICING (15% OFF)</span>
              </div>
            </div>
            
            <p className="text-sm text-text-secondary mt-8 font-medium uppercase tracking-wide">
              WE'LL NOTIFY YOU VIA EMAIL AND SMS WHEN YOUR EXCLUSIVE ACCESS IS READY.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-24 px-6 bg-dark-gradient">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 mb-8 bg-surface-elevated rounded-full border border-accent shadow-glow">
            <Sparkles className="w-5 h-5 text-accent-orange mr-3" />
            <span className="text-sm font-bold text-foreground tracking-wider uppercase">
              LUXURY EXCLUSIVE
            </span>
          </div>
          <h2 className="font-luxury text-5xl md:text-6xl lg:text-7xl font-bold text-accent-gradient mb-8 uppercase tracking-tight">
            JOIN THE ELITE
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto font-light leading-relaxed mb-12 uppercase tracking-wide">
            SECURE YOUR PLACE IN THE FUTURE OF LUXURY FASHION
          </p>
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-dark border border-accent bg-surface-elevated">
              <CardHeader className="text-center pb-6">
                <h3 className="font-luxury text-3xl font-bold text-accent-gradient uppercase tracking-tight">
                  RESERVE YOUR ACCESS
                </h3>
                <p className="text-text-secondary font-medium uppercase tracking-wide">
                  JOIN THE EXCLUSIVE LUXURY COMMUNITY
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-bold uppercase tracking-wide">
                      Phone Number
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="countryCode"
                        name="countryCode"
                        type="text"
                        placeholder="+1"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="w-20 h-14 bg-input border-accent text-foreground placeholder:text-text-secondary focus:border-accent-orange transition-streetwear font-medium"
                        required
                      />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="123-456-7890"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-1 h-14 bg-input border-accent text-foreground placeholder:text-text-secondary focus:border-accent-orange transition-streetwear font-medium"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-bold uppercase tracking-wide">
                      Email Address (optional)
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 h-14 bg-input border-accent text-foreground placeholder:text-text-secondary focus:border-accent-orange transition-streetwear font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-bold uppercase tracking-wide">
                      Create Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 h-14 bg-input border-accent text-foreground placeholder:text-text-secondary focus:border-accent-orange transition-streetwear font-medium"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-16 bg-accent-gradient text-background font-bold text-lg rounded-xl hover-scale shadow-glow border-0 uppercase tracking-wide"
                    disabled={isLoading}
                  >
                    {isLoading ? "JOINING..." : "JOIN ELITE"}
                  </Button>
                  <p className="text-xs text-text-secondary text-center leading-relaxed font-medium uppercase tracking-wide">
                    BY JOINING, YOU AGREE TO RECEIVE EXCLUSIVE UPDATES. YOUR INFORMATION IS PROTECTED AND NEVER SHARED.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Benefits - Secondary focus */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-surface-elevated rounded-xl p-8 border border-accent/20 hover-scale">
            <div className="flex items-center mb-4">
              <Diamond className="w-8 h-8 text-accent-orange mr-4" />
              <h4 className="font-serif font-bold text-foreground uppercase tracking-wide text-xl">FIRST ACCESS</h4>
            </div>
            <p className="text-text-secondary font-light leading-relaxed uppercase tracking-wide">
              BE AMONG THE FIRST 500 TO EXPLORE OUR LUXURY COLLECTION BEFORE PUBLIC RELEASE.
            </p>
          </div>
          <div className="bg-surface-elevated rounded-xl p-8 border border-accent/20 hover-scale">
            <div className="flex items-center mb-4">
              <Crown className="w-8 h-8 text-accent-blue mr-4" />
              <h4 className="font-serif font-bold text-foreground uppercase tracking-wide text-xl">EXCLUSIVE PRICING</h4>
            </div>
            <p className="text-text-secondary font-light leading-relaxed uppercase tracking-wide">
              ENJOY 15% OFF YOUR FIRST PURCHASE AND ACCESS TO MEMBER-ONLY PRICING.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;