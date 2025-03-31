
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Phone, Mail, Lock, ArrowLeft } from "lucide-react";
import Header from "@/components/ui/header";

const AuthPage = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"phone" | "email" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Generate a random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendSMSOTP = async (phoneNum: string) => {
    setIsLoading(true);
    
    // In a real implementation, you would call your SMS API here
    // Example:
    // const response = await fetch('your-sms-api-endpoint', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ 
    //     phoneNumber: phoneNum,
    //     message: `Your AgroVision AI verification code is: ${generatedOTP}` 
    //   })
    // });
    
    // For demo purposes, we're simulating the API call
    const generatedOTP = generateOTP();
    console.log(`OTP sent to ${phoneNum}: ${generatedOTP}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    return true;
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    try {
      const success = await sendSMSOTP(phoneNumber);
      if (success) {
        toast.success("OTP sent to your phone");
        setAuthMode("otp");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !password || password.length < 6) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login/signup with email
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Authentication successful");
      navigate("/");
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    
    setIsLoading(true);
    
    // In a real implementation, you would verify the OTP with your backend
    // Example:
    // const response = await fetch('your-verification-endpoint', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ phoneNumber, otp })
    // });
    
    // Simulate verification delay
    setTimeout(() => {
      setIsLoading(false);
      // In this demo we're accepting any 6-digit OTP
      toast.success("Login successful");
      navigate("/");
    }, 1500);
  };

  const handleResendOTP = async () => {
    try {
      const success = await sendSMSOTP(phoneNumber);
      if (success) {
        toast.success("New OTP sent to your phone");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // In a real implementation, you would integrate with Google Auth API
    // Example:
    // const googleProvider = new GoogleAuthProvider();
    // signInWithPopup(auth, googleProvider)
    //   .then((result) => {
    //     // This gives you a Google Access Token
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     const user = result.user;
    //     // ...
    //   })
    
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Google login successful");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Authentication" showBackButton onBackClick={() => navigate(-1)} />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {authMode === "phone" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Welcome to AgroVision AI</CardTitle>
                <CardDescription className="text-center">
                  Sign in or create an account to continue
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePhoneSubmit}>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center relative">
                        <div className="absolute left-3 text-gray-500">
                          <Phone className="h-5 w-5" />
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your mobile number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="relative flex items-center">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="mx-4 flex-shrink text-gray-400">or</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => setAuthMode("email")}
                    >
                      <Mail className="h-4 w-4" />
                      Continue with Email
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                        <path d="M1 1h22v22H1z" fill="none" />
                      </svg>
                      Continue with Google
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send OTP"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {authMode === "email" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Login with Email</CardTitle>
                <CardDescription className="text-center">
                  Enter your email and password
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleEmailSubmit}>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center relative">
                        <div className="absolute left-3 text-gray-500">
                          <Mail className="h-5 w-5" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="flex items-center relative">
                        <div className="absolute left-3 text-gray-500">
                          <Lock className="h-5 w-5" />
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Login / Register"}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setAuthMode("phone")}
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Phone Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {authMode === "otp" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Verify OTP</CardTitle>
                <CardDescription className="text-center">
                  Enter the 6-digit code sent to {phoneNumber}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleOtpSubmit}>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">One-Time Password</Label>
                      <div className="flex justify-center">
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <div className="text-center mt-2">
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          className="text-sm text-blue-600 hover:underline"
                          disabled={isLoading}
                        >
                          {isLoading ? "Sending..." : "Resend OTP"}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify"}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setAuthMode("phone")}
                    className="w-full"
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
