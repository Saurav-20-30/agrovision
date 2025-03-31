
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChartBar, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import NavBar from "@/components/ui/nav-bar";
import Header from "@/components/ui/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const yieldData = [
  { month: 'Jan', current: 0, previous: 0 },
  { month: 'Feb', current: 0, previous: 0 },
  { month: 'Mar', current: 0, previous: 0 },
  { month: 'Apr', current: 0, previous: 0 },
  { month: 'May', current: 0, previous: 0 },
  { month: 'Jun', current: 0, previous: 0 },
  { month: 'Jul', current: 30, previous: 25 },
  { month: 'Aug', current: 90, previous: 75 },
  { month: 'Sep', current: 85, previous: 90 },
  { month: 'Oct', current: 0, previous: 0 },
  { month: 'Nov', current: 0, previous: 0 },
  { month: 'Dec', current: 0, previous: 0 },
];

const soilHealthData = [
  { name: 'Week 1', value: 55 },
  { name: 'Week 2', value: 58 },
  { name: 'Week 3', value: 62 },
  { name: 'Week 4', value: 68 },
  { name: 'Week 5', value: 72 },
];

const YieldPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        title="Yield Dashboard" 
        showBackButton 
        onBackClick={() => navigate(-1)} 
      />
      
      <div className="flex-1 p-4">
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Current Yield</CardTitle>
              <CardDescription>Total harvest this season</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="text-2xl font-bold">205</div>
                  <div className="text-xs text-muted-foreground">bushels/acre</div>
                </div>
                <div className="flex items-center text-green-500 text-sm font-medium">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  12% increase
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Soil Improvement</CardTitle>
              <CardDescription>Health score improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="text-2xl font-bold">+17%</div>
                  <div className="text-xs text-muted-foreground">over 5 weeks</div>
                </div>
                <div className="flex items-center text-green-500 text-sm font-medium">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  Positive trend
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">Yield Comparison</CardTitle>
            <CardDescription>Current vs. Previous Season</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={yieldData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="previous" fill="#90caf9" name="Previous Season" />
                  <Bar dataKey="current" fill="#00A63D" name="Current Season" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">Soil Health Trend</CardTitle>
            <CardDescription>Last 5 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={soilHealthData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00A63D" 
                    strokeWidth={2}
                    name="Soil Health Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Insights</CardTitle>
            <CardDescription>AI-generated recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Increased nitrogen uptake</h4>
                  <p className="text-xs text-muted-foreground">
                    Improved soil health has led to better nutrient absorption
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <ArrowDownRight className="h-4 w-4 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">September yield drop</h4>
                  <p className="text-xs text-muted-foreground">
                    Slightly lower than last year due to early rust detection
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Overall improvement</h4>
                  <p className="text-xs text-muted-foreground">
                    12% overall yield improvement from last season
                  </p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View Complete Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <NavBar />
    </div>
  );
};

export default YieldPage;
