
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

const AuthPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    // In a real app, this would trigger an API call to send OTP
    toast.success("OTP sent to your phone");
    setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    // In a real app, this would verify the OTP with the backend
    toast.success("Login successful");
    navigate("/");
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
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">
                  Send OTP
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
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" type="submit">
                  Verify
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setStep("phone")}
                  className="w-full"
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
