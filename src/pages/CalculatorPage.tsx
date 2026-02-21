import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Pill } from "lucide-react";

export default function CalculatorPage() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [frequency, setFrequency] = useState("3");
  const [duration, setDuration] = useState("");
  const [tabletsPerDose, setTabletsPerDose] = useState("1");
  const [result, setResult] = useState<{ totalDoses: number; totalTablets: number } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const freq = parseInt(frequency);
    const dur = parseInt(duration);
    const tpd = parseFloat(tabletsPerDose);
    if (!freq || !dur || !tpd) return;
    const totalDoses = freq * dur;
    const totalTablets = totalDoses * tpd;
    setResult({ totalDoses, totalTablets });
  };

  return (
    <div className="container py-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-2">Medicine Calculator</h1>
      <p className="text-muted-foreground mb-8">Calculate the total medicine requirement for a course of treatment.</p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />Dosage Calculator</CardTitle>
          <CardDescription>Enter patient details and dosage information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={calculate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Patient Age</Label>
                <Input type="number" placeholder="e.g., 30" value={age} onChange={e => setAge(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input type="number" placeholder="e.g., 70" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Dosage Frequency (times per day)</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Once daily</SelectItem>
                  <SelectItem value="2">Twice daily</SelectItem>
                  <SelectItem value="3">Three times daily</SelectItem>
                  <SelectItem value="4">Four times daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tablets per Dose</Label>
              <Input type="number" step="0.5" min="0.5" placeholder="e.g., 1" value={tabletsPerDose} onChange={e => setTabletsPerDose(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Duration (days)</Label>
              <Input type="number" placeholder="e.g., 7" value={duration} onChange={e => setDuration(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Calculate</Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-6 border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Pill className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Results</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-3xl font-bold text-primary">{result.totalDoses}</p>
                <p className="text-sm text-muted-foreground">Total Doses</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-3xl font-bold text-primary">{result.totalTablets}</p>
                <p className="text-sm text-muted-foreground">Total Tablets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
