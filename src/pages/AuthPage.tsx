
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
import { message-square, phone } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
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
        setStep("otp");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === "phone" ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Welcome to AgroVision AI</CardTitle>
              <CardDescription className="text-center">
                Enter your phone number to continue
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePhoneSubmit}>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center relative">
                      <div className="absolute left-3 text-gray-500">
                        <phone className="h-5 w-5" />
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
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send OTP"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
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
                  onClick={() => setStep("phone")}
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
  );
};

export default AuthPage;
